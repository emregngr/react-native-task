import React from 'react';
import {
  Text,
  StyleSheet,
  ScrollView,
  View,
  Alert,
  ImageBackground,
  Pressable,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {type RootState} from '../../../redux/app/store';
import {useSelector, useDispatch} from 'react-redux';
import {logout} from '../../../redux/features/auth/authSlice';
import {TextInput} from 'react-native-paper';
import {theme} from '../../../utils/theme';
import {responsive} from '../../../utils/responsive';
import {navigate} from '../../../utils/navigation';
import {Login} from '../../../components';

const Rectangle = require('../../../assets/rectangle.png');

export const Profile: React.FC = () => {
  const authState = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const {firstName, lastName, gender, tc, dateOfBirth, phone} = authState?.user;

  const onLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      navigate('AuthNavigator', {screen: 'LoginScreen'});
    } catch (error) {
      Alert.alert('UYARI', 'Çıkış Yapılamadı.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Profil</Text>
      </View>
      {tc ? (
        <>
          <ImageBackground source={Rectangle} style={styles.header}>
            <View style={styles.nameContainer}>
              <Text style={styles.shortName}>
                {firstName?.split('')[0]}
                {lastName?.split('')[0]}
              </Text>
            </View>
            <Text style={styles.name}>
              {firstName} {lastName}
            </Text>
          </ImageBackground>
          <ScrollView
            style={styles.scroll}
            showsVerticalScrollIndicator={false}
            bounces={false}>
            <TextInput
              mode="outlined"
              returnKeyType="done"
              label={'Ad'}
              style={styles.input}
              value={firstName}
              editable={false}
            />
            <TextInput
              mode="outlined"
              returnKeyType="done"
              label={'Soyad'}
              style={styles.input}
              value={lastName}
              editable={false}
            />
            <View style={styles.inputContainer}>
              <TextInput
                mode="outlined"
                returnKeyType="done"
                label={'Cinsiyet'}
                style={styles.smallInput}
                value={gender === 0 ? 'Kadın' : 'Erkek'}
                editable={false}
              />
              <TextInput
                mode="outlined"
                returnKeyType="done"
                label={'Doğum Tarihi'}
                style={styles.smallInput}
                value={dateOfBirth}
                editable={false}
              />
            </View>
            <TextInput
              mode="outlined"
              returnKeyType="done"
              keyboardType="number-pad"
              label={'Telefon Numarası'}
              style={styles.input}
              value={phone}
              editable={false}
            />
            <Pressable
              hitSlop={{
                top: responsive.number(20),
                bottom: responsive.number(20),
                left: responsive.number(20),
                right: responsive.number(20),
              }}
              onPress={onLogout}>
              <Text style={styles.logout}>Çıkış Yap</Text>
            </Pressable>
          </ScrollView>
        </>
      ) : (
        <Login
          text={
            'Profil bilgilerini görebilmek için giriş yapmanız gerekmektedir.'
          }
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  titleContainer: {
    alignItems: 'center',
    zIndex: 1,
  },
  title: {
    color: theme.colors.black,
    fontWeight: '600',
    fontSize: responsive.number(14),
    lineHeight: responsive.number(19),
    position: 'absolute',
    top: responsive.number(24),
  },
  header: {
    width: responsive.deviceWidth,
    height: responsive.number(260),
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameContainer: {
    width: responsive.number(80),
    height: responsive.number(80),
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: responsive.number(40),
  },
  shortName: {
    color: theme.colors.black,
    fontWeight: '700',
    fontSize: responsive.number(28),
    lineHeight: responsive.number(34),
  },
  name: {
    color: theme.colors.black,
    fontWeight: '600',
    fontSize: responsive.number(16),
    lineHeight: responsive.number(24),
    marginTop: responsive.number(16),
  },
  scroll: {
    paddingHorizontal: responsive.number(24),
  },
  input: {
    width: '100%',
    color: theme.colors.black,
    backgroundColor: theme.colors.white,
    marginVertical: responsive.number(10),
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: responsive.number(10),
  },
  smallInput: {
    width: '45%',
    color: theme.colors.black,
    backgroundColor: theme.colors.white,
  },
  logout: {
    textAlign: 'center',
    color: theme.colors.primary,
    fontWeight: '600',
    fontSize: responsive.number(14),
    lineHeight: responsive.number(17),
    textDecorationLine: 'underline',
    marginTop: responsive.number(10),
  },
});
