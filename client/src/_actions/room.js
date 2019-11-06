import {
  GET_ROOM_PENDING,
  GET_ROOM_FULLFILLED,
  GET_ROOM_REJECTED,
} from '../configurations/constant';

export const roomFetchData = set => {
  return {
    type: GET_ROOM_PENDING,
    payload: set,
  };
};

export const roomFetchDataFullfilled = data => {
  return {
    type: GET_ROOM_FULLFILLED,
    payload: data,
    isLoading: false,
  };
};

export const roomFetchDataRejected = error => {
  return {
    type: GET_ROOM_REJECTED,
    payload: error,
    isLoading: false,
  };
};
