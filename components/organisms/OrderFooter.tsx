import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Alert, ActivityIndicator } from 'react-native';
import { INGREDIENTS, UI_COLORS } from '../../lib/core/config';
import { useBurger } from '../../lib/modules/builder/context/BurgerContext';
import { useAuth } from '../../lib/modules/auth/AuthProvider';
import { supabase } from '../../lib/core/supabase/client.supabase';
import PriceTag from '../atoms/PriceTag';

export default function OrderFooter() {
  const { stack, clearBurger } = useBurger();
  const { session } = useAuth();
  const [loading, setLoading] = useState(false);

  // Calcular precio total
  const totalPrice = stack.reduce((acc, id) => {
    const ingredient = INGREDIENTS[id];
    return acc + (ingredient ? ingredient.price : 0);
  }, 0);

  // Verificar si hay ingredientes además de los panes
  const hasIngredients = stack.length > 2;

  const handleOrder = async () => {
    if (!session?.user.id) {
      Alert.alert('Error', 'Debes iniciar sesión para ordenar');
      return;
    }

    setLoading(true);
    
    try {
      // Guardar el pedido en Supabase
      const { data, error } = await supabase
        .from('orders')
        .insert([{
          user_id: session.user.id,
          burger_items: stack, // Guardar los ingredientes
          total_price: totalPrice,
          status: 'on_way' // Estado del pedido
        }])
        .select();

      if (error) {
        console.error('Error creando pedido:', error);
        Alert.alert('Error', 'No se pudo crear el pedido');
        return;
      }

      console.log('✅ Pedido creado:', data);
      
      // Limpiar la hamburguesa
      clearBurger();
      
      // Mostrar confirmación
      Alert.alert(
        '🎉 ¡Pedido realizado!',
        'Minimiza la app para recibir la notificación de seguimiento',
        [{ text: 'OK' }]
      );

    } catch (err) {
      console.error('Error inesperado:', err);
      Alert.alert('Error', 'Ocurrió un error inesperado');
    } finally {
      setLoading(false);
    }
  };

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
            style={[styles.orderButton, (!hasIngredients || loading) && styles.disabled]}
            onPress={handleOrder}
            disabled={!hasIngredients || loading}
            activeOpacity={0.7}
          >
            {loading ? (
              <ActivityIndicator color="#000" />
            ) : (
              <Text style={styles.orderText}>Ordenar</Text>
            )}
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
    minWidth: 100,
    alignItems: 'center',
  },
  orderText: {
    color: '#000',
    fontWeight: 'bold',
  },
  disabled: {
    opacity: 0.4,
  },
});