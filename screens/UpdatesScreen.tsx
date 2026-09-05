import React, { useMemo, useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, fonts, radius, shadows, spacing, type } from '../theme';
import { Screen } from '../components/Screen';
import { SectionHeader } from '../components/SectionHeader';
import { UpdateCard, categoryMeta } from '../components/UpdateCard';
import { Icon3D } from '../components/Icon3D';
import { currentAffairs, examBriefs, updateCategories } from '../data/currentAffairs';
import { CurrentAffair } from '../types';

export const UpdatesScreen: React.FC = () => {
  const [activeCat, setActiveCat] = useState<string>('ಎಲ್ಲಾ');
  const [open, setOpen] = useState<CurrentAffair | null>(null);

  const filtered = useMemo(() => {
    if (activeCat === 'ಎಲ್ಲಾ') return currentAffairs;
    return currentAffairs.filter((c) => c.category === activeCat);
  }, [activeCat]);

  const meta = open ? categoryMeta(open.category) : null;

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <Screen>
        <View style={styles.head}>
          <Text style={styles.eyebrow}>ಪ್ರಸ್ತುತ ವಿದ್ಯಮಾನ</Text>
          <Text style={styles.title}>ಅಪ್ಡೇಟ್ಸ್</Text>
          <Text style={styles.sub}>ಇಂದಿನ ಪ್ರಮುಖ ಅಪ್ಡೇಟ್ಸ್ — KPSC ದೃಷ್ಟಿಯಿಂದ</Text>
        </View>

        <View style={styles.chipsRow}>
          {['ಎಲ್ಲಾ', ...updateCategories].map((cat) => {
            const active = activeCat === cat;
            return (
              <TouchableOpacity
                key={cat}
                activeOpacity={0.85}
                onPress={() => setActiveCat(cat)}
                style={[styles.chip, active && styles.chipActive]}
              >
                <Text style={[styles.chipText, active && styles.chipTextActive]}>{cat}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {filtered.map((item) => (
          <View key={item.id} style={styles.gap}>
            <UpdateCard item={item} onPress={() => setOpen(item)} featured={item.featured} />
          </View>
        ))}

        {filtered.length === 0 ? (
          <View style={styles.emptyWrap}>
            <Icon3D emoji="🗞️" accent={colors.primary} size={64} variant="chip" />
            <Text style={styles.emptyText}>ಈ ವಿಭಾಗದಲ್ಲಿ ಅಪ್ಡೇಟ್ ಇಲ್ಲ.</Text>
          </View>
        ) : null}

        <SectionHeader title="ಪರೀಕ್ಷೆಗೆ ಮುಖ್ಯವಾದ ಅಂಶಗಳು" subtitle="ಸಿದ್ಧತಾ ಸಾರಾಂಶ" icon="📌" />
        {examBriefs.map((b) => (
          <View key={b.id} style={styles.briefCard}>
            <View style={styles.briefHeader}>
              <Text style={styles.briefIcon}>{b.icon}</Text>
              <Text style={styles.briefTitle}>{b.title}</Text>
            </View>
            {b.points.map((p, i) => (
              <View key={i} style={styles.briefPoint}>
                <View style={styles.briefBullet} />
                <Text style={styles.briefText}>{p}</Text>
              </View>
            ))}
          </View>
        ))}
      </Screen>

      {/* Read-more modal */}
      <Modal visible={Boolean(open)} transparent animationType="slide" onRequestClose={() => setOpen(null)}>
        <View style={styles.modalRoot}>
          <View style={styles.modalCard}>
            {open && meta ? (
              <>
                <View style={styles.modalHead}>
                  <Icon3D emoji={meta.icon} accent={meta.accent} tint={meta.tint} size={48} variant="chip" />
                  <View style={[styles.badge, { backgroundColor: meta.tint }]}>
                    <Text style={[styles.badgeText, { color: meta.accent }]}>{open.category}</Text>
                  </View>
                  <TouchableOpacity onPress={() => setOpen(null)} style={styles.modalClose} activeOpacity={0.8}>
                    <Text style={styles.modalCloseText}>✕</Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.modalTitle}>{open.title}</Text>
                <Text style={styles.modalDate}>📅 {open.date}</Text>

                <Text style={styles.modalBlockLabel}>ಸಾರಾಂಶ</Text>
                <Text style={styles.modalBody}>{open.summary}</Text>

                <View style={styles.modalMatter}>
                  <Text style={styles.modalMatterLabel}>🎯 KPSCಗೆ ಏಕೆ ಮುಖ್ಯ?</Text>
                  <Text style={styles.modalBody}>{open.whyMatters}</Text>
                </View>

                <View style={styles.modalTags}>
                  {open.kpscTags.map((t) => (
                    <View key={t} style={styles.modalTagPill}>
                      <Text style={styles.modalTagText}>{t}</Text>
                    </View>
                  ))}
                </View>

                <TouchableOpacity onPress={() => setOpen(null)} style={styles.modalBtn} activeOpacity={0.88}>
                  <Text style={styles.modalBtnText}>ಸರಿ</Text>
                </TouchableOpacity>
              </>
            ) : null}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    backgroundColor: colors.background,
    flex: 1,
  },
  head: {
    marginBottom: spacing.md,
    marginTop: spacing.xs,
  },
  eyebrow: {
    color: colors.primary,
    fontFamily: type.bodySemi.fontFamily,
    fontSize: 12,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  title: {
    color: colors.ink,
    fontFamily: fonts.heading,
    fontSize: 26,
    lineHeight: 32,
  },
  sub: {
    color: colors.slate,
    fontFamily: type.small.fontFamily,
    fontSize: 12,
    marginTop: 2,
  },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 7,
    marginBottom: spacing.md,
  },
  chip: {
    backgroundColor: colors.surface,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.line,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  chipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipText: {
    color: colors.inkSoft,
    fontFamily: type.bodySemi.fontFamily,
    fontSize: 12,
  },
  chipTextActive: {
    color: '#ffffff',
  },
  gap: {
    marginBottom: spacing.sm,
  },
  emptyWrap: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
  },
  emptyText: {
    color: colors.slate,
    marginTop: spacing.sm,
  },
  briefCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    marginBottom: spacing.sm,
    padding: spacing.md,
    ...shadows.card,
  },
  briefHeader: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  briefIcon: {
    fontSize: 18,
    marginRight: spacing.sm,
  },
  briefTitle: {
    color: colors.ink,
    fontFamily: type.bodySemi.fontFamily,
    fontSize: 15,
  },
  briefPoint: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    marginTop: spacing.sm,
  },
  briefBullet: {
    backgroundColor: colors.primary,
    borderRadius: 4,
    height: 6,
    marginRight: spacing.sm,
    marginTop: 7,
    width: 6,
  },
  briefText: {
    color: colors.inkSoft,
    flex: 1,
    fontFamily: type.body.fontFamily,
    fontSize: 13.5,
    lineHeight: 20,
  },
  modalRoot: {
    backgroundColor: colors.scrim,
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalCard: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    maxHeight: '84%',
    padding: spacing.lg,
  },
  modalHead: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  badge: {
    borderRadius: radius.pill,
    marginLeft: spacing.sm,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  badgeText: {
    fontFamily: type.bodySemi.fontFamily,
    fontSize: 11,
  },
  modalClose: {
    alignItems: 'center',
    backgroundColor: colors.surfaceAlt,
    borderRadius: 18,
    height: 36,
    justifyContent: 'center',
    marginLeft: 'auto',
    width: 36,
  },
  modalCloseText: {
    color: colors.ink,
    fontSize: 15,
  },
  modalTitle: {
    color: colors.ink,
    fontFamily: fonts.heading,
    fontSize: 20,
    lineHeight: 28,
    marginTop: spacing.md,
  },
  modalDate: {
    color: colors.slate,
    fontFamily: type.small.fontFamily,
    fontSize: 12,
    marginTop: 4,
  },
  modalBlockLabel: {
    color: colors.primaryStrong,
    fontFamily: type.bodySemi.fontFamily,
    fontSize: 13,
    marginTop: spacing.md,
  },
  modalBody: {
    color: colors.inkSoft,
    fontFamily: type.body.fontFamily,
    fontSize: 14,
    lineHeight: 22,
    marginTop: 4,
  },
  modalMatter: {
    backgroundColor: colors.primaryMist,
    borderRadius: radius.md,
    marginTop: spacing.md,
    padding: spacing.sm,
  },
  modalMatterLabel: {
    color: colors.primaryStrong,
    fontFamily: type.bodySemi.fontFamily,
    fontSize: 13,
  },
  modalTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: spacing.md,
  },
  modalTagPill: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: radius.pill,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  modalTagText: {
    color: colors.slate,
    fontSize: 11,
  },
  modalBtn: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: radius.pill,
    marginTop: spacing.lg,
    paddingVertical: 14,
  },
  modalBtnText: {
    color: '#ffffff',
    fontFamily: type.bodySemi.fontFamily,
    fontSize: 15,
  },
});