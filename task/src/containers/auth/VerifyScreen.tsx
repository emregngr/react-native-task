import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {Button} from '../../components';
import {SafeAreaView} from 'react-native-safe-area-context';
import {type RootState} from '../../redux/app/store';
import {useSelector, useDispatch} from 'react-redux';
import {verify} from '../../redux/features/auth/authSlice';
import {TextInput} from 'react-native-paper';
import {theme} from '../../utils/theme';
import {responsive} from '../../utils/responsive';
import Back from '../../assets/icons/back.svg';

export const VerifyScreen: React.FC = ({navigation, route}: any) => {
  const {tcValue} = route?.params;

  const [tc, setTc] = useState<string>(tcValue);
  const [code, setCode] = useState<string>('');

  const authState = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const onChangeTcText = (text: string) => {
    setTc(text);
  };

  const onChangeCodeText = (text: string) => {
    setCode(text);
  };

  const onVerify = async () => {
    try {
      await dispatch(verify(code)).unwrap();
      navigation.navigate('MainNavigator', {screen: 'Profile'});
    } catch (error) {
      Alert.alert(
        'UYARI',
        'T.C. Kimlik Numarası ya da Doğrulama Kodu Hatalı Girildi.',
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.back} onPress={() => navigation.pop()}>
          <Back />
        </TouchableOpacity>
      </View>
      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        bounces={false}>
        <Text style={styles.title}>Kimlik doğrulama</Text>
        <Text style={styles.text}>
          Lütfen telefonunuza gelen doğrulama kodunu giriniz.
        </Text>
        <TextInput
          mode="outlined"
          returnKeyType="done"
          maxLength={11}
          keyboardType="number-pad"
          label={'TCKN'}
          style={styles.input}
          value={tc}
          onChangeText={t => onChangeTcText(t)}
          editable={false}
        />
        <TextInput
          mode="outlined"
          returnKeyType="done"
          maxLength={6}
          keyboardType="number-pad"
          label={'Doğrulama Kodu'}
          style={styles.input}
          onChangeText={t => onChangeCodeText(t)}
        />
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button
          disabled={tc?.length !== 11 || code?.length !== 6}
          loading={authState?.verifyLoading}
          label="Devam Et"
          onPress={onVerify}
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
  header: {
    height: responsive.number(72),
  },
  back: {
    position: 'absolute',
    top: responsive.number(24),
    left: responsive.number(24),
  },
  scroll: {
    paddingHorizontal: responsive.number(24),
  },
  title: {
    color: theme.colors.black,
    fontWeight: '600',
    fontSize: responsive.number(32),
    lineHeight: responsive.number(39),
    marginBottom: responsive.number(20),
  },
  text: {
    color: theme.colors.black,
    fontSize: responsive.number(14),
    lineHeight: responsive.number(21),
    marginBottom: responsive.number(10),
  },
  input: {
    width: '100%',
    color: theme.colors.black,
    backgroundColor: theme.colors.white,
    marginVertical: responsive.number(10),
  },
  buttonContainer: {
    margin: responsive.number(24),
  },
});
