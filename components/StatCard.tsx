import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { colors, fonts, radius, shadows, spacing, type } from '../theme';

interface StatCardProps {
  label: string;
  value: string;
  icon?: string;
  hint?: string;
  accent?: string;
  style?: ViewStyle;
}

export const StatCard: React.FC<StatCardProps> = ({ label, value, icon, hint, accent = colors.primary, style }) => {
  return (
    <View style={[styles.card, style]}>
      <View style={styles.top}>
        {icon ? <Text style={[styles.icon, { color: accent }]}>{icon}</Text> : null}
      </View>
      <Text style={[styles.value, { color: accent }]} numberOfLines={1} adjustsFontSizeToFit>
        {value}
      </Text>
      <Text style={styles.label} numberOfLines={1}>
        {label}
      </Text>
      {hint ? (
        <Text style={styles.hint} numberOfLines={1}>
          {hint}
        </Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    flex: 1,
    padding: spacing.md,
    ...shadows.card,
  },
  top: {
    minHeight: 22,
  },
  icon: {
    fontSize: 18,
  },
  value: {
    fontFamily: fonts.heading,
    fontSize: 24,
    lineHeight: 30,
  },
  label: {
    ...type.small,
    color: colors.inkSoft,
    marginTop: 2,
  },
  hint: {
    ...type.caption,
    color: colors.slate,
    marginTop: 2,
  },
});