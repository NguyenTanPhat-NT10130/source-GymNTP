import * as ActionTypes from './ActionTypes';
import axios from 'axios';
import moment from 'moment';

// monthly
export const fetchMonthly = () => (dispatch) => {
  dispatch(monthlyLoading());
  return fetch('https://8a79-2402-800-63b3-b1dc-e934-e8a4-dc11-7ee3.ngrok-free.app/api/get/monthly-subscriptions')
    .then((response) => {
      if (!response.ok) throw Error('Error ' + response.status + ': ' + response.statusText);
      else return response.json();
    })
    .then((monthly) => dispatch(addMonthly(monthly)))
    .catch((error) => dispatch(monthlyFailed(error.message)));
};
const monthlyLoading = () => ({
  type: ActionTypes.MONTHLY_LOADING
});
const monthlyFailed = (errmess) => ({
  type: ActionTypes.MONTHLY_FAILED,
  payload: errmess
});
const addMonthly = (monthly) => ({
  type: ActionTypes.ADD_MONTHLY,
  payload: monthly
});

// session
export const fetchSession = () => (dispatch) => {
  dispatch(sessionLoading());
  return fetch('https://8a79-2402-800-63b3-b1dc-e934-e8a4-dc11-7ee3.ngrok-free.app/api/get/session-subscriptions')
    .then((response) => {
      if (!response.ok) throw Error('Error ' + response.status + ': ' + response.statusText);
      else return response.json();
    })
    .then((session) => dispatch(addSession(session)))
    .catch((error) => dispatch(sessionFailed(error.message)));
};
const sessionLoading = () => ({
  type: ActionTypes.SESSION_LOADING
});
const sessionFailed = (errmess) => ({
  type: ActionTypes.SESSION_FAILED,
  payload: errmess
});
const addSession = (session) => ({
  type: ActionTypes.ADD_SESSION,
  payload: session
});
// trainer
export const fetchTrainer = () => (dispatch) => {
  dispatch(trainerLoading());
  return fetch('https://8a79-2402-800-63b3-b1dc-e934-e8a4-dc11-7ee3.ngrok-free.app/api/get/trainers')
    .then((response) => {
      if (!response.ok) throw Error('Error ' + response.status + ': ' + response.statusText);
      else return response.json();
    })
    .then((trainer) => dispatch(addTainer(trainer)))
    .catch((error) => dispatch(trainerFailed(error.message)));
};
const trainerLoading = () => ({
  type: ActionTypes.TRAINER_LOADING
});
const trainerFailed = (errmess) => ({
  type: ActionTypes.TRAINER_FAILED,
  payload: errmess
});
const addTainer = (trainer) => ({
  type: ActionTypes.ADD_TRAINER,
  payload: trainer
});
// cart
// export const addToCart = (item) => ({
//   type: ActionTypes.ADD_TO_CART,
//   payload: {
//     id: item.id,
//     name: item.name,
//     price: item.price,
//     type: item.type
//   }
// });
export const addToCart = (item) => async (dispatch, getState) => {
  const { customerId, cartItems } = getState().cart;
  
  if (!customerId) {
    return dispatch({
      type: ActionTypes.ADD_TO_CART_FAILURE,
      payload: 'Customer ID is missing'
    });
  }

  try {
    const response = await axios.get(`https://8a79-2402-800-63b3-b1dc-e934-e8a4-dc11-7ee3.ngrok-free.app/api/get/customerBills/${customerId}`);
    const bills = response.data;
    const now = moment();

    const isConflicting = bills.some(bill => {
      const startDate = moment(bill.StartDate);
      const endDate = moment(bill.EndDate);

      return startDate.isBefore(now) && endDate.isAfter(now) && bill.Type === item.type;
    });

    if (isConflicting) {
      return dispatch({
        type: ActionTypes.ADD_TO_CART_FAILURE,
        payload: `You already have an active ${item.type} package`
      });
    }
    const hasMonthly = cartItems.some(cartItem => cartItem.type === 'monthly');
    const hasSession = cartItems.some(cartItem => cartItem.type === 'session');

    if ((item.type === 'monthly' && hasSession) || (item.type === 'session' && hasMonthly)) {
      return dispatch({ type: ActionTypes.ADD_TO_CART_FAILURE, payload: 'Cannot add both monthly and session items to the cart' });
    }
    dispatch({
      type: ActionTypes.ADD_TO_CART,
      payload: {
        id: item.id,
        name: item.name,
        price: item.price,
        type: item.type
      }
    });
  } catch (error) {
    dispatch({
      type: ActionTypes.ADD_TO_CART_FAILURE,
      payload: `Failed to add item to cart: ${error.message}`
    });
  }
};
export const removeFromCart = (id, type) => ({
  type: ActionTypes.REMOVE_FROM_CART,
  payload: { id, type }
});
// payment
export const processPayment = (paymentData) => async (dispatch, getState) => {
  dispatch({ type: ActionTypes.PROCESS_PAYMENT });

  const { customerId } = getState().cart;

  try {
    // Lấy danh sách hóa đơn cũ
    const response = await axios.get(`https://8a79-2402-800-63b3-b1dc-e934-e8a4-dc11-7ee3.ngrok-free.app/api/get/customerBills/${customerId}`);
    const bills = response.data;
    const now = moment();

    // Kiểm tra hóa đơn cũ còn hiệu lực
    const hasActiveBill = bills.some(bill => {
      const startDate = moment(bill.StartDate);
      const endDate = moment(bill.EndDate);
      return startDate.isBefore(now) && endDate.isAfter(now);
    });

    if (hasActiveBill) {
      return dispatch({
        type: ActionTypes.PROCESS_PAYMENT_FAILURE,
        payload: 'You have an active subscription and cannot make a new payment until it expires.'
      });
    }

    // Thực hiện thanh toán mới
    const newStartDate = moment().format('YYYY-MM-DD');
    const newEndDate = moment().add(1, 'month').format('YYYY-MM-DD');

    const paymentResponse = await axios.post('https://8a79-2402-800-63b3-b1dc-e934-e8a4-dc11-7ee3.ngrok-free.app/api/post/Bill', {
      ...paymentData,
      startDate: newStartDate,
      endDate: newEndDate
    });

    dispatch({ type: ActionTypes.PROCESS_PAYMENT_SUCCESS, payload: paymentResponse.data });
  } catch (error) {
    dispatch({
      type: ActionTypes.PROCESS_PAYMENT_FAILURE,
      payload: error.message
    });
  }
};

// customer
export const setCustomerId = (customerId) => ({
  type: ActionTypes.SET_CUSTOMER_ID,
  payload: customerId
});