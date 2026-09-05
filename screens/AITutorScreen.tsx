import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, fonts, radius, shadows, spacing, type } from '../theme';
import { useAppNavigation } from '../navigation/context';
import { buildWelcomeMessage, getAITutorReply, TutorMessage } from '../utils/aiTutor';
import { getStudyRecommendation } from '../utils/userProgress';
import { getQuestionsByTopic, getDailyChallenge } from '../data/questions';
import { BackHeader } from './components/BackHeader';

// ═══════════════════════════════════════════════════════════════
// AITutorScreen — performance-aware study partner (rule-based).
// Every reply is derived from the user's REAL progress data.
// ═══════════════════════════════════════════════════════════════

const SUGGESTIONS = ['ನನ್ನ ದುರ್ಬಲ ವಿಷಯಗಳು', 'Exam strategy', 'Explain percentage', 'ಸಾಮಾನ್ಯ ಜ್ಞಾನ ಅಭ್ಯಾಸ'];

const RichText: React.FC<{ text: string; style?: object }> = ({ text, style }) => {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <Text style={style}>
      {parts.map((p, i) =>
        p.startsWith('**') && p.endsWith('**') ? (
          <Text key={i} style={{ fontFamily: type.bodySemi.fontFamily }}>
            {p.slice(2, -2)}
          </Text>
        ) : (
          <Text key={i}>{p}</Text>
        ),
      )}
    </Text>
  );
};

export const AITutorScreen: React.FC = () => {
  const nav = useAppNavigation();
  const progress = nav.nav.progress;
  const [messages, setMessages] = useState<TutorMessage[]>([]);
  const [input, setInput] = useState('');
  const [thinking, setThinking] = useState(false);
  const scrollRef = useRef<ScrollView>(null);

  const recommendation = useMemo(() => getStudyRecommendation(progress), [progress]);

  useEffect(() => {
    setMessages([buildWelcomeMessage(progress)]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollToEnd({ animated: true });
  }, [messages, thinking]);

  const send = (raw?: string) => {
    const text = (raw ?? input).trim();
    if (!text || thinking) return;
    setInput('');
    const userMsg: TutorMessage = {
      id: 'user-' + Date.now(),
      role: 'user',
      text,
      createdAt: new Date().toISOString(),
    };
    setMessages((m) => [...m, userMsg]);
    setThinking(true);
    setTimeout(() => {
      const reply = getAITutorReply(text, progress);
      setMessages((m) => [...m, reply]);
      setThinking(false);
    }, 420);
  };

  const startRecommended = () => {
    if (!recommendation) return;
    const qs = getQuestionsByTopic(recommendation.topicId).filter((q) => q.subjectId === recommendation.subjectId);
    nav.startQuiz({
      title: `ಅಭ್ಯಾಸ: ${recommendation.topicName}`,
      subtitle: `${recommendation.questions} ಪ್ರಶ್ನೆಗಳು • ~${recommendation.minutes} ನಿಮಿಷ`,
      testType: 'topic',
      testId: 'tutor-' + Date.now(),
      questions: qs.length ? qs : getDailyChallenge(),
      duration: recommendation.minutes,
      subjectId: recommendation.subjectId,
      topicId: recommendation.topicId,
    });
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <BackHeader
          title="AI ಸಹಾಯಕ"
          onBack={() => nav.resetNavigation('home')}
          right={
            <View style={styles.onlineDot}>
              <View style={styles.onlineInner} />
            </View>
          }
        />

        <ScrollView
          ref={scrollRef}
          contentContainerStyle={styles.messages}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {messages.map((m) => (
            <View key={m.id} style={[styles.bubbleRow, m.role === 'user' ? styles.userRow : styles.aiRow]}>
              {m.role === 'assistant' ? (
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>✨</Text>
                </View>
              ) : null}
              <View style={[styles.bubble, m.role === 'user' ? styles.userBubble : styles.aiBubble]}>
                <RichText
                  text={m.text}
                  style={[styles.bubbleText, m.role === 'user' && styles.userBubbleText]}
                />
              </View>
            </View>
          ))}

          {thinking ? (
            <View style={[styles.bubbleRow, styles.aiRow]}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>✨</Text>
              </View>
              <View style={[styles.bubble, styles.aiBubble]}>
                <Text style={styles.typing}>•••</Text>
              </View>
            </View>
          ) : null}

          {recommendation ? (
            <TouchableOpacity style={styles.recoBar} onPress={startRecommended} activeOpacity={0.85}>
              <Text style={styles.recoBarTitle}>🎯 ಸೂಚನೆ: {recommendation.topicName}</Text>
              <Text style={styles.recoBarDesc} numberOfLines={2}>
                {recommendation.reason}
              </Text>
              <Text style={styles.recoBarCta}>ಅಭ್ಯಾಸ ಪ್ರಾರಂಭಿಸಿ →</Text>
            </TouchableOpacity>
          ) : null}
        </ScrollView>

        <View style={styles.suggestRow}>
          {SUGGESTIONS.map((s) => (
            <TouchableOpacity key={s} style={styles.suggestChip} onPress={() => send(s)} activeOpacity={0.85}>
              <Text style={styles.suggestText}>{s}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.composer}>
          <TextInput
            style={styles.input}
            placeholder="ಪರಿಕಲ್ಪನೆ, ದುರ್ಬಲ ವಿಷಯ, ತಂತ್ರ… ಕೇಳಿ"
            placeholderTextColor={colors.slate}
            value={input}
            onChangeText={setInput}
            onSubmitEditing={() => send()}
            returnKeyType="send"
            multiline
          />
          <TouchableOpacity
            style={[styles.sendBtn, (!input.trim() || thinking) && styles.sendBtnDisabled]}
            onPress={() => send()}
            disabled={!input.trim() || thinking}
            activeOpacity={0.8}
          >
            <Text style={styles.sendText}>➤</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    backgroundColor: colors.background,
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  onlineDot: {
    alignItems: 'center',
    backgroundColor: colors.primarySoft,
    borderRadius: 18,
    height: 36,
    justifyContent: 'center',
    width: 36,
  },
  onlineInner: {
    backgroundColor: colors.success,
    borderRadius: 5,
    height: 10,
    width: 10,
  },
  messages: {
    padding: spacing.md,
    paddingBottom: spacing.xl,
  },
  bubbleRow: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    marginBottom: spacing.sm,
  },
  userRow: {
    justifyContent: 'flex-end',
  },
  aiRow: {
    justifyContent: 'flex-start',
  },
  avatar: {
    alignItems: 'center',
    backgroundColor: colors.primarySoft,
    borderRadius: 999,
    height: 30,
    justifyContent: 'center',
    marginRight: spacing.sm,
    width: 30,
  },
  avatarText: {
    fontSize: 15,
  },
  bubble: {
    borderRadius: radius.lg,
    maxWidth: '80%',
    padding: spacing.sm,
  },
  aiBubble: {
    backgroundColor: colors.surface,
    ...shadows.hairline,
  },
  userBubble: {
    backgroundColor: colors.primary,
  },
  bubbleText: {
    color: colors.inkSoft,
    fontFamily: type.body.fontFamily,
    fontSize: 14,
    lineHeight: 22,
  },
  userBubbleText: {
    color: '#ffffff',
  },
  typing: {
    color: colors.slate,
    fontSize: 16,
    letterSpacing: 2,
  },
  recoBar: {
    backgroundColor: colors.primaryMist,
    borderLeftColor: colors.primary,
    borderLeftWidth: 3,
    borderRadius: radius.lg,
    marginTop: spacing.sm,
    padding: spacing.md,
  },
  recoBarTitle: {
    color: colors.primaryStrong,
    fontFamily: type.bodySemi.fontFamily,
    fontSize: 14,
  },
  recoBarDesc: {
    color: colors.inkSoft,
    fontFamily: type.small.fontFamily,
    fontSize: 12,
    lineHeight: 18,
    marginTop: 4,
  },
  recoBarCta: {
    color: colors.primary,
    fontFamily: type.smallSemi.fontFamily,
    fontSize: 12,
    marginTop: spacing.sm,
  },
  suggestRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xs,
  },
  suggestChip: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: radius.pill,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  suggestText: {
    color: colors.inkSoft,
    fontFamily: type.small.fontFamily,
    fontSize: 12,
  },
  composer: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    paddingBottom: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.xs,
  },
  input: {
    backgroundColor: colors.surface,
    borderColor: colors.line,
    borderRadius: radius.lg,
    borderWidth: 1,
    color: colors.ink,
    flex: 1,
    fontFamily: type.body.fontFamily,
    fontSize: 14,
    maxHeight: 100,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  sendBtn: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 999,
    height: 44,
    justifyContent: 'center',
    marginLeft: spacing.sm,
    width: 44,
    ...shadows.lift,
  },
  sendBtnDisabled: {
    opacity: 0.4,
  },
  sendText: {
    color: '#ffffff',
    fontSize: 18,
  },
});