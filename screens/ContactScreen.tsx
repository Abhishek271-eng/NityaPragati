import React from 'react';
import { Alert, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, fonts, radius, shadows, spacing, type } from '../theme';
import { useAppNavigation } from '../navigation/context';
import { Screen } from '../components/Screen';
import { BackHeader } from './components/BackHeader';
import { Icon3D } from '../components/Icon3D';
import { CONTACT, APP_META } from '../config/app';

export const ContactScreen: React.FC = () => {
  const nav = useAppNavigation();

  const mail = () => {
    Linking.openURL(`mailto:${CONTACT.email}?subject=NityaPragati ಸಲಹೆ`).catch(() =>
      Alert.alert('ಇಮೇಲ್ ಕಳುಹಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ', 'ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.'),
    );
  };

  const openKpsc = () => {
    Linking.openURL(APP_META.officialKpscUrl).catch(() => Alert.alert('ಕೊಂಡಿ ತೆರೆಯಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ', 'ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.'));
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <BackHeader title="ಸಂಪರ್ಕ" onBack={() => nav.resetNavigation('home')} />
      <Screen>
        <View style={styles.hero}>
          <Icon3D emoji="✉️" accent={colors.primary} tint={colors.primarySoft} size={64} variant="chip" />
          <Text style={styles.title}>ನಿಮ್ಮ ಪ್ರತಿಕ್ರಿಯೆ ಮುಖ್ಯ</Text>
          <Text style={styles.sub}>{CONTACT.feedbackNote}</Text>
        </View>

        <TouchableOpacity onPress={mail} style={styles.card} activeOpacity={0.88}>
          <View style={[styles.iconBox, { backgroundColor: colors.primarySoft }]}>
            <Text style={styles.iconText}>📧</Text>
          </View>
          <View style={styles.cardBody}>
            <Text style={styles.cardLabel}>ಇಮೇಲ್</Text>
            <Text style={styles.cardValue}>{CONTACT.email}</Text>
          </View>
          <Text style={styles.arrow}>→</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={openKpsc} style={styles.card} activeOpacity={0.88}>
          <View style={[styles.iconBox, { backgroundColor: colors.successSoft }]}>
            <Text style={styles.iconText}>🏛️</Text>
          </View>
          <View style={styles.cardBody}>
            <Text style={styles.cardLabel}>ಅಧಿಕೃತ KPSC ಜಾಲತಾಣ</Text>
            <Text style={styles.cardValue}>{APP_META.officialKpscUrl}</Text>
          </View>
          <Text style={styles.arrow}>→</Text>
        </TouchableOpacity>

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>📌 ಗಮನಿಸಿ</Text>
          <Text style={styles.infoText}>
            ಸಲಹೆಗಳು, ದೋಷ ವರದಿ ಅಥವಾ ಪಾಠ್ಯ/ಪ್ರಶ್ನೆ ಸಲಹೆಗಳಿಗೆ ಇಮೇಲ್ ಮಾಡಬಹುದು. ಪ್ರತಿಕ್ರಿಯೆ
            ಸಾಮಾನ್ಯವಾಗಿ 2–3 ದಿನಗಳಲ್ಲಿ.
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
    alignItems: 'center',
    backgroundColor: colors.navyDeep,
    borderRadius: radius.xl,
    padding: spacing.lg,
    ...shadows.soft,
  },
  title: {
    color: '#ffffff',
    fontFamily: fonts.heading,
    fontSize: 20,
    marginTop: spacing.sm,
  },
  sub: {
    color: 'rgba(255,255,255,0.8)',
    fontFamily: type.small.fontFamily,
    fontSize: 12,
    marginTop: 3,
    textAlign: 'center',
  },
  card: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    flexDirection: 'row',
    marginTop: spacing.md,
    padding: spacing.md,
    ...shadows.card,
  },
  iconBox: {
    alignItems: 'center',
    borderRadius: radius.md,
    height: 44,
    justifyContent: 'center',
    width: 44,
  },
  iconText: {
    fontSize: 20,
  },
  cardBody: {
    flex: 1,
    marginLeft: spacing.sm,
  },
  cardLabel: {
    color: colors.slate,
    fontFamily: type.small.fontFamily,
    fontSize: 11,
  },
  cardValue: {
    color: colors.ink,
    fontFamily: type.bodySemi.fontFamily,
    fontSize: 14,
    marginTop: 1,
  },
  arrow: {
    color: colors.primary,
    fontSize: 20,
    marginLeft: spacing.sm,
  },
  infoBox: {
    backgroundColor: colors.warningSoft,
    borderRadius: radius.md,
    marginTop: spacing.md,
    padding: spacing.md,
  },
  infoTitle: {
    color: colors.warning,
    fontFamily: type.bodySemi.fontFamily,
    fontSize: 13,
  },
  infoText: {
    color: colors.inkSoft,
    fontFamily: type.body.fontFamily,
    fontSize: 13,
    lineHeight: 20,
    marginTop: 4,
  },
});