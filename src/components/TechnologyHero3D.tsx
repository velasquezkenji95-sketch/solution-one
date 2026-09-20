import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';

export function TechnologyHero3D() {
  const mount = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = mount.current;
    if (!host) return;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    } catch {
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    host.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 40);
    camera.position.set(0, 0, 10);
    const assembly = new THREE.Group();
    assembly.rotation.set(0.62, -0.52, -0.24);
    scene.add(assembly);
    scene.add(new THREE.HemisphereLight(0xc9eaff, 0x201553, 3));
    const key = new THREE.DirectionalLight(0xffffff, 5);
    key.position.set(-3, 4, 6);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0x7d68ff, 5);
    rim.position.set(4, -2, 3);
    scene.add(rim);
    const silver = new THREE.MeshStandardMaterial({ color: 0x9daec8, metalness: 0.75, roughness: 0.26 });
    const dark = new THREE.MeshStandardMaterial({ color: 0x101d3d, metalness: 0.55, roughness: 0.32 });
    const blue = new THREE.MeshStandardMaterial({ color: 0x235fe8, metalness: 0.48, roughness: 0.24 });
    const light = new THREE.MeshBasicMaterial({ color: 0x65e5ff });
    const trace = new THREE.LineBasicMaterial({ color: 0x619cda, transparent: true, opacity: 0.7 });
    const layers: THREE.Group[] = [];
    const box = (w: number, h: number, d: number, material: THREE.Material, parent: THREE.Group, x = 0, y = 0, z = 0) => {
      const mesh = new THREE.Mesh(new RoundedBoxGeometry(w, h, d, 2, Math.min(d / 3, 0.09)), material);
      mesh.position.set(x, y, z);
      parent.add(mesh);
      return mesh;
    };
    const packets: { mesh: THREE.Mesh; path: THREE.CurvePath<THREE.Vector3>; offset: number }[] = [];
    // Exploded circuit layers share a slow assembly rotation; only small packets move independently.
    for (let level = 0; level < 3; level++) {
      const layer = new THREE.Group();
      layer.position.z = (level - 1) * 0.65;
      assembly.add(layer);
      layers.push(layer);
      box(3.25, 3.25, 0.12, level === 1 ? blue : dark, layer);
      const edges = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(3.2, 3.2, 0.12)), new THREE.LineBasicMaterial({ color: level === 1 ? 0x96eeff : 0x6688ba }));
      layer.add(edges);
      for (let side = 0; side < 4; side++) {
        for (let pin = 0; pin < 7; pin++) {
          const offset = (pin - 3) * 0.32;
          const horizontal = side % 2 === 0;
          const sign = side < 2 ? 1 : -1;
          box(horizontal ? 0.23 : 0.1, horizontal ? 0.1 : 0.23, 0.07, silver, layer, horizontal ? sign * 1.72 : offset, horizontal ? offset : sign * 1.72);
        }
      }
      for (let i = 0; i < 8; i++) {
        const angle = i * Math.PI / 4;
        const points = [new THREE.Vector3(0.45 * Math.cos(angle), 0.45 * Math.sin(angle), 0.1), new THREE.Vector3(1.04 * Math.cos(angle), 1.04 * Math.sin(angle), 0.1), new THREE.Vector3(1.35 * Math.cos(angle), 1.35 * Math.sin(angle) + 0.13, 0.1)];
        const path = new THREE.CurvePath<THREE.Vector3>();
        path.add(new THREE.LineCurve3(points[0], points[1]));
        path.add(new THREE.LineCurve3(points[1], points[2]));
        layer.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), trace));
        const packet = box(0.045, 0.045, 0.045, light, layer);
        packets.push({ mesh: packet, path, offset: i / 8 + level / 3 });
      }
    }
    const top = layers[2];
    box(1.45, 1.45, 0.2, silver, top, 0, 0, 0.18);
    box(1.26, 1.26, 0.12, blue, top, 0, 0, 0.34);
    // A physical circuit monogram, not a text texture or external model dependency.
    for (let i = 0; i < 3; i++) box(0.72 - i * 0.17, 0.075, 0.025, light, top, 0, (1 - i) * 0.23, 0.415);

    const resize = () => {
      const { width, height } = host.getBoundingClientRect();
      renderer.setSize(width, height);
      camera.aspect = width / Math.max(height, 1);
      camera.position.z = camera.aspect < 1 ? 12.8 : 9.4;
      camera.updateProjectionMatrix();
      renderer.render(scene, camera);
    };
    const observer = new ResizeObserver(resize);
    observer.observe(host);
    resize();
    let visible = true;
    let frame = 0;
    let elapsed = 0;
    let previous = 0;
    let pointerX = 0;
    let pointerY = 0;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const draw = (now: number) => {
      elapsed += Math.min((now - previous) / 1000 || 0, 0.04);
      previous = now;
      assembly.rotation.y = -0.52 + Math.sin(elapsed * 0.24) * 0.2 + pointerX * 0.12;
      assembly.rotation.x = 0.62 + Math.sin(elapsed * 0.3) * 0.07 + pointerY * 0.08;
      assembly.position.y = Math.sin(elapsed * 0.6) * 0.09;
      layers.forEach((layer, i) => { layer.position.z = (i - 1) * (0.65 + Math.sin(elapsed * 0.7) * 0.13); });
      packets.forEach(({ mesh, path, offset }) => mesh.position.copy(path.getPoint((elapsed * 0.2 + offset) % 1)));
      renderer.render(scene, camera);
      frame = requestAnimationFrame(draw);
    };
    const sync = () => {
      cancelAnimationFrame(frame);
      const playing = visible && !document.hidden && !reduced.matches;
      host.dataset.playing = String(playing);
      if (playing) { previous = performance.now(); frame = requestAnimationFrame(draw); }
      else renderer.render(scene, camera);
    };
    const intersection = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
    intersection.observe(host);
    const move = (event: PointerEvent) => {
      const bounds = host.getBoundingClientRect();
      pointerX = (event.clientX - bounds.left) / bounds.width - 0.5;
      pointerY = (event.clientY - bounds.top) / bounds.height - 0.5;
    };
    host.addEventListener('pointermove', move);
    document.addEventListener('visibilitychange', sync);
    reduced.addEventListener('change', sync);
    sync();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      intersection.disconnect();
      host.removeEventListener('pointermove', move);
      document.removeEventListener('visibilitychange', sync);
      reduced.removeEventListener('change', sync);
      const geometries = new Set<THREE.BufferGeometry>();
      const materials = new Set<THREE.Material>();
      scene.traverse(object => {
        const mesh = object as THREE.Mesh;
        if (mesh.geometry) geometries.add(mesh.geometry);
        if (mesh.material) (Array.isArray(mesh.material) ? mesh.material : [mesh.material]).forEach(material => materials.add(material));
      });
      geometries.forEach(geometry => geometry.dispose());
      materials.forEach(material => material.dispose());
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={mount} className="technology-scene" role="img" aria-label="Animated three-dimensional processor with connected circuit layers" />;
}
