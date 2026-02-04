import React, { createContext, useContext, useState } from 'react';
import { IngredientType } from '../../../lib/core/config';

interface BurgerContextType {
  stack: IngredientType[];
  addIngredient: (type: IngredientType) => void;
  removeIngredient: (index: number) => void;
  setStack: React.Dispatch<React.SetStateAction<IngredientType[]>>;
}

const BurgerContext = createContext<BurgerContextType | undefined>(undefined);

export const BurgerProvider = ({ children }: { children: React.ReactNode }) => {
  const [stack, setStack] = useState<IngredientType[]>(['panAbajo', 'panArriba']);

  const addIngredient = (type: IngredientType) => {
    setStack((prev) => {
      const newStack = [...prev];
      // Insertamos antes del pan de arriba (última posición)
      newStack.splice(newStack.length - 1, 0, type);
      return newStack;
    });
  };

  const removeIngredient = (index: number) => {
    setStack((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <BurgerContext.Provider value={{ stack, addIngredient, removeIngredient, setStack }}>
      {children}
    </BurgerContext.Provider>
  );
};

export const useBurger = () => {
  const context = useContext(BurgerContext);
  if (!context) throw new Error('useBurger debe usarse dentro de BurgerProvider');
  return context;
};