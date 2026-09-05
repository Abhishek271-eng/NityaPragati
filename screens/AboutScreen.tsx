import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, fonts, radius, shadows, spacing, type } from '../theme';
import { useAppNavigation } from '../navigation/context';
import { Screen } from '../components/Screen';
import { BackHeader } from './components/BackHeader';
import { Icon3D } from '../components/Icon3D';
import { APP_META, DISCLAIMER } from '../config/app';

export const AboutScreen: React.FC = () => {
  const nav = useAppNavigation();

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <BackHeader title="ನಮ್ಮ ಬಗ್ಗೆ" onBack={() => nav.resetNavigation('home')} />
      <Screen>
        <View style={styles.hero}>
          <Icon3D emoji="🚀" accent={colors.primary} tint={colors.primarySoft} size={72} variant="chip" />
          <Text style={styles.name}>{APP_META.name}</Text>
          <Text style={styles.tagline}>{APP_META.tagline}</Text>
          <View style={styles.chipRow}>
            <View style={styles.chip}>
              <Text style={styles.chipText}>ಕನ್ನಡ ಮೊದಲು</Text>
            </View>
            <View style={styles.chip}>
              <Text style={styles.chipText}>{APP_META.targetExams.join(' • ')}</Text>
            </View>
          </View>
        </View>

        <Text style={styles.section}>ನಮ್ಮ ಧ್ಯೇಯ</Text>
        <Text style={styles.bodyText}>
          NityaPragati ಅಂದರೆ "ನಿತ್ಯ ಪ್ರಗತಿ" — ಪ್ರತಿದಿನ ಸಣ್ಣ ಸುಧಾರಣೆ. KPSC ಪರೀಕ್ಷೆಗೆ ತಯಾರಿ
          ನಡೆಸುವ ಪ್ರತಿಯೊಬ್ಬ ಅಭ್ಯರ್ಥಿಗೂ ಗುಣಮಟ್ಟದ, ಕನ್ನಡ-ಮೊದಲು ಡಿಜಿಟಲ್ ಅಭ್ಯಾಸ ವೇದಿಕೆಯನ್ನು
          ಒದಗಿಸುವುದೇ ನಮ್ಮ ಗುರಿ.
        </Text>

        <Text style={styles.section}>ನಾವೇನು ನೀಡುತ್ತೇವೆ</Text>
        <View style={styles.factRows}>
          <Fact icon="📚" text="ಸಂರಚನಾತ್ಮಕ ಪ್ರಶ್ನೆ ಬ್ಯಾಂಕ್ಗಳು — ಇತಿಹಾಸ, ವ್ಯಾಕರಣ, ಸಂವಿಧಾನ, ಭೂಗೋಳ, ಸಂಖ್ಯಾಶಕ್ತಿ, ಸಾಮಾನ್ಯ ಜ್ಞಾನ" />
          <Fact icon="🔎" text="ಪ್ರತಿ ಪ್ರಶ್ನೆಗೆ ಸ್ಪಷ್ಟ ವಿವರಣೆ ಮತ್ತು ಸಂಬಂಧಿತ ಪರಿಕಲ್ಪನೆ" />
          <Fact icon="📋" text="ಹಿಂದಿನ ವರ್ಷದ ಪ್ರಶ್ನೆಪತ್ರಿಕೆ ರಚನೆಯ ಮಾದರಿ ಅಭ್ಯಾಸ ಸೆಟ್ಗಳು" />
          <Fact icon="🧠" text="ಸ್ಪರ್ಧಾತ್ಮಕ ದರ್ಜೆಯ ಸಂಖ್ಯಾಶಕ್ತಿ (Aptitude) — ವಿಶೇಷ ಆದ್ಯತೆ" />
          <Fact icon="🗞️" text="ದೈನಂದಿನ ಪ್ರಮುಖ ಅಪ್ಡೇಟ್ಸ್ ಮತ್ತು ಪರೀಕ್ಷೆಗೆ ಮುಖ್ಯವಾದ ಅಂಶಗಳು" />
          <Fact icon="📊" text="ನಿಮ್ಮ ಪ್ರಗತಿ ಮತ್ತು AI ಸಹಾಯಕ ಒಳನೋಟಗಳು" />
        </View>

        <Text style={styles.section}>ಮುಖ್ಯ ಹೇಳಿಕೆ</Text>
        <View style={styles.disclaimerBox}>
          <Text style={styles.disclaimerText}>{DISCLAIMER}</Text>
        </View>

        <Text style={styles.version}>ಆವೃತ್ತಿ {APP_META.version}</Text>
      </Screen>
    </SafeAreaView>
  );
};

const Fact: React.FC<{ icon: string; text: string }> = ({ icon, text }) => (
  <View style={styles.factRow}>
    <Text style={styles.factIcon}>{icon}</Text>
    <Text style={styles.factText}>{text}</Text>
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
  name: {
    color: colors.navyDeep,
    fontFamily: fonts.heading,
    fontSize: 26,
    marginTop: spacing.sm,
  },
  tagline: {
    color: colors.inkSoft,
    fontFamily: type.body.fontFamily,
    fontSize: 14,
    marginTop: 2,
    textAlign: 'center',
  },
  chipRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: spacing.sm,
  },
  chip: {
    backgroundColor: colors.primarySoft,
    borderRadius: radius.pill,
    paddingHorizontal: 11,
    paddingVertical: 4,
  },
  chipText: {
    color: colors.primaryStrong,
    fontFamily: type.bodySemi.fontFamily,
    fontSize: 11,
  },
  section: {
    color: colors.ink,
    fontFamily: fonts.heading,
    fontSize: 18,
    marginBottom: spacing.sm,
    marginTop: spacing.lg,
  },
  bodyText: {
    color: colors.inkSoft,
    fontFamily: type.body.fontFamily,
    fontSize: 14,
    lineHeight: 23,
  },
  factRows: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    ...shadows.card,
  },
  factRow: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    marginVertical: 5,
  },
  factIcon: {
    fontSize: 15,
    marginRight: spacing.sm,
    width: 24,
  },
  factText: {
    color: colors.inkSoft,
    flex: 1,
    fontFamily: type.body.fontFamily,
    fontSize: 13.5,
    lineHeight: 20,
  },
  disclaimerBox: {
    backgroundColor: colors.warningSoft,
    borderRadius: radius.md,
    padding: spacing.md,
  },
  disclaimerText: {
    color: colors.inkSoft,
    fontFamily: type.body.fontFamily,
    fontSize: 13,
    lineHeight: 20,
  },
  version: {
    color: colors.slate,
    fontFamily: type.small.fontFamily,
    fontSize: 12,
    marginTop: spacing.lg,
    textAlign: 'center',
  },
});