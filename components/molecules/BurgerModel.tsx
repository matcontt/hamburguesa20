import React, { useMemo } from 'react';
import { useGLTF } from '@react-three/drei/native';
import { IngredientType } from '../../lib/core/config';

// Alturas para el apilamiento
const HEIGHTS: Record<string, number> = {
  panAbajo: 0.35,
  carne1: 0.22, carne2: 0.22, carne3: 0.22,
  pollo1: 0.28, pollo2: 0.28,
  queso1: 0.08, queso2: 0.08,
  panArriba: 0.30,
};

export default function BurgerModel({ stack }: { stack: IngredientType[] }) {
  // Cargamos el modelo
  const { nodes } = useGLTF(require('../../../assets/models/hamburguesa.glb')) as any;

  const parts = useMemo(() => {
    let currentY = 0;
    return stack.map((type, index) => {
      const mesh = nodes[type];
      if (!mesh) return null;

      const positionY = currentY;
      currentY += HEIGHTS[type] || 0.2;

      // Retornamos un clon de la malla con la posición aplicada directamente
      const clonedMesh = mesh.clone();
      clonedMesh.position.set(0, positionY, 0);
      return clonedMesh;
    });
  }, [stack, nodes]);

  // USAMOS UN FRAGMENTO Y RENDERIZAMOS LOS OBJETOS DIRECTAMENTE
  // 'primitive' es el único que dejaremos, pero lo "engañamos" con un cast
  const Primitive = 'primitive' as any;
  const Group = 'group' as any;

  return (
    <Group dispose={null}>
      {parts.map((mesh, index) => (
        mesh && <Primitive key={`${mesh.uuid}-${index}`} object={mesh} />
      ))}
    </Group>
  );
}