/* ============================================================
   REHAB PHASES — the road back to the Management (Week 14) program.
   src: 'physio' = from the videos Vikram recorded and sent his physio.
                   Counts/dates (`rec`) come from window.PHYSIO_VIDEO_LOG, built
                   from data/physio-videos/*.csv by data/physio-videos/build.mjs.
                   Any exercise found in that log is marked 'physio' automatically.
        'saves'  = from Vikram's saved reels/screenshots
        'claude' = added by Claude (ACL evidence / football drills)
        (none)   = from the physio's program PDF
   'claude' steps fill the gaps between the recorded exercises, following
   standard ACL rehab progressions (Melbourne ACL Rehabilitation Guide 2.0,
   MOON post-op guidelines, Aspetar ACL guideline, KNGF ACL guideline).
   ============================================================ */
(function(){
  const X=(name,target,opts)=>Object.assign({name,target},opts||{});
  const P=(name,target,opts)=>X(name,target,Object.assign({src:'physio'},opts||{}));

  // Phase gates: criteria to move OUT of a phase. `k` = auto-check key from assessments.
  window.PHASES=[
    { id:'r1', code:'P1', name:'Reactivate', sub:'Isometrics & knee control',
      goal:'Wake the quad back up, own full extension and settle the knee before loading it.',
      gate:[
        {t:'Pain ≤ 2/10 at rest and during exercise', k:'pain2'},
        {t:'No swelling, or trace only (stroke test)', k:'swell0'},
        {t:'Full knee extension (0° lacking)', k:'ext0'},
        {t:'Knee flexion ≥ 120°', k:'flex120'},
        {t:'Straight-leg raise with no quad lag'},
        {t:'Single-leg balance 30 s on the injured side', k:'bal30'},
      ]},
    { id:'r2', code:'P2', name:'Build strength', sub:'Quads, hamstrings & hips',
      goal:'Rebuild the strength base: quads first, then hamstrings, adductors and calves.',
      gate:[
        {t:'Knee flexion ≥ 135°', k:'flex135'},
        {t:'Single-leg calf raises ≥ 25 reps (injured side)', k:'calf25'},
        {t:'Single-leg bridge LSI ≥ 80%', k:'bridge80'},
        {t:'Single-leg squat LSI ≥ 80%', k:'sq80'},
        {t:'Y-balance anterior reach difference ≤ 4 cm', k:'yb4'},
        {t:'No swelling after strength sessions', k:'swell0'},
      ]},
    { id:'r3', code:'P3', name:'Power & running', sub:'Landing, plyometrics, return to run',
      goal:'Learn to land and absorb force again, then rebuild running tolerance.',
      gate:[
        {t:'Hop tests LSI ≥ 85% (single, triple, crossover, 6 m timed)', k:'hop85'},
        {t:'Quad strength LSI ≥ 80% (if measured)', k:'quad80'},
        {t:'20–30 min continuous running, pain-free next day'},
        {t:'Clean landings — no knee caving (check on video)'},
      ]},
    { id:'r4', code:'P4', name:'Return to football', sub:'Cutting, agility & ball work',
      goal:'Reintroduce change of direction and football skills at rising speed.',
      gate:[
        {t:'All hop tests LSI ≥ 90%', k:'hop90'},
        {t:'Quad strength LSI ≥ 90%', k:'quad90'},
        {t:'ACL-RSI (confidence) ≥ 65', k:'rsi65'},
        {t:'Full-speed football drills pain-free'},
        {t:'Physio clearance'},
      ]},
    { id:'mgmt', code:'MG', name:'Management', sub:'Week 14 gym program',
      goal:'Your physio\'s ongoing program — keep strength, power and conditioning topped up.',
      gate:[] },
  ];

  window.REHAB_SESSIONS=[
    /* ---------- P1 · Reactivate ---------- */
    { id:'r1a', phase:'r1', code:'1A', name:'Isometric activation', short:'Iso Activation', type:'rehab', est:20, equip:'Resistance band · Post / wall', ex:[
      X('Spanish Squat Iso Hold','5 × 45 sec',{sec:45,setN:5,src:'saves',note:'Band behind knees, sit back, shins vertical. Effort ~7/10.'}),
      X('Split Squat Iso Hold','3 min each leg',{sec:180,setN:2,src:'saves',note:'Set 1 = left leg forward, set 2 = right. Back knee just off the floor.'}),
      X('Straight-Leg Hip Flexor Iso (Banded)','3 × 30 sec ea',{sec:30,setN:6,src:'saves',note:'Band on the foot, lock the knee, lift and hold. Alternate legs.'}),
      X('Bent-Knee Hip Flexor Iso (Banded)','3 × 30 sec ea',{sec:30,setN:6,src:'saves',note:'Drive the knee to hip height against the band and hold.'}),
      X('Long Lever Bridge Iso','3 × 30 sec',{sec:30,setN:3,src:'saves',note:'Heels far from hips so the hamstrings do the work.'}),
    ]},
    { id:'r1b', phase:'r1', code:'1B', name:'Knee control', short:'Knee Control', type:'rehab', est:20, equip:'Band · Treadmill', ex:[
      X('Quad Set (Isometric)','3 × 10',{src:'claude',note:'Squeeze the quad, press the back of the knee down, hold 5 s per rep.'}),
      P('Straight Leg Raise','3 × 10',{note:'Lock the quad first — no knee bend as you lift.'}),
      P('Banded Terminal Knee Extension (TKE)','2 × 15',{log:true}),
      X('Bent-Knee Calf Raise','3 × 15',{src:'saves',log:true}),
      X('Banded Tibialis Raise','3 × 15',{src:'saves'}),
      X('Single-Leg Balance','3 × 30 sec ea',{sec:30,setN:6,src:'saves'}),
      X('Backward Treadmill Walk','5 min',{sec:300,setN:1,src:'saves',note:'Slow pace, 0–5% incline. Quad work with low knee stress.'}),
    ]},
    { id:'r1c', phase:'r1', code:'1C', name:'Range of motion', short:'Range & Mobility', type:'mobility', est:25, equip:'Foam roller · Towel · Bike', ex:[
      X('Heel Slides','3 × 15',{src:'claude',note:'Slide the heel toward your bottom to a firm stretch, hold 3 s. Getting the bend back is a key early goal.'}),
      X('Prone Hang (Knee Extension)','3 × 2 min',{sec:120,setN:3,src:'claude',note:'Lie face down with the knee just off the bed edge and let gravity straighten it. Get full extension before anything else.'}),
      X('Patellar Mobilisation','2 min',{sec:120,setN:1,src:'claude',note:'Knee relaxed and straight. Gently glide the kneecap up, down and side to side.'}),
      X('Stationary Bike (Rock to Full Turns)','10 min',{sec:600,setN:1,src:'claude',note:'Rock back and forth until a full turn is comfortable, then pedal easy with no resistance.'}),
      P('Prone Foam Roller Quad Release','60 sec ea',{sec:60,setN:2}),
      P('Foam Roller Outer-Thigh (ITB) Release','60 sec ea',{sec:60,setN:2}),
      P('Prone Hip Rotation','2 × 10 ea'),
      P("Quadruped Rock-Back to Child's Pose",'2 × 10',{note:'Towel roll behind the knee if needed. Rock back gently to restore knee bend.'}),
      P('Seated Towel Scrunch','3 × 1 min',{sec:60,setN:3}),
    ]},
    { id:'r1d', phase:'r1', code:'1D', name:'Walking & early strength', short:'Walk & Squat', type:'rehab', est:30, equip:'Towel · Ball · Wall · Rail', ex:[
      X('Weight Shifts (Side to Side)','2 × 10',{src:'claude',note:'Build trust standing on the injured leg before walking drills.'}),
      P('Gait / Walking Drill','5 min',{sec:300,setN:1,note:'Heel strike, straighten the knee fully, keep steps even.'}),
      P('Long-Stride Walking','3 × 20 m'),
      P('Seated Long-Arc Knee Extension','3 × 10',{log:true,note:'Towel or ankle weight. Straighten fully, lower slowly.'}),
      X('Side-Lying Hip Abduction','3 × 12 ea',{src:'claude',note:'Toes forward, lift from the hip. Hip strength protects the knee from caving in.'}),
      P('Glute Bridge','3 × 12'),
      P('Wall Sit with Ball Squeeze','3 × 30 sec',{sec:30,setN:3}),
      P('Mini Squat (Partial Range)','3 × 12'),
      P('Bodyweight Squat','3 × 12',{log:true}),
      P('Single-Leg Balance (Eyes Closed)','3 × 30 sec ea',{sec:30,setN:6,note:'Progress from holding a rail, to hands free, to eyes closed.'}),
    ]},

    /* ---------- P2 · Build strength ---------- */
    { id:'r2a', phase:'r2', code:'2A', name:'Quad strength', short:'Quad Strength', type:'rehab', est:35, rest:60, equip:'Slant board · Dumbbells · Step', ex:[
      X('Heel-Elevated Squat','3 × 10',{src:'saves',log:true,note:'Heels on a plate or slant board so the knees can travel forward.'}),
      X('Sissy Squat (Assisted)','3 × 8',{src:'saves',log:true,note:'Hold a post, heels up, knees travel forward. Short range first.'}),
      P('Leg Extension (90–45°)','3 × 10',{log:true,note:'Start in the 90–45° range; widen the range with your physio.'}),
      P('Bulgarian Split Squat','3 × 8 ea',{log:true,note:'Rear foot on a box, front knee tracks over the toes. Most of the weight on the front leg.'}),
      X('Reverse Nordic (Partial Range)','3 × 6',{src:'claude'}),
      X('Wall Sit','3 × 45 sec',{sec:45,setN:3,src:'claude'}),
    ]},
    { id:'r2b', phase:'r2', code:'2B', name:'Posterior chain & hips', short:'Hamstrings & Hips', type:'rehab', est:30, rest:60, equip:'Swiss ball · Bench · Band', ex:[
      P('Swiss Ball Glute Bridge','3 × 12'),
      P('Swiss Ball Hamstring Curl','3 × 10',{note:'Bridge up, then curl the ball in with both legs. Master this before the single-leg version.'}),
      X('Single-Leg Swiss Ball Hamstring Curl','3 × 10',{src:'saves'}),
      X('Copenhagen Plank (Short Lever)','3 × 20 sec ea',{sec:20,setN:6,src:'saves',note:'Top leg on a stool or bench, lift the hips and hold.'}),
      X('Nordic Hamstring Curl (Assisted)','3 × 5',{src:'claude',note:'Strong evidence for preventing hamstring injury. Control the lowering.'}),
      X('Single-Leg RDL','3 × 8 ea',{src:'claude',log:true}),
      X('Single-Leg Calf Raise','3 × 15 ea',{src:'claude',log:true}),
    ]},
    { id:'r2c', phase:'r2', code:'2C', name:'Steps & stairs', short:'Stairs & Steps', type:'rehab', est:25, equip:'Step · Stool · Box · Stairs', ex:[
      P('Alternating Foot Taps (Stool)','3 × 30 sec',{sec:30,setN:3}),
      P('Step-Up / Step-Down (Low Step)','3 × 10 ea'),
      P('Forward Step-Up','3 × 10 ea',{log:true}),
      X('Lateral Step-Up','3 × 10 ea',{src:'claude',note:'Links forward step-ups to lateral step-downs and trains the hip to stop the knee caving in.'}),
      P('Forward Step-Down (Heel Tap)','3 × 8 ea',{log:true,note:'Lower for 3 s, tap the heel, keep the knee over the second toe.'}),
      P('Lateral Step-Down (Heel Tap)','3 × 8 ea',{log:true}),
      P('Weighted Hip Hike (Box)','3 × 12 ea'),
      P('Calf Raise on Step Edge','3 × 15',{log:true}),
      X('Stair Climbing (Step Over Step)','3 × 1 flight',{src:'claude',note:'One foot per step going up, rail for balance only. Going up usually comes back before going down.'}),
      P('Stair Descent (Step Over Step)','3 × 1 flight',{note:'Slow and controlled, rail for balance only. Usually the last stair skill to return.'}),
    ]},
    { id:'r2d', phase:'r2', code:'2D', name:'Glutes & hips', short:'Glutes & Hips', type:'rehab', est:25, rest:45, equip:'Mini-band · Cable machine', ex:[
      X('Banded Clamshell','3 × 15 ea',{src:'claude',note:'Easy hip-strength starter before standing band work.'}),
      P('Banded Glute Bridge','3 × 15'),
      P('Feet-Elevated Glute Bridge (Box)','3 × 12'),
      P('Single-Leg Glute Bridge','3 × 10 ea',{log:true}),
      P('Banded Lateral Walk','3 × 10 ea'),
      P('Banded Donkey Kick','3 × 12 ea'),
      P('Cable Hip Extension','3 × 12 ea',{log:true}),
      P('Cable Hip Abduction','3 × 12 ea',{log:true}),
      P('Cable Hip Adduction','3 × 12 ea',{log:true}),
    ]},
    { id:'r2e', phase:'r2', code:'2E', name:'Gym leg strength', short:'Gym Legs', type:'rehab', est:40, rest:90, equip:'Leg press · Machines · Dumbbells · Kettlebell', ex:[
      P('Goblet Squat to Chair','3 × 10',{log:true}),
      P('Leg Press','3 × 10',{log:true}),
      X('Single-Leg Leg Press','3 × 10 ea',{src:'claude',log:true,note:'Train each leg on its own and compare the weights to track the strength gap.'}),
      X('Seated Hamstring Curl (Machine)','3 × 10',{src:'claude',log:true,note:'Hamstring strength is a return-to-sport check. Go lighter early after a hamstring graft.'}),
      P('Bodyweight Hip Hinge (Good Morning)','3 × 12',{note:'Push the hips back with a flat back. Learn the hinge before loading the deadlift.'}),
      P('Dumbbell Deadlift','3 × 10',{log:true}),
      P('Sumo Squat','3 × 12',{log:true,note:'Bodyweight first, then hold a dumbbell.'}),
      X('Reverse Lunge','3 × 8 ea',{src:'claude',note:'Easier on the knee than forward lunges. Bridges split-squat holds to walking lunges.'}),
      P('Walking Lunge','3 × 10 ea',{log:true}),
      P('Lateral Lunge','3 × 8 ea'),
    ]},
    { id:'r2f', phase:'r2', code:'2F', name:'Recovery flow', short:'Recovery Flow', type:'mobility', est:20, equip:'Foam roller · Ball · Kettlebell · Box · Mat', ex:[
      P('Foam Roller Hamstring & Calf to Knee Hug','60 sec ea',{sec:60,setN:2}),
      P('Ball Release & Ankle Mobilisation','60 sec ea',{sec:60,setN:2}),
      P('Kettlebell Ankle Dorsiflexion','2 × 10 ea',{note:'Foot on a box, kettlebell on the thigh, drive the knee over the toes. Ankle range helps squats and landing.'}),
      P('Seated Cross-Legged Kettlebell Hold','2 × 45 sec',{sec:45,setN:2,note:'Sit tall, hips open. Gentle hip rotation and posture work.'}),
      P('Standing Leg Swings & Hip Abduction','2 × 10 ea'),
      P('Downward Dog to Plank Flow','2 × 8'),
      P('Inchworm Walkout','2 × 6'),
    ]},
    { id:'r2g', phase:'r2', code:'2G', name:'Core & trunk control', short:'Core & Trunk', type:'rehab', est:25, rest:45, equip:'Mini-band · Swiss ball · Stool · Cable / band', ex:[
      P('Banded Dead Bug','3 × 10 ea',{note:'Lower back stays flat on the floor while the opposite arm and leg reach.'}),
      P('Crunches','3 × 15'),
      P('Swiss Ball Leg Raise','3 × 10'),
      P('Windshield Wipers','2 × 10 ea',{note:'Knees bent at first, shoulders stay down.'}),
      P('Forearm Plank with Leg Lift','3 × 30 sec',{sec:30,setN:3}),
      P('Swiss Ball Plank','3 × 30 sec',{sec:30,setN:3}),
      P('Side Plank','3 × 30 sec ea',{sec:30,setN:6}),
      P('Banded Side Plank Clamshell','3 × 10 ea'),
      X('Pallof Press','3 × 10 ea',{src:'claude',note:'Standing anti-rotation. Takes floor core work into a standing, sport-like position; trunk control helps stop the knee caving in.'}),
    ]},
    { id:'r2h', phase:'r2', code:'2H', name:'Balance & hip control', short:'Balance & Hips', type:'rehab', est:20, equip:'Cushion · Kettlebell · Box · Band', ex:[
      X('Single-Leg Balance on Cushion','3 × 30 sec ea',{sec:30,setN:6,src:'claude',note:'The step between balancing on the floor and Y-balance reaches.'}),
      P('Star Excursion Balance Reach','3 × 5 ea direction',{note:'Stand on one leg, hands on hips, reach the other foot forward, sideways and back. Also part of the P2 test.'}),
      P('Half-Kneeling Front-Foot Lift','3 × 10 ea',{note:'Lift the front foot without leaning back. Hip-flexor strength.'}),
      P('Seated Knee Raise (Kettlebell)','3 × 10 ea',{note:'Seated on a box, kettlebell on the thigh, lift the knee with control.'}),
      P('Standing Banded Hip Extension','3 × 12 ea'),
    ]},

    /* ---------- P3 · Power & running ---------- */
    { id:'r3a', phase:'r3', code:'3A', name:'Landing & plyometrics', short:'Landing & Plyo', type:'rehab', est:25, rest:60, equip:'Box · Floor line', ex:[
      P('Jumping Jacks (Low Hops)','3 × 30 sec',{sec:30,setN:3}),
      P('Jump Rope (Skipping)','3 × 45 sec',{sec:45,setN:3,note:'Low, quick, quiet contacts. Builds bounce before bigger jumps.'}),
      X('Drop Squat & Stick','3 × 5',{src:'claude',note:'Land softly, knees over toes, hold 2 s.'}),
      X('Double Leg Pogo Jump','3 × 20 sec',{sec:20,setN:3}),
      X('Squat Jump (Soft Landing)','3 × 5',{src:'claude',note:'Jump, land quietly on both feet and hold 2 s. Comes before box jumps and single-leg hops.'}),
      X('Lateral Line Hops','3 × 20 sec',{sec:20,setN:3,src:'claude'}),
      X('Box Jump (Step Down)','3 × 5',{src:'claude'}),
      X('Single-Leg Hop & Stick','2 × 5 ea',{src:'saves'}),
      X('Lateral Bound & Stick','2 × 4 ea',{src:'saves'}),
    ]},
    { id:'r3b', phase:'r3', code:'3B', name:'Return to run', short:'Return to Run', type:'rehab', est:30, equip:'Track / treadmill', ex:[
      X('High Knees','3 × 20 sec',{sec:20,setN:3,src:'claude'}),
      X('Butt Kicks','3 × 20 sec',{sec:20,setN:3,src:'claude'}),
      X('A-Skips','2 × 10'),
      X('B-Skip Running Drill','2 × 10'),
      X('Walk–Jog Intervals','10 × 1 min jog',{sec:60,setN:10,src:'claude',note:'Jog 1 min, walk 1 min. Build toward 20–30 min continuous if the knee is fine next day.'}),
      P('Light Jogging','10 min',{sec:600,setN:1,note:'Easy pace. Add time only if the knee is fine the next day.'}),
      X('Straight-Line Strides (70%)','6 × 60 m',{src:'claude'}),
    ]},

    /* ---------- P4 · Return to football (all added by Claude) ---------- */
    { id:'r4a', phase:'r4', code:'4A', name:'Change of direction', short:'Agility & Cutting', type:'sport', est:30, rest:60, equip:'Cones', ex:[
      X('Deceleration Drill (Sprint & Stop)','3 × 5',{src:'claude',note:'Sprint 10 m, stop within 3 steps with low hips.'}),
      X('Lateral Shuffle to Sprint','3 × 5',{src:'claude'}),
      X('45° Cutting Drill','3 × 5 ea',{src:'claude',note:'Plant the outside foot with the knee over the toes — no inward collapse.'}),
      X('90° Cutting Drill','3 × 5 ea',{src:'claude'}),
      X('5-10-5 Pro Agility Shuttle','4 × 1',{src:'claude'}),
      X('T-Drill','4 × 1',{src:'claude'}),
    ]},
    { id:'r4b', phase:'r4', code:'4B', name:'Ball work', short:'Football Ball Work', type:'sport', est:30, equip:'Ball · Wall · Cones', ex:[
      X('Wall Passing (Both Feet)','3 × 2 min',{sec:120,setN:3,src:'claude'}),
      X('First Touch & Turn','3 × 10',{src:'claude'}),
      X('Cone Dribbling Figure-8','4 × 45 sec',{sec:45,setN:4,src:'claude'}),
      X('Dribble with Change of Direction','3 × 5',{src:'claude'}),
      X('Football Juggling','3 × 2 min',{sec:120,setN:3,src:'claude'}),
      X('Reactive 1v1 Shadow Drill','4 × 30 sec',{sec:30,setN:4,src:'claude'}),
    ]},
  ];

  // Mark every exercise that appears in the physio video log, with a count and date range.
  (function applyPhysioVideos(){
    const dates={};
    (window.PHYSIO_VIDEO_LOG||[]).forEach(([,date,names])=>names.forEach(n=>(dates[n]=dates[n]||[]).push(date)));
    const M=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const parts=d=>{ const [y,m,dd]=d.split('-'); return {y, m:M[+m-1], d:+dd}; };
    const range=(a,b)=>{
      const x=parts(a), y=parts(b);
      if(a===b) return `${x.d} ${x.m} ${x.y}`;
      if(x.y!==y.y) return `${x.d} ${x.m} ${x.y} – ${y.d} ${y.m} ${y.y}`;
      if(x.m!==y.m) return `${x.d} ${x.m} – ${y.d} ${y.m} ${y.y}`;
      return `${x.d}–${y.d} ${y.m} ${y.y}`;
    };
    window.REHAB_SESSIONS.forEach(s=>s.ex.forEach(ex=>{
      const d=dates[ex.name]; if(!d) return;
      d.sort();
      ex.src='physio';
      ex.rec=`${d.length} video${d.length>1?'s':''} · ${range(d[0],d[d.length-1])}`;
    }));
  })();

  // Tutorial videos (YouTube IDs), checked to be live and embeddable.
  window.REHAB_VIDEOS={
    // P1
    'Spanish Squat Iso Hold':'hgFxm5KIF7M','Split Squat Iso Hold':'sh3RO6QYvew',
    'Straight-Leg Hip Flexor Iso (Banded)':'6uP2AzKbCM4','Bent-Knee Hip Flexor Iso (Banded)':'dmsRChzrfTI',
    'Long Lever Bridge Iso':'N5n6BDQlYbA','Banded Terminal Knee Extension (TKE)':'WEcLkuvcMZc',
    'Bent-Knee Calf Raise':'C3tLEvqrW4E','Banded Tibialis Raise':'i0LN4UcCHUc','Single-Leg Balance':'7SF7AYh2_Yw',
    'Backward Treadmill Walk':'4Q4jD_GJG7M','Quad Set (Isometric)':'au62CidApd0','Straight Leg Raise':'ZiBZsFKDkUo',
    // P2
    'Heel-Elevated Squat':'_UW5-bnOVQQ','Sissy Squat (Assisted)':'NPZavjAY_pI','Forward Step-Up':'7UvrEa84Nck',
    'Leg Extension (90–45°)':'suak22a8t_E','Reverse Nordic (Partial Range)':'BnlPIJ3d-ck','Wall Sit':'cWTZ8Am1Ee0',
    'Single-Leg Swiss Ball Hamstring Curl':'9vn-srUiQK0','Copenhagen Plank (Short Lever)':'nhGK-DxiGBE',
    'Banded Lateral Walk':'ZvXFnpUnX-c','Nordic Hamstring Curl (Assisted)':'MAOmN7MWUGM',
    'Single-Leg RDL':'Zfr6wizR8rs','Single-Leg Calf Raise':'qPd73snQfUs',
    // P3
    'Drop Squat & Stick':'nfOmUvW29h0','Lateral Line Hops':'ZHg88_EYQ74','Single-Leg Hop & Stick':'5g6ijVFSoeI',
    'Lateral Bound & Stick':'XDBHOQoAa3w','Box Jump (Step Down)':'W5QzqIbEWvk','Walk–Jog Intervals':'b-3_HeDERlQ',
    'High Knees':'QIwxSeKpHtI','Butt Kicks':'583IXOhp7eI','Straight-Line Strides (70%)':'IeZS646X44M',
    // P4
    'Deceleration Drill (Sprint & Stop)':'xPmdNg4tV_s','45° Cutting Drill':'j3kgzHvUwYY','90° Cutting Drill':'HP3pt0129f8',
    '5-10-5 Pro Agility Shuttle':'qYDXaXRodWc','T-Drill':'f5a8JA-O75s','Lateral Shuffle to Sprint':'RNuqi-p9XrM',
    'Wall Passing (Both Feet)':'xJGHMjrHU3c','Cone Dribbling Figure-8':'_XLsRGZCp-A','Dribble with Change of Direction':'Gi_X98uM-1A',
    'First Touch & Turn':'OSdPtoqEtbk','Football Juggling':'5PQgz2SUPdk','Reactive 1v1 Shadow Drill':'QEk95UCvmwg',
  };
})();
