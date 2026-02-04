import React, { Suspense } from 'react';
import { StyleSheet, View } from 'react-native';
import { Canvas } from '@react-three/fiber/native';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei/native';
import { useBurger } from '../../modules/builder/context/BurgerContext';
import BurgerModel from './BurgerModel';

const AmbientLight = 'ambientLight' as any;
const PointLight = 'pointLight' as any;

export default function BurgerCanvas() {
  const { stack } = useBurger();

  return (
    <View style={styles.container}>
      <Canvas
        shadows
        camera={{ position: [0, 0.9, 2.8], fov: 50 }}
        gl={{ 
          powerPreference: "high-performance",
          antialias: true,
        }}
      >
        <Suspense fallback={null}>
          {/* Iluminación */}
          <AmbientLight intensity={0.8} />
          <PointLight position={[5, 5, 5]} intensity={1.2} />
          <PointLight position={[-5, 3, -5]} intensity={0.5} />
          
          <Environment preset="city" />

          {/* Hamburguesa centrada */}
          <group position={[0, 0, 0]}>
            <BurgerModel stack={stack} />
          </group>

          {/* Sombras */}
          <ContactShadows 
            position={[0, 0, 0]} 
            opacity={0.3} 
            scale={4} 
            blur={2} 
            far={2} 
          />
          
          {/* CONTROLES MÓVILES OPTIMIZADOS */}
          <OrbitControls 
            makeDefault
            
            // ROTACIÓN - Un dedo
            enableRotate={true}
            rotateSpeed={0.7}
            autoRotate={false}
            
            // ZOOM - Dos dedos (pellizcar)
            enableZoom={true}
            zoomSpeed={0.8}
            minDistance={1.5}
            maxDistance={5}
            
            // PAN deshabilitado
            enablePan={false}
            
            // Límites verticales suaves
            minPolarAngle={Math.PI / 8}     // No demasiado arriba
            maxPolarAngle={Math.PI * 0.85}  // No demasiado abajo
            
            // Damping para movimiento fluido
            enableDamping={true}
            dampingFactor={0.06}
            
            // CONFIGURACIÓN CRÍTICA PARA MÓVIL
            touches={{
              ONE: 2,    // Un dedo = ROTATE (girar)
              TWO: 1     // Dos dedos = DOLLY (zoom/pellizcar)
            }}
            
            // Centro de la hamburguesa
            target={[0, 0.8, 0]}
            
            // Sin límites de rotación horizontal
            minAzimuthAngle={-Infinity}
            maxAzimuthAngle={Infinity}
          />
        </Suspense>
      </Canvas>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#050505',
  },
});