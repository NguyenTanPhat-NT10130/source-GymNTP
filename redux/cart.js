import * as ActionTypes from './ActionTypes';

const initialState = {
  cartItems: [],
  totalCost: 0,
  customerId: null,
  paymentStatus: null,
  paymentError: null,
  addToCartError: null
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_TO_CART:
      const existingItem = state.cartItems.find(item =>
        item.id === action.payload.id && item.type === action.payload.type
      );
      if (existingItem) {
        return state; // Không thêm item nếu đã tồn tại
      } else {
        const newItem = {
          id: action.payload.id,
          name: action.payload.name,
          price: action.payload.price,
          type: action.payload.type
        };
        const updatedCartItems = [...state.cartItems, newItem];
        const updatedTotalCost = updatedCartItems.reduce((sum, item) => sum + item.price, 0);
        return {
          ...state,
          cartItems: updatedCartItems,
          totalCost: updatedTotalCost
        };
      }
    case ActionTypes.ADD_TO_CART_FAILURE:
      return {
        ...state,
        addToCartError: action.payload
      };
    case ActionTypes.REMOVE_FROM_CART:
      const filteredCartItems = state.cartItems.filter(
        item => !(item.id === action.payload.id && item.type === action.payload.type)
      );
      const newTotalCost = filteredCartItems.reduce((sum, item) => sum + item.price, 0);
      return {
        ...state,
        cartItems: filteredCartItems,
        totalCost: newTotalCost
      };
    case ActionTypes.SET_CUSTOMER_ID:
      return {
        ...state,
        customerId: action.payload
      };
    case ActionTypes.PROCESS_PAYMENT:
      return {
        ...state,
        paymentStatus: 'processing',
        paymentError: null
      };
    case ActionTypes.PROCESS_PAYMENT_SUCCESS:
      return {
        ...state,
        paymentStatus: 'success',
        cartItems: [],
        totalCost: 0
      };
    case ActionTypes.PROCESS_PAYMENT_FAILURE:
      return {
        ...state,
        paymentStatus: 'failure',
        paymentError: action.payload
      };
      case ActionTypes.LOGOUT:
      return {
        ...state,
        customerId: null,
        cartItems: [],
        totalCost: 0,
        paymentStatus: null,
        paymentError: null,
        addToCartError: null
      };
    default:
      return state;
  }
};
