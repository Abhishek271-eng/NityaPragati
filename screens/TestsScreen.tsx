import React, { useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, fonts, radius, shadows, spacing, type } from '../theme';
import { useAppNavigation } from '../navigation/context';
import { Screen } from '../components/Screen';
import { Icon3D } from '../components/Icon3D';
import { SectionHeader } from '../components/SectionHeader';
import { TestCard } from '../components/TestCard';
import { PrimaryButton } from '../components/PrimaryButton';
import { previousYearSets, subjectPracticeSets, generalPracticeSets } from '../data/tests';
import { getPaperQuestions, hasPaperSet } from '../data/paperQuestions';
import { pickQuestions, getQuestionsBySubject } from '../data/questions';
import { getPaperById } from '../data/previousYearPapers';
import { TestSet } from '../types';
import { getMockHistory } from '../utils/userProgress';

export const TestsScreen: React.FC = () => {
  const nav = useAppNavigation();
  const progress = nav.nav.progress;

  const bestByTest = useMemo(() => {
    const map: Record<string, number> = {};
    for (const a of progress.attempts) {
      const best = map[a.testId];
      if (best == null || a.accuracy > best) map[a.testId] = a.accuracy;
    }
    return map;
  }, [progress.attempts]);

  const mockCount = getMockHistory(progress).length;

  const startSet = (set: TestSet) => {
    let questions = pickQuestions(set.filter ?? { count: set.count });
    if (set.paperId) {
      const paper = getPaperById(set.paperId);
      if (paper) {
        if (hasPaperSet(paper.id)) {
          questions = getPaperQuestions(paper.id);
        } else {
          // Honest fallback: pattern-based mix drawn from available banks
          const core = pickQuestions({ count: set.count, category: 'previousYear' });
          const mix = pickQuestions({ count: set.count });
          questions = core.length ? core : mix;
        }
      }
    }
    if (questions.length) {
      nav.startQuiz({
        title: set.titleKn,
        subtitle: set.subtitleKn,
        testType: set.kind === 'previousYear' ? 'previousYear' : 'practice',
        testId: set.id,
        questions,
        duration: set.duration,
        paperId: set.paperId,
        subjectId: set.filter?.subjectId,
        topicId: set.filter?.topicId,
        isPreviousYear: set.kind === 'previousYear',
      });
    }
  };

  const aptitudeSet = subjectPracticeSets.find((s) => s.kind === 'aptitude' && s.id === 'ps-aptitude');

  const renderGroup = (title: string, subtitle: string, icon: string, sets: TestSet[]) => (
    <>
      <SectionHeader title={title} subtitle={subtitle} icon={icon} />
      {sets.map((set) => (
        <View key={set.id} style={styles.gap}>
          <TestCard
            test={set}
            onPress={() => startSet(set)}
            bestScore={bestByTest[set.id]}
          />
        </View>
      ))}
    </>
  );

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <Screen>
        <View style={styles.head}>
          <View>
            <Text style={styles.eyebrow}>ಪರೀಕ್ಷೆ ಅಭ್ಯಾಸ</Text>
            <Text style={styles.title}>ಪರೀಕ್ಷೆಗಳು</Text>
          </View>
          <View style={styles.mockChip}>
            <Text style={styles.mockValue}>{mockCount}</Text>
            <Text style={styles.mockLabel}>ಮಾದರಿ ಸೆಟ್</Text>
          </View>
        </View>

        {/* Featured: previous-year papers */}
        <View style={styles.featuredHeader}>
          <Text style={styles.featuredTitle}>🔥 ಹಿಂದಿನ ವರ್ಷದ ಪ್ರಶ್ನೆಪತ್ರಿಕೆ ಅಭ್ಯಾಸ</Text>
          <Text style={styles.featuredSub}>
            ಅಧಿಕೃತ ಪತ್ರಿಕೆಯಲ್ಲ — KPSC ರಚನೆಯನ್ನು ಅನುಸರಿಸಿದ ಮಾದರಿ ಅಭ್ಯಾಸ ಸೆಟ್ಗಳು
          </Text>
        </View>
        {previousYearSets.map((set) => (
          <View key={set.id} style={styles.gap}>
            <TestCard
              test={set}
              featured
              onPress={() => startSet(set)}
              bestScore={bestByTest[set.id]}
            />
          </View>
        ))}

        {renderGroup('ಸೂಕ್ಷ್ಮ ವಿಷಯ ಅಭ್ಯಾಸ', 'ವಿಷಯವಾರು ಪೂರ್ಣ ಅಭ್ಯಾಸ', '📚', subjectPracticeSets)}

        {renderGroup('ಸಾಮಾನ್ಯ ಅಭ್ಯಾಸ', 'ಮಿಶ್ರ ಸೆಟ್ಗಳು', '🗂️', generalPracticeSets)}

        <View style={styles.aptitudeBanner}>
          <Icon3D emoji="🧠" accent="#e28a12" tint="#fdf3e2" size={56} variant="chip" />
          <View style={styles.bannerText}>
            <Text style={styles.bannerTitle}>ಸಂಖ್ಯಾಶಕ್ತಿ — ಮುಖ್ಯ ಆದ್ಯತೆ</Text>
            <Text style={styles.bannerSub}>ಸ್ಪರ್ಧಾತ್ಮಕ ದರ್ಜೆಯ ಪ್ರಶ್ನೆಗಳು, ಪ್ರತಿಯೊಂದಕ್ಕೆ ವಿವರಣೆ.</Text>
          </View>
          <PrimaryButton
            label="ಅಭ್ಯಾಸ →"
            small
            style={{ alignSelf: 'center' }}
            onPress={() => {
              if (aptitudeSet) startSet(aptitudeSet);
            }}
          />
        </View>
      </Screen>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    backgroundColor: colors.background,
    flex: 1,
  },
  head: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
    marginTop: spacing.xs,
  },
  eyebrow: {
    color: colors.primary,
    fontFamily: type.bodySemi.fontFamily,
    fontSize: 12,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  title: {
    color: colors.ink,
    fontFamily: fonts.heading,
    fontSize: 26,
    lineHeight: 32,
  },
  mockChip: {
    alignItems: 'center',
    backgroundColor: colors.primarySoft,
    borderRadius: radius.md,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  mockValue: {
    color: colors.primaryStrong,
    fontFamily: fonts.heading,
    fontSize: 17,
  },
  mockLabel: {
    color: colors.primaryStrong,
    fontFamily: type.small.fontFamily,
    fontSize: 9,
  },
  featuredHeader: {
    backgroundColor: colors.primaryMist,
    borderRadius: radius.lg,
    borderLeftColor: colors.primary,
    borderLeftWidth: 4,
    marginBottom: spacing.md,
    padding: spacing.md,
  },
  featuredTitle: {
    color: colors.primaryStrong,
    fontFamily: fonts.heading,
    fontSize: 16,
  },
  featuredSub: {
    color: colors.slate,
    fontFamily: type.small.fontFamily,
    fontSize: 11,
    lineHeight: 17,
    marginTop: 3,
  },
  gap: {
    marginBottom: spacing.sm,
  },
  aptitudeBanner: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    flexDirection: 'row',
    marginTop: spacing.md,
    padding: spacing.md,
    ...shadows.card,
  },
  bannerText: {
    flex: 1,
    marginHorizontal: spacing.sm,
  },
  bannerTitle: {
    color: colors.ink,
    fontFamily: type.bodySemi.fontFamily,
    fontSize: 14,
  },
  bannerSub: {
    color: colors.slate,
    fontFamily: type.small.fontFamily,
    fontSize: 11,
    lineHeight: 16,
    marginTop: 2,
  },
});