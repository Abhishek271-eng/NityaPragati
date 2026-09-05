import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, fonts, radius, shadows, spacing, type } from '../theme';
import { useAppNavigation } from '../navigation/context';
import { Screen } from '../components/Screen';
import { BackHeader } from './components/BackHeader';

interface Faq {
  q: string;
  a: string;
}

const FAQS: Faq[] = [
  {
    q: 'ಅಭ್ಯಾಸವನ್ನು ಹೇಗೆ ಪ್ರಾರಂಭಿಸುವುದು?',
    a: 'ಮುಖಪುಟದಲ್ಲಿ ನಾಲ್ಕು ವಿಷಯ ಮಾಡ್ಯೂಲ್ಗಳಿವೆ — ಇತಿಹಾಸ, ವ್ಯಾಕರಣ, ಸಂವಿಧಾನ, ಭೂಗೋಳ. ಯಾವುದಾದರೂ ವಿಷಯದ "ಪ್ರಶ್ನೆ ಬ್ಯಾಂಕ್" ಒತ್ತಿ, ಅಥವಾ ದೈನಂದಿನ ಸವಾಲಿನಿಂದ ಆರಂಭಿಸಿ. ಸಂಖ್ಯಾಶಕ್ತಿ (Aptitude) ಗೆ "ಪರೀಕ್ಷೆಗಳು" ಟ್ಯಾಬ್ ನೋಡಿ.',
  },
  {
    q: '"ಹಿಂದಿನ ವರ್ಷದ ಪ್ರಶ್ನೆಪತ್ರಿಕೆ" ನಿಜವಾದ ಪರೀಕ್ಷಾ ಪ್ರಶ್ನೆಗಳೇ?',
    a: 'ಇಲ್ಲ. KPSC SDA/FDA ಪತ್ರಿಕೆಯ ರಚನೆಯನ್ನು ಅನುಸರಿಸಿ ರಚಿಸಲಾದ ಮಾದರಿ ಅಭ್ಯಾಸ ಸೆಟ್ಗಳು. ಪ್ರತಿ ಸೆಟ್ ನಲ್ಲಿ ಇದನ್ನು ಸ್ಪಷ್ಟವಾಗಿ "ಮಾದರಿ ಅಭ್ಯಾಸ ಸೆಟ್" ಎಂದು ಗುರುತಿಸಲಾಗಿದೆ — ಇವನ್ನು ಅಧಿಕೃತ ಪ್ರಶ್ನೆ ಪತ್ರಿಕೆ ಎಂದು ಪರಿಗಣಿಸಬೇಡಿ.',
  },
  {
    q: 'ನನ್ನ ಸ್ಕೋರ್ / ಪ್ರಗತಿ ಹೇಗೆ ದಾಖಲಾಗುತ್ತದೆ?',
    a: 'ನೀವು ಅಭ್ಯಾಸ ಮುಗಿಸಿದಾಗ ಎಲ್ಲಾ ಉತ್ತರಗಳು ಸ್ವಯಂಚಾಲಿತವಾಗಿ ದಾಖಲಾಗಿ, ಸುಧಾರಣೆಯನ್ನು ಇನ್ಸೈಟ್ಸ್ ಟ್ಯಾಬ್ನಲ್ಲಿ ನೋಡಬಹುದು. ನಿಖರತೆ, ಸರಣಿ (streak), ದೈನಂದಿನ ಸಮಯ, ವಿಷಯವಾರು ಕಾರ್ಯಕ್ಷಮತೆ ಎಲ್ಲವೂ ಲೋಕಲ್ ಆಗಿ ಉಳಿಯುತ್ತದೆ.',
  },
  {
    q: 'ದುರ್ಬಲ ವಿಷಯಗಳನ್ನು ಗುರುತಿಸುವುದು ಹೇಗೆ?',
    a: 'ಇನ್ಸೈಟ್ಸ್ ಟ್ಯಾಬ್ನಲ್ಲಿ AI ಸಾರಾಂಶ ಮತ್ತು ದುರ್ಬಲ/ಬಲಿಷ್ಠ ವಿಷಯಗಳ ಪಟ್ಟಿ ಕಾಣಿಸುತ್ತದೆ. AI ಸಹಾಯಕನಲ್ಲಿ "ನನ್ನ ದುರ್ಬಲ ವಿಷಯಗಳು" ಎಂದು ಕೇಳಬಹುದು.',
  },
  {
    q: 'AI ಸಹಾಯಕ ಏನು ಮಾಡುತ್ತದೆ?',
    a: 'AI ಸಹಾಯಕ ನಿಮ್ಮ ನೈಜ ಕಾರ್ಯಕ್ಷಮತೆ ಡೇಟಾ ಆಧರಿಸಿ — ವಿಷಯ ವಿವರಣೆ, ಸೂಚನೆ, ದುರ್ಬಲ ಪ್ರದೇಶಗಳ ಗುರುತಿಸುವಿಕೆ, ಅಭ್ಯಾಸ ಸೆಟ್ ಸಲಹೆ ನೀಡುತ್ತದೆ. ಇದು ನಿಯಮ-ಆಧಾರಿತ ವ್ಯವಸ್ಥೆ, ಕಲ್ಪನಾ ಉತ್ತರವಲ್ಲ.',
  },
  {
    q: 'ಬುಕ್ ಮಾರ್ಕ್ಸ್ ಎಂದರೇನು?',
    a: 'ಅಭ್ಯಾಸದ ಸಮಯದಲ್ಲಿ ಮುಖ್ಯವೆನಿಸಿದ ಪ್ರಶ್ನೆಗಳನ್ನು ಬುಕ್ ಮಾರ್ಕ್ ಮಾಡಬಹುದು. ಪುನರಾವರ್ತನೆಗಾಗಿ ಕ್ಯೂರೇಟೆಡ್ ಸೆಟ್ ರಚಿಸಬಹುದು — ಹ್ಯಾಂಬರ್ಗರ್ ಮೆನು → ಬುಕ್ ಮಾರ್ಕ್ಸ್.',
  },
  {
    q: 'ಅಧಿಕೃತ ಅಧಿಸೂಚನೆಗಳನ್ನು ಎಲ್ಲಿ ಕಾಣುವೆ?',
    a: 'ಅಪ್ಡೇಟ್ಸ್ ಟ್ಯಾಬ್ನಲ್ಲಿ ಪ್ರಮುಖ ವಿದ್ಯಮಾನ ಮತ್ತು ಪರೀಕ್ಷೆಗೆ ಮುಖ್ಯವಾದ ಅಂಶಗಳನ್ನು ನೀಡುತ್ತೇವೆ. ಅಧಿಕೃತೆ ನೋಟಿಫಿಕೇಶನ್ಗೆ kpsc.kar.nic.in ಜಾಲತಾಣವೇ ಪ್ರಮಾಣ ಮೂಲ.',
  },
];

export const HelpScreen: React.FC = () => {
  const nav = useAppNavigation();
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <BackHeader title="ಸಹಾಯ" onBack={() => nav.resetNavigation('home')} />
      <Screen>
        <View style={styles.hero}>
          <Text style={styles.title}>ಸಹಾಯ & FAQ</Text>
          <Text style={styles.sub}>ಸಾಮಾನ್ಯ ಪ್ರಶ್ನೆಗಳಿಗೆ ತ್ವರಿತ ಉತ್ತರಗಳು</Text>
        </View>

        {FAQS.map((f, i) => {
          const open = openIdx === i;
          return (
            <View key={i} style={styles.faqCard}>
              <TouchableOpacity
                onPress={() => setOpenIdx(open ? null : i)}
                style={styles.faqHeader}
                activeOpacity={0.82}
              >
                <Text style={styles.faqQ}>{f.q}</Text>
                <Text style={[styles.chevron, open && styles.chevronOpen]}>⌄</Text>
              </TouchableOpacity>
              {open ? (
                <Text style={styles.faqA}>{f.a}</Text>
              ) : (
                <View style={styles.hiddenRow}>
                  <Text style={styles.hiddenHint}>ಉತ್ತರ ನೋಡಲು ಒತ್ತಿರಿ</Text>
                </View>
              )}
            </View>
          );
        })}

        <View style={styles.footBox}>
          <Text style={styles.footText}>
            ಇನ್ನಷ್ಟು ಸಲಹೆಗಳಿಗೆ — ಸಂಪರ್ಕ ವಿಭಾಗದ ಮೂಲಕ ನಮಗೆ ಇಮೇಲ್ ಮಾಡಿ. ಸಂತೋಷದಿಂದ ಸಹಾಯ ಮಾಡುತ್ತೇವೆ!
          </Text>
        </View>
      </Screen>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    backgroundColor: colors.background,
    flex: 1,
  },
  hero: {
    backgroundColor: colors.navyDeep,
    borderRadius: radius.xl,
    marginBottom: spacing.md,
    padding: spacing.lg,
    ...shadows.soft,
  },
  title: {
    color: '#ffffff',
    fontFamily: fonts.heading,
    fontSize: 21,
  },
  sub: {
    color: 'rgba(255,255,255,0.78)',
    fontFamily: type.small.fontFamily,
    fontSize: 12,
    marginTop: 3,
  },
  faqCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    marginBottom: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    ...shadows.card,
  },
  faqHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  faqQ: {
    color: colors.ink,
    flex: 1,
    fontFamily: type.bodySemi.fontFamily,
    fontSize: 14,
    lineHeight: 21,
  },
  chevron: {
    color: colors.slate,
    fontSize: 18,
    marginLeft: spacing.sm,
    transform: [{ rotate: '0deg' }],
  },
  chevronOpen: {
    color: colors.primary,
    transform: [{ rotate: '180deg' }],
  },
  faqA: {
    color: colors.inkSoft,
    fontFamily: type.body.fontFamily,
    fontSize: 13.5,
    lineHeight: 21,
    marginTop: spacing.sm,
  },
  hiddenRow: {
    marginTop: 6,
  },
  hiddenHint: {
    color: colors.slateLight,
    fontFamily: type.small.fontFamily,
    fontSize: 11,
  },
  footBox: {
    backgroundColor: colors.primaryMist,
    borderRadius: radius.md,
    marginTop: spacing.sm,
    padding: spacing.md,
  },
  footText: {
    color: colors.inkSoft,
    fontFamily: type.body.fontFamily,
    fontSize: 13,
    lineHeight: 20,
  },
});