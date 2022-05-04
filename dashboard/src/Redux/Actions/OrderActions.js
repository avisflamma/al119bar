import {
    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_LIST_FAIL
} from "../Constants/OrderConstants";
import { USER_LOGOUT } from "../Constants/UserContants";
import axios from "axios";


// ALL ADMIN PRODUCTS
export const listOrders = () => async (dispatch, getState) => {
    try {
      dispatch({ type: ORDER_LIST_REQUEST });
  
      const {
        userLogin : { userInfo },
      }= getState();
  
      const config = {
        headers: {
          Authorization:`Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.get(`/api/orders/all`, config);
  
      dispatch({ type: ORDER_LIST_SUCCESS, payload: data });
  
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(USER_LOGOUT());
      }
      dispatch({
        type: ORDER_LIST_FAIL,
        payload: message,
      });
    }
  };