import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native';
import { INGREDIENTS, UI_COLORS, IngredientType } from '../../lib/core/config';
import { useBurger } from '../../modules/builder/context/BurgerContext';

export default function IngredientSelector() {
  const { addIngredient, stack } = useBurger();

  // Convertimos el objeto de ingredientes en una lista para el FlatList
  const ingredientList = Object.values(INGREDIENTS);

  const renderItem = ({ item }: { item: typeof ingredientList[0] }) => {
    const count = stack.filter(id => id === item.id).length;
    const isMaxed = count >= item.max;

    return (
      <TouchableOpacity
        style={[
          styles.card,
          { borderColor: item.color },
          isMaxed && styles.disabledCard
        ]}
        onPress={() => addIngredient(item.id)}
        disabled={isMaxed}
      >
        <Text style={styles.emoji}>{item.id.includes('pan') ? '🍞' : item.id.includes('carne') ? '🥩' : '🧀'}</Text>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>${item.price.toFixed(2)}</Text>
        {count > 0 && (
          <View style={[styles.badge, { backgroundColor: item.color }]}>
            <Text style={styles.badgeText}>{count}</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Añade ingredientes</Text>
      <FlatList
        data={ingredientList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    backgroundColor: UI_COLORS.surface,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  title: {
    color: UI_COLORS.text,
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 20,
    marginBottom: 15,
  },
  listContent: {
    paddingHorizontal: 15,
  },
  card: {
    width: 100,
    height: 120,
    backgroundColor: '#252525',
    borderRadius: 15,
    marginHorizontal: 5,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  disabledCard: {
    opacity: 0.5,
  },
  emoji: { fontSize: 24, marginBottom: 5 },
  name: {
    color: UI_COLORS.text,
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '600',
  },
  price: {
    color: UI_COLORS.primary,
    fontSize: 12,
    marginTop: 4,
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -5,
    width: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#000',
    fontSize: 12,
    fontWeight: 'bold',
  },
});