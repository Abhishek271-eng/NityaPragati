import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fonts, type } from '../theme';

interface TimerProps {
  totalSeconds: number; // resets when this changes
  onExpire?: () => void;
  running?: boolean;
}

export const Timer: React.FC<TimerProps> = ({ totalSeconds, onExpire, running = true }) => {
  const [left, setLeft] = useState(totalSeconds);
  const expiryRef = useRef(onExpire);
  expiryRef.current = onExpire;

  useEffect(() => {
    setLeft(totalSeconds);
  }, [totalSeconds]);

  useEffect(() => {
    if (!running) return undefined;
    if (left <= 0) {
      expiryRef.current?.();
      return undefined;
    }
    const t = setTimeout(() => setLeft((s) => Math.max(0, s - 1)), 1000);
    return () => clearTimeout(t);
  }, [left, running]);

  const m = Math.floor(left / 60);
  const s = left % 60;
  const danger = left < 60;
  const label = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;

  return (
    <View style={styles.chip}>
      <Text style={[styles.icon, danger && { color: colors.error }]}>⏱</Text>
      <Text style={[styles.text, danger && { color: colors.error }]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  chip: {
    alignItems: 'center',
    backgroundColor: colors.primaryMist,
    borderRadius: 999,
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  icon: {
    color: colors.primary,
    fontSize: 12,
    marginRight: 6,
  },
  text: {
    color: colors.primaryStrong,
    fontFamily: fonts.heading,
    fontSize: 15,
  },
});