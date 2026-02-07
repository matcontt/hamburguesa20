import React from 'react';
import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import BurgerCanvas from '../components/molecules/BurgerCanvas';
import IngredientSelector from '../components/molecules/IngredientSelector';
import OrderFooter from '../components/organisms/OrderFooter';
import { useBurger } from '../lib//modules/builder/context/BurgerContext';
import { UI_COLORS } from '../lib/core/config';
import { useAuth } from '../lib/modules/auth/AuthProvider';

export default function App() {
  const { stack } = useBurger();
  const { signOut } = useAuth();
  const { clearBurger } = useBurger();
  
  const ingredientCount = stack.filter(id => !id.includes('pan')).length;

  const handleLogout = async () => {
    try {
      clearBurger();
      await signOut();
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <StatusBar barStyle="light-content" backgroundColor={UI_COLORS.background} />
        
        <View style={styles.container}>
          {/* Header con título y logout */}
          <View style={styles.header}>
            <View>
              <Text style={styles.title}>🍔 Burger Builder</Text>
              <Text style={styles.subtitle}>
                {ingredientCount === 0 
                  ? 'Crea tu hamburguesa perfecta' 
                  : `${ingredientCount} ${ingredientCount === 1 ? 'ingrediente' : 'ingredientes'}`
                }
              </Text>
            </View>
            
            <TouchableOpacity 
              onPress={handleLogout}
              style={styles.logoutButton}
            >
              <Text style={styles.logoutText}>Salir</Text>
            </TouchableOpacity>
          </View>

          {/* Visualizador 3D */}
          <View style={styles.visualizerContainer}>
            <BurgerCanvas />
          </View>

          {/* Panel de control */}
          <View style={styles.controlPanel}>
            <IngredientSelector />
            <OrderFooter />
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: UI_COLORS.background,
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: UI_COLORS.background,
    borderBottomWidth: 1,
    borderBottomColor: '#333', // Color fijo que funciona con tu tema
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: UI_COLORS.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#888', // Color fijo que funciona con tu tema
    fontWeight: '500',
  },
  logoutButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: UI_COLORS.secondary,
    borderRadius: 8,
  },
  logoutText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
  },
  visualizerContainer: {
    flex: 1,
    minHeight: 300,
  },
  controlPanel: {
    backgroundColor: UI_COLORS.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: 'hidden',
    paddingTop: 8,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
});