import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { INGREDIENTS, UI_COLORS, IngredientType } from '../../lib/core/config';
import { useBurger } from '../../modules/builder/context/BurgerContext';

export default function IngredientSelector() {
  const { addIngredient, removeIngredient, stack } = useBurger();
  const ingredientList = Object.values(INGREDIENTS).filter(ing => !ing.id.includes('pan'));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Personaliza tu burger</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.list}>
        {ingredientList.map((item) => {
          const count = stack.filter(id => id === item.id).length;
          return (
            <View key={item.id} style={[styles.card, { borderColor: item.color }]}>
              <Text style={styles.name}>{item.name}</Text>
              <View style={styles.controls}>
                <TouchableOpacity 
                  style={styles.btnSmall} 
                  onPress={() => removeIngredient(item.id)}
                >
                  <Text style={styles.btnText}>-</Text>
                </TouchableOpacity>
                
                <Text style={styles.countText}>{count}</Text>
                
                <TouchableOpacity 
                  style={styles.btnSmall} 
                  onPress={() => addIngredient(item.id)}
                  disabled={count >= item.max}
                >
                  <Text style={styles.btnText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingVertical: 15 },
  title: { color: '#888', marginLeft: 20, marginBottom: 10, fontSize: 12, textTransform: 'uppercase' },
  list: { paddingHorizontal: 15 },
  card: {
    backgroundColor: '#1A1A1A',
    borderRadius: 15,
    padding: 12,
    marginHorizontal: 5,
    width: 110,
    borderWidth: 1,
    alignItems: 'center'
  },
  name: { color: '#FFF', fontSize: 12, fontWeight: 'bold', marginBottom: 10 },
  controls: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  btnSmall: { backgroundColor: '#333', width: 28, height: 28, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
  btnText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
  countText: { color: UI_COLORS.primary, fontWeight: 'bold', fontSize: 16 }
});