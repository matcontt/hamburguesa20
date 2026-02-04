import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Animated, { FadeInRight } from 'react-native-reanimated';
import { INGREDIENTS, UI_COLORS, IngredientType } from '../../lib/core/config';
import { useBurger } from '../../modules/builder/context/BurgerContext';

export default function IngredientSelector() {
  const { addIngredient, stack } = useBurger();
  const ingredientList = Object.values(INGREDIENTS);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Añade ingredientes</Text>
      <Animated.FlatList
        data={ingredientList}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => {
          const count = stack.filter(id => id === item.id).length;
          const isMaxed = count >= item.max;

          return (
            <Animated.View entering={FadeInRight.delay(index * 100)}>
              <TouchableOpacity
                style={[styles.card, { borderColor: item.color }, isMaxed && styles.disabledCard]}
                onPress={() => addIngredient(item.id)}
                disabled={isMaxed}
              >
                <Text style={styles.emoji}>
                    {item.id.includes('pan') ? '🍞' : item.id.includes('carne') ? '🥩' : item.id.includes('pollo') ? '🍗' : '🧀'}
                </Text>
                <Text style={styles.name}>{item.name}</Text>
                {count > 0 && (
                  <View style={[styles.badge, { backgroundColor: item.color }]}>
                    <Text style={styles.badgeText}>{count}</Text>
                  </View>
                )}
              </TouchableOpacity>
            </Animated.View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingVertical: 20, backgroundColor: UI_COLORS.surface, borderTopLeftRadius: 25, borderTopRightRadius: 25 },
  title: { color: UI_COLORS.text, fontSize: 18, fontWeight: 'bold', marginLeft: 20, marginBottom: 15 },
  listContent: { paddingHorizontal: 15 },
  card: { width: 90, height: 100, backgroundColor: '#252525', borderRadius: 15, marginHorizontal: 5, padding: 10, alignItems: 'center', justifyContent: 'center', borderWidth: 1 },
  disabledCard: { opacity: 0.3 },
  emoji: { fontSize: 24, marginBottom: 5 },
  name: { color: UI_COLORS.text, fontSize: 11, textAlign: 'center', fontWeight: '600' },
  badge: { position: 'absolute', top: -5, right: -5, width: 20, height: 20, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  badgeText: { color: '#000', fontSize: 10, fontWeight: 'bold' },
});