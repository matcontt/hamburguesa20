import React, { createContext, useContext, useState } from 'react';
import { IngredientType } from '../../../lib/core/config';

interface BurgerContextType {
  stack: IngredientType[];
  addIngredient: (type: IngredientType) => void;
  removeIngredient: (type: IngredientType) => void;
  setStack: React.Dispatch<React.SetStateAction<IngredientType[]>>;
}

const BurgerContext = createContext<BurgerContextType | undefined>(undefined);

export const BurgerProvider = ({ children }: { children: React.ReactNode }) => {
  const [stack, setStack] = useState<IngredientType[]>(['panAbajo', 'panArriba']);

  const addIngredient = (type: IngredientType) => {
    if (type === 'panArriba' || type === 'panAbajo') return;

    setStack((prev) => {
      // Usamos "as any" o casting específico para evitar el error de comparación de tipos
      const fillings = prev.filter(id => id !== ('panAbajo' as any) && id !== ('panArriba' as any));
      return ['panAbajo', ...fillings, type, 'panArriba'] as IngredientType[];
    });
  };

  const removeIngredient = (type: IngredientType) => {
    setStack((prev) => {
      const fillings = prev.filter(id => id !== ('panAbajo' as any) && id !== ('panArriba' as any));
      const lastIndex = fillings.lastIndexOf(type);
      
      if (lastIndex === -1) return prev;

      const newFillings = [...fillings];
      newFillings.splice(lastIndex, 1);
      
      return ['panAbajo', ...newFillings, 'panArriba'] as IngredientType[];
    });
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