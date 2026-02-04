export type IngredientType = 
  | 'panAbajo' 
  | 'carne1' | 'carne2' | 'carne3' 
  | 'pollo1' | 'pollo2' 
  | 'queso1' | 'queso2' 
  | 'panArriba';

export interface IngredientConfig {
  id: IngredientType;
  name: string;
  price: number;
  max: number;
  color: string;
}

export const INGREDIENTS: Record<IngredientType, IngredientConfig> = {
  panAbajo: { id: 'panAbajo', name: 'Pan Base', price: 2.0, max: 1, color: '#D2B48C' },
  carne1:   { id: 'carne1',   name: 'Carne Angus 1', price: 4.5, max: 1, color: '#5D2906' },
  carne2:   { id: 'carne2',   name: 'Carne Angus 2', price: 4.5, max: 1, color: '#5D2906' },
  carne3:   { id: 'carne3',   name: 'Carne Angus 3', price: 4.5, max: 1, color: '#5D2906' },
  pollo1:   { id: 'pollo1',   name: 'Pollo Crispy 1', price: 3.5, max: 1, color: '#F39C12' },
  pollo2:   { id: 'pollo2',   name: 'Pollo Crispy 2', price: 3.5, max: 1, color: '#F39C12' },
  queso1:   { id: 'queso1',   name: 'Queso Cheddar 1', price: 1.5, max: 1, color: '#F1C40F' },
  queso2:   { id: 'queso2',   name: 'Queso Cheddar 2', price: 1.5, max: 1, color: '#F1C40F' },
  panArriba: { id: 'panArriba', name: 'Pan Tapa', price: 1.0, max: 1, color: '#D2B48C' },
};

export const UI_COLORS = {
  background: '#050505',
  surface: '#1A1A1A',
  primary: '#FFD700', 
  text: '#FFFFFF',
};