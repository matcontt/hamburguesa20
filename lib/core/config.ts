export type IngredientType = 
  | 'panAbajo' | 'panArriba' 
  | 'carne1' | 'carne2' | 'carne3' 
  | 'queso1' | 'queso2' 
  | 'pollo1' | 'pollo2';

export interface Ingredient {
  id: IngredientType;
  name: string;
  price: number;
  color: string;
  max: number;
}

export const INGREDIENTS: Record<IngredientType, Ingredient> = {
  panAbajo: { id: 'panAbajo', name: 'Pan Base', price: 0.5, color: '#D2B48C', max: 1 },
  panArriba: { id: 'panArriba', name: 'Pan Top', price: 0.5, color: '#D2B48C', max: 1 },
  carne1: { id: 'carne1', name: 'Carne Angus', price: 2.5, color: '#4B2C20', max: 3 },
  carne2: { id: 'carne2', name: 'Carne Smash', price: 2.0, color: '#5D3A2E', max: 3 },
  carne3: { id: 'carne3', name: 'Carne Parrilla', price: 2.2, color: '#3D1F16', max: 3 },
  pollo1: { id: 'pollo1', name: 'Pollo Crispy', price: 2.0, color: '#F4A460', max: 2 },
  pollo2: { id: 'pollo2', name: 'Pollo Grill', price: 1.8, color: '#DEB887', max: 2 },
  queso1: { id: 'queso1', name: 'Cheddar', price: 0.5, color: '#FFD700', max: 4 },
  queso2: { id: 'queso2', name: 'Mozzarella', price: 0.6, color: '#F0EAD6', max: 4 },
};

export const UI_COLORS = {
  background: '#050505',
  surface: '#121212',
  primary: '#F5A623',
  secondary: '#FF4444', // Color añadido para reset/limpiar
  text: '#FFFFFF',
};