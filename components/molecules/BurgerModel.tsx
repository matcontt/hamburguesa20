import React, { useMemo } from 'react';
import { useGLTF } from '@react-three/drei/native';
import { IngredientType } from '../../lib/core/config';

// Grosores exactos para que las piezas se toquen sin atravesarse
const HEIGHTS: Record<string, number> = {
  panAbajo: 0.08,
  carne1: 0.14,
  carne2: 0.12,
  carne3: 0.14,
  pollo1: 0.18,
  pollo2: 0.15,
  queso1: 0.03,
  queso2: 0.03,
  panArriba: 0.1
};

export default function BurgerModel({ stack }: { stack: IngredientType[] }) {
  // Carga del modelo GLB
  const { nodes } = useGLTF(require('../../assets/models/hamburguesa.glb')) as any;

  const renderedStack = useMemo(() => {
    let currentY = 0;
    
    // Filtramos para obtener solo la base y el relleno (quitamos el pan de arriba temporalmente)
    const baseAndFillings = stack.filter(id => id !== 'panArriba');
    
    // Renderizamos la base y cada ingrediente acumulando altura
    const elements = baseAndFillings.map((id, index) => {
      const positionY = currentY;
      
      // Sumamos la altura de este ingrediente para que el siguiente sepa dónde empezar
      currentY += HEIGHTS[id] || 0.1;

      if (!nodes[id]) return null;

      return (
        <primitive 
          key={`${id}-${index}`} 
          object={nodes[id].clone()} 
          position={[0, positionY, 0]} 
        />
      );
    });

    // Colocamos el Pan de Arriba SIEMPRE al final de la altura acumulada
    if (nodes['panArriba']) {
      elements.push(
        <primitive 
          key="top-bun-final" 
          object={nodes['panArriba'].clone()} 
          position={[0, currentY, 0]} 
        />
      );
    }

    return elements;
  }, [stack, nodes]);

  return <group dispose={null}>{renderedStack}</group>;
}