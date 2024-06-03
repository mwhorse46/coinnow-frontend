import React, { useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  OtrixContainer,
  OtrixContent,
  OtrixDivider,
  HomeCategoryView,
  NewProduct,
} from '@component';
import { HomeSkeleton } from '@skeleton';
import { addToWishList } from '@actions';
import { bindActionCreators } from 'redux';
import { _roundDimensions } from '@helpers/util';
import { _addToWishlist, logfunction } from '@helpers/FunctionHelper';
import getApi from '@apis/getApi';
import { SliderBox } from 'react-native-image-slider-box';
import { useFocusEffect } from '@react-navigation/native';
import { LiveUpdate, OtrixLoader } from '../component';
import { setNewProducts } from '../redux/Action/general';
const homeCategories = require('../../categoryStore');
function SupplierPage(props) {
  const { newProducts } = props;
  const [images, setImages] = React.useState([]);

  const addToWish = async id => {
    let wishlistData = await _addToWishlist(id);
    props.addToWishList(wishlistData, id);
  };
  const fetchData = () => {
    getApi
      .getData('getNewProductsV1')
      .then(async response => {
        if (response.status === 1) {
          props.setNewProducts(response.productsList);
        }
      })
      .catch(() => {});
  };
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    getApi.getData('getBannerImages').then(response => {
      const imgs = response.images.map(image => {
        return 'https://my.inventory.marketmajesty.net/uploads/banner/' + image;
      });
      setImages(imgs);
    });
  }, []);

  const { wishlistData } = props;
  return (
    <OtrixContainer customStyles={{ backgroundColor: '#0A0A0A' }}>
      <OtrixContent>
        <SliderBox
          images={images}
          ImageComponentStyle={{
            borderRadius: 10,
            width: '90%',
            marginTop: 15,
            marginRight: 30,
          }}
          sliderBoxHeight={150}
          resizeMethod={'resize'}
          resizeMode={'cover'}
          autoplay
          circleLoop
          dotStyle={{
            width: 0,
          }}
        />

        <HomeCategoryView navigation={props.navigation} data={homeCategories} />
        <LiveUpdate />

        <NewProduct
          navigation={props.navigation}
          wishlistArr={wishlistData}
          data={newProducts?.length > 0 ? newProducts : []}
          arr={newProducts}
          addToWishlist={addToWish}
          userAuth={props.USER_AUTH}
          customerData={props.customerData}
        />

        {/* {loading1 && <OtrixLoader />} */}
      </OtrixContent>
    </OtrixContainer>
  );
}

function mapStateToProps(state) {
  return {
    USER_AUTH: state.auth.USER_AUTH,
    wishlistData: state.wishlist.wishlistData,
    wishlistCount: state.wishlist.wishlistCount,
    customerData: state.auth.USER_DATA,
    newProducts: state.cart.newProducts,
  };
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      addToWishList,
      setNewProducts,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(SupplierPage);
