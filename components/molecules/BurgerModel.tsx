import React, { useMemo } from 'react';
import { useGLTF } from '@react-three/drei/native';
import { IngredientType } from '../../lib/core/config';

export default function BurgerModel({ stack }: { stack: IngredientType[] }) {
  const { nodes } = useGLTF(require('../../assets/models/hamburguesa.glb')) as any;

  // Sistema simple: solo mostrar/ocultar en posiciones originales de Blender
  const renderedStack = useMemo(() => {
    const elements: React.ReactElement[] = [];
    
    // Panes siempre visibles
    if (nodes['panAbajo']) {
      elements.push(
        <primitive 
          key="panAbajo" 
          object={nodes['panAbajo'].clone()} 
        />
      );
    }
    
    if (nodes['panArriba']) {
      elements.push(
        <primitive 
          key="panArriba" 
          object={nodes['panArriba'].clone()} 
        />
      );
    }

    // Ingredientes solo si están seleccionados
    const ingredients = ['carne1', 'carne2', 'carne3', 'pollo1', 'pollo2', 'queso1', 'queso2'];
    
    ingredients.forEach(id => {
      if (stack.includes(id as IngredientType) && nodes[id]) {
        elements.push(
          <primitive 
            key={id} 
            object={nodes[id].clone()} 
          />
        );
      }
    });

    return elements;
  }, [stack, nodes]);

  return <group dispose={null}>{renderedStack}</group>;
}