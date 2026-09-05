import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import Svg, { Circle, G } from 'react-native-svg';
import { colors, fonts, type } from '../theme';

// ═══════════════════════════════════════════════════════════════
// DonutRing — progress donut with a PERFECTLY CENTERED label.
//
// Centering guarantee: the ring and its label share the SAME fixed
// square frame (size×size). The label container is absolutely
// inset to that frame with alignItems/justifyContent center, so the
// percentage always sits dead-centre inside the circle at any size,
// on any device. (This directly fixes the previous bug where the
// score rendered outside the ring.)
// ═══════════════════════════════════════════════════════════════

interface DonutRingProps {
  value: number; // 0..100
  size?: number;
  strokeWidth?: number;
  color?: string;
  trackColor?: string;
  label?: string; // small caption under the value (e.g. "ಅಭ್ಯಾಸ ನಿಖರತೆ")
  caption?: string; // Kannada caption below
  style?: ViewStyle;
  animated?: boolean;
}

export const DonutRing: React.FC<DonutRingProps> = ({
  value,
  size = 160,
  strokeWidth = 14,
  color = colors.primary,
  trackColor = colors.primarySoft,
  label,
  caption,
  style,
}) => {
  const clamped = Math.max(0, Math.min(100, Math.round(value)));
  const r = (size - strokeWidth) / 2;
  const c = 2 * Math.PI * r;
  const progress = (clamped / 100) * c;

  const valueFontSize = Math.max(26, Math.min(46, size * 0.27));

  return (
    <View style={[{ width: size, height: size, alignSelf: 'center' }, style]}>
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <G rotation={-90} origin={`${size / 2}, ${size / 2}`}>
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            stroke={trackColor}
            strokeWidth={strokeWidth}
            fill="none"
          />
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={`${progress} ${c - progress}`}
            fill="none"
          />
        </G>
      </Svg>

      {/* Label layer — absolutely inset to the SAME frame → always centered */}
      <View style={[StyleSheet.absoluteFillObject, styles.center]}>
        <Text style={[styles.value, { fontSize: valueFontSize }]} adjustsFontSizeToFit numberOfLines={1}>
          {clamped}%
        </Text>
        {label ? (
          <Text style={[styles.label, { maxWidth: size - 24 }]} numberOfLines={1} adjustsFontSizeToFit>
            {label}
          </Text>
        ) : null}
      </View>

      {caption ? (
        <Text style={[styles.caption, { maxWidth: size + 30 }]} numberOfLines={2}>
          {caption}
        </Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  value: {
    color: colors.ink,
    fontFamily: fonts.heading,
    lineHeight: undefined,
  },
  label: {
    color: colors.slate,
    fontFamily: type.smallSemi.fontFamily,
    fontSize: 11,
    marginTop: 2,
    textAlign: 'center',
  },
  caption: {
    alignSelf: 'center',
    color: colors.slate,
    fontFamily: type.body.fontFamily,
    fontSize: 13,
    marginTop: 8,
    textAlign: 'center',
  },
});