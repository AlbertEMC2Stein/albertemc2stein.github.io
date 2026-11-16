/** Each section gets an independent, gently moving network. */
export function createNetworkSketch() {
  const settings = {
    nodeCount: 10,
    velocityDeviation: 14, // Typical velocity per axis, in pixels per second.
    velocityMemory: 5, // Seconds over which a direction tends to persist.
    edgeMargin: 30, // Begin gently steering inward near the edge.
    edgeStrength: 0.8,
    lineOpacity: 0.02,
    lineMinWidth: 0.0,
    lineMaxWidth: 5,
    lineBloom: 15,
    nodeOpacity: 0.15,
    nodeSize: 10,
    bloom: 14,
  };

  let nodes = [];
  let accent;

  function edgeAcceleration(position, limit) {
    const margin = Math.min(settings.edgeMargin, limit / 3);
    if (position < margin) return (margin - position) * settings.edgeStrength;
    if (position > limit - margin) {
      return (limit - margin - position) * settings.edgeStrength;
    }
    return 0;
  }

  function updateNode(p, node, elapsed) {
    // Mean-reverting random velocity: position remains smooth and speed stays
    // bounded statistically, instead of accumulating acceleration forever.
    const retention = Math.exp(-elapsed / settings.velocityMemory);
    const randomScale =
      settings.velocityDeviation * Math.sqrt(1 - retention ** 2);
    const oldVx = node.vx;
    const oldVy = node.vy;

    node.vx =
      retention * node.vx +
      randomScale * p.randomGaussian() +
      edgeAcceleration(node.x, p.width) * elapsed;
    node.vy =
      retention * node.vy +
      randomScale * p.randomGaussian() +
      edgeAcceleration(node.y, p.height) * elapsed;

    // Trapezoidal position update keeps the movement smooth between velocities.
    node.x += ((oldVx + node.vx) / 2) * elapsed;
    node.y += ((oldVy + node.vy) / 2) * elapsed;
  }

  function drawConnections(p) {
    const distanceScale = Math.max(1, Math.hypot(p.width, p.height) * 0.35);
    p.push();
    p.drawingContext.shadowColor = accent;

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i];
        const b = nodes[j];
        const distance = Math.hypot(a.x - b.x, a.y - b.y);
        // Smooth inverse-square falloff: finite at zero and visible at any distance.
        const proximity = 1 / (1 + 4 * (distance / distanceScale) ** 2);
        const line = p.color(accent);
        line.setAlpha(255 * settings.lineOpacity * proximity * 3);
        p.stroke(line);
        p.strokeWeight(
          settings.lineMinWidth +
            (settings.lineMaxWidth - settings.lineMinWidth) * proximity,
        );
        p.drawingContext.shadowBlur = settings.lineBloom * proximity;
        p.line(a.x, a.y, b.x, b.y);
      }
    }
    p.pop();
  }

  function drawNodes(p) {
    const color = p.color(accent);
    color.setAlpha(255 * settings.nodeOpacity);
    p.push();
    p.noStroke();
    p.fill(color);
    p.drawingContext.shadowColor = accent;
    p.drawingContext.shadowBlur = settings.bloom;
    for (const node of nodes) p.circle(node.x, node.y, settings.nodeSize);
    p.pop();
  }

  return {
    enabled: true,

    setup(p) {
      accent = getComputedStyle(document.documentElement)
        .getPropertyValue("--hero-accent")
        .trim();
      nodes = Array.from({ length: settings.nodeCount }, () => ({
        x: p.random(p.width),
        y: p.random(p.height),
        vx: p.randomGaussian() * settings.velocityDeviation,
        vy: p.randomGaussian() * settings.velocityDeviation,
      }));
    },

    draw(p) {
      // Avoid a large jump after a browser tab has been inactive.
      const elapsed = Math.min(p.deltaTime || 0, 50) / 1000;
      for (const node of nodes) updateNode(p, node, elapsed);
      drawConnections(p);
      drawNodes(p);
    },

    resize(p) {
      // Preserve the current configuration; the edge forces adapt to the
      // new dimensions and guide any outlying nodes back into view.
    },
  };
}
