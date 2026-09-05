import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, radius, shadows, spacing, type } from '../theme';
import { AIInsight } from '../types';

// ═══════════════════════════════════════════════════════════════
// AIInsightCard — white/blue insight card for the AI summary feed.
// Kannada-first titles/priority; links optional route actions.
// ═══════════════════════════════════════════════════════════════

const typeMeta: Record<AIInsight['type'], { icon: string; color: string; bg: string }> = {
  improvement: { icon: '📉', color: colors.error, bg: colors.errorSoft },
  strength: { icon: '📈', color: colors.success, bg: colors.successSoft },
  recommendation: { icon: '🎯', color: colors.primary, bg: colors.primarySoft },
  warning: { icon: '⚠️', color: colors.warning, bg: colors.warningSoft },
  tip: { icon: '💡', color: colors.info, bg: colors.primaryMist },
  plan: { icon: '🗓️', color: colors.purple, bg: colors.primaryMist },
};

const priorityLabel: Record<AIInsight['priority'], string> = {
  high: 'ಹೆಚ್ಚಿನ ಆದ್ಯತೆ',
  medium: 'ಮಧ್ಯಮ ಆದ್ಯತೆ',
  low: 'ಸರಿಯಾದ ಹಾದಿಯಲ್ಲಿ',
};

const priorityColor: Record<AIInsight['priority'], string> = {
  high: colors.error,
  medium: colors.warning,
  low: colors.success,
};

export const AIInsightCard: React.FC<{
  insight: AIInsight;
  onAction?: () => void;
}> = ({ insight, onAction }) => {
  const meta = typeMeta[insight.type];

  return (
    <View style={[styles.card, { borderLeftColor: meta.color }]}>
      <View style={[styles.iconWrap, { backgroundColor: meta.bg }]}>
        <Text style={styles.icon}>{meta.icon}</Text>
      </View>
      <View style={styles.copy}>
        <View style={styles.headerRow}>
          <Text style={[styles.title, { color: meta.color }]}>{insight.title}</Text>
          <View style={[styles.priorityPill, { backgroundColor: `${priorityColor[insight.priority]}1a` }]}>
            <View style={[styles.dot, { backgroundColor: priorityColor[insight.priority] }]} />
            <Text style={[styles.priority, { color: priorityColor[insight.priority] }]}>{priorityLabel[insight.priority]}</Text>
          </View>
        </View>
        <Text style={styles.message}>{insight.message}</Text>
        {insight.actionable && insight.actionLabel && onAction ? (
          <TouchableOpacity onPress={onAction} style={styles.action} activeOpacity={0.7}>
            <Text style={styles.actionText}>{insight.actionLabel} →</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderLeftWidth: 3,
    borderRadius: radius.lg,
    flexDirection: 'row',
    marginBottom: spacing.sm,
    padding: spacing.md,
    ...shadows.hairline,
  },
  iconWrap: {
    alignItems: 'center',
    borderRadius: radius.md,
    height: 40,
    justifyContent: 'center',
    marginRight: spacing.sm,
    width: 40,
  },
  icon: {
    fontSize: 20,
  },
  copy: {
    flex: 1,
  },
  headerRow: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    flex: 1,
    fontFamily: type.bodySemi.fontFamily,
    fontSize: 14,
    lineHeight: 20,
  },
  priorityPill: {
    alignItems: 'center',
    borderRadius: radius.pill,
    flexDirection: 'row',
    marginLeft: spacing.sm,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  dot: {
    borderRadius: 999,
    height: 6,
    marginRight: 4,
    width: 6,
  },
  priority: {
    fontFamily: type.small.fontFamily,
    fontSize: 10,
  },
  message: {
    color: colors.inkSoft,
    fontFamily: type.body.fontFamily,
    fontSize: 13,
    lineHeight: 20,
    marginTop: 4,
  },
  action: {
    alignSelf: 'flex-start',
    marginTop: spacing.sm,
  },
  actionText: {
    color: colors.primary,
    fontFamily: type.bodySemi.fontFamily,
    fontSize: 13,
  },
});