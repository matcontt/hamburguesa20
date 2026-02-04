import React, { Suspense } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { Canvas } from '@react-three/fiber/native';
import { PerspectiveCamera, OrbitControls, Stage } from '@react-three/drei/native';
import { useBurger } from '../../modules/builder/context/BurgerContext';
import BurgerModel from './BurgerModel'; // Lo crearemos en el siguiente paso

export default function BurgerCanvas() {
  const { stack } = useBurger();

  return (
    <View style={styles.container}>
      <Canvas
        shadows
        camera={{ position: [0, 2, 5], fov: 50 }}
        onCreated={(state) => {
          const gl = state.gl;
          gl.setClearColor('#050505'); // Color de fondo oscuro premium
        }}
      >
        <Suspense fallback={null}>
          <Stage intensity={0.5} environment="city" adjustCamera={false}>
            {/* Aquí es donde se renderizará el modelo que depende del stack */}
            <BurgerModel stack={stack} />
          </Stage>
          <OrbitControls enablePan={false} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 4} />
        </Suspense>
      </Canvas>
      
      {/* Indicador de carga mientras el modelo GLB se descarga/procesa */}
      <Suspense fallback={<ActivityIndicator size="large" color="#FFD700" style={styles.loader} />} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050505',
  },
  loader: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -20 }, { translateY: -20 }],
  },
});