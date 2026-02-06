import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { INGREDIENTS, UI_COLORS } from '../../lib/core/config';
import { useBurger } from '../../lib/modules/builder/context/BurgerContext';
import PriceTag from '../atoms/PriceTag';

export default function OrderFooter() {
  const { stack, clearBurger } = useBurger();

  // Calcular precio total
  const totalPrice = stack.reduce((acc, id) => {
    const ingredient = INGREDIENTS[id];
    return acc + (ingredient ? ingredient.price : 0);
  }, 0);

  // Verificar si hay ingredientes además de los panes
  const hasIngredients = stack.length > 2;

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <PriceTag label="Total" amount={totalPrice} />
        
        <View style={styles.buttonGroup}>
          <TouchableOpacity 
            style={[styles.resetButton, !hasIngredients && styles.disabled]} 
            onPress={clearBurger}
            disabled={!hasIngredients}
            activeOpacity={0.7}
          >
            <Text style={styles.resetText}>Limpiar</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.orderButton, !hasIngredients && styles.disabled]}
            onPress={() => alert('¡Pedido enviado!')}
            disabled={!hasIngredients}
            activeOpacity={0.7}
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
    opacity: 0.4,
  },
});