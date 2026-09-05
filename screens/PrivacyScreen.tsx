import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, fonts, radius, shadows, spacing, type } from '../theme';
import { useAppNavigation } from '../navigation/context';
import { Screen } from '../components/Screen';
import { BackHeader } from './components/BackHeader';
import { PRIVACY_NOTE } from '../config/app';

export const PrivacyScreen: React.FC = () => {
  const nav = useAppNavigation();

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <BackHeader title="ಗೌಪ್ಯತಾ ನೀತಿ" onBack={() => nav.resetNavigation('home')} />
      <Screen>
        <View style={styles.hero}>
          <Text style={styles.shield}>🔒</Text>
          <Text style={styles.title}>ನಿಮ್ಮ ಡೇಟಾ ನಿಮ್ಮದೇ</Text>
        </View>

        <View style={styles.noteBox}>
          <Text style={styles.noteText}>{PRIVACY_NOTE}</Text>
        </View>

        <Text style={styles.section}>ನಾವು ಏನು ಸಂಗ್ರಹಿಸುತ್ತೇವೆ</Text>
        <View style={styles.card}>
          <Bullet text="ನಿಮ್ಮ ಅಭ್ಯಾಸ ಪ್ರಗತಿ — ಅಂಕ, ಸರಿ/ತಪ್ಪು, ಸಮಯ, ಸರಣಿ (streak), XP" />
          <Bullet text="ಬುಕ್ ಮಾರ್ಕ್ಸ್ ಮಾಡಿದ ಪ್ರಶ್ನೆಗಳು" />
          <Bullet text="ಅಪ್ಡೇಟ್ಸ್ ಓದಿದ/ನೆನಪಿನ ಆದ್ಯತೆಗಳು" />
        </View>

        <Text style={styles.section}>ಇದೆಲ್ಲಾ ಎಲ್ಲಿ ಉಳಿಯುತ್ತದೆ?</Text>
        <View style={styles.card}>
          <Bullet text="ಸಂಪೂರ್ಣವಾಗಿ ನಿಮ್ಮ ಸಾಧನದ ಲೋಕಲ್ ಸ್ಟೋರೇಜ್ನಲ್ಲಿ (AsyncStorage)" />
          <Bullet text="ಯಾವುದೇ ದತ್ತಾಂಶ ಸರ್ವರ್ಗೆ ಕಳುಹಿಸಲಾಗುವುದಿಲ್ಲ" />
          <Bullet text="ಅಪ್ಲಿಕೇಶನ್ ಅಳಿಸಿದರೆ, ಡೇಟಾ ಸಹ ಅಳಿಸಲ್ಪಡುತ್ತದೆ" />
        </View>

        <Text style={styles.section}>ನಾವು ಏನು ಸಂಗ್ರಹಿಸುವುದಿಲ್ಲ</Text>
        <View style={styles.card}>
          <Bullet text="ಹೆಸರು, ಇಮೇಲ್, ಫೋನ್ ಸಂಖ್ಯೆ ಯಾವುದೇ ರೀತಿಯ ಲಾಗಿನ್ ವಿವರ" />
          <Bullet text="ಸ್ಥಳ, ಕ್ಯಾಮೆರಾ, ಸಂಪರ್ಕಗಳು — ಯಾವುದೇ ಅನುಮತಿ ಬೇಡ" />
          <Bullet text="ಟ್ರ್ಯಾಕಿಂಗ್ ಕುಕೀಸ್ / ಜಾಹೀರಾತು ಗುರುತು" />
        </View>

        <Text style={styles.foot}>
          ಡೇಟಾ ಸುರಕ್ಷತೆ ಬಗ್ಗೆ ಪ್ರಶ್ನೆಗಳಿದ್ದರೆ — ಸಂಪರ್ಕ ವಿಭಾಗದ ಮೂಲಕ ಇಮೇಲ್ ಮಾಡಿ.{"\n"}
          ಇತ್ತೀಚಿನ ನವೀಕರಣ: {new Date().getFullYear()}
        </Text>
      </Screen>
    </SafeAreaView>
  );
};

const Bullet: React.FC<{ text: string }> = ({ text }) => (
  <View style={styles.bulletRow}>
    <View style={styles.dot} />
    <Text style={styles.bulletText}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  safe: {
    backgroundColor: colors.background,
    flex: 1,
  },
  hero: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    padding: spacing.lg,
    ...shadows.card,
  },
  shield: {
    fontSize: 40,
  },
  title: {
    color: colors.navyDeep,
    fontFamily: fonts.heading,
    fontSize: 20,
    marginTop: spacing.xs,
  },
  noteBox: {
    backgroundColor: colors.primaryMist,
    borderLeftColor: colors.primary,
    borderLeftWidth: 3,
    borderRadius: radius.md,
    marginTop: spacing.md,
    padding: spacing.md,
  },
  noteText: {
    color: colors.inkSoft,
    fontFamily: type.body.fontFamily,
    fontSize: 13.5,
    lineHeight: 21,
  },
  section: {
    color: colors.ink,
    fontFamily: fonts.heading,
    fontSize: 17,
    marginBottom: spacing.sm,
    marginTop: spacing.lg,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    ...shadows.card,
  },
  bulletRow: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    marginVertical: 4,
  },
  dot: {
    backgroundColor: colors.primary,
    borderRadius: 4,
    height: 7,
    marginRight: spacing.sm,
    marginTop: 7,
    width: 7,
  },
  bulletText: {
    color: colors.inkSoft,
    flex: 1,
    fontFamily: type.body.fontFamily,
    fontSize: 13.5,
    lineHeight: 20,
  },
  foot: {
    color: colors.slate,
    fontFamily: type.small.fontFamily,
    fontSize: 11.5,
    lineHeight: 18,
    marginTop: spacing.lg,
    textAlign: 'center',
  },
});