import { call, put, takeEvery } from 'redux-saga/effects';
import { types } from '@actions/actionTypes';
import {
  successInt,
  successCart,
  successCheckout,
  authStatus,
  authData,
  successWishlist,
  addRemoveWishlist,
} from '@actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logfunction, _getLocalCart } from '@helpers/FunctionHelper';
import * as RootNavigation from '../../AppNavigator';
import { requestInit } from '../Action/general';

export function* watchGeneralRequest() {
  // yield takeEvery(types.REQUEST_INIT, requestInit);
  yield takeEvery(types.ADD_TO_CART, addToCart);
  yield takeEvery(types.ADD_TO_WISHLIST, addToWishlist);
  yield takeEvery(types.REMOVE_CART, removeFromCart);
  yield takeEvery(types.INCREMENT_QUANTITY, incrementQuantity);
  yield takeEvery(types.DEREMENT_QUANTITY, decrementQuantity);
  yield takeEvery(types.PROCEED_CHECKOUT, proceedCheckout);
  yield takeEvery(types.DO_LOGIN, doLogin);
  yield takeEvery(types.DO_LOGOUT, doLogout);
}

// function* requestInit(action) {
//   try {
//     // ************** If you want to login based home page then do stuff here ****************

//     // if (action.payload.userAuth) {
//     //     yield put(successInt('HomeScreen'));
//     // }
//     // else {
//     //     yield put(successInt('LoginScreen'));
//     // }

//     // ************** Else here ****************

//     //AsyncStorage.removeItem('IS_AUTH');

//     //get local login data
//     let getAuth = yield call(AsyncStorage.getItem, 'IS_AUTH');
//     logfunction('IS LOGGED ', getAuth);

//     if (getAuth == 1) {
//       yield put(authStatus(true));
//       let getData = yield call(AsyncStorage.getItem, 'CUSTOMER_DATA');
//       yield put(authData(JSON.parse(getData)));

//       //cart count set
//       let getLocalCart = yield call(AsyncStorage.getItem, 'CART_DATA');
//       logfunction('LOCAL CART  ', JSON.parse(getLocalCart));
//       getLocalCart = JSON.parse(getLocalCart);
//       if (getLocalCart) {
//         yield put(successCart(getLocalCart));
//       }

//       //Wishlist count set
//       let getLocalWishlist = yield call(
//         AsyncStorage.getItem,
//         'GET_LOCAL_WISHLIST',
//       );
//       logfunction('LOCAL Wishlist  ', JSON.parse(getLocalWishlist));
//       getLocalWishlist = JSON.parse(getLocalWishlist);
//       if (getLocalWishlist) {
//         yield put(successWishlist(getLocalWishlist));
//       }
//     } else {
//       yield put(authStatus(false));
//     }

//     yield put(successInt('MainScreen'));
//   } catch (e) {
//     logfunction(e);
//   }
// }

function* addToCart(action) {
  try {
    const { payload } = action;
    logfunction('Payload ==', payload);
    let storeArr = { totalCount: payload.quantity };
    logfunction('FINAL ARRR ', storeArr);
    AsyncStorage.setItem('CART_DATA', JSON.stringify(storeArr));
    yield put(successCart(storeArr));
  } catch (e) {
    logfunction('ERROR =', e);
  }
}

function* removeFromCart(action) {
  try {
    const { payload } = action;
    let storeArr = { totalCount: payload.quantity };
    logfunction('ARR TO STORE ', storeArr);
    AsyncStorage.setItem('CART_DATA', JSON.stringify(storeArr));
    yield put(successCart(storeArr));
  } catch (e) {
    logfunction('ERROR =', e);
  }
}

function* incrementQuantity(action) {
  try {
    const { payload } = action;
    let storeArr = { totalCount: payload.quantity };
    logfunction('ARR TO STORE ', storeArr);
    AsyncStorage.setItem('CART_DATA', JSON.stringify(storeArr));
    yield put(successCart(storeArr));
  } catch (e) {
    logfunction('ERROR =', e);
  }
}

function* decrementQuantity(action) {
  try {
    const { payload } = action;
    let storeArr = { totalCount: payload.quantity };
    logfunction('ARR TO STORE ', storeArr);
    AsyncStorage.setItem('CART_DATA', JSON.stringify(storeArr));
    yield put(successCart(storeArr));
  } catch (e) {
    logfunction('ERROR =', e);
  }
}

function* proceedCheckout(action) {
  try {
    AsyncStorage.removeItem('CART_DATA');
    yield put(successCheckout());
  } catch (e) {
    logfunction('ERROR =', e);
  }
}

function* addToWishlist(action) {
  try {
    const { payload } = action;
    let wishData = payload.data;
    let ID = payload.id;
    yield put(addRemoveWishlist(ID));
    yield put(successWishlist(wishData));
  } catch (e) {
    logfunction('ERROR =', e);
  }
}

function* doLogin(action) {
  try {
    yield put(authStatus(true));
    console.log({ action });
    const {
      data: { status, cartCount, wishlistData, data = {} },
      navigateTo,
      mode,
    } = action.payload;
    const userData = {
      ...data,
      mode,
    };
    if (status) {
      yield put(authData(userData));
      yield call([AsyncStorage, 'setItem'], 'IS_AUTH', '1');
      yield call(
        [AsyncStorage, 'setItem'],
        'CUSTOMER_DATA',
        JSON.stringify(userData),
      );
      let storeArr = { totalCount: cartCount };
      logfunction('ARR TO data ', userData);
      yield call(
        [AsyncStorage, 'setItem'],
        'CART_DATA',
        JSON.stringify(storeArr),
      );
      yield put(successCart(storeArr));
      if (wishlistData.length > 0) {
        let wishData = wishlistData;
        yield call(
          [AsyncStorage, 'setItem'],
          'GET_LOCAL_WISHLIST',
          JSON.stringify(wishData),
        );
        yield put(successWishlist(wishData));
      }
      yield put(authStatus(true));
      // RootNavigation.navigate(navigateTo, {});
    } else {
      yield put(authStatus(false));
    }
    yield put(requestInit(false));
  } catch (e) {
    logfunction('ERROR =', e);
  }
}

function* doLogout(action) {
  try {
    let wishData = { totalCount: 0, wishlistData: [] };
    let storeArr = { totalCount: 0 };
    yield put(authStatus(false));
    yield put(successWishlist(wishData));
    yield put(successCart(storeArr));
    yield put(authData({}));
    RootNavigation.navigate('MainScreen');
    yield call([AsyncStorage, 'removeItem'], 'CUSTOMER_DATA');
    yield call([AsyncStorage, 'removeItem'], 'IS_AUTH');
    yield call([AsyncStorage, 'removeItem'], 'GET_LOCAL_WISHLIST');
    yield call([AsyncStorage, 'removeItem'], 'CART_DATA');
  } catch (e) {
    logfunction('ERROR =', e);
  }
}
