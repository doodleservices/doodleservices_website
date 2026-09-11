"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Cpu, RotateCcw, Activity } from "lucide-react";

interface SectionStage {
  id: string;
  number: string;
  name: string;
}

const SECTIONS: SectionStage[] = [
  { id: "hero", number: "01", name: "HERO REACTOR" },
  { id: "services", number: "02", name: "DISCIPLINES" },
  { id: "manifesto", number: "03", name: "MANIFESTO" },
  { id: "pipeline", number: "04", name: "PIPELINE" },
  { id: "work", number: "05", name: "WORKS MATRIX" },
  { id: "pricing", number: "06", name: "SPRINTS" },
  { id: "contact", number: "07", name: "TRANSMISSION" },
];

export default function Interactive3DBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeStage, setActiveStage] = useState<SectionStage>(SECTIONS[0]);
  const [scrollDir, setScrollDir] = useState<"FORWARD" | "REVERSE">("FORWARD");
  const [activeRpm, setActiveRpm] = useState(120);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    // 1. Scene & Perspective Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      120
    );
    camera.position.set(0, 0, 22);

    // 2. WebGL Renderer with Alpha
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);

    // 3. Studio Ambient & Directional Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.6);
    scene.add(ambientLight);

    const orangeKeyLight = new THREE.PointLight(0xff7120, 3.5, 50);
    orangeKeyLight.position.set(6, 12, 12);
    scene.add(orangeKeyLight);

    const cyanFillLight = new THREE.PointLight(0x00f0ff, 2.0, 40);
    cyanFillLight.position.set(-8, -10, 10);
    scene.add(cyanFillLight);

    // 4. Master Machine Group
    const machineMasterGroup = new THREE.Group();
    scene.add(machineMasterGroup);

    // Materials with subtle opacity so all cards and text remain 100% visible
    const wireOrangeMat = new THREE.MeshBasicMaterial({
      color: 0xff7120,
      wireframe: true,
      transparent: true,
      opacity: 0.28,
    });

    const activeOrangeMat = new THREE.MeshStandardMaterial({
      color: 0xff7120,
      metalness: 0.8,
      roughness: 0.2,
      transparent: true,
      opacity: 0.45,
      emissive: 0x3d1400,
    });

    const slateTitaniumMat = new THREE.MeshStandardMaterial({
      color: 0x8a8580,
      metalness: 0.7,
      roughness: 0.3,
      transparent: true,
      opacity: 0.22,
    });

    const cyanRailMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      wireframe: true,
      transparent: true,
      opacity: 0.24,
    });

    // 5. Central Vertical Transmission Spine Rails
    const railGeom = new THREE.CylinderGeometry(0.08, 0.08, 60, 16);
    const leftRail = new THREE.Mesh(railGeom, cyanRailMat);
    leftRail.position.set(-6, 0, -4);
    machineMasterGroup.add(leftRail);

    const rightRail = new THREE.Mesh(railGeom, cyanRailMat);
    rightRail.position.set(6, 0, -4);
    machineMasterGroup.add(rightRail);

    // 6. Kinetic Planetary Gear Turbines & Gyro Rings (animates and reverses on scroll)
    interface MachineModule {
      group: THREE.Group;
      rotor1: THREE.Mesh;
      rotor2: THREE.Mesh;
      pistons: THREE.Mesh[];
      yPos: number;
      baseRotSpeed: number;
      stageIndex: number;
    }

    const machineModules: MachineModule[] = [];
    const stageSpacing = 6.5;

    // Create 7 section-wise machine modules strictly centered along the central vertical axis
    for (let i = 0; i < 7; i++) {
      const modGroup = new THREE.Group();
      const y = 18 - i * stageSpacing;
      // Lock strictly dead-center (x = 0) to prevent any horizontal position change
      modGroup.position.set(0, y, -3);

      // Primary Gear Ring
      const ringGeom = new THREE.TorusGeometry(2.2, 0.08, 12, 48);
      const ringMesh = new THREE.Mesh(ringGeom, wireOrangeMat);
      modGroup.add(ringMesh);

      // Gear teeth
      const toothGeom = new THREE.BoxGeometry(0.12, 0.24, 0.12);
      for (let t = 0; t < 12; t++) {
        const angle = (t / 12) * Math.PI * 2;
        const tooth = new THREE.Mesh(toothGeom, activeOrangeMat);
        tooth.position.set(Math.cos(angle) * 2.2, Math.sin(angle) * 2.2, 0);
        tooth.rotation.z = angle;
        ringMesh.add(tooth);
      }

      // Secondary Inner Gyro Rotor
      const innerGeom = new THREE.TorusGeometry(1.4, 0.06, 12, 36);
      const innerMesh = new THREE.Mesh(innerGeom, slateTitaniumMat);
      innerMesh.rotation.x = Math.PI / 3;
      modGroup.add(innerMesh);

      // Central Hub
      const hubGeom = new THREE.CylinderGeometry(0.4, 0.4, 0.5, 16);
      const hubMesh = new THREE.Mesh(hubGeom, activeOrangeMat);
      hubMesh.rotation.x = Math.PI / 2;
      modGroup.add(hubMesh);

      // 4 Radial Hydraulic Cylinders
      const pistons: THREE.Mesh[] = [];
      const pGeom = new THREE.CylinderGeometry(0.05, 0.05, 1.2, 8);
      for (let p = 0; p < 4; p++) {
        const pAngle = (p / 4) * Math.PI * 2;
        const pMesh = new THREE.Mesh(pGeom, slateTitaniumMat);
        pMesh.rotation.z = pAngle;
        pMesh.position.set(Math.cos(pAngle) * 0.9, Math.sin(pAngle) * 0.9, 0);
        modGroup.add(pMesh);
        pistons.push(pMesh);
      }

      machineMasterGroup.add(modGroup);

      machineModules.push({
        group: modGroup,
        rotor1: ringMesh,
        rotor2: innerMesh,
        pistons,
        yPos: y,
        baseRotSpeed: (0.008 + (i % 3) * 0.004) * (i % 2 === 0 ? 1 : -1),
        stageIndex: i,
      });
    }

    // 7. Scroll Tracking & Kinematics (Supports Bidirectional Scroll & Reverse)
    let lastScrollY = window.scrollY;
    let targetScrollY = window.scrollY;
    let scrollVelocity = 0;

    const onScroll = () => {
      targetScrollY = window.scrollY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    // 8. Section In-View Detection
    const sectionIds = ["hero", "services", "manifesto", "pipeline", "works", "pricing", "contact"];
    const checkActiveSection = () => {
      const scrollPos = window.scrollY + window.innerHeight * 0.45;
      let currentIdx = 0;

      sectionIds.forEach((id, idx) => {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPos >= top) {
            currentIdx = idx;
          }
        }
      });

      if (SECTIONS[currentIdx]) {
        setActiveStage(SECTIONS[currentIdx]);
      }
    };

    // 9. Animation Loop with Full Reverse-Sync Motion (Strictly Centered — NO Horizontal Shift)
    let reqId = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      reqId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth kinematic lerp for scroll
      const deltaScroll = targetScrollY - lastScrollY;
      scrollVelocity = THREE.MathUtils.lerp(scrollVelocity, deltaScroll * 0.004, 0.15);
      lastScrollY = THREE.MathUtils.lerp(lastScrollY, targetScrollY, 0.08);

      // Determine Direction & RPM
      if (Math.abs(deltaScroll) > 1) {
        setScrollDir(deltaScroll > 0 ? "FORWARD" : "REVERSE");
        setActiveRpm(Math.min(360, Math.max(60, Math.round(120 + Math.abs(deltaScroll) * 4))));
      } else {
        setActiveRpm(120);
      }

      // Check active section
      checkActiveSection();

      // Camera strictly locked horizontally (x = 0)
      const scrollProgress = lastScrollY / (document.documentElement.scrollHeight - window.innerHeight || 1);
      const targetCamY = 16 - scrollProgress * 32;
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetCamY, 0.06);
      camera.position.x = 0; // Strictly zero — no horizontal movement

      // Animate Machine Modules (Clockwise on down, Counter-Clockwise on UP / Reverse!)
      machineModules.forEach((m) => {
        const drive = m.baseRotSpeed + scrollVelocity * (m.stageIndex % 2 === 0 ? 1.5 : -1.5);
        m.rotor1.rotation.z += drive;
        m.rotor2.rotation.x += -drive * 1.2;
        m.rotor2.rotation.y += drive * 0.8;

        // Oscillate hydraulic pistons in sync with machine drive
        m.pistons.forEach((p, pIdx) => {
          const osc = Math.sin(elapsed * 2.5 + pIdx * 1.5 + m.rotor1.rotation.z);
          p.scale.set(1, 0.85 + osc * 0.25, 1);
        });

        // Highlight active module
        const isActive = m.stageIndex === SECTIONS.findIndex((s) => s.id === activeStage.id);
        m.group.scale.lerp(
          new THREE.Vector3(isActive ? 1.15 : 0.95, isActive ? 1.15 : 0.95, isActive ? 1.15 : 0.95),
          0.08
        );
      });

      // Machine strictly locked at x = 0 and rotation.y = 0 (no horizontal shift or rotation)
      machineMasterGroup.position.x = 0;
      machineMasterGroup.rotation.y = 0;

      renderer.render(scene, camera);
    };

    animate();

    // 10. Resize Handler
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(reqId);
      renderer.dispose();
    };
  }, [activeStage.id]);

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden" aria-hidden="true">
      {/* 1. Subtle Architectural Vertical Grid Guidelines */}
      <div className="body-lines-wrap opacity-60">
        <div className="body-line" />
        <div className="body-line hidden sm:block" />
        <div className="body-line" />
        <div className="body-line hidden md:block" />
        <div className="body-line" />
      </div>

      {/* 2. 3D WebGL Futuristic Advanced Machine Canvas */}
      <canvas ref={canvasRef} className="w-full h-full" />

      {/* 3. Section Machine Status HUD (Shows Active Module & Reverse-Sync Status) */}
      <div className="fixed bottom-6 right-6 z-20 pointer-events-none hidden md:flex flex-col items-end gap-1 font-mono text-[10px]">
        {/* Active Stage Indicator */}
        <div className="flex items-center gap-2 bg-white/90 border border-[#D0C9C3] px-3 py-1.5 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-[#FF7120] animate-ping" />
          <span className="text-[#141414] font-bold">
            STAGE {activeStage.number} // {activeStage.name}
          </span>
        </div>

        {/* Machine Telemetry Bar */}
        <div className="flex items-center gap-3 bg-[#141418]/90 text-white px-3 py-1 border border-[#333] shadow-sm">
          <div className="flex items-center gap-1 text-[#00F0FF]">
            <Cpu className="w-3 h-3" />
            <span>DIR: {scrollDir}</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1 text-[#FF7120]">
            <Activity className="w-3 h-3" />
            <span>{activeRpm} RPM</span>
          </div>
        </div>

        {/* 7-Stage Visual Step Tracker */}
        <div className="flex items-center gap-1.5 pt-1">
          {SECTIONS.map((sec, idx) => {
            const isActive = sec.id === activeStage.id;
            return (
              <span
                key={sec.id}
                className={`h-1.5 rounded-xs transition-all duration-300 ${
                  isActive
                    ? "w-6 bg-[#FF7120] shadow-[0_0_8px_rgba(255,113,32,0.8)]"
                    : "w-2 bg-[#A8A19B]/40"
                }`}
                title={`Stage ${sec.number}: ${sec.name}`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
