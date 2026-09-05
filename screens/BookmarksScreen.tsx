import React, { useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, fonts, radius, shadows, spacing, type } from '../theme';
import { useAppNavigation } from '../navigation/context';
import { Screen } from '../components/Screen';
import { BackHeader } from './components/BackHeader';
import { EmptyState } from '../components/EmptyState';
import { getQuestionsByIds } from '../data/questions';
import { getSubjectById } from '../data/subjects';

export const BookmarksScreen: React.FC = () => {
  const nav = useAppNavigation();
  const progress = nav.nav.progress;

  const saved = useMemo(() => getQuestionsByIds(progress.bookmarks), [progress.bookmarks]);

  const remove = (id: string) => {
    nav.setProgress((prev) => ({ ...prev, bookmarks: prev.bookmarks.filter((b) => b !== id) }));
  };

  const practice = () => {
    if (!saved.length) return;
    nav.startQuiz({
      title: 'ಬುಕ್ ಮಾರ್ಕ್ಡ್ ಅಭ್ಯಾಸ',
      subtitle: `${saved.length} ಕ್ಯೂರೇಟೆಡ್ ಪ್ರಶ್ನೆಗಳು`,
      testType: 'practice',
      testId: 'bookmarks-practice',
      questions: saved,
      duration: 0,
    });
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <BackHeader
        title={`ಬುಕ್ ಮಾರ್ಕ್ಸ್ (${saved.length})`}
        onBack={() => nav.resetNavigation('home')}
        right={
          saved.length > 0 ? (
            <TouchableOpacity onPress={practice} style={styles.playBtn} activeOpacity={0.85}>
              <Text style={styles.playText}>▶</Text>
            </TouchableOpacity>
          ) : undefined
        }
      />
      <Screen>
        {saved.length === 0 ? (
          <EmptyState
            icon="🔖"
            accent={colors.primary}
            title="ಇನ್ನೂ ಬುಕ್ ಮಾರ್ಕ್ ಇಲ್ಲ"
            subtitle="ಅಭ್ಯಾಸದ ಸಮಯದಲ್ಲಿ ಪ್ರಶ್ನೆಯನ್ನು ಬುಕ್ ಮಾರ್ಕ್ ಮಾಡಿ — ಇಲ್ಲಿ ಕ್ಯೂರೇಟೆಡ್ ಸೆಟ್ ಕಾಣುತ್ತದೆ."
          />
        ) : null}

        <View style={styles.listHead}>
          <Text style={styles.hint}>ಪುನರಾವರ್ತನೆಗಾಗಿ ಮುಖ್ಯ ಪ್ರಶ್ನೆಗಳು — ಟ್ಯಾಪ್ ಮಾಡಿ ತೆಗೆಯಿರಿ</Text>
        </View>

        {saved.map((q) => {
          const subj = getSubjectById(q.subjectId);
          return (
            <TouchableOpacity key={q.id} style={styles.card} onPress={() => remove(q.id)} activeOpacity={0.85}>
              <View style={[styles.iconBox, { backgroundColor: subj?.tint ?? colors.primarySoft }]}>
                <Text style={styles.iconText}>{subj?.icon ?? '❓'}</Text>
              </View>
              <View style={styles.body}>
                <Text style={[styles.subject, { color: subj?.accent ?? colors.primary }]}>
                  {subj?.nameKn ?? 'ವಿಷಯ'}
                </Text>
                <Text style={styles.qtext} numberOfLines={2}>
                  {q.question}
                </Text>
              </View>
              <Text style={styles.remove}>✕</Text>
            </TouchableOpacity>
          );
        })}
      </Screen>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    backgroundColor: colors.background,
    flex: 1,
  },
  playBtn: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 18,
    height: 36,
    justifyContent: 'center',
    width: 36,
  },
  playText: {
    color: '#ffffff',
    fontSize: 14,
  },
  listHead: {
    marginBottom: spacing.sm,
  },
  hint: {
    color: colors.slate,
    fontFamily: type.small.fontFamily,
    fontSize: 11.5,
  },
  card: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    flexDirection: 'row',
    marginBottom: spacing.sm,
    padding: spacing.sm,
    ...shadows.card,
  },
  iconBox: {
    alignItems: 'center',
    borderRadius: radius.md,
    height: 42,
    justifyContent: 'center',
    width: 42,
  },
  iconText: {
    fontSize: 19,
  },
  body: {
    flex: 1,
    marginHorizontal: spacing.sm,
  },
  subject: {
    fontFamily: type.smallSemi.fontFamily,
    fontSize: 11,
  },
  qtext: {
    color: colors.ink,
    fontFamily: type.body.fontFamily,
    fontSize: 13.5,
    lineHeight: 20,
    marginTop: 1,
  },
  remove: {
    color: colors.slateLight,
    fontSize: 15,
    paddingHorizontal: spacing.xs,
  },
});