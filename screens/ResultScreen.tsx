import React, { useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, fonts, radius, shadows, spacing, type } from '../theme';
import { useAppNavigation } from '../navigation/context';
import { DonutRing } from '../components/DonutRing';
import { PrimaryButton } from '../components/PrimaryButton';
import { getQuestionsByIds } from '../data/questions';
import { UserAnswer } from '../types';
import { getMockHistory } from '../utils/userProgress';

export const ResultScreen: React.FC = () => {
  const nav = useAppNavigation();
  const { lastResult, progress } = nav.nav;

  const attempt = useMemo(() => {
    if (!lastResult) return null;
    return progress.attempts.find((a) => a.id === lastResult.attemptId) ?? null;
  }, [lastResult, progress.attempts]);

  if (!lastResult || !attempt) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.centerWrap}>
          <Text style={styles.errText}>ಫಲಿತಾಂಶ ಇಲ್ಲ. ಪರೀಕ್ಷೆ ಮುಗಿಸಿದ ನಂತರ ಇಲ್ಲಿ ನೋಡಿ.</Text>
          <PrimaryButton label="ಮುಖಪುಟ" onPress={() => nav.resetNavigation('home')} />
        </View>
      </SafeAreaView>
    );
  }

  const right = attempt.correctAnswers;
  const wrong = attempt.incorrectAnswers;
  const skipped = attempt.skipped;

  const recentMocks = getMockHistory(progress);

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <View style={styles.scroll}>
        <View style={styles.headRow}>
          <Text style={styles.eyebrow}>ಫಲಿತಾಂಶ</Text>
          <Text style={styles.title}>{attempt.accuracy}%</Text>
          <Text style={styles.sub}>
            {attempt.correctAnswers} ಸರಿ • {attempt.incorrectAnswers} ತಪ್ಪು • {attempt.skipped} ಬಿಟ್ಟುಬಿಡಲಾಗಿದೆ
          </Text>
        </View>

        <View style={styles.ringWrap}>
          <DonutRing value={attempt.accuracy} size={170} strokeWidth={16} color={colors.success} label="ನಿಖರತೆ" />
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statBoxGreen}>
            <Text style={styles.statValue}>{right}</Text>
            <Text style={styles.statLabel}>ಸರಿ</Text>
          </View>
          <View style={styles.statBoxRed}>
            <Text style={styles.statValue}>{wrong}</Text>
            <Text style={styles.statLabel}>ತಪ್ಪು</Text>
          </View>
          <View style={styles.statBoxNeutral}>
            <Text style={styles.statValue}>{skipped}</Text>
            <Text style={styles.statLabel}>ಬಿಟ್ಟುಬಿಡಲಾಗಿದೆ</Text>
          </View>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>⏱ ಒಟ್ಟು ಸಮಯ</Text>
          <Text style={styles.infoValue}>{attempt.totalTime} ನಿಮಿಷ</Text>
        </View>

        {recentMocks.length > 1 ? (
          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>📈 ಸುಧಾರಣೆ (ಹಿಂದಿನ ಮಾದರಿ)</Text>
            <Text style={styles.infoValue}>
              ಹಿಂದಿನ {Math.min(3, recentMocks.length - 1)} ಸೆಟ್ಗಳ ನಿಖರತೆ:{' '}
              {recentMocks.slice(1, 4).map((m) => `${m.accuracy}%`).join(' → ')}
            </Text>
          </View>
        ) : null}

        <View style={styles.actions}>
          <PrimaryButton label="ಮುಖಪುಟ" onPress={() => nav.resetNavigation('home')} variant="secondary" />
          <View style={styles.gap} />
          <PrimaryButton label="ಪರೀಕ್ಷೆಗಳಿಗೆ ಹೋಗಿ" onPress={() => nav.resetNavigation('tests')} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    backgroundColor: colors.background,
    flex: 1,
  },
  centerWrap: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: spacing.lg,
  },
  errText: {
    color: colors.inkSoft,
    marginBottom: spacing.lg,
    textAlign: 'center',
  },
  scroll: {
    flex: 1,
    padding: spacing.md,
  },
  headRow: {
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  eyebrow: {
    color: colors.primary,
    fontFamily: type.bodySemi.fontFamily,
    fontSize: 13,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  title: {
    color: colors.ink,
    fontFamily: fonts.heading,
    fontSize: 44,
    lineHeight: 52,
    marginTop: 4,
  },
  sub: {
    color: colors.inkSoft,
    fontFamily: type.body.fontFamily,
    fontSize: 14,
    marginTop: 2,
  },
  ringWrap: {
    marginTop: spacing.lg,
  },
  statsRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.lg,
  },
  statBoxGreen: {
    alignItems: 'center',
    backgroundColor: colors.successSoft,
    borderRadius: radius.lg,
    flex: 1,
    paddingVertical: spacing.md,
    ...shadows.card,
  },
  statBoxRed: {
    alignItems: 'center',
    backgroundColor: colors.errorSoft,
    borderRadius: radius.lg,
    flex: 1,
    paddingVertical: spacing.md,
    ...shadows.card,
  },
  statBoxNeutral: {
    alignItems: 'center',
    backgroundColor: colors.surfaceAlt,
    borderRadius: radius.lg,
    flex: 1,
    paddingVertical: spacing.md,
    ...shadows.card,
  },
  statValue: {
    color: colors.ink,
    fontFamily: fonts.heading,
    fontSize: 24,
  },
  statLabel: {
    color: colors.inkSoft,
    fontFamily: type.small.fontFamily,
    fontSize: 11,
    marginTop: 2,
  },
  infoCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    marginTop: spacing.sm,
    padding: spacing.md,
    ...shadows.hairline,
  },
  infoLabel: {
    color: colors.slate,
    fontFamily: type.small.fontFamily,
    fontSize: 12,
  },
  infoValue: {
    color: colors.ink,
    fontFamily: type.bodySemi.fontFamily,
    fontSize: 14,
    marginTop: 4,
  },
  actions: {
    flexDirection: 'row',
    marginTop: spacing.lg,
  },
  gap: {
    width: spacing.sm,
  },
});