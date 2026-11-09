/*
 * We Are Here: 3D portfolio cascade
 * Adapted from user-supplied "In Freefall" card deck interaction.
 * Scoped to the portfolio stage. Never intercepts page-wide wheel or keyboard input.
 */
(() => {
 const stage=document.getElementById('cascadeStage');
 const deck=document.getElementById('cascadeDeck');
 if(!stage||!deck)return;
 const cards=[...deck.querySelectorAll('.cascade-card')];
 const count=cards.length;
 if(!count)return;
 const prev=document.getElementById('cascadePrev');
 const next=document.getElementById('cascadeNext');
 const explore=document.getElementById('cascadeExplore');
 const indexLabel=document.getElementById('cascadeIndex');
 const chapter=document.getElementById('cascadeChapter');
 const live=document.getElementById('cascadeLive');
 const dot=document.getElementById('cascadeTimelineDot');
 const track=document.querySelector('.portfolio-cascade-track');
 let target=0,current=0,raf=0,snapTimer=0,dragging=false,dragDistance=0,startPointer=0,startTarget=0,pointerId=null,lastIndex=-1;
 const reduced=()=>document.body.classList.contains('reduced')||window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
 const label=i=>String(i+1).padStart(2,'0');
 const activeIndex=()=>clamp(Math.round(current),0,count-1);
 function setTarget(value){
   target=clamp(value,0,count-1);
   if(reduced()){current=target;render();return}
   startAnimation();
 }
 function syncUI(active){
   if(active===lastIndex)return;
   lastIndex=active;
   const selected=cards[active];
   const title=selected.querySelector('h3')?.textContent||'PORTFOLIO';
   indexLabel.textContent=label(active);
   chapter.textContent=title;
   live.textContent=`${label(active)} / ${label(count)} — ${title}`;
   prev.disabled=active===0;
   next.disabled=active===count-1;
   cards.forEach((card,i)=>{
     const selected=i===active;
     card.dataset.active=String(selected);
     card.tabIndex=selected?0:-1;
     card.setAttribute('aria-pressed',String(selected));
   });
 }
 function render(){
   const active=activeIndex();
   syncUI(active);
   const fraction=count===1?0:clamp(current/(count-1),0,1);
   if(track && getComputedStyle(track).height!== '2px'){
     dot.style.top=`${fraction*100}%`;
     dot.style.left='';
   }else{
     dot.style.left=`${fraction*100}%`;
     dot.style.top='';
   }
   for(let i=0;i<count;i++){
     const card=cards[i],offset=i-current;
     let y=0,z=0,rot=0,scale=1,opacity=1,blur=0,stack=100;
     if(offset>=0){
       const d=Math.min(offset,6);
       y=-d*32;z=-d*110;rot=d*18;
       scale=Math.max(.70,1-d*.05);
       opacity=Math.max(0,1-d*.18);
       stack=100-Math.round(offset*10);
       blur=Math.max(0,(d-1)*2.2);
       if(offset<.2){rot=offset*25;y=-offset*30;z=0;scale=1;opacity=1;blur=0}
     }else{
       const d=Math.abs(offset);
       y=d*340;z=d*60;rot=-d*48;
       scale=1+d*.08;
       opacity=Math.max(0,1-d*.85);
       stack=200+Math.round(d*10);
       blur=d*3;
     }
     card.style.transform=`translate3d(0, ${y.toFixed(2)}px, ${z.toFixed(2)}px) rotateX(${rot.toFixed(2)}deg) scale(${scale.toFixed(3)})`;
     card.style.opacity=opacity.toFixed(3);
     card.style.zIndex=String(stack);
     card.style.filter=blur>.4?`blur(${blur.toFixed(1)}px)`:'none';
     card.style.borderColor=Math.abs(offset)<.45?'#e6c4af':'#c9ab9344';
     card.style.boxShadow=Math.abs(offset)<.45?'0 35px 65px -10px #000a, 0 0 30px #c9ab9333':'0 15px 35px -10px #0009';
   }
 }
 function step(){
   raf=0;
   if(reduced()){current=target;render();return}
   current+=(target-current)*.12;
   if(Math.abs(target-current)<.002){current=target;render();return}
   render();startAnimation();
 }
 function startAnimation(){if(!raf)raf=requestAnimationFrame(step)}
 function move(delta){
   if(!delta)return;
   setTarget(Math.round(target)+delta);
 }
 function snap(){
   clearTimeout(snapTimer);
   snapTimer=window.setTimeout(()=>setTarget(Math.round(target)),155);
 }
 // Wheel moves cards only when this deck can advance; otherwise normal page scrolling resumes.
 stage.addEventListener('wheel',e=>{
   if(reduced())return;
   const dy=e.deltaY;
   if(!dy)return;
   if((dy>0 && target>=count-1-.01)||(dy<0 && target<=.01))return;
   e.preventDefault();
   setTarget(target+dy*.0035);
   snap();
 },{passive:false});
 stage.addEventListener('pointerdown',e=>{
   if(e.button!==undefined&&e.button!==0)return;
   if(reduced())return;
   dragging=true;dragDistance=0;pointerId=e.pointerId;
   startPointer=e.pointerType==='touch'?e.clientX:e.clientY;
   startTarget=target;
   if(e.pointerType==='mouse')stage.setPointerCapture?.(e.pointerId);
 });
 stage.addEventListener('pointermove',e=>{
   if(!dragging||pointerId!==e.pointerId)return;
   const p=e.pointerType==='touch'?e.clientX:e.clientY;
   dragDistance=p-startPointer;
   if(Math.abs(dragDistance)>4)setTarget(startTarget-dragDistance*.0045);
 });
 const endDrag=()=>{
   if(!dragging)return;
   dragging=false;pointerId=null;setTarget(Math.round(target));
 };
 stage.addEventListener('pointerup',endDrag);
 stage.addEventListener('pointercancel',endDrag);
 stage.addEventListener('lostpointercapture',endDrag);
 stage.addEventListener('keydown',e=>{
   if(['ArrowDown','ArrowRight','PageDown'].includes(e.key)){e.preventDefault();move(1)}
   else if(['ArrowUp','ArrowLeft','PageUp'].includes(e.key)){e.preventDefault();move(-1)}
   else if(e.key==='Home'){e.preventDefault();setTarget(0)}
   else if(e.key==='End'){e.preventDefault();setTarget(count-1)}
 });
 cards.forEach((card,i)=>{
   card.addEventListener('click',()=>{if(dragDistance<8 && dragging===false)setTarget(i)});
 });
 prev?.addEventListener('click',()=>move(-1));
 next?.addEventListener('click',()=>move(1));
 explore?.addEventListener('click',()=>{stage.focus({preventScroll:true});move(1)});
 // Keep timeline feedback responsive when resizing from desktop to mobile.
 window.addEventListener('resize',render,{passive:true});
 const reduceObserver=new MutationObserver(()=>{if(reduced()){current=target;render()}});
 reduceObserver.observe(document.body,{attributes:true,attributeFilter:['class']});
 render();
})();
