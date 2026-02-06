import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { INGREDIENTS, UI_COLORS } from '../../lib/core/config';
import { useBurger } from '../../lib/modules/builder/context/BurgerContext';

export default function IngredientSelector() {
  const { toggleIngredient, stack } = useBurger();
  const ingredientList = Object.values(INGREDIENTS).filter(ing => !ing.id.includes('pan'));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Personaliza tu burger</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.list}>
        {ingredientList.map((item) => {
          const isSelected = stack.includes(item.id);
          
          return (
            <TouchableOpacity 
              key={item.id} 
              style={[
                styles.card, 
                { borderColor: item.color },
                isSelected && styles.cardSelected
              ]}
              onPress={() => toggleIngredient(item.id)}
              activeOpacity={0.7}
            >
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.price}>${item.price.toFixed(2)}</Text>
              
              <View style={[
                styles.statusBadge,
                isSelected && styles.statusBadgeActive
              ]}>
                <Text style={[
                  styles.statusText,
                  isSelected && styles.statusTextActive
                ]}>
                  {isSelected ? '✓ Agregado' : '+ Agregar'}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingVertical: 15 },
  title: { 
    color: '#888', 
    marginLeft: 20, 
    marginBottom: 10, 
    fontSize: 12, 
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  list: { paddingHorizontal: 15, gap: 8 },
  card: {
    backgroundColor: '#1A1A1A',
    borderRadius: 15,
    padding: 12,
    width: 110,
    borderWidth: 2,
    alignItems: 'center'
  },
  cardSelected: {
    backgroundColor: '#252520',
    borderWidth: 3,
  },
  name: { 
    color: '#FFF', 
    fontSize: 12, 
    fontWeight: 'bold', 
    marginBottom: 6,
    textAlign: 'center',
  },
  price: { 
    color: UI_COLORS.primary, 
    fontSize: 13, 
    fontWeight: '600',
    marginBottom: 10,
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    backgroundColor: '#2A2A2A',
  },
  statusBadgeActive: {
    backgroundColor: UI_COLORS.primary,
  },
  statusText: { 
    color: '#888',
    fontSize: 10, 
    fontWeight: '600',
  },
  statusTextActive: {
    color: '#000',
  },
});