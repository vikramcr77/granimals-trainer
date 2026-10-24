/* ============================================================
   FOOD — profile → BMI / BMR / TDEE → daily targets (training vs rest
   day), meal logging, custom foods, and AI photo estimates.
   Values are per serving, approximate (IFCT / USDA reference data).
   ============================================================ */
// [name, serving, kcal, protein, carbs, fat]
const FOODS=[
  ['Roti / chapati','1 medium (40 g)',105,3.5,21,1],['Paratha (plain)','1 piece',230,5,32,9],['Rice, white (cooked)','1 cup (160 g)',205,4.3,45,0.4],
  ['Rice, brown (cooked)','1 cup (195 g)',216,5,45,1.8],['Jeera rice','1 cup',240,4.5,45,5],['Dal (toor, with tadka)','1 katori (150 g)',165,9,22,4.5],
  ['Rajma curry','1 katori (150 g)',200,9,28,6],['Chole','1 katori (150 g)',240,10,32,8],['Sambar','1 katori (150 g)',115,5,17,3],
  ['Khichdi','1 bowl (250 g)',280,10,45,6],['Mixed veg sabzi','1 katori (150 g)',120,3,12,7],['Aloo sabzi','1 katori (150 g)',180,3,22,9],
  ['Palak paneer','1 katori (150 g)',240,11,8,18],['Paneer (raw)','100 g',265,18,3,20],['Paneer bhurji','1 serving (150 g)',330,18,8,25],
  ['Paneer tikka','6 pieces (150 g)',300,20,8,21],['Tofu (firm)','100 g',144,17,3,9],['Soya chunks (dry)','50 g',172,26,16,0.3],
  ['Chicken breast (cooked)','100 g',165,31,0,3.6],['Chicken curry','1 katori (150 g)',240,22,6,14],['Tandoori chicken','2 pieces (150 g)',260,35,4,11],
  ['Chicken biryani','1 plate (300 g)',500,25,60,16],['Mutton curry','1 katori (150 g)',330,24,6,23],['Fish curry','1 katori (150 g)',220,22,6,12],
  ['Fish, grilled','100 g',130,22,0,4.5],['Egg, whole (boiled)','1 large',78,6.3,0.6,5.3],['Egg white','1 large',17,3.6,0.2,0.1],
  ['Omelette (2 eggs)','1 omelette',190,13,1,15],['Curd / dahi','1 cup (200 g)',122,7,9.4,6.6],['Greek yogurt (plain, low-fat)','170 g',100,17,6,0.7],
  ['Milk (toned)','250 ml',145,7.8,11.8,7.5],['Whey protein','1 scoop (30 g)',120,24,3,1.5],['Lassi (sweet)','250 ml',230,7,35,7],
  ['Buttermilk / chaas','250 ml',50,3,4,2],['Oats (dry)','40 g',150,5,27,2.7],['Muesli','50 g',190,5,33,4],['Cornflakes','30 g',110,2,25,0.2],
  ['Poha','1 plate (180 g)',250,5,45,6],['Upma','1 plate (180 g)',250,6,38,8],['Idli','1 piece',58,2,12,0.2],['Dosa (plain)','1 medium',135,3,23,3.5],
  ['Masala dosa','1 piece',380,8,55,14],['Bread, white','1 slice',66,2.3,12.5,0.8],['Bread, brown','1 slice',70,3.5,12,1],
  ['Pasta (cooked)','1 cup (140 g)',220,8,43,1.3],['Potato (boiled)','100 g',87,1.9,20,0.1],['Sweet potato (boiled)','100 g',76,1.4,17.7,0.1],
  ['Boiled chana','1 cup (164 g)',270,14.5,45,4.2],['Moong sprouts','1 cup (100 g)',30,3,6,0.2],['Peanuts (roasted)','30 g',170,7,5,14],
  ['Almonds','10 pieces',70,2.5,2.5,6],['Peanut butter','1 tbsp (16 g)',95,3.5,3.5,8],['Banana','1 medium',105,1.3,27,0.4],
  ['Apple','1 medium',95,0.5,25,0.3],['Orange','1 medium',62,1.2,15,0.2],['Mango','1 cup (165 g)',99,1.4,25,0.6],['Dates','2 pieces',45,0.4,12,0],
  ['Green salad','1 bowl',30,1.5,6,0.2],['Ghee','1 tsp',45,0,0,5],['Butter','1 tsp',36,0,0,4],['Cooking oil','1 tsp',40,0,0,4.5],
  ['Sugar','1 tsp',16,0,4,0],['Chai (milk + sugar)','1 cup',75,2,10,2.5],['Black coffee','1 cup',2,0.3,0,0],['Coconut water','250 ml',46,1.7,9,0.5],
  ['Protein bar','1 bar (60 g)',220,20,22,7],
];
const MEALS=[['breakfast','Breakfast'],['lunch','Lunch'],['snacks','Snacks'],['dinner','Dinner']];
const ACTIVITY=[[1.2,'Desk job, little walking'],[1.375,'On my feet some of the day'],[1.55,'Physically active job']];
const GOALS={lean:{label:'Lean gain',f:1.10,p:2.0},maintain:{label:'Maintain',f:1.0,p:1.8},cut:{label:'Fat loss',f:0.80,p:2.2}};
const AI_SDK='https://cdn.jsdelivr.net/npm/@anthropic-ai/sdk@0.131.0/+esm';
const AI_KEY_STORE='granimals_ai_key';   // kept outside DB so it's never part of resets/exports
let foodDate=null, foodAdd=null, foodQuery='', foodAI=null;

function profile(){ if(!DB.profile) DB.profile={sex:'m',age:'',height:'',activity:1.2,goal:'lean'}; return DB.profile; }
function aiKey(){ try{ return localStorage.getItem(AI_KEY_STORE)||''; }catch(e){ return ''; } }
function r10(x){ return Math.round(x/10)*10; }
function bmiInfo(){
  const p=profile(), w=+DB.goals.bwCurrent, h=+p.height; if(!w||!h) return null;
  const b=w/((h/100)**2);
  const cat = b<18.5?['Underweight','warn'] : b<23?['Healthy','good'] : b<27.5?['Overweight (Asian cut-off)','warn'] : ['Obese (Asian cut-off)','bad'];
  return {bmi:Math.round(b*10)/10, cat:cat[0], cls:cat[1]};
}
function sessionsOn(date){ return DB.history.filter(h=>h.date===date); }
function isTrainDay(date){
  const o=(DB.foodDay||{})[date]; if(o) return o==='train';
  if(sessionsOn(date).length) return true;
  return date===todayISO() && typeof hdNext==='function' && hdNext().daysLeft<=0;
}
function nutTargets(date){
  const p=profile(), w=+DB.goals.bwCurrent, h=+p.height, a=+p.age; if(!w||!h||!a) return null;
  const bmr = 10*w + 6.25*h - 5*a + (p.sex==='f'?-161:5);            // Mifflin–St Jeor
  const g = GOALS[p.goal]||GOALS.lean;
  const rest = r10(bmr*(+p.activity||1.2)*g.f);
  const logged = sessionsOn(date).reduce((m,s)=>m+((byId(s.sid)||{}).est||45),0);
  const mins = logged || 45;
  const sessKcal = r10(5*3.5*w/200*mins);                             // ~5 MET strength training
  const train = isTrainDay(date);
  const kcal = train ? rest+sessKcal : rest;
  const prot = Math.round(w*g.p);
  const fat = Math.round(Math.max(0.6*w, kcal*0.25/9));
  const carb = Math.max(0, Math.round((kcal-prot*4-fat*9)/4));
  const waterRest=Math.round(w*35/50)*50;                              // ≈35 ml/kg
  const water=waterRest+(train?500:0);
  return {bmr:Math.round(bmr), tdee:r10(bmr*(+p.activity||1.2)), rest, trainKcal:rest+sessKcal, sessKcal, train, kcal, p:prot, c:carb, f:fat, goal:g.label, water, waterRest};
}
function dayLog(date){ if(!DB.food) DB.food={}; return DB.food[date]||(DB.food[date]=[]); }
function dayTotals(date){ return dayLog(date).reduce((t,x)=>{ t.kcal+=x.kcal*x.qty; t.p+=x.p*x.qty; t.c+=x.c*x.qty; t.f+=x.f*x.qty; return t; },{kcal:0,p:0,c:0,f:0}); }
function addFood(meal,item,qty){ dayLog(foodDate).push({id:'f'+Date.now()+Math.random().toString(36).slice(2,6), meal, qty:+qty||1, ...item}); save(); }

/* ---------- Today card ---------- */
function foodTodayCard(){
  const t=nutTargets(todayISO()); const tot=dayTotals(todayISO());
  const c=el('button','food-today');
  if(!t){ c.innerHTML=`<span class="ft-ic">${I.bolt}</span><div><b>Set up your plan</b><span>1-minute guided setup → calories, protein & water</span></div>${I.chev}`; c.onclick=()=>openWizard(); return c; }
  const pct=Math.min(100,Math.round(tot.kcal/t.kcal*100));
  c.innerHTML=`<span class="ft-ring" style="--p:${pct}"><i>${pct}%</i></span><div><b>${Math.round(tot.kcal)} / ${t.kcal} kcal</b><span>Protein ${Math.round(tot.p)} / ${t.p} g · Water ${(waterCount(todayISO())*0.25).toFixed(1)} / ${(t.water/1000).toFixed(1)} L</span></div>${I.chev}`;
  c.onclick=()=>{ foodDate=todayISO(); switchTab('food'); };
  return c;
}


/* ---------- Water ---------- */
function waterCount(date){ return (DB.water||{})[date]||0; }
function waterCard(date,t){
  const goal = t ? t.water : 2500; const n=Math.max(8, Math.round(goal/250)); const have=waterCount(date);
  const c=el('div','water');
  c.innerHTML=`<div class="meal-h"><b>Water</b><span>${(have*0.25).toFixed(2).replace(/\.?0+$/,'')} / ${(goal/1000).toFixed(1)} L</span></div>
    <div class="glasses big">${Array.from({length:n},(_,i)=>`<button class="${i<have?'on':''}" aria-label="${i<have?'Remove':'Add'} glass ${i+1}" data-i="${i}"></button>`).join('')}</div>
    <p class="pc-foot">Each glass is 250 ml. Tap to fill.</p>`;
  c.querySelectorAll('[data-i]').forEach(b=>b.onclick=()=>{ const i=+b.dataset.i; DB.water=DB.water||{}; DB.water[date] = (i+1===have)? i : i+1; save(); renderFood(); renderToday(); });
  return c;
}

/* ---------- Food tab ---------- */
function renderFood(){
  const v=$('#view-food'); if(!v) return; v.innerHTML='';
  if(!foodDate) foodDate=todayISO();
  const d=new Date(foodDate+'T00:00'); const isToday=foodDate===todayISO();
  v.appendChild(el('div','',`<div class="eyebrow" style="margin:2px 2px 4px">Fuel the gains</div><div class="h2" style="margin-bottom:12px">Food</div>`));
  const nav=el('div','food-nav');
  nav.innerHTML=`<button class="nav-btn" data-d="-1" aria-label="Previous day">${I.chevL}</button><b>${isToday?'Today':DOW[d.getDay()]}, ${d.getDate()} ${MO[d.getMonth()]}</b><button class="nav-btn" data-d="1" aria-label="Next day" ${isToday?'disabled':''}>${I.chev}</button>`;
  nav.querySelectorAll('button').forEach(b=>b.onclick=()=>{ foodDate=addDaysISO(foodDate,+b.dataset.d); foodAdd=null; renderFood(); });
  v.appendChild(nav);

  const t=nutTargets(foodDate), tot=dayTotals(foodDate);
  if(!t){
    const s=el('div','help-note',`${I.info}<p><b>Answer a few quick questions</b> to get calorie, protein and water targets. You can still log food without them.</p>`);
    const b=el('button','pc-set','Start guided setup'); b.style.marginTop='8px'; b.onclick=()=>openWizard();
    s.querySelector('p').appendChild(document.createElement('br')); s.querySelector('p').appendChild(b); v.appendChild(s);
  } else {
    const pct=Math.min(100,Math.round(tot.kcal/t.kcal*100)); const left=Math.round(t.kcal-tot.kcal);
    const sc=el('div','food-sum');
    const bar=(lab,cur,tar,cls)=>`<div class="fm"><div class="fm-h"><span>${lab}</span><b>${Math.round(cur)} / ${tar} g</b></div><div class="pbar ${cls}"><i style="width:${Math.min(100,tar?cur/tar*100:0)}%"></i></div></div>`;
    sc.innerHTML=`<div class="fs-top"><span class="ft-ring big" style="--p:${pct}"><i>${Math.round(tot.kcal)}<small>of ${t.kcal}</small></i></span>
      <div class="fs-r"><b>${left>=0?left+' kcal left':(-left)+' kcal over'}</b><span>${t.goal} target</span>
      <div class="seg fs-day"><button data-t="rest" aria-pressed="${!t.train}">Rest day</button><button data-t="train" aria-pressed="${t.train}">Training day</button></div></div></div>
      ${bar('Protein',tot.p,t.p,'prot')}${bar('Carbs',tot.c,t.c,'carb')}${bar('Fat',tot.f,t.f,'fat')}`;
    sc.querySelectorAll('.fs-day button').forEach(b=>b.onclick=()=>{ DB.foodDay=DB.foodDay||{}; DB.foodDay[foodDate]=b.dataset.t; save(); renderFood(); renderToday(); });
    v.appendChild(sc);
  }
  v.appendChild(waterCard(foodDate, t));

  const yday=addDaysISO(foodDate,-1);
  MEALS.forEach(([k,label])=>{
    const items=dayLog(foodDate).filter(x=>x.meal===k);
    const kc=items.reduce((m,x)=>m+x.kcal*x.qty,0);
    const sec=el('div','meal');
    sec.innerHTML=`<div class="meal-h"><b>${label}</b><span>${Math.round(kc)} kcal</span></div>`;
    items.forEach(x=>{
      const r=el('div','meal-item');
      r.innerHTML=`<div class="mi-t"><b>${escAttr(x.name)}</b><span>${x.qty!==1?x.qty+' × ':''}${escAttr(x.serving||'')}${x.src==='photo'?' · from photo':''}</span></div>
        <div class="mi-v"><b>${Math.round(x.kcal*x.qty)}</b><span>P ${Math.round(x.p*x.qty)}g</span></div>
        <button class="del" aria-label="Remove ${escAttr(x.name)}">${I.trash}</button>`;
      r.querySelector('.del').onclick=()=>{ const L=dayLog(foodDate); const i=L.indexOf(x); L.splice(i,1); save(); renderFood(); renderToday();
        toast('Removed',()=>{ L.splice(i,0,x); save(); renderFood(); renderToday(); }); };
      sec.appendChild(r);
    });
    const acts=el('div','meal-acts');
    const add=el('button','add-set',`${I.plus} Add food`); add.onclick=()=>{ foodAdd={meal:k,tab:'search'}; foodQuery=''; foodAI=null; renderFood(); };
    acts.appendChild(add);
    const prev=(DB.food&&DB.food[yday]||[]).filter(x=>x.meal===k);
    if(prev.length && !items.length){ const cp=el('button','copy-prev',`${I.copy} Same as yesterday`); cp.onclick=()=>{ prev.forEach(x=>{ const {id,meal,...rest}=x; addFood(k,rest,x.qty); }); renderFood(); renderToday(); toast(`${label} copied`); }; acts.appendChild(cp); }
    sec.appendChild(acts);
    if(foodAdd && foodAdd.meal===k) sec.appendChild(foodAddPanel(k,label));
    v.appendChild(sec);
  });
  v.appendChild(el('p','pc-foot','Food values are approximate (IFCT / USDA reference data). Restaurant and home portions vary — weigh foods for accuracy.'));
}

function foodAddPanel(meal,label){
  const p=el('div','fa-panel');
  const tabs=[['search','Search'],['custom','Custom'],['photo','Photo']];
  p.innerHTML=`<div class="seg fa-tabs">${tabs.map(([k,l])=>`<button data-t="${k}" aria-pressed="${foodAdd.tab===k}">${l}</button>`).join('')}</div><div class="fa-body"></div>
    <button class="fa-close">Done</button>`;
  p.querySelectorAll('.fa-tabs button').forEach(b=>b.onclick=()=>{ foodAdd.tab=b.dataset.t; renderFood(); });
  p.querySelector('.fa-close').onclick=()=>{ foodAdd=null; renderFood(); };
  const body=p.querySelector('.fa-body');
  if(foodAdd.tab==='search'){
    const mine=(DB.myFoods||[]).map(x=>[x.name,x.serving,x.kcal,x.p,x.c,x.f,true]);
    body.innerHTML=`<input class="fa-q" type="search" placeholder="Search foods — e.g. paneer, roti, whey" value="${escAttr(foodQuery)}" aria-label="Search foods"><div class="fa-list"></div>`;
    const list=body.querySelector('.fa-list'), q=body.querySelector('.fa-q');
    const draw=()=>{
      const s=foodQuery.trim().toLowerCase();
      const all=[...mine,...FOODS].filter(f=>!s||f[0].toLowerCase().includes(s)).slice(0,30);
      list.innerHTML=all.length?'':'<p class="fa-empty">No match — add it as a custom food.</p>';
      all.forEach(f=>{
        const r=el('div','fa-row'); let qty=1;
        r.innerHTML=`<div class="mi-t"><b>${escAttr(f[0])}${f[6]?' <em class="fa-mine">mine</em>':''}</b><span>${escAttr(f[1])} · ${f[2]} kcal · P ${f[3]}g</span></div>
          <div class="fa-qty"><button data-q="-0.5" aria-label="Less">−</button><b>1</b><button data-q="0.5" aria-label="More">+</button></div><button class="fa-add" aria-label="Add ${escAttr(f[0])}">${I.plus}</button>`;
        r.querySelectorAll('[data-q]').forEach(b=>b.onclick=()=>{ qty=Math.max(0.5,qty+ +b.dataset.q); r.querySelector('.fa-qty b').textContent=qty; });
        r.querySelector('.fa-add').onclick=()=>{ addFood(meal,{name:f[0],serving:f[1],kcal:f[2],p:f[3],c:f[4],f:f[5],src:f[6]?'custom':'db'},qty); renderFood(); renderToday(); toast(`Added to ${label}`); };
        list.appendChild(r);
      });
    };
    q.oninput=e=>{ foodQuery=e.target.value; draw(); };
    draw(); requestAnimationFrame(()=>q.focus());
  } else if(foodAdd.tab==='custom'){
    body.innerHTML=`<div class="as-form fa-custom">
      <label class="as-field"><span>Food name</span><input name="name" placeholder="e.g. Mom's rajma chawal"></label>
      <label class="as-field"><span>Serving</span><input name="serving" placeholder="e.g. 1 plate"></label>
      <div class="fa-macros">${[['kcal','Calories'],['p','Protein g'],['c','Carbs g'],['f','Fat g']].map(([k,l])=>`<label class="as-field"><span>${l}</span><input name="${k}" inputmode="decimal" placeholder="0"></label>`).join('')}</div>
      <label class="fa-save"><input type="checkbox" name="keep" checked> Save to my foods for next time</label>
      <div class="as-btns"><button class="as-save">Add to ${label}</button></div></div>`;
    const q=n=>body.querySelector(`[name="${n}"]`);
    body.querySelector('.as-save').onclick=()=>{
      const item={name:q('name').value.trim(), serving:q('serving').value.trim()||'1 serving', kcal:+q('kcal').value||0, p:+q('p').value||0, c:+q('c').value||0, f:+q('f').value||0, src:'custom'};
      if(!item.name){ toast('Give the food a name'); return; }
      if(!item.kcal && !item.p){ toast('Add calories or protein'); return; }
      if(q('keep').checked){ DB.myFoods=DB.myFoods||[]; DB.myFoods=DB.myFoods.filter(x=>x.name!==item.name); DB.myFoods.unshift({...item}); }
      addFood(meal,item,1); foodAdd.tab='search'; renderFood(); renderToday(); toast(`Added to ${label}`);
    };
  } else {
    body.appendChild(foodPhotoUI(meal,label));
  }
  return p;
}

/* ---------- AI photo estimate (Claude, user's own API key) ---------- */
const FOOD_SCHEMA={type:'object',additionalProperties:false,required:['items','confidence','notes'],properties:{
  items:{type:'array',items:{type:'object',additionalProperties:false,required:['name','portion','kcal','protein_g','carbs_g','fat_g'],properties:{
    name:{type:'string'}, portion:{type:'string'}, kcal:{type:'number'}, protein_g:{type:'number'}, carbs_g:{type:'number'}, fat_g:{type:'number'}}}},
  confidence:{type:'string',enum:['low','medium','high']}, notes:{type:'string'}}};
function compressImage(file,max=1024){
  return new Promise((res,rej)=>{ const img=new Image(); img.onload=()=>{ const s=Math.min(1,max/Math.max(img.width,img.height)); const c=document.createElement('canvas');
    c.width=Math.round(img.width*s); c.height=Math.round(img.height*s); c.getContext('2d').drawImage(img,0,0,c.width,c.height); URL.revokeObjectURL(img.src); res(c.toDataURL('image/jpeg',0.85)); };
    img.onerror=()=>rej(new Error('Could not read that image')); img.src=URL.createObjectURL(file); });
}
async function aiAnalyzeFood(dataUrl){
  const mod=await import(AI_SDK); const Anthropic=mod.default;
  const client=new Anthropic({apiKey:aiKey(), dangerouslyAllowBrowser:true});
  try{
    const resp=await client.beta.messages.create({
      model:'claude-opus-5-5', max_tokens:16000,
      betas:['server-side-fallback-2026-07-01'], fallbacks:'default',
      output_config:{effort:'medium', format:{type:'json_schema', schema:FOOD_SCHEMA}},
      system:'You estimate the nutrition of meals from photos for a fitness tracker. The user is in India, so expect Indian home cooking (roti, dal, sabzi, rice, paneer, curries) as well as other foods. Identify each distinct food, estimate its portion from visual cues (plate size, katori, hand), and give calories and macros for that portion. Include visible oil or ghee in the dish. If something is unclear, make your best estimate and say so in notes. Never invent foods you cannot see.',
      messages:[{role:'user',content:[{type:'image',source:{type:'base64',media_type:'image/jpeg',data:dataUrl.split(',')[1]}},{type:'text',text:'Estimate the calories, protein, carbs and fat of everything on this plate.'}]}],
    });
    if(resp.stop_reason==='refusal') throw new Error('Claude declined to analyse this photo. Try a clearer photo of just the food.');
    if(resp.stop_reason==='max_tokens') throw new Error('The analysis was cut short — try again.');
    const txt=resp.content.filter(b=>b.type==='text').map(b=>b.text).join('');
    return JSON.parse(txt);
  }catch(e){
    if(e instanceof Anthropic.AuthenticationError) throw new Error('That API key was rejected. Check it in Me → Settings.');
    if(e instanceof Anthropic.PermissionDeniedError) throw new Error('This API key can\'t use that model. Check your Anthropic Console.');
    if(e instanceof Anthropic.RateLimitError) throw new Error('Rate limit reached — wait a minute and try again.');
    if(e instanceof Anthropic.APIConnectionError) throw new Error('Couldn\'t reach Claude. Check your internet connection.');
    if(e instanceof Anthropic.BadRequestError) throw new Error(`Claude rejected the request: ${e.message}`);
    if(e instanceof Anthropic.APIError) throw new Error(`Claude returned an error (${e.status||'unknown'}). Try again.`);
    throw e;
  }
}
function foodPhotoUI(meal,label){
  const w=el('div','fa-photo');
  if(!aiKey()){
    w.innerHTML=`<p class="fa-empty">Photo estimates use Claude with <b>your own Anthropic API key</b>. Add it once in <b>Me → Settings</b>.</p><button class="pc-set">Open settings</button>`;
    w.querySelector('button').onclick=()=>{ mePanel='settings'; renderMe(); switchTab('me'); };
    return w;
  }
  if(!foodAI){
    w.innerHTML=`<label class="fa-pick">${I.plus}<b>Take or choose a photo</b><span>Shoot from above, whole plate in frame</span><input type="file" accept="image/*" capture="environment" hidden></label>`;
    w.querySelector('input').onchange=async e=>{
      const f=e.target.files[0]; if(!f) return;
      try{ const img=await compressImage(f); foodAI={img,state:'busy'}; renderFood();
        const out=await aiAnalyzeFood(img); foodAI={img,state:'done',out,sel:out.items.map(()=>true)}; }
      catch(err){ foodAI={img:foodAI&&foodAI.img,state:'error',msg:err.message||'Something went wrong.'}; }
      if(foodAdd) renderFood();
    };
    return w;
  }
  const img=foodAI.img?`<img class="fa-img" src="${foodAI.img}" alt="Your meal photo">`:'';
  if(foodAI.state==='busy'){ w.innerHTML=`${img}<p class="fa-busy"><span class="spin"></span> Claude is estimating your plate…</p>`; return w; }
  if(foodAI.state==='error'){ w.innerHTML=`${img}<p class="vmine-err">${escAttr(foodAI.msg)}</p><button class="pc-set">Try another photo</button>`; w.querySelector('button').onclick=()=>{ foodAI=null; renderFood(); }; return w; }
  const o=foodAI.out;
  w.innerHTML=`${img}<div class="fa-ai-h"><b>${o.items.length} item${o.items.length!==1?'s':''} found</b><span class="conf ${o.confidence}">${o.confidence} confidence</span></div>
    ${o.items.map((x,i)=>`<label class="fa-ai-row"><input type="checkbox" data-i="${i}" ${foodAI.sel[i]?'checked':''}><div class="mi-t"><b>${escAttr(x.name)}</b><span>${escAttr(x.portion)}</span></div><div class="mi-v"><b>${Math.round(x.kcal)}</b><span>P ${Math.round(x.protein_g)}g · C ${Math.round(x.carbs_g)}g · F ${Math.round(x.fat_g)}g</span></div></label>`).join('')}
    ${o.notes?`<p class="fa-note">${escAttr(o.notes)}</p>`:''}
    <div class="as-btns"><button class="as-cancel">Retake</button><button class="as-save">Add selected to ${label}</button></div>
    <p class="pc-foot">AI estimates can be off by 20–30%. Edit or remove anything that looks wrong.</p>`;
  w.querySelectorAll('[data-i]').forEach(c=>c.onchange=()=>{ foodAI.sel[+c.dataset.i]=c.checked; });
  w.querySelector('.as-cancel').onclick=()=>{ foodAI=null; renderFood(); };
  w.querySelector('.as-save').onclick=()=>{
    const pick=o.items.filter((x,i)=>foodAI.sel[i]); if(!pick.length){ toast('Select at least one item'); return; }
    pick.forEach(x=>addFood(meal,{name:x.name,serving:x.portion,kcal:Math.round(x.kcal),p:+x.protein_g.toFixed(1),c:+x.carbs_g.toFixed(1),f:+x.fat_g.toFixed(1),src:'photo'},1));
    foodAI=null; foodAdd=null; renderFood(); renderToday(); toast(`Added ${pick.length} item${pick.length>1?'s':''} to ${label}`);
  };
  return w;
}

/* ---------- Settings panel (Me → Settings) ---------- */
function renderSettings(){
  const v=$('#view-settings'); if(!v) return; v.innerHTML='';
  const k=aiKey();
  const c=el('div','prof-card');
  c.innerHTML=`<div class="prof-h"><b>Food photo analysis</b><span>Uses Claude to estimate calories and macros from a meal photo.</span></div>
    <label class="as-field"><span>Your Anthropic API key</span><input type="password" name="key" autocomplete="off" placeholder="${k?'•••• saved on this device':'sk-ant-…'}"></label>
    <div class="as-btns"><button class="as-save">${k?'Replace key':'Save key'}</button>${k?'<button class="as-cancel">Remove key</button>':''}</div>
    <p class="prof-note">Get a key at console.anthropic.com. It's stored only in this browser — never in your saved data or anywhere else — and sent only to Anthropic when you analyse a photo. Each photo costs roughly a cent. Works on the live site, not inside the Claude artifact preview.</p>`;
  c.querySelector('.as-save').onclick=()=>{ const val=c.querySelector('[name=key]').value.trim(); if(!/^sk-ant-/.test(val)){ toast('That doesn\'t look like an Anthropic key (sk-ant-…)'); return; }
    try{ localStorage.setItem(AI_KEY_STORE,val); }catch(e){} renderSettings(); toast('API key saved on this device'); };
  const rm=c.querySelector('.as-cancel'); if(rm) rm.onclick=()=>{ try{ localStorage.removeItem(AI_KEY_STORE); }catch(e){} renderSettings(); toast('API key removed'); };
  v.appendChild(c);
}
