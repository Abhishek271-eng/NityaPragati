import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing, type } from '../theme';
import { Question } from '../types';

interface ExplanationCardProps {
  question: Question;
  selected: number | null;
  resultSymbol?: 'tick' | 'cross';
}

export const ExplanationCard: React.FC<ExplanationCardProps> = ({ question, selected, resultSymbol }) => {
  const correctText = question.options[question.correctAnswer];
  const suggested = selected != null ? question.options[selected] : null;
  const isCorrect = selected === question.correctAnswer;

  const header = resultSymbol === 'tick'
    ? { text: 'ಸರಿ ಉತ್ತರ! 🎉', color: colors.success, bg: colors.successSoft }
    : resultSymbol === 'cross'
      ? { text: `ಸರಿಯಾದ ಉತ್ತರ: ${question.correctAnswer + 1}`, color: colors.error, bg: colors.errorSoft }
      : { text: 'ವಿವರಣೆ', color: colors.info, bg: colors.infoSoft };

  return (
    <View style={styles.card}>
      <View style={[styles.header, { backgroundColor: header.bg }]}>
        <Text style={[styles.headerText, { color: header.color }]}>
          {isCorrect && resultSymbol ? 'ಸರಿ ಉತ್ತರ! 🎉' : header.text}
        </Text>
      </View>

      <Text style={styles.answerLabel}>ಉತ್ತರ:</Text>
      <Text style={styles.answer}>{correctText}</Text>

      {suggested && suggested !== correctText ? (
        <Text style={styles.suggested}>ನೀವು ಆಯ್ಕೆ: {suggested}</Text>
      ) : null}

      <Text style={styles.expLabel}>📖 ವಿವರಣೆ:</Text>
      <Text style={styles.explanation}>{question.explanation}</Text>

      {question.relatedConcept ? (
        <View style={styles.conceptRow}>
          <Text style={styles.conceptLabel}>ಸಂಬಂಧಿತ ಪರಿಕಲ್ಪನೆ</Text>
          <Text style={styles.conceptValue}>{question.relatedConcept}</Text>
        </View>
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
  header: {
    borderRadius: radius.md,
    marginBottom: spacing.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
  },
  headerText: {
    fontFamily: type.bodySemi.fontFamily,
    fontSize: 14,
  },
  answerLabel: {
    ...type.small,
    color: colors.slate,
  },
  answer: {
    ...type.bodySemi,
    color: colors.ink,
    fontSize: 15,
    lineHeight: 22,
    marginTop: 2,
  },
  suggested: {
    ...type.small,
    color: colors.slate,
    marginTop: 2,
  },
  expLabel: {
    ...type.smallSemi,
    color: colors.inkSoft,
    marginTop: spacing.sm,
  },
  explanation: {
    ...type.body,
    color: colors.inkSoft,
    fontSize: 14,
    lineHeight: 22,
    marginTop: 4,
  },
  conceptRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.sm,
  },
  conceptLabel: {
    ...type.caption,
    color: colors.slate,
  },
  conceptValue: {
    ...type.caption,
    color: colors.primaryStrong,
    fontFamily: type.bodySemi.fontFamily,
  },
});