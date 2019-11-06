import {
  GET_USER_PENDING,
  GET_USER_FULLFILLED,
  GET_USER_REJECTED,
} from '../configurations/constant';

export const userFetchData = set => {
  return {
    type: GET_USER_PENDING,
    payload: set,
  };
};

export const userFetchDataFullfilled = data => {
  return {
    type: GET_USER_FULLFILLED,
    payload: data,
    isLoading: false,
  };
};

export const userFetchDataRejected = error => {
  return {
    type: GET_USER_REJECTED,
    payload: error,
    isLoading: false,
  };
};
