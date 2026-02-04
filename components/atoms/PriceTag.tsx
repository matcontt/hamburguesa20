import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { UI_COLORS } from '../../lib/core/config';

interface PriceTagProps {
  amount: number;
  label?: string;
}

export default function PriceTag({ amount, label }: PriceTagProps) {
  return (
    <Text style={styles.text}>
      {label && <Text style={styles.label}>{label}: </Text>}
      ${amount.toFixed(2)}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    color: UI_COLORS.primary,
    fontSize: 24,
    fontWeight: 'bold',
  },
  label: {
    color: UI_COLORS.text,
    fontSize: 16,
    fontWeight: 'normal',
  },
});