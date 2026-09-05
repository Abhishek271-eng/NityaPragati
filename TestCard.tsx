import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, radius, shadows, spacing, type, difficultyKn } from '../theme';
import { TestSet } from '../types';
import { Icon3D } from './Icon3D';

interface TestCardProps {
  test: TestSet;
  onPress: () => void;
  featured?: boolean;
  progress?: number; // 0..100 if attempted
  bestScore?: number;
}

export const TestCard: React.FC<TestCardProps> = ({ test, onPress, featured, progress, bestScore }) => {
  const diff = difficultyKn[test.difficulty];
  return (
    <TouchableOpacity
      activeOpacity={0.88}
      onPress={onPress}
      style={[styles.card, featured && styles.cardFeatured]}
    >
      <View style={styles.left}>
        <Icon3D emoji={test.icon} accent={test.accent} size={featured ? 60 : 52} variant="chip" />
      </View>
      <View style={styles.body}>
        <View style={styles.titleRow}>
          <Text style={[styles.title, featured && styles.titleFeatured]} numberOfLines={2}>
            {test.titleKn}
          </Text>
        </View>
        <Text style={styles.subtitle} numberOfLines={2}>
          {test.subtitleKn}
        </Text>
        <View style={styles.metaRow}>
          <View style={styles.metaChip}>
            <Text style={styles.metaText}>📄 {test.count}</Text>
          </View>
          <View style={styles.metaChip}>
            <Text style={styles.metaText}>🎚 {diff}</Text>
          </View>
          {test.duration > 0 ? (
            <View style={styles.metaChip}>
              <Text style={styles.metaText}>⏱ {test.duration} ನಿ</Text>
            </View>
          ) : null}
        </View>
        {bestScore != null && bestScore > 0 ? (
          <View style={styles.scoreRow}>
            <Text style={styles.scoreText}>ಉತ್ತಮ ಸ್ಕೋರ್: {bestScore}%</Text>
            {progress != null ? <Text style={styles.scoreText}>ಪ್ರಗತಿ {Math.round(progress)}%</Text> : null}
          </View>
        ) : null}
      </View>
      <View style={styles.arrow}>
        <Text style={styles.arrowText}>→</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    flexDirection: 'row',
    padding: spacing.md,
    ...shadows.card,
  },
  cardFeatured: {
    borderColor: colors.primarySoft,
    borderWidth: 1,
    ...shadows.soft,
  },
  left: {
    marginRight: spacing.md,
  },
  body: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
  },
  title: {
    ...type.h4,
    color: colors.ink,
    flex: 1,
  },
  titleFeatured: {
    fontSize: 16,
    lineHeight: 22,
  },
  subtitle: {
    ...type.small,
    color: colors.slate,
    marginTop: 3,
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 8,
  },
  metaChip: {
    backgroundColor: colors.primaryMist,
    borderRadius: radius.pill,
    paddingHorizontal: 9,
    paddingVertical: 3,
  },
  metaText: {
    color: colors.inkSoft,
    fontSize: 11,
    fontFamily: type.bodySemi.fontFamily,
  },
  scoreRow: {
    flexDirection: 'row',
    gap: 14,
    marginTop: 8,
  },
  scoreText: {
    color: colors.primaryStrong,
    fontFamily: type.smallSemi.fontFamily,
    fontSize: 11,
  },
  arrow: {
    alignItems: 'center',
    backgroundColor: colors.primaryMist,
    borderRadius: 18,
    height: 34,
    justifyContent: 'center',
    marginLeft: spacing.sm,
    width: 34,
  },
  arrowText: {
    color: colors.primary,
    fontSize: 18,
  },
});