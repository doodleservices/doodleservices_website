"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Cpu, Activity, RotateCw } from "lucide-react";

export default function Services3DMachineCore() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rpm, setRpm] = useState(120);
  const [direction, setDirection] = useState<"FORWARD" | "REVERSE">("FORWARD");

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 300;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 9);

    // 2. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 3. Lighting
    const ambient = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambient);

    const orangeLight = new THREE.PointLight(0xff7120, 3.5, 20);
    orangeLight.position.set(2, 3, 5);
    scene.add(orangeLight);

    const cyanLight = new THREE.PointLight(0x00f0ff, 2.5, 20);
    cyanLight.position.set(-3, -2, 4);
    scene.add(cyanLight);

    // 4. Machine Assemblies Group
    const machineGroup = new THREE.Group();
    scene.add(machineGroup);

    // Central Core Reactor Sphere
    const coreGeom = new THREE.IcosahedronGeometry(1.1, 2);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x141418,
      metalness: 0.9,
      roughness: 0.1,
      wireframe: false,
    });
    const coreMesh = new THREE.Mesh(coreGeom, coreMat);
    machineGroup.add(coreMesh);

    // Outer Wireframe Glow Shell
    const coreWireGeom = new THREE.IcosahedronGeometry(1.2, 1);
    const coreWireMat = new THREE.MeshBasicMaterial({
      color: 0xff7120,
      wireframe: true,
      transparent: true,
      opacity: 0.8,
    });
    const coreWire = new THREE.Mesh(coreWireGeom, coreWireMat);
    machineGroup.add(coreWire);

    // Kinetic Outer Ring 1 (Orange Gear Ring)
    const ring1Geom = new THREE.TorusGeometry(2.2, 0.08, 16, 100);
    const ring1Mat = new THREE.MeshStandardMaterial({
      color: 0xff7120,
      metalness: 0.8,
      roughness: 0.2,
      emissive: 0x441500,
    });
    const ring1 = new THREE.Mesh(ring1Geom, ring1Mat);
    machineGroup.add(ring1);

    // Gear teeth on Ring 1
    const toothGeom = new THREE.BoxGeometry(0.16, 0.24, 0.16);
    const teethCount = 18;
    for (let i = 0; i < teethCount; i++) {
      const angle = (i / teethCount) * Math.PI * 2;
      const tooth = new THREE.Mesh(toothGeom, ring1Mat);
      tooth.position.set(Math.cos(angle) * 2.2, Math.sin(angle) * 2.2, 0);
      tooth.rotation.z = angle;
      ring1.add(tooth);
    }

    // Kinetic Middle Ring 2 (Titanium White Gyro)
    const ring2Geom = new THREE.TorusGeometry(2.7, 0.06, 16, 100);
    const ring2Mat = new THREE.MeshStandardMaterial({
      color: 0xf0ede8,
      metalness: 0.6,
      roughness: 0.3,
    });
    const ring2 = new THREE.Mesh(ring2Geom, ring2Mat);
    ring2.rotation.x = Math.PI / 3;
    machineGroup.add(ring2);

    // Kinetic Outer Ring 3 (Cyan Telemetry Rail)
    const ring3Geom = new THREE.TorusGeometry(3.2, 0.04, 16, 100);
    const ring3Mat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.7,
    });
    const ring3 = new THREE.Mesh(ring3Geom, ring3Mat);
    ring3.rotation.y = Math.PI / 4;
    machineGroup.add(ring3);

    // 4 Hydraulic Piston Rods protruding from core
    const pistonPoles: THREE.Mesh[] = [];
    const pistonGeom = new THREE.CylinderGeometry(0.06, 0.06, 1.4, 12);
    const pistonHeadGeom = new THREE.BoxGeometry(0.2, 0.2, 0.2);
    const darkMat = new THREE.MeshStandardMaterial({ color: 0x222228, metalness: 0.9, roughness: 0.2 });

    for (let i = 0; i < 4; i++) {
      const pGroup = new THREE.Group();
      const angle = (i / 4) * Math.PI * 2;
      pGroup.rotation.z = angle;

      const pole = new THREE.Mesh(pistonGeom, darkMat);
      pole.position.y = 1.7;
      pGroup.add(pole);

      const head = new THREE.Mesh(pistonHeadGeom, ring1Mat);
      head.position.y = 2.4;
      pGroup.add(head);

      machineGroup.add(pGroup);
      pistonPoles.push(pole);
    }

    // Interactive Mouse & Scroll Velocity Tracking
    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.targetX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.targetY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    };

    const onScroll = () => {
      const currentScroll = window.scrollY;
      const delta = currentScroll - lastScrollY;
      scrollVelocity = delta * 0.005;
      lastScrollY = currentScroll;

      if (Math.abs(delta) > 2) {
        setDirection(delta > 0 ? "FORWARD" : "REVERSE");
        setRpm(Math.min(380, Math.max(60, Math.round(120 + Math.abs(delta) * 8))));
      }
    };

    container.addEventListener("mousemove", onMouseMove);
    window.addEventListener("scroll", onScroll, { passive: true });

    // Animation Loop
    let reqId = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      reqId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Kinematic decay for scroll velocity
      scrollVelocity *= 0.92;

      // Base rotation + scroll-driven rotation (with reverse support!)
      const deltaRot = 0.012 + scrollVelocity;
      ring1.rotation.z += deltaRot * 1.5;
      ring2.rotation.x += -deltaRot * 1.2;
      ring2.rotation.y += deltaRot * 0.8;
      ring3.rotation.y += deltaRot * 2.0;
      coreWire.rotation.y += deltaRot;
      coreWire.rotation.x += -deltaRot * 0.5;

      // Piston oscillation
      pistonPoles.forEach((p, idx) => {
        p.position.y = 1.6 + Math.sin(elapsed * 3 + idx * 1.5) * 0.2;
      });

      // Mouse Parallax
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      machineGroup.rotation.x = mouse.y * 0.35;
      machineGroup.rotation.y = mouse.x * 0.45;

      // Pulse lighting
      orangeLight.intensity = 3.0 + Math.sin(elapsed * 4) * 1.2;

      renderer.render(scene, camera);
    };

    animate();

    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", onResize);

    return () => {
      container.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(reqId);
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-64 sm:h-72 lg:h-80 bg-gradient-to-b from-[#18181D] to-[#0D0D10] border border-[#2E2E38] overflow-hidden group select-none"
    >
      {/* 3D WebGL Canvas */}
      <canvas ref={canvasRef} className="w-full h-full object-cover" />

      {/* Top Precision HUD Badges */}
      <div className="absolute top-3 left-3 z-20 pointer-events-none flex items-center gap-2">
        <div className="flex items-center gap-1.5 px-2 py-0.5 bg-[#141418]/90 border border-[#FF7120]/60 font-mono text-[9px] text-[#FF7120]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF7120] animate-ping" />
          <span>3D CORE // SYNCHRONOUS</span>
        </div>
        <div className="hidden sm:flex items-center gap-1 px-2 py-0.5 bg-black/60 border border-[#333] font-mono text-[9px] text-[#A0A0A0]">
          <Cpu className="w-3 h-3 text-[#00F0FF]" />
          <span>DIR: {direction}</span>
        </div>
      </div>

      {/* Rotating High-Tech Corner Reticle */}
      <div className="absolute top-3 right-3 z-20 pointer-events-none">
        <div className="relative w-8 h-8 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-dashed border-[#FF7120]/50 animate-spin" style={{ animationDuration: "14s" }} />
          <RotateCw className="w-3.5 h-3.5 text-[#FF7120]" />
        </div>
      </div>

      {/* Bottom Live RPM Telemetry Bar */}
      <div className="absolute bottom-3 left-3 right-3 z-20 pointer-events-none flex items-center justify-between font-mono text-[9px]">
        <div className="flex items-center gap-2 px-2.5 py-1 bg-[#141418]/90 border border-[#333] text-white">
          <Activity className="w-3 h-3 text-emerald-400" />
          <span>VELOCITY: {rpm} RPM</span>
        </div>
        <div className="px-2 py-1 bg-[#FF7120] text-black font-bold">
          SCROLL-SYNC ACTIVE
        </div>
      </div>
    </div>
  );
}
