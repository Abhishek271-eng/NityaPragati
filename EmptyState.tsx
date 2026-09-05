import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing, type } from '../theme';
import { Icon3D } from './Icon3D';

interface EmptyStateProps {
  icon: string;
  title: string;
  subtitle?: string;
  accent?: string;
  compact?: boolean;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ icon, title, subtitle, accent = colors.primary, compact }) => {
  return (
    <View style={[styles.card, compact && styles.compact]}>
      <Icon3D emoji={icon} accent={accent} size={compact ? 52 : 72} variant="chip" />
      <Text style={[styles.title, compact && styles.titleCompact]}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    padding: spacing.xl,
  },
  compact: {
    padding: spacing.lg,
  },
  title: {
    ...type.h3,
    color: colors.ink,
    marginTop: spacing.md,
    textAlign: 'center',
  },
  titleCompact: {
    fontSize: 16,
    marginTop: spacing.sm,
  },
  subtitle: {
    ...type.small,
    color: colors.slate,
    marginTop: spacing.xs,
    textAlign: 'center',
  },
});