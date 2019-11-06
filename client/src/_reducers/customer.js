import {
  GET_CUSTOMER_PENDING,
  GET_CUSTOMER_FULLFILLED,
  GET_CUSTOMER_REJECTED,
} from '../configurations/constant';

const initialState = {
  data: [],
  isLoading: true,
  error: null,
};

const customers = (state = initialState, action) => {
  switch (action.type) {
    case GET_CUSTOMER_PENDING:
      return {
        ...state,
        isLoading: action.payload,
        error: null,
      };
    case GET_CUSTOMER_FULLFILLED:
      return {
        ...state,
        data: action.payload,
        isLoading: false,
      };
    case GET_CUSTOMER_REJECTED:
      return {
        ...state,
        isLoading: action.isLoading,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default customers;
