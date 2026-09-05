import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, radius, shadows } from '../theme';

// ═══════════════════════════════════════════════════════════════
// Icon3D — premium layered icon.
// A consistent 3D treatment for every symbol in the app:
//   base gradient chip → gloss sheen → lifted emoji → depth shadow.
// Pass any glyph (subject icons, CTAs, tabs, empty states).
// ═══════════════════════════════════════════════════════════════

export type Icon3DVariant = 'chip' | 'tile' | 'flat';

export interface Icon3DProps {
  emoji: string;
  accent?: string;
  tint?: string;
  size?: number;
  variant?: Icon3DVariant;
  style?: ViewStyle;
  onPress?: () => void;
  testID?: string;
}

export function shade(hex: string, percent: number): string {
  // Darken (percent > 0) or lighten (percent < 0) a #rrggbb color.
  const pct = Math.max(-100, Math.min(100, percent));
  const n = parseInt(hex.slice(1), 16);
  const amt = Math.round(2.55 * pct);
  const r = Math.min(255, Math.max(0, (n >> 16) + amt));
  const g = Math.min(255, Math.max(0, ((n >> 8) & 0xff) + amt));
  const b = Math.min(255, Math.max(0, (n & 0xff) + amt));
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

export const Icon3D: React.FC<Icon3DProps> = ({
  emoji,
  accent = colors.primary,
  tint = colors.primarySoft,
  size = 56,
  variant = 'chip',
  style,
  onPress,
  testID,
}) => {
  const chipSize = size;
  const emojiSize = Math.round(size * 0.52);

  if (variant === 'flat') {
    const node = (
      <View
        testID={testID}
        style={[
          styles.flat,
          { width: chipSize, height: chipSize, borderRadius: radius.md, backgroundColor: tint },
          style,
        ]}
      >
        <Text style={[styles.glyph, { fontSize: emojiSize }]}>{emoji}</Text>
      </View>
    );
    return onPress ? (
      <TouchableOpacity onPress={onPress} activeOpacity={0.85}>{node}</TouchableOpacity>
    ) : node;
  }

  const node = (
    <View
      testID={testID}
      style={[
        styles.wrap,
        variant === 'chip'
          ? { borderRadius: chipSize * 0.3 }
          : { borderRadius: radius.md },
        { width: chipSize, height: chipSize },
        shadows.lift,
        style,
      ]}
    >
      {/* Base — deeper accent creates the 3D bottom edge */}
      <LinearGradient
        colors={[shade(accent, 18), accent, shade(accent, -14)]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={[
          styles.base,
          variant === 'chip'
            ? { borderRadius: chipSize * 0.3 }
            : { borderRadius: radius.md },
        ]}
      />
      {/* Top gloss sheen */}
      <LinearGradient
        colors={['rgba(255,255,255,0.42)', 'rgba(255,255,255,0.06)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 0.55 }}
        style={[
          styles.gloss,
          variant === 'chip'
            ? { borderRadius: chipSize * 0.3 }
            : { borderRadius: radius.md },
        ]}
      />
      {/* Keylight — small bright dot upper-left, sells the 3D look */}
      <View
        style={{
          position: 'absolute',
          top: chipSize * 0.14,
          left: chipSize * 0.16,
          width: chipSize * 0.18,
          height: chipSize * 0.18,
          borderRadius: chipSize,
          backgroundColor: 'rgba(255,255,255,0.85)',
          opacity: 0.7,
        }}
      />
      <Text
        style={[
          styles.glyph,
          {
            fontSize: emojiSize,
            textShadowColor: 'rgba(8,27,71,0.28)',
            textShadowOffset: { width: 0, height: 2 },
            textShadowRadius: 3,
          },
        ]}
      >
        {emoji}
      </Text>
    </View>
  );

  return onPress ? (
    <TouchableOpacity onPress={onPress} activeOpacity={0.85}>{node}</TouchableOpacity>
  ) : node;
};

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundColor: colors.primary,
  },
  base: {
    ...StyleSheet.absoluteFillObject,
  },
  gloss: {
    ...StyleSheet.absoluteFillObject,
  },
  glyph: {
    zIndex: 2,
  },
  flat: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(12,42,107,0.06)',
  },
});