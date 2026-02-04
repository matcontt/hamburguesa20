import React, { createContext, useContext, useState, useMemo } from 'react';
import { IngredientType, INGREDIENTS } from '../../../lib/core/config';

interface BurgerContextType {
  stack: IngredientType[];
  addIngredient: (type: IngredientType) => void;
  removeIngredient: (index: number) => void;
  totalPrice: number;
}

const BurgerContext = createContext<BurgerContextType | undefined>(undefined);

export const BurgerProvider = ({ children }: { children: React.ReactNode }) => {
  // Iniciamos la hamburguesa solo con el pan de abajo
  const [stack, setStack] = useState<IngredientType[]>(['panAbajo']);

  const addIngredient = (type: IngredientType) => {
    // Verificamos si el ingrediente existe en nuestra config de Blender
    if (!INGREDIENTS[type]) return;

    const currentCount = stack.filter(t => t === type).length;
    
    // Solo añadimos si no supera el máximo permitido (usualmente 1 para piezas únicas)
    if (currentCount < INGREDIENTS[type].max) {
      setStack(prev => [...prev, type]);
    }
  };

  const removeIngredient = (index: number) => {
    // El panAbajo (índice 0) es obligatorio, no se puede quitar
    if (index === 0) return;
    setStack(prev => prev.filter((_, i) => i !== index));
  };

  const totalPrice = useMemo(() => {
    return stack.reduce((sum, type) => sum + INGREDIENTS[type].price, 0);
  }, [stack]);

  return (
    <BurgerContext.Provider value={{ stack, addIngredient, removeIngredient, totalPrice }}>
      {children}
    </BurgerContext.Provider>
  );
};

export const useBurger = () => {
  const context = useContext(BurgerContext);
  if (!context) throw new Error('useBurger debe usarse dentro de BurgerProvider');
  return context;
};