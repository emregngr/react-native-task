import React from 'react';
import {
  Platform,
  StyleSheet,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  View,
  Text,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {responsive} from '../../utils/responsive';
import {theme} from '../../utils/theme';
import HomeActiveIcon from '../../assets/icons/tab/home-active.svg';
import HomeInActiveIcon from '../../assets/icons/tab/home-inactive.svg';
import CategoriesActiveIcon from '../../assets/icons/tab/categories-active.svg';
import CategoriesInActiveIcon from '../../assets/icons/tab/categories-inactive.svg';
import FavoritesActiveIcon from '../../assets/icons/tab/favorites-active.svg';
import FavoritesInActiveIcon from '../../assets/icons/tab/favorites-inactive.svg';
import ProfileActiveIcon from '../../assets/icons/tab/profile-active.svg';
import ProfileInActiveIcon from '../../assets/icons/tab/profile-inactive.svg';
import {navigate} from '../../utils/navigation';

const Touchable =
  Platform.OS === 'android'
    ? TouchableNativeFeedback
    : TouchableWithoutFeedback;

export type TabProps = {
  state: {
    index: number;
  };
};

export type TabButtonProps = {
  icon: JSX.Element;
  text: string;
  active: boolean;
  onPress: () => void;
};

export const Tab: React.FC<TabProps> = ({state}) => {
  const {index: currentIndex = 0} = state || {};

  const handlePress = (route: any) => {
    navigate(route);
  };

  return (
    <View style={[styles.container]}>
      <TabButton
        onPress={() => handlePress('Home')}
        text={'Ana sayfa'}
        icon={currentIndex === 0 ? <HomeActiveIcon /> : <HomeInActiveIcon />}
        active={currentIndex === 0}
      />
      <TabButton
        onPress={() => handlePress('Categories')}
        text={'Kategoriler'}
        icon={
          currentIndex === 1 ? (
            <CategoriesActiveIcon />
          ) : (
            <CategoriesInActiveIcon />
          )
        }
        active={currentIndex === 1}
      />
      <TabButton
        onPress={() => handlePress('Favorites')}
        text={'Favoriler'}
        icon={
          currentIndex === 2 ? (
            <FavoritesActiveIcon />
          ) : (
            <FavoritesInActiveIcon />
          )
        }
        active={currentIndex === 2}
      />
      <TabButton
        onPress={() => handlePress('Profile')}
        text={'Profil'}
        icon={
          currentIndex === 3 ? <ProfileActiveIcon /> : <ProfileInActiveIcon />
        }
        active={currentIndex === 3}
      />
    </View>
  );
};

const TabButton: React.FC<TabButtonProps> = ({icon, text, active, onPress}) => {
  const {bottom} = useSafeAreaInsets();
  const containerStyle = {
    paddingBottom: bottom === 0 ? responsive.number(10) : bottom,
  };

  return (
    <Touchable
      onPress={onPress}
      background={TouchableNativeFeedback.Ripple(theme.colors.primary, false)}>
      <View style={[styles.buttonContainer, containerStyle]}>
        <View>{icon}</View>
        <Text style={styles.tabText}>{active ? text : null}</Text>
      </View>
    </Touchable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: responsive.number(80),
    backgroundColor: theme.colors.white,
    borderTopLeftRadius: responsive.number(20),
    borderTopRightRadius: responsive.number(20),
    flexDirection: 'row',
    justifyContent: 'space-around',
    shadowColor: theme.colors.black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: responsive.number(15),
  },
  tabText: {
    marginTop: responsive.number(5),
    color: theme.colors.primary,
    fontWeight: '700',
    fontSize: responsive.number(10),
    lineHeight: responsive.number(12),
  },
});
