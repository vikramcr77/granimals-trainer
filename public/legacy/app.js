"use strict";
/* ============================================================
   GRANIMALS TRAINER — Vikram's Week 14 program
   ============================================================ */

/* ---------- ICONS ---------- */
const I = {
  play:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4l14 8-14 8z" fill="currentColor" stroke="none"/></svg>',
  pause:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="5" width="4" height="14" rx="1" fill="currentColor" stroke="none"/><rect x="14" y="5" width="4" height="14" rx="1" fill="currentColor" stroke="none"/></svg>',
  clock:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  dumb:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6.5 6.5h11M6.5 17.5h11M4 9v6M20 9v6M8 8v8M16 8v8"/></svg>',
  fire:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3s5 4 5 9a5 5 0 0 1-10 0c0-2 1-3 1-3s0 2 2 2c1.5 0 1.5-2 1-4-.5-2 1-5 1-5z"/></svg>',
  layers:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/></svg>',
  chev:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg>',
  chevL:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 6l-6 6 6 6"/></svg>',
  check:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>',
  rest:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M9 9h6l-6 6h6"/></svg>',
  trophy:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4h12v4a6 6 0 0 1-12 0z"/><path d="M6 6H3v2a3 3 0 0 0 3 3M18 6h3v2a3 3 0 0 1-3 3M9 18h6M12 14v4M8 21h8"/></svg>',
  trash:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/></svg>',
  flame:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3s5 4 5 9a5 5 0 0 1-10 0c0-2 1-3 1-3s0 2 2 2c1.5 0 1.5-2 1-4-.5-2 1-5 1-5z"/></svg>',
  bolt:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L4 14h7l-1 8 9-12h-7z"/></svg>',
  up:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M6 11l6-6 6 6"/></svg>',
  target:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.4" fill="currentColor"/></svg>',
  scale:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v3M5 6h14l2 7a5 5 0 0 1-10 0M3 13l2-7M8 13a5 5 0 0 1-5 0M8 21h8"/></svg>',
  cal:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 9h18M8 3v4M16 3v4"/></svg>',
  copy:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h8"/></svg>',
  stretch:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="4.5" r="2"/><path d="M12 7v6M12 9l-5 3M12 9l5 3M12 13l-3 8M12 13l3 8"/></svg>',
  info:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/></svg>',
  empty:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7l9-4 9 4-9 4z"/><path d="M3 7v10l9 4 9-4V7M12 11v10"/></svg>',
  ext:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/></svg>',
  plus:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"/></svg>',
  image:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="M21 16l-5-5-9 9"/></svg>',
  upload:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 15V4M7 9l5-5 5 5M4 15v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4"/></svg>',
  redo:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 12a8 8 0 1 1-2.3-5.7M20 4v5h-5"/></svg>',
  minus:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/></svg>',
};

/* ---------- PROGRAM DATA (from Granimals Week 14 plan) ----------
   opts: {sec} = timed hold/effort per set (seconds) → shows countdown timer
         {setN} = explicit set count (for timed exercises)
         {rest} = rest between sets (seconds), overrides session default
         {vid}  = verified tutorial video URL (filled in from research)      */
const S = (name,target,opts)=>Object.assign({name,target},opts||{});
const PROGRAM = [
  { id:'push', code:'D1', name:'Push — Chest · Shoulders · Triceps', short:'Push Day', type:'strength', est:26, rest:20, equip:'Dumbbell · Landmine · Battle ropes', ex:[
    S('Flat Dumbbell Chest Press','4 × 6'), S('Landmine Press','3 × 10'),
    S('Seated Dumbbell Shoulder Press','3 × 10'), S('Cable Lateral Raises','3 × 6 · 5–7kg'),
    S('Incline Push Up','3 × 10'), S('Battle Rope Alt. Shoulder Press','3 × 10'),
  ]},
  { id:'pull', code:'D2', name:'Pull — Back · Biceps', short:'Pull Day', type:'strength', est:25, rest:20, equip:'Cable · Dumbbell · Machine', ex:[
    S('Assisted Pull Up Machine','3 × 10'), S('Single Arm Neutral Grip Lat Pulldown','3 × 6 ea'),
    S('Single Arm Cable Row','2 × 10 ea'), S('Split RDL (B-stance)','3 × 10'),
    S('Face Pull','2 × 10 · 10 sec hold each'), S('Dumbbell Alternating Hammer Curl','3 × 10'),
    S('Dumbbell Incline Alternating Curl','3 × 10'),
  ]},
  { id:'posterior', code:'D3', name:'Posterior Chain — Glutes · Hamstrings', short:'Posterior Chain', type:'strength', est:34, rest:20, equip:'Barbell · Cable · Dumbbell', ex:[
    S('Barbell Hip Thrust','3 × 6 · 20kg'), S('Glute-Dominant Bulgarian Split Squat','3 × 6'),
    S('Dumbbell Single Leg Deadlift','3 × 6'), S('Hamstring Bridge','3 × 10 · 10 sec hold each'),
    S('Swiss Ball Bridge + Hamstring Curl','3 × 6'), S('Cable Single Leg Kickback','3 × 10'),
    S('Drop Jump and Stick','3 × 6',{rest:35}), S('Death Drop to Broad Jump','3 × 6',{rest:35}),
  ]},
  { id:'core', code:'D4', name:'Core + Cardio', short:'Core & Cardio', type:'cardio', est:26, rest:15, circuit:'4 rounds · 15 sec rest between moves', equip:'Body weight', ex:[
    S('Plank Saw','30 sec',{sec:30,setN:1}), S('Russian Twist','30 reps'), S('Bear Crawl','40 sec',{sec:40,setN:1}),
    S('Burpee','10 reps'), S('Oblique Mountain Climbers','30 sec',{sec:30,setN:1}),
    S('Dumbbell Jump Squat','2 × 10'), S('Crunches','2 × 10'),
  ]},
  // Days 5–6 from the physio's Week 14 PDF (Radhika Bhaiya, Trainerize), copied as written
  { id:'legs', code:'D5', name:'Legs — Quads · Adductors', short:'Legs Day', type:'strength', est:34, rest:15, equip:'Dumbbell · Band · Plate · Machines', ex:[
    S('Dumbbell Front Squat','3 × 6'), S('Dumbbell Heel Elevated Goblet Squat','3 × 6',{rest:20}),
    S('Band at Ankle Side Walk','3 × 12 steps'), S('Plate Loaded Wall Sit','3 × 25 sec · 5kg',{sec:25,setN:3,rest:20}),
    S('Leg Extension Machine','3 × 8 · 20/20/25kg',{rest:20}), S('Leg Press','3 × 6 · 40/45/30kg'),
    S('Lunge Sequence (Forward & Back)','3 × 6'), S('Snapdown Plyo','3 × 12',{rest:90}),
  ]},
  { id:'day6', code:'D6', name:'Mobility + Core', short:'Mobility & Core', type:'mobility', est:40, rest:20, equip:'Kettlebell · Body weight', ex:[
    S('Adductor Rockback Stretch','30 sec × 3',{sec:30,setN:3}), S('Dynamic Half Kneeling Hip Flexor Stretch','3 × 8'),
    S('Frog Rockbacks','3 × 8'), S('Hamstring Flossing','3 × 8'), S('90-90 Hip Switch','3 × 10'),
    S('Thoracic Rotation','2 × 10'), S('Cat-Camel with Rotation','3 × 8'),
    S('Deep Squat Hold','2 × 20 sec',{sec:20,setN:2}), S('Ankle Dorsiflexion Mobility','3 × 10'),
    S('KB Russian Twist','3 × 8'), S('Incline Push Up','3 × 8'), S('Plank','3 × 30 sec',{sec:30,setN:3}),
  ]},
  { id:'warmup', code:'WU', name:'Warm Up — Mobility & Activation', short:'Warm Up', type:'mobility', est:15, equip:'Foam roller', ex:[
    S('Foam Roller — Quads','30 sec',{sec:30,setN:1}), S('Adductor Foam Roller','30 sec',{sec:30,setN:1}), S('Foam Roller — Calf','30 sec',{sec:30,setN:1}),
    S('Cat-Cow to Thread-the-Needle','30 sec',{sec:30,setN:1}), S('Hip CARs','1 × 10 ea'), S('Glute Bridge Pulse','1 × 5, 5 pulses'),
    S('Mini Squat','2 × 10'), S('Monster Walk','2 × 2 rounds'), S('B-Skip Running Drill','2 × 10'),
    S('A-Skips','2 × 10'), S('Double Leg Pogo Jump','2 × 20 sec',{sec:20,setN:2}),
  ]},
  { id:'cooldown', code:'CD', name:'Cool Down — Stretch & Recovery', short:'Cool Down', type:'mobility', est:7, equip:'Body weight', ex:[
    S('Hamstring Stretch with Strap (Supine)','3 × 20 sec each',{sec:20,setN:3}), S('Glute Figure-4 Stretch','3 × 20 sec each',{sec:20,setN:3}),
    S('Supine IT Band Stretch','3 × 20 sec each',{sec:20,setN:3}), S('Hip Flexor Lunge Stretch','3 × 20 sec each',{sec:20,setN:3}),
    S('Thread the Needle','15 sec, 3',{sec:15,setN:3}), S('Inner Thigh Adductor Stretch','3 × 20 sec each',{sec:20,setN:3}),
    S('Deep Squat Ankle Rocker','1 × 5'), S('Diaphragmatic Breathing','1 × 60 sec',{sec:60,setN:1}),
  ]},
];
/* Verified tutorial videos — researched & confirmed to resolve.
   Physio-credited (Ask Doctor Jo), NASM, MedBridge, PureGym, Jeff Nippard & reputable coaches. */
const VIDEOS = {
  // Push
  'Flat Dumbbell Chest Press':'VmB1G1K7v94','Landmine Press':'Sjb5meztfSE',
  'Seated Dumbbell Shoulder Press':'fuQpuu--bMI','Cable Lateral Raises':'zpbm-xRHB6k',
  'Incline Push Up':'0JUrOH--Kdk', // Battle Rope: no exact match → search fallback
  // Pull
  'Assisted Pull Up Machine':'WLzut1ZxxTY','Single Arm Neutral Grip Lat Pulldown':'PTmdK_N9iTI',
  'Single Arm Cable Row':'1jN6qeXdvWA','Split RDL (B-stance)':'6ijhguezxC0','Face Pull':'eQaSpG7aMYQ',
  'Dumbbell Alternating Hammer Curl':'xaxyePfdBlc','Dumbbell Incline Alternating Curl':'B4HGtMhGI2s',
  // Posterior
  'Barbell Hip Thrust':'xDmFkJxPzeM','Glute-Dominant Bulgarian Split Squat':'uKvbvGEBhRg',
  'Dumbbell Single Leg Deadlift':'k83AIfjDbnI','Hamstring Bridge':'cWiHUKPNYHk',
  'Swiss Ball Bridge + Hamstring Curl':'zX5hMUhUZrs','Cable Single Leg Kickback':'OV8FGnvsOOE',
  'Drop Jump and Stick':'qHt7MmlCGRY','Death Drop to Broad Jump':'tQSk1nbcGYs',
  // Core
  'Plank Saw':'R9HJnAdJAUs','Russian Twist':'IJDOoVyVjhc','Bear Crawl':'_li8Mi8grTU',
  'Burpee':'rg0f_LYhqQA','Oblique Mountain Climbers':'ImwNRXMZddI',
  'Dumbbell Jump Squat':'7qPVEUQ6vE8','Crunches':'gEMYUHv8xZg',
  // Warm Up
  'Foam Roller — Quads':'cv57kA6rktc','Adductor Foam Roller':'h1xQabdHdes','Foam Roller — Calf':'EVHncW4UuyA',
  'Cat-Cow to Thread-the-Needle':'M3KfxnnJxKs','Hip CARs':'hRMrq6G81p8','Glute Bridge Pulse':'QKjFY-uV7IE',
  'Mini Squat':'KpqsQVDIsUc','Monster Walk':'snbNxUIUQPc','B-Skip Running Drill':'Zy97yNE7WEE',
  'A-Skips':'y_iCeTmCMd8','Double Leg Pogo Jump':'zExE5wGbG3c',
  // Cool Down — Ask Doctor Jo (licensed PT) for the first four
  'Hamstring Stretch with Strap (Supine)':'Il1L75v6gq0','Glute Figure-4 Stretch':'2VE_NLcNMvQ',
  'Supine IT Band Stretch':'lsvCMffkmKM','Hip Flexor Lunge Stretch':'tsGPYSQbZx4',
  'Thread the Needle':'7C8-zj3nRro','Inner Thigh Adductor Stretch':'WPvLsecoswc',
  'Deep Squat Ankle Rocker':'RjfHTvQCrZk','Diaphragmatic Breathing':'xrVBxbM6ZsA',
};
// Phases: existing sessions are the Management phase; warm-up/cool-down are shared prep.
PROGRAM.forEach(s=>{ s.phase = 'mgmt'; }); // the whole physio PDF (warm-up, days 1–6, cool-down) lives in MG only
PROGRAM.push(...(window.REHAB_SESSIONS||[]), ...(window.HD_SESSIONS||[]));
Object.assign(VIDEOS, window.REHAB_VIDEOS||{}, window.HD_VIDEOS||{}, window.EXPLORE_VIDEOS||{});
const PHASES = window.PHASES || [];
const phaseById = id => PHASES.find(p=>p.id===id);
const TYPE_LABEL = {strength:'Strength', mobility:'Mobility', cardio:'Conditioning', rehab:'Rehab', sport:'Football', hd:'Heavy Duty'};
function srcBadge(src, rec){
  if(src==='physio') return `<span class="src-badge physio" title="${escAttr('From the videos you sent your physio'+(rec?' · '+rec:''))}">Sent to physio</span>`;
  if(src==='claude') return '<span class="src-badge claude" title="Added by Claude — evidence-based ACL / football addition">Added by Claude</span>';
  if(src==='saves') return '<span class="src-badge saves" title="From your saved reels">From your saves</span>';
  return '';
}
PROGRAM.forEach(s=>s.ex.forEach(ex=>{ const v=VIDEOS[ex.name]; if(v) ex.vid='https://www.youtube.com/watch?v='+v; }));
const byId = id => PROGRAM.find(s=>s.id===id);
// suggested strength rotation for "today"
const ROTATION = ['push','pull','posterior','core','legs'];

/* ---------- STATE / STORAGE ---------- */
const KEY='granimals_v1';
let DB = { history:[], goals:null, theme:null, drafts:{} };
function load(){
  try{ const r=localStorage.getItem(KEY); if(r) DB=Object.assign(DB,JSON.parse(r)); }catch(e){}
  if(!DB.goals) DB.goals = { weekly:4, bwCurrent:72, bwTarget:68 };
  if(!DB.drafts) DB.drafts = {};
  if(!DB.goals.trainDays) DB.goals.trainDays = [1,2,4,5]; // Mon,Tue,Thu,Fri (0=Sun)
  if(!DB.phase) DB.phase = 'r1';          // current phase on the journey
  if(!DB.body) DB.body = [];            // body composition scans (InBody etc.)
  let newIds=false; // scan images live in IndexedDB (too big for localStorage), keyed by scan id
  const legacy=[]; // older versions kept a downscaled screenshot inline (img / imgs[]): move it to IndexedDB
  DB.body.forEach(r=>{ if(!r.id){ r.id=bcId(); newIds=true; }
    const src=r.img||(Array.isArray(r.imgs)&&r.imgs[0]);
    if(typeof src==='string'&&src.startsWith('data:image')) legacy.push([r,src]); else if('img' in r||'imgs' in r){ delete r.img; delete r.imgs; newIds=true; } });
  if(newIds) save();
  if(legacy.length) setTimeout(()=>bcMigrateImgs(legacy));
  if(!DB.assess) DB.assess = [];          // weekly check-ins + test days
  if(!DB.gateManual) DB.gateManual = {};  // manual criteria ticks per phase
  if(!DB.myVids) DB.myVids = {};          // user's own video links per exercise
  if(DB.involved===undefined) DB.involved = null; // 'L' | 'R' injured knee
  if(DB.quick===undefined) DB.quick = true;       // Quick sessions: same exercises, less volume
}
function save(){ try{ localStorage.setItem(KEY, JSON.stringify(DB)); }catch(e){} try{ window.dispatchEvent(new Event('granimals:save')); }catch(e){} }
load();
expBuildCustom();   // rebuild the Explore custom workout from saved picks
applyQuick();

/* ---------- QUICK SESSIONS ----------
   Trims volume at display time only; the program data and saved history are untouched,
   so switching it off restores the full plan exactly. Keeps every exercise (same names =
   history/"last time" still line up). Rules: main lift keeps up to 3 sets, other moves drop
   one set (4→3, 3→2, never below 2), per-side holds drop one set per side, very long holds
   are halved, circuits lose a round. Warm-up/cool-down, Heavy Duty and custom are left alone. */
function applyQuick(){
  const ORIG = applyQuick.orig || (applyQuick.orig = new WeakMap());
  PROGRAM.forEach(s=>{
    if(!ORIG.has(s)) ORIG.set(s,{est:s.est,circuit:s.circuit});
    Object.assign(s,ORIG.get(s));
    let full=0, quick=0;
    s.ex.forEach((e,i)=>{
      if(!ORIG.has(e)) ORIG.set(e,{target:e.target,setN:e.setN,sec:e.sec});
      Object.assign(e,ORIG.get(e));
      const counted = e.setN || /^\d+\s*[×x]/.test(e.target);
      const n = e.setN || parseSets(e.target);
      full += n;
      // r3b = graded return-to-run progression: its interval counts are the dose, so leave it whole
      if(!DB.quick || !counted || ['mobility','hd'].includes(s.type) || ['custom','r3b'].includes(s.id) || (e.sec||0)>=240){ quick += n; return; }
      const perSide = e.setN && e.setN>=4 && e.setN%2===0 && /\bea(ch)?\b/.test(e.target);
      let m = perSide ? e.setN-2 : (i===0 && s.type==='strength') ? Math.min(n,3) : n>=4 ? n-1 : Math.max(Math.min(n,2), n-1);
      if(n<=2 && !perSide) m=n;
      quick += m;
      if(e.sec>=120 && e.setN>1){ e.sec=Math.round(e.sec/2/15)*15; e.target=e.target.replace(/^\d+\s*min/, e.sec+' sec'); }
      if(m!==n){ if(e.setN) e.setN=m; e.target=e.target.replace(/^\d+(\s*[×x])/, (perSide?m/2:m)+'$1'); }
    });
    const rounds = DB.quick && s.circuit && s.circuit.match(/^(\d+) rounds/);
    if(rounds && +rounds[1]>2){ const r=+rounds[1]; s.circuit=s.circuit.replace(/^\d+/, r-1); full*=r; quick*=r-1; }
    if(DB.quick && full && quick<full && s.est) s.est=Math.max(5,Math.round(s.est*quick/full));
  });
}

/* ---------- HELPERS ---------- */
const $ = s => document.querySelector(s);
const el = (t,c,h)=>{const n=document.createElement(t); if(c)n.className=c; if(h!=null)n.innerHTML=h; return n;};
function localISO(d){ d=d||new Date(); return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0'); }
const todayISO = ()=> localISO();
const MO = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const MONTHS_FULL = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const DAYS = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const DOW = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
function ytLink(name){ return 'https://www.youtube.com/results?search_query='+encodeURIComponent(name+' exercise how to form'); }
function vol(entry){ // total kg volume of a completed session record
  let v=0; for(const k in entry.sets){ entry.sets[k].forEach(s=>{ v += (s.reps||0)*(s.kg||0); }); } return Math.round(v);
}
function daysAgo(iso){ const d=new Date(iso+'T00:00'); const n=new Date(todayISO()+'T00:00'); return Math.round((n-d)/864e5); }

function streak(){
  const days = [...new Set(DB.history.map(h=>h.date))].sort().reverse();
  if(!days.length) return 0;
  let s=0; let cur = new Date(todayISO()+'T00:00');
  const set = new Set(days);
  // allow streak to count from today or yesterday
  if(!set.has(todayISO())){ cur.setDate(cur.getDate()-1); if(!set.has(localISO(cur))) return 0; }
  while(set.has(localISO(cur))){ s++; cur.setDate(cur.getDate()-1); }
  return s;
}
function weekHistory(){ return DB.history.filter(h=>daysAgo(h.date) < 7); }
function personalRecords(){
  const pr={};
  DB.history.forEach(h=>{
    for(const name in h.sets){
      h.sets[name].forEach(s=>{
        if(s.kg && s.reps){
          if(!pr[name] || s.kg>pr[name].kg) pr[name]={kg:s.kg,reps:s.reps,date:h.date};
        }
      });
    }
  });
  return pr;
}
function lastEntry(sessionId){ // most recent completed record of this session
  return DB.history.filter(h=>h.sid===sessionId).sort((a,b)=>b.ts-a.ts)[0] || null;
}
function lastSetsFor(sessionId,name){ const le=lastEntry(sessionId); return le && le.sets[name] ? le.sets[name] : null; }

/* ---------- TOAST ---------- */
let toastTimer, undoFn;
function toast(msg, undo){
  const t=$('#toast'); clearTimeout(toastTimer); undoFn=undo||null;
  t.innerHTML = I.check + '<span>'+msg+'</span>' + (undo?'<button class="undo">Undo</button>':'');
  if(undo){ t.querySelector('.undo').onclick=()=>{ undoFn&&undoFn(); t.classList.remove('show'); }; }
  t.classList.add('show');
  toastTimer=setTimeout(()=>t.classList.remove('show'), undo?5000:2600);
}

/* ---------- THEME ---------- */
function applyTheme(){
  if(DB.theme) document.documentElement.setAttribute('data-theme',DB.theme);
  else document.documentElement.removeAttribute('data-theme');
  const dark = DB.theme==='dark' || (!DB.theme && matchMedia('(prefers-color-scheme:dark)').matches);
  $('#themeIcon').innerHTML = dark
    ? '<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>'
    : '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>';
}
$('#themeBtn').onclick = ()=>{
  const dark = DB.theme==='dark' || (!DB.theme && matchMedia('(prefers-color-scheme:dark)').matches);
  DB.theme = dark?'light':'dark'; save(); applyTheme();
};
applyTheme();

/* set greeting name */
$('#brandName').textContent = 'Vikram';

/* ============================================================
   RENDER: TODAY
   ============================================================ */
function phaseSessions(ph){ return PROGRAM.filter(s=>s.phase===ph); }
function suggestedToday(){
  const ph = DB.phase || 'r1';
  if(ph==='mgmt'){
    // rotate strength days based on how many strength sessions logged
    const strengthDone = DB.history.filter(h=>byId(h.sid)&&byId(h.sid).type==='strength').length;
    return byId(ROTATION[strengthDone % ROTATION.length]);
  }
  const list = phaseSessions(ph);
  const doneToday = list.find(s=>isDoneToday(s.id));
  if(doneToday) return doneToday;                       // keep showing today's session as done
  const lastTs = id => DB.history.filter(h=>h.sid===id).reduce((m,h)=>Math.max(m,h.ts),-1);
  return [...list].sort((a,b)=>lastTs(a.id)-lastTs(b.id))[0];  // least recently trained first
}
function updateHeaderPhase(){
  const p = phaseById(DB.phase); const sub=document.querySelector('.brand .sub');
  if(p && sub) sub.textContent = `${p.code} · ${p.name}`;
}
function isDoneToday(sid){ return DB.history.some(h=>h.date===todayISO() && h.sid===sid); }

function focusHint(s){
  const loaded=s.type==='strength'||s.ex.some(e=>e.log), timed=s.ex.some(e=>e.sec);
  if(loaded && timed) return 'Log reps &amp; weight · timers for the holds';
  if(loaded) return 'Enter your reps &amp; weight for each set';
  if(timed) return 'Timed holds — tap a set to start the countdown';
  return 'Tick each exercise as you finish it';
}
function renderToday(){
  const v=$('#view-today'); v.innerHTML='';
  const now=new Date(); const hr=now.getHours();
  const hi = hr<12?'Good morning':hr<17?'Good afternoon':'Good evening';
  const g=el('div','hero-greet');
  g.innerHTML = `<div class="day">${DAYS[now.getDay()]}, ${now.getDate()} ${MO[now.getMonth()]}</div><h2>${hi}, Vikram.</h2>`;
  v.appendChild(g);

  // this-week strip with status colours + calendar opener
  const doneSet=completedDates();
  const wh=el('div','week-head'); wh.innerHTML=`<span>This week</span><button class="cal-icon-btn" id="todayCal" aria-label="Open calendar">${I.cal}</button>`;
  v.appendChild(wh);
  const ws=el('div','week-strip');
  const start=new Date(todayISO()+'T00:00'); start.setDate(start.getDate()-start.getDay());
  for(let i=0;i<7;i++){
    const dd=new Date(start); dd.setDate(start.getDate()+i);
    const iso=localISO(dd); const isToday=iso===todayISO(); const st=dayStatus(iso,doneSet); const hasData=doneSet.has(iso);
    const cell=el(hasData?'button':'div','wk-day '+st+(isToday?' today':''));
    cell.innerHTML=`<span class="wk-dow">${DOW[dd.getDay()][0]}</span><span class="wk-num">${dd.getDate()}</span>`;
    if(hasData){ cell.setAttribute('aria-label',`View ${dd.getDate()} ${MO[dd.getMonth()]}`); cell.onclick=()=>gotoDate(iso); }
    ws.appendChild(cell);
  }
  v.appendChild(ws);
  const wl=el('div','wk-legend'); wl.innerHTML=`<span><i class="lg done"></i>Done</span><span><i class="lg missed"></i>Missed</span><span><i class="lg rest"></i>Rest</span>`;
  v.appendChild(wl);
  wh.querySelector('#todayCal').onclick=openCalendar;

  // journey: P1 → P4 → Management
  const ji=PHASES.findIndex(p=>p.id===DB.phase);
  const jc=el('div','journey');
  jc.innerHTML=`<div class="jr-head"><span>Your journey</span><button class="jr-link" id="jrMore">Phase details ${I.chev}</button></div>
    <div class="jr-track">${PHASES.map((p,i)=>`<button class="jr-node${i<ji?' past':i===ji?' cur':''}" data-ph="${p.id}" aria-label="${p.code} ${p.name}${i===ji?' (current)':''}"><span class="jr-dot">${i<ji?'✓':p.code}</span><span class="jr-name">${p.name}</span></button>`).join('')}</div>`;
  jc.querySelectorAll('.jr-node').forEach(b=>b.onclick=()=>gotoPhase(b.dataset.ph));
  jc.querySelector('#jrMore').onclick=()=>gotoPhase(DB.phase);
  v.appendChild(jc);

  const sug=suggestedToday();
  const done=isDoneToday(sug.id);
  const draft=!!DB.drafts[sug.id];
  const f=el('div','focus');
  f.innerHTML = `
    <div class="kick">Today's focus · ${sug.code}</div>
    <h3>${sug.short}</h3>
    <div class="meta">
      <span>${I.clock} ~${sug.est} min</span>
      <span>${I.dumb} ${sug.ex.length} exercises</span>
      <span>${I.layers} ${sug.equip.split(' · ')[0]}</span>
    </div>
    ${ done
      ? `<div class="done-badge">${I.check} Logged today — nice work. Recover well.</div>`
      : `<button class="cta" id="startFocus">${I.play} ${draft?'Resume session':'Start &amp; log workout'}</button>
         <div class="cta-hint">${I.bolt} ${draft?'Unsaved progress — pick up where you left off':focusHint(sug)}</div>` }`;
  v.appendChild(f);
  if(!done) f.querySelector('#startFocus').onclick=()=>openSession(sug.id);
  const hdc=hdTodayCard(); if(hdc) v.appendChild(hdc);
  v.appendChild(foodTodayCard());

  // stats
  const wk=weekHistory();
  const wkVol = wk.reduce((a,h)=>a+(h.volume||0),0);
  const wkSets = wk.reduce((a,h)=>{let c=0;for(const k in h.sets)c+=h.sets[k].length;return a+c;},0);
  const sr=el('div','stat-row');
  sr.innerHTML=`
    <div class="stat accent"><div class="n">${streak()}</div><div class="l">${I.flame} Streak</div></div>
    <div class="stat teal"><div class="n">${wk.length}<small>/${DB.goals.weekly}</small></div><div class="l">${I.cal} This wk</div></div>
    <div class="stat gold"><div class="n mono">${wkVol>999?(wkVol/1000).toFixed(1)+'k':wkVol}</div><div class="l">${I.bolt} kg vol</div></div>`;
  v.appendChild(sr);

  // weekly goal ring
  const pct=Math.min(100,Math.round(wk.length/DB.goals.weekly*100));
  const circ=2*Math.PI*28; const off=circ*(1-pct/100);
  const gs=el('div','goal-strip');
  gs.innerHTML=`
    <div class="ring">
      <svg width="66" height="66" viewBox="0 0 66 66">
        <circle cx="33" cy="33" r="28" fill="none" stroke="var(--surface-3)" stroke-width="7"/>
        <circle cx="33" cy="33" r="28" fill="none" stroke="var(--accent)" stroke-width="7" stroke-linecap="round" stroke-dasharray="${circ}" stroke-dashoffset="${off}"/>
      </svg><div class="rt">${pct}%</div>
    </div>
    <div class="gt"><b>Weekly training goal</b><p>${wk.length} of ${DB.goals.weekly} sessions done ${wk.length>=DB.goals.weekly?'— target hit! 🎯':`· ${DB.goals.weekly-wk.length} to go`}</p></div>`;
  v.appendChild(gs);

  // mobility prep
  v.appendChild(el('div','section-head','<span class="eyebrow">Prep &amp; recover</span>'));
  const mr=el('div','mob-row');
  ['warmup','cooldown'].forEach(id=>{
    const s=byId(id);
    const b=el('button','mob');
    b.innerHTML=`<div class="ic">${id==='warmup'?I.bolt:I.stretch}</div><b>${s.short}</b><span>${s.ex.length} moves · ${s.est} min</span>`;
    b.onclick=()=>openSession(id);
    mr.appendChild(b);
  });
  v.appendChild(mr);

  const hn=el('div','help-note');
  hn.innerHTML=`${I.info}<p><b>How it works:</b> tap <b>Start & log workout</b> (or any session in <b>Train</b>) to open it, then type your <b>reps × weight</b> for each set — it saves automatically and builds your progress, records &amp; goal suggestions. Timed moves get a countdown, and every exercise's ▶ opens a real form video.</p>`;
  v.appendChild(hn);
}

/* ============================================================
   RENDER: TRAIN
   ============================================================ */
let trainFilter='all';
let histFilter=null;
let histCalOpen=false, calYear=null, calMonth=null;
function completedDates(){ return new Set(DB.history.map(h=>h.date)); }
// day status: done (green) | missed (red) | rest/upcoming (grey = not included)
function dayStatus(iso, doneSet){
  if(doneSet.has(iso)) return 'done';
  const d=new Date(iso+'T00:00'); const t=todayISO();
  const isTrain=(DB.goals.trainDays||[1,2,4,5]).includes(d.getDay());
  if(!isTrain) return 'rest';            // not a scheduled training day → not included
  if(iso>=t) return 'upcoming';          // scheduled but not due yet (today or future)
  // only "missed" from when tracking began — can't miss before you started
  if(!DB.history.length) return 'rest';
  const first=DB.history.reduce((m,h)=> h.date<m?h.date:m, DB.history[0].date);
  if(iso<first) return 'rest';
  return 'missed';                       // scheduled training day since start, not logged
}
function gotoDate(iso){
  histFilter=iso;
  document.querySelectorAll('.tab').forEach(x=>x.setAttribute('aria-selected','false'));
  document.querySelector('.tab[data-tab="progress"]').setAttribute('aria-selected','true');
  document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));
  $('#view-progress').classList.add('active');
  renderProgress(); window.scrollTo(0,0);
}
let trainPhase=null;
function switchTab(name){ const t=document.querySelector('.tab[data-tab="'+name+'"]'); if(t) t.click(); }
function gotoPhase(id){ trainPhase=id; DB.trainMode='rehab'; save(); renderTrain(); switchTab('train'); }

/* ---------- ASSESSMENT HELPERS (LSI + phase gates) ---------- */
const TESTS=[
  {k:'single',t:'Single hop',u:'cm'}, {k:'triple',t:'Triple hop',u:'cm'}, {k:'cross',t:'Crossover hop',u:'cm'},
  {k:'timed',t:'6 m timed hop',u:'s',inv:true}, {k:'ybal',t:'Y-balance anterior',u:'cm'},
  {k:'calf',t:'Single-leg calf raises',u:'reps'}, {k:'bridge',t:'Single-leg bridge',u:'reps'},
  {k:'slsq',t:'Single-leg squat',u:'reps'}, {k:'quad',t:'Quad strength',u:'kg'},
];
function latestAssess(type){ return DB.assess.filter(a=>a.type===type).sort((a,b)=>b.ts-a.ts)[0]||null; }
function lsiOf(rec,k){
  if(!rec||!DB.involved||!rec.v[k]) return null;
  const inv=+rec.v[k][DB.involved], un=+rec.v[k][DB.involved==='L'?'R':'L'];
  if(!inv||!un) return null;
  const t=TESTS.find(x=>x.k===k);
  return Math.round((t&&t.inv ? un/inv : inv/un)*100);   // timed test: faster is better
}
function gateCheck(k){
  const w=latestAssess('weekly'), b=latestAssess('big');
  const W=(f,fn)=> (w && w.v[f]!=='' && w.v[f]!=null) ? fn(+w.v[f]) : null;
  const L=(t,th)=>{ const l=lsiOf(b,t); return l==null?null:l>=th; };
  switch(k){
    case 'pain2': return W('pain',x=>x<=2);
    case 'swell0': return W('swell',x=>x<=1);
    case 'ext0': return W('ext',x=>x<=0);
    case 'flex120': return W('flex',x=>x>=120);
    case 'flex135': return W('flex',x=>x>=135);
    case 'bal30': return W('bal',x=>x>=30);
    case 'calf25': { const v=b&&DB.involved&&b.v.calf? +b.v.calf[DB.involved] : 0; return v? v>=25 : null; }
    case 'bridge80': return L('bridge',80);
    case 'sq80': return L('slsq',80);
    case 'yb4': { const y=b&&b.v.ybal; const l=y&&+y.L, r=y&&+y.R; return (l&&r)? Math.abs(l-r)<=4 : null; }
    case 'hop85': case 'hop90': { const th=k==='hop85'?85:90; const ls=['single','triple','cross','timed'].map(t=>lsiOf(b,t)).filter(x=>x!=null); return ls.length? ls.every(x=>x>=th) : null; }
    case 'quad80': return L('quad',80);
    case 'quad90': return L('quad',90);
    case 'rsi65': return (b&&b.v.rsi)? +b.v.rsi>=65 : null;
  }
  return null;
}
function gateStatus(ph){
  const p=phaseById(ph); const man=DB.gateManual[ph]||{};
  const rows=p.gate.map((g,i)=>{ const auto=g.k?gateCheck(g.k):null; return {g,i,auto,ok:g.k? auto===true : !!man[i]}; });
  return {rows, ok:rows.filter(r=>r.ok).length, total:rows.length};
}
function setPhase(id,msg){ DB.phase=id; trainPhase=id; save(); updateHeaderPhase(); renderAll(); toast(msg||`Now in ${phaseById(id).code} · ${phaseById(id).name}`); }

function gateCard(ph){
  const p=phaseById(ph); const ix=PHASES.findIndex(x=>x.id===ph); const cur=ph===DB.phase;
  const gs=gateStatus(ph); const next=PHASES[ix+1];
  const card=el('div','phase-card'+(cur?' cur':''));
  card.innerHTML=`
    <div class="pc-top"><span class="pc-code">${p.code}</span><div class="pc-t"><b>${p.name}</b><span>${p.sub}</span></div>
      ${cur?'<span class="pc-cur">Current</span>':'<button class="pc-set">Set as current</button>'}</div>
    <p class="pc-goal">${p.goal}</p>
    ${gs.total?`<div class="pc-gate"><div class="pc-gh"><span>To move on</span><span class="pc-count">${gs.ok}/${gs.total} met</span></div>
      ${gs.rows.map(r=>`<div class="gate-row${r.ok?' ok':(r.g.k&&r.auto===false)?' no':''}">
        ${r.g.k?`<span class="gr-ic">${r.auto===null?'–':r.ok?'✓':'✕'}</span>`:`<button class="gr-ic gr-tick${r.ok?' on':''}" data-i="${r.i}" aria-pressed="${r.ok}" aria-label="Mark criterion met">${r.ok?'✓':''}</button>`}
        <span class="gr-t">${r.g.t}${r.g.k?`<em>${r.auto===null?'Needs an assessment':'From your latest assessment'}</em>`:'<em>Tick when true</em>'}</span></div>`).join('')}
      ${cur&&next?`<button class="pc-next">Move to ${next.code} · ${next.name} ${I.chev}</button>`:''}</div>`:''}
    <div class="pc-foot">Criteria from evidence-based ACL return-to-sport guidelines. A guide only — your physio's call always wins.</div>`;
  const setB=card.querySelector('.pc-set'); if(setB) setB.onclick=()=>setPhase(ph);
  card.querySelectorAll('.gr-tick').forEach(b=>b.onclick=()=>{ const m=DB.gateManual[ph]=DB.gateManual[ph]||{}; m[b.dataset.i]=!m[b.dataset.i]; save(); renderAll(); });
  const nb=card.querySelector('.pc-next');
  if(nb) nb.onclick=()=>{
    const go=()=>setPhase(next.id,`Moved up to ${next.code} · ${next.name} 🎉`);
    if(gs.ok<gs.total) confirmAction('Not all criteria met', `${gs.ok} of ${gs.total} criteria are met. Moving on early raises re-injury risk — check with your physio first.`, 'Move anyway', go);
    else go();
  };
  return card;
}

function sessionCard(s, todayId){
  const done=isDoneToday(s.id); const isToday=s.id===todayId;
  const card=el('div','scard'+(isToday?' is-today':''));
  const b=el('button','scard-btn');
  const badge = done?`<div class="scard-badge">Done</div>` : DB.drafts[s.id]?`<div class="resume-badge">In progress</div>` : isToday?`<div class="today-badge">Today</div>`:'';
  const claudeN=s.ex.filter(e=>e.src==='claude').length;
  b.innerHTML=`
    <div class="tag ${s.type}">${s.code}</div>
    <div class="info">
      <div class="t">${s.short}${isToday?' <span class="t-star">●</span>':''}</div>
      <div class="d"><span>${s.ex.length} exercises</span><span class="dot">~${s.est} min</span>${claudeN===s.ex.length?'<span class="dot claude-txt">Added by Claude</span>':''}</div>
    </div>
    ${badge}
    <div class="chev">${I.chev}</div>`;
  b.onclick=()=>{ card.classList.toggle('open'); };
  card.appendChild(b);
  const list=el('div','exlist');
  s.ex.forEach(ex=>{
    const item=el('div','exitem');
    const r=el('div','exrow');
    r.innerHTML=`<div class="en"><b>${ex.name}</b><span>${ex.target}${ex.rec?` · ${ex.rec}`:''}</span>${srcBadge(ex.src, ex.rec)}</div>`;
    item.appendChild(r); item.appendChild(videoBlock(ex.name, ex.vid));
    list.appendChild(item);
  });
  const start=el('button','start-inline',`${I.play} Start & log this session`);
  start.onclick=()=>openSession(s.id);
  list.appendChild(start);
  card.appendChild(list);
  return card;
}

function renderTrain(){
  const v=$('#view-train'); v.innerHTML='';
  const mode=DB.trainMode||'rehab';
  v.appendChild(el('div','',`<div class="eyebrow" style="margin:2px 2px 4px">Your programs</div><div class="h2" style="margin-bottom:12px">Train</div>`));
  const seg=el('div','seg train-seg');
  [['rehab','Rehab'],['hd','Heavy Duty'],['explore','Explore']].forEach(([k,l])=>{
    const b=el('button','',l); b.setAttribute('aria-pressed',k===mode); b.onclick=()=>{ DB.trainMode=k; save(); renderTrain(); window.scrollTo(0,0); }; seg.appendChild(b); });
  v.appendChild(seg);
  if(mode==='hd') return renderHDTrain(v);
  if(mode==='explore') return renderExplore(v);
  renderRehabTrain(v);
}
function renderRehabTrain(v){
  const ph = trainPhase || DB.phase;
  const fr=el('div','filter-row phase-row');
  PHASES.forEach(p=>{
    const c=el('button','chip'+(p.id===DB.phase?' is-cur':''),`${p.code} · ${p.name}`);
    c.setAttribute('aria-pressed',p.id===ph);
    c.onclick=()=>{ trainPhase=p.id; renderTrain(); };
    fr.appendChild(c);
  });
  v.appendChild(fr);
  requestAnimationFrame(()=>{ const a=fr.querySelector('[aria-pressed="true"]'); if(a) fr.scrollLeft=a.offsetLeft-20; });
  v.appendChild(gateCard(ph));
  const al=el('button','assess-link',`${I.cal}<span><b>Assessments</b> weekly check-ins & test days</span>${I.chev}`);
  al.onclick=()=>{ mePanel='assess'; renderMe(); switchTab('me'); };
  v.appendChild(al);

  const sessions=phaseSessions(ph);
  if(sessions.some(s=>s.ex.some(e=>e.src))){
    v.appendChild(el('div','src-legend',`${srcBadge('physio')}<span>your physio videos</span>${srcBadge('saves')}<span>your saved reels</span>${srcBadge('claude')}<span>evidence-based extras</span>`));
  }
  const todayId=suggestedToday().id;
  // MG follows the PDF order: Warm Up, Day 1–6, Cool Down
  const PDF_ORDER=['warmup','push','pull','posterior','core','legs','day6','cooldown'];
  const ordered = ph==='mgmt' ? [...sessions].sort((a,b)=>PDF_ORDER.indexOf(a.id)-PDF_ORDER.indexOf(b.id))
    : [...sessions].sort((a,b)=>(a.id===todayId?-1:0)-(b.id===todayId?-1:0));
  if(ph==='mgmt') v.appendChild(el('div','section-head','<span class="eyebrow">Physio program · Week 14 PDF</span>'));
  ordered.forEach(s=>v.appendChild(sessionCard(s,todayId)));
}

/* ============================================================
   RENDER: PROGRESS
   ============================================================ */
function renderProgress(){
  const v=$('#view-progress'); v.innerHTML='';
  v.appendChild(el('div','',`<div class="eyebrow" style="margin:2px 2px 4px">Your numbers</div><div class="h2" style="margin-bottom:6px">Progress</div>`));

  v.appendChild(bodyCompCard());
  if(!DB.history.length){
    v.appendChild(emptyState('No sessions yet','Log your first workout from the Today or Train tab and your volume, records, and history will build up here.'));
    return;
  }

  // chart card
  const cc=el('div','chart-card');
  cc.innerHTML=`<div class="ch-head"><b>Training volume</b><span>last ${Math.min(10,DB.history.length)} sessions · kg</span></div><canvas id="volChart"></canvas>`;
  v.appendChild(cc);

  // PRs
  const pr=personalRecords();
  const keys=Object.keys(pr).sort((a,b)=>pr[b].kg-pr[a].kg).slice(0,6);
  if(keys.length){
    v.appendChild(el('div','section-head','<span class="eyebrow">Personal records</span>'));
    keys.forEach(name=>{
      const c=el('div','pr-card');
      c.innerHTML=`<div class="pri">${I.trophy}</div>
        <div class="prt"><b>${name}</b><span>${pr[name].reps} reps · ${MO[new Date(pr[name].date+'T00:00').getMonth()]} ${new Date(pr[name].date+'T00:00').getDate()}</span></div>
        <div class="prv">${pr[name].kg}<small>kg</small></div>`;
      v.appendChild(c);
    });
  }

  // history — category tags, day-wise, grouped by month, with a date filter
  v.appendChild(el('div','section-head','<span class="eyebrow">History</span><span style="color:var(--ink-3);font-weight:600;font-size:12px">tap a day to expand</span>'));
  const fb=el('div','date-filter');
  fb.innerHTML=`<button class="cal-toggle" id="calToggle">${I.cal}<span>Calendar</span></button>
    <label class="df-field">${I.cal}<input type="date" id="histDate" value="${histFilter||''}" aria-label="Filter history by date"></label>
    <button class="df-clear" id="histClear"${histFilter?'':' hidden'}>Clear</button>`;
  v.appendChild(fb);
  fb.querySelector('#calToggle').onclick=()=>openCalendar();
  fb.querySelector('#histDate').onchange=e=>{ histFilter=e.target.value||null; renderProgress(); };
  fb.querySelector('#histClear').onclick=()=>{ histFilter=null; renderProgress(); };

  let sorted=[...DB.history].sort((a,b)=>b.ts-a.ts);
  if(histFilter) sorted=sorted.filter(r=>r.date===histFilter);
  if(!sorted.length){
    v.appendChild(emptyState(histFilter?'No sessions on this date':'No history yet', histFilter?'Nothing logged on the date you picked — try another or clear the filter.':'Log a workout and it will appear here.'));
    requestAnimationFrame(drawChart); return;
  }
  const groups={}, order=[];
  sorted.forEach(rec=>{ const d=new Date(rec.date+'T00:00'); const k=d.getFullYear()+'-'+d.getMonth();
    if(!groups[k]){ groups[k]=[]; order.push(k); } groups[k].push(rec); });
  order.forEach(k=>{
    const [yy,mm]=k.split('-'); const cnt=groups[k].length;
    const mh=el('div','month-head');
    mh.innerHTML=`<span>${MONTHS_FULL[+mm]} ${yy}</span><span class="mc">${cnt} session${cnt>1?'s':''}</span>`;
    v.appendChild(mh);
    const h=el('div','hist');
    groups[k].forEach(rec=>{
      const d=new Date(rec.date+'T00:00'); const s=byId(rec.sid);
      const setCount=Object.values(rec.sets).reduce((a,x)=>a+x.length,0);
      const wd=DOW[d.getDay()];
      const row=el('div','hist-row');
      row.innerHTML=`
        <div class="tag ${s?s.type:'strength'}">${s?s.code:'?'}</div>
        <div class="hi"><b>${s?s.short:rec.sid}</b><span>${wd} ${d.getDate()} ${MO[d.getMonth()]} ${yy} · ${setCount} sets${rec.volume?' · '+rec.volume+'kg':''}</span></div>
        <button class="del" aria-label="Delete ${s?s.short:rec.sid} from ${d.getDate()} ${MO[d.getMonth()]} ${yy}">${I.trash}</button>`;
      const detail=el('div','hist-detail');
      detail.innerHTML = `<div class="hde-date">${wd}, ${d.getDate()} ${MO[d.getMonth()]} ${yy}</div>` + Object.keys(rec.sets).map(name=>{
        const arr=rec.sets[name];
        const desc = arr.map(x=> x.sec ? `${x.sec}s` : x.kg ? `${x.reps}×${x.kg}kg` : x.reps ? `${x.reps} reps` : '✓').join(', ');
        return `<div class="hde"><b>${name}</b><span>${desc}</span></div>`;
      }).join('');
      row.onclick=()=>{ row.classList.toggle('open'); };
      row.querySelector('.del').onclick=(e)=>{
        e.stopPropagation();
        confirmAction('Delete this session?', `${s?s.short:rec.sid} logged on ${d.getDate()} ${MO[d.getMonth()]} ${yy} will be removed.`, 'Delete', ()=>{
          const idx=DB.history.indexOf(rec); const removed=DB.history.splice(idx,1)[0]; save(); renderAll();
          toast('Session deleted', ()=>{ DB.history.splice(idx,0,removed); save(); renderAll(); });
        });
      };
      h.appendChild(row); h.appendChild(detail);
    });
    v.appendChild(h);
  });

  requestAnimationFrame(drawChart);
}
function drawChart(){
  const cv=$('#volChart'); if(!cv) return;
  const recs=[...DB.history].sort((a,b)=>a.ts-b.ts).slice(-10);
  const dpr=window.devicePixelRatio||1;
  const W=cv.clientWidth, H=150;
  if(W<10 || !recs.length) return; // canvas hidden / no data — skip
  cv.width=W*dpr; cv.height=H*dpr;
  const c=cv.getContext('2d'); c.scale(dpr,dpr); c.clearRect(0,0,W,H);
  const css=getComputedStyle(document.documentElement);
  const accent=css.getPropertyValue('--accent').trim();
  const teal=css.getPropertyValue('--teal').trim();
  const gold=css.getPropertyValue('--gold').trim();
  const line=css.getPropertyValue('--line').trim();
  const ink3=css.getPropertyValue('--ink-3').trim();
  const vals=recs.map(r=>r.volume||0);
  const max=Math.max(...vals,1);
  const padB=22, padT=14;
  const n=recs.length;
  const gap=8; const bw=Math.max(4,Math.min(38,(W-(n-1)*gap)/n));
  const totalW=n*bw+(n-1)*gap; const startX=(W-totalW)/2;
  // baseline
  c.strokeStyle=line; c.lineWidth=1; c.beginPath(); c.moveTo(0,H-padB+.5); c.lineTo(W,H-padB+.5); c.stroke();
  recs.forEach((r,i)=>{
    const s=byId(r.sid);
    const col = s&&s.type==='mobility'?teal : s&&s.type==='cardio'?gold : accent;
    const h=Math.max(3,(vals[i]/max)*(H-padB-padT));
    const x=startX+i*(bw+gap); const y=H-padB-h;
    const rad=Math.max(0,Math.min(6,bw/2));
    c.fillStyle=col;
    c.beginPath();
    c.moveTo(x,y+h); c.lineTo(x,y+rad); c.arcTo(x,y,x+rad,y,rad);
    c.lineTo(x+bw-rad,y); c.arcTo(x+bw,y,x+bw,y+rad,rad); c.lineTo(x+bw,y+h); c.closePath(); c.fill();
    // date label
    const d=new Date(r.date+'T00:00');
    c.fillStyle=ink3; c.font='600 9px "IBM Plex Mono"'; c.textAlign='center';
    c.fillText(d.getDate()+'/'+(d.getMonth()+1), x+bw/2, H-8);
  });
}

/* ---------- BODY COMPOSITION ---------- */
const BC_METRICS=[
  {k:'w',  ab:'W',label:'Weight',  unit:'kg',goodDown:true, col:'var(--accent)'},
  {k:'smm',ab:'M',label:'Muscle',  unit:'kg',goodDown:false,col:'var(--good)'},
  {k:'pbf',ab:'F',label:'Body fat',unit:'%', goodDown:true, col:'var(--gold)'},
];
let bcRows=[], bcWorker=null;
const bcKey=r=>r.date+' '+(r.time||'');
function bodySorted(){ return [...DB.body].sort((a,b)=>bcKey(a)<bcKey(b)?-1:bcKey(a)>bcKey(b)?1:a.ts-b.ts); }
let bcWhenTouched=false;
function bcNowTime(){ const d=new Date(); return String(d.getHours()).padStart(2,'0')+':'+String(d.getMinutes()).padStart(2,'0'); }
function fmtShort(iso){ const d=new Date(iso+'T00:00'); return `${d.getDate()} ${MO[d.getMonth()]} ${d.getFullYear()}`; }
function bodyCompCard(){
  const wrap=el('div','');
  const list=bodySorted(); const last=list[list.length-1];
  const c=el('div','bc-card');
  c.innerHTML=`<div class="bc-top"><div><b>Body composition</b><span>${last?`Last scan ${fmtShort(last.date)} · ${list.length} total`:'Upload a scale screenshot to start'}</span></div><button class="bc-add" id="bcAdd">${I.plus}Add scan</button></div>`;
  const g=el('div','bc-graph'); bcMountChart(g,list,c);
  if(!list.length){ g.appendChild(el('button','bc-graph-cta',`${I.plus}Upload a scan to start your trend`)); g.lastChild.onclick=openBodyScan; }
  if(list.length){
    const pick=e=>e.target.closest&&e.target.closest('.bc-col');
    g.addEventListener('click',e=>{ const t=pick(e); if(t) openScanEditor(t.dataset.id); });
    g.addEventListener('keydown',e=>{ const t=pick(e); if(t&&(e.key==='Enter'||e.key===' ')){ e.preventDefault(); openScanEditor(t.dataset.id); } });
  }
  c.appendChild(g);
  c.appendChild(el('div','bc-key',BC_METRICS.map(m=>`<span><i style="background:${m.col}"></i><b style="color:${m.col}">${m.ab}</b>${m.label} ${m.unit}</span>`).join('')));
  if(list.length) c.appendChild(el('div','bc-hint','Tap a point to view its image, fix numbers or change the date'));
  c.querySelector('#bcAdd').onclick=openBodyScan;
  wrap.appendChild(c);
  if(list.length){
    const l=el('div','bc-list');
    [...list].reverse().slice(0,6).forEach(r=>{
      const row=el('div','bc-row');
      row.tabIndex=0; row.setAttribute('role','button'); row.setAttribute('aria-label',`Edit scan from ${fmtShort(r.date)}`);
      row.innerHTML=`<span class="bc-thumb">${I.image}</span><div class="bi"><b>${fmtShort(r.date)}${r.time?` · ${r.time}`:''}</b><span>W ${r.w??'–'} · M ${r.smm??'–'} · F ${r.pbf??'–'}%</span></div>
        <button class="del" aria-label="Delete scan">${I.trash}</button>`;
      if(r.hasImg) bcImgURL(r.id).then(u=>{ if(u) row.querySelector('.bc-thumb').innerHTML=`<img src="${u}" alt="">`; });
      row.onclick=()=>openScanEditor(r.id);
      row.onkeydown=e=>{ if(e.target===row&&(e.key==='Enter'||e.key===' ')){ e.preventDefault(); openScanEditor(r.id); } };
      row.querySelector('.del').onclick=e=>{ e.stopPropagation(); bcDeleteScan(r); };
      l.appendChild(row);
    });
    wrap.appendChild(l);
  }
  return wrap;
}
// Chart: fixed W / M / F badges on the left and latest values on the right; the plot between them is drawn
// at real pixel size and scrolls sideways (inside the card) once scans no longer fit at a comfortable spacing.
// Each metric has its own lane and scale; a dotted guide links each scan's three dots, and each scan is a tap target.
const BC_CH={laneH:54, top:6, sp:44, min:30, pl:12, pr:16};
BC_CH.H=BC_CH.top+BC_CH.laneH*3+22;
let bcChartEnd=0; // how far (px) the plot is scrolled back from the newest scan; kept across re-renders
function bcLaneScales(list){
  const {laneH,top}=BC_CH, out={};
  BC_METRICS.forEach((m,li)=>{
    const y0=top+li*laneH, pts=list.map((p,i)=>({v:p[m.k],i})).filter(p=>p.v!=null); if(!pts.length) return;
    const vals=pts.map(p=>p.v); let lo=Math.min(...vals), hi=Math.max(...vals);
    if(hi-lo<.6){ const c=(hi+lo)/2; lo=c-.3; hi=c+.3; }
    out[m.k]={Y:v=>y0+12+(hi-v)/(hi-lo)*(laneH-24), pts, last:pts[pts.length-1].i};
  });
  return out;
}
function bcRailSVG(){
  const {laneH,top,H}=BC_CH; let s='';
  BC_METRICS.forEach((m,li)=>{ const mid=top+li*laneH+laneH/2;
    s+=`<rect x="0" y="${mid-10}" width="20" height="20" rx="6" fill="${m.col}" opacity=".16"/><text x="10" y="${mid+4}" text-anchor="middle" font-size="11" font-weight="800" fill="${m.col}">${m.ab}</text>`; });
  return `<svg class="bc-rail" width="24" height="${H}" viewBox="0 0 24 ${H}" aria-hidden="true">${s}</svg>`;
}
function bcNowSVG(sc){ // latest value + change since the previous scan
  const {laneH,top,H}=BC_CH, W=58; let s='';
  BC_METRICS.forEach((m,li)=>{ const L=sc[m.k]; if(!L) return; const mid=top+li*laneH+laneH/2;
    const lastV=L.pts[L.pts.length-1].v, prevV=L.pts.length>1?L.pts[L.pts.length-2].v:null;
    let delta='', dc='var(--ink-3)';
    if(prevV!=null){ const d=+(lastV-prevV).toFixed(1); delta=(d>0?'+':'')+d; if(d) dc=(d<0)===m.goodDown?'var(--good)':'var(--danger)'; }
    s+=`<text x="${W-2}" y="${mid+(delta?-1:4)}" text-anchor="end" font-size="13" font-weight="800" fill="var(--ink)">${lastV}<tspan font-size="9" font-weight="600" fill="var(--ink-3)">${m.unit}</tspan></text>`+
      (delta?`<text x="${W-2}" y="${mid+12}" text-anchor="end" font-size="9.5" font-weight="700" fill="${dc}">${delta}</text>`:''); });
  return `<svg class="bc-now" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">${s}</svg>`;
}
function bcPlotSVG(list,sc,w){
  const {laneH,top,H,sp,min,pl,pr}=BC_CH, n=list.length;
  let svg='';
  const dashed=(mid,x0,x1)=>`<path d="M${x0} ${mid+8} C${x0+60} ${mid+4} ${x0+110} ${mid-8} ${x1} ${mid-6}" fill="none" stroke="var(--line-2)" stroke-width="2" stroke-dasharray="5 6" stroke-linecap="round"/>`;
  if(!n){
    BC_METRICS.forEach((m,li)=>{ const y0=top+li*laneH; svg+=`<line x1="0" x2="${w}" y1="${y0+laneH}" y2="${y0+laneH}" stroke="var(--line)"/>`+dashed(y0+laneH/2,pl,w-pr); });
    return `<svg class="bc-chart" width="${w}" height="${H}" viewBox="0 0 ${w} ${H}" aria-hidden="true">${svg}</svg>`;
  }
  // x: proportional to time, at least `min` px between scans; wider than the card (→ scroll) only when it must be
  const avail=Math.max(40,w-pl-pr), span=Math.max(avail,(n-1)*sp);
  const t=list.map(p=>new Date(p.date+'T00:00').getTime()), t0=t[0], t1=t[n-1];
  const xs=t.map((ti,i)=> n===1? avail/2 : t1===t0? i/(n-1)*span : (ti-t0)/(t1-t0)*span);
  for(let i=1;i<n;i++) xs[i]=Math.max(xs[i],xs[i-1]+min);
  if(n>1&&xs[n-1]>span){ xs[n-1]=span; for(let i=n-2;i>=0;i--) xs[i]=Math.min(xs[i],xs[i+1]-min); }
  for(let i=0;i<n;i++) xs[i]+=pl;
  const W=n>1? Math.max(w,Math.ceil(pl+span+pr)) : w;
  xs.forEach(x=>{ svg+=`<line class="bc-guide" x1="${x.toFixed(1)}" x2="${x.toFixed(1)}" y1="${top+4}" y2="${top+laneH*3}"/>`; });
  BC_METRICS.forEach((m,li)=>{
    const y0=top+li*laneH, mid=y0+laneH/2, L=sc[m.k];
    svg+=`<line x1="0" x2="${W}" y1="${y0+laneH}" y2="${y0+laneH}" stroke="var(--line)"/>`;
    if(!L){ svg+=dashed(mid,pl,W-pr); return; }
    svg+=`<path d="${L.pts.map((p,j)=>(j?'L':'M')+xs[p.i].toFixed(1)+' '+L.Y(p.v).toFixed(1)).join(' ')}" fill="none" stroke="${m.col}" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round"/>`;
    // value labels (the latest sits on the right), only where neighbours leave room: below the dot when it sits high in its lane
    L.pts.forEach((p,j)=>{ if(j===L.pts.length-1) return; const x=xs[p.i], y=L.Y(p.v);
      const gap=Math.min(j? x-xs[L.pts[j-1].i] : Infinity, xs[L.pts[j+1].i]-x); if(gap<26) return;
      svg+=`<text x="${j?x:x-3}" y="${y<mid?y+14:y-7}" text-anchor="${j?'middle':'start'}" font-size="8.5" fill="var(--ink-3)" font-family="IBM Plex Mono">${p.v}</text>`; });
  });
  // date labels: as many as fit without overlapping, always the newest; the year is added where it changes
  const yr=i=>+list[i].date.slice(0,4), multi=yr(0)!==yr(n-1), labs=[];
  list.forEach((p,i)=>{ const d=new Date(p.date+'T00:00'), prev=labs[labs.length-1];
    const txt=`${d.getDate()}/${d.getMonth()+1}`+(multi&&(!prev||yr(prev.i)!==yr(i))?`/${String(yr(i)).slice(2)}`:''), hw=txt.length*2.8+3;
    const L={i,txt,hw,x:Math.min(Math.max(xs[i],hw),W-hw)};
    if(prev&&L.x-hw<prev.x+prev.hw){ if(i!==n-1) return; labs.pop(); }
    labs.push(L); });
  labs.forEach(L=>{ svg+=`<text x="${L.x.toFixed(1)}" y="${H-6}" text-anchor="middle" font-size="9" fill="var(--ink-3)" font-family="IBM Plex Mono">${L.txt}</text>`; });
  // one group per scan: invisible hit area (half-way to each neighbour), highlight guide, the three dots
  list.forEach((p,i)=>{ const x=xs[i], a=i?(xs[i-1]+x)/2:0, b=i<n-1?(x+xs[i+1])/2:W;
    let dots='';
    BC_METRICS.forEach(m=>{ const L=sc[m.k]; if(p[m.k]==null||!L) return; const isLast=L.last===i;
      dots+=`<circle cx="${x.toFixed(1)}" cy="${L.Y(p[m.k]).toFixed(1)}" r="${isLast?4:3}" fill="${isLast?m.col:'var(--surface)'}" stroke="${m.col}" stroke-width="2"/>`; });
    svg+=`<g class="bc-col" data-id="${p.id}" tabindex="0" role="button" aria-label="Edit scan from ${fmtShort(p.date)}: weight ${p.w??'none'}, muscle ${p.smm??'none'}, body fat ${p.pbf??'none'}">`+
      `<rect class="bc-hit" x="${a.toFixed(1)}" y="0" width="${(b-a).toFixed(1)}" height="${H-14}"/>`+
      `<line class="bc-hl" x1="${x.toFixed(1)}" x2="${x.toFixed(1)}" y1="${top+2}" y2="${top+laneH*3+2}"/>${dots}</g>`; });
  return `<svg class="bc-chart" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="group" aria-label="Weight, muscle and body fat trend, ${n} scans">${svg}</svg>`;
}
// lays the chart into `g` and (re)draws the plot whenever its width changes; starts at the newest scans
function bcMountChart(g,list,card){
  const sc=bcLaneScales(list);
  g.classList.toggle('ghost',!list.length);
  g.innerHTML=bcRailSVG()+'<div class="bc-scroll"></div>'+(list.length?bcNowSVG(sc):'');
  const box=g.querySelector('.bc-scroll'); let lastW=0, ro=null;
  const fades=()=>{ const max=box.scrollWidth-box.clientWidth; box.classList.toggle('fl',box.scrollLeft>2); box.classList.toggle('fr',box.scrollLeft<max-2); };
  const draw=()=>{
    if(!box.isConnected){ if(ro&&lastW) ro.disconnect(); return; }
    const w=Math.round(box.clientWidth); if(w<60||w===lastW) return; lastW=w;
    box.innerHTML=bcPlotSVG(list,sc,w);
    const max=box.scrollWidth-box.clientWidth; box.scrollLeft=Math.max(0,max-bcChartEnd);
    if(be) box.querySelector(`.bc-col[data-id="${be.r.id}"]`)?.classList.add('sel');
    const h=card.querySelector('.bc-hint');
    if(h) h.textContent= max>0? 'Swipe the chart for earlier scans · tap a point to edit it' : 'Tap a point to view its image, fix numbers or change the date';
    fades();
  };
  box.addEventListener('scroll',()=>{ bcChartEnd=Math.max(0,box.scrollWidth-box.clientWidth-box.scrollLeft); fades(); },{passive:true});
  if(window.ResizeObserver){ ro=new ResizeObserver(draw); ro.observe(box); } else requestAnimationFrame(draw);
}

// --- scan images: kept on this device in IndexedDB (localStorage is far too small for photos) ---
function bcId(){ return 's'+Date.now().toString(36)+Math.random().toString(36).slice(2,7); }
const bcImgDB=(()=>{ let db=null;
  const open=()=>db||(db=new Promise((ok,no)=>{ const q=indexedDB.open('granimals_img',1);
    q.onupgradeneeded=()=>q.result.createObjectStore('scan'); q.onsuccess=()=>ok(q.result); q.onerror=()=>{ db=null; no(q.error); }; }));
  const run=(mode,fn)=>open().then(d=>new Promise((ok,no)=>{ const t=d.transaction('scan',mode), q=fn(t.objectStore('scan'));
    t.oncomplete=()=>ok(q.result); t.onerror=t.onabort=()=>no(t.error); }));
  return { get:id=>run('readonly',st=>st.get(id)), put:(id,blob)=>run('readwrite',st=>st.put(blob,id)), del:id=>run('readwrite',st=>st.delete(id)) };
})();
const bcUrls={};
async function bcImgURL(id){
  if(bcUrls[id]) return bcUrls[id];
  const b=await bcImgDB.get(id).catch(()=>null); return b? (bcUrls[id]=URL.createObjectURL(b)) : null;
}
// the inline copy is dropped only once the image is safely in IndexedDB; a failed move retries on the next load
async function bcMigrateImgs(list){
  let moved=0;
  for(const [r,src] of list){
    try{ const blob=await (await fetch(src)).blob(); await bcImgDB.put(r.id,blob); r.hasImg=true; delete r.img; delete r.imgs; moved++; }catch(e){}
  }
  if(moved){ save(); renderProgress(); }
}
function bcDropURL(id){ if(bcUrls[id]){ URL.revokeObjectURL(bcUrls[id]); delete bcUrls[id]; } }
// store a right-sized JPEG (sharp enough to re-read later, small enough to keep many)
async function bcShrink(file){
  const img=await bcDecode(file), sc=Math.min(1,1600/Math.max(img.width,img.height));
  const cv=document.createElement('canvas'); cv.width=Math.round(img.width*sc); cv.height=Math.round(img.height*sc);
  cv.getContext('2d').drawImage(img,0,0,cv.width,cv.height); if(img.close) img.close();
  return await new Promise(ok=>cv.toBlob(ok,'image/jpeg',.86));
}
function bcShowImg(url){ const lb=$('#bcLb'); lb.querySelector('img').src=url; lb.classList.add('show'); lb.querySelector('.cal-close').focus(); }
function bcHideImg(){ $('#bcLb').classList.remove('show'); }
$('#bcLb').onclick=bcHideImg;
function bcDeleteScan(r,after){
  confirmAction('Delete this scan?',`Scan from ${fmtShort(r.date)} and its image will be removed.`,'Delete',async()=>{
    const i=DB.body.indexOf(r); if(i<0) return;
    const blob=r.hasImg? await bcImgDB.get(r.id).catch(()=>null) : null;
    DB.body.splice(i,1); save(); bcImgDB.del(r.id).catch(()=>{}); bcDropURL(r.id);
    if(after) after(); renderProgress();
    toast('Scan deleted',()=>{ DB.body.splice(i,0,r); save(); if(blob) bcImgDB.put(r.id,blob).catch(()=>{}); renderProgress(); });
  });
}
// a reading far from your nearest saved scan is more likely a misread than a real change
function bcPlausible(p,date){
  const near=[...DB.body].sort((a,b)=>Math.abs(new Date(a.date)-new Date(date))-Math.abs(new Date(b.date)-new Date(date)))[0];
  if(!near) return;
  const lim={w:Math.max(4,(near.w||0)*.06), smm:3, pbf:6};
  for(const k in lim) if(p[k]!=null&&near[k]!=null&&Math.abs(p[k]-near[k])>lim[k]) p.sure[k]=false;
}

// --- OCR: read numbers from an InBody-style screenshot (always the full-resolution original, not the stored copy) ---
const BC_OCR_CDN='https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js';
let bcPhase='';
function bcLoadOCR(){
  if(window.Tesseract) return Promise.resolve();
  return new Promise((ok,fail)=>{ const s=document.createElement('script');
    s.src=BC_OCR_CDN; s.onload=ok; s.onerror=()=>{ s.remove(); fail(new Error('load')); }; document.head.appendChild(s); });
}
async function bcGetWorker(){
  await bcLoadOCR();
  if(!bcWorker) bcWorker=Tesseract.createWorker('eng',1,{ logger:m=>{
    if(!bcPhase||m.progress==null) return;
    const pct=Math.round(m.progress*100);
    if(/language|core|api/i.test(m.status)) bcStatus(`<i class="spin"></i>Downloading scanner… ${pct}%`);
    else if(/recogniz/i.test(m.status)) bcStatus(`<i class="spin"></i>${bcPhase} ${pct}%`);
  }}).catch(e=>{ bcWorker=null; throw e; });
  return bcWorker;
}
// decode any browser-readable image (respects EXIF rotation); throws on HEIC etc. where unsupported
async function bcDecode(file){
  try{ return await createImageBitmap(file,{imageOrientation:'from-image'}); }catch(e){}
  return await new Promise((ok,no)=>{ const i=new Image(), u=URL.createObjectURL(file);
    i.onload=()=>{ URL.revokeObjectURL(u); ok(i); }; i.onerror=()=>{ URL.revokeObjectURL(u); no(new Error('decode')); }; i.src=u; });
}
// draw at OCR-friendly size; "enhance" = grayscale + contrast stretch (helps glare / moiré photos of screens)
function bcCanvas(img,enhance){
  const w=img.width, h=img.height, sc=Math.min(6, 2000/Math.max(w,h)); // small images get enlarged more
  const cv=document.createElement('canvas'); cv.width=Math.round(w*sc); cv.height=Math.round(h*sc);
  const c=cv.getContext('2d',{willReadFrequently:true}); c.drawImage(img,0,0,cv.width,cv.height);
  if(enhance){
    const d=c.getImageData(0,0,cv.width,cv.height), px=d.data, hist=new Uint32Array(256);
    for(let i=0;i<px.length;i+=4){ const y=(px[i]*.299+px[i+1]*.587+px[i+2]*.114)|0; px[i]=y; hist[y]++; }
    const n=px.length/4; let lo=0,hi=255,acc=0; while(acc+hist[lo]<n*.02) acc+=hist[lo++]; acc=0; while(acc+hist[hi]<n*.02) acc+=hist[hi--];
    const k=255/Math.max(1,hi-lo);
    for(let i=0;i<px.length;i+=4){ const v=Math.max(0,Math.min(255,(px[i]-lo)*k)); px[i]=px[i+1]=px[i+2]=v; }
    c.putImageData(d,0,0);
  }
  return cv;
}
// "26","10","20" (YY.MM.DD, or DD.MM.YY) / "2026","10","20" → ISO date, never in the future
function bcDate(a,b,c){
  const z=x=>String(x).padStart(2,'0'), today=todayISO();
  const opts= String(a).length===4? [`${a}-${z(b)}-${z(c)}`] : [`20${a}-${z(b)}-${z(c)}`,`20${c}-${z(b)}-${z(a)}`];
  return opts.filter(d=>{ const [y,m,dd]=d.split('-').map(Number), t=new Date(y,m-1,dd); return t.getMonth()===m-1&&t.getDate()===dd&&d<=today; }).sort().pop()||null;
}
function bcParse(text){
  const t=String(text).replace(/\r/g,'');
  // labels tolerate common OCR slips (Welght, Muscel, Fal…)
  const LAB={ w:/w[eao][il1!|]?g[hn]/i, smm:/skelet|mus[cs]|uscle/i, pbf:/percent|body\s*f[ao]|\bf[ao][t+l]\b/i };
  const pos={}; for(const k in LAB){ const m=LAB[k].exec(t); if(m) pos[k]={s:m.index,e:m.index+m[0].length}; }
  const grab=k=>{ const p=pos[k]; if(!p) return null;
    // look only until the next label, so a missing value can't borrow its neighbour's number
    let end=p.e+160; for(const o in pos) if(o!==k&&pos[o].s>p.e&&pos[o].s<end) end=pos[o].s;
    const seg=t.slice(p.e,end).replace(/(?<=\d)[oO]|[oO](?=\d)/g,'0');
    for(const tok of seg.match(/\d[\d.,]*\d|\d/g)||[]){ const v=bcNum(tok,k); if(v!=null) return v; }
    return null; };
  const out={ w:grab('w'), smm:grab('smm'), pbf:grab('pbf'), date:null, time:null };
  // dates (InBody prints YY.MM.DD) — history screens show several: take the newest, and the time printed with it
  const TRE=/\b([01]?\d|2[0-3]):([0-5]\d)\b/g, hm=m=>m[1].padStart(2,'0')+':'+m[2];
  const dates=[...t.matchAll(/\b(?:(20\d{2})|(\d{2}))[.\/-](\d{1,2})[.\/-](\d{1,2})\b/g)], times=[...t.matchAll(TRE)];
  let best=null;
  dates.forEach((m,i)=>{
    const c= m[1]? bcDate(m[1],m[3],m[4]) : bcDate(m[2],m[3],m[4]);
    if(!c||(best&&c<best.date)) return;
    // same number of dates and times → a row of dates over a row of times: pair by position; else the next time after the date
    const tm= times.length===dates.length? times[i] : times.find(x=>x.index>m.index);
    best={date:c, time:tm?hm(tm):null};
  });
  if(best){ out.date=best.date; out.time=best.time; }
  else if(times.length) out.time=hm(times[times.length-1]);
  return out;
}
// Reads one screenshot. Pass 1: whole screen → finds the labels (and straightens tilted photos).
// Pass 2: re-reads only the area beside / under each label, digits-only and enlarged.
const BC_RNG={w:[25,250],smm:[8,80],pbf:[2,65]};
function bcLines(data){ const out=[]; (data.blocks||[]).forEach(b=>(b.paragraphs||[]).forEach(p=>(p.lines||[]).forEach(l=>out.push(l)))); return out; }
// the machine always prints exactly one decimal: "74.3", or "743" when OCR drops the dot.
// Anything else (26.10.20 dates, 17:50 times, 3 stray digits) is rejected.
function bcNum(txt,k){
  const s=String(txt).replace(/[oO]/g,'0').replace(/,/g,'.').replace(/[^\d.]/g,'').replace(/^\.+|\.+$/g,'');
  const v= /^\d{1,3}\.\d$/.test(s)? parseFloat(s) : /^\d{3,4}$/.test(s)? +(s.slice(0,-1)+'.'+s.slice(-1)) : null;
  return v!=null&&v>=BC_RNG[k][0]&&v<=BC_RNG[k][1]? Math.round(v*10)/10 : null;
}
// fuzzy word match (edit distance ≤ ⅓ of the word) so OCR slips like "Wesght" / "Shedetal" still count;
// rivals win ties, so "Height" is never taken for "Weight"
function bcDist(a,b){ const d=[...Array(b.length+1).keys()];
  for(let i=1;i<=a.length;i++){ let p=d[0]; d[0]=i; for(let j=1;j<=b.length;j++){ const t=d[j]; d[j]=Math.min(d[j]+1,d[j-1]+1,p+(a[i-1]===b[j-1]?0:1)); p=t; } }
  return d[b.length]; }
function bcLike(word,target,rivals=[]){
  const a=String(word||'').split('(')[0].toLowerCase().replace(/[^a-z]/g,'');
  if(a.length<3||Math.abs(a.length-target.length)>2) return false;
  const d=bcDist(a,target); return d<=Math.floor(target.length/3) && rivals.every(r=>bcDist(a,r)>d);
}
function bcFindLabels(lines){
  const lab={};
  for(const l of lines){
    const ws=l.words||[], t=ws.map(x=>x.text);
    const nIdx=ws.findIndex(x=>/\d/.test(x.text)&&!/[a-z]{2}/i.test(x.text)); // first number on the line ends the label
    const lw= nIdx<0? ws : ws.slice(0,nIdx); if(!lw.length) continue;
    let k=null;
    if(bcLike(t[0],'weight',['height','eight'])) k='w';
    else if(bcLike(t[0],'skeletal')||/^smm\b/i.test(t[0])||(bcLike(t[0],'muscle')&&bcLike(t[1],'mass'))) k='smm';
    else if((bcLike(t[0],'percent',['recent'])&&(bcLike(t[1],'body')||bcLike(t[1],'fat')||bcLike(t[2],'fat')))||/^pbf\b/i.test(t[0])||(bcLike(t[0],'body')&&bcLike(t[1],'fat')&&!bcLike(t[2],'mass')&&!/kg/i.test(l.text))) k='pbf';
    if(!k) continue;
    const box={x0:Math.min(...lw.map(x=>x.bbox.x0)),x1:Math.max(...lw.map(x=>x.bbox.x1)),y0:Math.min(...lw.map(x=>x.bbox.y0)),y1:Math.max(...lw.map(x=>x.bbox.y1))};
    box.h=lw[0].bbox.y1-lw[0].bbox.y0;
    if(!lab[k]||box.y0<lab[k].y0) lab[k]=box; // topmost occurrence
  }
  return lab;
}
// median text-baseline angle (degrees) — photos taken at a slight tilt
function bcSkew(lines,W){
  const a=lines.filter(l=>l.baseline&&l.text.trim().length>=3&&l.baseline.x1-l.baseline.x0>W*.12)
    .map(l=>Math.atan2(l.baseline.y1-l.baseline.y0,l.baseline.x1-l.baseline.x0)*180/Math.PI).sort((x,y)=>x-y);
  return a.length>=3? a[a.length>>1] : 0;
}
function bcRotate(img,deg){
  const a=deg*Math.PI/180, w=img.width, h=img.height, c=Math.abs(Math.cos(a)), s=Math.abs(Math.sin(a));
  const cv=document.createElement('canvas'); cv.width=Math.round(w*c+h*s); cv.height=Math.round(w*s+h*c);
  const x=cv.getContext('2d'); x.fillStyle='#fff'; x.fillRect(0,0,cv.width,cv.height);
  x.translate(cv.width/2,cv.height/2); x.rotate(a); x.drawImage(img,-w/2,-h/2); return cv;
}
// candidates among words: only the biggest text (the reading, not scale ticks / dates), in screen coordinates
// Tesseract sometimes splits one big reading into fragments ("1" "77" for 17.7): join tight, same-height digit neighbours
function bcJoin(words,k){
  const dig=w=>/\d/.test(w.text)&&/^[\d.,oO]+$/.test(w.text.trim()), out=[];
  for(let i=0;i<words.length;i++){
    const a=words[i], b=words[i+1];
    if(b&&dig(a)&&dig(b)){
      const A=a.bbox, B=b.bbox, ha=A.y1-A.y0, hb=B.y1-B.y0, H=Math.max(ha,hb), gap=B.x0-A.x1;
      if(Math.min(ha,hb)/H>=.7 && Math.min(A.y1,B.y1)-Math.max(A.y0,B.y0)>=.5*Math.min(ha,hb) && gap>=-.2*H && gap<=.45*H
         && bcNum(a.text+b.text,k)!=null){
        out.push({text:a.text+b.text, confidence:Math.min(a.confidence,b.confidence), bbox:{x0:A.x0,y0:Math.min(A.y0,B.y0),x1:B.x1,y1:Math.max(A.y1,B.y1)}});
        i++; continue;
      }
    }
    out.push(a);
  }
  return out;
}
function bcCands(words,k,minConf=0,dx=0,sc=1,dy=0){
  const c=bcJoin(words,k).filter(w=>w.confidence>=minConf).map(w=>({v:bcNum(w.text,k), h:(w.bbox.y1-w.bbox.y0)/sc, x:dx+w.bbox.x0/sc, y:dy+(w.bbox.y0+w.bbox.y1)/2/sc, conf:w.confidence})).filter(c=>c.v!=null);
  if(!c.length) return [];
  const mh=Math.max(...c.map(x=>x.h)); return c.filter(x=>x.h>=mh*.75);
}
function bcCrop(src,r,enhance){
  const sc=Math.min(5, Math.max(1, 420/Math.max(1,r.y1-r.y0)));
  const cv=document.createElement('canvas'); cv.width=Math.round((r.x1-r.x0)*sc); cv.height=Math.round((r.y1-r.y0)*sc);
  const c=cv.getContext('2d'); c.imageSmoothingQuality='high'; c.drawImage(src,r.x0,r.y0,r.x1-r.x0,r.y1-r.y0,0,0,cv.width,cv.height);
  return {cv: enhance? bcCanvas(cv,true) : cv, sc: enhance? sc*Math.min(6,2000/Math.max(cv.width,cv.height)) : sc};
}
async function bcDigits(w,base,r,variants){ // digits-only re-reads of one region
  const out=[];
  for(const [enhance,psm] of variants){
    await w.setParameters({tessedit_char_whitelist:'0123456789.', tessedit_pageseg_mode:psm});
    const {cv,sc}=bcCrop(base,r,enhance);
    const {data}=await w.recognize(cv,{},{blocks:true,text:true});
    out.push({data,sc});
  }
  return out;
}
// history screens list several readings left→right: vote only in the right-most (latest) column 2+ reads agree on
function bcVote(cands,W){
  const tol=W*.07, cols=[];
  [...cands].sort((a,b)=>a.x-b.x).forEach(c=>{ const col=cols.find(g=>Math.abs(g.x-c.x)<=tol); col? col.m.push(c) : cols.push({x:c.x,m:[c]}); });
  if(!cols.length) return null;
  const solid=cols.filter(g=>g.m.length>=2);
  const pick= solid.length? solid[solid.length-1] : [...cols].sort((a,b)=>b.m.length-a.m.length)[0];
  const by={}; pick.m.forEach(v=>{ (by[v.v]=by[v.v]||{n:0,conf:0}); by[v.v].n++; by[v.v].conf=Math.max(by[v.v].conf,v.conf); });
  const ranked=Object.entries(by).sort((a,b)=>b[1].n-a[1].n||b[1].conf-a[1].conf);
  const lonelyRight=cols.some(g=>g.x>pick.x+tol); // an unconfirmed reading further right → not sure
  return {v:+ranked[0][0], sure: !lonelyRight && ranked[0][1].n>=2 && (ranked.length<2||ranked[1][1].n<ranked[0][1].n)};
}
async function bcPass1(w,src,enhance){
  const base=bcCanvas(src,enhance);
  await w.setParameters({tessedit_char_whitelist:'', tessedit_pageseg_mode:'3'});
  const {data}=await w.recognize(base,{},{blocks:true,text:true});
  const lines=bcLines(data);
  return {base,data,lines,lab:bcFindLabels(lines)};
}
async function bcReadImage(w,file,label){
  const img=await bcDecode(file);
  const res={w:null,smm:null,pbf:null,date:null,time:null,sure:{}};
  const n=p=>Object.keys(p.lab).length;
  bcPhase=`${label}…`;
  let p=await bcPass1(w,img,false), src=img;
  const ang=bcSkew(p.lines,p.base.width);
  if(Math.abs(ang)>.6&&Math.abs(ang)<25){ // straighten, then read again
    bcPhase=`${label} (straightening)…`; const r=bcRotate(img,-ang), q=await bcPass1(w,r,false); if(n(q)>=n(p)){ p=q; src=r; } }
  if(n(p)<3){ bcPhase=`${label} (enhancing)…`; const q=await bcPass1(w,src,true); if(n(q)>n(p)) p=q; }
  for(const deg of [90,-90]){ if(n(p)) break; // sideways photo
    const r=bcRotate(img,deg), q=await bcPass1(w,r,false); if(n(q)>n(p)) p=q; }
  const {base,lines,lab}=p, words=lines.flatMap(l=>l.words||[]);
  const tp=bcParse(p.data.text); res.date=tp.date; res.time=tp.time;
  const inR=(x,r)=>x.bbox.x0>=r.x0-2&&x.bbox.x1<=r.x1+2&&x.bbox.y0>=r.y0-2&&x.bbox.y1<=r.y1+2;
  const keys=Object.keys(lab).sort((a,b)=>lab[a].y0-lab[b].y0);
  for(let i=0;i<keys.length;i++){
    const k=keys[i], L=lab[k], lh=L.h;
    bcPhase=`${label} · ${BC_METRICS.find(m=>m.k===k).label.toLowerCase()}`;
    let got=null;
    // 1) value on the same line, right of the label (apps, printouts)
    const side={x0:Math.round(L.x1+lh*.4), x1:base.width, y0:Math.max(0,Math.round(L.y0-lh*.45)), y1:Math.min(base.height,Math.round(L.y1+lh*.45))};
    if(side.x1-side.x0>lh*1.5){
      const c=bcCands(words.filter(x=>inR(x,side)),k,60);
      for(const {data,sc} of await bcDigits(w,base,side,[[false,'7'],[true,'11']])) c.push(...bcCands(bcLines(data).flatMap(l=>l.words||[]),k,0,side.x0,sc,side.y0));
      if(c.length>=2) got=bcVote(c,base.width);
    }
    // 2) value under the label, down to the next label (InBody screens, history charts)
    if(!got){
      const r={x0:Math.max(0,Math.round(L.x0-lh)), y0:Math.round(L.y1), x1:base.width, y1:Math.min(base.height, Math.round(i<keys.length-1? lab[keys[i+1]].y0 : L.y1+lh*4))};
      if(r.y1-r.y0<lh*.8) continue;
      const c=bcCands(words.filter(x=>inR(x,r)),k,60);
      for(const {data,sc} of await bcDigits(w,base,r,[[false,'11'],[true,'11'],[false,'6'],[true,'7']])) c.push(...bcCands(bcLines(data).flatMap(l=>l.words||[]),k,0,r.x0,sc,r.y0));
      got=bcVote(c,base.width);
    }
    if(got){ res[k]=got.v; res.sure[k]=got.sure; }
  }
  // date line is often garbled by glare: re-read digits just above the latest time stamp
  if(!res.date){
    const tw=words.filter(x=>/^\d{1,2}[:.]\d{2}$/.test(x.text.trim())).sort((a,b)=>b.bbox.x0-a.bbox.x0)[0];
    if(tw){ const th=tw.bbox.y1-tw.bbox.y0;
      const r={x0:Math.max(0,Math.round(tw.bbox.x0-th*1.5)), x1:Math.min(base.width,Math.round(tw.bbox.x1+th*2.5)), y0:Math.max(0,Math.round(tw.bbox.y0-th*1.9)), y1:Math.round(tw.bbox.y0+th*.15)};
      for(const {data} of await bcDigits(w,base,r,[[false,'7'],[true,'7']])){
        const m=data.text.replace(/\s/g,'').match(/(\d{2})\.?(\d{2})\.?(\d{2})/); const d=m&&bcDate(m[1],m[2],m[3]);
        if(d){ res.date=d; if(!res.time) res.time=tw.text.trim().replace('.',':').padStart(5,'0'); break; } } }
  }
  await w.setParameters({tessedit_char_whitelist:'', tessedit_pageseg_mode:'3'});
  for(const k of ['w','smm','pbf']) if(res[k]==null&&tp[k]!=null){ res[k]=tp[k]; res.sure[k]=false; } // last-resort free-text parse
  // muscle can't be more than ~⅔ or less than ~⅕ of body weight — one of them is misread
  if(res.w!=null&&res.smm!=null&&(res.smm>res.w*.68||res.smm<res.w*.2)) res.sure.w=res.sure.smm=false;
  if(img.close) img.close();
  return res;
}
let bcStatusEl='#bcStatus';
function bcStatus(msg,kind){ const s=$(bcStatusEl); s.hidden=!msg; s.className='bc-status'+(kind?' '+kind:''); s.innerHTML=msg||''; }
function bcRenderRows(){
  const box=$('#bcResults'); box.innerHTML='';
  bcRows.forEach((r,i)=>{
    const d=el('div','bc-res');
    const f=(k,lab)=>`<label class="${r[k]==null?'miss':(r.sure&&!r.sure[k]?'check':'')}">${lab}<input type="number" inputmode="decimal" step="0.1" data-k="${k}" value="${r[k]??''}" placeholder="–"></label>`;
    if(r.blob&&!r.url) r.url=URL.createObjectURL(r.blob);
    d.innerHTML=`<div class="br-top">${r.url?`<button class="br-thumb" type="button" aria-label="View image"><img src="${r.url}" alt=""></button>`:''}<input type="date" data-k="date" value="${r.date}" aria-label="Scan date"><input type="time" data-k="time" value="${r.time||''}" aria-label="Scan time"><span class="br-src">${r.src}</span><button class="br-x" aria-label="Remove">×</button></div>
      <div class="bc-3">${f('w','Weight kg')}${f('smm','Muscle kg')}${f('pbf','Body fat %')}</div>`;
    d.querySelectorAll('input').forEach(inp=>inp.oninput=()=>{ const k=inp.dataset.k;
      r[k]= k==='date'? (inp.value||todayISO()) : k==='time'? (inp.value||null) : (isNaN(parseFloat(inp.value))?null:parseFloat(inp.value));
      if(k!=='date'&&k!=='time'){ inp.parentElement.classList.toggle('miss',r[k]==null); inp.parentElement.classList.remove('check'); } bcUpdateSave(); });
    d.querySelector('.br-x').onclick=()=>{ if(r.url) URL.revokeObjectURL(r.url); bcRows.splice(i,1); bcRenderRows(); };
    if(r.url) d.querySelector('.br-thumb').onclick=()=>bcShowImg(r.url);
    box.appendChild(d);
  });
  bcUpdateSave();
}
const bcValid=r=> r.w!=null||r.smm!=null||r.pbf!=null;
function bcUpdateSave(){ const n=bcRows.filter(bcValid).length; const b=$('#bcSave'); b.disabled=!n; b.textContent=n>1?`Save ${n} scans`:'Save'; }
function bcCommit(rows){
  const same=(a,b)=>a.date===b.date&&(a.time||'')===(b.time||'')&&a.w===b.w&&a.smm===b.smm&&a.pbf===b.pbf;
  const added=[]; // skip scans already saved, incl. two screenshots of the same result
  const blobs={};
  rows.filter(bcValid).forEach(r=>{ if(!DB.body.some(b=>same(b,r))&&!added.some(b=>same(b,r))){
    const a={id:bcId(),date:r.date,time:r.time||null,w:r.w,smm:r.smm,pbf:r.pbf,ts:Date.now(),hasImg:!!r.blob}; if(r.blob) blobs[a.id]=r.blob; added.push(a); } });
  if(added.length) bcChartEnd=0;
  added.forEach(a=>{ if(blobs[a.id]) bcImgDB.put(a.id,blobs[a.id]).catch(()=>{ a.hasImg=false; save(); }); });
  DB.body.push(...added); save(); closeBodyScan(); renderProgress();
  if(added.length) toast(added.length>1?`${added.length} scans added`:'Scan added',()=>{ added.forEach(a=>{ DB.body.splice(DB.body.indexOf(a),1); bcImgDB.del(a.id).catch(()=>{}); bcDropURL(a.id); }); save(); renderProgress(); });
  else toast('Already saved');
}
// date/time you pick wins; untouched picker lets a date/time printed on the screenshot be used instead
function bcWhen(p){
  const d=$('#bcWhenD').value||todayISO(), t=$('#bcWhenT').value||null;
  if(bcWhenTouched||!p.date) return {date:d, time:t};
  return {date:p.date, time:p.time||null};
}
$('#bcWhenD').oninput=$('#bcWhenT').oninput=()=>{ bcWhenTouched=true; };
function openBodyScan(){
  $('#bcWhenD').value=todayISO(); $('#bcWhenT').value=bcNowTime(); bcWhenTouched=false;
  bcStatusEl='#bcStatus'; bcRows=[]; bcRenderRows(); bcStatus(''); $('#bcFile').value='';
  $('#bcScrim').classList.add('show'); $('#bcModal').classList.add('show');
  bcGetWorker().catch(()=>{}); // warm up OCR in the background
}
function closeBodyScan(){ $('#bcScrim').classList.remove('show'); $('#bcModal').classList.remove('show'); bcRows.forEach(r=>{ if(r.url) URL.revokeObjectURL(r.url); r.url=null; }); }
$('#bcScrim').onclick=closeBodyScan; $('#bcClose').onclick=closeBodyScan; $('#bcCancel').onclick=closeBodyScan;
$('#bcManual').onclick=()=>{ bcRows.push({date:$('#bcWhenD').value||todayISO(),time:$('#bcWhenT').value||null,w:null,smm:null,pbf:null,src:'Manual'}); bcRenderRows(); };
$('#bcSave').onclick=()=>bcCommit(bcRows);
$('#bcFile').onchange=async e=>{
  const files=[...e.target.files]; e.target.value=''; if(!files.length) return;
  const up=$('#bcUpload'); up.classList.add('busy');
  const fresh=[], unreadable=[];
  let w;
  try{ bcPhase='x'; bcStatus('<i class="spin"></i>Loading scanner…'); w=await bcGetWorker(); }
  catch(err){ bcPhase=''; up.classList.remove('busy'); bcStatus('Could not load the scanner (needs internet the first time). Check your connection and try again, or enter the numbers manually.','bad'); return; }
  for(let i=0;i<files.length;i++){
    const label=`Reading ${files.length>1?`image ${i+1} of ${files.length}`:'image'}`;
    bcStatus(`<i class="spin"></i>${label}…`);
    const blob=await bcShrink(files[i]).catch(()=>null);
    try{ const p=await bcReadImage(w,files[i],label), when=bcWhen(p); bcPlausible(p,when.date);
      fresh.push({...when, w:p.w, smm:p.smm, pbf:p.pbf, sure:p.sure, blob, src:`Image ${bcRows.length+fresh.length+1}`}); }
    catch(err){ unreadable.push(files[i].name||`image ${i+1}`);
      fresh.push({...bcWhen({}), w:null, smm:null, pbf:null, blob, src:`Image ${bcRows.length+fresh.length+1}`}); }
  }
  bcPhase=''; up.classList.remove('busy');
  bcRows.push(...fresh);
  // auto-save only when every value was confirmed by both reads; otherwise let you check first
  const complete=bcRows.length&&bcRows.every(r=>['w','smm','pbf'].every(k=>r[k]!=null&&r.sure&&r.sure[k]));
  if(complete){ bcCommit(bcRows); return; }
  bcRenderRows();
  const none=fresh.every(r=>!bcValid(r));
  if(unreadable.length===files.length) bcStatus('This image format can’t be opened here (e.g. HEIC). Upload a screenshot or JPG/PNG instead — or type the numbers below.','bad');
  else if(none) bcStatus('Couldn’t find the numbers. Use a sharp, straight-on photo of the results screen (avoid glare) — or type them below and tap Save.','bad');
  else bcStatus('Please check against your screenshot: amber = unsure, red = not found. Correct if needed, then tap Save.','warn');
};

/* ---------- EDIT A SAVED SCAN: image (view / replace / re-read / remove), numbers, date ---------- */
let be=null; // {r, blob: new image | null, url, removed}
const beInputs=()=>[...document.querySelectorAll('#beModal .be-vals input')];
async function openScanEditor(id){
  const r=DB.body.find(x=>x.id===id); if(!r) return;
  be={r, blob:null, url:null, removed:false};
  bcStatusEl='#beStatus'; bcStatus('');
  $('#beTitle').textContent=`Scan · ${fmtShort(r.date)}`;
  $('#beDate').value=r.date; $('#beTime').value=r.time||''; $('#beDate').classList.remove('check'); $('#beTime').classList.remove('check');
  beInputs().forEach(inp=>{ inp.value=r[inp.dataset.k]??''; inp.parentElement.className=''; });
  beUpdate(); await beRenderImg();
  document.querySelectorAll('.bc-col').forEach(g=>g.classList.toggle('sel',g.dataset.id===id));
  $('#beScrim').classList.add('show'); $('#beModal').classList.add('show');
}
function closeScanEditor(){
  $('#beScrim').classList.remove('show'); $('#beModal').classList.remove('show');
  document.querySelectorAll('.bc-col.sel').forEach(g=>g.classList.remove('sel'));
  if(be&&be.url) URL.revokeObjectURL(be.url); be=null; bcStatusEl='#bcStatus';
}
async function beRenderImg(){
  const box=$('#beImg');
  const url= be.blob? (be.url||(be.url=URL.createObjectURL(be.blob))) : (!be.removed&&be.r.hasImg)? await bcImgURL(be.r.id) : null;
  if(!url){
    box.className='';
    box.innerHTML=`<label class="bc-upload be-up" for="beFile"><span class="bu-ic">${I.upload}</span><b>${be.r.hasImg&&!be.removed?'Image not found — attach it again':'Attach the screenshot'}</b><span>It’s kept with this scan, and its numbers are read so you can compare.</span></label>`;
    return;
  }
  box.className='be-img';
  box.innerHTML=`<img src="${url}" alt="Screenshot of this scan"><div class="be-tools"><label for="beFile">${I.upload}Replace</label><button type="button" class="rr">${I.redo}Re-read</button><button type="button" class="rm">${I.trash}Remove</button></div>`;
  box.querySelector('img').onclick=()=>bcShowImg(url);
  box.querySelector('.rr').onclick=async()=>{ const b=be.blob||await bcImgDB.get(be.r.id).catch(()=>null); if(b) beRead(b); };
  box.querySelector('.rm').onclick=()=>{ if(be.url) URL.revokeObjectURL(be.url); be.blob=null; be.url=null; be.removed=true; beRenderImg(); bcStatus('The image will be removed when you save.','warn'); };
}
// read numbers from the image and fill in anything that differs (amber) so you can compare before saving
async function beRead(file){
  const cur=be, box=$('#beImg'); box.classList.add('busy');
  let p;
  try{ bcPhase='x'; bcStatus('<i class="spin"></i>Loading scanner…'); const w=await bcGetWorker(); p=await bcReadImage(w,file,'Reading image'); }
  catch(e){ p=null; }
  bcPhase=''; if(be!==cur) return; box.classList.remove('busy');
  if(!p){ bcStatus('Couldn’t read this image. You can still type the numbers.','bad'); return; }
  const changed=[];
  beInputs().forEach(inp=>{ const k=inp.dataset.k; if(p[k]==null) return;
    if(p[k]!==parseFloat(inp.value)){ inp.value=p[k]; inp.parentElement.className='check'; changed.push(k); } });
  if(p.date&&p.date!==$('#beDate').value){ $('#beDate').value=p.date; $('#beDate').classList.add('check'); changed.push('date'); }
  if(p.date&&p.time&&p.time!==$('#beTime').value){ $('#beTime').value=p.time; $('#beTime').classList.add('check'); changed.push('time'); }
  beUpdate();
  const found=['w','smm','pbf'].filter(k=>p[k]!=null).length;
  if(!found) bcStatus('No numbers found in this image — values left unchanged.','bad');
  else if(changed.length) bcStatus(`Updated ${changed.length} field${changed.length>1?'s':''} from the image (amber). Check against the image, then Save.`,'warn');
  else bcStatus('The image matches the saved numbers.','good');
}
function beVals(){ const v={}; beInputs().forEach(inp=>{ const n=parseFloat(inp.value); v[inp.dataset.k]=isNaN(n)?null:Math.round(n*10)/10; }); return v; }
function beUpdate(){ const v=beVals(); beInputs().forEach(inp=>inp.parentElement.classList.toggle('miss',v[inp.dataset.k]==null));
  $('#beSave').disabled= !$('#beDate').value || ['w','smm','pbf'].every(k=>v[k]==null); }
beInputs().forEach(inp=>inp.oninput=()=>{ inp.parentElement.classList.remove('check'); beUpdate(); });
$('#beDate').oninput=$('#beTime').oninput=e=>{ e.target.classList.remove('check'); beUpdate(); };
$('#beFile').onchange=async e=>{ const f=e.target.files[0]; e.target.value=''; if(!f||!be) return;
  const blob=await bcShrink(f).catch(()=>null);
  if(!blob){ bcStatus('This image format can’t be opened here (e.g. HEIC). Use a screenshot, JPG or PNG.','bad'); return; }
  if(be.url) URL.revokeObjectURL(be.url); be.blob=blob; be.url=null; be.removed=false;
  await beRenderImg(); beRead(f);
};
$('#beSave').onclick=async()=>{
  if(!be) return; const r=be.r, v=beVals(), imgChanged=!!be.blob||be.removed;
  const prev={date:r.date,time:r.time,w:r.w,smm:r.smm,pbf:r.pbf,hasImg:!!r.hasImg};
  const prevBlob= imgChanged&&r.hasImg? await bcImgDB.get(r.id).catch(()=>null) : null;
  Object.assign(r,{date:$('#beDate').value, time:$('#beTime').value||null, ...v});
  if(be.blob){ try{ await bcImgDB.put(r.id,be.blob); r.hasImg=true; }catch(e){ toast('Couldn’t store the image on this device'); } }
  else if(be.removed){ await bcImgDB.del(r.id).catch(()=>{}); r.hasImg=false; }
  if(imgChanged) bcDropURL(r.id);
  save(); closeScanEditor(); renderProgress();
  toast('Scan updated',async()=>{
    Object.assign(r,prev);
    if(imgChanged){ if(prevBlob) await bcImgDB.put(r.id,prevBlob).catch(()=>{}); else await bcImgDB.del(r.id).catch(()=>{}); bcDropURL(r.id); }
    save(); renderProgress(); });
};
$('#beDelete').onclick=()=>{ if(be) bcDeleteScan(be.r,closeScanEditor); };
$('#beScrim').onclick=closeScanEditor; $('#beClose').onclick=closeScanEditor; $('#beCancel').onclick=closeScanEditor;
document.addEventListener('keydown',e=>{ if(e.key!=='Escape') return;
  if($('#bcLb').classList.contains('show')) bcHideImg(); else if($('#beModal').classList.contains('show')&&!$('#cfModal').classList.contains('show')) closeScanEditor(); });

/* ============================================================
   RENDER: GOALS
   ============================================================ */
function renderGoals(){
  const v=$('#view-goals'); v.innerHTML='';
  v.appendChild(profileSection());
  v.appendChild(el('div','section-head','<span class="eyebrow">Training goals</span>'));

  // weekly sessions goal
  const wk=weekHistory().length;
  const g1=el('div','goalcard');
  g1.innerHTML=`
    <div class="gh"><div class="gi accent">${I.cal}</div><b>Weekly sessions</b></div>
    <div class="stepper"><div class="sv">${DB.goals.weekly}<small> / week</small></div>
      <div class="ctrls"><button class="step-btn" data-g="weekly" data-d="-1">−</button><button class="step-btn" data-g="weekly" data-d="1">+</button></div></div>
    <div class="pbar"><i style="width:${Math.min(100,wk/DB.goals.weekly*100)}%"></i></div>
    <div class="pcap">${wk}/${DB.goals.weekly} done this week</div>`;
  v.appendChild(g1);

  // training-days schedule (drives missed vs rest in the calendar)
  const td=el('div','goalcard');
  td.innerHTML=`<div class="gh"><div class="gi accent">${I.cal}</div><b>Training days</b></div>
    <p class="td-hint">Pick your workout days. The calendar marks these <b>red if missed</b>, and other days grey (rest / not scheduled).</p>`;
  const tdRow=el('div','td-row');
  ['S','M','T','W','T','F','S'].forEach((lab,idx)=>{
    const on=(DB.goals.trainDays||[]).includes(idx);
    const b=el('button','td-day'+(on?' on':''),lab);
    b.setAttribute('aria-pressed',on);
    b.onclick=()=>{ const set=new Set(DB.goals.trainDays||[]); set.has(idx)?set.delete(idx):set.add(idx); DB.goals.trainDays=[...set].sort((a,b)=>a-b); save(); renderGoals(); renderToday(); };
    tdRow.appendChild(b);
  });
  td.appendChild(tdRow);
  v.appendChild(td);

  // bodyweight goal
  const bw=DB.goals; const lost=Math.max(0,bw.bwCurrent-bw.bwTarget);
  const totalToLose=Math.max(.1,bw.bwCurrent-bw.bwTarget);
  const g2=el('div','goalcard');
  g2.innerHTML=`
    <div class="gh"><div class="gi teal">${I.scale}</div><b>Bodyweight target</b></div>
    <div class="stepper"><div class="sv">${bw.bwTarget}<small> kg goal</small></div>
      <div class="ctrls"><button class="step-btn" data-g="bwTarget" data-d="-1">−</button><button class="step-btn" data-g="bwTarget" data-d="1">+</button></div></div>
    <div style="display:flex;align-items:center;gap:10px;margin-top:14px">
      <span class="pcap" style="margin:0">Current</span>
      <button class="step-btn" data-g="bwCurrent" data-d="-1" style="width:34px;height:34px;font-size:18px">−</button>
      <b class="mono" style="font-size:17px;min-width:52px;text-align:center">${bw.bwCurrent} kg</b>
      <button class="step-btn" data-g="bwCurrent" data-d="1" style="width:34px;height:34px;font-size:18px">+</button>
    </div>
    <div class="pcap" style="margin-top:12px">${bw.bwCurrent>bw.bwTarget?`${(bw.bwCurrent-bw.bwTarget).toFixed(0)} kg to reach goal`:bw.bwCurrent<bw.bwTarget?`${(bw.bwTarget-bw.bwCurrent).toFixed(0)} kg to gain`:'Goal reached! 🎯'}</div>`;
  v.appendChild(g2);

  v.querySelectorAll('.step-btn').forEach(b=>{
    b.onclick=()=>{
      const k=b.dataset.g, d=+b.dataset.d;
      if(k==='weekly') DB.goals.weekly=Math.max(1,Math.min(7,DB.goals.weekly+d));
      else DB.goals[k]=Math.max(30,DB.goals[k]+d);
      save(); renderGoals(); renderToday();
    };
  });

  // progressive-overload suggestions
  const pr=personalRecords();
  const strengthLifts=[];
  PROGRAM.filter(s=>s.type==='strength').forEach(s=> s.ex.forEach(ex=>strengthLifts.push(ex.name)));
  const withData=strengthLifts.filter(n=>pr[n]);
  v.appendChild(el('div','section-head','<span class="eyebrow">Next-lift suggestions</span>'));
  if(!withData.length){
    v.appendChild(el('div','help-note',`${I.info}<p><b>Log a few strength sessions</b> with weights and this panel will suggest your next targets — small progressive-overload steps based on your best set for each lift.</p>`));
  }else{
    const box=el('div','suggest');
    withData.sort((a,b)=>pr[b].kg-pr[a].kg).slice(0,8).forEach(name=>{
      const cur=pr[name];
      // progressive overload: if reps hit target-ish, +2.5kg; else +1 rep
      const next = cur.reps>=8 ? {kg:cur.kg+2.5, reps:6, mode:'+2.5 kg'} : {kg:cur.kg, reps:cur.reps+1, mode:'+1 rep'};
      const r=el('div','sr');
      r.innerHTML=`<div class="sn"><b>${name}</b><span>now ${cur.kg}kg × ${cur.reps}</span></div>
        <div class="arrow">${I.up} ${next.mode}</div>`;
      box.appendChild(r);
    });
    v.appendChild(box);
  }

  // ---- data management ----
  v.appendChild(el('div','section-head','<span class="eyebrow">Your data</span>'));
  const dc=el('div','data-card');
  const draftCount=Object.keys(DB.drafts).length;
  const rows=[];
  if(draftCount) rows.push({icon:I.rest, cls:'', t:`Clear in-progress (${draftCount})`, s:'Reset sessions you started but didn\'t log', fn:()=>{
    confirmAction('Clear in-progress sessions?', 'Removes ticks/entries in sessions you haven\'t logged yet. Saved history stays.', 'Clear', ()=>{ DB.drafts={}; save(); renderAll(); toast('In-progress cleared'); }); }});
  rows.push({icon:I.trash, cls:'', t:`Clear all history (${DB.history.length})`, s:'Delete every logged session', fn:()=>{
    if(!DB.history.length){ toast('No history yet'); return; }
    confirmAction('Clear all history?', `All ${DB.history.length} logged session(s) will be permanently deleted. This can't be undone.`, 'Delete all', ()=>{ DB.history=[]; save(); renderAll(); toast('History cleared'); }); }});
  rows.push({icon:I.bolt, cls:'danger', t:'Reset everything', s:'History, drafts & goals back to defaults', fn:()=>{
    confirmAction('Reset the whole app?', 'Deletes all history, assessments and in-progress sessions and restores default goals. This can\'t be undone.', 'Reset all', ()=>{ DB.history=[]; DB.drafts={}; DB.assess=[]; DB.gateManual={}; DB.goals={weekly:4,bwCurrent:72,bwTarget:68,trainDays:[1,2,4,5]}; save(); renderAll(); toast('App reset'); }); }});
  rows.forEach(r=>{
    const b=el('button','data-row'+(r.cls?' '+r.cls:''));
    b.innerHTML=`<div class="di">${r.icon}</div><div class="dt"><b>${r.t}</b><span>${r.s}</span></div>`;
    b.onclick=r.fn; dc.appendChild(b);
  });
  v.appendChild(dc);
}

/* ============================================================
   SESSION SHEET (logging)
   ============================================================ */
let activeSession=null, sheetState=null, sheetPast=[], sheetHistIdx=-1;
function fmtEntry(sets){ return sets.map(x=> x.sec?`${x.sec}s` : x.kg?`${x.reps}×${x.kg}kg` : x.reps?`${x.reps} reps`:'✓').join(', '); }
function parseSets(target){ const m=target.match(/^(\d+)\s*[×x]/); return m?Math.min(6,+m[1]):1; }

function openSession(sid){
  const s=byId(sid); if(!s) return;
  activeSession=s; clearTimers();
  const last=lastEntry(sid);
  const isStrength = s.type==='strength';
  sheetState = s.ex.map(ex=>{
    const timed = !!ex.sec;
    const nSets = ex.setN || parseSets(ex.target);
    const prev = last && last.sets[ex.name] ? last.sets[ex.name] : null;
    // per-exercise mode: timed hold → countdown; loaded/strength → reps×kg; otherwise → tick
    const mode = timed ? 'timed' : (isStrength || ex.log) ? 'log' : 'tick';
    const st = { name:ex.name, target:ex.target, nSets, done:false, prev, mode, src:ex.src||null, rec:ex.rec||null, note:ex.note||null, ss:ex.ss||null, range:ex.range||null,
                 sec:ex.sec||null, timed, rest:ex.rest||s.rest||null, vid:ex.vid||null,
                 hist: DB.history.filter(h=>h.sets[ex.name]).sort((a,b)=>b.ts-a.ts).map(h=>({date:h.date, sets:h.sets[ex.name]})), hIdx:0 };
    if(mode==='log') st.sets = Array.from({length:nSets},()=>({reps:'',kg:''}));
    else if(mode==='timed') st.sets = Array.from({length:nSets},()=>({done:false}));
    else st.sets = null;
    return st;
  });
  // restore in-progress draft (auto-saved work)
  const d = DB.drafts[sid];
  if(d && d.ex){
    d.ex.forEach(de=>{
      const st=sheetState.find(x=>x.name===de.name); if(!st) return;
      st.done=!!de.done;
      if(st.sets && de.sets) de.sets.forEach((sv,i)=>{ if(!st.sets[i]) return;
        if(st.timed) st.sets[i].done=!!sv.done; else { st.sets[i].reps=sv.reps||''; st.sets[i].kg=sv.kg||''; } });
    });
  }
  sheetPast = DB.history.filter(h=>h.sid===sid).sort((a,b)=>b.ts-a.ts);
  sheetHistIdx = -1;
  $('#sheetKick').textContent = (TYPE_LABEL[s.type]||'Session')+' · '+s.code;
  $('#sheetTitle').textContent = s.short;
  renderSheetBody();
  $('#scrim').classList.add('show'); $('#sheet').classList.add('show');
  document.body.style.overflow='hidden';
}
function hasProgress(){
  if(!sheetState) return false;
  return sheetState.some(st=> st.done || (st.sets&&st.sets.some(s=> st.timed? s.done : (s.reps||s.kg))));
}
function saveDraft(){
  if(!activeSession||!sheetState) return;
  if(!hasProgress()){ delete DB.drafts[activeSession.id]; save(); return; }
  DB.drafts[activeSession.id] = { date:todayISO(), ts:Date.now(),
    ex: sheetState.map(st=>({ name:st.name, done:st.done,
      sets: st.sets ? st.sets.map(s=> st.timed ? {done:s.done} : {reps:s.reps,kg:s.kg}) : null })) };
  save();
}
function discardDraft(){
  if(!activeSession) return;
  const sid=activeSession.id;
  delete DB.drafts[sid]; save(); closeSheet(); renderAll();
  toast('Progress discarded');
}
function closeSheet(){
  saveDraft(); clearTimers();
  $('#scrim').classList.remove('show'); $('#sheet').classList.remove('show');
  document.body.style.overflow=''; activeSession=null; sheetState=null;
  renderTrain(); renderToday();
}
$('#scrim').onclick=closeSheet;
$('#sheetClose').onclick=closeSheet;
document.addEventListener('keydown',e=>{ if(e.key==='Escape'&&activeSession) closeSheet(); });

function updateNav(){
  const nav=$('#shNav'); if(!nav) return;
  nav.style.display = sheetPast.length ? 'flex' : 'none';
  const back=$('#navBack'), fwd=$('#navFwd'), label=$('#navLabel');
  back.disabled = sheetHistIdx >= sheetPast.length-1;
  fwd.disabled = sheetHistIdx <= -1;
  if(sheetHistIdx===-1){ label.textContent = sheetPast.length ? 'Today · logging' : 'Today'; label.classList.remove('past'); }
  else { const d=new Date(sheetPast[sheetHistIdx].date+'T00:00'); label.textContent=`${DOW[d.getDay()]} ${d.getDate()} ${MO[d.getMonth()]} ${d.getFullYear()}`; label.classList.add('past'); }
  const past = sheetHistIdx>=0;
  $('#discardBtn').style.display = past?'none':'grid';
  $('#finishBtn').style.display = past?'none':'flex';
  $('#pastFoot').style.display = past?'flex':'none';
}
function renderPastView(body){
  const rec=sheetPast[sheetHistIdx]; const d=new Date(rec.date+'T00:00');
  const banner=el('div','past-banner');
  banner.innerHTML=`${I.clock}<span>Logged <b>${DOW[d.getDay()]}, ${d.getDate()} ${MO[d.getMonth()]} ${d.getFullYear()}</b> · read-only. Tap ▶ to return to today.</span>`;
  body.appendChild(banner);
  activeSession.ex.forEach(ex=>{
    const arr=rec.sets[ex.name];
    const card=el('div','exercise'+(arr?' done':' skipped'));
    let inner=`<div class="ex-head"><div class="eh"><b>${ex.name}</b><span>${arr?'Logged':'Not logged this day'}</span></div></div>`;
    if(arr){
      inner+='<div class="past-sets">'+arr.map((x,i)=>{
        const val = x.sec?`${x.sec}s` : x.kg?`${x.reps} × ${x.kg}kg` : x.reps?`${x.reps} reps`:'done';
        return `<div class="past-set"><span class="ps-n">${arr.length>1?'Set '+(i+1):'Done'}</span><span class="ps-v">${val}</span></div>`;
      }).join('')+'</div>';
    }
    card.innerHTML=inner; body.appendChild(card);
  });
  $('#sheetBar').style.width='100%'; $('#sheetPt').textContent='logged';
}
function renderSheetBody(){
  const body=$('#sheetBody'); body.innerHTML=''; clearSetTimers();
  updateNav();
  if(sheetHistIdx>=0){ renderPastView(body); return; }
  const isStrength = activeSession.type==='strength';
  if(activeSession.circuit){
    body.appendChild(el('div','circuit-note',`${I.rest}<span>Circuit · ${activeSession.circuit}. Run the timed moves each round.</span>`));
  }
  if(activeSession.phase && activeSession.phase!=='mgmt' && activeSession.phase!=='prep'){
    body.appendChild(el('div','rehab-note',`${I.info}<span>Rehab rule: pain ≤ 3/10 during, and back to baseline by next morning. If the knee swells or pain lingers, drop back a level and tell your physio.</span>`));
  }
  if(sheetState.some(x=>x.mode==='log')){
    body.appendChild(el('div','log-hint',`${I.info}<span>Enter your <b>reps × weight</b> for each set below — it saves to your history and drives your progress &amp; goals.</span>`));
  }
  sheetState.forEach((st,ei)=>{
    const ex=el('div','exercise'+(st.done?' done':'')); ex.dataset.ex=ei;
    const head=el('div','ex-head');
    head.innerHTML=`
      <button class="ex-check" aria-label="Mark ${st.name} complete">${I.check}</button>
      <div class="eh"><b>${st.name}</b><span>Target ${st.target}${st.ss?' · to failure':''}</span>${st.ss?`<span class="ss-tag">Superset ${st.ss}</span>`:''}${srcBadge(st.src, st.rec)}${hdNextTarget(st)?`<span class="ex-next">${hdNextTarget(st)}</span>`:''}${st.note?`<em class="ex-cue">${st.note}</em>`:''}</div>`;
    head.querySelector('.ex-check').onclick=()=>{ st.done=!st.done; if(st.timed&&st.sets) st.sets.forEach(s=>s.done=st.done); renderSheetBody(); saveDraft(); };
    ex.appendChild(head);
    // per-exercise history: ◀ ▶ through past values for THIS exercise
    if(st.hist && st.hist.length){
      const hb=el('div','ex-hist');
      hb.innerHTML=`<button class="eh-nav eh-prev" aria-label="Older">${I.chevL}</button><span class="eh-label"></span><button class="eh-nav eh-next" aria-label="Newer">${I.chev}</button>`;
      const paint=()=>{ const e=st.hist[st.hIdx]; const d=new Date(e.date+'T00:00');
        hb.querySelector('.eh-label').innerHTML=`<b>${st.hIdx===0?'Last time':DOW[d.getDay()]+' '+d.getDate()+' '+MO[d.getMonth()]}</b> · ${fmtEntry(e.sets)}`;
        hb.querySelector('.eh-prev').disabled=st.hIdx>=st.hist.length-1;
        hb.querySelector('.eh-next').disabled=st.hIdx<=0; };
      hb.querySelector('.eh-prev').onclick=()=>{ if(st.hIdx<st.hist.length-1){ st.hIdx++; paint(); } };
      hb.querySelector('.eh-next').onclick=()=>{ if(st.hIdx>0){ st.hIdx--; paint(); } };
      paint(); ex.appendChild(hb);
    }
    ex.appendChild(videoBlock(st.name, st.vid));

    if(st.mode==='log'){
      const sets=el('div','sets');
      // cascade a value down to following sets that are empty or still auto-filled
      const cascade=(field,si)=>{
        const autoKey = field==='reps'?'rAuto':'kAuto';
        const val = st.sets[si][field];
        const lines = sets.querySelectorAll('.set-line');
        for(let j=si+1;j<st.sets.length;j++){
          if(st.sets[j][autoKey] || st.sets[j][field]===''){
            st.sets[j][field]=val; st.sets[j][autoKey]=true;
            const inp=lines[j] && lines[j].querySelectorAll('input')[field==='reps'?0:1];
            if(inp) inp.value=val;
          }
        }
      };
      st.sets.forEach((set,si)=>{
        const line=el('div','set-line');
        line.innerHTML=`
          <div class="sl">Set ${si+1}</div>
          <div class="field"><input inputmode="numeric" pattern="[0-9]*" placeholder="${st.prev&&st.prev[si]&&st.prev[si].reps?st.prev[si].reps:'–'}" value="${set.reps}" aria-label="Reps set ${si+1}"><span class="unit">reps</span></div>
          <span class="x">×</span>
          <div class="field"><input inputmode="decimal" placeholder="${st.prev&&st.prev[si]&&st.prev[si].kg?st.prev[si].kg:'–'}" value="${set.kg}" aria-label="Weight kg set ${si+1}"><span class="unit">kg</span></div>
          <button class="set-rm" aria-label="Remove set ${si+1}" ${st.sets.length<=1?'disabled':''}>${I.minus}</button>`;
        const [ri,ki]=line.querySelectorAll('input');
        ri.oninput=e=>{ set.reps=e.target.value.replace(/[^0-9]/g,''); e.target.value=set.reps; set.rAuto=false; cascade('reps',si); updateSheetProgress(); saveDraft(); };
        ki.oninput=e=>{ set.kg=e.target.value.replace(/[^0-9.]/g,''); e.target.value=set.kg; set.kAuto=false; cascade('kg',si); updateSheetProgress(); saveDraft(); };
        line.querySelector('.set-rm').onclick=()=>{ if(st.sets.length>1){ st.sets.splice(si,1); renderSheetBody(); saveDraft(); } };
        sets.appendChild(line);
      });
      const addBtn=el('button','add-set',`${I.plus} Add set`);
      addBtn.onclick=()=>{ st.sets.push({reps:'',kg:''}); renderSheetBody(); saveDraft(); };
      sets.appendChild(addBtn);
      const foot=el('div','set-foot');
      if(st.prev){
        const cp=el('button','copy-prev',`${I.copy} Fill from last`);
        cp.onclick=()=>{ st.sets.forEach((s,i)=>{ if(st.prev[i]){ s.reps=st.prev[i].reps||''; s.kg=st.prev[i].kg||''; } }); renderSheetBody(); saveDraft(); };
        foot.appendChild(cp);
      }
      if(st.rest){
        const rc=el('button','rest-chip',`${I.clock} Rest ${st.rest}s`);
        rc.onclick=()=>startRest(st.rest);
        foot.appendChild(rc);
      }
      if(foot.childNodes.length) sets.appendChild(foot);
      ex.appendChild(sets);
    } else if(st.timed){
      const sets=el('div','sets timed');
      st.sets.forEach((set,si)=>{
        const row=el('div','timer-set'+(set.done?' done':'')); row.dataset.set=si;
        row.innerHTML=`
          <div class="sl">${st.nSets>1?'Set '+(si+1):'Hold'}</div>
          <button class="tbtn" aria-label="Start ${st.sec} second timer for ${st.name}">
            <span class="tico">${set.done?I.check:I.play}</span><span class="tt">${set.done?'Done':fmt(st.sec)}</span>
          </button>
          <div class="tbar"><i style="width:${set.done?100:0}%"></i></div>
          <button class="set-rm timed-rm" aria-label="Remove set ${si+1}" ${st.sets.length<=1?'disabled':''}>${I.minus}</button>`;
        sets.appendChild(row);
      });
      const tAdd=el('button','add-set',`${I.plus} Add set`);
      tAdd.onclick=()=>{ st.sets.push({done:false}); renderSheetBody(); saveDraft(); };
      sets.appendChild(tAdd);
      ex.appendChild(sets);
    } else {
      const note=el('div','ex-note');
      note.innerHTML=`Perform <b>${st.target}</b>, then tick <span class="tickword">✓</span> when done. Tap ▶ for the form video.`;
      ex.appendChild(note);
    }
    body.appendChild(ex);
    const nx=sheetState[ei+1];
    if(st.ss && nx && nx.ss===st.ss) body.appendChild(el('div','ss-link',`<span>↓</span> Superset — go straight into the next exercise, no rest`));
  });
  registerSetTimers();
  updateSheetProgress();
}
function updateSheetProgress(){
  let done=0, total=sheetState.length;
  sheetState.forEach(st=>{
    let c=false;
    if(st.mode==='log') c = st.done || (st.sets&&st.sets.some(s=>s.reps||s.kg));
    else if(st.timed) c = st.done || (st.sets&&st.sets.some(s=>s.done));
    else c = st.done;
    if(c) done++;
  });
  const pct=Math.round(done/total*100);
  $('#sheetBar').style.width=pct+'%';
  $('#sheetPt').textContent=`${done}/${total}`;
  $('#finishBtn').disabled = done===0;
  $('#finishTxt').textContent = done===total?'Complete & log':'Log workout';
}
$('#finishBtn').onclick=()=>{
  if(!activeSession) return;
  const sets={};
  sheetState.forEach(st=>{
    if(st.mode==='log'){
      const rows=st.sets.map(s=>({reps:s.reps?+s.reps:0,kg:s.kg?+s.kg:0})).filter(s=>s.reps||s.kg);
      if(rows.length) sets[st.name]=rows; else if(st.done) sets[st.name]=[{reps:0,kg:0}];
    } else if(st.timed){
      const d=st.sets.filter(s=>s.done).length;
      if(d) sets[st.name]=Array.from({length:d},()=>({reps:0,kg:0,sec:st.sec}));
      else if(st.done) sets[st.name]=[{reps:0,kg:0,sec:st.sec}];
    } else {
      if(st.done) sets[st.name]=[{reps:0,kg:0}];
    }
  });
  if(!Object.keys(sets).length){ toast('Log at least one exercise first'); return; }
  const rec={ id:'r'+Date.now(), sid:activeSession.id, date:todayISO(), ts:Date.now(), sets };
  rec.volume=vol(rec);
  DB.history.push(rec); delete DB.drafts[activeSession.id];
  sheetState=null; // prevent closeSheet from re-saving a draft
  save();
  const nm=byId(rec.sid).short;
  closeSheet(); renderAll();
  toast(`${nm} saved 💪`, ()=>{ const i=DB.history.findIndex(h=>h.id===rec.id); if(i>-1)DB.history.splice(i,1); save(); renderAll(); });
};

/* ---------- TIMER ENGINE ---------- */
let setTimerIntervals=[], restInterval=null, restRem=0, restTotal=0, audioCtx=null;
function fmt(s){ s=Math.max(0,Math.round(s)); return Math.floor(s/60)+':'+String(s%60).padStart(2,'0'); }
function clearSetTimers(){ setTimerIntervals.forEach(clearInterval); setTimerIntervals=[]; }
function clearTimers(){ clearSetTimers(); if(restInterval){clearInterval(restInterval);restInterval=null;} hideRest(); }
function ensureAudio(){ try{ audioCtx=audioCtx||new (window.AudioContext||window.webkitAudioContext)(); if(audioCtx.state==='suspended')audioCtx.resume(); }catch(e){} }
function tone(freq,dur,vol,at){ ensureAudio(); if(!audioCtx) return;
  try{ const t=(at||audioCtx.currentTime); const o=audioCtx.createOscillator(),g=audioCtx.createGain();
    o.type='sine'; o.frequency.value=freq; o.connect(g); g.connect(audioCtx.destination);
    g.gain.setValueAtTime(.0001,t); g.gain.exponentialRampToValueAtTime(vol,t+.02);
    g.gain.exponentialRampToValueAtTime(.0001,t+dur); o.start(t); o.stop(t+dur+.03);
  }catch(e){}
}
function tick(){ tone(680,.09,.16); if(navigator.vibrate) try{navigator.vibrate(30);}catch(e){} }
function alarm(){ ensureAudio(); if(!audioCtx) return;
  const t0=audioCtx.currentTime; const seq=[880,1047,1319,1047,1319];
  seq.forEach((f,i)=>tone(f,.16,.34,t0+i*.19));
  if(navigator.vibrate) try{ navigator.vibrate([180,90,180,90,260]); }catch(e){}
}
const beep=alarm; // legacy alias
function registerSetTimers(){
  document.querySelectorAll('#sheetBody .exercise').forEach(exEl=>{
    const ei=+exEl.dataset.ex, st=sheetState[ei]; if(!st||!st.timed) return;
    exEl.querySelectorAll('.timer-set').forEach(row=>{
      const si=+row.dataset.set, btn=row.querySelector('.tbtn'), bar=row.querySelector('.tbar i');
      const tico=btn.querySelector('.tico'), tt=btn.querySelector('.tt');
      const rm=row.querySelector('.timed-rm'); if(rm) rm.onclick=()=>{ if(st.sets.length>1){ st.sets.splice(si,1); renderSheetBody(); saveDraft(); } };
      let rem=st.sec, iv=null, running=false;
      const paint=()=>{ tt.textContent=fmt(rem); bar.style.width=((st.sec-rem)/st.sec*100)+'%'; };
      const doneUI=()=>{ row.classList.add('done'); btn.classList.remove('running'); tico.innerHTML=I.check; tt.textContent='Done'; bar.style.width='100%'; };
      const start=()=>{ running=true; btn.classList.add('running'); tico.innerHTML=I.pause; ensureAudio();
        iv=setInterval(()=>{ rem--; if(rem<=0){ rem=0; paint(); finish(); } else { paint(); if(rem<=3) tick(); } },1000);
        setTimerIntervals.push(iv); };
      const finish=()=>{ clearInterval(iv); running=false; st.sets[si].done=true; doneUI(); alarm();
        if(st.sets.every(s=>s.done)){ st.done=true; exEl.classList.add('done'); } updateSheetProgress(); saveDraft(); };
      btn.onclick=()=>{
        if(st.sets[si].done){ // restart a finished timer
          st.sets[si].done=false; st.done=false; exEl.classList.remove('done'); row.classList.remove('done');
          rem=st.sec; start(); updateSheetProgress(); saveDraft(); return;
        }
        if(running){ clearInterval(iv); running=false; btn.classList.remove('running'); tico.innerHTML=I.play; return; }
        start();
      };
      if(st.sets[si].done) doneUI(); else paint();
    });
  });
}
function startRest(sec){
  clearInterval(restInterval); restTotal=restRem=sec;
  $('#restBar').hidden=false; ensureAudio(); paintRest();
  restInterval=setInterval(()=>{ restRem--; if(restRem<=0){ restRem=0; paintRest(); clearInterval(restInterval); alarm(); setTimeout(hideRest,900); } else { paintRest(); if(restRem<=3) tick(); } },1000);
}
function paintRest(){ $('#restTime').textContent=fmt(restRem); $('#restProg').style.width=(restTotal?restRem/restTotal*100:0)+'%'; }
function hideRest(){ const b=$('#restBar'); if(b) b.hidden=true; }
$('#rest15').onclick=()=>{ restRem+=15; restTotal=Math.max(restTotal,restRem); paintRest(); };
$('#restSkip').onclick=()=>{ clearInterval(restInterval); hideRest(); };

/* ---------- INLINE EXPANDABLE VIDEO ---------- */
function ytId(u){ const e=embedFor(u); return e&&e.kind==='yt'?e.id:null; }
function escAttr(s){ return String(s||'').replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;'); }
// Turn a YouTube / Google Drive / Instagram link into an inline-embeddable URL.
function embedFor(u){
  if(!u) return null; let m;
  if((m=u.match(/(?:youtube\.com\/(?:watch\?(?:.*&)?v=|shorts\/|embed\/|live\/)|youtu\.be\/)([\w-]{11})/))){
    const origin=encodeURIComponent(location.origin);
    return {kind:'yt', id:m[1], src:`https://www.youtube.com/embed/${m[1]}?autoplay=1&rel=0&playsinline=1&modestbranding=1&origin=${origin}&widget_referrer=${origin}`};
  }
  if((m=u.match(/drive\.google\.com\/(?:file\/d\/|open\?id=|uc\?(?:.*&)?id=)([\w-]{10,})/)))
    return {kind:'drive', src:`https://drive.google.com/file/d/${m[1]}/preview`};
  if((m=u.match(/instagram\.com\/(?:[\w.]+\/)?(reels?|p|tv)\/([\w-]+)/)))
    return {kind:'ig', src:`https://www.instagram.com/${m[1].startsWith('reel')?'reel':m[1]}/${m[2]}/embed`};
  return null;
}
function videoBlock(name, vid){
  const wrap=el('div','vblock');
  const build=(openNow)=>{
    const mine=DB.myVids[name]; const url=mine||vid; const em=embedFor(url); const link=url||ytLink(name);
    const sub=()=> mine?'Your video · plays here':em?'Plays here in app':'Search on YouTube';
    wrap.className='vblock';
    wrap.innerHTML=`
      <button class="vtoggle" aria-expanded="false">
        <span class="vthumb${mine?' mine':''}">${I.play}</span>
        <span class="vtl"><b>${mine?'Play your video':'Play tutorial'}</b><span>${sub()}</span></span>
        <span class="vchev">${I.chev}</span>
      </button>
      <div class="vpanel">
        <div class="vplayer${em&&em.kind==='ig'?' ig':''}"></div>
        <a class="vmore" href="${escAttr(link)}" target="_blank" rel="noopener">${I.ext} Video won't play? Open it directly</a>
        <div class="vmine">
          <button class="vmine-btn">${I.plus} ${mine?'Change or remove your video':'Use my own video (YouTube, Drive, Instagram)'}</button>
          <div class="vmine-form" hidden>
            <input type="url" inputmode="url" placeholder="Paste a YouTube, Google Drive or Instagram link" value="${escAttr(mine)}" aria-label="Your video link for ${escAttr(name)}">
            <div class="vmine-act"><button class="vm-save">Save</button>${mine?'<button class="vm-del">Remove mine</button>':''}<button class="vm-cancel">Cancel</button></div>
            <p class="vmine-hint">Google Drive videos must be shared as “Anyone with the link”.</p>
            <p class="vmine-err" hidden>That link isn't a YouTube, Drive or Instagram video — check it and try again.</p>
          </div>
        </div>
      </div>`;
    const toggle=wrap.querySelector('.vtoggle'), player=wrap.querySelector('.vplayer');
    toggle.onclick=()=>{
      const open=wrap.classList.toggle('open'); toggle.setAttribute('aria-expanded',open);
      toggle.querySelector('.vtl span').textContent = open ? 'Hide' : sub();
      if(open && !player.dataset.loaded){
        player.innerHTML = em
          ? `<iframe src="${em.src}" title="${escAttr(name)} video" referrerpolicy="strict-origin-when-cross-origin" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen loading="eager"></iframe>`
          : `<div class="vid-fallback">${I.play}<p>No exact tutorial matched this move — search YouTube, or add your own video below.</p><a href="${ytLink(name)}" target="_blank" rel="noopener">Search YouTube ↗</a></div>`;
        player.dataset.loaded='1';
      } else if(!open){ player.innerHTML=''; player.dataset.loaded=''; }  // stop playback on collapse
    };
    const form=wrap.querySelector('.vmine-form'), inp=form.querySelector('input'), err=form.querySelector('.vmine-err');
    wrap.querySelector('.vmine-btn').onclick=()=>{ form.hidden=!form.hidden; if(!form.hidden) inp.focus(); };
    form.querySelector('.vm-cancel').onclick=()=>{ form.hidden=true; err.hidden=true; };
    form.querySelector('.vm-save').onclick=()=>{
      const val=inp.value.trim();
      if(!embedFor(val)){ err.hidden=false; return; }
      DB.myVids[name]=val; save(); build(true); toast('Your video saved');
    };
    const del=form.querySelector('.vm-del');
    if(del) del.onclick=()=>{ delete DB.myVids[name]; save(); build(true); toast('Back to the tutorial video'); };
    if(openNow) toggle.click();
  };
  build(false);
  return wrap;
}

/* ---------- CALENDAR POPOVER ---------- */
function openCalendar(){
  if(calYear==null){ const t=new Date(todayISO()+'T00:00'); calYear=t.getFullYear(); calMonth=t.getMonth(); }
  $('#calScrim').classList.add('show'); $('#calModal').classList.add('show'); renderCalendar();
}
function closeCalendar(){ $('#calScrim').classList.remove('show'); $('#calModal').classList.remove('show'); }
function renderCalendar(){
  $('#calMon').textContent=`${MONTHS_FULL[calMonth]} ${calYear}`;
  const grid=$('#calGrid'); grid.innerHTML='';
  const doneSet=completedDates();
  const startDow=new Date(calYear,calMonth,1).getDay();
  const daysIn=new Date(calYear,calMonth+1,0).getDate();
  for(let i=0;i<startDow;i++) grid.appendChild(el('div','cal-cell cal-blank'));
  for(let day=1;day<=daysIn;day++){
    const iso=calYear+'-'+String(calMonth+1).padStart(2,'0')+'-'+String(day).padStart(2,'0');
    const st=dayStatus(iso,doneSet); const isToday=iso===todayISO(); const hasData=doneSet.has(iso);
    const cell=el(hasData?'button':'div','cal-cell '+st+(isToday?' today':'')+(histFilter===iso?' sel':''));
    cell.textContent=day;
    if(hasData){ cell.setAttribute('aria-label',`View ${day} ${MO[calMonth]} ${calYear}`); cell.onclick=()=>{ closeCalendar(); gotoDate(iso); }; }
    grid.appendChild(cell);
  }
}
$('#calScrim').onclick=closeCalendar; $('#calClose').onclick=closeCalendar;
$('#calPrev').onclick=()=>{ calMonth--; if(calMonth<0){calMonth=11;calYear--;} renderCalendar(); };
$('#calNext').onclick=()=>{ calMonth++; if(calMonth>11){calMonth=0;calYear++;} renderCalendar(); };
document.addEventListener('keydown',e=>{ if(e.key==='Escape'&&$('#calModal').classList.contains('show')) closeCalendar(); });

/* ---------- CONFIRM DIALOG ---------- */
let cfYes=null;
function confirmAction(title,msg,okLabel,onYes){
  $('#cfTitle').textContent=title; $('#cfMsg').textContent=msg; $('#cfOk').textContent=okLabel||'Confirm'; cfYes=onYes;
  $('#cfScrim').classList.add('show'); $('#cfModal').classList.add('show');
}
function closeConfirm(){ $('#cfScrim').classList.remove('show'); $('#cfModal').classList.remove('show'); cfYes=null; }
$('#cfCancel').onclick=closeConfirm; $('#cfScrim').onclick=closeConfirm;
$('#cfOk').onclick=()=>{ const f=cfYes; closeConfirm(); if(f) f(); };

/* session history navigation */
$('#navBack').onclick=()=>{ if(sheetHistIdx<sheetPast.length-1){ sheetHistIdx++; renderSheetBody(); $('#sheetBody').scrollTop=0; } };
$('#navFwd').onclick=()=>{ if(sheetHistIdx>-1){ sheetHistIdx--; renderSheetBody(); $('#sheetBody').scrollTop=0; } };
$('#pastFoot').onclick=()=>{ sheetHistIdx=-1; renderSheetBody(); $('#sheetBody').scrollTop=0; };

/* discard in-progress session */
$('#discardBtn').onclick=()=>{
  if(hasProgress()) confirmAction('Discard progress?','This clears everything you\'ve ticked or entered in this session. Your saved history is not affected.','Discard',discardDraft);
  else closeSheet();
};

/* ---------- empty state ---------- */
function emptyState(title,msg){
  const e=el('div','empty'); e.innerHTML=`<div class="ei">${I.empty}</div><b>${title}</b><p>${msg}</p>`; return e;
}

/* ============================================================
   NAV / BOOT
   ============================================================ */
/* ============================================================
   RENDER: ASSESS  (weekly check-ins + test days → LSI + phase gates)
   ============================================================ */
let assessForm=null; // 'weekly' | 'big' | null
const SWELL=['None','Trace','1+','2+','3+'];
function lsiClass(x){ return x==null?'':x>=90?'good':x>=80?'warn':'bad'; }
function weeklySummary(v){
  const p=[];
  if(v.pain!=='' && v.pain!=null) p.push(`Pain ${v.pain}/10`);
  if(v.swell!=='' && v.swell!=null) p.push(`Swelling ${SWELL[+v.swell]||v.swell}`);
  if(v.flex) p.push(`Flex ${v.flex}°`);
  if(v.ext!=='' && v.ext!=null) p.push(+v.ext<=0?'Full ext':`Ext −${v.ext}°`);
  if(v.bal) p.push(`Balance ${v.bal}s`);
  return p.join(' · ')||'No values';
}
function assessFormEl(type){
  const f=el('div','as-form');
  const today=todayISO();
  const legHdr = DB.involved ? `<div class="as-lr"><span></span><b>Left${DB.involved==='L'?' (injured)':''}</b><b>Right${DB.involved==='R'?' (injured)':''}</b><b>LSI</b></div>` : '';
  const num=(name,ph,extra='')=>`<input name="${name}" inputmode="decimal" placeholder="${ph}" ${extra}>`;
  f.innerHTML = `<div class="as-fh"><b>${type==='weekly'?'Weekly check-in':'Test day'}</b><label class="as-date">Date <input type="date" name="date" value="${today}" max="${today}"></label></div>` +
    (type==='weekly' ? `
      <label class="as-field"><span>Pain now (0–10)</span>${num('pain','0')}</label>
      <label class="as-field"><span>Swelling (stroke test)</span><select name="swell"><option value="">—</option>${SWELL.map((s,i)=>`<option value="${i}">${s}</option>`).join('')}</select></label>
      <label class="as-field"><span>Knee bend / flexion (°)</span>${num('flex','e.g. 125')}</label>
      <label class="as-field"><span>Extension lacking (°) · 0 = full</span>${num('ext','0')}</label>
      <label class="as-field"><span>Single-leg balance, injured side (s)</span>${num('bal','e.g. 30')}</label>`
    : `${legHdr}${TESTS.map(t=>`<div class="as-row" data-k="${t.k}"><span>${t.t} <em>${t.u}</em></span>${num(t.k+'_L','L')}${num(t.k+'_R','R')}<i class="as-lsi">–</i></div>`).join('')}
      <label class="as-field"><span>ACL-RSI confidence score (0–100)</span>${num('rsi','e.g. 70')}</label>`) +
    `<label class="as-field"><span>Notes</span><textarea name="notes" rows="2" placeholder="How did the knee feel? Anything your physio said…"></textarea></label>
     <div class="as-btns"><button class="as-cancel">Cancel</button><button class="as-save">Save ${type==='weekly'?'check-in':'test day'}</button></div>`;
  const q=n=>f.querySelector(`[name="${n}"]`);
  // live LSI preview on test day
  f.querySelectorAll('.as-row').forEach(row=>{
    const k=row.dataset.k, out=row.querySelector('.as-lsi');
    const upd=()=>{ const l=lsiOf({v:{[k]:{L:q(k+'_L').value,R:q(k+'_R').value}}},k); out.textContent=l==null?'–':l+'%'; out.className='as-lsi '+lsiClass(l); };
    row.querySelectorAll('input').forEach(i=>i.oninput=upd);
  });
  f.querySelector('.as-cancel').onclick=()=>{ assessForm=null; renderAssess(); };
  f.querySelector('.as-save').onclick=()=>{
    const date=q('date').value||today; const v={notes:q('notes').value.trim()};
    if(type==='weekly'){ ['pain','swell','flex','ext','bal'].forEach(k=>v[k]=q(k).value.trim()); }
    else { TESTS.forEach(t=>{ const L=q(t.k+'_L').value.trim(), R=q(t.k+'_R').value.trim(); if(L||R) v[t.k]={L,R}; }); v.rsi=q('rsi').value.trim(); }
    const filled=Object.entries(v).some(([k,x])=>k!=='notes' && x!=='' && x!=null);
    if(!filled && !v.notes){ toast('Enter at least one value'); return; }
    DB.assess.push({id:'a'+Date.now(), type, date, ts:new Date(date+'T12:00').getTime()+(Date.now()%1000), v});
    save(); assessForm=null; renderAll(); toast(type==='weekly'?'Check-in saved':'Test day saved');
  };
  return f;
}
function renderAssess(){
  const v=$('#view-assess'); if(!v) return; v.innerHTML='';
  v.appendChild(el('div','',`<div class="eyebrow" style="margin:2px 2px 4px">Track your knee</div><div class="h2" style="margin-bottom:12px">Assessments</div>`));

  const leg=el('div','leg-pick');
  leg.innerHTML=`<span>Injured knee</span><div class="seg">${['L','R'].map(x=>`<button aria-pressed="${DB.involved===x}" data-l="${x}">${x==='L'?'Left':'Right'}</button>`).join('')}</div>`;
  leg.querySelectorAll('button').forEach(b=>b.onclick=()=>{ DB.involved=b.dataset.l; save(); renderAll(); });
  v.appendChild(leg);
  if(!DB.involved) v.appendChild(el('div','help-note',`${I.info}<p>Pick your <b>injured knee</b> so the app can compare it with your healthy side (limb symmetry index, LSI).</p>`));

  if(assessForm){ v.appendChild(assessFormEl(assessForm)); }
  else {
    const act=el('div','as-actions');
    act.innerHTML=`<button data-t="weekly"><b>Weekly check-in</b><span>Pain · swelling · bend · balance — 1 min</span></button>
                   <button data-t="big"><b>Test day</b><span>Hop tests · strength · Y-balance → LSI</span></button>`;
    act.querySelectorAll('button').forEach(b=>b.onclick=()=>{ assessForm=b.dataset.t; renderAssess(); });
    v.appendChild(act);
  }

  v.appendChild(el('div','section-head','<span class="eyebrow">Your current phase</span>'));
  v.appendChild(gateCard(DB.phase));

  const b=latestAssess('big');
  if(b){
    const d=new Date(b.date+'T00:00');
    v.appendChild(el('div','section-head',`<span class="eyebrow">Latest test day · ${d.getDate()} ${MO[d.getMonth()]} ${d.getFullYear()}</span>`));
    const g=el('div','lsi-grid');
    TESTS.filter(t=>b.v[t.k]).forEach(t=>{
      const l=lsiOf(b,t.k);
      g.appendChild(el('div','lsi-card '+lsiClass(l),`<span>${t.t}</span><b>${l==null?'–':l+'%'}</b><em>L ${b.v[t.k].L||'–'} · R ${b.v[t.k].R||'–'} ${t.u}</em>`));
    });
    if(b.v.rsi) g.appendChild(el('div','lsi-card '+(+b.v.rsi>=65?'good':'warn'),`<span>ACL-RSI</span><b>${b.v.rsi}</b><em>confidence · target ≥ 65</em>`));
    v.appendChild(g);
    v.appendChild(el('div','lsi-legend','<span class="good">≥ 90% return-to-sport</span><span class="warn">80–89%</span><span class="bad">&lt; 80%</span>'));
  }

  v.appendChild(el('div','section-head','<span class="eyebrow">History</span>'));
  if(!DB.assess.length){
    v.appendChild(emptyState('No assessments yet','Log a weekly check-in or a test day. You can back-date entries to add your old physio assessments.'));
    return;
  }
  const h=el('div','hist');
  [...DB.assess].sort((a,b)=>b.ts-a.ts).forEach(a=>{
    const d=new Date(a.date+'T00:00');
    const sum = a.type==='weekly' ? weeklySummary(a.v)
      : TESTS.filter(t=>a.v[t.k]).map(t=>{ const l=lsiOf(a,t.k); return `<span class="lsi-chip ${lsiClass(l)}">${t.t.replace('Single-leg ','SL ')} ${l==null?'–':l+'%'}</span>`; }).join('') || 'Test values saved';
    const row=el('div','hist-row as-hrow');
    row.innerHTML=`<div class="tag ${a.type==='weekly'?'mobility':'rehab'}">${a.type==='weekly'?'WK':'TD'}</div>
      <div class="hi"><b>${a.type==='weekly'?'Weekly check-in':'Test day'}</b><span>${DOW[d.getDay()]} ${d.getDate()} ${MO[d.getMonth()]} ${d.getFullYear()}</span><div class="as-sum">${sum}</div>${a.v.notes?`<div class="as-note">“${escAttr(a.v.notes)}”</div>`:''}</div>
      <button class="del" aria-label="Delete this assessment">${I.trash}</button>`;
    row.querySelector('.del').onclick=()=>confirmAction('Delete this assessment?','It will be removed from your history and phase checks.','Delete',()=>{
      const i=DB.assess.indexOf(a); const rm=DB.assess.splice(i,1)[0]; save(); renderAll();
      toast('Assessment deleted',()=>{ DB.assess.splice(i,0,rm); save(); renderAll(); });
    });
    h.appendChild(row);
  });
  v.appendChild(h);
}

let mePanel='profile';
function renderMe(){
  const seg=$('#meSeg'); if(!seg) return;
  seg.className='me-head';
  seg.innerHTML=`<div class="eyebrow" style="margin:2px 2px 4px">You</div><div class="h2" style="margin-bottom:12px">Me</div>
    <div class="seg me-seg">${[['profile','Profile & goals'],['assess','Assessments'],['settings','Settings']].map(([k,l])=>`<button data-p="${k}" aria-pressed="${mePanel===k}">${l}</button>`).join('')}</div>`;
  seg.querySelectorAll('[data-p]').forEach(b=>b.onclick=()=>{ mePanel=b.dataset.p; renderMe(); window.scrollTo(0,0); });
  ['goals','assess','settings'].forEach(id=>{ const p=$('#view-'+id); if(p) p.hidden = (id==='goals'?'profile':id)!==mePanel; });
  renderGoals(); renderAssess(); renderSettings();
}
function renderAll(){ updateHeaderPhase(); renderToday(); renderTrain(); renderFood(); renderProgress(); renderMe(); }
const tabs=document.querySelectorAll('.tab');
tabs.forEach(t=>{
  t.onclick=()=>{
    tabs.forEach(x=>x.setAttribute('aria-selected','false'));
    t.setAttribute('aria-selected','true');
    document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));
    $('#view-'+t.dataset.tab).classList.add('active');
    if(t.dataset.tab==='progress') requestAnimationFrame(drawChart);
    document.getElementById('app').scrollTo?.(0,0);
    window.scrollTo(0,0);
  };
});
// topbar scroll shadow
window.addEventListener('scroll',()=>{ $('#topbar').classList.toggle('scrolled', window.scrollY>4); },{passive:true});
window.addEventListener('resize',()=>{ if($('#view-progress').classList.contains('active')) drawChart(); });
matchMedia('(prefers-color-scheme:dark)').addEventListener?.('change',()=>{ if(!DB.theme){applyTheme(); if($('#view-progress').classList.contains('active'))drawChart();} });

renderAll();
