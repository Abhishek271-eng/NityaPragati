import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, fonts, radius, shadows, spacing, type } from '../theme';
import { useAppNavigation } from '../navigation/context';
import { Screen } from '../components/Screen';
import { BackHeader } from './components/BackHeader';
import { APP_META } from '../config/app';

export const AppInfoScreen: React.FC = () => {
  const nav = useAppNavigation();

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <BackHeader title="ಅಪ್ಲಿಕೇಶನ್ ಬಗ್ಗೆ" onBack={() => nav.resetNavigation('home')} />
      <Screen>
        <View style={styles.hero}>
          <Text style={styles.appName}>{APP_META.name}</Text>
          <Text style={styles.tagline}>{APP_META.tagline}</Text>
          <View style={styles.versionPill}>
            <Text style={styles.versionText}>ಆವೃತ್ತಿ {APP_META.version}</Text>
          </View>
        </View>

        <Text style={styles.section}>ಅಪ್ಲಿಕೇಶನ್ ವಿವರ</Text>
        <View style={styles.card}>
          <InfoRow label="ಹೆಸರು" value={APP_META.name} />
          <InfoRow label="ಕನ್ನಡ ಹೆಸರು" value={APP_META.nameKn} />
          <InfoRow label="ಗುರಿ ಪರೀಕ್ಷೆಗಳು" value={APP_META.targetExams.join(', ')} />
          <InfoRow label="ಅಧಿಕೃತ KPSC" value="kpsc.kar.nic.in" />
          <InfoRow label="ಭಾಷೆ" value="ಕನ್ನಡ-ಮೊದಲು" />
          <InfoRow label="ಡೇಟಾ ಸಂಗ್ರಹ" value="ಸಾಧನದಲ್ಲಿ (ಲೋಕಲ್)" />
        </View>

        <Text style={styles.section}>ವೈಶಿಷ್ಟ್ಯಗಳು</Text>
        <View style={styles.card}>
          <Feature icon="🏠" text="ಮುಖಪುಟ — ದೈನಂದಿನ ಸವಾಲು + 4 ವಿಷಯ ಮಾಡ್ಯೂಲ್ಗಳು" />
          <Feature icon="📝" text="ಪರೀಕ್ಷೆಗಳು — ಹಿಂದಿನ ವರ್ಷ ರಚನಾ ಮಾದರಿ + ವಿಷಯ/ಸಾಮಾನ್ಯ ಅಭ್ಯಾಸ" />
          <Feature icon="🗞️" text="ಅಪ್ಡೇಟ್ಸ್ — ಪ್ರಮುಖ ವಿದ್ಯಮಾನ + ಪರೀಕ್ಷೆಗೆ ಮುಖ್ಯವಾದ ಅಂಶಗಳು" />
          <Feature icon="📈" text="ಇನ್ಸೈಟ್ಸ್ — ನಿಖರತೆ, ಸನ್ನದ್ಧತೆ, ದುರ್ಬಲ/ಬಲಿಷ್ಠ ವಿಷಯಗಳು" />
          <Feature icon="🤖" text="AI ಸಹಾಯಕ — ನಿಮ್ಮ ಅಂಕಿಅಂಶ ಆಧಾರಿತ ಸೂಚನೆ" />
          <Feature icon="🔖" text="ಬುಕ್ ಮಾರ್ಕ್ಸ್ — ಮುಖ್ಯ ಪ್ರಶ್ನೆಗಳ ಕ್ಯೂರೇಟೆಡ್ ಸೆಟ್" />
        </View>

        <Text style={styles.note}>
          ಎಲ್ಲಾ ವಿಷಯದ ಪ್ರಶ್ನೆ ಬ್ಯಾಂಕ್ಗಳು ಪರೀಕ್ಷೆಯ ರಚನೆಯನ್ನು ಅನುಸರಿಸಿ ರಚಿಸಲಾದ ಅಭ್ಯಾಸ ಸೆಟ್ಗಳು —
          "ಹಿಂದಿನ ವರ್ಷದ ಪ್ರಶ್ನೆಗಳು" ಎಂದು ಹೇಳಿಕೊಳ್ಳದೆ, ಸ್ಪಷ್ಟವಾಗಿ ಗುರುತಿಸಲಾಗಿದೆ.
        </Text>
      </Screen>
    </SafeAreaView>
  );
};

const InfoRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <View style={styles.infoRow}>
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={styles.infoValue}>{value}</Text>
  </View>
);

const Feature: React.FC<{ icon: string; text: string }> = ({ icon, text }) => (
  <View style={styles.featureRow}>
    <Text style={styles.featureIcon}>{icon}</Text>
    <Text style={styles.featureText}>{text}</Text>
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
  appName: {
    color: colors.navyDeep,
    fontFamily: fonts.heading,
    fontSize: 26,
  },
  tagline: {
    color: colors.inkSoft,
    fontFamily: type.body.fontFamily,
    fontSize: 14,
    marginTop: 2,
    textAlign: 'center',
  },
  versionPill: {
    backgroundColor: colors.primarySoft,
    borderRadius: radius.pill,
    marginTop: spacing.sm,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  versionText: {
    color: colors.primaryStrong,
    fontFamily: type.bodySemi.fontFamily,
    fontSize: 12,
  },
  section: {
    color: colors.ink,
    fontFamily: fonts.heading,
    fontSize: 18,
    marginBottom: spacing.sm,
    marginTop: spacing.lg,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    ...shadows.card,
  },
  infoRow: {
    alignItems: 'center',
    borderBottomColor: colors.lineSoft,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  infoLabel: {
    color: colors.slate,
    fontFamily: type.small.fontFamily,
    fontSize: 12,
  },
  infoValue: {
    color: colors.ink,
    fontFamily: type.bodySemi.fontFamily,
    fontSize: 13,
    marginLeft: spacing.sm,
    textAlign: 'right',
  },
  featureRow: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    marginVertical: 5,
  },
  featureIcon: {
    fontSize: 15,
    marginRight: spacing.sm,
    width: 24,
  },
  featureText: {
    color: colors.inkSoft,
    flex: 1,
    fontFamily: type.body.fontFamily,
    fontSize: 13.5,
    lineHeight: 20,
  },
  note: {
    color: colors.slate,
    fontFamily: type.small.fontFamily,
    fontSize: 11.5,
    lineHeight: 18,
    marginTop: spacing.lg,
  },
});