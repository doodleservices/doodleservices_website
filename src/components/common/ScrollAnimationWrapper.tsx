"use client";

import React, { useEffect, useRef, useState } from "react";

interface ScrollAnimationWrapperProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  once?: boolean;
}

export default function ScrollAnimationWrapper({
  children,
  className = "",
  delay = 0,
  once = true,
}: ScrollAnimationWrapperProps) {
  const domRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const elem = domRef.current;
    if (!elem) return;

    // rootMargin "-50% 0px" bottom means the intersection zone ends at the screen midpoint.
    // Elements only animate in when they've scrolled above the vertical center — never at the bottom.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            // Once revealed, keep section fully stable and visible — zero jumping or flickering
            observer.unobserve(elem);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold: 0,
        rootMargin: "0px 0px -50% 0px",
      }
    );

    observer.observe(elem);

    return () => {
      observer.disconnect();
    };
  }, [once]);

  return (
    <div
      ref={domRef}
      style={{
        transitionDuration: "650ms",
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
        transitionDelay: `${delay}ms`,
      }}
      className={`transition-all will-change-[opacity,transform] ${
        isVisible
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 translate-y-6 scale-[0.99]"
      } ${className}`}
    >
      {children}
    </div>
  );
}
