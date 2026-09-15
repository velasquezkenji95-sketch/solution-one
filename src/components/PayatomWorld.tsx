import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, extend, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useInView } from 'framer-motion';
import ThreeGlobe from 'three-globe';
import { Color, Fog, PerspectiveCamera, Scene, Vector3 } from 'three';
import type { FeatureCollection } from 'geojson';
import countries from '../assets/ne_110m_admin_0_countries.json';
import { useAnimationPlayback } from '../lib/useAnimationPlayback';

extend({ ThreeGlobe });

type GlobeArc = {
  order: number;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  arcAlt: number;
  color: string;
};

type GlobePoint = {
  size: number;
  order: number;
  color: string;
  lat: number;
  lng: number;
};

type GlobeRing = {
  lat: number;
  lng: number;
  color: string;
};

type GlobeConfig = {
  pointSize: number;
  globeColor: string;
  showAtmosphere: boolean;
  atmosphereColor: string;
  atmosphereAltitude: number;
  emissive: string;
  emissiveIntensity: number;
  shininess: number;
  polygonColor: string;
  ambientLight: string;
  directionalLeftLight: string;
  directionalTopLight: string;
  pointLight: string;
  arcTime: number;
  arcLength: number;
  rings: number;
  maxRings: number;
  autoRotateSpeed: number;
};

const globeConfig: GlobeConfig = {
  pointSize: 1,
  globeColor: '#2b6fff',
  showAtmosphere: true,
  atmosphereColor: '#2b6fff',
  atmosphereAltitude: 0.15,
  emissive: '#0b47bd',
  emissiveIntensity: 0.1,
  shininess: 0.25,
  polygonColor: '#faf7f2',
  ambientLight: '#faf7f2',
  directionalLeftLight: '#2b6fff',
  directionalTopLight: '#ffffff',
  pointLight: '#000000',
  arcTime: 1000,
  arcLength: 0.7,
  rings: 1,
  maxRings: 3,
  autoRotateSpeed: 0.5,
};

const globeArcs: GlobeArc[] = [
  { order: 1, startLat: -19.885592, startLng: -43.951191, endLat: -22.9068, endLng: -43.1729, arcAlt: 0.1, color: '#2b6fff' },
  { order: 1, startLat: 28.6139, startLng: 77.209, endLat: 3.139, endLng: 101.6869, arcAlt: 0.2, color: '#2b6fff' },
  { order: 2, startLat: 1.3521, startLng: 103.8198, endLat: 35.6762, endLng: 139.6503, arcAlt: 0.2, color: '#2b6fff' },
  { order: 2, startLat: 51.5072, startLng: -0.1276, endLat: 3.139, endLng: 101.6869, arcAlt: 0.3, color: '#2b6fff' },
  { order: 2, startLat: -15.785493, startLng: -47.909029, endLat: 36.162809, endLng: -115.119411, arcAlt: 0.3, color: '#2b6fff' },
  { order: 3, startLat: -33.8688, startLng: 151.2093, endLat: 22.3193, endLng: 114.1694, arcAlt: 0.3, color: '#2b6fff' },
  { order: 3, startLat: 21.3099, startLng: -157.8581, endLat: 40.7128, endLng: -74.006, arcAlt: 0.3, color: '#2b6fff' },
  { order: 3, startLat: -6.2088, startLng: 106.8456, endLat: 51.5072, endLng: -0.1276, arcAlt: 0.3, color: '#2b6fff' },
  { order: 4, startLat: -34.6037, startLng: -58.3816, endLat: 22.3193, endLng: 114.1694, arcAlt: 0.7, color: '#2b6fff' },
  { order: 4, startLat: 51.5072, startLng: -0.1276, endLat: 48.8566, endLng: -2.3522, arcAlt: 0.1, color: '#2b6fff' },
  { order: 5, startLat: 14.5995, startLng: 120.9842, endLat: 51.5072, endLng: -0.1276, arcAlt: 0.3, color: '#2b6fff' },
  { order: 5, startLat: 1.3521, startLng: 103.8198, endLat: -33.8688, endLng: 151.2093, arcAlt: 0.2, color: '#2b6fff' },
  { order: 5, startLat: 34.0522, startLng: -118.2437, endLat: 48.8566, endLng: -2.3522, arcAlt: 0.2, color: '#2b6fff' },
  { order: 6, startLat: 37.5665, startLng: 126.978, endLat: 35.6762, endLng: 139.6503, arcAlt: 0.1, color: '#2b6fff' },
  { order: 6, startLat: 22.3193, startLng: 114.1694, endLat: 51.5072, endLng: -0.1276, arcAlt: 0.3, color: '#2b6fff' },
  { order: 7, startLat: -19.885592, startLng: -43.951191, endLat: -15.595412, endLng: -56.05918, arcAlt: 0.1, color: '#2b6fff' },
  { order: 7, startLat: 48.8566, startLng: -2.3522, endLat: 52.52, endLng: 13.405, arcAlt: 0.1, color: '#2b6fff' },
  { order: 7, startLat: 52.52, startLng: 13.405, endLat: 34.0522, endLng: -118.2437, arcAlt: 0.2, color: '#2b6fff' },
  { order: 8, startLat: 49.2827, startLng: -123.1207, endLat: 52.3676, endLng: 4.9041, arcAlt: 0.2, color: '#2b6fff' },
  { order: 8, startLat: 1.3521, startLng: 103.8198, endLat: 40.7128, endLng: -74.006, arcAlt: 0.5, color: '#2b6fff' },
  { order: 9, startLat: 51.5072, startLng: -0.1276, endLat: 34.0522, endLng: -118.2437, arcAlt: 0.2, color: '#2b6fff' },
  { order: 9, startLat: 22.3193, startLng: 114.1694, endLat: -22.9068, endLng: -43.1729, arcAlt: 0.7, color: '#2b6fff' },
  { order: 9, startLat: 1.3521, startLng: 103.8198, endLat: -34.6037, endLng: -58.3816, arcAlt: 0.5, color: '#2b6fff' },
  { order: 10, startLat: -22.9068, startLng: -43.1729, endLat: 28.6139, endLng: 77.209, arcAlt: 0.7, color: '#2b6fff' },
  { order: 10, startLat: 34.0522, startLng: -118.2437, endLat: 31.2304, endLng: 121.4737, arcAlt: 0.3, color: '#2b6fff' },
  { order: 10, startLat: -6.2088, startLng: 106.8456, endLat: 52.3676, endLng: 4.9041, arcAlt: 0.3, color: '#2b6fff' },
  { order: 11, startLat: 41.9028, startLng: 12.4964, endLat: 34.0522, endLng: -118.2437, arcAlt: 0.2, color: '#2b6fff' },
  { order: 11, startLat: -6.2088, startLng: 106.8456, endLat: 31.2304, endLng: 121.4737, arcAlt: 0.2, color: '#2b6fff' },
  { order: 11, startLat: 22.3193, startLng: 114.1694, endLat: 1.3521, endLng: 103.8198, arcAlt: 0.2, color: '#2b6fff' },
  { order: 12, startLat: 34.0522, startLng: -118.2437, endLat: 37.7749, endLng: -122.4194, arcAlt: 0.1, color: '#2b6fff' },
  { order: 12, startLat: 35.6762, startLng: 139.6503, endLat: 22.3193, endLng: 114.1694, arcAlt: 0.2, color: '#2b6fff' },
  { order: 12, startLat: 22.3193, startLng: 114.1694, endLat: 34.0522, endLng: -118.2437, arcAlt: 0.3, color: '#2b6fff' },
  { order: 13, startLat: 52.52, startLng: 13.405, endLat: 22.3193, endLng: 114.1694, arcAlt: 0.3, color: '#2b6fff' },
  { order: 13, startLat: -22.9068, startLng: -43.1729, endLat: -34.6037, endLng: -58.3816, arcAlt: 0.1, color: '#2b6fff' },
];

const countryFeatures = countries as unknown as FeatureCollection;

function randomIndexes(min: number, max: number, count: number) {
  const selected: number[] = [];
  while (selected.length < count) {
    const value = Math.floor(Math.random() * (max - min)) + min;
    if (!selected.includes(value)) selected.push(value);
  }
  return selected;
}

const GlobeRenderer: React.FC<{ playing: boolean }> = ({ playing }) => {
  const globeRef = useRef<InstanceType<typeof ThreeGlobe> | null>(null);
  const [ready, setReady] = useState(false);

  const points = useMemo(() => {
    const allPoints: GlobePoint[] = [];
    globeArcs.forEach((arc) => {
      allPoints.push({ size: globeConfig.pointSize, order: arc.order, color: arc.color, lat: arc.startLat, lng: arc.startLng });
      allPoints.push({ size: globeConfig.pointSize, order: arc.order, color: arc.color, lat: arc.endLat, lng: arc.endLng });
    });
    return allPoints.filter(
      (point, index, array) => array.findIndex((candidate) => candidate.lat === point.lat && candidate.lng === point.lng) === index,
    );
  }, []);

  useEffect(() => {
    if (globeRef.current) return;
    globeRef.current = new ThreeGlobe();
    setReady(true);
  }, []);

  useEffect(() => {
    const globe = globeRef.current;
    if (!globe || !ready) return;

    const material = globe.globeMaterial() as unknown as { color: Color; emissive: Color; emissiveIntensity: number; shininess: number };
    material.color = new Color(globeConfig.globeColor);
    material.emissive = new Color(globeConfig.emissive);
    material.emissiveIntensity = globeConfig.emissiveIntensity;
    material.shininess = globeConfig.shininess;

    globe
      .hexPolygonsData(countryFeatures.features)
      .hexPolygonResolution(3)
      .hexPolygonMargin(0.7)
      .showAtmosphere(globeConfig.showAtmosphere)
      .atmosphereColor(globeConfig.atmosphereColor)
      .atmosphereAltitude(globeConfig.atmosphereAltitude)
      .hexPolygonColor(() => globeConfig.polygonColor)
      .arcsData(globeArcs)
      .arcStartLat((arc: object) => (arc as GlobeArc).startLat)
      .arcStartLng((arc: object) => (arc as GlobeArc).startLng)
      .arcEndLat((arc: object) => (arc as GlobeArc).endLat)
      .arcEndLng((arc: object) => (arc as GlobeArc).endLng)
      .arcColor((arc: object) => (arc as GlobeArc).color)
      .arcAltitude((arc: object) => (arc as GlobeArc).arcAlt)
      .arcStroke(() => [0.32, 0.28, 0.3][Math.round(Math.random() * 2)] ?? 0.3)
      .arcDashLength(globeConfig.arcLength)
      .arcDashInitialGap((arc: object) => (arc as GlobeArc).order)
      .arcDashGap(15)
      .arcDashAnimateTime(globeConfig.arcTime)
      .pointsData(points)
      .pointColor((point: object) => (point as GlobePoint).color)
      .pointsMerge(true)
      .pointAltitude(0)
      .pointRadius(2)
      .ringsData([])
      .ringColor(() => globeConfig.polygonColor)
      .ringMaxRadius(globeConfig.maxRings)
      .ringPropagationSpeed(3)
      .ringRepeatPeriod((globeConfig.arcTime * globeConfig.arcLength) / globeConfig.rings);
  }, [points, ready]);

  useEffect(() => {
    if (!ready || !playing) return;
    const interval = window.setInterval(() => {
      const indexes = randomIndexes(0, globeArcs.length, Math.floor((globeArcs.length * 4) / 5));
      const rings: GlobeRing[] = globeArcs
        .filter((_, index) => indexes.includes(index))
        .map((arc) => ({ lat: arc.startLat, lng: arc.startLng, color: arc.color }));
      globeRef.current?.ringsData(rings);
    }, 2000);

    return () => window.clearInterval(interval);
  }, [ready, playing]);

  useEffect(() => {
    if (!ready) return;
    if (playing) globeRef.current?.resumeAnimation();
    else globeRef.current?.pauseAnimation();
    return () => { globeRef.current?.pauseAnimation(); };
  }, [ready, playing]);

  return globeRef.current ? <primitive object={globeRef.current} /> : null;
};

const RendererConfig: React.FC = () => {
  const { gl, size } = useThree();

  useEffect(() => {
    gl.setSize(size.width, size.height);
    gl.setClearColor(0xffaaff, 0);
  }, [gl, size.height, size.width]);

  return null;
};

export const PayatomWorld: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const playing = useAnimationPlayback(ref);
  const hasEntered = useInView(ref, { once: true, margin: '400px' });
  const camera = useMemo(() => new PerspectiveCamera(50, 1.2, 180, 1800), []);
  const scene = useMemo(() => {
    const nextScene = new Scene();
    nextScene.fog = new Fog(0xffffff, 400, 2000);
    return nextScene;
  }, []);

  return (
    <div ref={ref} className="h-full w-full" data-globe-playing={playing}>
    {hasEntered && <Canvas scene={scene} camera={camera} dpr={[1, 1.5]} frameloop={playing ? 'always' : 'never'}>
      <RendererConfig />
      <ambientLight color={globeConfig.ambientLight} intensity={0.6} />
      <directionalLight color={globeConfig.directionalLeftLight} position={new Vector3(-400, 100, 400)} />
      <directionalLight color={globeConfig.directionalTopLight} position={new Vector3(-200, 500, 200)} />
      <pointLight color={globeConfig.pointLight} position={new Vector3(-200, 500, 200)} intensity={0.8} />
      <GlobeRenderer playing={playing} />
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minDistance={300}
        maxDistance={300}
        autoRotate={playing}
        autoRotateSpeed={globeConfig.autoRotateSpeed}
        minPolarAngle={Math.PI / 3.5}
        maxPolarAngle={Math.PI - Math.PI / 3}
      />
    </Canvas>}
    </div>
  );
};
