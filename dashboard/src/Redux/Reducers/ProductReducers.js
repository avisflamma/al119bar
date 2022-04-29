import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_DELETE_REQUEST
} from "../Constants/ProductConstants";
  
 
// ALL PRODUCTS
export const productListReducer = (state = {products : []}, action) => {
    switch (action.type) {
      case PRODUCT_LIST_REQUEST:
        return { loading: true, products: []};
      case PRODUCT_LIST_SUCCESS:
        return { loading: false, products: action.payload };
      case PRODUCT_LIST_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
};

// DELETE ADMIN PRODUCT
export const productDelteReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return { loading: true};
    case PRODUCT_LIST_SUCCESS:
      return { loading: false, success: true };
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};