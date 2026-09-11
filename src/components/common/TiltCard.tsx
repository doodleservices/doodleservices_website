"use client";

import React, { useRef, useState } from "react";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number; // degrees max tilt, default 12
  glare?: boolean;
  onClick?: () => void;
}

export default function TiltCard({
  children,
  className = "",
  intensity = 10,
  glare = true,
  onClick,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});
  const [glareStyle, setGlareStyle] = useState<React.CSSProperties>({});
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotateX = ((y - cy) / cy) * -intensity;
    const rotateY = ((x - cx) / cx) * intensity;

    setStyle({
      transform: `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
      transition: "transform 0.05s linear",
    });

    if (glare) {
      const angle = Math.atan2(y - cy, x - cx) * (180 / Math.PI);
      const dist = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
      const maxDist = Math.sqrt(cx ** 2 + cy ** 2);
      const opacity = (dist / maxDist) * 0.18;
      setGlareStyle({
        background: `linear-gradient(${angle}deg, rgba(255,255,255,${opacity + 0.05}), transparent 60%)`,
        opacity: 1,
      });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setStyle({
      transform: "perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)",
      transition: "transform 0.5s cubic-bezier(0.23,1,0.32,1)",
    });
    setGlareStyle({ opacity: 0 });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseDown = () => setIsPressed(true);
  const handleMouseUp = () => setIsPressed(false);

  return (
    <div
      ref={cardRef}
      className={`relative overflow-hidden ${className}`}
      style={{
        ...style,
        ...(isPressed
          ? { transform: "perspective(900px) scale3d(0.97,0.97,1)", transition: "transform 0.08s" }
          : {}),
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onClick={onClick}
      data-interactive={onClick ? "true" : undefined}
    >
      {children}

      {/* Glare overlay */}
      {glare && (
        <div
          className="absolute inset-0 pointer-events-none z-20 rounded-[inherit]"
          style={{
            ...glareStyle,
            transition: "opacity 0.3s",
          }}
        />
      )}
    </div>
  );
}
