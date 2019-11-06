import {
  GET_CUSTOMER_PENDING,
  GET_CUSTOMER_FULLFILLED,
  GET_CUSTOMER_REJECTED,
} from '../configurations/constant';

export const customerFetchData = set => {
  return {
    type: GET_CUSTOMER_PENDING,
    payload: set,
  };
};

export const customerFetchDataFullfilled = data => {
  return {
    type: GET_CUSTOMER_FULLFILLED,
    payload: data,
    isLoading: false,
  };
};

export const customerFetchDataRejected = error => {
  return {
    type: GET_CUSTOMER_REJECTED,
    payload: error,
    isLoading: false,
  };
};
