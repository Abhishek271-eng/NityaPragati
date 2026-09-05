import React, { useEffect, useRef } from 'react';
import { Animated, Easing, Image, ImageSourcePropType, StyleSheet, Text, View } from 'react-native';
import { colors, fonts, radius, shadows, spacing, type } from '../theme';

// ═══════════════════════════════════════════════════════════════
// SplashScreen — premium white/blue brand splash.
// Logo + name animate in; then calls onFinish → App proceeds.
// ═══════════════════════════════════════════════════════════════

interface SplashScreenProps {
  logoSource: ImageSourcePropType;
  onFinish: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ logoSource, onFinish }) => {
  const scale = useRef(new Animated.Value(0.7)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const fadeOut = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, { toValue: 1, duration: 450, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      Animated.spring(scale, { toValue: 1, friction: 6, useNativeDriver: true }),
    ]).start();

    const t = setTimeout(() => {
      Animated.timing(fadeOut, { toValue: 0, duration: 320, useNativeDriver: true }).start(() => onFinish());
    }, 1500);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.root}>
      <Animated.View style={[styles.brand, { opacity, transform: [{ scale }] }]}>
        <View style={styles.logoWrap}>
          <Image source={logoSource} style={styles.logo} resizeMode="contain" />
        </View>
        <Text style={styles.name}>NityaPragati</Text>
        <Text style={styles.sub}>ನಿತ್ಯ ಪ್ರಗತಿ — ನಿಮ್ಮ KPSC ಯಶಸ್ಸಿನ ಸಂಗಾತಿ</Text>
      </Animated.View>

      <Animated.View style={[styles.footer, { opacity: fadeOut }]}>
        <View style={styles.loaderRow}>
          <View style={styles.loader} />
        </View>
        <Text style={styles.loaderText}>ಅಭ್ಯಾಸ ಸಿದ್ಧಗೊಳಿಸಲಾಗುತ್ತಿದೆ…</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    backgroundColor: colors.background,
    flex: 1,
    justifyContent: 'center',
  },
  brand: {
    alignItems: 'center',
  },
  logoWrap: {
    backgroundColor: colors.surface,
    borderRadius: radius.xxl,
    padding: spacing.md,
    ...shadows.lift,
  },
  logo: {
    height: 108,
    width: 108,
  },
  name: {
    color: colors.navyDeep,
    fontFamily: fonts.heading,
    fontSize: 34,
    lineHeight: 42,
    marginTop: spacing.lg,
  },
  sub: {
    color: colors.inkSoft,
    fontFamily: type.body.fontFamily,
    fontSize: 14,
    marginTop: 4,
  },
  footer: {
    alignItems: 'center',
    bottom: spacing.xxl,
    position: 'absolute',
  },
  loaderRow: {
    backgroundColor: colors.primarySoft,
    borderRadius: radius.pill,
    height: 6,
    overflow: 'hidden',
    width: 140,
  },
  loader: {
    backgroundColor: colors.primary,
    borderRadius: radius.pill,
    height: 6,
    width: 70,
  },
  loaderText: {
    color: colors.slate,
    fontFamily: type.small.fontFamily,
    fontSize: 12,
    marginTop: spacing.sm,
  },
});