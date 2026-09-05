import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, fonts, radius, shadows, spacing, type } from '../theme';
import { useAppNavigation } from '../navigation/context';
import { Screen } from '../components/Screen';
import { Icon3D } from '../components/Icon3D';
import { ProgressBar } from '../components/ProgressBar';
import { PrimaryButton } from '../components/PrimaryButton';
import { EmptyState } from '../components/EmptyState';
import { getSubjectById } from '../data/subjects';
import { questionCountForSubject, getQuestionsByTopic, getPracticeSet } from '../data/questions';
import { getSubjectProgress } from '../utils/userProgress';
import { SubjectId } from '../types';

interface SubjectDetailScreenProps {
  subjectId: SubjectId;
  topicId?: string;
}

export const SubjectDetailScreen: React.FC<SubjectDetailScreenProps> = ({ subjectId, topicId }) => {
  const nav = useAppNavigation();
  const subject = getSubjectById(subjectId);
  const progress = nav.nav.progress;

  if (!subject) {
    return (
      <SafeAreaView style={styles.safe}>
        <Text style={styles.err}>ವಿಷಯ ಕಂಡುಬಂದಿಲ್ಲ.</Text>
      </SafeAreaView>
    );
  }

  const totalQs = questionCountForSubject(subjectId);
  const sp = getSubjectProgress(progress, subjectId);
  const attempted = sp?.questionsAttempted ?? 0;
  const accuracy = sp?.accuracy ?? 0;
  const progressPct = totalQs ? Math.min(100, (attempted / totalQs) * 100) : 0;

  const startTopicQuiz = (tid: string, nameKn: string) => {
    const qs = getQuestionsByTopic(tid);
    if (qs.length) {
      nav.startQuiz({
        title: nameKn,
        subtitle: `${qs.length} ಪ್ರಶ್ನೆಗಳು — ವಿಷಯ ಆಧಾರಿತ`,
        testType: 'topic',
        testId: `topic-${tid}`,
        questions: qs.slice(0, 10),
        duration: 0,
        subjectId,
        topicId: tid,
      });
    }
  };

  const startFullPractice = () => {
    const qs = getPracticeSet(subjectId, 15);
    if (qs.length) {
      nav.startQuiz({
        title: `${subject.nameKn} ಅಭ್ಯಾಸ`,
        subtitle: 'ವಿಷಯ-ಆಧಾರಿತ 15 ಪ್ರಶ್ನೆಗಳು',
        testType: 'practice',
        testId: `full-${subjectId}`,
        questions: qs,
        duration: 20,
        subjectId,
      });
    }
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <Screen>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => nav.resetNavigation('home')} style={styles.backBtn} activeOpacity={0.8}>
            <Text style={styles.backText}>‹</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>ವಿಷಯ</Text>
          <View style={{ width: 36 }} />
        </View>

        <View style={styles.hero}>
          <Icon3D emoji={subject.icon} accent={subject.accent} tint={subject.tint} size={72} variant="chip" />
          <Text style={styles.title}>{subject.nameKn}</Text>
          <Text style={[styles.tagline, { color: subject.accent }]}>{subject.tagline}</Text>
          <Text style={styles.desc}>{subject.description}</Text>

          <View style={styles.metaRow}>
            <View style={styles.metaBox}>
              <Text style={styles.metaValue}>{totalQs}</Text>
              <Text style={styles.metaLabel}>ಪ್ರಶ್ನೆಗಳು</Text>
            </View>
            <View style={styles.metaBox}>
              <Text style={styles.metaValue}>{subject.topics.length}</Text>
              <Text style={styles.metaLabel}>ವಿಷಯಗಳು</Text>
            </View>
            <View style={styles.metaBox}>
              <Text style={styles.metaValue}>{attempted > 0 ? `${accuracy}%` : '—'}</Text>
              <Text style={styles.metaLabel}>ನಿಖರತೆ</Text>
            </View>
          </View>

          <View style={styles.progressArea}>
            <View style={styles.progressLabels}>
              <Text style={styles.progressText}>ಪ್ರಗತಿ</Text>
              <Text style={styles.progressText}>{attempted} / {totalQs}</Text>
            </View>
            <ProgressBar progress={progressPct} color={subject.accent} height={8} style={styles.progressBar} />
          </View>

          <PrimaryButton label={attempted > 0 ? 'ಅಭ್ಯಾಸ ಮುಂದುವರಿಸಿ →' : 'ಅಭ್ಯಾಸ ಆರಂಭಿಸಿ →'} onPress={startFullPractice} style={styles.heroBtn} />
        </View>

        <Text style={styles.sectionTitle}>ವಿಷಯಗಳು (Topics)</Text>
        {subject.topics.map((t) => {
          const count = getQuestionsByTopic(t.id).length;
          return (
            <TouchableOpacity
              key={t.id}
              activeOpacity={0.88}
              onPress={() => startTopicQuiz(t.id, t.nameKn)}
              style={styles.topicCard}
            >
              <Icon3D emoji={t.icon} accent={subject.accent} tint={subject.tint} size={44} variant="flat" />
              <View style={styles.topicBody}>
                <Text style={styles.topicName}>{t.nameKn}</Text>
                <Text style={styles.topicCount}>{count} ಪ್ರಶ್ನೆಗಳು • ಅಭ್ಯಾಸ ಆರಂಭಿಸಿ</Text>
              </View>
              <Text style={styles.topicArrow}>→</Text>
            </TouchableOpacity>
          );
        })}

        {totalQs === 0 ? (
          <EmptyState
            icon="📚"
            accent={subject.accent}
            title="ಶೀಘ್ರದಲ್ಲೇ ಪ್ರಶ್ನೆಗಳು"
            subtitle="ಈ ವಿಷಯಕ್ಕೆ ಈಗಾಗಲೇ 200+ ಪ್ರಶ್ನೆಗಳಿವೆ — ಧನ್ಯವಾದ!"
          />
        ) : null}
      </Screen>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    backgroundColor: colors.background,
    flex: 1,
  },
  err: {
    color: colors.ink,
    marginTop: 40,
    textAlign: 'center',
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: spacing.sm,
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
    fontSize: 22,
    lineHeight: 24,
  },
  headerTitle: {
    color: colors.ink,
    flex: 1,
    fontFamily: type.bodySemi.fontFamily,
    fontSize: 15,
    textAlign: 'center',
  },
  hero: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    padding: spacing.lg,
    ...shadows.card,
  },
  title: {
    color: colors.ink,
    fontFamily: fonts.heading,
    fontSize: 24,
    marginTop: spacing.sm,
  },
  tagline: {
    color: colors.slate,
    fontFamily: type.bodySemi.fontFamily,
    fontSize: 13,
    marginTop: 2,
  },
  desc: {
    ...type.small,
    color: colors.inkSoft,
    lineHeight: 20,
    marginTop: spacing.sm,
    textAlign: 'center',
  },
  metaRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.md,
    width: '100%',
  },
  metaBox: {
    alignItems: 'center',
    backgroundColor: colors.surfaceAlt,
    borderRadius: radius.md,
    flex: 1,
    paddingVertical: spacing.sm,
  },
  metaValue: {
    color: colors.ink,
    fontFamily: fonts.heading,
    fontSize: 17,
  },
  metaLabel: {
    color: colors.slate,
    fontFamily: type.small.fontFamily,
    fontSize: 10,
    marginTop: 2,
  },
  progressArea: {
    marginTop: spacing.md,
    width: '100%',
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressText: {
    color: colors.inkSoft,
    fontFamily: type.small.fontFamily,
    fontSize: 12,
  },
  progressBar: {
    marginTop: spacing.xs,
  },
  heroBtn: {
    marginTop: spacing.md,
  },
  sectionTitle: {
    color: colors.ink,
    fontFamily: fonts.heading,
    fontSize: 18,
    marginBottom: spacing.sm,
    marginTop: spacing.lg,
  },
  topicCard: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    flexDirection: 'row',
    marginBottom: spacing.sm,
    padding: spacing.sm,
    paddingRight: spacing.md,
    ...shadows.card,
  },
  topicBody: {
    flex: 1,
    marginLeft: spacing.sm,
  },
  topicName: {
    color: colors.ink,
    fontFamily: type.bodySemi.fontFamily,
    fontSize: 14,
  },
  topicCount: {
    color: colors.slate,
    fontFamily: type.small.fontFamily,
    fontSize: 11,
    marginTop: 2,
  },
  topicArrow: {
    color: colors.primary,
    fontSize: 18,
  },
});

// Accent-colored tagline (static reference to the active subject accent)
function subjectAccent(): string {
  return colors.slate;
}