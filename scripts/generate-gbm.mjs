import { writeFile } from "node:fs/promises";

// Fixed seed keeps the decorative sample paths identical on every build.
let seed = 7312026;
function uniform() {
  seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
  return (seed + 1) / 4294967297;
}

function normal() {
  return (
    Math.sqrt(-2 * Math.log(uniform())) * Math.cos(2 * Math.PI * uniform())
  );
}

const width = 4096;
const height = 700;
const steps = 820;
const years = (3 * width) / 1800;
const drift = 0.06;
const volatility = 0.24;
const dt = years / steps;
const paths = [];
const nodes = [];

for (let pathIndex = 0; pathIndex < 25; pathIndex++) {
  let value = 1;
  const points = [];
  for (let step = 0; step <= steps; step++) {
    if (step > 0) {
      value *= Math.exp(
        (drift - volatility ** 2 / 2) * dt +
          volatility * Math.sqrt(dt) * normal(),
      );
    }
    const x = (step / steps) * width;
    const y = 540 - (value - 1) * 320;
    points.push(`${step === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`);
    if (
      pathIndex % 3 === 0 &&
      step === 60 + pathIndex * 6 &&
      y > 40 &&
      y < 660
    ) {
      nodes.push([x.toFixed(1), y.toFixed(1)]);
    }
  }
  paths.push(points.join(" "));
}

const pathElements = paths.map((path) => `    <path d="${path}" />`).join("\n");
const glowElements = nodes
  .map(([x, y]) => `    <circle cx="${x}" cy="${y}" r="10" />`)
  .join("\n");
const nodeElements = nodes
  .map(([x, y]) => `    <circle cx="${x}" cy="${y}" r="2" />`)
  .join("\n");
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none">
  <defs>
    <filter id="bloom" x="-100%" y="-100%" width="300%" height="300%">
      <feGaussianBlur stdDeviation="5" />
    </filter>
  </defs>
  <g stroke="#ead19b" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" stroke-opacity="0.55">
${pathElements}
  </g>
  <g fill="#f3d495" fill-opacity="0.6" filter="url(#bloom)">
${glowElements}
  </g>
  <g fill="#f6dda7" fill-opacity="0.9">
${nodeElements}
  </g>
</svg>\n`;

await writeFile(
  new URL("../public/assets/gbm-trajectories.svg", import.meta.url),
  svg,
);
console.log(
  `Generated ${paths.length} paths and ${nodes.length} glowing nodes.`,
);
