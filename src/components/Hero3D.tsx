import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

function roundedBox(width: number, height: number, depth: number, radius: number, smoothness = 5) {
  const shape = new THREE.Shape();
  const x = -width / 2;
  const y = -height / 2;

  shape.moveTo(x + radius, y);
  shape.lineTo(x + width - radius, y);
  shape.quadraticCurveTo(x + width, y, x + width, y + radius);
  shape.lineTo(x + width, y + height - radius);
  shape.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  shape.lineTo(x + radius, y + height);
  shape.quadraticCurveTo(x, y + height, x, y + height - radius);
  shape.lineTo(x, y + radius);
  shape.quadraticCurveTo(x, y, x + radius, y);

  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: true,
    bevelSegments: smoothness,
    steps: 1,
    bevelSize: radius * 0.45,
    bevelThickness: radius * 0.45,
  });
  geometry.center();
  return geometry;
}

export const Hero3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(0, 2.05, 8.4);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    const robot = new THREE.Group();
    robot.position.set(0.15, -0.15, 0);
    scene.add(robot);

    const darkGloss = new THREE.MeshPhysicalMaterial({
      color: 0x050318,
      roughness: 0.22,
      metalness: 0.72,
      clearcoat: 1,
      clearcoatRoughness: 0.08,
    });
    const rimBlue = new THREE.MeshBasicMaterial({ color: 0x2b6dff });
    const glassEye = new THREE.MeshPhysicalMaterial({
      color: 0xf7fbff,
      roughness: 0.06,
      metalness: 0.35,
      clearcoat: 1,
      transmission: 0.15,
    });

    const head = new THREE.Mesh(roundedBox(2.35, 0.82, 0.72, 0.18), darkGloss);
    head.position.y = 1.92;
    head.rotation.y = -0.12;
    head.castShadow = true;
    robot.add(head);

    const faceRim = new THREE.Mesh(roundedBox(2.52, 1, 0.09, 0.2), rimBlue);
    faceRim.position.set(0, 1.92, 0.42);
    faceRim.rotation.y = -0.12;
    robot.add(faceRim);

    const facePanel = new THREE.Mesh(roundedBox(2.28, 0.76, 0.12, 0.16), darkGloss);
    facePanel.position.set(0, 1.92, 0.49);
    facePanel.rotation.y = -0.12;
    robot.add(facePanel);

    const eyeGeo = new THREE.SphereGeometry(0.145, 48, 48);
    const leftEye = new THREE.Mesh(eyeGeo, glassEye);
    leftEye.position.set(-0.42, 1.96, 0.63);
    const rightEye = new THREE.Mesh(eyeGeo, glassEye);
    rightEye.position.set(0.42, 1.96, 0.63);
    robot.add(leftEye, rightEye);

    const sideButton = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.05, 32), rimBlue);
    sideButton.rotation.z = Math.PI / 2;
    sideButton.position.set(1.23, 1.95, 0.04);
    robot.add(sideButton);

    const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.3, 0.72, 48), darkGloss);
    neck.position.y = 1.26;
    neck.castShadow = true;
    robot.add(neck);

    const joint = new THREE.Mesh(new THREE.SphereGeometry(0.3, 48, 48), darkGloss);
    joint.scale.set(1, 0.55, 1);
    joint.position.y = 0.95;
    robot.add(joint);

    const base = new THREE.Mesh(roundedBox(1.1, 1.1, 1.1, 0.1), darkGloss);
    base.position.y = 0.12;
    base.castShadow = true;
    base.receiveShadow = true;
    robot.add(base);

    const baseRim = new THREE.LineSegments(
      new THREE.EdgesGeometry(roundedBox(1.12, 1.12, 1.12, 0.1)),
      new THREE.LineBasicMaterial({ color: 0x5ccfff, transparent: true, opacity: 0.45 })
    );
    baseRim.position.copy(base.position);
    robot.add(baseRim);

    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(7, 4.2),
      new THREE.MeshBasicMaterial({ color: 0x02020a, transparent: true, opacity: 0.82 })
    );
    floor.position.set(0, -0.54, 0);
    floor.rotation.x = -Math.PI / 2;
    floor.rotation.z = 0.02;
    floor.receiveShadow = true;
    scene.add(floor);

    const glowCanvas = document.createElement('canvas');
    glowCanvas.width = 512;
    glowCanvas.height = 256;
    const ctx = glowCanvas.getContext('2d');
    if (ctx) {
      const gradient = ctx.createRadialGradient(220, 125, 10, 270, 130, 240);
      gradient.addColorStop(0, 'rgba(92,207,255,0.95)');
      gradient.addColorStop(0.35, 'rgba(43,109,255,0.52)');
      gradient.addColorStop(0.68, 'rgba(0,214,255,0.22)');
      gradient.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 512, 256);
    }
    const glow = new THREE.Mesh(
      new THREE.PlaneGeometry(5.8, 2.7),
      new THREE.MeshBasicMaterial({
        map: new THREE.CanvasTexture(glowCanvas),
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      })
    );
    glow.position.set(0.15, -0.52, 0.2);
    glow.rotation.x = -Math.PI / 2;
    scene.add(glow);

    const ambient = new THREE.AmbientLight(0x9bbcff, 1.2);
    scene.add(ambient);
    const key = new THREE.SpotLight(0x5ccfff, 12, 12, 0.55, 0.6, 1.5);
    key.position.set(-2.8, 4, 3);
    key.target = robot;
    scene.add(key);
    const fill = new THREE.PointLight(0x2b6dff, 8, 8);
    fill.position.set(2.4, 1.6, 2.2);
    scene.add(fill);
    const back = new THREE.PointLight(0x66dcff, 5, 9);
    back.position.set(-1.5, 1.4, -2);
    scene.add(back);

    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (event.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove);

    let animationFrameId = 0;
    const startedAt = performance.now();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = (performance.now() - startedAt) / 1000;

      targetX += (mouseX - targetX) * 0.045;
      targetY += (mouseY - targetY) * 0.045;
      robot.rotation.y = Math.sin(elapsed * 0.42) * 0.18 + targetX * 0.24;
      robot.rotation.x = Math.sin(elapsed * 0.55) * 0.035 - targetY * 0.09;
      robot.position.y = Math.sin(elapsed * 1.25) * 0.08 - 0.15;
      faceRim.scale.setScalar(1 + Math.sin(elapsed * 2.8) * 0.012);
      glow.material.opacity = 0.72 + Math.sin(elapsed * 1.7) * 0.12;

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full min-h-[350px] md:min-h-[500px]" />;
};
