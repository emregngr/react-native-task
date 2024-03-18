import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {responsive} from '../../utils/responsive';
import {theme} from '../../utils/theme';
import {Button} from '../index';
import {navigate} from '../../utils/navigation';

export const Login = ({text}: {text: string}) => {
  const onLogin = () => {
    navigate('AuthNavigator', {screen: 'LoginScreen'});
  };

  return (
    <View style={styles.loginContainer}>
      <View style={styles.insideContainer}>
        <Text style={styles.loginText}>{text}</Text>
      </View>
      <View style={styles.insideContainer}>
        <Button label="Giriş Yap" onPress={onLogin} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    paddingHorizontal: responsive.number(24),
  },
  insideContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  loginText: {
    color: theme.colors.black,
    fontWeight: '600',
    fontSize: responsive.number(16),
    lineHeight: responsive.number(24),
    textAlign: 'center',
  },
});
