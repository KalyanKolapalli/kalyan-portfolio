// cursor
const dot=document.getElementById('dot'),ring=document.getElementById('ring'),lab=ring.querySelector('span');
let mx=innerWidth/2,my=innerHeight/2,rx=mx,ry=my;
addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;dot.style.transform=`translate(${mx-3}px,${my-3}px)`});
(function lp(){rx+=(mx-rx)*.15;ry+=(my-ry)*.15;ring.style.left=rx+'px';ring.style.top=ry+'px';requestAnimationFrame(lp)})();
dot.style.left=dot.style.top='0';dot.style.transform='none';
document.querySelectorAll('[data-c]').forEach(el=>{
 el.addEventListener('mouseenter',()=>{document.body.classList.add(el.hasAttribute('data-lite')?'lite':'hov');lab.textContent=el.dataset.c});
 el.addEventListener('mouseleave',()=>document.body.classList.remove('hov','lite'));
});
// magnetic buttons
document.querySelectorAll('.btn,.links a,.links button').forEach(b=>{
 b.addEventListener('mousemove',e=>{const r=b.getBoundingClientRect();b.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.3}px,${(e.clientY-r.top-r.height/2)*.4}px)`});
 b.addEventListener('mouseleave',()=>b.style.transform='');
});
// split name letters
const n=document.getElementById('name');
n.querySelectorAll('br').length;
[...n.childNodes].forEach(nd=>{
 const wrap=s=>[...s].map(c=>`<span class="ch">${c}</span>`).join('');
 if(nd.nodeType===3){const s=document.createElement('span');s.innerHTML=wrap(nd.textContent);nd.replaceWith(s)}
 else if(nd.classList&&nd.classList.contains('grad')){nd.innerHTML=wrap(nd.textContent)}
});
// typewriter
const words=['payment journeys.','scalable microservices.','accessible UIs.','fast React apps.'];let wi=0,ci=0,del=false;const ty=document.getElementById('typed');
(function t(){const w=words[wi];ty.textContent=w.slice(0,ci);if(!del&&ci<w.length)ci++;else if(del&&ci>0)ci--;else{del=!del;if(!del)wi=(wi+1)%words.length}setTimeout(t,del?40:(ci===w.length?1400:80))})();
// reveal + counters
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');e.target.querySelectorAll('[data-n]').forEach(c=>{let v=0,to=+c.dataset.n;const s=setInterval(()=>{v++;c.textContent=v+'%';if(v>=to)clearInterval(s)},30)});io.unobserve(e.target)}}),{threshold:.15});
document.querySelectorAll('.rv').forEach(el=>io.observe(el));
// progress
addEventListener('scroll',()=>{document.getElementById('prog').style.width=scrollY/(document.body.scrollHeight-innerHeight)*100+'%'});
// spotlight on skills, ripple origin on principles
document.querySelectorAll('.sk').forEach(c=>c.addEventListener('mousemove',e=>{const r=c.getBoundingClientRect();c.style.setProperty('--x',e.clientX-r.left+'px');c.style.setProperty('--y',e.clientY-r.top+'px')}));
document.querySelectorAll('.pr').forEach(c=>c.addEventListener('mouseenter',e=>{const r=c.getBoundingClientRect();c.style.setProperty('--cx',e.clientX-r.left+'px');c.style.setProperty('--cy',e.clientY-r.top+'px')}));
// project tilt + glare
document.querySelectorAll('.pj').forEach(c=>{
 c.addEventListener('mousemove',e=>{const r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;c.style.transform=`rotateX(${(.5-y)*14}deg) rotateY(${(x-.5)*14}deg)`;c.style.setProperty('--gx',x*100+'%');c.style.setProperty('--gy',y*100+'%')});
 c.addEventListener('mouseleave',()=>c.style.transform='');
 });
document.querySelectorAll('.job').forEach(j=>j.addEventListener('click',()=>j.classList.toggle('open')));
// eyes follow cursor
const irises=document.querySelectorAll('.iris'),gz=document.getElementById('gz'),stg=document.querySelector('.eye-stage');
addEventListener('mousemove',e=>{irises.forEach(ir=>{const r=ir.parentElement.getBoundingClientRect(),dx=e.clientX-(r.left+r.width/2),dy=e.clientY-(r.top+r.height/2),a=Math.atan2(dy,dx),d=Math.min(22,Math.hypot(dx,dy)/12);ir.style.transform=`translate(${Math.cos(a)*d}px,${Math.sin(a)*d*.4}px)`});
 if(gz&&stg){const r=stg.getBoundingClientRect(),inside=e.clientX>r.left&&e.clientX<r.right&&e.clientY>r.top&&e.clientY<r.bottom;gz.textContent=inside?'GAZE · LOCKED ✓':'GAZE · LOST ✗';gz.style.color=inside?'':'#ff5c8a'}});

// ===== DEV QUEST game =====
(function(){
const gc=document.getElementById('gc'),box=document.getElementById('game'),x=gc.getContext('2d');
const facts=[['FRONT END','React · Redux · TypeScript · Tailwind · accessible UI'],['BACK END','Java · Spring Boot · Hibernate · Node.js · REST'],['EXPERIENCE','3+ years building web apps & enterprise services'],['SPEED','Cut page-load time ~40% with code splitting & lazy loading'],['ENGAGEMENT','Helped lift user engagement by 35% (React + TS)'],['SCALE','Microservices that improved scalability by 25% at Wipro'],['SHIPPED','Payment integration, secure login & cart — end to end'],['DELIVERY','Jenkins · JFrog · Git · Postman · Agile/Scrum'],['STUDY','MSc Advanced Computer Science — University of Leicester'],['NEW BUILD','Eye Contact Monitor — webcam gaze + gesture tracking'],['BUILT','Access AI accessibility workspace'],['NEXT','Growing in Azure, Google Cloud, Python & C#/.NET']];
const unl=document.getElementById('unl');facts.forEach(f=>{const s=document.createElement('span');s.textContent='🔒 '+f[0];unl.appendChild(s)});
const tags=[...unl.children];
let W,H,dpr=Math.min(devicePixelRatio,2);let K=1;function rs(){const bw=box.clientWidth,bh=box.clientHeight;K=Math.max(1,Math.min(1.8,bh/440));W=bw/K;H=bh/K;gc.width=bw*dpr;gc.height=bh*dpr;x.setTransform(dpr*K,0,0,dpr*K,0,0)}rs();addEventListener('resize',rs);
let ship,orbs,bugs,shots,parts,stars,score,lives,got,run=false,paused=false,tx,ty,keys={},frame=0,inv=0,combo=0;
stars=Array.from({length:80},()=>({x:Math.random(),y:Math.random(),z:Math.random()}));
function reset(){ship={x:W/2,y:H-70,r:16};tx=ship.x;ty=ship.y;orbs=[];bugs=[];shots=[];parts=[];score=0;lives=3;got=new Set();combo=0;stage=1;tags.forEach((t,i)=>{t.className='';t.textContent='🔒 '+facts[i][0]});hud()}
let stage=1;function hud(){document.getElementById('gs').textContent=score;document.getElementById('gl2').textContent=got.size<facts.length?((got.size+1)*1000):'all ✓';document.getElementById('gu').textContent=got.size;const st=1+Math.floor(score/1000);if(st>stage){stage=st;banner('STAGE '+stage)}document.getElementById('gst').textContent=stage;while(got.size<facts.length&&score>=(got.size+1)*1000){const i=got.size;got.add(i);show(i)}}
const C=['#7c6bff','#00e0c0','#ff5c8a','#ffc857'];
function boom(px,py,c,n=18){for(let i=0;i<n;i++){const a=Math.random()*6.3,v=1+Math.random()*4;parts.push({x:px,y:py,vx:Math.cos(a)*v,vy:Math.sin(a)*v,l:40,c})}}
const pop=document.getElementById('gpop');let pt;
function banner2(){pop.innerHTML='<b>⚠ BUG SWARM</b>Unlock is close — survive the swarm!';pop.classList.add('on');clearTimeout(pt);pt=setTimeout(()=>pop.classList.remove('on'),1200)}
function banner(t){pop.innerHTML='<b>LEVEL UP</b>'+t+' — things are speeding up!';pop.classList.add('on');clearTimeout(pt);pt=setTimeout(()=>pop.classList.remove('on'),2200)}
function show(i){pop.innerHTML='<b>🔓 UNLOCKED at '+((i+1)*1000)+' · '+facts[i][0]+'</b>'+facts[i][1];pop.classList.add('on');clearTimeout(pt);pt=setTimeout(()=>pop.classList.remove('on'),2600);tags[i].className='got';tags[i].textContent='✓ '+facts[i][0]+' — '+facts[i][1]}
box.addEventListener('pointermove',e=>{const r=gc.getBoundingClientRect();tx=(e.clientX-r.left)/K;ty=(e.clientY-r.top)/K});
box.addEventListener('pointerdown',()=>{if(run)fire()});
addEventListener('keydown',e=>{if(!run)return;const inView=box.getBoundingClientRect();if(inView.bottom<0||inView.top>innerHeight)return;keys[e.key]=true;if(e.key===' '){e.preventDefault();fire()}if(e.key==='p'||e.key==='P')paused=!paused;if(e.key.startsWith('Arrow'))e.preventDefault()});
addEventListener('keyup',e=>keys[e.key]=false);
function fire(){shots.push({x:ship.x,y:ship.y-18})}
const ov=document.getElementById('gover');
document.getElementById('gstart').onclick=()=>{reset();run=true;ov.classList.add('hide')};
function end(win){run=false;ov.classList.remove('hide');ov.querySelector('h3').textContent=win?'All unlocked! 🎉':'Game over';ov.querySelector('p').innerHTML=win?'You found everything — score <b>'+score+'</b>.<br>Now you know why you should hire me. <a href="#contact" style="color:var(--b)">Say hello →</a>':'Score <b>'+score+'</b> · unlocked '+got.size+'/12.<br>The bugs got you — try again?';document.getElementById('gstart').textContent='↻ Play again'}
function loop(){requestAnimationFrame(loop);frame++;x.clearRect(0,0,W,H);
 stars.forEach(s=>{s.y+=(.0008+s.z*.003)*(run&&!paused?1:.3);if(s.y>1)s.y=0;x.fillStyle=`rgba(255,255,255,${.2+s.z*.6})`;x.fillRect(s.x*W,s.y*H,1+s.z*1.5,1+s.z*1.5)});
 if(!run||paused){if(paused){x.fillStyle='#eef0f7';x.font='600 28px Space Grotesk';x.textAlign='center';x.fillText('Paused — press P',W/2,H/2)}return}
 // input
 if(keys.ArrowLeft)tx-=7;if(keys.ArrowRight)tx+=7;if(keys.ArrowUp)ty-=7;if(keys.ArrowDown)ty+=7;tx=Math.max(20,Math.min(W-20,tx));ty=Math.max(60,Math.min(H-20,ty));
 ship.x+=(tx-ship.x)*.18;ship.y+=(ty-ship.y)*.18;
 const lvl=1+Math.min(3,(stage-1)*.25);
 if(frame%Math.max(24,60-stage*3)===0){const i=Math.random()<.2?1:-1;orbs.push({x:30+Math.random()*(W-60),y:40,v:1.2+Math.random()*lvl,i,c:C[Math.random()*4|0],t:Math.random()*6})}
 const gap=(got.size+1)*1000-score,near=got.size<facts.length&&gap<300,rage=near?(1+(300-gap)/100):1;if(frame%Math.max(8,Math.round(Math.max(30,100-stage*6)/rage))===0)bugs.push({x:30+Math.random()*(W-60),y:40,v:(1.6+Math.random()*lvl*1.2)*(near?1.4:1),w:Math.random()*6});if(near&&frame%90===0)banner2();
 // shots
 shots.forEach(s=>s.y-=9);shots=shots.filter(s=>s.y>40);
 x.fillStyle='#00e0c0';shots.forEach(s=>{x.fillRect(s.x-2,s.y-10,4,12)});
 // orbs
 orbs.forEach(o=>{o.y+=o.v;o.t+=.08;const r=12+Math.sin(o.t)*2;const g=x.createRadialGradient(o.x,o.y,0,o.x,o.y,r*2.2);g.addColorStop(0,o.c);g.addColorStop(1,'transparent');x.fillStyle=g;x.beginPath();x.arc(o.x,o.y,r*2.2,0,7);x.fill();x.fillStyle='#fff';x.beginPath();x.arc(o.x,o.y,r*.45,0,7);x.fill();
  if(o.i>=0){x.fillStyle='#07080d';x.font='bold 11px JetBrains Mono';x.textAlign='center';x.fillText('★',o.x,o.y+4)}
  if(Math.hypot(o.x-ship.x,o.y-ship.y)<r+ship.r){o.dead=1;combo++;score+=10*combo;boom(o.x,o.y,o.c);if(o.i>=0)score+=40;hud()}});
 orbs=orbs.filter(o=>!o.dead&&o.y<H+30);
 // bugs
 bugs.forEach(b=>{b.y+=b.v;b.w+=.15;b.x+=Math.sin(b.w)*1.5;
  x.save();x.translate(b.x,b.y);x.fillStyle='#ff3b5c';x.beginPath();x.ellipse(0,0,11,14,0,0,7);x.fill();x.strokeStyle='#ff3b5c';x.lineWidth=2;for(let k=-1;k<=1;k++){x.beginPath();x.moveTo(-10,k*6);x.lineTo(-17,k*6+Math.sin(b.w*3)*3);x.moveTo(10,k*6);x.lineTo(17,k*6-Math.sin(b.w*3)*3);x.stroke()}x.fillStyle='#07080d';x.fillRect(-1,-14,2,28);x.restore();
  shots.forEach(s=>{if(Math.abs(s.x-b.x)<14&&Math.abs(s.y-b.y)<16){b.dead=1;s.y=-99;score+=25;boom(b.x,b.y,'#ff3b5c',12);hud()}});
  if(!b.dead&&inv<=0&&Math.hypot(b.x-ship.x,b.y-ship.y)<26){b.dead=1;score=Math.max(0,score-400);combo=0;inv=90;boom(ship.x,ship.y,'#ff3b5c',30);hud();box.animate([{transform:'translateX(-8px)'},{transform:'translateX(8px)'},{transform:'none'}],{duration:250})}});
 bugs=bugs.filter(b=>!b.dead&&b.y<H+30);
 // particles
 parts.forEach(p=>{p.x+=p.vx;p.y+=p.vy;p.vx*=.95;p.vy*=.95;p.l--;x.globalAlpha=p.l/40;x.fillStyle=p.c;x.fillRect(p.x,p.y,3,3)});x.globalAlpha=1;parts=parts.filter(p=>p.l>0);
 // ship
 inv--;if(inv>0&&frame%10<5)return;
 x.save();x.translate(ship.x,ship.y);x.rotate((tx-ship.x)*.01);
 const fl=8+Math.random()*8;x.fillStyle='#ffc857';x.beginPath();x.moveTo(-6,14);x.lineTo(0,14+fl);x.lineTo(6,14);x.fill();
 const sg=x.createLinearGradient(0,-20,0,16);sg.addColorStop(0,'#00e0c0');sg.addColorStop(1,'#7c6bff');x.fillStyle=sg;x.beginPath();x.moveTo(0,-22);x.lineTo(16,16);x.lineTo(0,9);x.lineTo(-16,16);x.closePath();x.fill();
 x.fillStyle='#07080d';x.font='bold 9px JetBrains Mono';x.textAlign='center';x.fillText('</>',0,6);x.restore();
 if(combo>1){x.fillStyle='#ffc857';x.font='600 14px Space Grotesk';x.textAlign='left';x.fillText('combo x'+combo,16,H-16)}
}
loop();
})();
// chained flips 1 -> last, with a glowing link line
(function(){const grid=document.getElementById('pgrid'),cards=[...grid.querySelectorAll('.pj')],path=document.getElementById('ppath');let timers=[];
cards.forEach((c,i)=>{const n=document.createElement('div');n.className='num';n.textContent='0'+(i+1);c.appendChild(n)});
function draw(){const g=grid.getBoundingClientRect();const pts=cards.map(c=>{const r=c.getBoundingClientRect();return[r.left-g.left+r.width/2,r.top-g.top+r.height/2]});let d='M'+pts[0][0]+' '+pts[0][1];for(let i=1;i<pts.length;i++){const [x0,y0]=pts[i-1],[x1,y1]=pts[i];d+=y0===y1?` L${x1} ${y1}`:` C${x0} ${(y0+y1)/2} ${x1} ${(y0+y1)/2} ${x1} ${y1}`}path.setAttribute('d',d);const L=path.getTotalLength();path.style.setProperty('--len',L)}
draw();addEventListener('resize',draw);
function clear(){timers.forEach(clearTimeout);timers=[]}
grid.addEventListener('mouseenter',()=>{clear();draw();grid.classList.add('linked');cards.forEach((c,i)=>timers.push(setTimeout(()=>c.classList.add('on'),i*420)))});
grid.addEventListener('mouseleave',()=>{clear();grid.classList.remove('linked');[...cards].reverse().forEach((c,i)=>timers.push(setTimeout(()=>c.classList.remove('on'),i*200)))});
cards.forEach(c=>c.addEventListener('click',()=>c.classList.toggle('on')));
})();
// toolkit chain 1 -> 6
(function(){const grid=document.getElementById('sgrid'),all=[...grid.querySelectorAll('.sk')],path=document.getElementById('spath');let tm=[];let cards=all.slice();
function snake(){const rows={};all.forEach(c=>{const t=Math.round(c.offsetTop/20);(rows[t]=rows[t]||[]).push(c)});const keys=Object.keys(rows).map(Number).sort((a,b)=>a-b);cards=[];keys.forEach((k,ri)=>{const r=rows[k].sort((a,b)=>a.offsetLeft-b.offsetLeft);if(ri%2)r.reverse();cards.push(...r)});cards.forEach((c,i)=>{const n=c.querySelector('.sn');if(n)n.textContent='0'+(i+1)+(i<cards.length-1?' →':' ✓')})}
all.forEach(c=>{const n=document.createElement('span');n.className='sn';c.appendChild(n)});snake();
function draw(){snake();const g=grid.getBoundingClientRect();const p=cards.map(c=>{const r=c.getBoundingClientRect();return[r.left-g.left+r.width/2,r.top-g.top+r.height/2]});let d='M'+p[0].join(' ');for(let i=1;i<p.length;i++){const[a,b]=p[i-1],[c,e]=p[i];d+=b===e?` L${c} ${e}`:` L${a} ${e} L${c} ${e}`}path.setAttribute('d',d);path.style.setProperty('--len',path.getTotalLength())}
draw();addEventListener('resize',draw);
const clr=()=>{tm.forEach(clearTimeout);tm=[]};
grid.addEventListener('mouseenter',()=>{clr();draw();grid.classList.add('linked');cards.forEach((c,i)=>tm.push(setTimeout(()=>c.classList.add('on'),i*300)))});
grid.addEventListener('mouseleave',()=>{clr();grid.classList.remove('linked');cards.forEach(c=>{c.classList.remove('on');c.style.transform=''})});
cards.forEach(c=>{c.addEventListener('mousemove',e=>{if(!c.classList.contains('on'))return;const r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;c.style.transform=`translateY(-14px) rotateX(${-y*12}deg) rotateY(${x*12}deg) scale(1.03)`});c.addEventListener('mouseleave',()=>c.style.transform='')});
})();
// friendly tooltip box under the cursor
(function(){const tip=document.getElementById('tip');const msg={VIEW:"Glad you're checking out my work! 👀",HELLO:"I'd love to hear from you ✉️",FLIP:"Thanks for exploring this project 🚀","TILT UP":"Thanks for exploring this project 🚀",ROLL:"Thanks for exploring this project 🚀",OPEN:"Here's what I worked on 💼",REVEAL:"This is how I like to work 🤝",MAIL:"Drop me a line anytime 💌",COPY:"Click to copy my email 📋",GO:"Let's connect! 🔗",CALL:"Happy to have a chat 📞",PLAY:"Ready? Good luck, the bugs are tough 🐞",REPO:"Have a peek at the code 💻",LIVE:"My newest build, just shipped ✨","✓":"Always learning 🎓"};
let cur=null;addEventListener('mousemove',e=>{tip.style.left=e.clientX+'px';tip.style.top=(e.clientY+26)+'px'});
document.querySelectorAll('[data-c]').forEach(el=>{el.addEventListener('mouseenter',()=>{tip.textContent=msg[el.dataset.c]||"I'm glad you're viewing this 😊";tip.classList.add('on')});el.addEventListener('mouseleave',()=>tip.classList.remove('on'))});
window.__heroTip=on=>{if(on){tip.textContent="Hi, I'm Kalyan 👋 glad you're here!";tip.classList.add('on')}else tip.classList.remove('on')};})();
// copy email
document.getElementById('copy').onclick=()=>{try{navigator.clipboard.writeText('kalyannuru@gmail.com').then(()=>{const t=document.getElementById('toast');t.classList.add('on');setTimeout(()=>t.classList.remove('on'),1800)}).catch(()=>{})}catch(e){}};

// ===== THREE: hero =====
if(window.THREE){
const cv=document.getElementById('gl');
const R=new THREE.WebGLRenderer({canvas:cv,antialias:true,alpha:true});R.setPixelRatio(Math.min(devicePixelRatio,2));
const S=new THREE.Scene(),C=new THREE.PerspectiveCamera(60,1,.1,100);C.position.z=9.5;
function rs(){const w=cv.parentElement.clientWidth,h=cv.parentElement.clientHeight;R.setSize(w,h,false);C.aspect=w/h;C.updateProjectionMatrix()}rs();addEventListener('resize',rs);
const g=new THREE.Group();S.add(g);g.position.x=0;
// ---- galaxy spiral ----
const gal=new THREE.Group();g.add(gal);gal.rotation.x=1.05;gal.scale.setScalar(.82);
const N=14000,gg=new THREE.BufferGeometry(),gp=new Float32Array(N*3),gc=new Float32Array(N*3),base=[];
const inC=new THREE.Color(0xffc857),midC=new THREE.Color(0xff5c8a),outC=new THREE.Color(0x7c6bff),edgeC=new THREE.Color(0x00e0c0);
for(let i=0;i<N;i++){const arm=i%4,r=Math.pow(Math.random(),.65)*4.6,sp=(Math.random()-.5)*Math.pow(Math.random(),2)*1.6;const a=arm*Math.PI/2+r*1.15+sp;
 const y=(Math.random()-.5)*.35*Math.exp(-r*.4);base.push([r,a,y]);gp.set([Math.cos(a)*r,y,Math.sin(a)*r],i*3);
 const t=r/4.6;const c=t<.35?inC.clone().lerp(midC,t/.35):t<.75?midC.clone().lerp(outC,(t-.35)/.4):outC.clone().lerp(edgeC,(t-.75)/.25);gc.set([c.r,c.g,c.b],i*3)}
gg.setAttribute('position',new THREE.BufferAttribute(gp,3));gg.setAttribute('color',new THREE.BufferAttribute(gc,3));
const dotTex=(()=>{const c=document.createElement('canvas');c.width=c.height=64;const x=c.getContext('2d');const gr=x.createRadialGradient(32,32,0,32,32,32);gr.addColorStop(0,'rgba(255,255,255,1)');gr.addColorStop(.35,'rgba(255,255,255,.6)');gr.addColorStop(1,'rgba(255,255,255,0)');x.fillStyle=gr;x.fillRect(0,0,64,64);return new THREE.CanvasTexture(c)})();

// ---- name made of galaxy particles ----
const tpts=[];let textW=1;{const c=document.createElement('canvas');c.width=1400;c.height=520;const x=c.getContext('2d');x.fillStyle='#fff';x.textAlign='center';x.textBaseline='middle';
 x.font='800 100px Space Grotesk, Arial, sans-serif';x.fillText('KALYAN K L N',700,260);
 const d=x.getImageData(0,0,1400,520).data;let minX=1e9,maxX=-1e9;const step=2;for(let yy=0;yy<520;yy+=step)for(let xx=0;xx<1400;xx+=step)if(d[(yy*1400+xx)*4+3]>140){const px=(xx-700)/100,py=-(yy-260)/100;tpts.push([px,py]);minX=Math.min(minX,px);maxX=Math.max(maxX,px)}
 textW=maxX-minX;for(let i=tpts.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[tpts[i],tpts[j]]=[tpts[j],tpts[i]]}}
const jit=new Float32Array(N*3).map(()=>Math.random()-.5);let mix=0,morphDirty=false;
const galMat=new THREE.PointsMaterial({size:.06,vertexColors:true,map:dotTex,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending});gal.add(new THREE.Points(gg,galMat));
const core=new THREE.Sprite(new THREE.SpriteMaterial({map:dotTex,color:0xffc857,transparent:true,blending:THREE.AdditiveBlending,depthWrite:false}));core.scale.setScalar(1.8);g.add(core);
const heroIn=document.querySelector('.hero-in'),bigN=document.getElementById('bigname');heroIn.style.transition='opacity .5s';
// ---- full name letters ----
const letters=[];const lines=['KALYAN','KOLAPALLI'];const gcols=[['#ffc857','#ff5c8a'],['#ff5c8a','#7c6bff'],['#7c6bff','#00e0c0'],['#00e0c0','#4bc0ff'],['#ff7cc8','#ffc857']];
lines.forEach((w,li)=>w.split('').forEach((ch,i)=>{const c=document.createElement('canvas');c.width=c.height=256;const x=c.getContext('2d');x.font='800 210px Space Grotesk, Arial, sans-serif';x.textAlign='center';x.textBaseline='middle';
 const k=letters.length%gcols.length,gr=x.createLinearGradient(40,30,216,226);gr.addColorStop(0,gcols[k][0]);gr.addColorStop(1,gcols[k][1]);
 x.shadowColor=gcols[k][0];x.shadowBlur=40;x.fillStyle=gr;x.fillText(ch,128,140);x.shadowBlur=0;x.lineWidth=4;x.strokeStyle='rgba(255,255,255,.85)';x.strokeText(ch,128,140);
 const sp=new THREE.Sprite(new THREE.SpriteMaterial({map:new THREE.CanvasTexture(c),transparent:true,opacity:0,depthWrite:false,depthTest:false}));
 const sz=li?.62:1.15,gap=li?.56:.98;sp.userData={show:0,sz,hx:(i-(w.length-1)/2)*gap,hy:li?-.75:.45};sp.position.set(sp.userData.hx,sp.userData.hy,1.5);sp.scale.setScalar(.01);sp.renderOrder=10;sp.visible=false;letters.push(sp)}));
const word={length:letters.length};
// underline bar
const bar=new THREE.Mesh(new THREE.PlaneGeometry(1,.04),new THREE.MeshBasicMaterial({color:0x00e0c0,transparent:true,opacity:0,depthTest:false}));bar.position.set(0,-.1,1.5);bar.renderOrder=10;
let revStart=0,leftAt=0,revealing=false,hover=false,hoverT=0,shown=0,lastStep=0,swirl=1;
const hud=document.createElement('div');hud.className='holo-hud mono';hud.innerHTML='<span>hover the glowing centre dot ✦</span><span>it spins faster when you visit</span>';document.getElementById('hero').appendChild(hud);
const ps=new THREE.BufferGeometry(),pa=new Float32Array(1500*3);for(let i=0;i<pa.length;i++)pa[i]=(Math.random()-.5)*34;ps.setAttribute('position',new THREE.BufferAttribute(pa,3));
const pts=new THREE.Points(ps,new THREE.PointsMaterial({size:.03,color:0xffffff,transparent:true,opacity:.5}));S.add(pts);
const m=new THREE.Vector2(-9,-9);
cv.parentElement.addEventListener('mousemove',e=>{const r=cv.getBoundingClientRect();m.x=(e.clientX-r.left)/r.width*2-1;m.y=-(e.clientY-r.top)/r.height*2+1});
cv.parentElement.addEventListener('mouseleave',()=>m.set(-9,-9));
let t=0,rot=0;(function a(){t+=.01;
 const cp=g.position.clone().project(C);const asp=C.aspect;const d=Math.hypot((m.x-cp.x)*asp,m.y-cp.y);const over=d<.12;
 if(over!==!!hover){hover=over;window.__heroTip&&window.__heroTip(over)}
 const now=performance.now();
 if(over){if(!revStart)revStart=now;leftAt=0;shown=Math.min(word.length,Math.floor((now-revStart)/110)+1)}else if(revStart){if(!leftAt)leftAt=now;if(now-leftAt>350){revStart=0;shown=0}}
 const visW0=2*Math.tan(C.fov*Math.PI/360)*(C.position.z-1.5)*C.aspect;var fit=Math.min(.85,visW0*.7/6.2);
 letters.forEach((l,i)=>{const tgt=i<shown?1:0;l.userData.show+=(tgt-l.userData.show)*.18;if(tgt===1&&l.userData.show>.97)l.userData.show=1;const v=l.userData.show;l.material.opacity=v;l.scale.setScalar(.01+v*l.userData.sz*fit);l.position.x=l.userData.hx*fit;l.position.y=l.userData.hy*fit+Math.sin(t*3+i*.6)*.06*v+(1-v)*-.8;l.position.z=1.5+(1-v)*2;l.material.rotation=(1-v)*1.2});
 gal.scale.setScalar(.82*Math.min(1,fit*1.15));bar.position.y=-.1*fit;
 const full=shown>=word.length;heroIn.style.opacity=1;document.querySelector('.scroll').style.opacity=shown>0?0:1;bar.material.opacity+=((full?.9:0)-bar.material.opacity)*.08;bar.scale.x+=((full?7*fit:.01)-bar.scale.x)*.08;bar.material.color.setHSL((t*.1)%1,.8,.6);
 swirl+=((over?1.6:1)-swirl)*.04;rot+=.0025*swirl;gal.rotation.y=rot;
 const pos=gg.attributes.position.array;
 mix+=((over?1:0)-mix)*(over?.05:.07);
 if(mix>.002||morphDirty){morphDirty=mix>.002;
  gal.updateMatrixWorld();const inv=new THREE.Matrix4().copy(gal.matrix).invert().elements;
  const visH=2*Math.tan(C.fov*Math.PI/360)*C.position.z,visW=visH*C.aspect;const hr=cv.getBoundingClientRect(),br=document.querySelector('.btns').getBoundingClientRect();const wpp=visW/hr.width;const L=br.left-hr.left,Rr=hr.width-Math.max(24,br.left-hr.left);const top=br.bottom-hr.top+160,bot=hr.height-24;const sc=Math.min((Rr-L)*wpp/textW,Math.max(30,Math.min(56,(bot-top)*.8))*wpp/.75);const cyp=top+.75*sc/wpp/2+6;const ox=(L/hr.width*2-1)*visW/2+textW*sc/2;const oy=(1-2*cyp/hr.height)*visH/2-g.position.y;
  for(let i=0;i<N;i++){const[r,a0,y]=base[i];const sx=Math.cos(a0)*r,sz=Math.sin(a0)*r;
   const tp=tpts[i%tpts.length];const jx=(jit[i*3])*.006,jy=(jit[i*3+1])*.006,jz=jit[i*3+2]*.01;
   const wx=tp[0]*sc+jx-g.position.x+ox,wy=tp[1]*sc+jy+oy,wz=jz;
   const lx=inv[0]*wx+inv[4]*wy+inv[8]*wz+inv[12],ly=inv[1]*wx+inv[5]*wy+inv[9]*wz+inv[13],lz=inv[2]*wx+inv[6]*wy+inv[10]*wz+inv[14];
   const e=mix*mix*(3-2*mix),d=Math.min(1,Math.max(0,e*1.6-(i%97)/97*.6));
   pos[i*3]=sx+(lx-sx)*d;pos[i*3+1]=y+(ly-y)*d;pos[i*3+2]=sz+(lz-sz)*d}
  gg.attributes.position.needsUpdate=true}
 galMat.size=.06-mix*.01;const wantB=THREE.AdditiveBlending;if(galMat.blending!==wantB){galMat.blending=wantB;galMat.needsUpdate=true}core.material.opacity=1-mix*.85;core.scale.setScalar(1.8+Math.sin(t*3)*.15+(swirl-1)*.35);
 g.rotation.x=(m.y>-5?-m.y*.12:0);g.rotation.y=(m.x>-5?m.x*.15:0);
 pts.rotation.y=t*.03;g.position.y=scrollY/innerHeight*2.2;
 R.render(S,C);requestAnimationFrame(a)})();


}
