import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Animated,
  Image,
  ImageSourcePropType,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import { colors, fonts, radius, shadows, spacing, type } from '../theme';
import { coreSubjects, getSubjectById } from '../data/subjects';
import { questionCountForSubject, getPracticeSet, getDailyChallenge } from '../data/questions';
import { useAppNavigation } from '../navigation/context';
import { Screen } from '../components/Screen';
import { Icon3D } from '../components/Icon3D';
import { SubjectCard } from '../components/SubjectCard';
import { SectionHeader } from '../components/SectionHeader';
import { getSubjectProgress, computeOverallAccuracy } from '../utils/userProgress';
import { SubjectId } from '../types';
import { APP_META } from '../config/app';

interface HomeScreenProps {
  logoSource: ImageSourcePropType;
}

interface MenuItem {
  key: string;
  label: string;
  icon: string;
  route: string;
}

const MENU: MenuItem[] = [
  { key: 'about', label: 'ನಮ್ಮ ಬಗ್ಗೆ', icon: '🏛️', route: 'about' },
  { key: 'developer', label: 'ಡೆವಲಪರ್', icon: '👨‍💻', route: 'developer' },
  { key: 'appInfo', label: 'ಅಪ್ಲಿಕೇಶನ್ ಬಗ್ಗೆ', icon: '📱', route: 'appInfo' },
  { key: 'contact', label: 'ಸಂಪರ್ಕ', icon: '✉️', route: 'contact' },
  { key: 'privacy', label: 'ಗೌಪ್ಯತಾ ನೀತಿ', icon: '🔒', route: 'privacy' },
  { key: 'help', label: 'ಸಹಾಯ', icon: '❓', route: 'help' },
  { key: 'bookmarks', label: 'ಬುಕ್ ಮಾರ್ಕ್ಸ್', icon: '🔖', route: 'bookmarks' },
  { key: 'aitutor', label: 'AI ಸಹಾಯಕ', icon: '🤖', route: 'aitutor' },
];

export const HomeScreen: React.FC<HomeScreenProps> = ({ logoSource }) => {
  const { width } = useWindowDimensions();
  const nav = useAppNavigation();
  const progress = nav.nav.progress;

  const isDeviceReady = progress && progress.totalQuestionsAttempted !== undefined;
  const accuracy = progress ? computeOverallAccuracy(progress) : 0;

  const [menuOpen, setMenuOpen] = useState(false);
  const slide = useRef(new Animated.Value(-width)).current;

  useEffect(() => {
    if (menuOpen) {
      Animated.timing(slide, { toValue: 0, duration: 260, useNativeDriver: true }).start();
    } else {
      Animated.timing(slide, { toValue: -width, duration: 220, useNativeDriver: true }).start();
    }
  }, [menuOpen, slide, width]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  const openMenuRoute = useCallback(
    (item: MenuItem) => {
      setMenuOpen(false);
      // slight delay so the drawer visibly closes before navigating
      setTimeout(() => nav.navigate(item.route), 120);
    },
    [nav],
  );

  const startDailyChallenge = useCallback(() => {
    const set = getDailyChallenge();
    if (set.length) {
      nav.startQuiz({
        title: 'ದೈನಂದಿನ ಸವಾಲು',
        subtitle: '5 ಆಯ್ದ ಪ್ರಶ್ನೆಗಳು — ವೇಗ ಪರೀಕ್ಷೆ',
        testType: 'dailyChallenge',
        testId: 'daily-challenge',
        questions: set,
        duration: 8,
      });
    }
  }, [nav]);

  if (!isDeviceReady) return null;

  const bySubject = (id: SubjectId) => getSubjectProgress(progress, id);

  return (
    <View style={styles.root}>
      <Screen>
        {/* ── Top bar: logo + hamburger ── */}
        <View style={styles.topBar}>
          <View style={styles.brand}>
            {logoSource ? <Image source={logoSource} style={styles.logo} /> : null}
            <View>
              <Text style={styles.brandName}>{APP_META.nameKn}</Text>
              <Text style={styles.brandTag}>{APP_META.shortTagline}</Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => setMenuOpen(true)}
            style={styles.menuBtn}
            accessibilityLabel="ಮೆನು ತೆರೆಯಿರಿ"
            activeOpacity={0.8}
          >
            <View style={styles.menuLineA} />
            <View style={styles.menuLineB} />
            <View style={styles.menuLineC} />
          </TouchableOpacity>
        </View>

        {/* ── Hero ── */}
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>NityaPragati</Text>
          <Text style={styles.heroSub}>ನಿಮ್ಮ KPSC ಯಶಸ್ಸಿನ ಡಿಜಿಟಲ್ ಸಂಗಾತಿ</Text>
          <View style={styles.heroChips}>
            <View style={styles.heroChip}>
              <Text style={styles.heroChipText}>ಕನ್ನಡ ಮೊದಲು</Text>
            </View>
            <View style={styles.heroChip}>
              <Text style={styles.heroChipText}>SDA • FDA</Text>
            </View>
          </View>
          <View style={styles.heroCard}>
            <View style={styles.heroStat}>
              <Text style={styles.heroStatValue}>{progress.totalQuestionsAttempted}</Text>
              <Text style={styles.heroStatLabel}>ಪ್ರಶ್ನೆಗಳು</Text>
            </View>
            <View style={styles.heroStatDivider} />
            <View style={styles.heroStat}>
              <Text style={styles.heroStatValue}>{accuracy}%</Text>
              <Text style={styles.heroStatLabel}>ನಿಖರತೆ</Text>
            </View>
            <View style={styles.heroStatDivider} />
            <View style={styles.heroStat}>
              <Text style={styles.heroStatValue}>{progress.streak}🔥</Text>
              <Text style={styles.heroStatLabel}>ಸರಣಿ</Text>
            </View>
          </View>
        </View>

        {/* ── Daily challenge quick entry ── */}
        <TouchableOpacity onPress={startDailyChallenge} activeOpacity={0.9} style={styles.dailyCard}>
          <Icon3D emoji="🎯" accent={colors.primary} size={50} variant="chip" />
          <View style={styles.dailyText}>
            <Text style={styles.dailyTitle}>ಇಂದಿನ ಸವಾಲು</Text>
            <Text style={styles.dailySub}>5 ಪ್ರಶ್ನೆಗಳು • ~8 ನಿಮಿಷ • ಎಲ್ಲಾ ವಿಷಯಗಳ ಮಿಶ್ರಣ</Text>
          </View>
          <Text style={styles.dailyArrow}>→</Text>
        </TouchableOpacity>

        {/* ── Subject modules ── */}
        <SectionHeader
          title="ಅಭ್ಯಾಸ ವಿಷಯಗಳು"
          subtitle="ನಾಲ್ಕು ಪ್ರಮುಖ ಮಾಡ್ಯೂಲ್ಗಳು"
          icon="📚"
          actionLabel="ಪರೀಕ್ಷೆಗಳು"
          onAction={() => nav.goToTab('tests')}
        />

        {coreSubjects.map((sid) => {
          const subj = getSubjectById(sid);
          if (!subj) return null;
          const count = questionCountForSubject(sid);
          const sp = bySubject(sid);
          return (
            <View key={sid} style={styles.subjectGap}>
              <SubjectCard
                subject={subj}
                questionCount={count}
                attempted={sp?.questionsAttempted ?? 0}
                accuracy={sp?.accuracy ?? 0}
                onPress={() => nav.navigate('subjectDetail', { subjectId: sid })}
                onPractice={() => {
                  const set = getPracticeSet(sid, 15);
                  if (set.length) {
                    nav.startQuiz({
                      title: `${subj.nameKn} ಅಭ್ಯಾಸ`,
                      subtitle: 'ವಿಷಯ-ಆಧಾರಿತ 15 ಪ್ರಶ್ನೆಗಳು',
                      testType: 'practice',
                      testId: `ps-${sid}`,
                      questions: set,
                      duration: 20,
                      subjectId: sid,
                    });
                  }
                }}
              />
            </View>
          );
        })}

        <SectionHeader title="ನಿಮ್ಮ ಪ್ರಗತಿ" subtitle="ಮುಂದುವರೆಯಿರಿ" icon="📈" />
        <TouchableOpacity onPress={() => nav.goToTab('insights')} activeOpacity={0.9} style={styles.progressCard}>
          <View style={styles.progressRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.progressLabel}>ಒಟ್ಟು ಪ್ರಶ್ನೆಗಳು</Text>
              <Text style={styles.progressValue}>
                {progress.totalQuestionsAttempted} <Text style={styles.progressUnit}>/ {progress.weeklyGoal} ವಾರದ ಗುರಿ</Text>
              </Text>
            </View>
            <Text style={styles.progressCta}>ಇನ್ಸೈಟ್ಸ್ →</Text>
          </View>
        </TouchableOpacity>
      </Screen>

      {/* ── Hamburger drawer ── */}
      <Modal visible={menuOpen} transparent animationType="none" onRequestClose={closeMenu}>
        <View style={styles.drawerRoot}>
          <Animated.View style={[styles.drawer, { transform: [{ translateX: slide }] }]}>
            <View style={styles.drawerHeader}>
              <Text style={styles.drawerTitle}>ಮೆನು</Text>
              <TouchableOpacity onPress={closeMenu} style={styles.drawerClose} activeOpacity={0.8}>
                <Text style={styles.drawerCloseText}>✕</Text>
              </TouchableOpacity>
            </View>
            {MENU.map((item) => (
              <TouchableOpacity
                key={item.key}
                onPress={() => openMenuRoute(item)}
                style={styles.menuItem}
                activeOpacity={0.8}
              >
                <Icon3D emoji={item.icon} accent={colors.primary} size={38} variant="flat" tint={colors.primarySoft} />
                <Text style={styles.menuItemText}>{item.label}</Text>
                <Text style={styles.menuItemArrow}>›</Text>
              </TouchableOpacity>
            ))}
          </Animated.View>
          <TouchableOpacity style={styles.drawerScrim} onPress={closeMenu} activeOpacity={1} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1 },
  topBar: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
    marginTop: spacing.xs,
  },
  brand: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  logo: {
    borderRadius: 12,
    height: 40,
    marginRight: spacing.sm,
    width: 40,
  },
  brandName: {
    color: colors.ink,
    fontFamily: fonts.heading,
    fontSize: 18,
    lineHeight: 22,
  },
  brandTag: {
    color: colors.slate,
    fontFamily: type.small.fontFamily,
    fontSize: 11,
  },
  menuBtn: {
    alignItems: 'flex-end',
    backgroundColor: colors.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.line,
    height: 42,
    justifyContent: 'center',
    paddingHorizontal: 11,
    width: 42,
    ...shadows.hairline,
  },
  menuLineA: {
    backgroundColor: colors.ink,
    borderRadius: 2,
    height: 2.4,
    marginBottom: 4,
    width: 20,
  },
  menuLineB: {
    backgroundColor: colors.ink,
    borderRadius: 2,
    height: 2.4,
    marginBottom: 4,
    width: 14,
  },
  menuLineC: {
    backgroundColor: colors.ink,
    borderRadius: 2,
    height: 2.4,
    width: 20,
  },
  hero: {
    marginBottom: spacing.md,
  },
  heroTitle: {
    color: colors.navyDeep,
    fontFamily: fonts.heading,
    fontSize: 34,
    lineHeight: 42,
  },
  heroSub: {
    color: colors.inkSoft,
    fontFamily: type.body.fontFamily,
    fontSize: 15,
    lineHeight: 22,
    marginTop: 2,
  },
  heroChips: {
    flexDirection: 'row',
    gap: 8,
    marginTop: spacing.sm,
  },
  heroChip: {
    backgroundColor: colors.primarySoft,
    borderRadius: radius.pill,
    paddingHorizontal: 11,
    paddingVertical: 4,
  },
  heroChipText: {
    color: colors.primaryStrong,
    fontFamily: type.bodySemi.fontFamily,
    fontSize: 11,
  },
  heroCard: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    flexDirection: 'row',
    marginTop: spacing.md,
    paddingVertical: spacing.md,
    ...shadows.card,
  },
  heroStat: {
    alignItems: 'center',
    flex: 1,
  },
  heroStatValue: {
    color: colors.ink,
    fontFamily: fonts.heading,
    fontSize: 20,
    lineHeight: 24,
  },
  heroStatLabel: {
    color: colors.slate,
    fontFamily: type.small.fontFamily,
    fontSize: 11,
    marginTop: 2,
  },
  heroStatDivider: {
    backgroundColor: colors.line,
    height: 30,
    width: 1,
  },
  dailyCard: {
    alignItems: 'center',
    backgroundColor: colors.navyDeep,
    borderRadius: radius.lg,
    flexDirection: 'row',
    marginBottom: spacing.lg,
    padding: spacing.md,
    ...shadows.soft,
  },
  dailyText: {
    flex: 1,
    marginLeft: spacing.md,
  },
  dailyTitle: {
    color: '#ffffff',
    fontFamily: fonts.heading,
    fontSize: 17,
  },
  dailySub: {
    color: 'rgba(255,255,255,0.78)',
    fontFamily: type.small.fontFamily,
    fontSize: 12,
    marginTop: 2,
  },
  dailyArrow: {
    color: '#ffffff',
    fontSize: 20,
    paddingHorizontal: spacing.sm,
  },
  subjectGap: {
    marginBottom: spacing.md,
  },
  progressCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    ...shadows.card,
  },
  progressRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  progressLabel: {
    color: colors.slate,
    fontFamily: type.small.fontFamily,
    fontSize: 12,
  },
  progressValue: {
    color: colors.ink,
    fontFamily: fonts.heading,
    fontSize: 20,
    marginTop: 2,
  },
  progressUnit: {
    color: colors.slate,
    fontFamily: type.small.fontFamily,
    fontSize: 12,
  },
  progressCta: {
    color: colors.primary,
    fontFamily: type.bodySemi.fontFamily,
    fontSize: 13,
  },
  // Drawer
  drawerRoot: {
    flex: 1,
  },
  drawerScrim: {
    backgroundColor: colors.scrim,
    flex: 1,
  },
  drawer: {
    backgroundColor: colors.surface,
    height: '100%',
    paddingHorizontal: spacing.md,
    paddingTop: spacing.lg,
    position: 'absolute',
    right: 0,
    top: 0,
    width: '78%',
    zIndex: 2,
    ...shadows.soft,
  },
  drawerHeader: {
    alignItems: 'center',
    borderBottomColor: colors.line,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
    paddingBottom: spacing.md,
  },
  drawerTitle: {
    color: colors.ink,
    fontFamily: fonts.heading,
    fontSize: 22,
  },
  drawerClose: {
    alignItems: 'center',
    backgroundColor: colors.surfaceAlt,
    borderRadius: 18,
    height: 36,
    justifyContent: 'center',
    width: 36,
  },
  drawerCloseText: {
    color: colors.ink,
    fontSize: 16,
  },
  menuItem: {
    alignItems: 'center',
    borderRadius: radius.md,
    flexDirection: 'row',
    marginVertical: 3,
    paddingVertical: 10,
  },
  menuItemText: {
    color: colors.ink,
    flex: 1,
    fontFamily: type.bodySemi.fontFamily,
    fontSize: 15,
    marginLeft: spacing.sm,
  },
  menuItemArrow: {
    color: colors.slate,
    fontSize: 20,
  },
});