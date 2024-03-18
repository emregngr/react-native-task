import React, {useEffect} from 'react';
import {
  FlatList,
  Text,
  StyleSheet,
  View,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {type RootState} from '../../../redux/app/store';
import {useSelector, useDispatch} from 'react-redux';
import {
  IProduct,
  getProducts,
} from '../../../redux/features/products/productsSlice';
import {responsive} from '../../../utils/responsive';
import {theme} from '../../../utils/theme';
import {Product, Login} from '../../../components';

export const Home: React.FC = () => {
  const authState = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const {tc} = authState?.user;

  const productsState = useSelector((state: RootState) => state.products);

  const {current, next, total, totalPage} = productsState?.productsData;

  const {productsLoading} = productsState;

  useEffect(() => {
    const bringProductss = async () => {
      if (tc) {
        await dispatch(getProducts(1)).unwrap();
      }
    };
    bringProductss();
  }, [tc]);

  const listHeaderComponent = () => {
    return (
      <View style={styles.productsContainer}>
        <Text style={styles.productsTitle}>Ürünler: </Text>
        <Text style={styles.productsTotal}>(Toplam {total} Adet)</Text>
      </View>
    );
  };

  const renderItem = ({item}: {item: IProduct}) => {
    return <Product item={item} />;
  };

  const getNextProducts = async () => {
    await dispatch(getProducts(next)).unwrap();
  };

  const listFooterComponent = () => {
    return (
      <>
        {productsLoading ? (
          <ActivityIndicator color={theme.colors.primary} size="large" />
        ) : (
          <Pressable
            hitSlop={{
              top: responsive.number(20),
              bottom: responsive.number(20),
              left: responsive.number(20),
              right: responsive.number(20),
            }}
            onPress={getNextProducts}>
            <Text style={styles.loadMore}>Daha Fazla Yükle</Text>
          </Pressable>
        )}
      </>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Ana sayfa</Text>
      {tc ? (
        <>
          <FlatList
            data={productsState?.products}
            keyExtractor={item => item?.id?.toString()}
            renderItem={renderItem}
            style={styles.flatList}
            contentContainerStyle={styles.contentContainerStyle}
            showsVerticalScrollIndicator={false}
            initialNumToRender={10}
            ListHeaderComponent={listHeaderComponent}
            ListFooterComponent={
              current < totalPage ? listFooterComponent : null
            }
          />
        </>
      ) : (
        <Login
          text={'Ürünleri görebilmek için giriş yapmanız gerekmektedir.'}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  title: {
    color: theme.colors.black,
    fontWeight: '600',
    fontSize: responsive.number(14),
    lineHeight: responsive.number(19),
    textAlign: 'center',
    marginTop: responsive.number(24),
  },
  flatList: {
    paddingHorizontal: responsive.number(24),
  },
  contentContainerStyle: {
    paddingTop: responsive.number(24),
    paddingBottom: responsive.number(48),
  },
  productsContainer: {
    flexDirection: 'row',
    marginBottom: responsive.number(10),
  },
  productsTitle: {
    color: theme.colors.black,
    fontWeight: '600',
    fontSize: responsive.number(18),
    lineHeight: responsive.number(22),
  },
  productsTotal: {
    color: theme.colors.gray,
    fontWeight: '600',
    fontSize: responsive.number(18),
    lineHeight: responsive.number(22),
  },
  loadMore: {
    textAlign: 'center',
    color: theme.colors.primary,
    fontWeight: '600',
    fontSize: responsive.number(14),
    lineHeight: responsive.number(17),
    textDecorationLine: 'underline',
    marginTop: responsive.number(10),
  },
});
