import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, fonts, radius, shadows, spacing, type } from '../theme';
import { Subject, Topic } from '../types';
import { Icon3D } from './Icon3D';
import { ProgressBar } from './ProgressBar';

interface SubjectCardProps {
  subject: Subject;
  questionCount: number;
  attempted: number; // 0..questionCount
  accuracy: number; // 0..100
  onPress: () => void;
  onPractice: () => void;
}

export const SubjectCard: React.FC<SubjectCardProps> = ({
  subject,
  questionCount,
  attempted,
  accuracy,
  onPress,
  onPractice,
}) => {
  const progressPct = questionCount ? Math.min(100, (attempted / questionCount) * 100) : 0;
  const topicsPreview = subject.topics.slice(0, 3).map((t) => t.nameKn).join(' • ');

  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onPress} style={styles.card}>
      <View style={styles.header}>
        <Icon3D emoji={subject.icon} accent={subject.accent} tint={subject.tint} size={58} variant="chip" />
        <View style={styles.headerText}>
          <Text style={styles.title}>{subject.nameKn}</Text>
          <Text style={styles.tagline}>{subject.tagline}</Text>
        </View>
        <View style={[styles.badge, { backgroundColor: subject.tint }]}>
          <Text style={[styles.badgeText, { color: subject.accent }]}>{questionCount}</Text>
          <Text style={[styles.badgeLabel, { color: subject.accent }]}>ಪ್ರಶ್ನೆಗಳು</Text>
        </View>
      </View>

      <Text style={styles.desc} numberOfLines={2}>
        {subject.description}
      </Text>

      <View style={styles.topicsRow}>
        {subject.topics.slice(0, 3).map((t: Topic) => (
          <View key={t.id} style={styles.topicPill}>
            <Text style={styles.topicText}>{t.nameKn}</Text>
          </View>
        ))}
        {subject.topics.length > 3 ? <Text style={styles.moreTopics}>+{subject.topics.length - 3}</Text> : null}
      </View>

      <View style={styles.progressRow}>
        <View style={styles.progressInfo}>
          <Text style={styles.progressText}>
            ಪ್ರಗತಿ {attempted > 0 ? `${attempted} ಪ್ರಶ್ನೆ • ${accuracy}% ನಿಖರತೆ` : 'ಪ್ರಾರಂಭಿಸಿ'}
          </Text>
          <Text style={styles.progressTopics} numberOfLines={1}>
            {topicsPreview}
          </Text>
        </View>
        <ProgressBar progress={progressPct} color={subject.accent} height={6} style={styles.bar} />
      </View>

      <View style={styles.actions}>
        <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={styles.actionSecondary}>
          <Text style={[styles.actionText, { color: subject.accent }]}>ಪ್ರಶ್ನೆ ಬ್ಯಾಂಕ್</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={onPractice}
          style={[styles.actionPrimary, { backgroundColor: subject.accent }]}
        >
          <Text style={styles.actionTextPrimary}>{attempted > 0 ? 'ಮುಂದುವರಿಸಿ →' : 'ಅಭ್ಯಾಸ ಆರಂಭಿಸಿ →'}</Text>
        </TouchableOpacity>
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
  header: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerText: {
    flex: 1,
    marginLeft: spacing.md,
    marginRight: spacing.xs,
  },
  title: {
    ...type.h3,
    color: colors.ink,
  },
  tagline: {
    ...type.small,
    color: colors.slate,
    marginTop: 2,
  },
  badge: {
    alignItems: 'center',
    borderRadius: radius.md,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  badgeText: {
    fontFamily: fonts.heading,
    fontSize: 18,
    lineHeight: 20,
  },
  badgeLabel: {
    fontSize: 9,
    fontFamily: type.bodySemi.fontFamily,
  },
  desc: {
    ...type.small,
    color: colors.inkSoft,
    marginTop: spacing.sm,
  },
  topicsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: spacing.sm,
  },
  topicPill: {
    backgroundColor: colors.primaryMist,
    borderRadius: radius.pill,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  topicText: {
    color: colors.inkSoft,
    fontSize: 11,
    fontFamily: type.bodySemi.fontFamily,
  },
  moreTopics: {
    color: colors.slate,
    fontSize: 12,
    lineHeight: 20,
  },
  progressRow: {
    marginTop: spacing.md,
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressText: {
    ...type.small,
    color: colors.inkSoft,
  },
  progressTopics: {
    ...type.caption,
    color: colors.slate,
  },
  bar: {
    marginTop: spacing.xs,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  actionPrimary: {
    alignItems: 'center',
    borderRadius: radius.pill,
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 10,
  },
  actionSecondary: {
    alignItems: 'center',
    borderRadius: radius.pill,
    borderColor: colors.line,
    borderWidth: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
  },
  actionText: {
    fontFamily: type.bodySemi.fontFamily,
    fontSize: 13,
  },
  actionTextPrimary: {
    color: '#ffffff',
    fontFamily: type.bodySemi.fontFamily,
    fontSize: 13,
  },
});