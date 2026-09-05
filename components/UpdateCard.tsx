import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, radius, shadows, spacing, type } from '../theme';
import { CurrentAffair, CurrentAffairCategory } from '../types';
import { Icon3D } from './Icon3D';

// Category → icon + tint mapping
const CATEGORY_META: Record<string, { icon: string; accent: string; tint: string }> = {
  ಕರ್ನಾಟಕ: { icon: '🏛️', accent: '#0ca678', tint: '#e4f7f0' },
  ಭಾರತ: { icon: '🇮🇳', accent: '#e28a12', tint: '#fdf3e2' },
  ವಿಶ್ವ: { icon: '🌍', accent: '#3b9dff', tint: '#e7f3fd' },
  ಆರ್ಥಿಕತೆ: { icon: '💰', accent: '#0f86d6', tint: '#e7f3fd' },
  'ವಿಜ್ಞಾನ ಮತ್ತು ತಂತ್ರಜ್ಞಾನ': { icon: '🔭', accent: '#6d5ae8', tint: '#efedfd' },
  ಪರಿಸರ: { icon: '🌿', accent: '#12924f', tint: '#e6f6ee' },
  'ಸರ್ಕಾರ ಮತ್ತು ಯೋಜನೆಗಳು': { icon: '🏢', accent: '#1a5cff', tint: '#e8efff' },
  ಪ್ರಶಸ್ತಿಗಳು: { icon: '🏆', accent: '#c9971c', tint: '#fbf3dc' },
  ಕ್ರೀಡೆ: { icon: '🏅', accent: '#e0455a', tint: '#fdebed' },
  'ಪ್ರಮುಖ ನೇಮಕಾತಿಗಳು': { icon: '👤', accent: '#2f405f', tint: '#eef2fa' },
};

export const categoryMeta = (category: CurrentAffairCategory) =>
  CATEGORY_META[category] ?? CATEGORY_META['ಭಾರತ'];

interface UpdateCardProps {
  item: CurrentAffair;
  onPress: () => void;
  featured?: boolean;
}

export const UpdateCard: React.FC<UpdateCardProps> = ({ item, onPress, featured }) => {
  const meta = categoryMeta(item.category);
  return (
    <TouchableOpacity
      activeOpacity={0.88}
      onPress={onPress}
      style={[styles.card, featured && styles.cardFeatured]}
    >
      <View style={styles.topRow}>
        <Icon3D emoji={meta.icon} accent={meta.accent} size={46} variant="chip" />
        <View style={styles.topText}>
          <View style={styles.badgeRow}>
            <View style={[styles.badge, { backgroundColor: meta.tint }]}>
              <Text style={[styles.badgeText, { color: meta.accent }]}>{item.category}</Text>
            </View>
            {item.featured ? (
              <View style={styles.featuredBadge}>
                <Text style={styles.featuredText}>🔥 ಪ್ರಮುಖ</Text>
              </View>
            ) : null}
          </View>
          <Text style={styles.title} numberOfLines={2}>
            {item.title}
          </Text>
        </View>
      </View>

      <Text style={styles.summary} numberOfLines={3}>
        {item.summary}
      </Text>

      <View style={styles.matterBox}>
        <Text style={styles.matterLabel}>🎯 KPSCಗೆ ಏಕೆ ಮುಖ್ಯ?</Text>
        <Text style={styles.matterText} numberOfLines={3}>
          {item.whyMatters}
        </Text>
      </View>

      <View style={styles.tagsRow}>
        {item.kpscTags.slice(0, 3).map((t) => (
          <View key={t} style={styles.tagPill}>
            <Text style={styles.tagText}>{t}</Text>
          </View>
        ))}
      </View>

      <View style={styles.bottomRow}>
        <Text style={styles.date}>📅 {item.date}</Text>
        <Text style={styles.more}>ಇನ್ನಷ್ಟು ಓದಿ →</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    ...shadows.card,
  },
  cardFeatured: {
    borderColor: colors.primarySoft,
    borderWidth: 1,
  },
  topRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  topText: {
    flex: 1,
    marginLeft: spacing.sm,
  },
  badgeRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 6,
  },
  badge: {
    borderRadius: radius.pill,
    paddingHorizontal: 9,
    paddingVertical: 3,
  },
  badgeText: {
    fontSize: 11,
    fontFamily: type.bodySemi.fontFamily,
  },
  featuredBadge: {
    backgroundColor: colors.goldSoft,
    borderRadius: radius.pill,
    paddingHorizontal: 9,
    paddingVertical: 3,
  },
  featuredText: {
    color: colors.gold,
    fontSize: 11,
    fontFamily: type.bodySemi.fontFamily,
  },
  title: {
    ...type.h4,
    color: colors.ink,
    marginTop: 4,
  },
  summary: {
    ...type.small,
    color: colors.inkSoft,
    lineHeight: 20,
    marginTop: spacing.sm,
  },
  matterBox: {
    backgroundColor: colors.primaryMist,
    borderRadius: radius.md,
    marginTop: spacing.sm,
    padding: spacing.sm,
  },
  matterLabel: {
    color: colors.primaryStrong,
    fontFamily: type.bodySemi.fontFamily,
    fontSize: 12,
  },
  matterText: {
    color: colors.inkSoft,
    fontSize: 12.5,
    lineHeight: 19,
    marginTop: 2,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: spacing.sm,
  },
  tagPill: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: radius.pill,
    paddingHorizontal: 9,
    paddingVertical: 3,
  },
  tagText: {
    color: colors.slate,
    fontSize: 11,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.sm,
  },
  date: {
    color: colors.slate,
    fontSize: 11,
  },
  more: {
    color: colors.primary,
    fontFamily: type.bodySemi.fontFamily,
    fontSize: 12,
  },
});