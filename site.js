
const app = document.querySelector('#app');
const photos = {
  attention:'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?auto=format&fit=crop&w=1100&q=85',
  identity:'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1100&q=85',
  editorial:'https://images.unsplash.com/photo-1543857778-c4a1a3e0b2eb?auto=format&fit=crop&w=1100&q=85',
  space:'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1100&q=85'
};
const links=[
 ['Home','home'],['About Us','about'],['Services','services'],['Portfolio','portfolio'],
 ['Studio','studio'],['Blog','blog'],['Contact Us','contact']
];
const cases=[
 {title:'THE ART OF ATTENTION',category:'CAMPAIGN VISUAL EXPLORATION',image:photos.attention},
 {title:'IDENTITY WITH IMPACT',category:'BRAND IDENTITY EXPLORATION',image:photos.identity},
 {title:'BUILT TO BE SEEN',category:'ART DIRECTION EXPLORATION',image:photos.editorial},
 {title:'SPACE TO STAND OUT',category:'DIGITAL EXPERIENCE EXPLORATION',image:photos.space}
];
const services=[
 ['BRAND STRATEGY & IDENTITY','Make your brand recognizable, relevant, and unmistakably yours.'],
 ['SOCIAL MEDIA & CONTENT','Content that speaks your language and creates real connections.'],
 ['CREATIVE CAMPAIGNS','Ideas designed to capture attention and stay in people’s minds.'],
 ['MEDIA & PRODUCTION','Bring your story to life through visuals, film, and thoughtful production.'],
 ['WEB & DIGITAL EXPERIENCES','Digital touchpoints that look distinctive and work beautifully.'],
 ['PERFORMANCE MARKETING','Clear objectives, smarter campaigns, and measured learning.']
];
const topics=[
 ['01 / BRAND THINKING','YOUR BRAND IS MORE THAN A LOGO.','An upcoming perspective on building a memorable identity.'],
 ['02 / CREATIVE CULTURE','WHY BORING DOESN’T WORK.','Thoughts on standing out in an increasingly crowded feed.'],
 ['03 / DIGITAL EXPERIENCES','MAKE PEOPLE FEEL SOMETHING.','Exploring where creative direction meets digital interaction.']
];
app.innerHTML = `
<main class="page b" id="home">
 <div class="conceptbar"><span>WE ARE HERE — CREATIVE MARKETING AGENCY</span><span>CAIRO, EGYPT / IDEAS MADE TO MATTER</span></div>
 <nav class="site-nav" aria-label="Primary navigation">
  <a class="wordmark" href="#home" aria-label="We Are Here — Home">WE ARE<br>HERE<span>.</span></a>
  <button class="nav-toggle" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="primary-links"><span></span><span></span><span></span></button>
  <div class="links" id="primary-links">
    ${links.map(([label,id])=>`<a href="#${id}" class="${id==='contact'?'cta':''}">${label}${id==='contact'?' ↗':''}</a>`).join('')}
  </div>
 </nav>
 <section class="hero" aria-labelledby="hero-title">
  <div class="sticker">MAKE YOUR<br>MARK.</div><div class="circle"></div>
  <p class="eyebrow">A CREATIVE MARKETING AGENCY — EGYPT</p>
  <h1 id="kinetic"><span>WE ARE</span><span>HERE.</span></h1>
  <p>We help ambitious brands be seen, be remembered, and move people through bold ideas and meaningful marketing.</p>
  <a class="cta" href="#portfolio">EXPLORE OUR WORK ↗</a>
  <p class="scrollnote">↓ SCROLL TO DISCOVER WHAT WE DO</p>
 </section>
 <div class="marquee" aria-hidden="true"><div class="track">BOLD IDEAS <i>✳</i> BRAVE BRANDS <i>✳</i> REAL PRESENCE <i>✳</i> BOLD IDEAS <i>✳</i> BRAVE BRANDS <i>✳</i> REAL PRESENCE <i>✳</i></div></div>
 <section class="manifesto section-pad" id="about">
  <span class="tag reveal">01 / ABOUT US</span>
  <h2 class="reveal">HERE TO<br><span class="lime">MAKE A MARK.</span></h2>
  <p class="subline reveal">We Are Here is an Egyptian creative marketing agency bringing strategy, identity, content, and digital experiences together. We believe being present isn't enough — brands deserve to be memorable.</p>
  <a href="#services" class="section-link reveal">WHAT WE DO ↗</a>
 </section>
 <section class="section-pad portfolio-section portfolio-cascade" id="portfolio" aria-labelledby="portfolio-title">
  <div class="portfolio-cascade-layout">
   <div class="portfolio-cascade-copy">
    <span class="tag reveal">02 / PORTFOLIO · CREATIVE EXPLORATIONS</span>
    <h2 id="portfolio-title" class="reveal">WORK<br>THAT <span>HITS</span><br>DIFFERENT.</h2>
    <p class="portfolio-cascade-intro reveal">Ideas worth a closer look. Move through a collection of creative directions — one card, one bold idea at a time.</p>
    <div class="portfolio-cascade-actions reveal">
     <button type="button" class="portfolio-cascade-primary" id="cascadeExplore">EXPLORE THE DECK <span aria-hidden="true">↗</span></button>
     <div class="portfolio-cascade-arrows" aria-label="Portfolio navigation">
      <button type="button" id="cascadePrev" aria-label="Previous portfolio card">←</button>
      <button type="button" id="cascadeNext" aria-label="Next portfolio card">→</button>
     </div>
    </div>
    <p class="portfolio-cascade-hint">SCROLL OVER THE CARDS · DRAG · USE ARROW KEYS</p>
    <p class="portfolio-cascade-disclaimer">Creative concept studies for demonstration — not client case studies. Approved work can replace these cards.</p>
   </div>
   <div class="portfolio-cascade-stage" id="cascadeStage" tabindex="0" role="region" aria-roledescription="3D portfolio card deck" aria-label="Interactive portfolio: use arrow keys to browse">
    <div class="portfolio-cascade-deck" id="cascadeDeck">
     ${cases.map((p,i)=>`<article class="cascade-card" data-index="${i}" role="button" aria-label="Focus portfolio concept ${i+1}: ${p.title}" tabindex="-1">
      <img src="${p.image}" alt="Illustrative artwork for ${p.title}" loading="lazy" draggable="false">
      <div class="cascade-shade"></div>
      <div class="cascade-card-top"><span>0${i+1} / 0${cases.length}</span><span>CONCEPT STUDY</span></div>
      <div class="cascade-card-bottom"><span>WE ARE HERE / EXPLORATION 0${i+1}</span><h3>${p.title}</h3><p>${p.category}</p></div>
     </article>`).join('')}
    </div>
   </div>
   <div class="portfolio-cascade-rail">
    <div class="portfolio-cascade-index"><strong id="cascadeIndex">01</strong><span> / 0${cases.length}</span></div>
    <div class="portfolio-cascade-track"><span id="cascadeTimelineDot"></span></div>
    <span class="portfolio-cascade-rail-label" id="cascadeChapter">THE ART OF ATTENTION</span>
   </div>
  </div>
  <div class="portfolio-cascade-bottom"><span>WE ARE HERE / PORTFOLIO IN MOTION</span><span id="cascadeLive" aria-live="polite">01 / 0${cases.length} — ${cases[0].title}</span><span>CSS 3D CASCADE · MOTION-LED PRESENTATION</span></div>
 </section>
 <section class="services section-pad" id="services">
  <div class="tag reveal">03 / SERVICES</div>
  <div class="section-head reveal"><h2>BIG IDEAS.<br>REAL MOVEMENT.</h2><p class="subline">From your first brand story to the next campaign — our work is about making every moment count.</p></div>
  ${services.map((s,i)=>`<div class="service reveal"><span>0${i+1}</span><h3>${s[0]}</h3><p class="service-desc">${s[1]}</p><b aria-hidden="true">↗</b></div>`).join('')}
 </section>
 <section class="studio section-pad" id="studio">
  <div class="section-head reveal"><div><span class="tag">04 / STUDIO</span><h2>THE PLACE<br>WE EXPERIMENT.</h2></div><p class="subline">Ideas aren't born in templates. They grow from curiosity, play, and the freedom to try something new.</p></div>
  <div class="studio-grid">
   <div class="studio-stage reveal" id="studio-stage">
    <div class="studio-orbit orbit-one"></div><div class="studio-orbit orbit-two"></div>
    <span class="studio-stamp">MADE TO<br>MOVE ✳</span>
    <strong>YOUR<br>BRAND<br><em>BELONGS</em><br>HERE.</strong>
   </div>
   <div class="studio-intro reveal"><span class="tag">INTERACTIVE STUDIO EXPERIMENT / 01</span><h3>NOT JUST A<br>PRETTY PICTURE.</h3><p>Tap a mood and see a simple brand statement change its energy. A little preview of how creative thinking becomes an experience.</p>
    <div class="studio-modes" role="group" aria-label="Change studio mood"><button class="selected" data-mood="statement" aria-pressed="true">BOLD</button><button data-mood="editorial" aria-pressed="false">EDITORIAL</button><button data-mood="pulse" aria-pressed="false">PULSE</button></div>
    <p class="studio-hint">MOVE YOUR CURSOR OVER THE ARTWORK ✳</p>
   </div>
  </div>
 </section>
 <section class="journal section-pad" id="blog">
  <div class="section-head reveal"><div><span class="tag">05 / BLOG & IDEAS</span><h2>THINGS<br>ON OUR MIND.</h2></div><p class="subline">Notes on branding, creativity, and building a stronger presence. Our editorial space is taking shape.</p></div>
  <div class="journal-grid">${topics.map(t=>`<article class="journal-card reveal"><span class="tag">${t[0]}</span><h3>${t[1]}</h3><p>${t[2]}</p><span class="journal-status">COMING SOON ↗</span></article>`).join('')}</div>
 </section>
 <section class="nextbox" id="contact"><div class="contact-heading"><span class="tag">06 / CONTACT US</span><h2 class="reveal">LET'S BUILD<br>WHAT'S NEXT.</h2><p>Got a brand to grow, a campaign to launch, or an idea too good to ignore? Let's talk.</p></div><a href="https://wearehere-eg.com/" target="_blank" rel="noopener noreferrer" class="cta">CONTACT WE ARE HERE ↗</a></section>
 <footer class="site-footer"><div class="footer-top"><a class="wordmark" href="#home">WE ARE<br>HERE<span>.</span></a><p>Creative thinking. Distinctive presence.<br>Made in Egypt, for brands going places.</p></div>
  <div class="footer-links">${links.map(([label,id])=>`<a href="#${id}">${label}</a>`).join('')}</div>
  <div class="footer-bottom"><span>© ${new Date().getFullYear()} WE ARE HERE. ALL RIGHTS RESERVED.</span><span>CREATIVE WEBSITE CONCEPT · DEVELOPED BY AHMED ELBEHARY</span></div>
 </footer>
</main>
<button class="presenter" type="button" id="motion" aria-pressed="true">✳ MOTION <strong>ON</strong></button>
<div class="cursor" id="cursor" aria-hidden="true"></div>
`;
const navToggle=document.querySelector('.nav-toggle'),navLinks=document.querySelector('#primary-links');
navToggle.addEventListener('click',()=>{
 const open=navLinks.classList.toggle('open');
 navToggle.setAttribute('aria-expanded',String(open));
 navToggle.setAttribute('aria-label',open?'Close menu':'Open menu');
});
navLinks.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
 navLinks.classList.remove('open');navToggle.setAttribute('aria-expanded','false');
}));
document.querySelector('#motion').addEventListener('click',e=>{
 const off=document.body.classList.toggle('reduced');
 e.currentTarget.innerHTML='✳ MOTION <strong>'+(off?'OFF':'ON')+'</strong>';
 e.currentTarget.setAttribute('aria-pressed',String(!off));
});
const revealObserver=new IntersectionObserver(entries=>{
 entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');revealObserver.unobserve(e.target)}})
},{threshold:.10});
document.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));
const cursor=document.querySelector('#cursor');
document.addEventListener('pointermove',e=>{
 if(e.pointerType!=='mouse')return;
 cursor.classList.add('on');cursor.style.left=e.clientX+'px';cursor.style.top=e.clientY+'px';
 cursor.classList.toggle('big',!!e.target.closest('a,button,.project'));
});
const studio=document.querySelector('#studio-stage');
document.querySelectorAll('[data-mood]').forEach(btn=>btn.addEventListener('click',()=>{
 document.querySelectorAll('[data-mood]').forEach(b=>{b.classList.toggle('selected',b===btn);b.setAttribute('aria-pressed',String(b===btn))});
 studio.dataset.mood=btn.dataset.mood;
}));
studio.addEventListener('pointermove',e=>{
 if(document.body.classList.contains('reduced')||e.pointerType!=='mouse')return;
 const r=studio.getBoundingClientRect();
 studio.style.setProperty('--hover-x',((e.clientX-r.left)/r.width-.5)*20+'px');
 studio.style.setProperty('--hover-y',((e.clientY-r.top)/r.height-.5)*20+'px');
});
studio.addEventListener('pointerleave',()=>{studio.style.removeProperty('--hover-x');studio.style.removeProperty('--hover-y')});
