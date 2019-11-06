import {
  GET_CHECKIN_PENDING,
  GET_CHECKIN_FULLFILLED,
  GET_CHECKIN_REJECTED,
} from '../configurations/constant';

export const checkinFetchData = set => {
  return {
    type: GET_CHECKIN_PENDING,
    payload: set,
  };
};

export const checkinFetchDataFullfilled = data => {
  return {
    type: GET_CHECKIN_FULLFILLED,
    payload: data,
    isLoading: false,
  };
};

export const checkinFetchDataRejected = error => {
  return {
    type: GET_CHECKIN_REJECTED,
    payload: error,
    isLoading: false,
  };
};
