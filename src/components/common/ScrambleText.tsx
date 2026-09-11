"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";

interface ScrambleTextProps {
  text: string;
  className?: string;
  triggerOnHover?: boolean;
  scrambleDuration?: number; // total ms
}

const GLYPHS = "!<>-_\\/[]{}—=+*^?#________01";

export default function ScrambleText({
  text,
  className = "",
  triggerOnHover = true,
  scrambleDuration = 280,
}: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const isScramblingRef = useRef(false);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    setDisplayText(text);
  }, [text]);

  const runScramble = useCallback(() => {
    if (isScramblingRef.current) return;
    isScramblingRef.current = true;

    const original = text;
    const length = original.length;
    const startTime = performance.now();

    const update = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / scrambleDuration);

      const resolvedChars = Math.floor(progress * length);

      let result = "";
      for (let i = 0; i < length; i++) {
        if (original[i] === " " || original[i] === "\n") {
          result += original[i];
        } else if (i < resolvedChars) {
          result += original[i];
        } else {
          result += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }
      }

      setDisplayText(result);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(update);
      } else {
        setDisplayText(original);
        isScramblingRef.current = false;
      }
    };

    frameRef.current = requestAnimationFrame(update);
  }, [text, scrambleDuration]);

  const handleMouseEnter = () => {
    if (triggerOnHover) {
      runScramble();
    }
  };

  useEffect(() => {
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <span
      onMouseEnter={handleMouseEnter}
      className={`inline-block select-none ${className}`}
      data-scramble="true"
    >
      {displayText}
    </span>
  );
}
