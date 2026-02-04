import React, { Suspense } from 'react';
import { StyleSheet, View } from 'react-native';
import { Canvas } from '@react-three/fiber/native';
import { OrbitControls, Stage, ContactShadows } from '@react-three/drei/native';
import { useBurger } from '../../modules/builder/context/BurgerContext';
import BurgerModel from './BurgerModel';

// Etiquetas para evitar el berrinche de TS
const AmbientLight = 'ambientLight' as any;
const PointLight = 'pointLight' as any;

export default function BurgerCanvas() {
  const { stack } = useBurger();

  return (
    <View style={styles.container}>
      <Canvas
        shadows
        camera={{ position: [0, 2, 5], fov: 40 }}
      >
        <Suspense fallback={null}>
          <AmbientLight intensity={0.7} />
          <PointLight position={[10, 10, 10]} intensity={1} />
          
          {/* Corregido: Se eliminó contactShadow que causaba error de tipos */}
          <Stage adjustCamera={true} environment="city" intensity={0.5}>
             <BurgerModel stack={stack} />
          </Stage>

          {/* Usamos este para las sombras en el suelo, es más compatible */}
          <ContactShadows opacity={0.4} scale={10} blur={2.5} far={4} />
          
          <OrbitControls 
            enablePan={false} 
            minPolarAngle={Math.PI / 4} 
            maxPolarAngle={Math.PI / 2} 
          />
        </Suspense>
      </Canvas>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#050505' },
});