// We Are Here / About Us — motion and navigation, no external runtime.
(() => {
  const navToggle=document.querySelector('.nav-toggle');
  const navLinks=document.querySelector('#primary-links');
  const motionButton=document.querySelector('#motion');
  const progress=document.querySelector('#about-progress');
  const hero=document.querySelector('.about-hero');
  const orbit=document.querySelector('.about-hero-orbit');
  const prefersReduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  const motionOff=()=>document.body.classList.contains('reduced')||prefersReduced.matches;

  if(navToggle&&navLinks){
    const close=()=>{
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded','false');
      navToggle.setAttribute('aria-label','Open menu');
    };
    navToggle.addEventListener('click',()=>{
      const open=navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded',String(open));
      navToggle.setAttribute('aria-label',open?'Close menu':'Open menu');
    });
    navLinks.querySelectorAll('a').forEach(link=>link.addEventListener('click',close));
    document.addEventListener('keydown',e=>{
      if(e.key==='Escape'&&navLinks.classList.contains('open')){close();navToggle.focus()}
    });
  }
  const reveals=[...document.querySelectorAll('.about-reveal')];
  if('IntersectionObserver' in window&&!prefersReduced.matches){
    const observer=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}
      });
    },{threshold:.08,rootMargin:'0px 0px -12px 0px'});
    reveals.forEach(el=>observer.observe(el));
  }else reveals.forEach(el=>el.classList.add('visible'));
  const updateProgress=()=>{
    if(!progress)return;
    const total=Math.max(1,document.documentElement.scrollHeight-window.innerHeight);
    progress.style.transform='scaleX('+Math.min(1,Math.max(0,window.scrollY/total))+')';
  };
  let scrollFrame=0;
  window.addEventListener('scroll',()=>{
    if(scrollFrame)return;
    scrollFrame=requestAnimationFrame(()=>{scrollFrame=0;updateProgress()});
  },{passive:true});
  updateProgress();
  hero?.addEventListener('pointermove',e=>{
    if(e.pointerType!=='mouse'||motionOff()||!orbit)return;
    const bounds=hero.getBoundingClientRect();
    orbit.style.setProperty('--mx',(((e.clientX-bounds.left)/bounds.width)-.5)*26+'px');
    orbit.style.setProperty('--my',(((e.clientY-bounds.top)/bounds.height)-.5)*26+'px');
  },{passive:true});
  hero?.addEventListener('pointerleave',()=>{
    orbit?.style.removeProperty('--mx');
    orbit?.style.removeProperty('--my');
  });
  motionButton?.addEventListener('click',()=>{
    const off=document.body.classList.toggle('reduced');
    if(off)reveals.forEach(el=>el.classList.add('visible'));
    motionButton.innerHTML='✳ MOTION <strong>'+(off?'OFF':'ON')+'</strong>';
    motionButton.setAttribute('aria-pressed',String(!off));
  });
  const respectReduced=()=>{if(prefersReduced.matches)reveals.forEach(el=>el.classList.add('visible'))};
  prefersReduced.addEventListener?.('change',respectReduced);
})();
