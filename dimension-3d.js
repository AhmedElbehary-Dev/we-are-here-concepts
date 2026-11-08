/* Immersive Dimension — Three.js WebGL sculpture, with graceful fallback */
let dimensionCleanup=()=>{};
window.initDimension3D=async function(){
 dimensionCleanup();
 const canvas=document.getElementById('dimension-canvas');if(!canvas)return;
 const hero=canvas.closest('.hero');
 const fallback=()=>{if(!canvas.isConnected)return;const ctx=canvas.getContext('2d');if(!ctx)return;const dpr=Math.min(devicePixelRatio||1,2);const rect=canvas.getBoundingClientRect();canvas.width=rect.width*dpr;canvas.height=rect.height*dpr;ctx.scale(dpr,dpr);const x=rect.width*.75,y=rect.height*.48;const grad=ctx.createRadialGradient(x,y,10,x,y,Math.min(rect.width,rect.height)*.38);grad.addColorStop(0,'#c5fcf4');grad.addColorStop(.4,'#a28be5');grad.addColorStop(1,'#1b234b');ctx.fillStyle=grad;ctx.beginPath();ctx.arc(x,y,Math.min(rect.width,rect.height)*.31,0,Math.PI*2);ctx.fill()};
 if(!window.WebGLRenderingContext){fallback();return}
 try{
  const THREE=await import('https://esm.sh/three@0.170.0');
  if(!canvas.isConnected)return;
  const renderer=new THREE.WebGLRenderer({canvas,alpha:true,antialias:true,powerPreference:'high-performance'});
  renderer.setPixelRatio(Math.min(devicePixelRatio||1,1.75));
  renderer.outputColorSpace=THREE.SRGBColorSpace;
  const scene=new THREE.Scene();const camera=new THREE.PerspectiveCamera(45,1,.1,100);camera.position.set(0,0,8.5);
  const group=new THREE.Group();group.position.x=1.7;scene.add(group);
  const material=new THREE.MeshPhysicalMaterial({color:0xb1e6ff,metalness:.72,roughness:.13,clearcoat:1,clearcoatRoughness:.09,iridescence:1,iridescenceIOR:1.5,side:THREE.DoubleSide});
  const knot=new THREE.Mesh(new THREE.TorusKnotGeometry(1.5,.47,220,30,2,5),material);group.add(knot);
  const wire=new THREE.Mesh(new THREE.IcosahedronGeometry(2.45,1),new THREE.MeshBasicMaterial({color:0x9dece7,wireframe:true,transparent:true,opacity:.14}));group.add(wire);
  const ringMaterial=new THREE.MeshStandardMaterial({color:0x9c88ff,metalness:.85,roughness:.18,side:THREE.DoubleSide});
  const ring=new THREE.Mesh(new THREE.TorusGeometry(2.8,.027,8,160),ringMaterial);ring.rotation.x=1.2;group.add(ring);
  scene.add(new THREE.AmbientLight(0xb0c8ff,1.3));
  const a=new THREE.PointLight(0x8effe8,85);a.position.set(3,4,5);scene.add(a);
  const b=new THREE.PointLight(0xb68aff,100);b.position.set(-4,-2,2);scene.add(b);
  const c=new THREE.PointLight(0xffffff,45);c.position.set(1,-4,-3);scene.add(c);
  const stars=Array.from({length:120},()=>{const o=new THREE.Mesh(new THREE.SphereGeometry(.018,4,4),new THREE.MeshBasicMaterial({color:Math.random()>.5?0x9cecff:0xb6a2ff}));o.position.set((Math.random()-.5)*16,(Math.random()-.5)*11,-2-Math.random()*5);scene.add(o);return o});
  const resize=()=>{const r=hero.getBoundingClientRect();if(!r.width||!r.height)return;renderer.setSize(r.width,r.height,false);camera.aspect=r.width/r.height;camera.updateProjectionMatrix();group.position.x=r.width<750?.55:1.8;group.scale.setScalar(r.width<750?.7:1)};
  resize();const ro=new ResizeObserver(resize);ro.observe(hero);
  let drag=false,lastX=0,lastY=0,targetX=.15,targetY=.2,scroll=0,raf=0,alive=true;
  const down=e=>{drag=true;lastX=e.clientX;lastY=e.clientY;canvas.setPointerCapture?.(e.pointerId)};
  const move=e=>{if(drag){targetY+=(e.clientX-lastX)*.008;targetX+=(e.clientY-lastY)*.008;lastX=e.clientX;lastY=e.clientY}else if(e.pointerType==='mouse'){targetY=(e.clientX/innerWidth-.5)*.7;targetX=(e.clientY/innerHeight-.5)*.45}};
  const up=()=>{drag=false};
  const onScroll=()=>{scroll=Math.min(1,window.scrollY/Math.max(1,hero.offsetHeight))};
  canvas.addEventListener('pointerdown',down);window.addEventListener('pointermove',move);window.addEventListener('pointerup',up);window.addEventListener('scroll',onScroll,{passive:true});
  const clock=new THREE.Clock();
  const frame=()=>{if(!alive)return;raf=requestAnimationFrame(frame);if(!canvas.isConnected){dimensionCleanup();return}if(document.hidden)return;const reduced=document.body.classList.contains('reduced')||matchMedia('(prefers-reduced-motion: reduce)').matches;const t=clock.getElapsedTime();if(!reduced){group.rotation.x+=(targetX+Math.sin(t*.35)*.12-group.rotation.x)*.035;group.rotation.y+=(targetY+t*.12-group.rotation.y)*.022;wire.rotation.y=-t*.08;ring.rotation.z=t*.13;group.position.y=Math.sin(t*.8)*.13-scroll*.7}else{group.rotation.set(.2,.3,0);wire.rotation.set(0,0,0);ring.rotation.z=0;group.position.y=0}renderer.render(scene,camera)};
  frame();
  dimensionCleanup=()=>{alive=false;cancelAnimationFrame(raf);ro.disconnect();canvas.removeEventListener('pointerdown',down);window.removeEventListener('pointermove',move);window.removeEventListener('pointerup',up);window.removeEventListener('scroll',onScroll);scene.traverse(obj=>{obj.geometry?.dispose();if(obj.material){const materials=Array.isArray(obj.material)?obj.material:[obj.material];materials.forEach(m=>m.dispose())}});renderer.dispose()};
 }catch(err){console.warn('3D fallback activated',err);fallback()}
};
