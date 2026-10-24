/* ============================================================
   PROFILE — guided setup (one question per screen) and the
   personal summary: Now vs Goal, BMI gauge, calories, water, macros.
   Body fat: range picker, known value, or US Navy tape method
   (Hodgdon & Beckett, 1984; typically within ~3–4% of DEXA).
   ============================================================ */
const BF_RANGES={ m:[[10,'8–12%','Visible abs and veins'],[15,'13–17%','Abs outline in good light'],[20,'18–22%','Soft middle, no abs'],[25,'23–27%','Belly and love handles'],[30,'28–32%','Rounder belly'],[35,'33%+','Mostly soft']],
                  f:[[18,'16–20%','Visible abs'],[23,'21–25%','Fit, some definition'],[28,'26–30%','Soft, curvy'],[33,'31–35%','Fuller belly and hips'],[38,'36–40%','Rounder'],[43,'41%+','Mostly soft']] };
const BF_GOALS={ m:[[9,'8–10%','Stage-lean, hard to hold'],[11,'10–12%','Shredded, visible abs'],[13.5,'12–15%','Athletic, lean'],[16.5,'15–18%','Fit, easy to maintain']],
                 f:[[17.5,'16–19%','Very lean'],[20.5,'19–22%','Athletic, defined'],[23.5,'22–25%','Fit and healthy'],[26.5,'25–28%','Easy to maintain']] };
let wiz=null;

function navyBF(sex,h,waist,neck,hip){
  h=+h; waist=+waist; neck=+neck; hip=+hip;
  if(!h||!waist||!neck) return null;
  const v = sex==='f'
    ? (hip ? 495/(1.29579-0.35004*Math.log10(waist+hip-neck)+0.22100*Math.log10(h))-450 : null)
    : (waist>neck ? 495/(1.0324-0.19077*Math.log10(waist-neck)+0.15456*Math.log10(h))-450 : null);
  return v==null||!isFinite(v)? null : Math.round(Math.max(3,Math.min(60,v))*10)/10;
}
// Cut first when body fat is high, or the target is well below where you are now; otherwise build.
function recommendGoal(sex,bf,goal){ const t=sex==='f'?8:0; if(!bf) return 'lean'; return (bf>=20+t || (goal && bf-goal>=5)) ? 'cut' : 'lean'; }
function profileComplete(){ const p=profile(); return !!(p.age && p.height && DB.goals.bwCurrent); }

function bfGoalRange(p){ const g=(BF_GOALS[p.sex]||BF_GOALS.m).find(x=>x[0]===+p.bfGoal); return g?g[1]:(p.bfGoal?p.bfGoal+'%':'—'); }

/* ---------- Summary card (Me → Profile) ---------- */
function profileSection(){
  const p=profile(); const c=el('div','prof-card');
  if(!profileComplete()){
    c.innerHTML=`<div class="prof-h"><b>Set up your plan</b><span>A few quick questions — about a minute — to work out your BMI, body fat, calories, protein and water.</span></div>
      <button class="pc-next wiz-start">Start guided setup ${I.chev}</button>`;
    c.querySelector('.wiz-start').onclick=()=>openWizard();
    return c;
  }
  const t=nutTargets(todayISO()); const b=bmiInfo(); const w=+DB.goals.bwCurrent;
  const bf=+p.bfNow||null, lbm=bf? w*(1-bf/100) : null, goalBF=+p.bfGoal||null;
  const goalW = lbm&&goalBF ? Math.round(lbm/(1-goalBF/100)*10)/10 : null;
  const pct=(x,lo,hi)=>Math.max(0,Math.min(100,(x-lo)/(hi-lo)*100));
  const bfLabel = bf ? (p.bfMode==='navy'?`${bf}%`:(p.bfMode==='known'?`${bf}%`:((BF_RANGES[p.sex]||BF_RANGES.m).find(x=>x[0]===bf)||[0,bf+'%'])[1])) : 'Not set';
  const pace = p.goal==='cut' && bf && goalBF && bf>goalBF
    ? (()=>{ const fatKg=w*(bf-goalBF)/100; const wkLo=Math.round(fatKg/(w*0.01)), wkHi=Math.round(fatKg/(w*0.005)); return `Losing 0.5–1% of bodyweight a week, reaching ~${goalBF}% takes roughly <b>${wkLo}–${wkHi} weeks</b>.`; })()
    : p.goal==='lean' ? `Aim to gain about <b>${(w*0.0025).toFixed(1)}–${(w*0.005).toFixed(1)} kg a month</b> — slower gains keep fat in check.`
    : 'At maintenance, train hard and keep protein high — you can still recompose (lose fat and gain muscle) slowly.';
  c.innerHTML=`<div class="prof-h prof-h-row"><div><b>Your plan</b><span>${GOALS[p.goal].label} · ${p.sex==='f'?'Female':'Male'}, ${p.age} · ${p.height} cm · ${w} kg</span></div><button class="pc-set wiz-edit">Edit</button></div>
    <div class="nvg">
      <div class="nvg-col"><span class="nvg-h">Now</span><em>Body fat</em><b>${bfLabel}</b>${lbm?`<em>Lean mass</em><b>${lbm.toFixed(1)} kg</b>`:''}<em>Weight</em><b>${w} kg</b></div>
      <div class="nvg-arrow">${I.chev}</div>
      <div class="nvg-col goal"><span class="nvg-h">Goal</span><em>Body fat</em><b>${bfGoalRange(p)}</b>${lbm?`<em>Lean mass</em><b>${lbm.toFixed(1)}+ kg</b>`:''}<em>Weight at goal</em><b>${goalW?'≈ '+goalW+' kg':'—'}</b></div>
    </div>
    <p class="prof-note">${pace}${goalW?' Goal weight assumes you keep your current muscle — any you build adds to it.':''}</p>
    <div class="gauge-card">
      <div class="gc-h"><span>Current BMI</span><b>${b.bmi}</b><em class="${b.cls}">${b.cat}</em></div>
      <div class="gauge bmi"><i style="left:${pct(b.bmi,15,35)}%"></i></div>
      <div class="gauge-scale"><span>15</span><span style="left:${pct(18.5,15,35)}%">18.5</span><span style="left:${pct(23,15,35)}%">23</span><span style="left:${pct(27.5,15,35)}%">27.5</span><span>35</span></div>
      <p>Asian cut-offs (WHO, 2004). BMI can't tell muscle from fat, so it reads high on lifters${bf?` — your body-fat estimate is the better guide`:''}.</p>
    </div>
    <div class="plan-grid">
      <div class="plan-tile"><span>Daily calories</span><b>${t.rest}<small> kcal</small></b><em>${t.trainKcal} on training days</em>
        <div class="gauge kcal"><i style="left:${pct(t.rest,1000,5000)}%"></i></div><div class="gauge-scale tight"><span>1000</span><span>5000</span></div></div>
      <div class="plan-tile"><span>Daily water</span><b>${(t.waterRest/1000).toFixed(1)}<small> L</small></b><em>${((t.waterRest+500)/1000).toFixed(1)} L on training days</em>
        <div class="glasses">${Array.from({length:Math.round(t.waterRest/250)},()=>'<i></i>').join('')}</div></div>
    </div>
    <div class="macro-row"><div><span>Protein</span><b>${t.p} g</b></div><div><span>Carbs</span><b>${t.c} g</b></div><div><span>Fat</span><b>${t.f} g</b></div></div>
    <p class="prof-note">BMR ${t.bmr} kcal (Mifflin–St Jeor) · protein ${GOALS[p.goal].p} g/kg (Morton et al., 2018) · water ≈35 ml/kg. ${p.bfMode==='navy'?'Body fat from the US Navy tape method — usually within 3–4% of a DEXA scan.':''}</p>`;
  c.querySelector('.wiz-edit').onclick=()=>openWizard();
  return c;
}

/* ---------- Guided setup ---------- */
function openWizard(){
  const p=profile();
  wiz={step:0, d:{sex:p.sex||'m', age:p.age||'', height:p.height||'', weight:DB.goals.bwCurrent||'', bfMode:p.bfMode||'range', bfNow:p.bfNow||'',
    waist:p.waist||'', neck:p.neck||'', hip:p.hip||'', bfGoal:p.bfGoal||'', activity:p.activity||1.2, goal:p.goal||''}};
  let o=$('#wiz'); if(!o){ o=el('div','wiz'); o.id='wiz'; o.setAttribute('role','dialog'); o.setAttribute('aria-modal','true'); o.setAttribute('aria-label','Guided setup'); document.body.appendChild(o); }
  o.classList.add('show'); document.body.style.overflow='hidden'; renderWizard();
}
function closeWizard(){ const o=$('#wiz'); if(o){ o.classList.remove('show'); o.innerHTML=''; } document.body.style.overflow=''; wiz=null; }
const WIZ_STEPS=[
  {t:'What\'s your sex?', s:'Used for BMR and body-fat formulas.', ok:d=>!!d.sex, body:d=>`<div class="wz-opts two">${[['m','Male'],['f','Female']].map(([k,l])=>`<button class="wz-opt${d.sex===k?' on':''}" data-set="sex" data-v="${k}"><b>${l}</b></button>`).join('')}</div>`},
  {t:'How old are you?', s:'Metabolism changes slowly with age.', ok:d=>+d.age>=13&&+d.age<=90, body:d=>`<div class="wz-big"><input data-in="age" inputmode="numeric" value="${d.age}" placeholder="29" aria-label="Age in years"><span>years</span></div>`},
  {t:'Your height?', s:'In centimetres — 5′10″ ≈ 178 cm.', ok:d=>+d.height>=120&&+d.height<=230, body:d=>`<div class="wz-big"><input data-in="height" inputmode="decimal" value="${d.height}" placeholder="175" aria-label="Height in centimetres"><span>cm</span></div>`},
  {t:'Your weight today?', s:'Morning weight, before food, is most consistent.', ok:d=>+d.weight>=30&&+d.weight<=250, body:d=>`<div class="wz-big"><input data-in="weight" inputmode="decimal" value="${d.weight}" placeholder="72" aria-label="Weight in kilograms"><span>kg</span></div>`},
  {t:'Your body fat now?', s:'Pick the closest look, measure with a tape, or enter a scan result.', ok:d=>!!(+d.bfNow), body:d=>{
    const tabs=`<div class="seg wz-tabs">${[['range','Pick a look'],['navy','Tape measure'],['known','I know it']].map(([k,l])=>`<button data-mode="${k}" aria-pressed="${d.bfMode===k}">${l}</button>`).join('')}</div>`;
    if(d.bfMode==='navy'){ const v=navyBF(d.sex,d.height,d.waist,d.neck,d.hip);
      return tabs+`<div class="wz-tape">
        <label><span>Waist (at navel${d.sex==='f'?', narrowest point':''})</span><input data-in="waist" inputmode="decimal" value="${d.waist}" placeholder="cm"></label>
        <label><span>Neck (below the Adam's apple)</span><input data-in="neck" inputmode="decimal" value="${d.neck}" placeholder="cm"></label>
        ${d.sex==='f'?`<label><span>Hips (widest point)</span><input data-in="hip" inputmode="decimal" value="${d.hip}" placeholder="cm"></label>`:''}
        <div class="wz-result">${v?`<span>Estimated body fat</span><b>${v}%</b>`:'<span>Enter the measurements to calculate</span>'}</div></div>`; }
    if(d.bfMode==='known') return tabs+`<div class="wz-big"><input data-in="bfNow" inputmode="decimal" value="${d.bfNow}" placeholder="18" aria-label="Body fat percent"><span>%</span></div><p class="wz-hint">From a DEXA scan, InBody or calipers.</p>`;
    return tabs+`<div class="wz-opts">${(BF_RANGES[d.sex]||BF_RANGES.m).map(([v,l,desc])=>`<button class="wz-opt${+d.bfNow===v?' on':''}" data-set="bfNow" data-v="${v}"><b>${l}</b><span>${desc}</span></button>`).join('')}</div>`; }},
  {t:'Where do you want to be?', s:'Pick a target body-fat range.', ok:d=>!!(+d.bfGoal), body:d=>`<div class="wz-opts">${(BF_GOALS[d.sex]||BF_GOALS.m).map(([v,l,desc])=>`<button class="wz-opt${+d.bfGoal===v?' on':''}" data-set="bfGoal" data-v="${v}"><b>${l}</b><span>${desc}</span></button>`).join('')}</div>`},
  {t:'Daily life, outside the gym?', s:'Workouts are added separately on training days.', ok:d=>!!d.activity, body:d=>`<div class="wz-opts">${ACTIVITY.map(([v,l])=>`<button class="wz-opt${+d.activity===v?' on':''}" data-set="activity" data-v="${v}"><b>${l}</b></button>`).join('')}</div>`},
  {t:'Your main goal?', s:'You can change this any time.', ok:d=>!!d.goal, body:d=>{ const rec=recommendGoal(d.sex,+d.bfNow,+d.bfGoal);
    const why={cut:(+d.bfNow>=(d.sex==='f'?28:20))?'Your body fat is on the higher side — leaning out first makes muscle gains easier to see and keep.':`Your target is ${Math.round(+d.bfNow - +d.bfGoal)} points below where you are, so a fat-loss phase gets you there; switch to lean gain once you arrive.`,lean:'You\'re lean enough to build muscle with a small surplus without much fat gain.'};
    return `<div class="wz-opts">${Object.entries(GOALS).map(([k,g])=>`<button class="wz-opt${d.goal===k?' on':''}" data-set="goal" data-v="${k}"><b>${g.label}${k===rec?' <em class="wz-rec">Recommended</em>':''}</b><span>${k==='lean'?'Small surplus, build muscle':k==='cut'?'Deficit, keep muscle':'Recomposition at maintenance'}</span></button>`).join('')}</div>
      <p class="wz-hint">${why[rec]}</p>`; }},
];
function renderWizard(){
  const o=$('#wiz'); if(!o||!wiz) return;
  const st=WIZ_STEPS[wiz.step], d=wiz.d, n=WIZ_STEPS.length, last=wiz.step===n-1;
  o.innerHTML=`<div class="wz-top"><button class="wz-x" aria-label="Close setup">${I.chevL}</button><div class="pbar"><i style="width:${(wiz.step+1)/n*100}%"></i></div><span>${wiz.step+1}/${n}</span></div>
    <div class="wz-body"><h3>${st.t}</h3><p>${st.s}</p>${st.body(d)}</div>
    <div class="wz-foot"><button class="finish wz-next" ${st.ok(d)?'':'disabled'}>${last?'See my plan':'Continue'} ${I.chev}</button></div>`;
  o.querySelector('.wz-x').onclick=()=>{ if(wiz.step>0){ wiz.step--; renderWizard(); } else closeWizard(); };
  o.querySelectorAll('[data-set]').forEach(b=>b.onclick=()=>{ const v=b.dataset.v; d[b.dataset.set]= isNaN(+v)?v:+v; renderWizard(); });
  o.querySelectorAll('[data-mode]').forEach(b=>b.onclick=()=>{ d.bfMode=b.dataset.mode; if(d.bfMode!=='known') d.bfNow=''; renderWizard(); });
  o.querySelectorAll('[data-in]').forEach(inp=>{
    inp.oninput=()=>{ d[inp.dataset.in]=inp.value.replace(/[^0-9.]/g,'');
      if(['waist','neck','hip'].includes(inp.dataset.in)){ const v=navyBF(d.sex,d.height,d.waist,d.neck,d.hip); d.bfNow=v||'';
        const r=o.querySelector('.wz-result'); if(r) r.innerHTML=v?`<span>Estimated body fat</span><b>${v}%</b>`:'<span>Enter the measurements to calculate</span>'; }
      o.querySelector('.wz-next').disabled=!st.ok(d); };
    inp.onkeydown=e=>{ if(e.key==='Enter' && st.ok(d)) o.querySelector('.wz-next').click(); };
  });
  const first=o.querySelector('[data-in]'); if(first) requestAnimationFrame(()=>first.focus());
  o.querySelector('.wz-next').onclick=()=>{
    if(!st.ok(d)) return;
    if(!last){ wiz.step++; if(wiz.step===WIZ_STEPS.length-1 && !d.goal) d.goal=recommendGoal(d.sex,+d.bfNow,+d.bfGoal); renderWizard(); return; }
    const p=profile();
    Object.assign(p,{sex:d.sex, age:String(d.age), height:String(d.height), activity:+d.activity, goal:d.goal, bfMode:d.bfMode, bfNow:+d.bfNow, bfGoal:+d.bfGoal, waist:d.waist, neck:d.neck, hip:d.hip});
    DB.goals.bwCurrent=+d.weight; save(); closeWizard(); mePanel='profile'; renderAll(); switchTab('me'); window.scrollTo(0,0); toast('Your plan is ready');
  };
}
document.addEventListener('keydown',e=>{ if(e.key==='Escape' && wiz) closeWizard(); });
