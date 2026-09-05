import React from 'react';
import {
  RefreshControl,
  ScrollView,
  ScrollViewProps,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing } from '../theme';

interface ScreenProps extends ScrollViewProps {
  children: React.ReactNode;
  fullBleed?: boolean;
  bg?: string;
  contentStyle?: ViewStyle;
  refreshing?: boolean;
  onRefresh?: () => void;
}

export const Screen: React.FC<ScreenProps> = ({
  children,
  fullBleed,
  bg = colors.background,
  contentStyle,
  refreshing,
  onRefresh,
  ...rest
}) => {
  const insets = useSafeAreaInsets();
  return (
    <ScrollView
      {...rest}
      style={[{ backgroundColor: bg, flex: 1 }, rest.style]}
      contentContainerStyle={[
        styles.content,
        fullBleed && { paddingHorizontal: 0 },
        { paddingBottom: Math.max(insets.bottom + spacing.lg, spacing.xxl) },
        contentStyle,
      ]}
      showsVerticalScrollIndicator={false}
      refreshControl={
        onRefresh ? (
          <RefreshControl refreshing={Boolean(refreshing)} onRefresh={onRefresh} tintColor={colors.primary} />
        ) : undefined
      }
    >
      {children}
      <View style={{ height: spacing.xxl }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: spacing.md,
    paddingTop: 8,
  },
});