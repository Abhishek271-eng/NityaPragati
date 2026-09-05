import React, { useEffect, useRef } from 'react';
import { Animated, Easing, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, radius, shadows, spacing, type } from '../../theme';
import { Achievement } from '../../types';

// ═══════════════════════════════════════════════════════════════
// AchievementModal — premium white/blue "ಸಾಧನೆ ಅನ್ಲಾಕ್!" celebration.
// Scales in with a spring; auto-closes after ~4s.
// ═══════════════════════════════════════════════════════════════

export const AchievementModal: React.FC<{
  achievements: Achievement[];
  visible: boolean;
  onClose: () => void;
}> = ({ achievements, visible, onClose }) => {
  const scale = useRef(new Animated.Value(0.6)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible && achievements.length) {
      opacity.setValue(0);
      scale.setValue(0.6);
      Animated.parallel([
        Animated.timing(opacity, { toValue: 1, duration: 250, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
        Animated.spring(scale, { toValue: 1, friction: 5, useNativeDriver: true }),
      ]).start();
    }
  }, [visible, achievements.length, opacity, scale]);

  const autoClose = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    if (visible && achievements.length) {
      if (autoClose.current) clearTimeout(autoClose.current);
      autoClose.current = setTimeout(onClose, 4200);
    }
    return () => {
      if (autoClose.current) clearTimeout(autoClose.current);
    };
  }, [visible, achievements.length, onClose]);

  if (!visible || !achievements.length) return null;

  return (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={onClose}>
      <View style={styles.backdrop} accessible={false}>
        <Animated.View style={[styles.card, { opacity, transform: [{ scale }] }]}>
          <View style={styles.burstWrap}>
            <Text style={styles.burst}>🎉</Text>
            <View style={styles.confettiDotA} />
            <View style={styles.confettiDotB} />
            <View style={styles.confettiDotC} />
          </View>
          <Text style={styles.title}>ಸಾಧನೆ ಅನ್ಲಾಕ್!</Text>
          <Text style={styles.sub}>ಸ್ಥಿರ ಅಭ್ಯಾಸ — ನಿಜವಾದ ಪ್ರಗತಿ!</Text>
          {achievements.map((a) => (
            <View key={a.id} style={styles.item}>
              <View style={styles.itemIconWrap}>
                <Text style={styles.itemIcon}>{a.icon}</Text>
              </View>
              <View style={styles.itemCopy}>
                <Text style={styles.itemTitle}>{a.titleKn || a.title}</Text>
                <Text style={styles.itemDesc}>{a.description}</Text>
              </View>
            </View>
          ))}
          <TouchableOpacity onPress={onClose} style={styles.button} activeOpacity={0.85}>
            <Text style={styles.buttonText}>ಮುಂದುವರೆಯಿರಿ →</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    alignItems: 'center',
    backgroundColor: colors.scrim,
    flex: 1,
    justifyContent: 'center',
    padding: spacing.lg,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    maxWidth: 360,
    padding: spacing.xl,
    width: '100%',
    ...shadows.soft,
  },
  burstWrap: {
    alignItems: 'center',
    alignSelf: 'center',
    height: 64,
    justifyContent: 'center',
    position: 'relative',
    width: 64,
  },
  burst: {
    fontSize: 46,
  },
  confettiDotA: {
    backgroundColor: colors.primary,
    borderRadius: 4,
    height: 8,
    position: 'absolute',
    right: 2,
    top: 8,
    transform: [{ rotate: '25deg' }],
    width: 8,
  },
  confettiDotB: {
    backgroundColor: colors.gold,
    borderRadius: 4,
    bottom: 6,
    height: 8,
    left: 2,
    position: 'absolute',
    transform: [{ rotate: '-15deg' }],
    width: 8,
  },
  confettiDotC: {
    backgroundColor: colors.success,
    borderRadius: 4,
    height: 8,
    position: 'absolute',
    right: 0,
    top: 30,
    transform: [{ rotate: '45deg' }],
    width: 8,
  },
  title: {
    color: colors.ink,
    fontFamily: type.bodySemi.fontFamily,
    fontSize: 20,
    marginTop: spacing.sm,
    textAlign: 'center',
  },
  sub: {
    color: colors.slate,
    fontFamily: type.small.fontFamily,
    fontSize: 12,
    marginBottom: spacing.md,
    marginTop: 2,
    textAlign: 'center',
  },
  item: {
    alignItems: 'center',
    backgroundColor: colors.primaryMist,
    borderRadius: radius.md,
    flexDirection: 'row',
    marginBottom: spacing.sm,
    padding: spacing.sm,
  },
  itemIconWrap: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    height: 44,
    justifyContent: 'center',
    marginRight: spacing.md,
    width: 44,
  },
  itemIcon: {
    fontSize: 24,
  },
  itemCopy: {
    flex: 1,
  },
  itemTitle: {
    color: colors.ink,
    fontFamily: type.bodySemi.fontFamily,
    fontSize: 15,
  },
  itemDesc: {
    color: colors.inkSoft,
    fontFamily: type.small.fontFamily,
    fontSize: 12,
    lineHeight: 18,
    marginTop: 2,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: radius.pill,
    marginTop: spacing.sm,
    paddingVertical: 13,
    ...shadows.lift,
  },
  buttonText: {
    color: '#ffffff',
    fontFamily: type.bodySemi.fontFamily,
    fontSize: 15,
    textAlign: 'center',
  },
});