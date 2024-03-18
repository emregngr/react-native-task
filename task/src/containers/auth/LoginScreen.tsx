import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {Button} from '../../components';
import {SafeAreaView} from 'react-native-safe-area-context';
import {type RootState} from '../../redux/app/store';
import {useSelector, useDispatch} from 'react-redux';
import {login} from '../../redux/features/auth/authSlice';
import {TextInput} from 'react-native-paper';
import {theme} from '../../utils/theme';
import {responsive} from '../../utils/responsive';
import Close from '../../assets/icons/close.svg';

const Rectangle = require('../../assets/rectangle.png');
const Logo = require('../../assets/logo.png');

export const LoginScreen: React.FC = ({navigation}: any) => {
  const [tc, setTc] = useState<string>('');
  const authState = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const onChangeText = (text: string) => {
    setTc(text);
  };

  const onLogin = async () => {
    try {
      await dispatch(login(tc)).unwrap();
      navigation.navigate('VerifyScreen', {tcValue: tc});
    } catch (error) {
      Alert.alert('UYARI', 'T.C. Kimlik Numarası Hatalı Girildi.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={Rectangle} style={styles.logoContainer}>
        <TouchableOpacity style={styles.close} onPress={() => navigation.pop()}>
          <Close />
        </TouchableOpacity>
        <Image source={Logo} style={styles.logo} />
      </ImageBackground>
      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        bounces={false}>
        <TextInput
          mode="outlined"
          returnKeyType="done"
          maxLength={11}
          keyboardType="number-pad"
          label={'TCKN'}
          style={styles.input}
          onChangeText={t => onChangeText(t)}
        />
        <Text style={styles.text}>
          Uygulamaya giriş yapabilmek için T.C Kimlik numarınızı giriniz.
        </Text>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button
          disabled={tc?.length !== 11}
          loading={authState?.loginLoading}
          label="Giriş Yap"
          onPress={onLogin}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  logoContainer: {
    width: responsive.deviceWidth,
    height: responsive.number(260),
    justifyContent: 'center',
    alignItems: 'center',
  },
  close: {
    position: 'absolute',
    top: responsive.number(24),
    left: responsive.number(24),
  },
  logo: {
    width: responsive.number(110),
    height: responsive.number(110),
  },
  scroll: {
    paddingHorizontal: responsive.number(24),
  },
  input: {
    width: '100%',
    color: theme.colors.black,
    backgroundColor: theme.colors.white,
    marginVertical: responsive.number(20),
  },
  text: {
    color: theme.colors.black,
    fontSize: responsive.number(13),
    lineHeight: responsive.number(20),
  },
  buttonContainer: {
    margin: responsive.number(24),
  },
});
