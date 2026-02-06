import React, { createContext, useContext, useState } from 'react';
import { IngredientType } from '../../../core/config';

interface BurgerContextType {
  stack: IngredientType[];
  toggleIngredient: (type: IngredientType) => void;
  clearBurger: () => void;
}

const BurgerContext = createContext<BurgerContextType | undefined>(undefined);

export const BurgerProvider = ({ children }: { children: React.ReactNode }) => {
  // Panes siempre presentes
  const [stack, setStack] = useState<IngredientType[]>(['panAbajo', 'panArriba']);

  const toggleIngredient = (type: IngredientType) => {
    if (type === 'panArriba' || type === 'panAbajo') return;

    setStack((prev) => {
      // Toggle: si está, lo quitamos; si no está, lo agregamos
      if (prev.includes(type)) {
        return prev.filter(id => id !== type);
      }
      return [...prev, type];
    });
  };

  const clearBurger = () => {
    setStack(['panAbajo', 'panArriba']);
  };

  return (
    <BurgerContext.Provider value={{ stack, toggleIngredient, clearBurger }}>
      {children}
    </BurgerContext.Provider>
  );
};

export const useBurger = () => {
  const context = useContext(BurgerContext);
  if (!context) throw new Error('useBurger debe usarse dentro de BurgerProvider');
  return context;
};