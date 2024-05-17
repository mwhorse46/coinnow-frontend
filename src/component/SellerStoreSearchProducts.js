import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  Image,
  Pressable,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Fonts from '@helpers/Fonts';
import { GlobalStyles, Colors } from '@helpers';
import { coinImage } from '@common';

import { TouchableOpacity } from 'react-native-gesture-handler';
import { ASSETS_DIR, CURRENCY } from '@env';
import FastImage from 'react-native-fast-image';
import {
  numberWithComma,
  logfunction,
  calculateOffPercentage,
} from '@helpers/FunctionHelper';
import moment from 'moment';
import { Button } from 'native-base';
import { ConfirmDialog } from 'react-native-simple-dialogs';

function SellerStoreSearchProducts(props) {
  const [buying, setBuying] = useState(false);
  const [showConfirm, setUserConfirm] = useState(false);

  let item = props.product || {};

  let special = 0;

  const onPressBuy = async () => {
    setUserConfirm(false);
    if (buying) return;
    setBuying(true);
    if (props.onPressBuy) {
      await props.onPressBuy(item);
    }
    setBuying(false);
  };

  return (
    <Pressable
      style={styles.cartContent}
      key={item.id}
      onLongPress={() => {
        props.onLongPress && props.onLongPress(item);
      }}>
      <View
        style={[
          styles.cartBox,
          props.isMine && {
            backgroundColor: '#0F001B',
          },
          item.sale == '0' && {
            backgroundColor: '#363636',
          },
          item?.product?.image_profit != null && {
            backgroundColor: 'black',
          },
        ]}>
        <View style={styles.imageView}>
          <FastImage
            style={styles.image}
            source={{
              uri: item?.product?.image
                ? 'https://my.inventory.marketmajesty.net/uploads/product/' +
                  item?.product.image
                : 'https://my.inventory.marketmajesty.net/uploads/assets/img/default.png',
              priority: FastImage.priority.high,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
        </View>
        <View style={styles.infromationView}>
          <View style={{ alignItems: 'center', flexDirection: 'row' }}>
            <TouchableOpacity>
              <Text style={styles.name}>
                {item?.product?.product_description?.name}
              </Text>
            </TouchableOpacity>
            <Text
              style={{
                color: Colors.white,
                fontWeight: '700',
                marginLeft: 12,
                fontSize: wp('4.8%'),
              }}>
              X{item.quantity}
            </Text>
          </View>

          {/* {!!off && <Text style={styles.offerTxt}>{off} </Text>}
          <View
            style={{
              flexDirection: 'row',
            }}>
            <Text>merchant power</Text>
            <Text style={{ color: 'red' }}>{` (${power})`}</Text>
          </View> */}
        </View>
        <View
          style={{
            alignItems: 'flex-end',
            paddingRight: 20,
          }}>
          {special > 0 ? (
            <View style={styles.SpcialView}>
              <View style={GlobalStyles.coinWrapper}>
                <Image source={coinImage} style={GlobalStyles.coinImage} />
                <Text style={styles.price}>
                  {numberWithComma(special * item.quantity)}{' '}
                </Text>
              </View>

              <Text style={styles.originalPrice}>
                {numberWithComma(item?.product?.price * item.quantity)}
              </Text>
            </View>
          ) : (
            <View style={GlobalStyles.coinWrapper}>
              <Image source={coinImage} style={GlobalStyles.coinImage} />
              <Text style={[styles.price]}>
                {numberWithComma(item?.product?.price * item.quantity)}
              </Text>
            </View>
          )}
        </View>
      </View>
      <ConfirmDialog
        title="Buy"
        message="Are you sure to buy?"
        onTouchOutside={() => setUserConfirm(false)}
        visible={showConfirm}
        negativeButton={{
          title: 'NO',
          onPress: () => setUserConfirm(false),
          // disabled: true,
          titleStyle: {
            color: 'red',
            colorDisabled: 'aqua',
          },
          style: {
            backgroundColor: 'transparent',
            backgroundColorDisabled: 'transparent',
          },
        }}
        positiveButton={{
          title: 'YES',
          onPress: onPressBuy,
          titleStyle: {
            // color: "red",
            colorDisabled: 'aqua',
          },
        }}
      />
    </Pressable>
  );
}

export default SellerStoreSearchProducts;
const styles = StyleSheet.create({
  cartContent: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: Colors.white,
    justifyContent: 'center',
    elevation: 6,
    marginBottom: wp('3%'),
    borderRadius: wp('10%'),
    marginLeft: wp('1%'),
  },
  cartBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: hp('12%'),
    width: wp('100%'),
    flex: 1,
    backgroundColor: '#000B42',
    borderRadius: 15,
  },
  imageView: {
    backgroundColor: Colors.light_white,
    //height: hp('11%'),
    height: '100%',
    borderRadius: 15,
  },
  image: {
    resizeMode: 'cover',
    alignSelf: 'center',
    height: '100%',
    aspectRatio: 1,
    width: wp('21.5%'),
    borderRadius: 15,
  },
  infromationView: {
    flex: 1,
    marginLeft: wp('5%'),
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  name: {
    textAlign: 'center',
    color: Colors.white,
    fontSize: wp('4.8%'),
    fontFamily: Fonts.Font_Bold,
  },
  // price: {
  //     textAlign: 'center',
  //     color: Colors.link_color,
  //     lineHeight: hp('4%'),
  //     fontSize: wp('5%'),
  //     fontFamily: Fonts.Font_Bold,
  // },
  plusminus: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    flexDirection: 'row',
    marginTop: hp('1%'),
  },
  plusminusTxt: {
    fontSize: wp('3%'),
    color: Colors.secondry_text_color,
    textAlign: 'center',
  },
  quantityTxt: {
    fontSize: wp('4%'),
    color: Colors.text_color,
    marginHorizontal: wp('1%'),
    fontFamily: Fonts.Font_Bold,
    top: hp('0.2%'),
    textAlign: 'center',
  },
  deleteIcon: {
    flex: 0.1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginRight: wp('2%'),
  },
  delete: {
    fontSize: wp('3.6%'),
    color: Colors.secondry_text_color,
  },
  priceView: {
    flex: 1,
    marginTop: hp('0.6%'),
    flexDirection: 'row',
  },
  price: {
    fontFamily: Fonts.Font_Bold,
    fontSize: wp('4%'),
    color: Colors.white,
  },
  originalPrice: {
    color: Colors.secondry_text_color,
    fontFamily: Fonts.Font_Bold,
    fontSize: wp('2.5%'),
    textDecorationLine: 'line-through',
  },
  offerTxt: {
    textAlign: 'center',
    color: Colors.link_color,
    fontFamily: Fonts.Font_Semibold,
    fontSize: wp('2.2%'),
    textTransform: 'uppercase',
    borderRadius: 5,
  },
  SpcialView: {
    flexDirection: 'row',
  },
});
