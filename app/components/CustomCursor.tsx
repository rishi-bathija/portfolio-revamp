"use client";

import { useEffect, useState } from "react";
import { m, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springX = useSpring(cursorX, { damping: 25, stiffness: 250, mass: 0.5 });
  const springY = useSpring(cursorY, { damping: 25, stiffness: 250, mass: 0.5 });

  useEffect(() => {
    // Detect touch devices
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsTouch(true);
      return;
    }

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleEnter = () => setIsVisible(true);
    const handleLeave = () => setIsVisible(false);

    const handleHoverStart = () => setIsHovering(true);
    const handleHoverEnd = () => setIsHovering(false);

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseenter", handleEnter);
    document.addEventListener("mouseleave", handleLeave);

    // Track hover on interactive elements
    const interactiveSelector = "a, button, [role='button'], input, textarea, [data-cursor-hover]";
    const addHoverListeners = () => {
      document.querySelectorAll(interactiveSelector).forEach((el) => {
        el.addEventListener("mouseenter", handleHoverStart);
        el.addEventListener("mouseleave", handleHoverEnd);
      });
    };

    addHoverListeners();
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseenter", handleEnter);
      document.removeEventListener("mouseleave", handleLeave);
      observer.disconnect();
      document.querySelectorAll(interactiveSelector).forEach((el) => {
        el.removeEventListener("mouseenter", handleHoverStart);
        el.removeEventListener("mouseleave", handleHoverEnd);
      });
    };
  }, [cursorX, cursorY, isVisible]);

  if (isTouch) return null;

  return (
    <>
      {/* Outer ring */}
      <m.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full border border-accent/40 mix-blend-difference"
        style={{
          x: springX,
          y: springY,
          width: isHovering ? 48 : 32,
          height: isHovering ? 48 : 32,
          marginLeft: isHovering ? -24 : -16,
          marginTop: isHovering ? -24 : -16,
          opacity: isVisible ? 1 : 0,
          transition: "width 0.2s, height 0.2s, margin 0.2s, opacity 0.15s",
        }}
        aria-hidden
      />
      {/* Inner dot */}
      <m.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full bg-accent mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          width: isHovering ? 8 : 4,
          height: isHovering ? 8 : 4,
          marginLeft: isHovering ? -4 : -2,
          marginTop: isHovering ? -4 : -2,
          opacity: isVisible ? 1 : 0,
          transition: "width 0.15s, height 0.15s, margin 0.15s, opacity 0.15s",
        }}
        aria-hidden
      />
    </>
  );
}
