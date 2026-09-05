import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, radius, spacing, type, difficultyKn } from '../theme';
import { Question } from '../types';
import { getTopicById } from '../data/subjects';

export type OptionState = 'idle' | 'correct' | 'wrong' | 'missed';

interface QuestionCardProps {
  question: Question;
  index: number;
  total: number;
  selected: number | null;
  onSelect: (index: number) => void;
  revealed: boolean; // show correct/wrong colouring
}

const LETTERS = ['ಅ', 'ಬ', 'ಸ', 'ಡ'];

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  index,
  total,
  selected,
  onSelect,
  revealed,
}) => {
  const topic = getTopicById(question.subjectId, question.topicId);

  const stateFor = (i: number): OptionState => {
    if (!revealed) return 'idle';
    if (i === question.correctAnswer) return 'correct';
    if (i === selected && selected !== question.correctAnswer) return 'wrong';
    return 'idle';
  };

  return (
    <View style={styles.card}>
      <View style={styles.metaRow}>
        <Text style={styles.counter}>
          ಪ್ರಶ್ನೆ {index + 1}/{total}
        </Text>
        <View style={styles.chipRow}>
          {topic ? (
            <View style={styles.chip}>
              <Text style={styles.chipText}>{topic.nameKn}</Text>
            </View>
          ) : null}
          <View style={[styles.chip, styles.diffChip]}>
            <Text style={styles.chipText}>{difficultyKn[question.difficulty]}</Text>
          </View>
        </View>
      </View>

      <Text style={styles.question}>{question.question}</Text>

      <View style={styles.options}>
        {question.options.map((opt, i) => {
          const st = stateFor(i);
          const isSelected = selected === i;
          const styleFor = {
            idle: [styles.option, isSelected && styles.optionSelected],
            correct: [styles.option, styles.optionCorrect],
            wrong: [styles.option, styles.optionWrong],
            missed: [styles.option, styles.optionMissed],
          }[st];

          return (
            <TouchableOpacity
              key={i}
              activeOpacity={0.8}
              disabled={revealed}
              onPress={() => onSelect(i)}
              style={styleFor}
            >
              <View
                style={[
                  styles.letter,
                  st === 'correct' && styles.letterCorrect,
                  st === 'wrong' && styles.letterWrong,
                  isSelected && st === 'idle' && styles.letterSelected,
                ]}
              >
                <Text style={styles.letterText}>{LETTERS[i]}</Text>
              </View>
              <Text
                style={[
                  styles.optionText,
                  st === 'correct' && styles.optionTextStrong,
                  st === 'wrong' && { color: colors.error },
                ]}
              >
                {opt}
              </Text>
              {st === 'correct' ? <Text style={styles.tick}>✓</Text> : null}
              {st === 'wrong' ? <Text style={styles.cross}>✕</Text> : null}
            </TouchableOpacity>
          );
        })}
      </View>

      {question.source && question.category === 'previousYear' ? (
        <Text style={styles.source}>📄 {question.source}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
  },
  metaRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  counter: {
    ...type.small,
    color: colors.slate,
  },
  chipRow: {
    flexDirection: 'row',
    gap: 6,
  },
  chip: {
    backgroundColor: colors.primaryMist,
    borderRadius: radius.pill,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  diffChip: {
    backgroundColor: '#f0e9ff',
  },
  chipText: {
    color: colors.inkSoft,
    fontSize: 11,
    fontFamily: type.bodySemi.fontFamily,
  },
  question: {
    ...type.h3,
    color: colors.ink,
    fontSize: 18,
    lineHeight: 27,
    marginVertical: spacing.md,
  },
  options: {
    gap: spacing.sm,
  },
  option: {
    alignItems: 'center',
    borderColor: colors.line,
    borderRadius: radius.md,
    borderWidth: 1,
    flexDirection: 'row',
    paddingHorizontal: spacing.md,
    paddingVertical: 13,
  },
  optionSelected: {
    backgroundColor: colors.primaryMist,
    borderColor: colors.primary,
  },
  optionCorrect: {
    backgroundColor: colors.successSoft,
    borderColor: colors.success,
  },
  optionWrong: {
    backgroundColor: colors.errorSoft,
    borderColor: colors.error,
  },
  optionMissed: {
    backgroundColor: colors.surfaceAlt,
    borderColor: colors.line,
  },
  letter: {
    alignItems: 'center',
    backgroundColor: colors.primaryMist,
    borderRadius: 20,
    height: 30,
    justifyContent: 'center',
    marginRight: spacing.sm,
    width: 30,
  },
  letterSelected: {
    backgroundColor: colors.primary,
  },
  letterCorrect: {
    backgroundColor: colors.success,
  },
  letterWrong: {
    backgroundColor: colors.error,
  },
  letterText: {
    color: colors.inkSoft,
    fontFamily: type.bodySemi.fontFamily,
    fontSize: 13,
  },
  optionText: {
    ...type.body,
    color: colors.inkSoft,
    flex: 1,
    fontSize: 14,
    lineHeight: 21,
  },
  optionTextStrong: {
    color: colors.success,
    fontFamily: type.bodySemi.fontFamily,
  },
  tick: {
    color: colors.success,
    fontSize: 16,
    fontWeight: '700',
  },
  cross: {
    color: colors.error,
    fontSize: 16,
    fontWeight: '700',
  },
  source: {
    ...type.caption,
    color: colors.slate,
    marginTop: spacing.md,
  },
});