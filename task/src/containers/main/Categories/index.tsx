import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {theme} from '../../../utils/theme';

export const Categories: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Kategoriler</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
});
