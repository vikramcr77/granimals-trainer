/* ============================================================
   ACCOUNT SYNC + BACKUP FILE (Me → Settings)
   Safety rules: data on this device is never deleted by signing in,
   signing out, or a failed sync. Cloud writes are revision-checked so
   two devices can't silently overwrite each other; before device data
   is replaced, a copy is kept (and a backup file is downloaded).
   ============================================================ */
(function(){
"use strict";
const SKEY='granimals_sync', PREV='granimals_v1_before_sync', LASTBK='granimals_last_backup';
const escH=s=>String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const readSt=()=>{ try{ return JSON.parse(localStorage.getItem(SKEY))||{}; }catch(e){ return {}; } };
let st=readSt();            // { uid, email, rev, dirty, conflict }
let me=null, status='', checked=false, pushT=null, chain=Promise.resolve(), lastCheck=0;
const writeSt=()=>{ try{ localStorage.setItem(SKEY, JSON.stringify(st)); }catch(e){} };

async function api(path,opts){
  const r=await fetch('/app-api'+path,Object.assign({credentials:'same-origin',headers:{'Content-Type':'application/json'}},opts||{}));
  const j=await r.json().catch(()=>({}));
  if(!r.ok){ const e=new Error(j.error||('Request failed ('+r.status+')')); e.status=r.status; e.body=j; throw e; }
  return j;
}

/* ---------- summaries ---------- */
function stats(d){
  d=d||{}; const h=Array.isArray(d.history)?d.history:[];
  const times=h.map(x=>x&&(x.date||x.ts)).filter(Boolean).map(x=>new Date(x).getTime()).filter(x=>!isNaN(x));
  return { workouts:h.length, scans:Array.isArray(d.body)?d.body.length:0, checkins:Array.isArray(d.assess)?d.assess.length:0, last:times.length?new Date(Math.max(...times)):null };
}
// A fresh browser already has default goals/profile and empty food days, so only real entries count.
const anyEntries=o=>!!o&&typeof o==='object'&&Object.values(o).some(v=>Array.isArray(v)?v.length>0:anyEntries(v));
function hasData(d){ const s=stats(d); d=d||{};
  return !!(s.workouts||s.scans||s.checkins||anyEntries(d.food)||anyEntries(d.hd)||(Array.isArray(d.myFoods)&&d.myFoods.length)||(d.profile&&(d.profile.age||d.profile.height))); }
function describe(d){ const s=stats(d), pl=(n,w)=>n+' '+w+(n===1?'':'s');
  const parts=[pl(s.workouts,'workout'), pl(s.scans,'scan')]; if(s.checkins) parts.push(pl(s.checkins,'check-in'));
  return parts.join(' · ')+(s.last?' · last '+s.last.toLocaleDateString(undefined,{day:'numeric',month:'short'}):''); }

/* ---------- photos ---------- */
const toDataURL=b=>new Promise((ok,no)=>{ const r=new FileReader(); r.onload=()=>ok(r.result); r.onerror=()=>no(r.error); r.readAsDataURL(b); });
const fromDataURL=u=>fetch(u).then(r=>r.blob());
const okImg=u=>typeof u==='string'&&/^data:image\/(jpeg|png|webp);base64,/.test(u);
async function pullPhoto(id){ const j=await api('/photos/'+encodeURIComponent(id)); if(okImg(j.image)) await bcImgDB.put(id, await fromDataURL(j.image)); }
async function syncPhotos(){
  if(!me) return;
  try{
    const remote=new Set((await api('/photos')).ids||[]);
    for(const r of (DB.body||[])){
      if(!r||!r.id||!r.hasImg) continue;
      const local=await bcImgDB.get(r.id).catch(()=>null);
      if(local&&!remote.has(r.id)) await api('/photos/'+encodeURIComponent(r.id),{method:'PUT',body:JSON.stringify({image:await toDataURL(local)})});
      else if(!local&&remote.has(r.id)) await pullPhoto(r.id);
    }
  }catch(e){}
}
async function pullPhotosFor(data){
  try{ const remote=new Set((await api('/photos')).ids||[]);
    for(const r of ((data&&data.body)||[])) if(r&&r.id&&r.hasImg&&remote.has(r.id)&&!(await bcImgDB.get(r.id).catch(()=>null))) await pullPhoto(r.id).catch(()=>{});
  }catch(e){}
}

/* ---------- sync core ---------- */
function setStatus(s){ status=s; const n=document.querySelector('.gs-status'); if(n) n.innerHTML=statusHTML(); }
function keepDeviceCopy(){ try{ localStorage.setItem(PREV, JSON.stringify({at:new Date().toISOString(), data:DB})); }catch(e){} }
function flash(msg){ try{ sessionStorage.setItem('granimals_toast', msg); }catch(e){} }

async function adopt(doc,msg){
  keepDeviceCopy();
  await pullPhotosFor(doc.data);
  localStorage.setItem(KEY, JSON.stringify(doc.data));   // throws (and aborts) if storage is full
  st.rev=doc.revision; st.dirty=false; st.conflict=false; writeSt();
  flash(msg||'Loaded your progress from your account');
  location.reload();
}

function push(){
  chain=chain.then(async()=>{
    clearTimeout(pushT);
    if(!me||st.conflict||!st.dirty) return;
    setStatus('syncing');
    try{
      const r=await api('/sync',{method:'PUT',body:JSON.stringify({data:DB, baseRev:st.rev||0})});
      st.rev=r.revision; st.dirty=false; writeSt(); setStatus('ok');
      syncPhotos();
    }catch(e){
      // resolve outside the queue so it can push again without waiting on itself
      if(e.status===409&&e.body&&e.body.doc){ const d=e.body.doc; setTimeout(()=>resolve(d)); }
      else if(e.status===401){ me=null; setStatus('signedout'); rerender(); }
      else setStatus('offline');
    }
  }).catch(()=>{});
  return chain;
}
function pushNow(){ st.dirty=true; writeSt(); return push(); }

// Decide what to do given the account copy. Never drops device data silently.
async function resolve(doc){
  // an explicit restore already confirmed replacing the account copy (its old version stays in history)
  if(doc&&st.forcePush){ st.rev=doc.revision; st.forcePush=false; st.conflict=false; await pushNow(); return; }
  if(!doc){ st.forcePush=false; await pushNow(); if(!st.dirty) toast('Your progress is now saved to your account'); return; }
  if(JSON.stringify(doc.data)===JSON.stringify(DB)){ st.rev=doc.revision; st.dirty=false; st.conflict=false; writeSt(); setStatus('ok'); syncPhotos(); return; }
  if(st.rev&&doc.revision===st.rev){ if(st.dirty) await push(); else { setStatus('ok'); syncPhotos(); } return; }
  if(st.rev&&doc.revision>st.rev&&!st.dirty) return adopt(doc,'Updated with progress from your other device');
  if(!hasData(DB)) return adopt(doc);
  st.conflict=true; writeSt(); setStatus('conflict'); openChooser(doc);
}

async function reconcile(){
  if(!me) return;
  lastCheck=Date.now(); setStatus('syncing');
  try{ const r=await api('/sync'); await resolve(r.doc); }
  catch(e){ if(e.status===401){ me=null; setStatus('signedout'); rerender(); } else setStatus('offline'); }
}

async function signedIn(user){
  me=user;
  if(st.uid!==user.id){ st={uid:user.id, email:user.email, rev:0, dirty:false, conflict:false}; writeSt(); }
  rerender(); await reconcile(); rerender();
}

/* ---------- conflict chooser ---------- */
function openChooser(doc){
  closeChooser();
  const w=document.createElement('div'); w.className='gs-modal'; w.setAttribute('role','dialog'); w.setAttribute('aria-modal','true'); w.setAttribute('aria-labelledby','gsT');
  w.innerHTML=`<div class="gs-card">
    <b class="gs-t" id="gsT">Which progress should we keep?</b>
    <p class="prof-note">This device and your account have different data. Whichever you don't pick is kept as a copy, so nothing is lost.</p>
    <button class="gs-opt" data-k="device"><b>Keep this device's data</b><span>${escH(describe(DB))}</span><em>Replaces the account copy. The account's previous version stays in its history.</em></button>
    <button class="gs-opt" data-k="cloud"><b>Use my account's data</b><span>${escH(describe(doc.data))}</span><em>A backup file of this device's data downloads first.</em></button>
    <button class="gs-later">Decide later</button></div>`;
  document.body.appendChild(w);
  w.querySelector('[data-k=device]').onclick=async()=>{ closeChooser(); st.conflict=false; st.rev=doc.revision; await pushNow(); if(!st.dirty) toast('Account updated with this device\'s progress'); rerender(); };
  w.querySelector('[data-k=cloud]').onclick=async()=>{ closeChooser(); try{ await downloadBackup(true); }catch(e){} try{ await adopt(doc); }catch(e){ toast('Couldn\'t load the account data — nothing was changed'); } };
  w.querySelector('.gs-later').onclick=()=>{ closeChooser(); rerender(); };
  w.querySelector('[data-k=device]').focus();
}
function closeChooser(){ document.querySelectorAll('.gs-modal').forEach(n=>n.remove()); }

/* ---------- backup file ---------- */
async function buildBackup(){
  const photos={};
  for(const r of (DB.body||[])){ if(r&&r.id&&r.hasImg){ const b=await bcImgDB.get(r.id).catch(()=>null); if(b) photos[r.id]=await toDataURL(b); } }
  return { app:'granimals', kind:'backup', version:1, exportedAt:new Date().toISOString(), data:JSON.parse(JSON.stringify(DB)), photos };
}
async function downloadBackup(quiet){
  const bk=await buildBackup();
  const blob=new Blob([JSON.stringify(bk)],{type:'application/json'});
  const name='granimals-backup-'+new Date().toISOString().slice(0,10)+'.json';
  const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download=name; document.body.appendChild(a); a.click(); a.remove();
  setTimeout(()=>URL.revokeObjectURL(a.href),60000);
  try{ localStorage.setItem(LASTBK,bk.exportedAt); }catch(e){}
  if(!quiet){ toast('Backup saved: '+escH(name)); rerender(); }
}
function restoreFrom(file){
  const fr=new FileReader();
  fr.onload=()=>{
    let bk=null; try{ bk=JSON.parse(fr.result); }catch(e){}
    if(!bk||bk.app!=='granimals'||!bk.data||typeof bk.data!=='object'||Array.isArray(bk.data)||(bk.data.history&&!Array.isArray(bk.data.history))){ toast('That file isn\'t a Granimals backup'); return; }
    const when=bk.exportedAt?new Date(bk.exportedAt).toLocaleString(undefined,{day:'numeric',month:'short',year:'numeric',hour:'numeric',minute:'2-digit'}):'an unknown date';
    confirmAction('Restore this backup?',`Backup from ${when}: ${describe(bk.data)}. It replaces the data on this device${st.uid?' and in your account':''}. A backup of your current data downloads first.`,'Restore',async()=>{
      try{
        if(hasData(DB)) await downloadBackup(true);
        const photos=bk.photos&&typeof bk.photos==='object'?bk.photos:{};
        for(const id of Object.keys(photos)) if(okImg(photos[id])) await bcImgDB.put(id, await fromDataURL(photos[id]));
        keepDeviceCopy();
        localStorage.setItem(KEY, JSON.stringify(bk.data));
        if(st.uid){ st.dirty=true; st.conflict=false; st.forcePush=true; writeSt(); }
        flash('Backup restored');
        location.reload();
      }catch(e){ toast('Restore failed — your current data was not changed'); }
    });
  };
  fr.onerror=()=>toast('Couldn\'t read that file');
  fr.readAsText(file);
}

/* ---------- settings cards ---------- */
function statusHTML(){
  if(!me) return checked&&st.uid?'<i class="gs-dot warn"></i>Signed out — sign in to resume syncing':'';
  if(st.conflict) return '<i class="gs-dot warn"></i>Needs your choice <button class="gs-link" data-a="resolve">Resolve</button>';
  if(status==='syncing') return '<i class="gs-dot busy"></i>Syncing…';
  if(status==='offline') return '<i class="gs-dot warn"></i>Offline — changes are saved here and will sync later';
  if(st.dirty) return '<i class="gs-dot busy"></i>Waiting to sync';
  return '<i class="gs-dot ok"></i>All progress synced';
}
function rerender(){ const v=document.querySelector('#view-settings'); if(v&&!v.contains(document.activeElement)&&typeof renderSettings==='function') renderSettings(); }

function renderCards(v){
  const acc=document.createElement('div'); acc.className='prof-card gs-acc';
  if(me){
    acc.innerHTML=`<div class="prof-h"><b>Account &amp; sync</b><span>Signed in as ${escH(me.email)}</span></div>
      <p class="gs-status" aria-live="polite">${statusHTML()}</p>
      <div class="as-btns"><button class="as-save" data-a="sync">Sync now</button><button data-a="out">Sign out</button></div>
      <p class="prof-note">Your progress and scan photos are saved to your account. Sign in on Chrome, Safari or another phone to pick up where you left off.</p>`;
  }else{
    acc.innerHTML=`<div class="prof-h"><b>Account &amp; sync</b><span>Keep your progress safe and use it in any browser.</span></div>
      ${st.uid&&checked?`<p class="gs-status">${statusHTML()}</p>`:''}
      <form class="gs-form" novalidate>
        <label class="as-field"><span>Email</span><input type="email" name="email" autocomplete="email" inputmode="email" autocapitalize="off" value="${escH(st.email||'')}" required></label>
        <label class="as-field"><span>Password</span><input type="password" name="password" autocomplete="current-password" minlength="8" required></label>
        <p class="gs-err" role="alert"></p>
        <div class="as-btns"><button type="submit" class="as-save" data-a="login">Sign in</button><button type="button" data-a="signup">Create account</button></div>
      </form>
      <p class="prof-note">Signing in saves the progress on this device to your account. Nothing on this device is deleted. Passwords need at least 8 characters.</p>`;
    const f=acc.querySelector('form'), err=acc.querySelector('.gs-err');
    const go=async(action)=>{
      const email=f.email.value.trim(), password=f.password.value;
      if(!email||password.length<8){ err.textContent='Enter your email and a password of at least 8 characters.'; return; }
      f.querySelectorAll('button').forEach(b=>b.disabled=true); err.textContent='';
      try{ const r=await api('/auth',{method:'POST',body:JSON.stringify({action,email,password})}); f.password.value='';
        if(document.activeElement) document.activeElement.blur();
        toast(action==='signup'?'Account created':'Signed in'); await signedIn(r.user); }
      catch(e){ err.textContent=e.status?e.message:'No connection — try again when you\'re online.'; f.querySelectorAll('button').forEach(b=>b.disabled=false); }
    };
    f.onsubmit=e=>{ e.preventDefault(); go('login'); };
    acc.querySelector('[data-a=signup]').onclick=()=>go('signup');
  }
  acc.addEventListener('click',e=>{ const a=e.target.closest('[data-a]'); if(!a) return;
    if(a.dataset.a==='sync'||a.dataset.a==='resolve') reconcile().then(rerender);
    if(a.dataset.a==='out') confirmAction('Sign out?','Your progress stays on this device. Changes made while signed out sync after you sign back in.','Sign out',async()=>{
      await push().catch(()=>{});
      try{ await api('/auth',{method:'POST',body:JSON.stringify({action:'logout'})}); }catch(e){}
      me=null; setStatus(''); rerender(); toast('Signed out — your data is still on this device'); });
  });
  v.appendChild(acc);

  let last=null; try{ last=localStorage.getItem(LASTBK); }catch(e){}
  const bk=document.createElement('div'); bk.className='prof-card gs-bk';
  bk.innerHTML=`<div class="prof-h"><b>Backup file</b><span>${escH(describe(DB))}</span></div>
    <div class="as-btns"><button class="as-save" data-b="dl">Download backup</button><button data-b="rs">Restore from file</button></div>
    <input type="file" accept="application/json,.json" hidden>
    <p class="prof-note">Saves all your workouts, scans, photos and settings to one file (on iPhone it goes to the Files app). ${last?'Last backup: '+escH(new Date(last).toLocaleDateString(undefined,{day:'numeric',month:'short',year:'numeric'}))+'.':'No backup yet.'}</p>`;
  const inp=bk.querySelector('input[type=file]');
  bk.querySelector('[data-b=dl]').onclick=()=>downloadBackup().catch(()=>toast('Couldn\'t create the backup'));
  bk.querySelector('[data-b=rs]').onclick=()=>inp.click();
  inp.onchange=()=>{ const f=inp.files&&inp.files[0]; inp.value=''; if(f) restoreFrom(f); };
  v.appendChild(bk);
}

/* ---------- wiring ---------- */
window.addEventListener('granimals:save',()=>{ if(!st.uid) return; st.dirty=true; writeSt(); if(me){ clearTimeout(pushT); pushT=setTimeout(push,1500); } });
window.addEventListener('online',()=>{ if(me) reconcile(); });
document.addEventListener('visibilitychange',()=>{
  if(!me) return;
  if(document.visibilityState==='hidden'&&st.dirty) push();
  else if(document.visibilityState==='visible'&&Date.now()-lastCheck>30000) reconcile();
});
// Send unsaved changes now (used before pull-to-refresh reloads the app).
function flush(){ return me&&st.dirty ? push() : Promise.resolve(); }
window.GSync={ renderCards, flush };
try{ const m=sessionStorage.getItem('granimals_toast'); if(m){ sessionStorage.removeItem('granimals_toast'); setTimeout(()=>toast(escH(m)),300); } }catch(e){}
api('/auth').then(r=>{ checked=true; if(r.user) signedIn(r.user); else rerender(); }).catch(()=>{ checked=true; });
})();
