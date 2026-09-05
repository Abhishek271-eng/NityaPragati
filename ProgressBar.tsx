import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { colors, radius } from '../theme';

interface ProgressBarProps {
  progress: number; // 0..100
  color?: string;
  trackColor?: string;
  height?: number;
  style?: ViewStyle;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  color = colors.primary,
  trackColor = colors.primaryMist,
  height = 8,
  style,
}) => {
  const pct = Math.max(0, Math.min(100, progress));
  return (
    <View style={[styles.track, { backgroundColor: trackColor, height, borderRadius: height / 2 }, style]}>
      <View
        style={[
          styles.fill,
          {
            backgroundColor: color,
            borderRadius: height / 2,
            width: `${pct}%`,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  track: {
    overflow: 'hidden',
    width: '100%',
  },
  fill: {
    height: '100%',
  },
});