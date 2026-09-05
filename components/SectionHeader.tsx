import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, radius, spacing, type } from '../theme';
import { Icon3D } from './Icon3D';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: string;
  accent?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  actionLabel,
  onAction,
  icon,
  accent = colors.primary,
}) => {
  return (
    <View style={styles.row}>
      {icon ? (
        <View style={[styles.iconWrap, { backgroundColor: accent + '14' }]}>
          <Icon3D emoji={icon} size={34} variant="flat" accent={accent} tint={accent + '14'} />
        </View>
      ) : null}
      <View style={styles.textWrap}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        {subtitle ? (
          <Text style={styles.subtitle} numberOfLines={1}>
            {subtitle}
          </Text>
        ) : null}
      </View>
      {actionLabel && onAction ? (
        <TouchableOpacity onPress={onAction} activeOpacity={0.7} style={styles.action}>
          <Text style={[styles.actionText, { color: accent }]}>{actionLabel}</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: spacing.md,
  },
  iconWrap: {
    borderRadius: radius.md,
    marginRight: spacing.sm,
    overflow: 'hidden',
  },
  textWrap: {
    flex: 1,
  },
  title: {
    ...type.h3,
    color: colors.ink,
  },
  subtitle: {
    ...type.small,
    color: colors.slate,
    marginTop: 2,
  },
  action: {
    paddingLeft: spacing.md,
  },
  actionText: {
    fontFamily: type.bodySemi.fontFamily,
    fontSize: 13,
  },
});