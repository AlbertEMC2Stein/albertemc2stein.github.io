"use client";

import { useEffect, useRef, useState } from "react";
import katex from "katex";
import { equations } from "../data/equations";
import { placeFormula } from "../backgrounds/formulaLayout";

const renderedEquations = equations.map((equation) =>
  katex.renderToString(equation, { throwOnError: true, output: "html" }),
);

/** A decorative, non-interactive layer for the dark sections. */
export default function FormulaBackground({ count = 10 }) {
  const containerRef = useRef(null);
  const measurementRef = useRef(null);
  const layoutRef = useRef({
    panel: { width: 0, height: 0 },
    measurements: [],
  });
  const [formulas, setFormulas] = useState([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let fontsReady = false;
    const container = containerRef.current;
    const measurement = measurementRef.current;
    if (!container || !measurement) return;

    function reflow() {
      if (!fontsReady || cancelled) return;
      const { width, height } = container.getBoundingClientRect();
      const measurements = Array.from(measurement.children, (element) => ({
        width: element.offsetWidth,
        height: element.offsetHeight,
      }));
      const panel = { width, height };
      layoutRef.current = { panel, measurements };
      const next = [];
      for (let i = 0; i < count; i++) {
        next.push(placeFormula(next, panel, measurements));
      }
      setFormulas(next);
    }

    const visibilityObserver = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting);
    });
    const resizeObserver = new ResizeObserver(reflow);
    visibilityObserver.observe(container);
    resizeObserver.observe(container);
    Promise.resolve(document.fonts?.ready).then(() => {
      fontsReady = true;
      reflow();
    });

    return () => {
      cancelled = true;
      visibilityObserver.disconnect();
      resizeObserver.disconnect();
    };
  }, [count]);

  function replaceFormula(index) {
    setFormulas((current) => {
      const next = current.slice();
      const { panel, measurements } = layoutRef.current;
      next[index] = null;
      next[index] = placeFormula(next, panel, measurements);
      // Retry empty slots after a change; crowded panels may display fewer items.
      for (let i = 0; i < next.length; i++) {
        if (!next[i]) next[i] = placeFormula(next, panel, measurements);
      }
      return next;
    });
  }

  return (
    <div
      ref={containerRef}
      className="formula-background"
      data-visible={visible}
      aria-hidden="true"
    >
      <div className="formula-background__measure" ref={measurementRef}>
        {renderedEquations.map((html, index) => (
          <span key={index} dangerouslySetInnerHTML={{ __html: html }} />
        ))}
      </div>
      {formulas.map(
        (formula, index) =>
          formula && (
            <span
              className="formula-background__item"
              key={`${index}-${formula.x}-${formula.y}-${formula.equation}`}
              onAnimationIteration={(event) => {
                if (event.target === event.currentTarget) replaceFormula(index);
              }}
              style={{
                left: `${formula.x}px`,
                top: `${formula.y}px`,
                transform: `translate(-50%, -50%) rotate(${formula.angle}deg)`,
                animationDuration: `${16 + (index % 6) * 3}s`,
                animationDelay: `${(index % 8) * 0.6}s`,
                "--formula-drift-x": `${formula.driftX}px`,
                "--formula-drift-y": `${formula.driftY}px`,
                "--formula-rotation": `${formula.rotation}deg`,
              }}
            >
              <span
                className="formula-background__content"
                dangerouslySetInnerHTML={{
                  __html: renderedEquations[formula.equation],
                }}
              />
            </span>
          ),
      )}
    </div>
  );
}
