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
// Heavy Duty weekdays from the weekly plan (e.g. Wed & Sat).
function hdDays(){ return ((DB.goals&&DB.goals.week)||[]).map((t,i)=>t==='hd'?i:-1).filter(i=>i>=0); }
function hdOnPlanDay(iso){
  const days=hdDays(); if(!days.length) return iso;
  for(let i=0;i<7;i++){ const d=addDaysISO(iso,i); if(days.includes(new Date(d+'T00:00').getDay())) return d; }
  return iso;
}
function hdNext(){
  const st=hdState(), h=hdHistory(), today=todayISO();
  if(!h.length){ const due=hdOnPlanDay(today); return {id:'hd1', due, daysLeft:daysBetween(today,due), last:null}; }
  const last=h[0]; const nextId=HD_ORDER[(HD_ORDER.indexOf(last.sid)+1)%HD_ORDER.length];
  // On fixed weekdays, back-to-back workouts train different muscle groups, so allow one day
  // less than the interval (Wed → Sat at 4 days). Longer intervals drop to once a week.
  const gap = hdDays().length ? Math.max(3, st.interval-1) : st.interval;
  let due=addDaysISO(last.date, gap);
  if(due<today) due=today;           // missed one: roll to the next Heavy Duty day
  due=hdOnPlanDay(due);
  return {id:nextId, due, daysLeft:daysBetween(today,due), last};
}
function hdScheduleLabel(){
  const days=hdDays();
  return days.length ? days.map(i=>DOW[i]).join(' & ') : `every ${hdState().interval} days`;
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
/* ---------- Load suggestions (one all-out set in a rep range) ----------
   1. Estimate 1-rep max from weight × reps to failure, averaging Epley, Wathan and Mayhew.
      Single formulas drift apart past ~10 reps; averaging them reduces the error
      (LeSuer et al. 1997; Reynolds et al. 2006).
   2. Solve for the weight that lands you at the target reps, about a third into the range,
      leaving room to add reps (double progression).
   3. In range: keep the weight and beat your reps. At the top of the range: go heavier
      (Mentzer; ACSM 2009 progression model). Below the range: go lighter. */
const HD_BW_EX=['Parallel Bar Dips','Pull-Up','Chin-Up'];   // bodyweight counts as load
function hdRmFactor(r){
  if(r<=1) return 1;
  const epley=1+r/30, wathan=100/(48.8+53.8*Math.exp(-0.075*r)), mayhew=100/(52.2+41.9*Math.exp(-0.055*r));
  return (epley+wathan+mayhew)/3;
}
function hdStep(kg){ return kg>=20?2.5:1; }
function hdFloor(kg){ const s=hdStep(kg); return Math.max(0, Math.floor(kg/s+1e-9)*s); }
function hdAimReps([lo,hi]){ return lo+Math.ceil((hi-lo)*0.35); }
function hdFmt(kg){ return (Math.round(kg*10)/10).toString(); }
function hdSuggest(name, range, kgIn, repsIn){
  const kg=+kgIn||0, reps=+repsIn||0;
  if(!range || !reps) return null;
  const [lo,hi]=range, aim=hdAimReps(range);
  const bw = HD_BW_EX.includes(name) ? (+DB.goals.bwCurrent||0) : 0;
  const load=kg+bw; if(!load) return null;
  const e1=load*hdRmFactor(reps);
  const forReps=r=>e1/hdRmFactor(r)-bw;                    // added kg to fail at r reps
  const res={lo,hi,aim,kg,reps,e1:Math.round(e1)};
  if(reps>=hi){
    res.action='up'; res.next=Math.max(hdFloor(forReps(aim)), kg+hdStep(kg));
  } else if(reps<lo){
    res.action='down'; res.next=Math.max(0, Math.min(hdFloor(forReps(aim)), kg-hdStep(kg)));
  } else {
    res.action='keep'; res.next=kg; res.aim=reps+1;
    res.upAt=Math.max(hdFloor(load*hdRmFactor(hi)/hdRmFactor(aim)-bw), kg+hdStep(kg));
  }
  res.pct = kg ? Math.round((res.next-kg)/kg*100) : null;
  // Knee rehab: cap leg-machine jumps at +10% a session (ACSM's 2–10% step) until MG.
  if(res.action==='up' && kg && HD_KNEE_RISK.includes(name) && hdKneeWarn()){
    const cap=Math.max(hdFloor(kg*1.10), kg+hdStep(kg));
    if(res.next>cap){ res.calc=res.next; res.next=cap; res.capped=true; res.pct=Math.round((cap-kg)/kg*100); }
  }
  return res;
}
function hdSuggestText(s, when){
  const u=v=>`${hdFmt(v)} kg`;
  const loadTxt = s.kg ? `${s.reps} × ${u(s.kg)}` : `${s.reps} reps`;
  let t;
  if(s.action==='up') t = when==='today'
    ? `Go <b>${u(s.next)}</b>, aim for <b>${s.aim} reps</b> (last: ${loadTxt})`
    : `${s.reps} reps is above ${s.lo}–${s.hi} → next time <b>${u(s.next)}</b>, aim for <b>${s.aim} reps</b>`;
  else if(s.action==='down') t = when==='today'
    ? `Drop to <b>${u(s.next)}</b>, aim for <b>${s.aim} reps</b> (last: ${loadTxt})`
    : `${s.reps} reps is below ${s.lo}–${s.hi} → next time <b>${u(s.next)}</b>, aim for <b>${s.aim} reps</b>`;
  else t = when==='today'
    ? `Stay at <b>${s.kg?u(s.kg):'bodyweight'}</b>, beat <b>${s.reps} reps</b> (aim ${s.aim}+). At ${s.hi} reps, go ${u(s.upAt)}`
    : `In range → next time stay at <b>${s.kg?u(s.kg):'bodyweight'}</b> and beat ${s.reps} reps. At ${s.hi} reps, go ${u(s.upAt)}`;
  if(s.capped) t += `<em>Knee rehab: capped at +10% a session (calculated ${u(s.calc)}).</em>`;
  else if(s.pct!==null && Math.abs(s.pct)>15) t += `<em>Big change (${s.pct>0?'+':''}${s.pct}%)${s.reps>15?' — estimates are rougher past 15 reps':''}, so fine-tune after this set.</em>`;
  return t;
}
// Text for the exercise header: live from what you've typed, else from last time.
function hdSuggestHTML(st){
  if(!st.range) return '';
  const cur=(st.sets||[]).find(x=>+x.reps>0);
  if(cur){ const s=hdSuggest(st.name,st.range,cur.kg,cur.reps); return s?`<span class="sg-when">Next time</span>${hdSuggestText(s,'next')}`:''; }
  const top=st.hist&&st.hist[0]&&(st.hist[0].sets||[])[0];
  if(top&&+top.reps){ const s=hdSuggest(st.name,st.range,top.kg,top.reps); if(s) return `<span class="sg-when">Today</span>${hdSuggestText(s,'today')}`; }
  return `<span class="sg-when">First time</span>Pick a weight you can lift ${st.range[0]}–${st.range[1]} times to failure`;
}
function hdKneeWarn(){ return ['r1','r2','r3'].includes(DB.phase); }

function hdTodayCard(){
  const n=hdNext(); const s=byId(n.id); if(!s) return null;
  const c=el('div','hd-today');
  const when = n.daysLeft<=0 ? (n.daysLeft<0?`Due — ${-n.daysLeft} day${n.daysLeft===-1?'':'s'} overdue`:'Due today')
    : `Rest · due ${DOW[new Date(n.due+'T00:00').getDay()]} ${new Date(n.due+'T00:00').getDate()} ${MO[new Date(n.due+'T00:00').getMonth()]} (in ${n.daysLeft} day${n.daysLeft>1?'s':''})`;
  c.innerHTML=`<div class="hdt-top"><span class="tag hd">${s.code}</span><div class="hdt-t"><span>Heavy Duty · ${hdScheduleLabel()}</span><b>${s.short}</b><em class="${n.daysLeft<=0?'due':''}">${when}</em></div>
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
