/**
 * A small GBM sketch to experiment with. All dimensions are in CSS pixels.
 * Each path stores its own points, so resizing does not stretch the trajectories.
 */
export function createGbmSketch() {
  const settings = {
    pathCount: 35,
    speed: 20, // Horizontal movement in pixels per second.
    sampleInterval: 0.01, // Seconds between points on a path.
    yearsPerSecond: 1 / 12, // Simulation time per real second.
    drift: 0.25,
    volatility: 0.3,
    verticalScale: 200,
    lineOpacity: 0.05,
    nodeOpacity: 0.15,
    arrivalSpread: 8, // Extra random seconds added to each path's lifetime.
  };

  let paths = [];
  let accent;

  function createPath(lifetime) {
    const initial_value = 0.25 + Math.random() * 0.5; // Random initial value between 0.25 and 0.75

    return {
      age: 0,
      sampleAge: 0,
      value: initial_value,
      lifetime,
      points: [{ x: 0, value: initial_value }],
    };
  }

  function advancePath(p, path, elapsed) {
    path.age += elapsed;
    const simulationStep = settings.sampleInterval * settings.yearsPerSecond;

    // Use the same simulation time step for every path.
    while (path.sampleAge + settings.sampleInterval <= path.age) {
      path.sampleAge += settings.sampleInterval;
      path.value *= Math.exp(
        (settings.drift - settings.volatility ** 2 / 2) * simulationStep +
          settings.volatility * Math.sqrt(simulationStep) * p.randomGaussian(),
      );
      path.points.push({
        x: path.sampleAge * settings.speed,
        value: path.value,
      });
    }
  }

  function lifetimeForWidth(width) {
    return (
      Math.max(24, width / settings.speed + 3) +
      Math.random() * settings.arrivalSpread
    );
  }

  function drawPath(p, path) {
    const fade = Math.max(0, 1 - path.age / path.lifetime);
    const originY = p.height * 0.72;
    const yFor = (point) =>
      originY - (point.value - 1) * settings.verticalScale;
    const line = p.color(accent);
    line.setAlpha(255 * settings.lineOpacity * fade);

    // Soft halo behind the trajectory.
    p.push();
    p.drawingContext.shadowBlur = 10;
    p.drawingContext.shadowColor = accent;

    p.noFill();
    p.stroke(line);
    p.strokeWeight(1);
    p.beginShape();
    for (const point of path.points) p.vertex(point.x, yFor(point));
    p.endShape();
    p.pop();

    p.noFill();
    p.stroke(line);
    p.strokeWeight(1);
    p.beginShape();
    for (const point of path.points) p.vertex(point.x, yFor(point));
    p.endShape();

    const tip = path.points[path.points.length - 1];
    const node = p.color(accent);
    node.setAlpha(255 * settings.nodeOpacity * fade);

    p.push();
    p.noStroke();
    p.fill(node);

    // Draw the halo twice to strengthen it.
    p.drawingContext.shadowColor = accent;
    p.drawingContext.shadowBlur = 5;

    for (let i = 1; i < 6; i++) {
      p.circle(tip.x, yFor(tip), i);
    }
    p.pop();
  }

  return {
    enabled: true,

    setup(p) {
      accent = getComputedStyle(document.documentElement)
        .getPropertyValue("--hero-accent")
        .trim();
      // Randomize both the initial ages and the length of each path's cycle.
      // This avoids a regular pattern when paths are replaced later on.
      paths = Array.from({ length: settings.pathCount }, () => {
        const path = createPath(lifetimeForWidth(p.width));
        advancePath(p, path, Math.random() * path.lifetime);
        return path;
      });
    },

    draw(p) {
      // Clamp long frame gaps so returning to the tab does not cause a jump.
      const elapsed = Math.min(p.deltaTime || 0, 50) / 1000;
      for (let index = 0; index < paths.length; index++) {
        let path = paths[index];
        advancePath(p, path, elapsed);
        if (path.age >= path.lifetime) {
          path = createPath(lifetimeForWidth(p.width));
          paths[index] = path;
        }
        drawPath(p, path);
      }
    },

    resize() {
      // Existing paths retain their coordinates; new ones use the new width.
    },
  };
}
