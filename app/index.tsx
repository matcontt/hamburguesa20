import React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import BurgerCanvas from '../components/molecules/BurgerCanvas';
import IngredientSelector from '../components/molecules/IngredientSelector';
import { UI_COLORS } from '../lib/core/config';
import OrderFooter from '../components/organisms/OrderFooter';

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
            <OrderFooter /> {/* <-- Nuevo Organismo */}
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: UI_COLORS.background },
  container: { flex: 1 },
  visualizerContainer: { flex: 3 },
  uiContainer: { flex: 1, justifyContent: 'flex-end' },
});