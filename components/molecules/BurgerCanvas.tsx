import React, { Suspense } from 'react';
import { StyleSheet, View } from 'react-native';
import { Canvas } from '@react-three/fiber/native';
import { OrbitControls, Stage, ContactShadows } from '@react-three/drei/native';
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
        camera={{ position: [0, 2, 4], fov: 40 }}
      >
        <Suspense fallback={null}>
          <AmbientLight intensity={0.7} />
          <PointLight position={[10, 10, 10]} intensity={1} />
          
          {/* Eliminado el parámetro erróneo contactShadow */}
          <Stage adjustCamera={true} environment="city" intensity={0.5}>
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
            enablePan={false}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={Math.PI / 1.8}
            enableDamping={true}
            dampingFactor={0.1}
          />
        </Suspense>
      </Canvas>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#050505' },
});