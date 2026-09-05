import React, { useMemo } from 'react';
import { ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, fonts, radius, shadows, spacing, type } from '../theme';
import { useAppNavigation } from '../navigation/context';
import { DonutRing } from '../components/DonutRing';
import { StatCard } from '../components/StatCard';
import { ProgressBar } from '../components/ProgressBar';
import { Icon3D } from '../components/Icon3D';
import { ChartCard, LineChart, BarChart, RadarChart } from '../components/Charts';
import { AIInsightCard } from '../components/AIInsightCard';
import { subjects } from '../data/subjects';
import {
  computeOverallAccuracy,
  computeAvgTimePerQuestion,
  computeReadinessScore,
  generateAIInsights,
  getMetricsSeries,
  formatDuration,
  getTodayStats,
} from '../utils/userProgress';
import { SubjectId } from '../types';

export const InsightsScreen: React.FC = () => {
  const { width } = useWindowDimensions();
  const nav = useAppNavigation();
  const progress = nav.nav.progress;
  const anyActivity = progress.totalQuestionsAttempted > 0;

  const metrics = useMemo(() => getMetricsSeries(progress, 14), [progress.dailyStats.length]);
  const readiness = useMemo(() => computeReadinessScore(progress), [progress]);
  const accuracy = useMemo(() => computeOverallAccuracy(progress), [progress]);
  const avgTime = useMemo(() => computeAvgTimePerQuestion(progress), [progress]);
  const insights = useMemo(() => generateAIInsights(progress), [progress]);
  const today = useMemo(() => getTodayStats(progress), [progress]);

  const subjectPerf = useMemo(() => {
    return subjects.map((s) => {
      const sp = progress.subjectProgress[s.id];
      return {
        id: s.id,
        name: s.nameKn,
        short: s.nameKn.slice(0, 3),
        icon: s.icon,
        accent: s.accent,
        attempted: sp?.questionsAttempted ?? 0,
        accuracy: sp?.accuracy ?? 0,
      };
    });
  }, [progress]);

  const strong = [...subjectPerf].filter((s) => s.attempted > 0).sort((a, b) => b.accuracy - a.accuracy)[0];
  const weak = [...subjectPerf].filter((s) => s.attempted > 0).sort((a, b) => a.accuracy - b.accuracy)[0];

  // weak topics across subjects
  const weakTopics = useMemo(() => {
    const out: Array<{ subject: string; topic: string; accuracy: number; attempts: number; accent: string }> = [];
    for (const s of subjects) {
      const sp = progress.subjectProgress[s.id];
      if (!sp) continue;
      for (const [tid, tp] of Object.entries(sp.topicProgress)) {
        if (tp.attempted >= 3 && tp.accuracy < 65) {
          out.push({
            subject: s.nameKn,
            topic: tid,
            accuracy: tp.accuracy,
            attempts: tp.attempted,
            accent: s.accent,
          });
        }
      }
    }
    return out.sort((a, b) => a.accuracy - b.accuracy).slice(0, 5);
  }, [progress]);

  // strong topics
  const strongTopics = useMemo(() => {
    const out: Array<{ topic: string; accuracy: number; attempts: number }> = [];
    for (const s of subjects) {
      const sp = progress.subjectProgress[s.id];
      if (!sp) continue;
      for (const [tid, tp] of Object.entries(sp.topicProgress)) {
        if (tp.attempted >= 3 && tp.accuracy >= 75) {
          out.push({ topic: `${s.nameKn} • ${tid}`, accuracy: tp.accuracy, attempts: tp.attempted });
        }
      }
    }
    return out.sort((a, b) => b.accuracy - a.accuracy).slice(0, 5);
  }, [progress]);

  const latestAttempts = [...progress.attempts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5);
  const chartWidth = Math.min(360, width - 44);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <View style={styles.head}>
          <Text style={styles.eyebrow}>ವಿಶ್ಲೇಷಣೆ ಡ್ಯಾಶ್ಬೋರ್ಡ್</Text>
          <Text style={styles.title}>ಇನ್ಸೈಟ್ಸ್</Text>
        </View>

        {/* ── Exam Readiness ring (percentage centered inside) ── */}
        <View style={styles.ringCard}>
          <View style={styles.ringRow}>
            <Text style={styles.ringTitle}>ಪರೀಕ್ಷಾ ಸನ್ನದ್ಧತೆ</Text>
            <View style={[styles.levelChip, { backgroundColor: readiness.total >= 60 ? colors.successSoft : readiness.total >= 40 ? colors.warningSoft : colors.errorSoft }]}>
              <Text style={[styles.levelText, { color: readiness.total >= 60 ? colors.success : readiness.total >= 40 ? colors.warning : colors.error }]}>
                {readiness.total >= 60 ? 'ಬಲವಾಗಿದೆ' : readiness.total >= 40 ? 'ಸುಧಾರಿಸುತ್ತಿದೆ' : 'ಹೆಚ್ಚಿಸಬೇಕು'}
              </Text>
            </View>
          </View>
          <DonutRing value={readiness.total} size={200} strokeWidth={18} color={colors.primary} label="ಸನ್ನದ್ಧತೆ" />
          <View style={styles.readinessBreakdown}>
            {Object.entries(readiness.breakdown).map(([k, v]) => (
              <View key={k} style={styles.breakRow}>
                <Text style={styles.breakLabel}>{breakdownKn[k as keyof typeof breakdownKn] ?? k}</Text>
                <ProgressBar progress={v} color={colors.primary} height={6} style={styles.breakBar} />
                <Text style={styles.breakValue}>{v}%</Text>
              </View>
            ))}
          </View>
        </View>

        {/* ── Core metrics ── */}
        <View style={styles.statsRow}>
          <StatCard label="ನಿಖರತೆ" value={`${accuracy}%`} icon="🎯" accent={colors.primary} />
          <StatCard label="ಒಟ್ಟು ಪ್ರಶ್ನೆಗಳು" value={`${progress.totalQuestionsAttempted}`} icon="📚" accent={colors.primaryStrong} />
        </View>
        <View style={styles.statsRow}>
          <StatCard label="ಸರಿ / ತಪ್ಪು" value={`${progress.totalCorrectAnswers}/${progress.totalQuestionsAttempted - progress.totalCorrectAnswers}`} icon="✅" accent={colors.success} />
          <StatCard label="ಪ್ರತಿ ಪ್ರಶ್ನೆಗೆ ಸಮಯ" value={avgTime ? `${avgTime}s` : '—'} icon="⏱" accent={colors.warning} />
        </View>

        {/* ── AI summary ── */}
        {anyActivity ? (
          <View style={styles.aiCard}>
            <View style={styles.aiHead}>
              <Icon3D emoji="🤖" accent={colors.navy} tint={colors.primarySoft} size={46} variant="chip" />
              <View style={styles.aiHeadText}>
                <Text style={styles.aiTitle}>AI ನಿಮ್ಮ ತಯಾರಿಕೆಯನ್ನು ವಿಶ್ಲೇಷಿಸಿದೆ</Text>
                <Text style={styles.aiSub}>ನಿಮ್ಮ ದತ್ತಾಂಶದ ಆಧಾರದಲ್ಲಿ ನೈಜ ಸಾರಾಂಶ</Text>
              </View>
            </View>
            <View style={styles.aiGrid}>
              <View style={styles.aiItem}>
                <Text style={styles.aiLabel}>💪 ಬಲಿಷ್ಠ</Text>
                <Text style={styles.aiValue}>{strong ? `${strong.name} ${strong.accuracy}%` : '—'}</Text>
              </View>
              <View style={styles.aiItem}>
                <Text style={styles.aiLabel}>🎯 ಸುಧಾರಿಸಬೇಕಾದ</Text>
                <Text style={styles.aiValue}>{weak ? `${weak.name} ${weak.accuracy}%` : '—'}</Text>
              </View>
              <View style={styles.aiItem}>
                <Text style={styles.aiLabel}>📈 ಇತ್ತೀಚಿನ ನಿಖರತೆ</Text>
                <Text style={styles.aiValue}>{latestAttempts[0] ? `${latestAttempts[0].accuracy}%` : urgencyText(progress)}</Text>
              </View>
              <View style={styles.aiItem}>
                <Text style={styles.aiLabel}>🚀 ಸನ್ನದ್ಧತೆ</Text>
                <Text style={styles.aiValue}>{readiness.total}%</Text>
              </View>
            </View>
            <Text style={styles.aiAdviceLabel}>ಮುಂದಿನ 7 ದಿನಗಳ ಸೂಚನೆ</Text>
            <View style={styles.aiAdviceBox}>
              <Text style={styles.aiAdvice}>{aiWeeklyAdvice(progress, weak, strong)}</Text>
            </View>
          </View>
        ) : null}

        {/* ── Subject performance radar ── */}
        <ChartCard title="ವಿಷಯವಾರು ಕಾರ್ಯಕ್ಷಮತೆ" subtitle="ಆರು ವಿಷಯಗಳಲ್ಲಿನ ನಿಖರತೆ">
          <RadarChart
            axes={subjectPerf.map((s) => s.short)}
            values={subjectPerf.map((s) => s.accuracy)}
            color={colors.primary}
          />
          <View style={styles.subjectLegend}>
            {subjectPerf.map((s) => (
              <View key={s.id} style={styles.legendRow}>
                <Text style={styles.legendIcon}>{s.icon}</Text>
                <Text style={styles.legendName}>{s.name}</Text>
                <ProgressBar progress={s.accuracy} color={s.accent} height={5} style={styles.legendBar} />
                <Text style={styles.legendValue}>{s.attempted > 0 ? `${s.accuracy}%` : '—'}</Text>
              </View>
            ))}
          </View>
        </ChartCard>

        {/* ── Improvement trend ── */}
        <View style={styles.gap} />
        <ChartCard title="ಸುಧಾರಣಾ ಪ್ರವೃತ್ತಿ" subtitle="ಕಳೆದ 14 ದಿನಗಳ ನಿಖರತೆ">
          <LineChart
            data={metrics.map((m) => ({ label: m.date, value: m.accuracy || 0 }))}
            color={colors.primary}
            height={160}
          />
        </ChartCard>

        {/* ── Weekly volume ── */}
        <View style={styles.gap} />
        <ChartCard title="ಪ್ರಶ್ನೆಗಳ ಪ್ರಮಾಣ" subtitle="ಕಳೆದ 14 ದಿನಗಳ ದೈನಂದಿನ ಅಭ್ಯಾಸ">
          <BarChart
            data={metrics.map((m) => ({ label: m.date, value: m.questions }))}
            color={colors.sky}
            height={150}
          />
          <View style={styles.nowRow}>
            <Text style={styles.nowText}>
              ಇಂದು: {today.questionsAttempted} ಪ್ರಶ್ನೆಗಳು • {today.accuracy}% ನಿಖರತೆ • {today.studyTime} ನಿ
            </Text>
          </View>
        </ChartCard>

        {/* ── Weak / strong topics ── */}
        {weakTopics.length > 0 ? (
          <>
            <View style={styles.gap} />
            <View style={styles.topicCard}>
              <Text style={styles.topicCardTitle}>⚠️ ದುರ್ಬಲ ವಿಷಯಗಳು</Text>
              {weakTopics.map((t) => (
                <View key={t.topic} style={styles.topicRow}>
                  <View style={styles.topicTextWrap}>
                    <Text style={styles.topicName}>{t.subject}</Text>
                    <Text style={styles.topicMeta}>{t.topic} • {t.attempts} ಪ್ರಯತ್ನ</Text>
                  </View>
                  <Text style={[styles.topicPct, { color: colors.error }]}>{t.accuracy}%</Text>
                </View>
              ))}
            </View>
          </>
        ) : null}

        {strongTopics.length > 0 ? (
          <>
            <View style={styles.gap} />
            <View style={styles.topicCard}>
              <Text style={styles.topicCardTitle}>💪 ಬಲಿಷ್ಠ ವಿಷಯಗಳು</Text>
              {strongTopics.map((t) => (
                <View key={t.topic} style={styles.topicRow}>
                  <View style={styles.topicTextWrap}>
                    <Text style={styles.topicName}>{t.topic}</Text>
                    <Text style={styles.topicMeta}>{t.attempts} ಪ್ರಯತ್ನ</Text>
                  </View>
                  <Text style={[styles.topicPct, { color: colors.success }]}>{t.accuracy}%</Text>
                </View>
              ))}
            </View>
          </>
        ) : null}

        {/* ── AI insights list ── */}
        <View style={styles.gap} />
        {insights.map((ins) => (
          <AIInsightCard
            key={ins.id}
            insight={ins}
            onAction={
              ins.actionable
                ? () => {
                    if (ins.actionRoute === 'subjectDetail' && ins.subjectId) {
                      nav.navigate('subjectDetail', { subjectId: ins.subjectId });
                    } else if (ins.actionRoute === 'home') {
                      nav.goToTab('home');
                    } else {
                      nav.goToTab('tests');
                    }
                  }
                : undefined
            }
          />
        ))}

        {/* ── Consistency & recent activity ── */}
        <View style={styles.gap} />
        <View style={styles.topicCard}>
          <Text style={styles.topicCardTitle}>ಸ್ಥಿರತೆ ಮತ್ತು ಇತ್ತೀಚಿನ ಚಟುವಟಿಕೆ</Text>
          <View style={styles.topicRow}>
            <Text style={styles.topicNameDone}>🔥 ಸರಣಿ</Text>
            <Text style={styles.topicMeta}>
              {progress.streak} ದಿನ (ಉತ್ತಮ: {progress.longestStreak})
            </Text>
          </View>
          <View style={styles.topicRow}>
            <Text style={styles.topicNameDone}>⏳ ಒಟ್ಟು ಅಧ್ಯಯನ</Text>
            <Text style={styles.topicMeta}>{formatDuration(progress.totalStudyTime)}</Text>
          </View>
          <View style={styles.topicRow}>
            <Text style={styles.topicNameDone}>✨ XP</Text>
            <Text style={styles.topicMeta}>{progress.xp} XP • ಹಂತ {progress.level}</Text>
          </View>
          {latestAttempts.length > 0 ? (
            <View style={styles.activityList}>
              {latestAttempts.map((a) => (
                <View key={a.id} style={styles.activityRow}>
                  <Text style={styles.activityName} numberOfLines={1}>
                    {a.testId}
                  </Text>
                  <Text style={styles.activityMeta}>
                    {a.accuracy}% • {a.correctAnswers}/{a.totalQuestions}
                  </Text>
                </View>
              ))}
            </View>
          ) : (
            <Text style={styles.noActivity}>ಇನ್ನೂ ಪರೀಕ್ಷೆ ಮುಗಿಸಿಲ್ಲ — ಮುಖಪುಟದಲ್ಲಿ ಒಂದು ಅಭ್ಯಾಸ ಸೆಟ್ ಪ್ರಾರಂಭಿಸಿ!</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const breakdownKn = {
  Accuracy: 'ನಿಖರತೆ',
  Speed: 'ವೇಗ',
  Consistency: 'ಸ್ಥಿರತೆ',
  Coverage: 'ವ್ಯಾಪ್ತಿ',
  'Mock Performance': 'ಮಾದರಿ ಪರೀಕ್ಷೆ',
};

function urgencyText(progress: { totalQuestionsAttempted: number }): string {
  return progress.totalQuestionsAttempted > 0 ? 'ಅಭ್ಯಾಸ ಮುಂದುವರಿಸಿ' : 'ಅಭ್ಯಾಸ ಆರಂಭಿಸಿ';
}

function aiWeeklyAdvice(
  progress: { totalQuestionsAttempted: number },
  weak?: { name: string; accuracy: number },
  strong?: { name: string; accuracy: number },
): string {
  if (progress.totalQuestionsAttempted === 0) {
    return 'ದಿನಕ್ಕೆ 10 ಪ್ರಶ್ನೆಗಳನ್ನು ಅಭ್ಯಾಸ ಮಾಡಿ — ಒಂದು ವಾರದಲ್ಲಿ AI ನಿಮ್ಮ ನಿಖರತೆಯನ್ನು ನಕ್ಷೆ ಮಾಡುತ್ತದೆ. ಪ್ರತಿದಿನ ಕೆಲವೇ ನಿಮಿಷ ಸಾಕು.';
  }
  const pts: string[] = [];
  if (weak) pts.push(`ದುರ್ಬಲ ವಿಷಯವಾದ "${weak.name}" ನಲ್ಲಿ ದಿನಕ್ಕೆ 10 ಕೇಂದ್ರೀಕೃತ ಪ್ರಶ್ನೆಗಳು`);
  if (strong) pts.push(`ಬಲಿಷ್ಠ "${strong.name}" ನಲ್ಲಿ ವೇಗ-ಪರೀಕ್ಷೆಯ ಮೂಲಕ ಸ್ಕೋರ್ ಭದ್ರಪಡಿಸಿ`);
  pts.push('ವಾರಕ್ಕೆ 2 ಪೂರ್ಣ ಮಾದರಿ ಸೆಟ್');
  pts.push('ತಪ್ಪು ಪ್ರಶ್ನೆಗಳ ವಿಷಯವನ್ನು ಪುನರ್ ಅಭ್ಯಾಸ ಮಾಡಿ');
  return 'ಸೂಚನೆ: ' + pts.join(' • ') + '. ಸ್ಥಿರತೆಯೇ ಯಶಸ್ಸಿನ ಕೀಲಿ!';
}

const styles = StyleSheet.create({
  safe: {
    backgroundColor: colors.background,
    flex: 1,
  },
  scroll: {
    padding: spacing.md,
  },
  head: {
    marginBottom: spacing.md,
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
  ringCard: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    padding: spacing.lg,
    ...shadows.card,
  },
  ringRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  ringTitle: {
    color: colors.ink,
    fontFamily: fonts.heading,
    fontSize: 17,
  },
  levelChip: {
    borderRadius: radius.pill,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  levelText: {
    fontFamily: type.bodySemi.fontFamily,
    fontSize: 12,
  },
  readinessBreakdown: {
    gap: spacing.sm,
    marginTop: spacing.md,
    width: '100%',
  },
  breakRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  breakLabel: {
    color: colors.inkSoft,
    fontFamily: type.small.fontFamily,
    fontSize: 12,
    width: 88,
  },
  breakBar: {
    flex: 1,
  },
  breakValue: {
    color: colors.ink,
    fontFamily: type.bodySemi.fontFamily,
    fontSize: 12,
    marginLeft: spacing.sm,
    width: 34,
    textAlign: 'right',
  },
  statsRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  aiCard: {
    backgroundColor: colors.navyDeep,
    borderRadius: radius.xl,
    marginTop: spacing.md,
    padding: spacing.lg,
    ...shadows.soft,
  },
  aiHead: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  aiHeadText: {
    marginLeft: spacing.sm,
  },
  aiTitle: {
    color: '#ffffff',
    fontFamily: fonts.heading,
    fontSize: 16,
  },
  aiSub: {
    color: 'rgba(255,255,255,0.7)',
    fontFamily: type.small.fontFamily,
    fontSize: 11,
  },
  aiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  aiItem: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: radius.md,
    padding: spacing.sm,
    width: '48%',
  },
  aiLabel: {
    color: 'rgba(255,255,255,0.65)',
    fontFamily: type.small.fontFamily,
    fontSize: 11,
  },
  aiValue: {
    color: '#ffffff',
    fontFamily: type.bodySemi.fontFamily,
    fontSize: 14,
    marginTop: 2,
  },
  aiAdviceLabel: {
    color: '#ffffff',
    fontFamily: type.bodySemi.fontFamily,
    fontSize: 13,
    marginTop: spacing.md,
  },
  aiAdviceBox: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: radius.md,
    marginTop: spacing.xs,
    padding: spacing.sm,
  },
  aiAdvice: {
    color: 'rgba(255,255,255,0.9)',
    fontFamily: type.body.fontFamily,
    fontSize: 13,
    lineHeight: 20,
  },
  subjectLegend: {
    marginTop: spacing.sm,
    width: '100%',
  },
  legendRow: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: spacing.xs,
  },
  legendIcon: {
    fontSize: 14,
    marginRight: spacing.xs,
    width: 22,
  },
  legendName: {
    color: colors.inkSoft,
    fontFamily: type.small.fontFamily,
    fontSize: 12,
    width: 78,
  },
  legendBar: {
    flex: 1,
  },
  legendValue: {
    color: colors.ink,
    fontFamily: type.bodySemi.fontFamily,
    fontSize: 12,
    marginLeft: spacing.sm,
    width: 38,
    textAlign: 'right',
  },
  gap: {
    height: spacing.sm,
  },
  nowRow: {
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  nowText: {
    color: colors.slate,
    fontFamily: type.small.fontFamily,
    fontSize: 12,
    textAlign: 'center',
  },
  topicCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    ...shadows.card,
  },
  topicCardTitle: {
    color: colors.ink,
    fontFamily: fonts.heading,
    fontSize: 15,
    marginBottom: spacing.sm,
  },
  topicRow: {
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 2,
  },
  topicTextWrap: {
    flex: 1,
  },
  topicName: {
    color: colors.ink,
    fontFamily: type.bodySemi.fontFamily,
    fontSize: 13,
  },
  topicNameDone: {
    color: colors.ink,
    fontFamily: type.bodySemi.fontFamily,
    fontSize: 13,
    width: 140,
  },
  topicMeta: {
    color: colors.slate,
    fontFamily: type.small.fontFamily,
    fontSize: 11,
  },
  topicPct: {
    fontFamily: type.bodySemi.fontFamily,
    fontSize: 13,
    marginLeft: spacing.sm,
  },
  activityList: {
    marginTop: spacing.xs,
  },
  activityRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 3,
  },
  activityName: {
    color: colors.inkSoft,
    flex: 1,
    fontFamily: type.small.fontFamily,
    fontSize: 12,
  },
  activityMeta: {
    color: colors.slate,
    fontFamily: type.small.fontFamily,
    fontSize: 11,
  },
  noActivity: {
    color: colors.slate,
    fontFamily: type.small.fontFamily,
    fontSize: 12,
    lineHeight: 18,
    marginTop: spacing.xs,
  },
});