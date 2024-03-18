import React from 'react';
import {Image, Text, TouchableOpacity, StyleSheet, View} from 'react-native';
import {IProduct} from '../../redux/features/products/productsSlice';
import {responsive} from '../../utils/responsive';
import {theme} from '../../utils/theme';

export const Product = ({item}: {item: IProduct}) => {
  return (
    <TouchableOpacity
      key={item?.id}
      activeOpacity={1}
      onPress={() => {}}
      style={styles.itemContainer}>
      <View style={styles.itemLeftContainer}>
        <Image source={{uri: item?.image}} style={styles.itemImage} />
        <View style={styles.itemInsideContainer}>
          <Text style={styles.itemName} numberOfLines={1}>
            {item?.name}
          </Text>
          <Text style={styles.itemCategory} numberOfLines={1}>
            {item?.category?.name}
          </Text>
        </View>
      </View>
      <Text style={styles.itemPrice}>{item?.price} ₺</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: responsive.number(5),
    backgroundColor: theme.colors.white,
    borderRadius: responsive.number(8),
    paddingVertical: responsive.number(16),
    paddingHorizontal: responsive.number(8),
  },
  itemLeftContainer: {
    flexDirection: 'row',
  },
  itemInsideContainer: {
    marginLeft: responsive.number(16),
    width: '55%',
  },
  itemImage: {
    width: responsive.number(48),
    height: responsive.number(48),
  },
  itemName: {
    color: theme.colors.black,
    fontWeight: '600',
    fontSize: responsive.number(16),
    lineHeight: responsive.number(20),
  },
  itemCategory: {
    color: theme.colors.gray,
    fontSize: responsive.number(14),
    lineHeight: responsive.number(17),
    marginTop: responsive.number(5),
  },
  itemPrice: {
    color: theme.colors.black,
    fontWeight: '600',
    fontSize: responsive.number(18),
    lineHeight: responsive.number(28),
  },
});
