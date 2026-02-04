import React from 'react';
import { StyleSheet, View, SafeAreaView, StatusBar } from 'react-native';
import { BurgerProvider } from '../modules/builder/context/BurgerContext';
import BurgerCanvas from '../components/molecules/BurgerCanvas';
import IngredientSelector from '../components/molecules/IngredientSelector';
import { UI_COLORS } from '../lib/core/config';

export default function App() {
  return (
    <BurgerProvider>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="light-content" />
        <View style={styles.container}>
          
          {/* Parte Superior: El Visualizador 3D */}
          <View style={styles.visualizerContainer}>
            <BurgerCanvas />
          </View>

          {/* Parte Inferior: El Selector de Ingredientes */}
          <View style={styles.uiContainer}>
            <IngredientSelector />
          </View>

        </View>
      </SafeAreaView>
    </BurgerProvider>
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
  visualizerContainer: {
    flex: 3, // Ocupa el 75% de la pantalla
  },
  uiContainer: {
    flex: 1, // Ocupa el 25% de la pantalla
    justifyContent: 'flex-end',
  },
});