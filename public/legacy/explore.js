/* ============================================================
   EXPLORE — tap a muscle, get the best evidence-based exercises
   for hypertrophy with setup (bench angle, grip, position), load
   guidance and the research behind each pick.
   ============================================================ */
const EXP_PRINCIPLES=[
  ['Volume','About 10–20 hard sets per muscle per week grows more than fewer sets (Schoenfeld, Ogborn & Krieger, 2017).'],
  ['Effort','Take sets to 0–2 reps from failure. Loads from ~5 to ~30 reps build similar muscle when effort is high (Schoenfeld et al., 2017).'],
  ['Stretch','Exercises that load the muscle hard at long lengths tend to grow it more (Maeo 2021, 2023; Pedrosa 2022).'],
  ['Rest','2–3 min between sets on big lifts beats 1 min for growth (Schoenfeld et al., 2016).'],
  ['Frequency','Training a muscle about 2× a week beats once a week when volume is matched (Schoenfeld, Ogborn & Krieger, 2016).'],
];
// view: f = front, b = back
const EXP_MUSCLES=[
  { id:'chest', name:'Chest', view:'f', ex:[
    {n:'Incline Dumbbell Press', r:'Upper chest', setup:['Bench 30°','Dumbbells over upper chest','Elbows ~45–60° from torso'], load:'6–12 reps · 1–2 RIR',
      why:'A ~30° incline gave the highest upper-chest (clavicular) activation; above ~45° the front delts take over.', cite:'Rodríguez-Ridao et al., 2020'},
    {n:'Flat Barbell Bench Press', r:'Mid chest', setup:['Flat bench','Grip ~1.5× shoulder width','Bar to lower sternum, shoulder blades pinned'], load:'5–10 reps · 1–2 RIR',
      why:'Heaviest chest lift you can progressively overload; a moderately wide grip puts the pecs on more stretch.', cite:'Biomechanics'},
    {n:'Seated Cable Fly', r:'Whole chest · stretch', setup:['Handles at chest height','Soft elbows','Let arms open to a deep stretch'], load:'10–15 reps · 0–1 RIR',
      why:'Cables keep tension at long muscle lengths, where training tends to produce more growth.', cite:'Wolf et al., 2023 (review)'},
    {n:'Parallel Bar Dips', r:'Lower chest', setup:['Lean forward ~30°','Elbows slightly flared','Descend until a comfortable stretch'], load:'6–12 reps · bodyweight or weighted',
      why:'Deep shoulder extension stretches the lower (sternal) pecs under load.', cite:'Biomechanics'},
    {n:'Pec Deck', r:'Chest isolation', setup:['Handles at mid-chest','Seat so arms are parallel to floor','Squeeze, then control the stretch'], load:'8–15 reps · to failure',
      why:'Stable machine fly — easy to push close to failure safely. A Mentzer staple.', cite:'Practical'},
  ]},
  { id:'back', name:'Back & lats', view:'b', ex:[
    {n:'Lat Pulldown', r:'Lats', setup:['Grip just outside shoulders (or neutral)','Lean back ~10–20°','Full stretch at the top'], load:'8–12 reps · 1–2 RIR',
      why:'Grip width changes lat activation only modestly — pick the grip that gives you the fullest stretch and pull.', cite:'EMG studies'},
    {n:'Chest-Supported Row', r:'Upper back & lats', setup:['Incline bench 30–45°','Chest on pad','Elbows ~45° for lats, flared ~75° for upper back'], load:'8–12 reps · 1–2 RIR',
      why:'Taking the lower back out of it lets your back muscles — not your erectors — be what fails.', cite:'Practical'},
    {n:'Pull-Up', r:'Lats', setup:['Start from a full dead hang','Chest to bar','Control the way down'], load:'5–12 reps · add weight when easy',
      why:'Loads the lats through a full range including the stretched top position.', cite:'Biomechanics'},
    {n:'Seated Cable Row', r:'Mid back', setup:['Neutral handle','Let shoulder blades reach forward at the stretch','Pull to lower ribs'], load:'8–12 reps · 1–2 RIR',
      why:'Allowing scapular protraction lengthens the mid-back muscles under load.', cite:'Biomechanics'},
    {n:'Close-Grip Palms-Up Pulldown', r:'Lats & biceps', setup:['Hands ~shoulder width, palms toward you','Pull to upper chest'], load:'6–10 reps · to failure',
      why:'Mentzer\'s choice for lats — the underhand grip also trains the biceps hard.', cite:'Heavy Duty'},
    {n:'Conventional Deadlift', r:'Whole posterior chain', setup:['Bar against shins','Mixed grip','Back flat, head up'], load:'5–8 reps · stop 1–2 short of failure',
      why:'Trains the most muscle in one lift. High fatigue, so keep sets few and technique perfect.', cite:'Practical'},
  ]},
  { id:'traps', name:'Traps', view:'b', ex:[
    {n:'Barbell Shrug', r:'Upper traps', setup:['Grip just outside thighs','Shrug straight up — no rolling','Pause 1 s at the top'], load:'8–15 reps · 1–2 RIR',
      why:'Direct upper-trap loading; a Mentzer substitute for deadlifts when the lower back complains.', cite:'Practical'},
    {n:'Face Pull', r:'Mid traps & rear delts', setup:['Rope at face height','Pull to forehead, elbows high','Rotate hands back at the end'], load:'12–20 reps',
      why:'Trains mid-traps and rear delts while building shoulder health.', cite:'Practical'},
  ]},
  { id:'shoulders', name:'Shoulders', view:'f', ex:[
    {n:'Cable Lateral Raises', r:'Side delts', setup:['Cable at hand height, low','Start with hand behind your body','Lean away slightly, raise to shoulder height'], load:'10–20 reps · 0–1 RIR',
      why:'Unlike dumbbells, the cable keeps tension at the bottom, where the side delt is stretched.', cite:'Biomechanics'},
    {n:'Dumbbell Lateral Raise', r:'Side delts', setup:['Slight forward lean','Lead with the elbows','Stop around shoulder height'], load:'12–20 reps · 0–1 RIR',
      why:'Simple and effective; higher reps suit this small, fatigue-resistant muscle.', cite:'Practical'},
    {n:'Seated Dumbbell Shoulder Press', r:'Front delts', setup:['Bench ~80–85° (not fully upright)','Dumbbells start at ear level','Press slightly inward'], load:'6–12 reps · 1–2 RIR',
      why:'Front delts get lots of work from pressing — one overhead press is usually enough.', cite:'Practical'},
    {n:'Reverse Pec Deck', r:'Rear delts', setup:['Handles at shoulder height','Arms wide, slight elbow bend','Sweep back, don\'t squeeze the shoulder blades hard'], load:'12–20 reps · 0–1 RIR',
      why:'Isolates rear delts better than rows, where the lats and traps do much of the work.', cite:'Practical'},
    {n:'Bent-Over Dumbbell Lateral Raise', r:'Rear delts', setup:['Hinge to near parallel','Arms out to the sides','Little elbows, lead with pinkies'], load:'10–15 reps',
      why:'Free-weight rear-delt option; part of Mentzer\'s shoulder day.', cite:'Heavy Duty'},
  ]},
  { id:'biceps', name:'Biceps', view:'f', ex:[
    {n:'Incline Dumbbell Curl', r:'Biceps long head', setup:['Bench 45–60°','Arms hang behind the torso','Curl without moving the elbows forward'], load:'8–12 reps · 0–1 RIR',
      why:'Arms behind the body stretch the long head across the shoulder — training at long lengths favours growth.', cite:'Lengthened-position research'},
    {n:'Preacher Curl', r:'Biceps short head', setup:['Pad high in the armpit','Full stretch at the bottom','Don\'t bounce out of the stretch'], load:'8–12 reps · 0–1 RIR',
      why:'Hardest in the stretched bottom position, matching where biceps growth responds best.', cite:'Lengthened-position research'},
    {n:'Bayesian Cable Curl', r:'Biceps long head', setup:['Face away from a low cable','Arm trails behind you','Curl forward, keep the elbow back'], load:'10–15 reps',
      why:'Constant cable tension with the shoulder extended keeps the long head stretched.', cite:'Biomechanics'},
    {n:'Barbell Curl', r:'Whole biceps', setup:['Shoulder-width grip','Elbows fixed at your sides'], load:'6–10 reps',
      why:'Most loadable curl for progressive overload. Mentzer\'s arm-day choice.', cite:'Practical'},
    {n:'Dumbbell Alternating Hammer Curl', r:'Brachialis & forearm', setup:['Neutral (thumbs-up) grip','No swinging'], load:'8–12 reps',
      why:'The neutral grip shifts work to the brachialis and brachioradialis for thicker arms.', cite:'EMG studies'},
  ]},
  { id:'triceps', name:'Triceps', view:'b', ex:[
    {n:'Overhead Cable Triceps Extension', r:'Triceps long head', setup:['Rope or bar, cable behind you','Elbows by your ears','Lower to a deep stretch'], load:'10–15 reps · 0–1 RIR',
      why:'Overhead extensions built noticeably more triceps — especially the long head — than pushdowns.', cite:'Maeo et al., 2023'},
    {n:'Triceps Pushdown', r:'Lateral & medial heads', setup:['Elbows pinned to your sides','Full lockout'], load:'8–15 reps',
      why:'Easy to push hard; pairs well with overhead work. Mentzer supersets it with dips.', cite:'Practical'},
    {n:'EZ-Bar Skull Crusher', r:'All heads', setup:['Lower behind the head, not to the nose','Upper arms angled slightly back'], load:'8–12 reps',
      why:'Lowering behind the head adds long-head stretch.', cite:'Biomechanics'},
    {n:'Close-Grip Bench Press', r:'Triceps (heavy)', setup:['Grip about shoulder width','Elbows tucked','Touch lower chest'], load:'5–10 reps',
      why:'Heavy compound for triceps strength and size.', cite:'Practical'},
  ]},
  { id:'abs', name:'Abs', view:'f', ex:[
    {n:'Cable Crunch', r:'Rectus abdominis', setup:['Kneel, rope by your head','Curl the spine down','Hips stay still'], load:'10–15 reps · add load over time',
      why:'Abs grow like any muscle — loaded spinal flexion lets you progressively overload them.', cite:'Practical'},
    {n:'Hanging Leg Raise', r:'Lower abs & hip flexors', setup:['Dead hang','Tilt the pelvis up at the top','No swinging'], load:'8–15 reps',
      why:'Posterior pelvic tilt is what makes the abs — not just the hip flexors — do the work.', cite:'Biomechanics'},
    {n:'Plank Saw', r:'Anti-extension core', setup:['Forearm plank','Rock forward and back from the shoulders'], load:'3 × 30 sec',
      why:'Stiffens the trunk for heavy lifting; from your rehab program.', cite:'Practical'},
  ]},
  { id:'quads', name:'Quads', view:'f', ex:[
    {n:'Barbell Back Squat', r:'Quads & glutes', setup:['Full depth (hip crease below knee)','Feet shoulder width, toes slightly out'], load:'5–10 reps · 1–3 RIR',
      why:'Full squats grew glutes and adductors more than half squats, with similar quad growth.', cite:'Kubo et al., 2019'},
    {n:'Hack Squat', r:'Quads', setup:['Feet lower on the platform','Go as deep as the knee allows'], load:'8–12 reps · 1–2 RIR',
      why:'Supported back lets you push quads close to failure with deep knee bend.', cite:'Practical'},
    {n:'Leg Press', r:'Quads', setup:['Feet mid-platform','Lower until hips start to tuck','Don\'t lock out hard'], load:'10–15 reps',
      why:'Heavy, stable quad loading with low technical demand.', cite:'Practical'},
    {n:'Leg Extension', r:'Rectus femoris', setup:['Recline the seat back','Emphasise the bottom (bent-knee) half'], load:'10–15 reps · 0–1 RIR',
      why:'Partials in the stretched (knee-bent) range grew the quads more than shortened-range partials.', cite:'Pedrosa et al., 2022'},
    {n:'Bulgarian Split Squat', r:'Quads & glutes', setup:['Rear foot on bench','Upright torso = quads, lean forward = glutes'], load:'8–12 reps each',
      why:'Single-leg loading that hits quads and glutes hard with less spinal load.', cite:'Practical'},
  ]},
  { id:'hams', name:'Hamstrings', view:'b', ex:[
    {n:'Seated Leg Curl', r:'Hamstrings', setup:['Lean your torso forward','Hips bent stretch the hamstrings'], load:'10–15 reps · 0–1 RIR',
      why:'Seated (hip-flexed) curls built clearly more hamstring muscle than lying curls.', cite:'Maeo et al., 2021'},
    {n:'Romanian Deadlift', r:'Hamstrings & glutes', setup:['Soft knees','Push hips back until a deep hamstring stretch','Bar stays close'], load:'6–10 reps · 1–2 RIR',
      why:'Heavy hip hinge loading the hamstrings at long lengths.', cite:'Biomechanics'},
    {n:'Lying Leg Curl', r:'Hamstrings', setup:['Hips pressed into the pad','Control the lowering'], load:'10–15 reps',
      why:'Good variation, though it grew less than the seated version.', cite:'Maeo et al., 2021'},
    {n:'Nordic Hamstring Curl (Assisted)', r:'Hamstrings (eccentric)', setup:['Anchor the heels','Lower as slowly as you can'], load:'3 × 5',
      why:'Builds eccentric strength and is strongly linked to fewer hamstring injuries.', cite:'van Dyk et al., 2019 (meta-analysis)'},
  ]},
  { id:'glutes', name:'Glutes', view:'b', ex:[
    {n:'Barbell Hip Thrust', r:'Glutes', setup:['Upper back on bench edge','Shins vertical at the top','Chin tucked'], load:'8–12 reps · 1–2 RIR',
      why:'Hip thrusts and squats produced similar glute growth — pick both or the one you progress best.', cite:'Plotkin et al., 2023'},
    {n:'Barbell Back Squat', r:'Glutes & quads', setup:['Go to full depth'], load:'5–10 reps',
      why:'Deep squats beat half squats for glute growth.', cite:'Kubo et al., 2019'},
    {n:'Bulgarian Split Squat', r:'Glutes', setup:['Longer stride','Lean the torso forward'], load:'8–12 reps each',
      why:'Forward lean and deep hip flexion stretch the glutes under load.', cite:'Biomechanics'},
    {n:'45° Back Extension', r:'Glutes', setup:['Pad at the hips','Feet turned out','Round the upper back slightly, drive with the glutes'], load:'12–20 reps',
      why:'A glute-biased setup turns a lower-back exercise into a strong glute builder.', cite:'Practical'},
    {n:'Walking Lunge', r:'Glutes & quads', setup:['Long steps','Back knee kisses the floor'], load:'10–12 steps each leg',
      why:'Long-stride lunges load the glutes at long lengths.', cite:'Biomechanics'},
  ]},
  { id:'calves', name:'Calves', view:'b', ex:[
    {n:'Standing Calf Raise', r:'Gastrocnemius', setup:['Knees straight','Pause 2 s in the deep stretch','No bouncing'], load:'10–20 reps · 0–1 RIR',
      why:'Training calves in the stretched range grew the gastrocnemius more.', cite:'Kassiano et al., 2023'},
    {n:'Seated Calf Raise', r:'Soleus', setup:['Knees bent 90°','Full stretch, then up onto the toes'], load:'12–20 reps',
      why:'Bending the knee shifts work to the soleus, the deeper calf muscle.', cite:'Anatomy'},
    {n:'Bent-Knee Calf Raise', r:'Soleus', setup:['Slight knee bend, standing'], load:'3 × 15',
      why:'From your rehab program — keeps the soleus strong for running.', cite:'Practical'},
  ]},
];

let expView='f', expMuscle='chest';
function expPicked(){ if(!DB.custom) DB.custom={ex:[]}; return DB.custom.ex; }
function expVid(name){ const id=VIDEOS[name]; return id?'https://www.youtube.com/watch?v='+id:null; }
function expBuildCustom(){
  const names=expPicked(); PROGRAM.splice(0,PROGRAM.length,...PROGRAM.filter(s=>s.id!=='custom'));
  if(!names.length) return null;
  const s={ id:'custom', phase:'custom', code:'EX', name:'Custom workout', short:'Custom Workout', type:'strength', est:Math.max(15,names.length*8), rest:120,
    equip:'From Explore', ex:names.map(n=>({name:n, target:'3 × 8–12', vid:expVid(n)})) };
  PROGRAM.push(s); return s;
}
function expBodySVG(view){
  const R=(id,x,y,w,h,rx=9)=>`<rect class="bm m-${id}" data-m="${id}" x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}"/>`;
  const E=(id,cx,cy,rx,ry)=>`<ellipse class="bm m-${id}" data-m="${id}" cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}"/>`;
  const base=`<circle class="bm-body" cx="100" cy="32" r="20"/><rect class="bm-body" x="91" y="50" width="18" height="16" rx="5"/>
    <rect class="bm-body" x="34" y="200" width="16" height="44" rx="8"/><rect class="bm-body" x="150" y="200" width="16" height="44" rx="8"/>`;
  const front = base + E('shoulders',60,86,17,14)+E('shoulders',140,86,17,14)+R('chest',68,78,31,40,10)+R('chest',101,78,31,40,10)
    + R('biceps',36,104,18,52)+R('biceps',146,104,18,52)+R('abs',78,122,44,70,10)
    + R('quads',68,200,29,92,12)+R('quads',103,200,29,92,12)+R('calves',72,306,22,66,10)+R('calves',106,306,22,66,10);
  const back = base + R('traps',76,64,48,24,10)+E('shoulders',60,86,17,14)+E('shoulders',140,86,17,14)
    + R('back',68,92,31,62,10)+R('back',101,92,31,62,10)+R('back',84,156,32,34,8)
    + R('triceps',36,104,18,52)+R('triceps',146,104,18,52)
    + E('glutes',85,210,18,20)+E('glutes',115,210,18,20)
    + R('hams',68,232,29,64,12)+R('hams',103,232,29,64,12)+R('calves',72,306,22,66,10)+R('calves',106,306,22,66,10);
  return `<svg viewBox="0 0 200 380" class="bodymap" role="img" aria-label="${view==='f'?'Front':'Back'} body map — tap a muscle">${view==='f'?front:back}</svg>`;
}
function renderExplore(v){
  const intro=el('div','exp-intro');
  intro.innerHTML=`<b>Build muscle — evidence first</b><span>Tap a muscle to see the best exercises for growth, with exact setup and the research behind each one.</span>`;
  v.appendChild(intro);
  const map=el('div','exp-map');
  map.innerHTML=`<div class="seg exp-seg"><button data-v="f" aria-pressed="${expView==='f'}">Front</button><button data-v="b" aria-pressed="${expView==='b'}">Back</button></div>${expBodySVG(expView)}`;
  map.querySelectorAll('.exp-seg button').forEach(b=>b.onclick=()=>{ expView=b.dataset.v; const first=EXP_MUSCLES.find(m=>m.view===expView); if(EXP_MUSCLES.find(m=>m.id===expMuscle).view!==expView && !['shoulders','calves'].includes(expMuscle)) expMuscle=first.id; renderTrain(); });
  map.querySelectorAll('.bm').forEach(r=>{ if(r.dataset.m===expMuscle) r.classList.add('on'); r.onclick=()=>{ expMuscle=r.dataset.m; renderTrain(); }; });
  v.appendChild(map);
  // accessible chip list (every muscle, both views)
  const chips=el('div','filter-row exp-chips');
  EXP_MUSCLES.forEach(m=>{ const c=el('button','chip',m.name); c.setAttribute('aria-pressed',m.id===expMuscle); c.onclick=()=>{ expMuscle=m.id; if(!['shoulders','calves'].includes(m.id)) expView=m.view; renderTrain(); }; chips.appendChild(c); });
  v.appendChild(chips);
  requestAnimationFrame(()=>{ const a=chips.querySelector('[aria-pressed="true"]'); if(a) chips.scrollLeft=a.offsetLeft-20; });

  const m=EXP_MUSCLES.find(x=>x.id===expMuscle);
  v.appendChild(el('div','section-head',`<span class="eyebrow">${m.name} · best for growth</span>`));
  const picked=expPicked();
  m.ex.forEach(x=>{
    const c=el('div','exp-card');
    const on=picked.includes(x.n);
    c.innerHTML=`<div class="exp-top"><div><b>${x.n}</b><span>${x.r}</span></div>
        <button class="exp-pick${on?' on':''}" aria-pressed="${on}" aria-label="${on?'Remove from':'Add to'} custom workout">${on?I.check:I.plus}</button></div>
      <div class="exp-setup">${x.setup.map(s=>`<span>${s}</span>`).join('')}</div>
      <div class="exp-load">${I.bolt}<span>${x.load}</span></div>
      <p class="exp-why">${x.why} <em>— ${x.cite}</em></p>`;
    c.appendChild(videoBlock(x.n, expVid(x.n)));
    c.querySelector('.exp-pick').onclick=()=>{ const i=picked.indexOf(x.n); if(i>-1) picked.splice(i,1); else picked.push(x.n); save(); renderTrain(); };
    v.appendChild(c);
  });

  const pr=el('details','exp-princ');
  pr.innerHTML=`<summary>${I.info} The science behind muscle growth</summary>${EXP_PRINCIPLES.map(([t,d])=>`<div><b>${t}</b><span>${d}</span></div>`).join('')}
    <p>Heavy Duty deliberately uses far less volume than this research suggests — it bets on maximum intensity and recovery instead. Explore is here so you can compare and mix.</p>`;
  v.appendChild(pr);

  if(picked.length){
    const bar=el('div','exp-bar');
    bar.innerHTML=`<div><b>Custom workout</b><span>${picked.length} exercise${picked.length>1?'s':''} · ${picked.slice(0,3).join(', ')}${picked.length>3?'…':''}</span></div>
      <button class="exp-clear" aria-label="Clear custom workout">${I.trash}</button><button class="exp-start">${I.play} Start</button>`;
    bar.querySelector('.exp-start').onclick=()=>{ expBuildCustom(); openSession('custom'); };
    bar.querySelector('.exp-clear').onclick=()=>{ DB.custom.ex=[]; save(); expBuildCustom(); renderTrain(); };
    v.appendChild(bar);
  }
}
window.EXPLORE_VIDEOS={"Incline Dumbbell Press":"0f6-uCUKqgA","Flat Barbell Bench Press":"4Y2ZdHCOXok","Seated Cable Fly":"CT7vDnPJZ9w","Lat Pulldown":"VXKfH6ciEBI","Chest-Supported Row":"ro2vfHfD0DQ","Pull-Up":"ylVmNQlKdAI","Seated Cable Row":"7o2oolbmzeI","Reverse Pec Deck":"6yMdhi2DVao","Incline Dumbbell Curl":"soxrZlIl35U","Preacher Curl":"fIWP-FRFNU0","Bayesian Cable Curl":"4O24gFksZ04","Overhead Cable Triceps Extension":"IaJWPqP-Bjo","EZ-Bar Skull Crusher":"F-S4K5inM9I","Close-Grip Bench Press":"UYJsFzqdgK4","Hack Squat":"VY8ko6ecfso","Seated Leg Curl":"G5iP_YcDQdE","Lying Leg Curl":"lUH80pneL5w","Romanian Deadlift":"Roe2hOnzXf4","45° Back Extension":"KA2AuDQipSQ","Seated Calf Raise":"I1uQtobaNRQ","Cable Crunch":"kc0PRn372lo","Hanging Leg Raise":"Nw0LOKe3_l8","Bulgarian Split Squat":"-4LVK1crLSw","Walking Lunge":"YYWhkctnP2o"};   // filled after embed check
