import React from 'react';
import {
  TouchableOpacity,
  Text,
  ViewStyle,
  StyleProp,
  TextStyle,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {responsive} from '../../utils/responsive';
import {theme} from '../../utils/theme';

export interface ButtonProps {
  containerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  label: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
}

export const Button = ({
  containerStyle,
  labelStyle,
  label,
  onPress,
  loading,
  disabled,
}: ButtonProps) => {
  return (
    <TouchableOpacity
      disabled={disabled || loading}
      onPress={onPress}
      activeOpacity={0.5}
      style={[
        styles.button,
        containerStyle,
        {
          backgroundColor: disabled
            ? theme.colors.buttonDisabled
            : theme.colors.primary,
        },
      ]}>
      {loading ? (
        <ActivityIndicator color={theme.colors.white} size={'large'} />
      ) : (
        <Text style={[styles.label, labelStyle]}>{label}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: responsive.number(56),
    borderRadius: responsive.number(8),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  label: {
    color: theme.colors.white,
    fontWeight: '600',
    fontSize: responsive.number(16),
    lineHeight: responsive.number(20),
  },
});
