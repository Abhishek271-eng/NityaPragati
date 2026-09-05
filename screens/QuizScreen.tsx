import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, radius, spacing, type } from '../theme';
import { useAppNavigation } from '../navigation/context';
import { QuestionCard } from '../components/QuestionCard';
import { ExplanationCard } from '../components/ExplanationCard';
import { ProgressBar } from '../components/ProgressBar';
import { Timer } from '../components/Timer';
import { recordAnswers } from '../utils/userProgress';
import { UserAnswer } from '../types';

export const QuizScreen: React.FC = () => {
  const nav = useAppNavigation();
  const config = nav.nav.quizConfig;
  const progress = nav.nav.progress;
  const { width } = useWindowDimensions();

  const questionIds = useMemo(
    () => (config ? config.questions.map((q) => q.id) : []),
    [config],
  );
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, UserAnswer>>({});
  const [startTime, setStartTime] = useState(Date.now());
  const [finished, setFinished] = useState(false);

  // Reset when a new quiz is configured
  useEffect(() => {
    setIndex(0);
    setAnswers({});
    setStartTime(Date.now());
    setFinished(false);
  }, [config?.testId]);

  if (!config || !progress || !questionIds.length) {
    return (
      <SafeAreaView style={styles.safe}>
        <Text style={styles.err}>ಪರೀಕ್ಷೆಯ ಡೇಟಾ ಲಭ್ಯವಿಲ್ಲ.</Text>
      </SafeAreaView>
    );
  }

  const total = config.questions.length;
  const question = config.questions[index];
  const current = answers[question.id];
  const selected = current?.selectedAnswer ?? null;
  const revealed = current?.isCorrect !== undefined || current?.selectedAnswer !== undefined;

  const onSelect = useCallback(
    (optionIdx: number) => {
      const ts = Date.now();
      const elapsed = Math.round((ts - startTime) / 1000);
      setStartTime(ts);
      // time spent is used at record time per answer; keep a rough
      // per-question figure by splitting total time evenly later.
      setAnswers((prev) => ({
        ...prev,
        [question.id]: {
          questionId: question.id,
          selectedAnswer: optionIdx,
          correctAnswer: question.correctAnswer,
          isCorrect: optionIdx === question.correctAnswer,
          timeSpent: elapsed,
        },
      }));
    },
    [question, startTime],
  );

  const onNext = useCallback(() => {
    if (index < total - 1) {
      setIndex((i) => i + 1);
    } else {
      submitQuiz();
    }
  }, [index, total, answers, questionIds]);

  const submitQuiz = useCallback(() => {
    if (finished) return;
    const questionMap = new Map(config.questions.map((q) => [q.id, q]));
    const ordered: UserAnswer[] = questionIds
      .map((id) => answers[id] ?? { questionId: id, selectedAnswer: -1, correctAnswer: -1, isCorrect: false, timeSpent: 0 })
      .filter((a) => questionMap.has(a.questionId));
    const totalSec = Math.round((Date.now() - startTime) / 1000);
    const res = recordAnswers(progress, ordered, config.questions, config.testType, config.testId, totalSec);
    nav.setProgress(() => res.progress);
    if (res.newAchievements.length) {
      nav.setPendingAchievements(res.newAchievements);
    }
    setFinished(true);
    nav.finishQuiz(res.attempt.id, config.questions);
  }, [answers, config, questionIds, progress, startTime, nav, finished]);

  const skipAnswer = useCallback(() => {
    setStartTime(Date.now());
    setAnswers((prev) => ({
      ...prev,
      [question.id]: {
        questionId: question.id,
        selectedAnswer: -1,
        correctAnswer: question.correctAnswer,
        isCorrect: false,
        timeSpent: 0,
      },
    }));
  }, [question]);

  const pct = ((index + (revealed ? 1 : 0)) / total) * 100;

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => nav.resetNavigation('home')} style={styles.closeBtn} activeOpacity={0.8}>
          <Text style={styles.closeText}>✕</Text>
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle} numberOfLines={1}>
            {config.title}
          </Text>
          <Text style={styles.headerSub} numberOfLines={1}>
            {config.subtitle}
          </Text>
        </View>
        {config.duration > 0 ? (
          <Timer totalSeconds={config.duration * 60} onExpire={submitQuiz} />
        ) : (
          <View style={{ width: 10 }} />
        )}
      </View>

      <ProgressBar progress={pct} color={colors.primary} height={5} style={styles.bar} />

      <View style={styles.body}>
        <QuestionCard
          question={question}
          index={index}
          total={total}
          selected={selected}
          onSelect={onSelect}
          revealed={revealed}
        />

        {revealed ? (
          <View style={styles.explanationWrap}>
            <ExplanationCard
              question={question}
              selected={selected}
              resultSymbol={selected === question.correctAnswer ? 'tick' : 'cross'}
            />
          </View>
        ) : null}
      </View>

      <View style={styles.footer}>
        {revealed ? (
          <TouchableOpacity onPress={onNext} style={styles.nextBtn} activeOpacity={0.88}>
            <Text style={styles.nextText}>{index === total - 1 ? 'ಪರೀಕ್ಷೆ ಮುಗಿಸಿ →' : 'ಮುಂದಿನ ಪ್ರಶ್ನೆ →'}</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.footerRow}>
            <TouchableOpacity onPress={skipAnswer} style={styles.skipBtn} activeOpacity={0.85}>
              <Text style={styles.skipText}>ಬಿಟ್ಟುಬಿಡಿ</Text>
            </TouchableOpacity>
            <Text style={styles.footerHint}>ಉತ್ತರ ಆಯ್ಕೆ ಮಾಡಿ</Text>
          </View>
        )}
      </View>
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
    textAlign: 'center',
    marginTop: 40,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
  },
  closeBtn: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 18,
    height: 36,
    justifyContent: 'center',
    marginRight: spacing.sm,
    width: 36,
  },
  closeText: {
    color: colors.ink,
    fontSize: 15,
  },
  headerCenter: {
    flex: 1,
  },
  headerTitle: {
    color: colors.ink,
    fontFamily: type.bodySemi.fontFamily,
    fontSize: 15,
  },
  headerSub: {
    color: colors.slate,
    fontFamily: type.small.fontFamily,
    fontSize: 11,
  },
  bar: {
    marginHorizontal: spacing.md,
    marginTop: spacing.sm,
  },
  body: {
    flex: 1,
    padding: spacing.md,
  },
  explanationWrap: {
    marginTop: spacing.md,
  },
  footer: {
    paddingBottom: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
  },
  footerRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  skipBtn: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.lg,
    paddingVertical: 12,
  },
  skipText: {
    color: colors.inkSoft,
    fontFamily: type.bodySemi.fontFamily,
    fontSize: 14,
  },
  footerHint: {
    color: colors.slate,
    fontFamily: type.small.fontFamily,
    fontSize: 12,
    marginLeft: spacing.md,
  },
  nextBtn: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: radius.pill,
    paddingVertical: 14,
  },
  nextText: {
    color: '#ffffff',
    fontFamily: type.bodySemi.fontFamily,
    fontSize: 15,
  },
});