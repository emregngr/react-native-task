import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Tab} from '../../components';
import {Home} from '../../containers/main/Home';
import {Categories} from '../../containers/main/Categories';
import {Favorites} from '../../containers/main/Favorites';
import {Profile} from '../../containers/main/Profile';

export type MainTabNavigatorParamList = {
  Home: undefined;
  Categories: undefined;
  Favorites: undefined;
  Profile: undefined;
};

const MainTab = createBottomTabNavigator<MainTabNavigatorParamList>();

export const MainNavigator = () => {
  return (
    <MainTab.Navigator
      screenOptions={{headerShown: false}}
      tabBar={props => <Tab {...props} />}>
      <MainTab.Screen name="Home" component={Home} />
      <MainTab.Screen name="Categories" component={Categories} />
      <MainTab.Screen name="Favorites" component={Favorites} />
      <MainTab.Screen name="Profile" component={Profile} />
    </MainTab.Navigator>
  );
};
