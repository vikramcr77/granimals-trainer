/* ============================================================
   REHAB PHASES — the road back to the Management (Week 14) program.
   src: 'saves'  = from Vikram's saved reels/screenshots
        'claude' = added by Claude (ACL evidence / football drills)
        (none)   = from the physio's program PDF
   ============================================================ */
(function(){
  const X=(name,target,opts)=>Object.assign({name,target},opts||{});

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
      X('Straight Leg Raise','3 × 10',{src:'claude',note:'Lock the quad first — no knee bend as you lift.'}),
      X('Banded Terminal Knee Extension (TKE)','2 × 15',{src:'saves',log:true}),
      X('Bent-Knee Calf Raise','3 × 15',{src:'saves',log:true}),
      X('Banded Tibialis Raise','3 × 15',{src:'saves'}),
      X('Single-Leg Balance','3 × 30 sec ea',{sec:30,setN:6,src:'saves'}),
      X('Backward Treadmill Walk','5 min',{sec:300,setN:1,src:'saves',note:'Slow pace, 0–5% incline. Quad work with low knee stress.'}),
    ]},

    /* ---------- P2 · Build strength ---------- */
    { id:'r2a', phase:'r2', code:'2A', name:'Quad strength', short:'Quad Strength', type:'rehab', est:35, rest:60, equip:'Slant board · Dumbbells · Step', ex:[
      X('Heel-Elevated Squat','3 × 10',{src:'saves',log:true}),
      X('Sissy Squat (Assisted)','3 × 8',{src:'saves',log:true,note:'Hold a post, heels up, knees travel forward. Short range first.'}),
      X('Forward Step-Up','3 × 10 ea',{src:'claude',log:true}),
      X('Leg Extension (90–45°)','3 × 10',{src:'claude',log:true,note:'Start in the 90–45° range; widen the range with your physio.'}),
      X('Reverse Nordic (Partial Range)','3 × 6',{src:'claude'}),
      X('Wall Sit','3 × 45 sec',{sec:45,setN:3,src:'claude'}),
    ]},
    { id:'r2b', phase:'r2', code:'2B', name:'Posterior chain & hips', short:'Hamstrings & Hips', type:'rehab', est:30, rest:60, equip:'Swiss ball · Bench · Band', ex:[
      X('Single-Leg Swiss Ball Hamstring Curl','3 × 10',{src:'saves'}),
      X('Copenhagen Plank (Short Lever)','3 × 20 sec ea',{sec:20,setN:6,src:'saves'}),
      X('Banded Lateral Walk','3 × 10 ea',{src:'saves'}),
      X('Nordic Hamstring Curl (Assisted)','3 × 5',{src:'claude',note:'Strong evidence for preventing hamstring injury. Control the lowering.'}),
      X('Single-Leg RDL','3 × 8 ea',{src:'claude',log:true}),
      X('Single-Leg Calf Raise','3 × 15 ea',{src:'claude',log:true}),
    ]},

    /* ---------- P3 · Power & running ---------- */
    { id:'r3a', phase:'r3', code:'3A', name:'Landing & plyometrics', short:'Landing & Plyo', type:'rehab', est:25, rest:60, equip:'Box · Floor line', ex:[
      X('Drop Squat & Stick','3 × 5',{src:'claude',note:'Land softly, knees over toes, hold 2 s.'}),
      X('Double Leg Pogo Jump','3 × 20 sec',{sec:20,setN:3}),
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
