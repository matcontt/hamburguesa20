import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { UI_COLORS } from '../../lib/core/config';

interface PriceTagProps {
  amount: number;
  label?: string;
}

export default function PriceTag({ amount, label }: PriceTagProps) {
  const scale = useSharedValue(1);

  useEffect(() => {
    scale.value = withSpring(1.2, {}, () => {
      scale.value = withSpring(1);
    });
  }, [amount]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.Text style={[styles.text, animatedStyle]}>
      {label && <Animated.Text style={styles.label}>{label}: </Animated.Text>}
      ${amount.toFixed(2)}
    </Animated.Text>
  );
}

const styles = StyleSheet.create({
  text: { color: UI_COLORS.primary, fontSize: 24, fontWeight: 'bold' },
  label: { color: UI_COLORS.text, fontSize: 16, fontWeight: 'normal' },
});