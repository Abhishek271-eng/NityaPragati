import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, radius, spacing, type } from '../../theme';

// ═══════════════════════════════════════════════════════════════
// BackHeader — standard back-header bar for secondary routes.
// ═══════════════════════════════════════════════════════════════

interface BackHeaderProps {
  title: string;
  onBack: () => void;
  right?: React.ReactNode;
}

export const BackHeader: React.FC<BackHeaderProps> = ({ title, onBack, right }) => (
  <View style={styles.row}>
    <TouchableOpacity onPress={onBack} style={styles.backBtn} activeOpacity={0.8} accessibilityLabel="ಹಿಂದೆ">
      <Text style={styles.backText}>‹</Text>
    </TouchableOpacity>
    <Text style={styles.title} numberOfLines={1}>
      {title}
    </Text>
    {right ? right : <View style={styles.spacer} />}
  </View>
);

const styles = StyleSheet.create({
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  backBtn: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 18,
    height: 36,
    justifyContent: 'center',
    width: 36,
  },
  backText: {
    color: colors.ink,
    fontSize: 24,
    lineHeight: 26,
  },
  title: {
    color: colors.ink,
    flex: 1,
    fontFamily: type.bodySemi.fontFamily,
    fontSize: 16,
    marginHorizontal: spacing.sm,
    textAlign: 'center',
  },
  spacer: {
    width: 36,
  },
});