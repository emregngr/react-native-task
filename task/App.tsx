import React from 'react';
import {StatusBar} from 'react-native';
import {AppNavigator} from './src/navigation/AppNavigator';
import {Provider} from 'react-redux';
import {store} from './src/redux/app/store';
import {PaperProvider} from 'react-native-paper';
import {theme} from './src/utils/theme';

export const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <StatusBar
          barStyle="dark-content"
          translucent
          backgroundColor="transparent"
        />
        <AppNavigator />
      </PaperProvider>
    </Provider>
  );
};
