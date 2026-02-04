import React, { Suspense } from 'react';
import { StyleSheet, View } from 'react-native';
import { Canvas } from '@react-three/fiber/native';
import { OrbitControls, Stage, ContactShadows } from '@react-three/drei/native';
import { useBurger } from '../../modules/builder/context/BurgerContext';
import BurgerModel from './BurgerModel';

// Tipado para evitar errores de TS en elementos intrínsecos
const AmbientLight = 'ambientLight' as any;
const PointLight = 'pointLight' as any;

export default function BurgerCanvas() {
  const { stack } = useBurger();

  return (
    <View style={styles.container}>
      <Canvas
        shadows
        // Ajustamos la cámara para que la hamburguesa se vea bien sin zoom
        camera={{ position: [0, 1.2, 3.5], fov: 45 }}
      >
        <Suspense fallback={null}>
          <AmbientLight intensity={0.8} />
          <PointLight position={[5, 5, 5]} intensity={1} />
          
          <Stage adjustCamera={false} environment="city" intensity={0.5}>
             <BurgerModel stack={stack} />
          </Stage>

          <ContactShadows 
            position={[0, -0.05, 0]} 
            opacity={0.4} 
            scale={10} 
            blur={2.5} 
            far={1} 
          />
          
          <OrbitControls 
            makeDefault 
            // --- BLOQUEO DE ZOOM Y MOVIMIENTO ---
            enableZoom={false} // Desactivamos el zoom (pinch)
            enablePan={false}  // Desactivamos el desplazamiento (dos dedos)
            // -------------------------------------
            
            // --- CONFIGURACIÓN DE ROTACIÓN ---
            minPolarAngle={Math.PI / 4}   // Límite para no ver la hamburguesa desde muy abajo
            maxPolarAngle={Math.PI / 1.8} // Límite para no verla desde muy arriba
            enableDamping={true}          // Inercia suave al soltar
            dampingFactor={0.07}
            rotateSpeed={0.8}             // Velocidad de rotación
          />
        </Suspense>
      </Canvas>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#050505' 
  },
});