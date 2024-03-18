import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {LoginScreen} from '../../containers/auth/LoginScreen';
import {VerifyScreen} from '../../containers/auth/VerifyScreen';

export type AuthStackNavigatorParamList = {
  LoginScreen: undefined;
  VerifyScreen: undefined;
};

const Stack = createNativeStackNavigator<AuthStackNavigatorParamList>();

export const AuthNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        presentation: 'card',
        headerShown: false,
      }}>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="VerifyScreen" component={VerifyScreen} />
    </Stack.Navigator>
  );
};
