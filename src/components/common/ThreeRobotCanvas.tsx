"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface ThreeRobotCanvasProps {
  className?: string;
  hideHud?: boolean;
}

export default function ThreeRobotCanvas({ className = "", hideHud = false }: ThreeRobotCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const targetRef = useRef({ yaw: 0, pitch: 0 });
  const clickRef = useRef(false);
  const [telemetry, setTelemetry] = useState({ yawDeg: 0, pitchDeg: 0 });

  // High-performance global cursor tracking — instantly computes gaze vector
  useEffect(() => {
    let lastUpdate = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const container = containerRef.current;
      let dx = 0;
      let dy = 0;

      if (container) {
        const rect = container.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Precise vector from the robot's screen position to the mouse pointer
        dx = (e.clientX - centerX) / (window.innerWidth * 0.45);
        dy = (e.clientY - centerY) / (window.innerHeight * 0.45);
      } else {
        dx = (e.clientX / window.innerWidth) * 2 - 1;
        dy = (e.clientY / window.innerHeight) * 2 - 1;
      }

      // Responsive, extended range head rotation
      const targetYaw = Math.max(-1.15, Math.min(1.15, dx * 1.15));
      const targetPitch = Math.max(-0.62, Math.min(0.62, dy * 0.70));

      targetRef.current = {
        yaw: targetYaw,
        pitch: targetPitch,
      };

      // Throttle telemetry update to 15fps to keep DOM light
      const now = performance.now();
      if (now - lastUpdate > 65) {
        lastUpdate = now;
        setTelemetry({
          yawDeg: Math.round(targetYaw * (180 / Math.PI)),
          pitchDeg: Math.round(targetPitch * (180 / Math.PI)),
        });
      }
    };

    const handleMouseDown = () => {
      clickRef.current = true;
      setTimeout(() => {
        clickRef.current = false;
      }, 180);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const w = container.clientWidth || 400;
    const h = container.clientHeight || 400;

    // --- SCENE ---
    const scene = new THREE.Scene();
    scene.background = null;

    // --- CAMERA ---
    const camera = new THREE.PerspectiveCamera(36, w / h, 0.1, 100);
    camera.position.set(0, 0.3, 7.2);
    camera.lookAt(0, 0, 0);

    // --- RENDERER ---
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.4;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;

    // --- LIGHTING ---
    scene.add(new THREE.AmbientLight(0xfff5ee, 1.8));

    const key = new THREE.DirectionalLight(0xffffff, 3.5);
    key.position.set(5, 8, 7);
    key.castShadow = true;
    scene.add(key);

    const fill = new THREE.DirectionalLight(0xc8e8ff, 1.2);
    fill.position.set(-5, 1, 3);
    scene.add(fill);

    const rim = new THREE.DirectionalLight(0xff8844, 0.5);
    rim.position.set(0, -3, -5);
    scene.add(rim);

    // Eye glow light (attached to head group)
    const eyeLight = new THREE.PointLight(0x00e5ff, 3.2, 4.2);
    eyeLight.position.set(0, 0.05, 1.6);

    // --- MATERIALS ---
    const titanium = new THREE.MeshStandardMaterial({ color: 0xe8e4df, metalness: 0.55, roughness: 0.18 });
    const darkMetal = new THREE.MeshStandardMaterial({ color: 0x1a1b22, metalness: 0.80, roughness: 0.28 });
    const orange = new THREE.MeshStandardMaterial({
      color: 0xff7120,
      metalness: 0.35,
      roughness: 0.22,
      emissive: new THREE.Color(0xff4800),
      emissiveIntensity: 0.12,
    });
    const visorMat = new THREE.MeshStandardMaterial({ color: 0x060810, metalness: 0.98, roughness: 0.02 });
    const cyanGlow = new THREE.MeshBasicMaterial({ color: 0x00e5ff });
    const cyanDim = new THREE.MeshBasicMaterial({ color: 0x007aaa });
    const accentOrange = new THREE.MeshBasicMaterial({ color: 0xff7120 });

    // --- HEAD GROUP ---
    const head = new THREE.Group();
    scene.add(head);
    head.add(eyeLight);

    // Cranium
    const cranium = new THREE.Mesh(new THREE.BoxGeometry(2.2, 2.0, 1.95, 4, 4, 4), titanium);
    cranium.castShadow = true;
    head.add(cranium);

    // Top cap
    const topCap = new THREE.Mesh(new THREE.BoxGeometry(2.05, 0.22, 1.88), orange);
    topCap.position.set(0, 1.09, 0.04);
    head.add(topCap);

    // Antenna base
    const antennaBase = new THREE.Mesh(new THREE.CylinderGeometry(0.10, 0.13, 0.25, 12), darkMetal);
    antennaBase.position.set(0, 1.25, 0);
    head.add(antennaBase);

    // Antenna stem
    const antennaStem = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.07, 0.55, 10), darkMetal);
    antennaStem.position.set(0, 1.62, 0);
    head.add(antennaStem);

    // Antenna tip glow ball
    const antennaTip = new THREE.Mesh(new THREE.SphereGeometry(0.11, 16, 16), cyanGlow);
    antennaTip.position.set(0, 1.92, 0);
    head.add(antennaTip);

    const antennaLight = new THREE.PointLight(0x00e5ff, 1.6, 1.0);
    antennaLight.position.set(0, 1.92, 0);
    head.add(antennaLight);

    // Face plate
    const faceplate = new THREE.Mesh(new THREE.BoxGeometry(2.0, 1.72, 0.28), orange);
    faceplate.position.set(0, -0.04, 0.99);
    head.add(faceplate);

    // Visor band
    const visorBand = new THREE.Mesh(new THREE.BoxGeometry(1.72, 0.42, 0.34), visorMat);
    visorBand.position.set(0, 0.07, 1.09);
    head.add(visorBand);

    // Visor inner screen
    const visorInner = new THREE.Mesh(
      new THREE.BoxGeometry(1.60, 0.30, 0.08),
      new THREE.MeshBasicMaterial({ color: 0x020408 })
    );
    visorInner.position.set(0, 0.07, 1.30);
    head.add(visorInner);

    // Eyes with micro-tracking pupils
    const eyeGeo = new THREE.BoxGeometry(0.38, 0.11, 0.08);
    const pupils: THREE.Mesh[] = [];
    const pupilBaseX = [-0.44, 0.44];

    pupilBaseX.forEach((xPos, idx) => {
      const eyeOuter = new THREE.Mesh(eyeGeo, cyanDim);
      eyeOuter.position.set(xPos, 0.07, 1.29);
      head.add(eyeOuter);

      const eyeInner = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.07, 0.09), cyanGlow);
      eyeInner.position.set(xPos, 0.07, 1.30);
      head.add(eyeInner);

      const pupil = new THREE.Mesh(
        new THREE.BoxGeometry(0.08, 0.08, 0.06),
        new THREE.MeshBasicMaterial({ color: 0xffffff })
      );
      pupil.position.set(xPos, 0.07, 1.34);
      head.add(pupil);
      pupils.push(pupil);
    });

    // Brow ridges
    const browGeo = new THREE.BoxGeometry(0.38, 0.09, 0.22);
    [-0.44, 0.44].forEach((xPos) => {
      const brow = new THREE.Mesh(browGeo, darkMetal);
      brow.position.set(xPos, 0.36, 1.08);
      head.add(brow);
    });

    // Mouth grille
    const mouthBase = new THREE.Mesh(new THREE.BoxGeometry(1.05, 0.22, 0.10), darkMetal);
    mouthBase.position.set(0, -0.38, 1.12);
    head.add(mouthBase);

    for (let i = 0; i < 5; i++) {
      const slat = new THREE.Mesh(
        new THREE.BoxGeometry(0.06, 0.14, 0.12),
        new THREE.MeshBasicMaterial({ color: 0x00e5ff })
      );
      slat.position.set(-0.36 + i * 0.18, -0.38, 1.16);
      head.add(slat);
    }

    // Ear panels
    [-1.18, 1.18].forEach((xPos) => {
      const ear = new THREE.Mesh(new THREE.BoxGeometry(0.30, 0.90, 1.05), darkMetal);
      ear.position.set(xPos, -0.02, 0.06);
      head.add(ear);

      const earAccent = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.36, 0.36), orange);
      earAccent.position.set(xPos < 0 ? -1.31 : 1.31, 0.1, 0.15);
      head.add(earAccent);
    });

    // Jaw
    const jaw = new THREE.Mesh(new THREE.BoxGeometry(1.82, 0.32, 1.60), darkMetal);
    jaw.position.set(0, -1.10, 0.03);
    head.add(jaw);

    // Chin stripe
    const chinStripe = new THREE.Mesh(new THREE.BoxGeometry(1.60, 0.08, 0.14), accentOrange);
    chinStripe.position.set(0, -0.96, 1.02);
    head.add(chinStripe);

    // --- STATIC SCENE ELEMENTS (with subtle neck coordination) ---
    // Neck
    const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.52, 0.55, 12), darkMetal);
    neck.position.set(0, -1.52, 0);
    scene.add(neck);

    // Collar ring
    const collar = new THREE.Mesh(new THREE.CylinderGeometry(0.58, 0.58, 0.12, 16), orange);
    collar.position.set(0, -1.75, 0);
    scene.add(collar);

    // Shoulders
    const shoulder = new THREE.Mesh(new THREE.BoxGeometry(3.4, 0.28, 1.4), titanium);
    shoulder.position.set(0, -2.02, 0);
    scene.add(shoulder);

    [-1.4, 1.4].forEach((xPos) => {
      const acc = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.28, 1.2), orange);
      acc.position.set(xPos, -2.02, 0.06);
      scene.add(acc);
    });

    // Ground shadow
    const shadowMesh = new THREE.Mesh(
      new THREE.CircleGeometry(1.6, 40),
      new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.06 })
    );
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.set(0, -2.18, 0);
    scene.add(shadowMesh);

    // --- ANIMATION LOOP (Tight Cursor Sync) ---
    let reqId = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      reqId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Increased lerp speed (0.34) for instantaneous, snappy cursor tracking
      const syncSpeed = 0.34;
      const nodPitch = clickRef.current ? 0.12 : 0;

      head.rotation.y = THREE.MathUtils.lerp(head.rotation.y, targetRef.current.yaw, syncSpeed);
      head.rotation.x = THREE.MathUtils.lerp(head.rotation.x, targetRef.current.pitch + nodPitch, syncSpeed);

      // Natural mechanical head tilt / roll in direction of glance
      head.rotation.z = THREE.MathUtils.lerp(head.rotation.z, -targetRef.current.yaw * 0.14, syncSpeed);

      // Neck coordinates with head yaw
      neck.rotation.y = THREE.MathUtils.lerp(neck.rotation.y, targetRef.current.yaw * 0.32, syncSpeed);

      // Pupils physically track inside visor directly looking at the cursor
      pupils.forEach((pupil, idx) => {
        pupil.position.x = pupilBaseX[idx] + head.rotation.y * 0.07;
        pupil.position.y = 0.07 - head.rotation.x * 0.045;
      });

      // Subtle float
      head.position.y = Math.sin(t * 1.5) * 0.04;

      // Pulse eye & antenna lights (flare when clicking)
      const clickBoost = clickRef.current ? 2.5 : 0;
      eyeLight.intensity = 2.8 + Math.sin(t * 3.4) * 0.6 + clickBoost;
      antennaLight.intensity = 1.2 + Math.sin(t * 5.2) * 0.6 + clickBoost;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const nw = container.clientWidth;
      const nh = container.clientHeight;
      if (nw > 0 && nh > 0) {
        camera.aspect = nw / nh;
        camera.updateProjectionMatrix();
        renderer.setSize(nw, nh);
      }
    };

    const ro = new ResizeObserver(handleResize);
    ro.observe(container);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      ro.disconnect();
      cancelAnimationFrame(reqId);
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full aspect-square overflow-hidden select-none ${className}`}
    >
      {/* Live Precision Tracking Telemetry HUD */}
      {!hideHud && (
        <div className="absolute top-3 left-3 z-20 pointer-events-none flex items-center gap-2 bg-white/95 border border-[#D0C9C3] px-2.5 py-1 shadow-sm backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-[#FF7120] animate-ping" />
          <div className="flex flex-col">
            <span className="font-mono text-[9px] font-black text-[#FF7120] tracking-wider leading-none">
              CURSOR SYNC // LOCKED
            </span>
            <span className="font-mono text-[8px] text-[#888] font-bold mt-0.5">
              AZ: {telemetry.yawDeg >= 0 ? `+${telemetry.yawDeg}` : telemetry.yawDeg}° | EL: {telemetry.pitchDeg >= 0 ? `+${telemetry.pitchDeg}` : telemetry.pitchDeg}°
            </span>
          </div>
        </div>
      )}

      {/* Bot version label */}
      {!hideHud && (
        <div className="absolute bottom-3 right-3 z-20 pointer-events-none bg-white/90 border border-[#E0DDD9] px-2 py-0.5">
          <span className="font-mono text-[9px] font-bold text-[#FF7120] tracking-widest">DOODLE · BOT v3.0</span>
        </div>
      )}

      {/* Three.js canvas */}
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
