import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useBurger } from '../../modules/builder/context/BurgerContext';
import { UI_COLORS, INGREDIENTS } from '../../lib/core/config';
import PriceTag from '../atoms/PriceTag';

export default function OrderFooter() {
  const { stack, setStack } = useBurger();

  // Calculamos el precio basándonos en los ingredientes actuales
  const totalPrice = stack.reduce((acc, id) => {
    const ingredient = INGREDIENTS[id];
    return acc + (ingredient ? ingredient.price : 0);
  }, 0);

  // Función para resetear la hamburguesa al estado inicial
  const handleReset = () => {
    setStack(['panAbajo', 'panArriba']);
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {/* Usamos el Átomo PriceTag */}
        <PriceTag label="Total" amount={totalPrice} />
        
        <View style={styles.buttonGroup}>
          <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
            <Text style={styles.resetText}>Limpiar</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.orderButton, stack.length < 3 && styles.disabled]}
            onPress={() => alert('¡Pedido enviado!')}
            disabled={stack.length < 3}
          >
            <Text style={styles.orderText}>Ordenar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#1A1A1A',
    borderTopWidth: 1,
    borderColor: '#333',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 10,
  },
  resetButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: UI_COLORS.secondary,
  },
  resetText: {
    color: UI_COLORS.secondary,
    fontWeight: '600',
  },
  orderButton: {
    backgroundColor: UI_COLORS.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  orderText: {
    color: '#000',
    fontWeight: 'bold',
  },
  disabled: {
    backgroundColor: '#555',
    opacity: 0.5,
  },
});