import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import * as THREE from 'three';
import { SLIDES } from './slides';
import './Hero.css';

/* ── Three.js scene ─────────────────────────────────────────── */
const buildScene = (canvas, container) => {
  const W = container.clientWidth;
  const H = container.clientHeight;
  const scene  = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(55, W / H, 0.1, 100);
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setSize(W, H);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);

  const solidMat = new THREE.MeshLambertMaterial({ color: 0x0B1F3B, transparent: true, opacity: 0.88 });
  const wireMat  = new THREE.LineBasicMaterial({ color: 0xE8781A });
  const redMat   = new THREE.MeshLambertMaterial({ color: 0xC0272D, transparent: true, opacity: 0.92 });
  const craneMat = new THREE.MeshLambertMaterial({ color: 0x607080 });

  const addBuilding = (x, z, bw, bh, bd, isMain = false) => {
    const geo  = new THREE.BoxGeometry(bw, bh, bd);
    const mesh = new THREE.Mesh(geo, solidMat.clone());
    mesh.position.set(x, bh / 2, z);
    scene.add(mesh);
    const wire = new THREE.LineSegments(new THREE.EdgesGeometry(geo), wireMat);
    wire.position.set(x, bh / 2, z);
    scene.add(wire);
    if (isMain) {
      const cap = new THREE.Mesh(new THREE.BoxGeometry(bw + 0.06, 0.12, bd + 0.06), redMat);
      cap.position.set(x, bh + 0.06, z);
      scene.add(cap);
    }
  };

  addBuilding(0,    0,    2.2, 8.5, 2.2, true);
  addBuilding(-3.2, 0.4,  1.8, 5.8, 1.8);
  addBuilding(2.9, -0.8,  1.6, 7.2, 1.6);
  addBuilding(-1.6, 2.6,  1.8, 3.8, 1.8);

  const addBox = (x, y, z, bw, bh, bd, mat) => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(bw, bh, bd), mat);
    m.position.set(x, y, z);
    scene.add(m);
  };

  addBox(1.1,  10.75, 1.1, 0.12, 5.0,  0.12, craneMat);
  addBox(-1.15, 13,   1.1, 4.5,  0.12, 0.12, craneMat);
  addBox(1.95,  13,   1.1, 0.9,  0.12, 0.12, craneMat);
  addBox(2.4, 12.85,  1.1, 0.28, 0.28, 0.28,
    new THREE.MeshLambertMaterial({ color: 0xC0272D, transparent: true, opacity: 0.9 }));

  const grid = new THREE.GridHelper(22, 22, 0xE8781A, 0xD4D0C6);
  grid.material.transparent = true;
  grid.material.opacity = 0.32;
  scene.add(grid);

  const COUNT = 90;
  const pos = new Float32Array(COUNT * 3);
  for (let i = 0; i < COUNT; i++) {
    pos[i * 3]     = (Math.random() - 0.5) * 20;
    pos[i * 3 + 1] = Math.random() * 14;
    pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
  }
  const pGeo = new THREE.BufferGeometry();
  pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const particles = new THREE.Points(pGeo, new THREE.PointsMaterial({ color: 0xE8781A, size: 0.07 }));
  scene.add(particles);

  scene.add(new THREE.AmbientLight(0xA0B0C0, 1.3));
  const dirLight = new THREE.DirectionalLight(0xffffff, 0.9);
  dirLight.position.set(6, 10, 6);
  scene.add(dirLight);
  const ptLight = new THREE.PointLight(0xE8781A, 1.4, 28);
  ptLight.position.set(4, 8, 3);
  scene.add(ptLight);

  let angle = Math.PI * 0.6;
  let rafId = null;
  const animate = () => {
    rafId  = requestAnimationFrame(animate);
    angle += 0.004;
    camera.position.x = Math.sin(angle) * 13;
    camera.position.z = Math.cos(angle) * 13;
    camera.position.y = 5.5 + Math.sin(angle * 0.35) * 1.5;
    camera.lookAt(0, 3, 0);
    particles.rotation.y += 0.001;
    renderer.render(scene, camera);
  };
  animate();

  const onResize = () => {
    const nW = container.clientWidth;
    const nH = container.clientHeight;
    if (!nW || !nH) return;
    camera.aspect = nW / nH;
    camera.updateProjectionMatrix();
    renderer.setSize(nW, nH);
  };
  window.addEventListener('resize', onResize);

  return () => {
    cancelAnimationFrame(rafId);
    window.removeEventListener('resize', onResize);
    renderer.dispose();
    scene.clear();
  };
};

/* ════════════════════════════════════════════════════════════ */
const Hero = () => {
  const containerRef = useRef(null);
  const canvasRef    = useRef(null);
  const rafRef       = useRef(null);

  const hasSlides = SLIDES.length > 0;
  const [slideshowDone, setSlideshowDone] = useState(!hasSlides);
  const [currentSlide,  setCurrentSlide]  = useState(0);
  const [progress,      setProgress]      = useState(0);

  /* Sync body class so Navbar knows slideshow state */
  useEffect(() => {
    if (!slideshowDone && hasSlides) {
      document.body.classList.add('slideshow-active');
    } else {
      document.body.classList.remove('slideshow-active');
    }
    return () => document.body.classList.remove('slideshow-active');
  }, [slideshowDone, hasSlides]);

  const goNext = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    setCurrentSlide(prev => {
      const next = prev + 1;
      if (next >= SLIDES.length) { setSlideshowDone(true); return prev; }
      setProgress(0);
      return next;
    });
  }, []);

  useEffect(() => {
    if (slideshowDone || !hasSlides) return;
    const slide = SLIDES[currentSlide];
    if (!slide || slide.type !== 'image') return;
    const duration  = slide.duration ?? 8000;
    const startTime = performance.now();
    const tick = (now) => {
      const p = Math.min((now - startTime) / duration, 1);
      setProgress(p);
      if (p < 1) { rafRef.current = requestAnimationFrame(tick); }
      else       { goNext(); }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [currentSlide, slideshowDone, hasSlides, goNext]);

  useEffect(() => {
    const canvas    = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    return buildScene(canvas, container);
  }, []);

  const slide = SLIDES[currentSlide];

  return (
    <section className={`hero ${slideshowDone ? 'hero--main' : 'hero--slideshow'}`} id="home">

      {/* Slideshow background */}
      {hasSlides && (
        <div className={`hero__slide-bg${slideshowDone ? ' hero__slide-bg--hidden' : ''}`}>
          {slide?.type === 'image' && (
            <img key={`img-${currentSlide}`} src={slide.src} alt=""
              className="hero__slide-media" draggable={false}/>
          )}
          {slide?.type === 'video' && (
            <video key={`vid-${currentSlide}`} autoPlay muted playsInline
              onEnded={goNext} className="hero__slide-media">
              <source src={slide.src}/>
            </video>
          )}
          <div className="hero__slide-overlay"/>
          {!slideshowDone && (
            <div className="hero__slide-controls">
              <div className="hero__slide-dots">
                {SLIDES.map((_, i) => (
                  <span key={i} className={[
                    'hero__slide-dot',
                    i === currentSlide ? 'hero__slide-dot--active' : '',
                    i  < currentSlide  ? 'hero__slide-dot--done'   : '',
                  ].join(' ')}/>
                ))}
              </div>
              {slide?.type === 'image' && (
                <div className="hero__slide-bar">
                  <div className="hero__slide-bar-fill" style={{ width: `${progress * 100}%` }}/>
                </div>
              )}
              <button className="hero__slide-skip" onClick={() => setSlideshowDone(true)} type="button">
                SKIP INTRO →
              </button>
            </div>
          )}
        </div>
      )}

      {/* LEFT — text */}
      <div className="hero__left">
        <span className="hero__watermark" aria-hidden="true">MP</span>
        <div className="hero__eyebrow">
          <span className="hero__eyebrow-line" aria-hidden="true"/>
          <span className="hero__eyebrow-text">TRUSTED CONSTRUCTION · LAGOS, NIGERIA</span>
        </div>
        <h1 className="hero__title">
          <span className="hero__title--stroke">BUILDING</span>
          <span className="hero__title--solid">EXCELLENCE</span>
          <span className="hero__title--red">WITH</span>
          <span className="hero__title--red">QUALITY</span>
          <span className="hero__title--stroke hero__title--sm">&amp; INTEGRITY</span>
        </h1>
        <p className="hero__sub">
          High-quality construction, civil engineering, renovation, electrical,
          plumbing, and project management — delivered with precision and
          professionalism across Nigeria.
        </p>
        <div className="hero__btns">
          {/* Call us */}
          <a href="tel:08038159214" className="hero__btn hero__btn--primary">
            CALL US TODAY
          </a>
          {/* ← Routes to the dedicated Projects page */}
          <Link to="/projects" className="hero__btn hero__btn--outline">
            VIEW OUR PROJECTS
          </Link>
        </div>
        <div className="hero__badge">
          <span className="hero__badge-dot" aria-hidden="true"/>
          <span className="hero__badge-text">9, AGADE STREET, SABO YABA · LAGOS</span>
        </div>
      </div>

      {/* RIGHT — 3D canvas */}
      <div className="hero__right" ref={containerRef}>
        <div className="hero__grid" aria-hidden="true"/>
        <span className="hero__corner hero__corner--tl" aria-hidden="true"/>
        <span className="hero__corner hero__corner--tr" aria-hidden="true"/>
        <span className="hero__corner hero__corner--bl" aria-hidden="true"/>
        <span className="hero__corner hero__corner--br" aria-hidden="true"/>
        <canvas ref={canvasRef} className="hero__canvas"/>
        <span className="hero__coords" aria-hidden="true">
          LAT 6°31&apos;N · LONG 3°22&apos;E · LAGOS, NIGERIA
        </span>
      </div>
    </section>
  );
};

export default Hero;
