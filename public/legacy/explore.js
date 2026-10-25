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
  { id:'forearms', name:'Forearms', view:'f', ex:[
    {n:'Reverse Barbell Curl', r:'Brachioradialis & wrist extensors', setup:['Overhand grip, shoulder width','Elbows pinned','Slow lowering'], load:'10–15 reps',
      why:'The overhand grip shifts the work to the brachioradialis and forearm extensors.', cite:'EMG studies'},
    {n:'Dumbbell Wrist Curl', r:'Wrist flexors', setup:['Forearms on thighs or a bench','Let the dumbbell roll to your fingertips','Curl the wrist up'], load:'15–20 reps',
      why:'Small muscles respond well to higher reps and a full stretch at the fingertips.', cite:'Practical'},
    {n:'Dumbbell Alternating Hammer Curl', r:'Brachioradialis', setup:['Thumbs-up grip','No swinging'], load:'8–12 reps',
      why:'The neutral grip loads the brachioradialis, the thickest part of the forearm.', cite:'EMG studies'},
    {n:"Farmer's Walk", r:'Grip & forearms', setup:['Heavy dumbbells at your sides','Tall posture, short quick steps'], load:'3 × 30–40 m',
      why:'Builds grip strength that carries over to deadlifts, rows and pull-ups.', cite:'Practical'},
  ]},
  { id:'adductors', name:'Adductors', view:'f', ex:[
    {n:'Hip Adduction Machine', r:'Inner thigh', setup:['Start wide for a deep stretch','Squeeze in, control back out'], load:'12–20 reps',
      why:'Direct loading through a long range for a big muscle group that most programs skip.', cite:'Practical'},
    {n:'Copenhagen Plank (Short Lever)', r:'Adductors', setup:['Knee on bench, bottom leg free','Hips high, body straight'], load:'3 × 20 sec each side',
      why:'A Copenhagen-based adductor programme cut groin problems in footballers by about 40%.', cite:'Harøy et al., 2019'},
    {n:'Barbell Back Squat', r:'Adductors & glutes', setup:['Full depth','Slightly wider stance'], load:'5–10 reps',
      why:'Full-depth squats grew the adductors more than half squats.', cite:'Kubo et al., 2019'},
  ]},
  { id:'lowerback', name:'Lower back', view:'b', ex:[
    {n:'45° Back Extension', r:'Spinal erectors', setup:['Pad just below the hips','Spine neutral','Hinge down, extend to straight — no hyperextension'], load:'12–20 reps · hold a plate',
      why:'Trains the erectors through a controlled range; a neutral spine keeps the focus on the lower back.', cite:'Practical'},
    {n:'Romanian Deadlift', r:'Erectors & hamstrings', setup:['Soft knees','Hips back, back flat','Bar close to the legs'], load:'6–10 reps · 1–2 RIR',
      why:'The erectors work hard holding a flat back while the hamstrings lengthen under load.', cite:'Biomechanics'},
    {n:'Conventional Deadlift', r:'Erectors (isometric)', setup:['Bar against shins','Back flat, head up'], load:'5–8 reps',
      why:'Heavy isometric work for the whole back side of the body.', cite:'Practical'},
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
/* Exercise groups (by region / function) and an A/B rotation per muscle.
   Each session pairs a different region or muscle length, so alternating A and B covers
   the whole muscle across the week. Variety across regions grows muscles more evenly than
   one exercise alone (Costa et al. 2021; Kassiano et al. 2022), and training at long muscle
   lengths gets priority in A (Maeo 2021/2023; Pedrosa 2022). */
const EXP_GROUPS={
  chest:[ {g:'Upper chest', why:'Incline presses hit the clavicular head', ex:['Incline Dumbbell Press']},
          {g:'Mid & lower chest', why:'Flat and dipping presses', ex:['Flat Barbell Bench Press','Parallel Bar Dips']},
          {g:'Flyes', why:'Isolation with a deep stretch', ex:['Seated Cable Fly','Pec Deck']} ],
  back:[ {g:'Lats · vertical pull', why:'Pulling down from overhead', ex:['Lat Pulldown','Pull-Up','Close-Grip Palms-Up Pulldown']},
         {g:'Mid & upper back · rows', why:'Pulling toward the torso', ex:['Chest-Supported Row','Seated Cable Row']},
         {g:'Whole back · hinge', why:'Heavy full-body pull', ex:['Conventional Deadlift']} ],
  traps:[ {g:'Upper traps', why:'Shrugging', ex:['Barbell Shrug']},
          {g:'Mid traps & rear delts', why:'Pulling with elbows high', ex:['Face Pull']} ],
  shoulders:[ {g:'Side delts', why:'Width — raises out to the side', ex:['Cable Lateral Raises','Dumbbell Lateral Raise']},
              {g:'Front delts', why:'Overhead pressing', ex:['Seated Dumbbell Shoulder Press']},
              {g:'Rear delts', why:'Reverse flyes', ex:['Reverse Pec Deck','Bent-Over Dumbbell Lateral Raise']} ],
  biceps:[ {g:'Long head', why:'Arm behind the body stretches it', ex:['Incline Dumbbell Curl','Bayesian Cable Curl']},
           {g:'Short head', why:'Arm in front of the body', ex:['Preacher Curl']},
           {g:'Whole biceps', why:'Heaviest, most loadable curl', ex:['Barbell Curl']},
           {g:'Brachialis', why:'Neutral grip, thicker-looking arm', ex:['Dumbbell Alternating Hammer Curl']} ],
  triceps:[ {g:'Long head', why:'Arm overhead stretches it', ex:['Overhead Cable Triceps Extension','EZ-Bar Skull Crusher']},
            {g:'Lateral & medial heads', why:'Arm by your side, heavy pressing', ex:['Triceps Pushdown','Close-Grip Bench Press']} ],
  abs:[ {g:'Spinal flexion', why:'Curling the trunk', ex:['Cable Crunch','Hanging Leg Raise']},
        {g:'Anti-extension', why:'Bracing against movement', ex:['Plank Saw']} ],
  forearms:[ {g:'Brachioradialis & extensors', why:'Overhand and neutral grips', ex:['Reverse Barbell Curl','Dumbbell Alternating Hammer Curl']},
             {g:'Flexors & grip', why:'Wrist curls and carries', ex:['Dumbbell Wrist Curl',"Farmer's Walk"]} ],
  adductors:[ {g:'Isolation', why:'Direct inner-thigh work', ex:['Hip Adduction Machine','Copenhagen Plank (Short Lever)']},
              {g:'Compound', why:'Deep squats', ex:['Barbell Back Squat']} ],
  lowerback:[ {g:'Isolation', why:'Back extensions', ex:['45° Back Extension']},
              {g:'Hinges', why:'Holding a flat back under load', ex:['Romanian Deadlift','Conventional Deadlift']} ],
  quads:[ {g:'Squat pattern', why:'Heavy two-leg knee bend', ex:['Hack Squat','Barbell Back Squat','Leg Press']},
          {g:'Single leg', why:'Each leg on its own', ex:['Bulgarian Split Squat']},
          {g:'Rectus femoris', why:'Leg extensions isolate it', ex:['Leg Extension']} ],
  hams:[ {g:'Knee flexion · curls', why:'Bending the knee', ex:['Seated Leg Curl','Lying Leg Curl','Nordic Hamstring Curl (Assisted)']},
         {g:'Hip hinge', why:'Stretching at the hip', ex:['Romanian Deadlift']} ],
  glutes:[ {g:'Hip extension', why:'Hardest at the top (short length)', ex:['Barbell Hip Thrust','45° Back Extension']},
           {g:'Deep hip flexion', why:'Stretched under load', ex:['Bulgarian Split Squat','Barbell Back Squat','Walking Lunge']} ],
  calves:[ {g:'Gastrocnemius', why:'Straight-knee raises', ex:['Standing Calf Raise']},
           {g:'Soleus', why:'Bent-knee raises', ex:['Seated Calf Raise','Bent-Knee Calf Raise']} ],
};
// Equal-sized sessions. Each one covers the muscle's key regions/lengths (`why`), so either
// session alone is a complete workout and alternating adds variety. Spare exercises are swap-ins.
// Small muscles: 2 exercises (~4–6 sets). Bigger muscles: 2 exercises plus the overlap they get
// from compound lifts. An exercise may sit in both sessions when it's the only one for a region.
const EXP_SPLIT={
  chest:{why:'Each session: one press + one fly (stretch)', A:['Incline Dumbbell Press','Seated Cable Fly'], B:['Flat Barbell Bench Press','Pec Deck'], swap:['Parallel Bar Dips']},
  back:{why:'Each session: one vertical pull (lats) + one row (mid back)', A:['Lat Pulldown','Chest-Supported Row'], B:['Pull-Up','Seated Cable Row'], swap:['Close-Grip Palms-Up Pulldown','Conventional Deadlift']},
  traps:{why:'Upper traps one day, mid traps the next', A:['Barbell Shrug'], B:['Face Pull'], swap:[]},
  shoulders:{why:'Each session: side delts + rear delts (presses for chest already train the front)', A:['Cable Lateral Raises','Reverse Pec Deck'], B:['Dumbbell Lateral Raise','Bent-Over Dumbbell Lateral Raise'], swap:['Seated Dumbbell Shoulder Press']},
  biceps:{why:'Each session: one long-head curl (arm behind) + one short-head or heavy curl', A:['Incline Dumbbell Curl','Preacher Curl'], B:['Bayesian Cable Curl','Barbell Curl'], swap:['Dumbbell Alternating Hammer Curl']},
  triceps:{why:'Each session: one overhead (long head) + one arm-down (lateral & medial)', A:['Overhead Cable Triceps Extension','Triceps Pushdown'], B:['EZ-Bar Skull Crusher','Close-Grip Bench Press'], swap:[]},
  abs:{why:'Each session: one loaded crunch/raise + bracing', A:['Cable Crunch','Plank Saw'], B:['Hanging Leg Raise','Plank Saw'], swap:[]},
  forearms:{why:'Each session: one for the extensors/brachioradialis + one for the flexors/grip', A:['Reverse Barbell Curl','Dumbbell Wrist Curl'], B:['Dumbbell Alternating Hammer Curl',"Farmer's Walk"], swap:[]},
  adductors:{why:'One isolation per session (squats already train them)', A:['Hip Adduction Machine'], B:['Copenhagen Plank (Short Lever)'], swap:['Barbell Back Squat']},
  lowerback:{why:'One hinge or extension per session', A:['Romanian Deadlift'], B:['45° Back Extension'], swap:['Conventional Deadlift']},
  quads:{why:'Each session: one heavy two-leg lift + one isolation or single-leg', A:['Hack Squat','Leg Extension'], B:['Leg Press','Bulgarian Split Squat'], swap:['Barbell Back Squat']},
  hams:{why:'Each session: one curl (knee) + one hinge or eccentric', A:['Seated Leg Curl','Romanian Deadlift'], B:['Lying Leg Curl','Nordic Hamstring Curl (Assisted)'], swap:[]},
  glutes:{why:'Each session: one hip extension (short length) + one deep-stretch lift', A:['Barbell Hip Thrust','Bulgarian Split Squat'], B:['45° Back Extension','Barbell Back Squat'], swap:['Walking Lunge']},
  calves:{why:'Each session: straight-knee (gastrocnemius) + bent-knee (soleus)', A:['Standing Calf Raise','Seated Calf Raise'], B:['Standing Calf Raise','Bent-Knee Calf Raise'], swap:[]},
};
function expGroupOf(mid,name){ const g=(EXP_GROUPS[mid]||[]).find(x=>x.ex.includes(name)); return g?g.g:''; }
function expSessionOf(mid,name){ const s=EXP_SPLIT[mid]; if(!s) return ''; const a=s.A.includes(name), b=s.B.includes(name); return a&&b?'A & B':a?'A':b?'B':(s.swap||[]).includes(name)?'Swap-in':''; }
// Next session = whichever of A / B you logged longest ago (A if neither).
function expNextSession(mid){
  const s=EXP_SPLIT[mid]; if(!s) return 'A';
  const last=names=>DB.history.reduce((m,h)=>names.some(n=>h.sets&&h.sets[n])&&h.date>m?h.date:m,'');
  const a=last(s.A.filter(n=>!s.B.includes(n))), b=last(s.B.filter(n=>!s.A.includes(n)));   // shared moves don't tell them apart
  return a && a>=b ? 'B' : 'A';
}
function expRotationCard(m){
  const s=EXP_SPLIT[m.id]; if(!s) return null;
  const next=expNextSession(m.id), picked=expPicked(), mn=m.name.toLowerCase();
  const pair=EXP_PAIRS[m.id]; const big=(pair&&pair.day||[]).filter(id=>!EXP_SMALL.includes(id)).map(id=>expM(id).name.toLowerCase());
  const c=el('div','exp-rot');
  c.innerHTML=`<div class="rot-head"><b>Do one session, not all ${m.ex.length}</b>
      <span>${s.why}. Alternate A and B each time you train ${mn} · 2–3 sets per exercise, 0–1 RIR.</span></div>
    <div class="rot-grid">${['A','B'].map(k=>`
      <div class="rot-col${k===next?' next':''}">
        <span class="rot-tag">Session ${k}${k===next?' · next':''}</span>
        <ol>${s[k].map(n=>`<li><b>${n}</b><em>${expGroupOf(m.id,n)}</em></li>`).join('')}</ol>
        <button class="rot-add" data-k="${k}">${s[k].every(n=>picked.includes(n))?`${I.check} Added`:`${I.plus} Add session ${k}`}</button>
      </div>`).join('')}</div>
    ${(s.swap||[]).length?`<p class="rot-swap"><b>Swap-in${s.swap.length>1?'s':''}</b> ${s.swap.map(n=>`${n} <em>(${expGroupOf(m.id,n)})</em>`).join(' · ')} — use instead of the same-type move for variety or if equipment is busy.</p>`:''}
    <p class="rot-note">${EXP_SMALL.includes(m.id)&&big.length?`Training ${big.join(' or ')} the same day? It already counts as about half your ${mn} work, so do 2 sets per exercise.`:`Next session is picked from your history — whichever you did longest ago.`}</p>`;
  c.querySelectorAll('.rot-add').forEach(b=>b.onclick=()=>{ s[b.dataset.k].forEach(n=>{ if(!picked.includes(n)) picked.push(n); }); save(); renderTrain(); toast(`Session ${b.dataset.k} added to your custom workout`); });
  return c;
}
/* Pairings for the selected muscle.
   ss  = superset partner: the opposing muscle. Alternating agonist–antagonist sets keeps
         reps and load at least as high in about half the time (Robbins et al. 2010;
         Paz et al. 2017; Zhang et al. 2023 superset meta-analysis).
   day = same-day partners: muscles that assist in the same movements (push or pull). Overlap
         counts as volume: each compound set is about ½ a set for the assisting muscle
         (Pelland et al. 2024 dose-response meta-analysis; pulldowns alone grew biceps about as
         much as pulldowns + curls in Gentil et al. 2013). So train the bigger muscle first
         (Simão et al. 2012; Nunes et al. 2021) and keep direct sets for the smaller one low.
   combo = exercises that train the muscle and a partner together. */
const EXP_SMALL=['biceps','triceps','forearms','calves','abs'];
const EXP_PAIRS={
  chest:     {ss:'back',      day:['triceps','shoulders'], combo:{triceps:['Parallel Bar Dips','Close-Grip Bench Press'], shoulders:['Incline Dumbbell Press']}},
  back:      {ss:'chest',     day:['biceps','traps'],      combo:{biceps:['Close-Grip Palms-Up Pulldown','Pull-Up'], traps:['Conventional Deadlift','Seated Cable Row']}},
  traps:     {ss:'chest',     day:['back','shoulders'],    combo:{back:['Conventional Deadlift'], shoulders:['Face Pull']}},
  shoulders: {ss:'back',      day:['triceps','chest'],     combo:{triceps:['Seated Dumbbell Shoulder Press'], chest:['Incline Dumbbell Press']}},
  biceps:    {ss:'triceps',   day:['back','forearms'],     combo:{back:['Close-Grip Palms-Up Pulldown','Pull-Up'], forearms:['Dumbbell Alternating Hammer Curl']}},
  triceps:   {ss:'biceps',    day:['chest','shoulders'],   combo:{chest:['Close-Grip Bench Press','Parallel Bar Dips'], shoulders:['Seated Dumbbell Shoulder Press']}},
  abs:       {ss:'lowerback', day:[],                      combo:{}},
  forearms:  {ss:'triceps',   day:['biceps'],              combo:{biceps:['Dumbbell Alternating Hammer Curl','Reverse Barbell Curl']}},
  adductors: {ss:'glutes',    day:['quads'],               combo:{quads:['Barbell Back Squat'], glutes:['Barbell Back Squat']}},
  lowerback: {ss:'abs',       day:['hams','glutes'],       combo:{hams:['Romanian Deadlift'], glutes:['45° Back Extension']}},
  quads:     {ss:'hams',      day:['glutes','adductors'],  combo:{glutes:['Bulgarian Split Squat','Barbell Back Squat'], adductors:['Barbell Back Squat']}},
  hams:      {ss:'quads',     day:['glutes','lowerback'],  combo:{glutes:['Romanian Deadlift'], lowerback:['Romanian Deadlift']}},
  glutes:    {ss:'quads',     day:['hams','adductors'],    combo:{hams:['Romanian Deadlift'], quads:['Bulgarian Split Squat','Barbell Back Squat','Walking Lunge'], adductors:['Barbell Back Squat']}},
  calves:    {ss:'quads',     day:['hams'],                combo:{}},
};
const expM=id=>EXP_MUSCLES.find(m=>m.id===id);
// partners this exercise also trains, for the selected muscle
function expAlso(mid, name){
  const p=EXP_PAIRS[mid]; if(!p) return [];
  return Object.keys(p.combo).filter(k=>p.combo[k].includes(name));
}
let expPairOpen=null; // "muscle:partner" of the expanded pairing row
function expFind(name){ for(const m of EXP_MUSCLES){ const x=m.ex.find(e=>e.n===name); if(x) return x; } return null; }
function expPairsCard(mid){
  const p=EXP_PAIRS[mid]; if(!p) return null;
  const rows=[];
  if(p.ss){ const m=expM(p.ss); rows.push({id:p.ss, kind:'Superset partner', ex:m.ex.slice(0,2).map(x=>x.n), combo:false,
    hint:'Alternate one set of each, no rest between',
    why:`Opposite muscle — alternate sets with no rest and keep your reps up in about half the time.`}); }
  p.day.forEach(id=>{ const m=expM(id); const combos=(p.combo[id]||[]).slice(0,2);
    const a=expM(mid).name.toLowerCase(), b=m.name.toLowerCase();
    const sm=EXP_SMALL.includes(mid), sp=EXP_SMALL.includes(id);
    let why;
    if(sm && !sp) why=`Overlap: ${b} work already trains your ${a} (each set ≈ ½ a ${a} set). Do ${b} first, then just 2–4 direct ${a} sets — more adds fatigue, not growth.`;
    else if(!sm && sp) why=`Overlap: your ${a} work already trains ${b} (each set ≈ ½ a ${b} set). Finish with 2–4 ${b} sets at most.`;
    else why=`Overlap: these share the work, so count shared sets as ½ each and keep each muscle around 10–20 sets a week.`;
    rows.push({id, kind:'Same-day partner · overlaps', ex:combos.length?combos:[m.ex[0].n], combo:combos.length>0,
      hint: combos.length ? `Covers ${a} and ${b} together` : `Top ${b} pick`, why}); });
  if(!rows.length) return null;
  const c=el('div','exp-pairs');
  c.appendChild(el('div','ep-head',`${I.bolt}<span>Pairs well with</span><em>Tap to see the exercises</em>`));
  const picked=expPicked();
  rows.forEach(r=>{
    const key=mid+':'+r.id, open=expPairOpen===key;
    const wrap=el('div','ep-item'+(open?' open':''));
    const head=el('button','ep-row',`<span class="ep-kind">${r.kind}</span>
      <span class="ep-main"><b>${expM(r.id).name}</b><em>${r.ex.length} exercise${r.ex.length>1?'s':''}${r.combo?' · covers both':''}</em></span>
      <span class="ep-why">${r.why}</span><span class="ep-go">${I.chev}</span>`);
    head.setAttribute('aria-expanded',open);
    head.onclick=()=>{ expPairOpen = open ? null : key; renderTrain(); };
    wrap.appendChild(head);
    if(open){
      const panel=el('div','ep-panel');
      panel.appendChild(el('div','ep-hint',r.hint));
      r.ex.forEach(n=>{
        const x=expFind(n); if(!x) return;
        const on=picked.includes(n);
        const card=el('div','ep-ex');
        card.innerHTML=`<div class="exp-top"><div><b>${x.n}</b><span>${x.r}</span>${r.combo?`<span class="exp-also">Covers both</span>`:''}</div>
          <button class="exp-pick${on?' on':''}" aria-pressed="${on}" aria-label="${on?'Remove from':'Add to'} custom workout">${on?I.check:I.plus}</button></div>
          <div class="exp-setup">${x.setup.map(s=>`<span>${s}</span>`).join('')}</div>
          <div class="exp-load">${I.bolt}<span>${x.load}</span></div>`;
        card.appendChild(videoBlock(x.n, expVid(x.n)));
        card.querySelector('.exp-pick').onclick=()=>{ const i=picked.indexOf(n); if(i>-1) picked.splice(i,1); else picked.push(n); save(); renderTrain(); };
        panel.appendChild(card);
      });
      const all=el('button','ep-all',`All ${expM(r.id).name} exercises ${I.chev}`);
      all.onclick=()=>{ expPairOpen=null; expMuscle=r.id; const m=expM(r.id); if(!expInView(m.id,expView)) expView=m.view; renderTrain(); window.scrollTo(0,0); };
      panel.appendChild(all);
      wrap.appendChild(panel);
    }
    c.appendChild(wrap);
  });
  c.appendChild(el('p','ep-cite','Supersets: Robbins 2010; Paz 2017; Zhang 2023. Overlap as volume: Pelland 2024; Gentil 2013. Exercise order: Simão 2012; Nunes 2021.'));
  return c;
}
function expPicked(){ if(!DB.custom) DB.custom={ex:[]}; return DB.custom.ex; }
function expVid(name){ const id=VIDEOS[name]; return id?'https://www.youtube.com/watch?v='+id:null; }
function expBuildCustom(){
  const names=expPicked(); PROGRAM.splice(0,PROGRAM.length,...PROGRAM.filter(s=>s.id!=='custom'));
  if(!names.length) return null;
  const s={ id:'custom', phase:'custom', code:'EX', name:'Custom workout', short:'Custom Workout', type:'strength', est:Math.max(15,names.length*8), rest:120,
    equip:'From Explore', ex:names.map(n=>({name:n, target:'3 × 8–12', vid:expVid(n)})) };
  PROGRAM.push(s); return s;
}
function expInView(mid,view){ return (window.BODY_MAP&&BODY_MAP[view]||[]).some(([g])=>g===mid); }
function expBodySVG(view){
  const parts=(window.BODY_MAP&&BODY_MAP[view])||[];
  const shapes=parts.map(([g,polys])=>polys.map(pt=>g
      ? `<polygon class="bm" data-m="${g}" points="${pt}"><title>${(EXP_MUSCLES.find(m=>m.id===g)||{}).name||g}</title></polygon>`
      : `<polygon class="bm-body" points="${pt}"/>`).join('')).join('');
  return `<svg viewBox="0 0 100 200" class="bodymap" role="img" aria-label="${view==='f'?'Front':'Back'} body map — tap a muscle">${shapes}</svg>`;
}
function renderExplore(v){
  const intro=el('div','exp-intro');
  intro.innerHTML=`<b>Build muscle — evidence first</b><span>Tap a muscle to see the best exercises for growth, with exact setup and the research behind each one.</span>`;
  v.appendChild(intro);
  const map=el('div','exp-map');
  const cur=EXP_MUSCLES.find(x=>x.id===expMuscle);
  map.innerHTML=`<div class="seg exp-seg"><button data-v="f" aria-pressed="${expView==='f'}">Front</button><button data-v="b" aria-pressed="${expView==='b'}">Back</button></div>
    <div class="exp-fig">${expBodySVG(expView)}</div><div class="exp-sel"><span>Selected</span><b>${cur?cur.name:''}</b><em>${cur?cur.ex.length+' exercises':''}</em></div>`;
  map.querySelectorAll('.exp-seg button').forEach(b=>b.onclick=()=>{ expView=b.dataset.v; if(!expInView(expMuscle,expView)) expMuscle=EXP_MUSCLES.find(m=>m.view===expView).id; renderTrain(); });
  const pair=EXP_PAIRS[expMuscle]||{}; const partners=[pair.ss,...(pair.day||[])].filter(Boolean);
  map.querySelectorAll('.bm').forEach(r=>{ if(r.dataset.m===expMuscle) r.classList.add('on'); else if(partners.includes(r.dataset.m)) r.classList.add('pair'); r.onclick=()=>{ expMuscle=r.dataset.m; renderTrain(); }; });
  v.appendChild(map);
  // accessible chip list (every muscle, both views)
  const chips=el('div','filter-row exp-chips');
  EXP_MUSCLES.forEach(m=>{ const c=el('button','chip'+(partners.includes(m.id)?' pair':''),m.name); c.setAttribute('aria-pressed',m.id===expMuscle); c.onclick=()=>{ expMuscle=m.id; if(!expInView(m.id,expView)) expView=m.view; renderTrain(); }; chips.appendChild(c); });
  v.appendChild(chips);
  requestAnimationFrame(()=>{ const a=chips.querySelector('[aria-pressed="true"]'); if(a) chips.scrollLeft=a.offsetLeft-20; });

  const m=EXP_MUSCLES.find(x=>x.id===expMuscle);
  v.appendChild(el('div','section-head',`<span class="eyebrow">${m.name} · best for growth</span>`));
  const rc=expRotationCard(m); if(rc) v.appendChild(rc);
  const pc=expPairsCard(m.id); if(pc) v.appendChild(pc);
  const picked=expPicked();
  const groups=(EXP_GROUPS[m.id]||[]).map(g=>({...g, ex:g.ex.filter(n=>m.ex.some(x=>x.n===n))}));
  const rest=m.ex.filter(x=>!groups.some(g=>g.ex.includes(x.n))).map(x=>x.n);
  if(rest.length) groups.push({g:'More', why:'', ex:rest});
  groups.forEach(g=>{
  if(!g.ex.length) return;
  v.appendChild(el('div','exp-group',`<b>${g.g}</b>${g.why?`<span>${g.why}</span>`:''}`));
  g.ex.map(n=>m.ex.find(x=>x.n===n)).forEach(x=>{
    const also=expAlso(m.id, x.n);
    const ses=expSessionOf(m.id, x.n);
    const c=el('div','exp-card'+(also.length?' combo':''));
    const on=picked.includes(x.n);
    c.innerHTML=`<div class="exp-top"><div><b>${x.n}</b><span>${x.r}</span>${ses?`<span class="exp-ses">${ses==='Swap-in'?ses:'Session '+ses}</span>`:''}${also.length?`<span class="exp-also">Also trains ${also.map(a=>expM(a).name).join(' & ')}</span>`:''}</div>
        <button class="exp-pick${on?' on':''}" aria-pressed="${on}" aria-label="${on?'Remove from':'Add to'} custom workout">${on?I.check:I.plus}</button></div>
      <div class="exp-setup">${x.setup.map(s=>`<span>${s}</span>`).join('')}</div>
      <div class="exp-load">${I.bolt}<span>${x.load}</span></div>
      <p class="exp-why">${x.why} <em>— ${x.cite}</em></p>`;
    c.appendChild(videoBlock(x.n, expVid(x.n)));
    c.querySelector('.exp-pick').onclick=()=>{ const i=picked.indexOf(x.n); if(i>-1) picked.splice(i,1); else picked.push(x.n); save(); renderTrain(); };
    v.appendChild(c);
  });
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
window.EXPLORE_VIDEOS={"Dumbbell Wrist Curl":"VGkF2NTtao0","Reverse Barbell Curl":"YO98hq3vX7g","Farmer's Walk":"8OtwXwrJizk","Hip Adduction Machine":"fpVHoidfg60","Incline Dumbbell Press":"0f6-uCUKqgA","Flat Barbell Bench Press":"4Y2ZdHCOXok","Seated Cable Fly":"CT7vDnPJZ9w","Lat Pulldown":"VXKfH6ciEBI","Chest-Supported Row":"ro2vfHfD0DQ","Pull-Up":"ylVmNQlKdAI","Seated Cable Row":"7o2oolbmzeI","Reverse Pec Deck":"6yMdhi2DVao","Incline Dumbbell Curl":"soxrZlIl35U","Preacher Curl":"fIWP-FRFNU0","Bayesian Cable Curl":"4O24gFksZ04","Overhead Cable Triceps Extension":"IaJWPqP-Bjo","EZ-Bar Skull Crusher":"F-S4K5inM9I","Close-Grip Bench Press":"UYJsFzqdgK4","Hack Squat":"VY8ko6ecfso","Seated Leg Curl":"G5iP_YcDQdE","Lying Leg Curl":"lUH80pneL5w","Romanian Deadlift":"Roe2hOnzXf4","45° Back Extension":"KA2AuDQipSQ","Seated Calf Raise":"I1uQtobaNRQ","Cable Crunch":"kc0PRn372lo","Hanging Leg Raise":"Nw0LOKe3_l8","Bulgarian Split Squat":"-4LVK1crLSw","Walking Lunge":"YYWhkctnP2o"};   // filled after embed check
