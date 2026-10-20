/* ============================================================
   HEAVY DUTY — Mike Mentzer's 4-workout baseline protocol.
   One all-out set per exercise, supersets where marked, and rest
   intervals that grow (4 → 5 → 6–7 days) as you get stronger.
   Workout 1 is transcribed from the video Vikram shared; workouts 2–4
   follow Mentzer's published "Ideal Routine" (Heavy Duty II) — marked
   `src:'mentzer-book'` until confirmed against the rest of the video.
   ============================================================ */
(function(){
  const X=(name,target,opts)=>Object.assign({name,target,log:true,setN:1},opts||{});
  window.HD_SESSIONS=[
    { id:'hd1', phase:'hd', code:'HD1', name:'Chest & back', short:'Chest & Back', type:'hd', est:25, equip:'Pec deck · Incline machine · Cable · Barbell', ex:[
      X('Pec Deck','1 × 6–10',{range:[6,10],ss:'A',note:'To failure. No pec deck? Flat dumbbell flyes or cable crossovers.'}),
      X('Incline Machine Press','1 × 1–3',{range:[1,3],ss:'A',note:'Straight from the pec deck — no rest. Hands slightly narrower than shoulders, flare the elbows back toward your ears. Smith / free-weight incline if no machine.'}),
      X('Close-Grip Palms-Up Pulldown','1 × 6–10',{range:[6,10]}),
      X('Conventional Deadlift','1 × 5–8',{range:[5,8],note:'Bar against shins, grip just outside shoulders (one hand over, one under), hips below shoulders, back flat, head up — eyes fixed where wall meets ceiling. Stand straight, no lean-back. Lower-back issues → shrugs 1 × 6–10.'}),
    ]},
    { id:'hd2', phase:'hd', code:'HD2', name:'Legs', short:'Legs', type:'hd', est:20, src:'mentzer-book', equip:'Leg extension · Leg press · Calf machine', ex:[
      X('Leg Extension','1 × 8–15',{range:[8,15],ss:'B'}),
      X('Leg Press','1 × 8–15',{range:[8,15],ss:'B',note:'Straight from leg extensions — no rest. Squats can replace leg press.'}),
      X('Standing Calf Raise','1 × 12–20',{range:[12,20]}),
    ]},
    { id:'hd3', phase:'hd', code:'HD3', name:'Shoulders & arms', short:'Shoulders & Arms', type:'hd', est:25, src:'mentzer-book', equip:'Dumbbells · Barbell · Cable · Dip bars', ex:[
      X('Dumbbell Lateral Raise','1 × 6–10',{range:[6,10]}),
      X('Bent-Over Dumbbell Lateral Raise','1 × 6–10',{range:[6,10]}),
      X('Barbell Curl','1 × 6–10',{range:[6,10]}),
      X('Triceps Pushdown','1 × 6–10',{range:[6,10],ss:'C'}),
      X('Parallel Bar Dips','1 × 3–5',{range:[3,5],ss:'C',note:'Straight from pushdowns — no rest.'}),
    ]},
    { id:'hd4', phase:'hd', code:'HD4', name:'Legs (squat)', short:'Legs · Squat', type:'hd', est:20, src:'mentzer-book', equip:'Leg extension · Squat rack · Calf machine', ex:[
      X('Leg Extension','1 × 8–15',{range:[8,15],ss:'D'}),
      X('Barbell Back Squat','1 × 8–15',{range:[8,15],ss:'D',note:'Straight from leg extensions — no rest.'}),
      X('Standing Calf Raise','1 × 12–20',{range:[12,20]}),
    ]},
  ];
  window.HD_VIDEOS={"Pec Deck":"3jYo5cMU3d4","Incline Machine Press":"ig0NyNlSce4","Close-Grip Palms-Up Pulldown":"apzFTbsm7HU","Conventional Deadlift":"MBbyAqvTNkU","Barbell Shrug":"jTVbilkxSAk","Leg Extension":"YyvSfVjQeL0","Leg Press":"oujca3_Shgw","Barbell Back Squat":"AIZ8q1qruKw","Standing Calf Raise":"YMmgqO8Jo-k","Dumbbell Lateral Raise":"3VcKaXpzqRo","Bent-Over Dumbbell Lateral Raise":"ttvfGg9d76c","Barbell Curl":"QZEqB6wUPxQ","Triceps Pushdown":"_w-HpW70nSQ","Parallel Bar Dips":"8UugSoVJLag"};   // filled after embed check
})();

/* ---------- Heavy Duty logic (runs after the main script defines DB, PROGRAM…) ---------- */
const HD_ORDER=['hd1','hd2','hd3','hd4'];
const HD_KNEE_RISK=['Leg Extension','Leg Press','Barbell Back Squat','Conventional Deadlift'];
function hdState(){
  if(!DB.hd) DB.hd={interval:4, startedAt:null};
  if(!DB.hd.startedAt){ const d=DB.history.filter(h=>HD_ORDER.includes(h.sid)).map(h=>h.date).sort()[0]; if(d) DB.hd.startedAt=d; }
  return DB.hd;
}
function hdHistory(){ return DB.history.filter(h=>HD_ORDER.includes(h.sid)).sort((a,b)=>b.ts-a.ts); }
function addDaysISO(iso,n){ const d=new Date(iso+'T00:00'); d.setDate(d.getDate()+n); return localISO(d); }
function daysBetween(a,b){ return Math.round((new Date(b+'T00:00')-new Date(a+'T00:00'))/864e5); }
function hdNext(){
  const st=hdState(), h=hdHistory();
  if(!h.length) return {id:'hd1', due:todayISO(), daysLeft:0, last:null};
  const last=h[0]; const nextId=HD_ORDER[(HD_ORDER.indexOf(last.sid)+1)%HD_ORDER.length];
  const due=addDaysISO(last.date, st.interval);
  return {id:nextId, due, daysLeft:daysBetween(todayISO(),due), last};
}
// Progress check: did the latest session beat the previous run of the same workout?
function hdProgress(){
  const h=hdHistory(); if(!h.length) return null;
  const cur=h[0]; const prev=h.slice(1).find(x=>x.sid===cur.sid); if(!prev) return null;
  let better=0, total=0;
  Object.keys(cur.sets).forEach(n=>{
    const a=(cur.sets[n]||[])[0], b=(prev.sets[n]||[])[0]; if(!a||!b) return; total++;
    if((a.kg||0)>(b.kg||0) || ((a.kg||0)===(b.kg||0) && (a.reps||0)>(b.reps||0))) better++;
  });
  return total? {better,total,stalled: better < Math.ceil(total/2), sid:cur.sid} : null;
}
function hdNextTarget(st){
  if(!st.range || !st.hist || !st.hist.length) return '';
  const top=(st.hist[0].sets||[])[0]; if(!top||!top.reps) return '';
  if(top.reps>=st.range[1] && top.kg){ const k=Math.round(top.kg*1.05/2.5)*2.5; return `Next: go heavier — about ${k>top.kg?k:top.kg+2.5} kg`; }
  return top.kg ? `Next: beat ${top.reps} reps at ${top.kg} kg` : `Next: beat ${top.reps} reps`;
}
function hdKneeWarn(){ return ['r1','r2','r3'].includes(DB.phase); }

function hdTodayCard(){
  const n=hdNext(); const s=byId(n.id); if(!s) return null;
  const c=el('div','hd-today');
  const when = n.daysLeft<=0 ? (n.daysLeft<0?`Due — ${-n.daysLeft} day${n.daysLeft===-1?'':'s'} overdue`:'Due today')
    : `Rest · due ${DOW[new Date(n.due+'T00:00').getDay()]} ${new Date(n.due+'T00:00').getDate()} ${MO[new Date(n.due+'T00:00').getMonth()]} (in ${n.daysLeft} day${n.daysLeft>1?'s':''})`;
  c.innerHTML=`<div class="hdt-top"><span class="tag hd">${s.code}</span><div class="hdt-t"><span>Heavy Duty · every ${hdState().interval} days</span><b>${s.short}</b><em class="${n.daysLeft<=0?'due':''}">${when}</em></div>
    <button class="hdt-go">${n.daysLeft<=0?'Start':'View'} ${I.chev}</button></div>`;
  c.querySelector('.hdt-go').onclick=()=>{ if(n.daysLeft<=0) openSession(n.id); else { DB.trainMode='hd'; save(); renderTrain(); switchTab('train'); } };
  return c;
}

function renderHDTrain(v){
  const st=hdState(), n=hdNext(), pr=hdProgress();
  const head=el('div','hd-card');
  const iv=st.interval;
  head.innerHTML=`
    <div class="hd-h"><span class="hd-badge">Mike Mentzer</span><b>Heavy Duty</b><span class="hd-sub">One all-out set per exercise. Grow on rest days.</span></div>
    <div class="hd-rules">
      <div><b>To failure</b><span>Rep ranges are a guide — if 10 becomes 13, keep going.</span></div>
      <div><b>Supersets</b><span>Linked exercises back-to-back, no rest between.</span></div>
      <div><b>Rest</b><span>Elsewhere, rest as long as you need — no clock, no dawdling.</span></div>
    </div>
    <div class="hd-int"><div><span>Train once every</span><b>${iv} days</b><em>${iv===4?'Start here. After ~3 weeks, slip in an extra rest day now and then.':iv===5?'Extra rest is now routine — keep adding random rest days as weights climb.':'You\'re at 6–7 days. If progress stops here, it\'s time for the consolidation program.'}</em></div>
      <div class="hd-step"><button data-d="-1" aria-label="Fewer rest days" ${iv<=4?'disabled':''}>−</button><button data-d="1" aria-label="More rest days" ${iv>=7?'disabled':''}>+</button></div></div>`;
  head.querySelectorAll('.hd-step button').forEach(b=>b.onclick=()=>{ st.interval=Math.max(4,Math.min(7,iv+ +b.dataset.d)); save(); renderAll(); toast(`Training every ${st.interval} days`); });
  v.appendChild(head);

  if(pr && pr.stalled && iv<7){
    const a=el('div','hd-alert');
    a.innerHTML=`${I.info}<div><b>Progress slowed</b><span>Your last ${byId(pr.sid).short} beat the previous one on ${pr.better} of ${pr.total} exercises. Mentzer's rule: that's the first sign of overtraining — add a rest day.</span><button>Rest ${iv+1} days between workouts</button></div>`;
    a.querySelector('button').onclick=()=>{ st.interval=iv+1; save(); renderAll(); toast(`Now training every ${st.interval} days`); };
    v.appendChild(a);
  } else if(st.startedAt && iv===4 && daysBetween(st.startedAt,todayISO())>=21){
    v.appendChild(el('div','hd-alert soft',`${I.info}<div><b>Three weeks in</b><span>Time to start inserting an extra rest day — even at random — so you never hit a sticking point.</span></div>`));
  }
  if(hdKneeWarn()){
    v.appendChild(el('div','hd-alert knee',`${I.info}<div><b>Knee check — you're in rehab ${phaseById(DB.phase).code}</b><span>Leg extensions, leg press, squats and deadlifts taken to failure are a big jump from rehab work. Run the upper-body workouts, and do your rehab session on leg days until your physio clears loaded leg training.</span></div>`));
  }
  v.appendChild(el('div','section-head','<span class="eyebrow">The four workouts · in order</span>'));
  HD_ORDER.forEach(id=>{
    const s=byId(id); const card=sessionCard(s, n.id);
    const t=card.querySelector('.today-badge'); if(t) t.textContent = n.daysLeft<=0?'Up next':'Next';
    if(s.src==='mentzer-book'){ const d=card.querySelector('.info .d'); d.insertAdjacentHTML('beforeend','<span class="dot book-txt">From Heavy Duty II</span>'); }
    v.appendChild(card);
  });
  v.appendChild(el('div','pc-foot hd-foot','Workout 1 is from the video you shared. Workouts 2–4 follow Mentzer\'s published Ideal Routine (Heavy Duty II) — paste the rest of the video\'s transcript and I\'ll match them exactly.'));
}
