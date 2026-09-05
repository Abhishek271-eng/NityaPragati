import React from 'react';
import { Alert, Image, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, fonts, radius, shadows, spacing, type } from '../theme';
import { useAppNavigation } from '../navigation/context';
import { Screen } from '../components/Screen';
import { BackHeader } from './components/BackHeader';
import { Icon3D } from '../components/Icon3D';
import { PrimaryButton } from '../components/PrimaryButton';
import { DEVELOPER } from '../config/app';

export const DeveloperScreen: React.FC = () => {
  const nav = useAppNavigation();
  const linkedIn = DEVELOPER.linkedInUrl;

  const openLinkedIn = () => {
    if (linkedIn) {
      Linking.openURL(linkedIn).catch(() => Alert.alert('ಕೊಂಡಿ ತೆರೆಯಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ', 'ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.'));
    } else {
      Alert.alert(
        'ಲಿಂಕ್ಡ್ಇನ್ ಪ್ರೊಫೈಲ್ ಇನ್ನೂ ಸೇರಿಸಿಲ್ಲ',
        'src/config/app.ts ಫೈಲಿನಲ್ಲಿ DEVELOPER.linkedInUrl ಗೆ ನಿಮ್ಮ ನಿಜವಾದ ಪ್ರೊಫೈಲ್ URL ಹೊಂದಿಸಿ. ಯಾವುದೇ ತಪ್ಪು URL ಬಳಸಲಾಗುವುದಿಲ್ಲ.',
      );
    }
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <BackHeader title="ಡೆವಲಪರ್" onBack={() => nav.resetNavigation('home')} />
      <Screen>
        <View style={styles.hero}>
          {DEVELOPER.photoSource ? (
            <Image source={DEVELOPER.photoSource} style={styles.photo} />
          ) : (
            <View style={styles.photoPlaceholder}>
              <Icon3D emoji="👨‍💻" accent={colors.primary} size={52} variant="flat" />
            </View>
          )}
          <View style={styles.nameRow}>
            <Text style={styles.name}>{DEVELOPER.name}</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>ವಿನ್ಯಾಸಕ • ಡೆವಲಪರ್</Text>
            </View>
          </View>
          <Text style={styles.role}>{DEVELOPER.role}</Text>

          <View style={styles.rolesRow}>
            {DEVELOPER.roles.map((r) => (
              <View key={r} style={styles.roleChip}>
                <Text style={styles.roleChipText}>{r}</Text>
              </View>
            ))}
          </View>

          <Text style={styles.bio}>{DEVELOPER.shortBio}</Text>

          <PrimaryButton
            label={linkedIn ? 'LinkedIn ಪ್ರೊಫೈಲ್ →' : 'LinkedIn (ಪ್ರೊಫೈಲ್ ಸೇರಿಸಲಾಗಿಲ್ಲ)'}
            onPress={openLinkedIn}
            style={styles.linkedinBtn}
          />
          <Text style={styles.hint}>ಪ್ರೊಫೈಲ್ ಲಿಂಕ್ ಕಾನ್ಫಿಗರೇಶನ್: src/config/app.ts → DEVELOPER.linkedInUrl</Text>
        </View>

        <Text style={styles.section}>ಕೈಗಾರಿಕಾ ದಕ್ಷತೆ</Text>
        <View style={styles.stackCard}>
          <StackRow icon="⚛️" label="React Native • Expo" />
          <StackRow icon="🧩" label="TypeScript (strict)" />
          <StackRow icon="📊" label="react-native-svg ಚಾರ್ಟ್ಗಳು" />
          <StackRow icon="🎨" label="ನಿರ್ದೇಶಿತ ಬಣ್ಣ ವ್ಯವಸ್ಥೆ — ಬಿಳಿ + ನೀಲಿ" />
          <StackRow icon="🤖" label="ನಿಯಮ-ಆಧಾರಿತ AI ಸಹಾಯಕ" />
        </View>

        <Text style={styles.thanks}>ಅಭ್ಯಾಸ ಮುಂದುವರಿಸಿ — ಪ್ರತಿದಿನ ಸ್ವಲ್ಪ ಸುಧಾರಣೆ! 🌟</Text>
      </Screen>
    </SafeAreaView>
  );
};

const StackRow: React.FC<{ icon: string; label: string }> = ({ icon, label }) => (
  <View style={styles.stackRow}>
    <View style={styles.stackIcon}>
      <Text style={styles.stackIconText}>{icon}</Text>
    </View>
    <Text style={styles.stackLabel}>{label}</Text>
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
  photo: {
    borderRadius: 48,
    height: 96,
    width: 96,
  },
  photoPlaceholder: {
    alignItems: 'center',
    backgroundColor: colors.primarySoft,
    borderRadius: 48,
    height: 96,
    justifyContent: 'center',
    width: 96,
  },
  nameRow: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: spacing.md,
  },
  name: {
    color: colors.navyDeep,
    fontFamily: fonts.heading,
    fontSize: 24,
  },
  badge: {
    backgroundColor: colors.primarySoft,
    borderRadius: radius.pill,
    marginLeft: spacing.sm,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  badgeText: {
    color: colors.primaryStrong,
    fontFamily: type.smallSemi.fontFamily,
    fontSize: 10,
  },
  role: {
    color: colors.inkSoft,
    fontFamily: type.bodySemi.fontFamily,
    fontSize: 14,
    marginTop: 2,
  },
  rolesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: spacing.sm,
  },
  roleChip: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: radius.pill,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  roleChipText: {
    color: colors.inkSoft,
    fontFamily: type.small.fontFamily,
    fontSize: 11,
  },
  bio: {
    color: colors.inkSoft,
    fontFamily: type.body.fontFamily,
    fontSize: 13.5,
    lineHeight: 21,
    marginTop: spacing.sm,
    textAlign: 'center',
  },
  linkedinBtn: {
    marginTop: spacing.md,
  },
  hint: {
    color: colors.slate,
    fontFamily: type.caption.fontFamily,
    fontSize: 10,
    marginTop: spacing.sm,
    textAlign: 'center',
  },
  section: {
    color: colors.ink,
    fontFamily: fonts.heading,
    fontSize: 18,
    marginBottom: spacing.sm,
    marginTop: spacing.lg,
  },
  stackCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    ...shadows.card,
  },
  stackRow: {
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 5,
  },
  stackIcon: {
    alignItems: 'center',
    backgroundColor: colors.primarySoft,
    borderRadius: radius.sm,
    height: 34,
    justifyContent: 'center',
    marginRight: spacing.sm,
    width: 34,
  },
  stackIconText: {
    fontSize: 16,
  },
  stackLabel: {
    color: colors.inkSoft,
    fontFamily: type.body.fontFamily,
    fontSize: 14,
  },
  thanks: {
    color: colors.primaryStrong,
    fontFamily: type.bodySemi.fontFamily,
    fontSize: 13,
    marginTop: spacing.lg,
    textAlign: 'center',
  },
});