// ===== Brain.glb 3D Model Loader (Three.js r128) =====
(function initThree(){
    const root = document.getElementById('threeRoot');
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x003f6c); // خلفية بيضاء مزرقة

    const camera = new THREE.PerspectiveCamera(60, root.clientWidth/root.clientHeight, 0.1, 1000);
    camera.position.set(0, 1.5, 5);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(root.clientWidth, root.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio || 1);
    root.appendChild(renderer.domElement);

    // 🌟 إضاءات
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1.2);
    hemiLight.position.set(0, 20, 0);
    scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(5, 10, 7.5);
    dirLight.castShadow = true;
    scene.add(dirLight);



    // 🟢 تحميل الموديل بتاعك

    const loader = new THREE.GLTFLoader();
    loader.load('Brain.glb', function(gltf){
      const model = gltf.scene;
      model.scale.set(1, 1, 1);
      scene.add(model);

      // fit-to-view
      const box = new THREE.Box3().setFromObject(model);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());

      const maxDim = Math.max(size.x, size.y, size.z);
      const fov = camera.fov * (Math.PI / 180);
      let cameraZ = Math.abs(maxDim / (2 * Math.tan(fov / 2)));
      cameraZ *= 1.5;

      camera.position.set(center.x, center.y + size.y/4, cameraZ);
      camera.lookAt(center);

      controls.target.copy(center);
      controls.update();
    }, undefined, function(error){
      console.error("Error loading model:", error);
    });

    // كنترول
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    controls.autoRotate = true;        // يخلي الموديل يلف لوحده
    controls.autoRotateSpeed = 2.0;    // سرعة اللف (تقدر تغيرها)


    window.addEventListener('resize', () => {
      const w = root.clientWidth, h = root.clientHeight;
      camera.aspect = w/h; 
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    });

    (function animate(){
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    })();
  })();

// ===== Google Form (first definition — overridden below) =====
function openGoogleForm() {
  window.open("https://docs.google.com/forms/...", "_blank");
}

// ===== EmailJS Init & Form Handler =====
(function() {
    emailjs.init("1bEt73CZGGYS141ce");
  })();

  document.getElementById('joinForm').addEventListener('submit', function(event) {
    event.preventDefault();

    emailjs.sendForm('service_x314tq3', 'template_o4qgomi', this)
      .then(function() {
        document.getElementById('formMsg').classList.remove('hidden');
        document.getElementById('joinForm').reset();
        alert('Thank you — we received your question✅');
      }, function(error) {
        console.error('خطأ:', error);
        alert('❌ حصل خطأ: ' + JSON.stringify(error));
      });
  });

// ===== Mobile Menu Toggle =====
    document.getElementById('mobileBtn').addEventListener('click', ()=>{
      const m = document.getElementById('mobileMenu');
      const expanded = m.classList.toggle('hidden') ? 'false' : 'true';
      document.getElementById('mobileBtn').setAttribute('aria-expanded', expanded);
    });

// ===== Google Form (final definition — Airtable) =====
    function openGoogleForm(){ window.open('https://airtable.com/appGI5edDVn84ep9u/pagNgvVSWwZWvbd2t/form','_blank'); }

// ===== Handle Submit =====
    function handleSubmit(e){
      e.preventDefault();
      const data = Object.fromEntries(new FormData(e.target).entries());
      console.log('Application', data);
      e.target.reset();
      const msg = document.getElementById('formMsg');
      msg.classList.remove('hidden');
      setTimeout(()=>msg.classList.add('hidden'),4000);
      // TODO: connect to backend or Google Apps Script to persist applications
    }

// ===== Hide Intro Cinematic =====
    setTimeout(()=>{
      const intro=document.getElementById('intro');
      if(!intro) return;
      intro.style.transition='opacity .8s, transform .9s';
      intro.style.opacity='0';
      intro.style.transform='translateY(-10px)';
      setTimeout(()=>intro.remove(),900);
    },1400);

// ===== Background Particles (Canvas) =====
    (function(){
      const canvas = document.getElementById('bgParticles');
      const ctx = canvas.getContext('2d');
      let w = canvas.width = window.innerWidth;
      let h = canvas.height = window.innerHeight;
      const particles = [];
      function rand(min,max){return Math.random()*(max-min)+min}
      for(let i=0;i<200;i++){
        particles.push({x:rand(0,w),y:rand(0,h),r:rand(0.6,3.2),vx:rand(-0.25,0.25),vy:rand(-0.35,0.35),alpha:rand(0.03,0.22)});
      }
      function resize(){w=canvas.width=window.innerWidth;h=canvas.height=window.innerHeight}
      window.addEventListener('resize',resize);
      function loop(){ctx.clearRect(0,0,w,h);for(const p of particles){p.x+=p.vx;p.y+=p.vy;if(p.x<0)p.x=w;if(p.x>w)p.x=0;if(p.y<0)p.y=h;if(p.y>h)p.y=0;ctx.beginPath();ctx.fillStyle = `rgba(0,63,108,${p.alpha})`;ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill();}requestAnimationFrame(loop)}loop();
    })();

// ===== Parallax (Simple) =====
    (function(){
      const parallaxEls = document.querySelectorAll('[data-depth]');
      function onMove(e){
        const w = window.innerWidth, h = window.innerHeight;
        const x = (e.clientX - w/2)/w; const y = (e.clientY - h/2)/h;
        parallaxEls.forEach(el=>{
          const depth = parseFloat(el.getAttribute('data-depth')||0);
          el.style.transform = `translate3d(${x*depth*40}px, ${y*depth*20}px, 0)`;
        })
      }
      window.addEventListener('mousemove', onMove);
    })();

// ===== Tilt Effect for Cards/Buttons =====
    (function(){
      const tiltEls = document.querySelectorAll('[data-tilt]');
      tiltEls.forEach(el=>{
        el.addEventListener('mousemove', e=>{
          const rect = el.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width; const y = (e.clientY - rect.top) / rect.height;
          const rx = (y - 0.5) * 12; const ry = (x - 0.5) * -12;
          el.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.02)`;
        });
        el.addEventListener('mouseleave', ()=>{ el.style.transform=''; });
      });
    })();

// ===== Intersection Reveal Animations =====
    (function(){
      const els = document.querySelectorAll('section, .project-card');
      const io = new IntersectionObserver((entries)=>{
        entries.forEach(ent=>{
          if(ent.isIntersecting){
            ent.target.style.transition='transform .9s cubic-bezier(.2,.9,.2,1), opacity .9s';
            ent.target.style.transform='translateY(0)';
            ent.target.style.opacity=1;
            io.unobserve(ent.target);
          }
        });
      },{threshold:0.14});
      els.forEach(el=>{ el.style.opacity=0; el.style.transform='translateY(18px)'; io.observe(el); });
    })();

// ===== THREE.JS: Helix + Torus Knot + Micro-Particles + Bloom + Controls =====
    (function(){
      const root = document.getElementById('threeRoot');
      if(!root) return;
      const WIDTH = root.clientWidth; const HEIGHT = root.clientHeight;

      const scene = new THREE.Scene();
      const renderer = new THREE.WebGLRenderer({antialias:true, alpha:true, preserveDrawingBuffer:false});
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(WIDTH, HEIGHT);
      renderer.outputEncoding = THREE.sRGBEncoding;
      root.appendChild(renderer.domElement);

      const camera = new THREE.PerspectiveCamera(42, WIDTH/HEIGHT, 0.1, 1000);
      camera.position.set(0,4,26);

      // Lighting
      const amb = new THREE.AmbientLight(0xffffff, 0.45); scene.add(amb);
      const key = new THREE.PointLight(0xffe6b3, 1.1, 200); key.position.set(18,18,20); scene.add(key);
      const cool = new THREE.PointLight(0x1a6bb5, 0.9, 120); cool.position.set(-18,-10,12); scene.add(cool);

      // HELIX (DNA-like) group
      const helix = new THREE.Group();
      const matGold = new THREE.MeshStandardMaterial({color:0x1a6bb5, metalness:0.7, roughness:0.18});
      const matBlue = new THREE.MeshStandardMaterial({color:0x003f6c, metalness:0.2, roughness:0.22});
      const turns = 5; const beads = 180; const height = 10; const radius = 3.6;
      for(let i=0;i<beads;i++){
        const t = i/beads * Math.PI * 2 * turns;
        const x = Math.cos(t)*radius; const y = (i/beads - 0.5) * height; const z = Math.sin(t)*radius;
        const s = new THREE.Mesh(new THREE.SphereGeometry(0.42, 24, 18), (i%2?matGold:matBlue));
        s.position.set(x,y,z);
        helix.add(s);
      }
      scene.add(helix);

      // connecting rod for visual
      const rodGeo = new THREE.CylinderGeometry(0.06,0.06,height*1.02,12);
      const rodMat = new THREE.MeshStandardMaterial({color:0x081022, metalness:0.2, roughness:0.6});
      const rod = new THREE.Mesh(rodGeo, rodMat); rod.rotation.z = Math.PI/2; helix.add(rod);

      // Torus Knot (complex research-y shape)
      const knotGeo = new THREE.TorusKnotGeometry(2.1, 0.35, 220, 18, 2, 3);
      const knotMat = new THREE.MeshStandardMaterial({color:0x003f6c, metalness:0.45, roughness:0.18, emissive:0x001a30, emissiveIntensity:0.05});
      const knot = new THREE.Mesh(knotGeo, knotMat); knot.position.set(-0.5, -0.8, -2.4);
      knot.scale.set(1.05,1.05,1.05);
      scene.add(knot);

      // Microscope primitive group (symbolic)
      const micro = new THREE.Group();
      const dark = new THREE.MeshStandardMaterial({color:0x0b1220, metalness:0.2, roughness:0.4});
      const metal = new THREE.MeshStandardMaterial({color:0xcfcfd6, metalness:0.9, roughness:0.12});
      const base = new THREE.Mesh(new THREE.BoxGeometry(2.6,0.12,1.6), dark); base.position.set(-8,-4.2,0); micro.add(base);
      const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.12,0.12,2,12), metal); arm.position.set(-7.2,-3,0.4); arm.rotation.z=0.25; micro.add(arm);
      const head = new THREE.Mesh(new THREE.BoxGeometry(0.85,0.85,0.85), dark); head.position.set(-6.4,-2.2,0.4); micro.add(head);
      scene.add(micro);

      // Planet / nucleus
      const planetGeo = new THREE.IcosahedronGeometry(2.6, 4);
      const planetMat = new THREE.MeshStandardMaterial({color:0x003f6c, emissive:0x001a30, emissiveIntensity:0.25, metalness:0.22, roughness:0.22});
      const planet = new THREE.Mesh(planetGeo, planetMat); planet.position.set(8,0,0); scene.add(planet);

      // micro satellites/particles around planet
      const satGroup = new THREE.Group();
      for(let i=0;i<28;i++){
        const s = new THREE.Mesh(new THREE.SphereGeometry(0.08,8,8), new THREE.MeshStandardMaterial({color:0x1a6bb5}));
        s.position.set(8 + Math.cos(i)*3.6, Math.sin(i)*0.8, Math.sin(i*1.2)*3.2);
        satGroup.add(s);
      }
      scene.add(satGroup);

      // small floating research particles (point cloud)
      const partiCount = 220;
      const positions = new Float32Array(partiCount * 3);
      for(let i=0;i<partiCount;i++){
        positions[i*3] = (Math.random()-0.5) * 30;
        positions[i*3+1] = (Math.random()-0.5) * 14;
        positions[i*3+2] = (Math.random()-0.5) * 20;
      }
      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      const pMat = new THREE.PointsMaterial({size:0.06, color:0x1a6bb5, opacity:0.85, transparent:true});
      const points = new THREE.Points(pGeo, pMat);
      scene.add(points);

      // bloom composer
      const composer = new THREE.EffectComposer(renderer);
      const renderPass = new THREE.RenderPass(scene, camera); composer.addPass(renderPass);
      const bloomPass = new THREE.UnrealBloomPass(new THREE.Vector2(WIDTH, HEIGHT), 0.6, 0.6, 0.2);
      bloomPass.strength = 0.9; bloomPass.radius = 0.8; composer.addPass(bloomPass);

      // controls
      const controls = new THREE.OrbitControls(camera, renderer.domElement);
      controls.enableDamping=true; controls.dampingFactor=0.06; controls.autoRotate=false; controls.minDistance=8; controls.maxDistance=80; controls.enablePan=false;

      // subtle initial camera fly-in
      camera.position.set(0,8,44);
      const start = performance.now();
      (function intro(now){
        const elapsed = now - start;
        const p = Math.min(1, elapsed / 1400);
        camera.position.lerpVectors(new THREE.Vector3(0,8,44), new THREE.Vector3(0,4,22), p);
        camera.lookAt(0,0,0);
        if(p < 1) requestAnimationFrame(intro);
      })(start);

      // animate
      let t = 0;
      function animate(){
        requestAnimationFrame(animate);
        t += 0.006;
        helix.rotation.y = t * 0.6;
        helix.rotation.x = Math.sin(t * 0.28) * 0.03;
        knot.rotation.y = Math.sin(t*0.12)*0.6 + t*0.02;
        planet.rotation.y = -t*0.12;
        satGroup.rotation.y = -t*0.36;
        micro.rotation.y = Math.sin(t*0.2)*0.03;
        points.rotation.y += 0.0008;
        controls.update();
        composer.render();
      }
      animate();

      // responsive
      const ro = new ResizeObserver(()=> {
        const W = root.clientWidth, H = root.clientHeight;
        renderer.setSize(W, H);
        composer.setSize(W, H);
        camera.aspect = W / H;
        camera.updateProjectionMatrix();
      });
      ro.observe(root);

      // user hint: subtle tap to auto-rotate
      root.addEventListener('dblclick', ()=>{ controls.autoRotate = !controls.autoRotate; controls.update(); });

    })();
