import React from 'react';
import { Stack } from 'expo-router';
import { BurgerProvider } from '../modules/builder/context/BurgerContext';

export default function RootLayout() {
  return (
    <BurgerProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
      </Stack>
    </BurgerProvider>
  );
}