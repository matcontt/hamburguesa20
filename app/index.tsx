import React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import BurgerCanvas from '../components/molecules/BurgerCanvas';
import IngredientSelector from '../components/molecules/IngredientSelector';
import OrderFooter from '../components/organisms/OrderFooter';
import { UI_COLORS } from '../lib/core/config';

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="light-content" />
        <View style={styles.container}>
          <View style={styles.visualizerContainer}>
            <BurgerCanvas />
          </View>
          <View style={styles.uiContainer}>
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
  visualizerContainer: {
    flex: 3,
  },
  uiContainer: {
    flex: 2,
    backgroundColor: UI_COLORS.surface,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: 'hidden',
  },
});