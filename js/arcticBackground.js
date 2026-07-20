/**
 * Responsive pixel-art background for the portfolio index.
 *
 * The canvas is intentionally rendered at one quarter of the viewport
 * resolution and enlarged with image-rendering: pixelated.
 */

(() => {
  "use strict";

  const canvas = document.getElementById("arctic-background");
  if (!canvas) return;

  const context = canvas.getContext("2d", { alpha: false });
  if (!context) return;

  const PIXEL_SCALE = 4;
  const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const pointer = { x: -1000, y: -1000, active: false };

  let width = 0;
  let height = 0;
  let scrollProgress = 0;
  let clouds = [];
  let gulls = [];
  let fishes = [];
  let penguins = [];
  let penguinSplashes = [];
  let animationFrame = 0;
  let previousTime = performance.now();

  const clamp = (value, minimum, maximum) => Math.min(maximum, Math.max(minimum, value));
  const lerp = (start, end, amount) => start + ((end - start) * amount);
  const random = (minimum, maximum) => minimum + (Math.random() * (maximum - minimum));

  function smoothstep(edgeStart, edgeEnd, value) {
    const amount = clamp((value - edgeStart) / (edgeEnd - edgeStart), 0, 1);
    return amount * amount * (3 - (2 * amount));
  }

  function mixRgb(start, end, amount) {
    return [
      Math.round(lerp(start[0], end[0], amount)),
      Math.round(lerp(start[1], end[1], amount)),
      Math.round(lerp(start[2], end[2], amount))
    ];
  }

  function rgb(color, alpha = 1) {
    return alpha === 1
      ? `rgb(${color[0]} ${color[1]} ${color[2]})`
      : `rgb(${color[0]} ${color[1]} ${color[2]} / ${alpha})`;
  }

  function currentSurfaceY() {
    const descent = smoothstep(0, 0.22, scrollProgress);
    return lerp(height * 0.64, height * -0.2, descent);
  }

  function updateScrollProgress() {
    const scrollableHeight = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    scrollProgress = clamp(window.scrollY / scrollableHeight, 0, 1);

    if (motionQuery.matches) drawScene(0, performance.now());
  }

  function initializeActors() {
    clouds = [
      { x: width * 0.08, y: height * 0.15, size: 5, speed: 0.018 },
      { x: width * 0.42, y: height * 0.25, size: 7, speed: 0.011 },
      { x: width * 0.72, y: height * 0.11, size: 4, speed: 0.024 }
    ];

    const gullCount = window.innerWidth <= 600 ? 3 : 5;
    gulls = Array.from({ length: gullCount }, (_, index) => {
      const baseX = 0.23 + ((index % 3) * 0.14);
      const baseY = 0.18 + ((index % 2) * 0.09);
      return {
        x: width * baseX,
        y: height * baseY,
        vx: random(-0.08, 0.08),
        vy: random(-0.05, 0.05),
        baseX,
        baseY,
        phase: random(0, Math.PI * 2)
      };
    });

    const fishCount = window.innerWidth <= 600 ? 24 : 38;
    fishes = Array.from({ length: fishCount }, (_, index) => {
      const direction = index % 2 === 0 ? 1 : -1;
      const baseSpeed = random(0.035, 0.095);
      return {
        x: random(0, width),
        y: random(height * 0.18, height * 0.98),
        vx: direction * baseSpeed,
        vy: 0,
        direction,
        baseSpeed,
        baseSize: random(1.1, 2.7),
        phase: random(0, Math.PI * 2),
        glowColor: index % 3 === 0 ? [255, 220, 103] : [80, 231, 255]
      };
    });

    const penguinCount = window.innerWidth <= 520 ? 2 : 3;
    const penguinSpacing = Math.max(13, width * 0.065);
    penguins = Array.from({ length: penguinCount }, (_, index) => ({
      x: Math.min(width * 0.92, (width * 0.73) + (index * penguinSpacing)),
      y: height * 0.62,
      vx: 0,
      vy: 0,
      state: "shore",
      facing: index % 2 === 0 ? -1 : 1,
      shoreLean: 0,
      skipStartX: 0,
      skipTargetX: 0,
      skipProgress: 1,
      skipDuration: random(18, 34),
      skipHeight: random(2, 4),
      skipCooldown: random(20, 100),
      crouchDelay: 0,
      crouchProgress: 0,
      crouchDuration: random(14, 22),
      diveStartX: 0,
      diveStartY: 0,
      diveTargetX: 0,
      diveProgress: 0,
      diveDuration: 40,
      diveArcHeight: 10,
      rotation: 0,
      swimTime: random(0, 100),
      wiggleSpeed: random(0.17, 0.25),
      phase: random(0, Math.PI * 2)
    }));
    penguinSplashes = [];
  }

  function resizeCanvas() {
    width = Math.max(80, Math.ceil(window.innerWidth / PIXEL_SCALE));
    height = Math.max(120, Math.ceil(window.innerHeight / PIXEL_SCALE));
    canvas.width = width;
    canvas.height = height;
    context.imageSmoothingEnabled = false;
    pointer.active = false;
    initializeActors();
    updateScrollProgress();
    drawScene(0, performance.now());
  }

  function drawSun(alpha) {
    if (alpha <= 0) return;

    const centerX = Math.round(width * 0.15);
    const centerY = Math.round(height * 0.17);
    const radius = Math.max(6, Math.round(Math.min(width, height) * 0.055));

    context.fillStyle = rgb([255, 225, 112], alpha * 0.24);
    context.fillRect(centerX - radius - 3, centerY - radius - 3, (radius * 2) + 6, (radius * 2) + 6);
    context.fillStyle = rgb([255, 238, 144], alpha);

    for (let y = -radius; y <= radius; y += 1) {
      const halfWidth = Math.floor(Math.sqrt(Math.max(0, (radius * radius) - (y * y))));
      context.fillRect(centerX - halfWidth, centerY + y, (halfWidth * 2) + 1, 1);
    }
  }

  function drawCloud(cloud, alpha) {
    const x = Math.round(cloud.x);
    const y = Math.round(cloud.y);
    const size = cloud.size;

    context.fillStyle = rgb([232, 249, 255], alpha * 0.82);
    context.fillRect(x, y, size * 6, size * 2);
    context.fillRect(x + size, y - size, size * 2, size);
    context.fillRect(x + (size * 3), y - (size * 2), size * 2, size * 2);
    context.fillStyle = rgb([184, 225, 239], alpha * 0.7);
    context.fillRect(x + size, y + (size * 2), size * 5, 1);
  }

  function updateAndDrawClouds(step, alpha) {
    clouds.forEach(cloud => {
      cloud.x += cloud.speed * step;
      if (cloud.x > width + (cloud.size * 7)) {
        cloud.x = -(cloud.size * 7);
      }
      drawCloud(cloud, alpha);
    });
  }

  function drawGull(gull, time, alpha) {
    const x = Math.round(gull.x);
    const y = Math.round(gull.y);
    const wingsUp = Math.sin((time * 0.012) + gull.phase) > 0;

    context.fillStyle = rgb([45, 76, 91], alpha * 0.45);
    context.fillRect(x - 4, y + 1, 9, 1);
    context.fillStyle = rgb([250, 253, 249], alpha);
    context.fillRect(x - 1, y, 3, 1);

    if (wingsUp) {
      context.fillRect(x - 4, y - 2, 3, 1);
      context.fillRect(x - 3, y - 1, 3, 1);
      context.fillRect(x + 2, y - 1, 3, 1);
      context.fillRect(x + 3, y - 2, 3, 1);
    } else {
      context.fillRect(x - 4, y, 4, 1);
      context.fillRect(x + 2, y, 4, 1);
      context.fillRect(x - 5, y + 1, 2, 1);
      context.fillRect(x + 5, y + 1, 2, 1);
    }
  }

  function updateAndDrawGulls(step, time, surfaceY) {
    const alpha = 1 - smoothstep(0.08, 0.24, scrollProgress);
    if (alpha <= 0 || surfaceY < 5) return;

    const cursorInSky = pointer.active && pointer.y < surfaceY - 10 && scrollProgress < 0.15;

    gulls.forEach((gull, index) => {
      const targetX = cursorInSky
        ? pointer.x + (Math.cos(gull.phase + index) * 8)
        : (gull.baseX * width) + (Math.sin((time * 0.00035) + gull.phase) * width * 0.06);
      const targetY = cursorInSky
        ? pointer.y + (Math.sin(gull.phase + index) * 5)
        : (gull.baseY * height) + (Math.cos((time * 0.0005) + gull.phase) * 4);

      gull.vx += (targetX - gull.x) * 0.0028 * step;
      gull.vy += (targetY - gull.y) * 0.0028 * step;
      gull.vx *= Math.pow(0.94, step);
      gull.vy *= Math.pow(0.94, step);
      gull.x += gull.vx * step;
      gull.y += gull.vy * step;
      gull.y = Math.min(gull.y, surfaceY - 6);

      drawGull(gull, time, alpha);
    });
  }

  function drawWater(surfaceY) {
    const waterTop = Math.max(0, Math.floor(surfaceY));
    const topDepth = clamp(scrollProgress * 1.05, 0, 1);
    const bottomDepth = clamp(topDepth + 0.32, 0, 1);
    const surfaceColor = mixRgb([34, 157, 205], [0, 0, 2], topDepth);
    const bottomColor = mixRgb([3, 54, 88], [0, 0, 0], bottomDepth);
    const gradient = context.createLinearGradient(0, waterTop, 0, height);

    gradient.addColorStop(0, rgb(surfaceColor));
    gradient.addColorStop(1, rgb(bottomColor));
    context.fillStyle = gradient;
    context.fillRect(0, waterTop, width, height - waterTop);

    if (surfaceY >= 0 && surfaceY < height) {
      const y = Math.round(surfaceY);
      context.fillStyle = "#b9f3ff";
      context.fillRect(0, y, width, 1);
      context.fillStyle = "#68cce9";

      for (let x = -6; x < width + 8; x += 12) {
        const offset = Math.round(Math.sin((x * 0.12) + (performance.now() * 0.001)) * 2);
        context.fillRect(x + offset, y + 2, 7, 1);
      }
    }
  }

  function drawIcebergBody(surfaceY) {
    const depthDarkening = smoothstep(0.15, 1, scrollProgress);
    const leftAtSurface = width * (0.68 - (scrollProgress * 0.13));
    const leftAtBottom = width * (0.6 - (scrollProgress * 0.34));
    const bodyTop = Math.min(surfaceY, height);
    const lightIce = mixRgb([91, 190, 220], [3, 10, 17], depthDarkening);
    const darkIce = mixRgb([19, 78, 111], [0, 2, 5], depthDarkening);
    const gradient = context.createLinearGradient(0, bodyTop, 0, height);

    gradient.addColorStop(0, rgb(lightIce));
    gradient.addColorStop(1, rgb(darkIce));
    context.fillStyle = gradient;
    context.beginPath();
    context.moveTo(width + 2, bodyTop - 2);
    context.lineTo(leftAtSurface, bodyTop - 2);
    context.lineTo(leftAtSurface - (width * 0.035), bodyTop + (height * 0.22));
    context.lineTo(leftAtBottom + (width * 0.055), bodyTop + (height * 0.48));
    context.lineTo(leftAtBottom, height + 2);
    context.lineTo(width + 2, height + 2);
    context.closePath();
    context.fill();

    context.strokeStyle = rgb(mixRgb([152, 222, 235], [5, 20, 28], depthDarkening), 0.45);
    context.lineWidth = 1;
    context.beginPath();
    context.moveTo(leftAtSurface + (width * 0.06), bodyTop + 4);
    context.lineTo(leftAtBottom + (width * 0.16), height * 0.54);
    context.lineTo(leftAtBottom + (width * 0.1), height);
    context.stroke();
  }

  function drawIcebergCap(surfaceY) {
    if (surfaceY < -height * 0.25) return;

    const growth = 1 + (smoothstep(0, 0.25, scrollProgress) * 0.55);
    const left = width * (0.68 - (scrollProgress * 0.1));
    const peakX = width * 0.84;
    const peakY = surfaceY - (height * 0.3 * growth);
    const darkness = smoothstep(0.1, 0.45, scrollProgress);

    context.fillStyle = rgb(mixRgb([218, 250, 255], [22, 68, 84], darkness));
    context.beginPath();
    context.moveTo(left, surfaceY);
    context.lineTo(width * 0.735, surfaceY - (height * 0.1 * growth));
    context.lineTo(width * 0.77, surfaceY - (height * 0.09 * growth));
    context.lineTo(peakX, peakY);
    context.lineTo(width * 0.9, surfaceY - (height * 0.13 * growth));
    context.lineTo(width + 2, surfaceY - (height * 0.18 * growth));
    context.lineTo(width + 2, surfaceY + 2);
    context.closePath();
    context.fill();

    context.fillStyle = rgb(mixRgb([152, 222, 239], [8, 35, 49], darkness), 0.85);
    context.beginPath();
    context.moveTo(width * 0.77, surfaceY - (height * 0.09 * growth));
    context.lineTo(peakX, peakY);
    context.lineTo(width * 0.835, surfaceY - (height * 0.07 * growth));
    context.closePath();
    context.fill();
  }

  function fishDepth(fish) {
    return clamp((scrollProgress * 0.95) + ((fish.y / height) * 0.25), 0, 1);
  }

  function updateFish(fish, step, surfaceY) {
    const depth = fishDepth(fish);
    const targetVelocity = fish.direction * fish.baseSpeed * (0.75 + depth);

    fish.vx += (targetVelocity - fish.vx) * 0.025 * step;
    fish.vy *= Math.pow(0.91, step);

    if (pointer.active && pointer.y > surfaceY) {
      const deltaX = fish.x - pointer.x;
      const deltaY = fish.y - pointer.y;
      const distance = Math.hypot(deltaX, deltaY) || 1;
      const fleeRadius = 18 + (fish.baseSize * (1 + depth) * 3);

      if (distance < fleeRadius) {
        const force = (1 - (distance / fleeRadius)) * 0.22 * step;
        fish.vx += (deltaX / distance) * force;
        fish.vy += (deltaY / distance) * force;
        fish.direction = fish.vx >= 0 ? 1 : -1;
      }
    }

    fish.x += fish.vx * step;
    fish.y += (fish.vy + (Math.sin(fish.phase + (performance.now() * 0.001)) * 0.012)) * step;

    if (fish.x > width + 14) fish.x = -14;
    if (fish.x < -14) fish.x = width + 14;
    if (fish.y > height + 8) fish.y = Math.max(surfaceY + 8, 8);
    if (fish.y < Math.max(surfaceY + 4, 4)) fish.y = height + 4;
  }

  function drawFish(fish, surfaceY) {
    if (fish.y <= surfaceY + 2) return;

    const depth = fishDepth(fish);
    const size = fish.baseSize * (0.65 + (depth * 1.8));
    const bodyAlpha = 1 - smoothstep(0.7, 0.94, depth);
    const glow = smoothstep(0.58, 0.88, depth);
    const bodyColor = mixRgb([38, 157, 188], [1, 7, 13], smoothstep(0.25, 0.95, depth));
    const bodyWidth = Math.max(4, Math.round(size * 3.2));
    const bodyHeight = Math.max(2, Math.round(size * 1.45));

    context.save();
    context.translate(Math.round(fish.x), Math.round(fish.y));
    if (fish.direction < 0) context.scale(-1, 1);

    if (bodyAlpha > 0.015) {
      context.globalAlpha = bodyAlpha;
      context.fillStyle = rgb(bodyColor);
      context.fillRect(-Math.round(bodyWidth * 0.45), -Math.round(bodyHeight * 0.5), bodyWidth, bodyHeight);
      context.fillRect(Math.round(bodyWidth * 0.35), -Math.round(bodyHeight * 0.3), 2, Math.max(1, bodyHeight - 1));
      context.fillRect(-Math.round(bodyWidth * 0.65), -Math.round(bodyHeight * 0.7), Math.max(2, Math.round(size)), 1);
      context.fillRect(-Math.round(bodyWidth * 0.65), Math.round(bodyHeight * 0.5), Math.max(2, Math.round(size)), 1);
      context.fillStyle = rgb([184, 233, 237]);
      context.fillRect(Math.round(bodyWidth * 0.32), -Math.round(bodyHeight * 0.25), 1, 1);
      context.globalAlpha = 1;
    }

    if (glow > 0) {
      const glowColor = fish.glowColor;
      context.fillStyle = rgb(glowColor, glow * 0.2);
      context.fillRect(-2, -2, 5, 5);
      context.fillStyle = rgb(glowColor, 0.45 + (glow * 0.55));
      context.fillRect(0, 0, 1, 1);
      context.fillRect(-Math.max(2, Math.round(size)), 1, 1, 1);
      context.fillRect(Math.max(2, Math.round(size)), -1, 1, 1);
    }

    context.restore();
  }

  function updateAndDrawFishes(step, surfaceY) {
    fishes.forEach(fish => {
      updateFish(fish, step, surfaceY);
      drawFish(fish, surfaceY);
    });
  }

  function startPenguinSkip(penguin) {
    const shoreMinimum = width * 0.72;
    const shoreMaximum = width * 0.94;
    let targetX = clamp(
      penguin.x + random(width * -0.055, width * 0.055),
      shoreMinimum,
      shoreMaximum
    );

    if (Math.abs(targetX - penguin.x) < 3) {
      const direction = Math.random() < 0.5 ? -1 : 1;
      targetX = clamp(penguin.x + (direction * random(4, 8)), shoreMinimum, shoreMaximum);
    }

    penguin.skipStartX = penguin.x;
    penguin.skipTargetX = targetX;
    penguin.skipProgress = 0;
    penguin.skipDuration = random(18, 34);
    penguin.skipHeight = random(2, 4.5);
    penguin.facing = targetX < penguin.x ? -1 : 1;
  }

  function updateShorePenguin(penguin, step, surfaceY) {
    if (penguin.skipProgress < 1) {
      penguin.skipProgress = Math.min(1, penguin.skipProgress + (step / penguin.skipDuration));
      const travel = smoothstep(0, 1, penguin.skipProgress);
      const hop = Math.sin(penguin.skipProgress * Math.PI);

      penguin.x = lerp(penguin.skipStartX, penguin.skipTargetX, travel);
      penguin.y = surfaceY - 2 - (hop * penguin.skipHeight);
      penguin.shoreLean = penguin.facing * hop * 0.14;

      if (penguin.skipProgress >= 1) {
        penguin.skipCooldown = random(28, 120);
        penguin.shoreLean = 0;
      }
      return;
    }

    penguin.y = surfaceY - 2;
    penguin.shoreLean *= Math.pow(0.75, step);
    penguin.skipCooldown -= step;

    if (penguin.skipCooldown <= 0) startPenguinSkip(penguin);
  }

  function triggerPenguinDive() {
    penguins.forEach((penguin, index) => {
      if (penguin.state !== "shore") return;

      penguin.state = "crouching";
      penguin.crouchDelay = (index * 5) + random(0, 4);
      penguin.crouchProgress = 0;
      penguin.crouchDuration = random(14, 22);
      penguin.facing = -1;
      penguin.shoreLean = 0;
    });
  }

  function beginPenguinDive(penguin, surfaceY) {
    const waterEdgeX = width * (0.68 - (scrollProgress * 0.1));
    const targetX = waterEdgeX - random(4, 9);
    const diveDistance = Math.abs(penguin.x - targetX);

    penguin.state = "diving";
    penguin.diveStartX = penguin.x;
    penguin.diveStartY = surfaceY - 2;
    penguin.diveTargetX = targetX;
    penguin.diveProgress = 0;
    penguin.diveDuration = clamp(30 + (diveDistance * 0.28), 34, 58);
    penguin.diveArcHeight = random(8, 12) + (diveDistance * 0.05);
    penguin.rotation = -0.2;
  }

  function createPenguinSplash(x, y) {
    const droplets = Array.from({ length: 7 }, () => ({
      x: 0,
      y: 0,
      vx: random(-0.34, 0.34),
      vy: random(-0.72, -0.28)
    }));

    penguinSplashes.push({
      x,
      y,
      age: 0,
      lifetime: random(24, 34),
      droplets
    });
  }

  function updatePenguins(step, surfaceY) {
    let cursorNearColony = false;

    penguins.forEach(penguin => {
      if (penguin.state === "shore") {
        updateShorePenguin(penguin, step, surfaceY);

        if (pointer.active && scrollProgress < 0.18) {
          cursorNearColony ||= Math.hypot(pointer.x - penguin.x, pointer.y - penguin.y) < 25;
        }
        return;
      }

      if (penguin.state === "hidden") return;

      if (penguin.state === "crouching") {
        penguin.y = surfaceY - 2;

        if (penguin.crouchDelay > 0) {
          penguin.crouchDelay -= step;
          return;
        }

        penguin.crouchProgress = Math.min(
          1,
          penguin.crouchProgress + (step / penguin.crouchDuration)
        );

        if (penguin.crouchProgress >= 1) beginPenguinDive(penguin, surfaceY);
        return;
      }

      if (penguin.state === "diving") {
        penguin.diveProgress = Math.min(1, penguin.diveProgress + (step / penguin.diveDuration));
        const travel = smoothstep(0, 1, penguin.diveProgress);

        penguin.x = lerp(penguin.diveStartX, penguin.diveTargetX, travel);
        penguin.y = lerp(penguin.diveStartY, surfaceY + 4, penguin.diveProgress)
          - (Math.sin(penguin.diveProgress * Math.PI) * penguin.diveArcHeight);
        penguin.rotation = lerp(-0.2, -2.08, smoothstep(0.05, 1, penguin.diveProgress));

        if (penguin.diveProgress >= 1) {
          createPenguinSplash(penguin.x, surfaceY);
          penguin.state = "swimming";
          penguin.x -= 1;
          penguin.y = surfaceY + 5;
          penguin.vx = random(-0.23, -0.13);
          penguin.vy = random(0.14, 0.22);
          penguin.swimTime = random(0, 100);
        }
        return;
      }

      if (penguin.state === "swimming") {
        penguin.swimTime += step;
        const wiggle = Math.sin((penguin.swimTime * penguin.wiggleSpeed) + penguin.phase);

        penguin.x += (penguin.vx + (wiggle * 0.025)) * step;
        penguin.y += penguin.vy * step;

        if (penguin.y > height + 16 || penguin.x < -16) penguin.state = "hidden";
      }
    });

    if (cursorNearColony) triggerPenguinDive();
  }

  function drawPenguinBody(penguin) {
    const swimming = penguin.state === "swimming";
    const swimWave = swimming
      ? Math.sin((penguin.swimTime * penguin.wiggleSpeed) + penguin.phase)
      : 0;
    const skipping = penguin.state === "shore" && penguin.skipProgress < 1;
    const stride = skipping ? Math.sin(penguin.skipProgress * Math.PI * 2) : 0;

    context.fillStyle = "#071218";

    if (swimming) {
      context.fillRect(-7, -7 + Math.round(swimWave), 3, 4);
      context.fillRect(5, -7 - Math.round(swimWave), 3, 4);
    } else {
      context.fillRect(-6, -7, 2, 5);
      context.fillRect(5, -7, 2, 5);
    }

    // Rounded, Tux-inspired black silhouette.
    context.fillRect(-2, -13, 5, 1);
    context.fillRect(-3, -12, 7, 2);
    context.fillRect(-4, -10, 9, 4);
    context.fillRect(-5, -7, 11, 4);
    context.fillRect(-4, -3, 9, 3);
    context.fillRect(-3, 0, 7, 1);

    // White face patches and rounded belly.
    context.fillStyle = "#f4f7ec";
    context.fillRect(-3, -11, 3, 3);
    context.fillRect(1, -11, 3, 3);
    context.fillRect(-2, -8, 5, 1);
    context.fillRect(-3, -6, 7, 1);
    context.fillRect(-4, -5, 9, 3);
    context.fillRect(-3, -2, 7, 2);

    // Eyes, beak, and broad orange feet complete the familiar shape.
    context.fillStyle = "#071218";
    context.fillRect(-2, -11, 1, 1);
    context.fillRect(2, -11, 1, 1);
    context.fillStyle = "#f4a62a";
    context.fillRect(-1, -8, 3, 2);
    context.fillRect(0, -7, 1, 1);
    context.fillRect(-5, stride > 0.15 ? 0 : 1, 5, 1);
    context.fillRect(1, stride < -0.15 ? 0 : 1, 5, 1);
  }

  function drawPenguin(penguin, surfaceY) {
    if (penguin.state === "hidden") return;
    if (["shore", "crouching"].includes(penguin.state)
      && (surfaceY < 5 || scrollProgress > 0.2)) return;

    let rotation = penguin.shoreLean;
    let scaleY = 1;

    if (penguin.state === "crouching") {
      const bend = smoothstep(0, 1, penguin.crouchProgress);
      rotation = -0.22 * bend;
      scaleY = 1 - (bend * 0.3);
    } else if (penguin.state === "diving") {
      rotation = penguin.rotation;
      scaleY = lerp(0.72, 1, smoothstep(0, 0.22, penguin.diveProgress));
    } else if (penguin.state === "swimming") {
      const wiggle = Math.sin((penguin.swimTime * penguin.wiggleSpeed) + penguin.phase);
      rotation = -2.35 + (wiggle * 0.2);
    }

    context.save();
    context.translate(Math.round(penguin.x), Math.round(penguin.y));
    context.rotate(rotation);
    context.scale(penguin.facing, scaleY);
    drawPenguinBody(penguin);
    context.restore();
  }

  function drawPenguins(surfaceY) {
    penguins.forEach(penguin => drawPenguin(penguin, surfaceY));
  }

  function updateAndDrawPenguinSplashes(step) {
    for (let index = penguinSplashes.length - 1; index >= 0; index -= 1) {
      const splash = penguinSplashes[index];
      splash.age += step;

      if (splash.age >= splash.lifetime) {
        penguinSplashes.splice(index, 1);
        continue;
      }

      const alpha = 1 - (splash.age / splash.lifetime);
      context.save();
      context.globalAlpha = alpha;
      context.fillStyle = "#d9f8ff";

      splash.droplets.forEach(droplet => {
        droplet.x += droplet.vx * step;
        droplet.y += droplet.vy * step;
        droplet.vy += 0.045 * step;
        context.fillRect(
          Math.round(splash.x + droplet.x),
          Math.round(splash.y + droplet.y),
          1,
          1
        );
      });

      const rippleHalfWidth = Math.max(1, Math.round(splash.age * 0.13));
      context.fillStyle = "#9cecff";
      context.fillRect(
        Math.round(splash.x) - rippleHalfWidth,
        Math.round(splash.y + 1),
        (rippleHalfWidth * 2) + 1,
        1
      );
      context.restore();
    }
  }

  function drawScene(step, time) {
    const surfaceY = currentSurfaceY();
    const skyAlpha = 1 - smoothstep(0.08, 0.24, scrollProgress);
    const skyGradient = context.createLinearGradient(0, 0, 0, Math.max(surfaceY, height * 0.65));

    skyGradient.addColorStop(0, "#91ddf7");
    skyGradient.addColorStop(1, "#c9f2fb");
    context.fillStyle = skyGradient;
    context.fillRect(0, 0, width, height);

    drawSun(skyAlpha);
    updateAndDrawClouds(step, skyAlpha);
    drawWater(surfaceY);
    drawIcebergBody(surfaceY);
    updateAndDrawFishes(step, surfaceY);
    drawIcebergCap(surfaceY);
    updatePenguins(step, surfaceY);
    drawPenguins(surfaceY);
    updateAndDrawPenguinSplashes(step);
    updateAndDrawGulls(step, time, surfaceY);
  }

  function animate(time) {
    const elapsed = Math.min(50, time - previousTime);
    previousTime = time;
    drawScene(elapsed / 16.6667, time);
    animationFrame = window.requestAnimationFrame(animate);
  }

  function restartAnimation() {
    window.cancelAnimationFrame(animationFrame);
    previousTime = performance.now();

    if (motionQuery.matches) {
      drawScene(0, previousTime);
    } else {
      animationFrame = window.requestAnimationFrame(animate);
    }
  }

  function updatePointer(event) {
    pointer.x = (event.clientX / window.innerWidth) * width;
    pointer.y = (event.clientY / window.innerHeight) * height;
    pointer.active = true;

    if (motionQuery.matches) drawScene(0, performance.now());
  }

  function clearPointer(event) {
    if (event.relatedTarget) return;
    pointer.active = false;
  }

  window.addEventListener("resize", resizeCanvas, { passive: true });
  window.addEventListener("scroll", updateScrollProgress, { passive: true });
  window.addEventListener("pointermove", updatePointer, { passive: true });
  window.addEventListener("pointerout", clearPointer, { passive: true });
  document.addEventListener("portfolio:content-rendered", updateScrollProgress);

  if (typeof motionQuery.addEventListener === "function") {
    motionQuery.addEventListener("change", restartAnimation);
  } else {
    motionQuery.addListener(restartAnimation);
  }

  resizeCanvas();
  restartAnimation();
})();
