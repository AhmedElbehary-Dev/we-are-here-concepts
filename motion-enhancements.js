
/* We Are Here — Motion Lab v2. Visual experiments, not client case studies. */
(()=> {
const reduced=()=>document.body.classList.contains('reduced')||matchMedia('(prefers-reduced-motion: reduce)').matches;
let cleanup=()=>{},active='';
const clamp=(v,a,b)=>Math.min(b,Math.max(a,v));
function setup(){
 cleanup(); const page=document.querySelector('.page'); if(!page)return;
 active=page.classList.contains('b')?'bold':page.classList.contains('p')?'premium':page.classList.contains('d')?'immersive':'playful';
 const handlers=[],listeners=[],observers=[];
 const on=(el,type,fn,opts)=>{el?.addEventListener(type,fn,opts);if(el)listeners.push(()=>el.removeEventListener(type,fn,opts))};
 const add=(el,cls)=>el?.classList.add(cls);
 const motion=document.createElement('div');motion.className='motion-scene';
 page.appendChild(motion);
 const progress=document.createElement('div');progress.className='motion-progress';document.body.appendChild(progress);
 const toast=document.createElement('div');toast.className='motion-toast';toast.setAttribute('role','status');document.body.appendChild(toast);
 const pop=(msg)=>{toast.textContent=msg;toast.classList.add('show');clearTimeout(pop.timer);pop.timer=setTimeout(()=>toast.classList.remove('show'),1500)};
 let raf=0;
 function tick(){raf=0;if(reduced())return;const y=window.scrollY,range=Math.max(1,document.documentElement.scrollHeight-innerHeight);progress.style.transform=`scaleX(${y/range})`;const hero=page.querySelector('.hero');if(hero){let ratio=clamp(y/Math.max(hero.offsetHeight,1),0,1);hero.style.setProperty('--scroll',ratio)}if(active==='premium'){page.querySelectorAll('.hero-art img,.orb,.outline').forEach((el,i)=>el.style.translate=`0 ${Math.round(y*[.12,-.08,.06][i])}px`)}if(active==='bold'){page.querySelectorAll('.manifesto h2,.section-head h2').forEach((el,i)=>el.style.setProperty('--swing',`${Math.sin(y/240+i)*1.7}deg`))}} 
 on(window,'scroll',()=>{if(!raf)raf=requestAnimationFrame(tick)},{passive:true});tick();
 const split=(el)=>{if(!el||el.dataset.motionSplit)return;const txt=el.textContent;el.dataset.motionSplit='1';el.setAttribute('aria-label',txt);el.innerHTML=[...txt].map((ch,i)=>ch===' '?' ':`<span class="motion-letter" aria-hidden="true" style="--i:${i}">${ch}</span>`).join('')};
 if(active==='bold'){
   const h=page.querySelector('#kinetic');h?.querySelectorAll('span').forEach(split);
   page.querySelectorAll('.service').forEach((el,i)=>{const badge=document.createElement('span');badge.className='service-ghost';badge.textContent=['✳','↗','◎','✦'][i%4];el.appendChild(badge)});
   on(page,'pointermove',e=>{if(reduced()||e.pointerType!=='mouse')return;const hero=page.querySelector('.hero');if(hero?.contains(e.target)){hero.style.setProperty('--mx',`${(e.clientX/innerWidth-.5)*42}px`);hero.style.setProperty('--my',`${(e.clientY/innerHeight-.5)*32}px`)}});
   const burst=document.createElement('button');burst.className='motion-burst';burst.textContent='BREAK THE RULES ✳';burst.type='button';page.querySelector('.hero')?.appendChild(burst);
   on(burst,'click',()=>{if(reduced())return;page.classList.remove('bold-shock');void page.offsetWidth;page.classList.add('bold-shock');pop('CHAOS MODE ACTIVATED');setTimeout(()=>page.classList.remove('bold-shock'),1250)});
 }
 if(active==='premium'){
   page.querySelectorAll('.hero-copy h1,.section-head h2').forEach(el=>add(el,'cinematic-title'));
   const work=page.querySelector('#work .workgrid');
   if(work){work.classList.add('film-strip');const note=document.createElement('p');note.className='film-note';note.textContent='HOVER TO REVEAL · SCROLL TO EXPLORE';work.before(note)}
   const spot=document.createElement('div');spot.className='cinematic-spotlight';page.appendChild(spot);
   on(page,'pointermove',e=>{if(reduced()||e.pointerType!=='mouse')return;spot.style.setProperty('--x',e.clientX+'px');spot.style.setProperty('--y',e.clientY+'px')});
 }
 if(active==='playful'){
   const hero=page.querySelector('.hero');
   const words=['WOW!','HELLO!','BIG IDEA!','✳','GO!'];
   for(let i=0;i<7;i++){const s=document.createElement('span');s.className='float-sticker';s.textContent=words[i%words.length];s.style.cssText=`--n:${i};--rot:${i*31-70}deg;--left:${8+(i*13)%83}%;--top:${8+(i*17)%72}%;`;hero?.appendChild(s)}
   const toy=document.createElement('div');toy.className='motion-toy';toy.innerHTML='<button type="button" class="toy-launch">MAKE SOME NOISE ✳</button><span class="toy-count">0 EXPLOSIONS</span>';page.querySelector('#lab .labtool')?.appendChild(toy);
   let count=0;
   on(toy.querySelector('button'),'click',()=>{if(reduced())return;count++;toy.querySelector('.toy-count').textContent=`${count} EXPLOSION${count===1?'':'S'}`;for(let i=0;i<18;i++){const star=document.createElement('i');star.className='confetti';star.textContent=['✦','●','★','✳'][i%4];star.style.cssText=`--angle:${i*20}deg;--distance:${90+Math.random()*180}px;--delay:${Math.random()*.12}s;`;toy.appendChild(star);setTimeout(()=>star.remove(),1100)}pop('CREATIVITY UNLEASHED!')});
   const poster=page.querySelector('#poster');
   on(poster,'pointermove',e=>{if(reduced()||e.pointerType!=='mouse')return;const r=poster.getBoundingClientRect();poster.style.transform=`perspective(600px) rotateX(${((e.clientY-r.top)/r.height-.5)*-18}deg) rotateY(${((e.clientX-r.left)/r.width-.5)*18}deg)`});
   on(poster,'pointerleave',()=>poster.style.transform='');
 }
 // Shared interactive hover previews + reveal scale.
 page.querySelectorAll('.project').forEach((el,i)=>{
   const tag=document.createElement('span');tag.className='motion-view';tag.textContent='VIEW CONCEPT ↗';el.querySelector('.imagewrap')?.appendChild(tag);
   on(el,'pointermove',e=>{if(reduced()||e.pointerType!=='mouse')return;const r=el.getBoundingClientRect();el.style.setProperty('--px',`${(e.clientX-r.left)/r.width*100}%`);el.style.setProperty('--py',`${(e.clientY-r.top)/r.height*100}%`);el.style.setProperty('--rx',`${((e.clientY-r.top)/r.height-.5)*-9}deg`);el.style.setProperty('--ry',`${((e.clientX-r.left)/r.width-.5)*9}deg`)});
   on(el,'pointerleave',()=>{el.style.removeProperty('--rx');el.style.removeProperty('--ry')});
 });
 page.querySelectorAll('.cta').forEach(el=>{el.classList.add('magnetic');on(el,'pointermove',e=>{if(reduced()||e.pointerType!=='mouse')return;const r=el.getBoundingClientRect();el.style.setProperty('--magx',`${(e.clientX-r.left-r.width/2)*.16}px`);el.style.setProperty('--magy',`${(e.clientY-r.top-r.height/2)*.2}px`)});on(el,'pointerleave',()=>{el.style.removeProperty('--magx');el.style.removeProperty('--magy')})});
 cleanup=()=>{listeners.forEach(fn=>fn());observers.forEach(o=>o.disconnect());cancelAnimationFrame(raf);progress.remove();toast.remove();motion.remove();page.querySelectorAll('.float-sticker,.motion-burst,.motion-view,.motion-toy,.service-ghost,.film-note,.cinematic-spotlight').forEach(e=>e.remove());page.querySelectorAll('.project,.cta').forEach(e=>e.removeAttribute('style'))};
}
const obs=new MutationObserver(()=>{const page=document.querySelector('.page');if(!page)return;const type=page.classList.contains('b')?'bold':page.classList.contains('p')?'premium':page.classList.contains('d')?'immersive':'playful';if(type!==active)setup()});
obs.observe(document.querySelector('#app'),{childList:true});
setup();
})();
