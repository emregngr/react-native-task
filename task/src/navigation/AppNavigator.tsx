import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {navigationRef} from '../utils/navigation';
import {AuthNavigator, AuthStackNavigatorParamList} from './AuthNavigator';
import {MainNavigator, MainTabNavigatorParamList} from './MainNavigator';
import {useDispatch} from 'react-redux';
import {getUser} from '../redux/features/auth/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CONSTANTS} from '../enums';

export type AppStackParamList = {
  AuthNavigator: AuthStackNavigatorParamList;
  MainNavigator: MainTabNavigatorParamList;
};

const Stack = createNativeStackNavigator<AppStackParamList>();

export const AppNavigator = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const boot = async () => {
      const token = await AsyncStorage.getItem(CONSTANTS.API_TOKEN);
      if (token) {
        await dispatch(getUser()).unwrap();
      }
    };
    boot();
  }, []);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator
          screenOptions={{
            presentation: 'containedTransparentModal',
            headerShown: false,
            animation: 'fade',
          }}>
          <Stack.Screen name="MainNavigator" component={MainNavigator} />
          <Stack.Screen name="AuthNavigator" component={AuthNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};
