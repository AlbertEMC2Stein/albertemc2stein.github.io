// Rejection sampling using conservative bounding boxes for rotation and drift.
// Unlike point-only Poisson sampling, this accounts for different formula sizes.
const GAP = 32;
const ATTEMPTS = 200;

function rotatedHalfSize(width, height, startAngle, endAngle) {
  let maxWidth = 0;
  let maxHeight = 0;

  // Include the full rotation interval, not just its endpoints.
  for (let step = 0; step <= 12; step++) {
    const angle =
      ((startAngle + ((endAngle - startAngle) * step) / 12) * Math.PI) / 180;
    const cos = Math.abs(Math.cos(angle));
    const sin = Math.abs(Math.sin(angle));
    maxWidth = Math.max(maxWidth, width * cos + height * sin);
    maxHeight = Math.max(maxHeight, width * sin + height * cos);
  }
  return { x: maxWidth / 2, y: maxHeight / 2 };
}

function overlaps(a, b) {
  return (
    Math.abs(a.x - b.x) < a.halfWidth + b.halfWidth &&
    Math.abs(a.y - b.y) < a.halfHeight + b.halfHeight
  );
}

export function placeFormula(
  existing,
  panel,
  measurements,
  random = Math.random,
) {
  if (!panel.width || !panel.height || !measurements.length) return null;

  for (let attempt = 0; attempt < ATTEMPTS; attempt++) {
    const equation = Math.floor(random() * measurements.length);
    const { width, height } = measurements[equation];
    if (!width || !height) continue;

    const angle = -60 + random() * 120;
    const endAngle = Math.max(-60, Math.min(60, angle - 30 + random() * 60));
    const driftX = -140 + random() * 280;
    const driftY = -100 + random() * 200;
    const driftRadius = Math.hypot(driftX, driftY);
    const halfSize = rotatedHalfSize(width, height, angle, endAngle);
    const halfWidth = halfSize.x + driftRadius + GAP / 2;
    const halfHeight = halfSize.y + driftRadius + GAP / 2;
    const freeWidth = panel.width - 2 * halfWidth;
    const freeHeight = panel.height - 2 * halfHeight;
    if (freeWidth < 0 || freeHeight < 0) continue;

    const candidate = {
      equation,
      x: halfWidth + random() * freeWidth,
      y: halfHeight + random() * freeHeight,
      angle,
      driftX,
      driftY,
      rotation: endAngle - angle,
      halfWidth,
      halfHeight,
    };
    if (
      existing.every((formula) => !formula || !overlaps(candidate, formula))
    ) {
      return candidate;
    }
  }

  // A narrow panel may not have room for another formula. Leave the slot empty
  // rather than putting a formula on top of another one.
  return null;
}
