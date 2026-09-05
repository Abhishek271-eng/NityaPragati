import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, radius, shadows, spacing, type } from '../theme';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'success';

interface PrimaryButtonProps {
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  loading?: boolean;
  icon?: string;
  small?: boolean;
  style?: ViewStyle;
  accessible?: boolean;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  label,
  onPress,
  variant = 'primary',
  disabled,
  loading,
  icon,
  small,
  style,
  accessible = true,
}) => {
  const palette: Record<ButtonVariant, { from: string; to: string; text: string }> = {
    primary: { from: colors.primary, to: colors.sky, text: '#ffffff' },
    secondary: { from: colors.navyDeep, to: colors.navy, text: '#ffffff' },
    ghost: { from: colors.surface, to: colors.primaryMist, text: colors.primary },
    success: { from: '#2fbf71', to: '#0f9a58', text: '#ffffff' },
  };
  const p = palette[variant];
  const isGhost = variant === 'ghost';

  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessible={accessible}
      activeOpacity={disabled ? 1 : 0.85}
      disabled={disabled || loading}
      onPress={onPress}
      style={[small ? styles.small : styles.base, style, disabled && styles.disabled]}
    >
      <LinearGradient
        colors={[p.from, p.to]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.fill, isGhost && { borderWidth: 1, borderColor: colors.primarySoft }]}
      >
        {loading ? (
          <ActivityIndicator color={p.text} size="small" />
        ) : (
          <>
            {icon ? <Text style={[styles.icon, small && styles.iconSmall]}>{icon}</Text> : null}
            <Text style={[styles.label, { color: p.text }, small && styles.labelSmall]}>{label}</Text>
          </>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    alignSelf: 'stretch',
    borderRadius: radius.pill,
    height: 54,
    overflow: 'hidden',
    ...shadows.lift,
  },
  small: {
    alignSelf: 'flex-start',
    borderRadius: radius.pill,
    height: 40,
    overflow: 'hidden',
    ...shadows.hairline,
  },
  fill: {
    alignItems: 'center',
    borderRadius: radius.pill,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  label: {
    color: '#ffffff',
    fontFamily: type.bodySemi.fontFamily,
    fontSize: 16,
  },
  labelSmall: {
    fontSize: 13,
  },
  icon: {
    fontSize: 18,
    marginRight: spacing.sm,
  },
  iconSmall: {
    fontSize: 14,
    marginRight: spacing.xs,
  },
  disabled: {
    opacity: 0.5,
  },
});