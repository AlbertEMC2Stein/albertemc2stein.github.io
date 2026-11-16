"use client";

import { useEffect, useRef } from "react";
import { createGbmSketch } from "../backgrounds/gbm";
import { createNetworkSketch } from "../backgrounds/network";

/** Owns a p5 instance while leaving each sketch's drawing logic independent. */
export default function BackgroundCanvas({ kind, fullBleed = false }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const sketch =
      kind === "gbm" ? createGbmSketch() : createNetworkSketch(kind);
    if (!container || !sketch.enabled) return;

    let disposed = false;
    let instance;
    let observer;
    let ready = false;
    let visible = false;
    let visibilityObserver;
    const context = { kind };
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");

    function size() {
      const { width, height } = container.getBoundingClientRect();
      return {
        width: Math.max(1, Math.round(width)),
        height: Math.max(1, Math.round(height)),
      };
    }

    function resize() {
      if (!ready || !instance) return;
      const { width, height } = size();
      if (instance.width === width && instance.height === height) return;
      instance.resizeCanvas(width, height, true);
      sketch.resize?.(instance, context);
      if (motion.matches) instance.redraw();
    }

    function updateMotion() {
      if (!ready || !instance) return;
      if (!visible || motion.matches) {
        instance.noLoop();
        if (visible) instance.redraw();
      } else {
        instance.loop();
      }
    }

    async function start() {
      const { default: P5 } = await import("p5");
      if (disposed) return;

      instance = new P5((p) => {
        p.setup = () => {
          const { width, height } = size();
          p.pixelDensity(Math.min(window.devicePixelRatio || 1, 2));
          p.createCanvas(width, height);
          sketch.setup?.(p, context);
          ready = true;
          if (!visible || motion.matches) p.noLoop();
        };
        p.draw = () => {
          p.clear();
          sketch.draw?.(p, context);
          container.dataset.animationActive = "true";
        };
      }, container);

      observer = new ResizeObserver(resize);
      observer.observe(container);
      visibilityObserver = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        updateMotion();
      });
      visibilityObserver.observe(container);
      motion.addEventListener("change", updateMotion);
    }

    start().catch((error) => {
      console.error(`Could not start background sketch: ${kind}`, error);
    });

    return () => {
      disposed = true;
      observer?.disconnect();
      visibilityObserver?.disconnect();
      motion.removeEventListener("change", updateMotion);
      instance?.remove();
      delete container.dataset.animationActive;
    };
  }, [kind]);

  return (
    <div
      ref={containerRef}
      className={`background-canvas${fullBleed ? " background-canvas--full-bleed" : ""}`}
      data-background={kind}
      aria-hidden="true"
    />
  );
}
