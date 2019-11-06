import {
  checkinFetchData,
  checkinFetchDataFullfilled,
  checkinFetchDataRejected,
} from '../_actions/checkin';

import {
  customerFetchData,
  customerFetchDataFullfilled,
  customerFetchDataRejected,
} from '../_actions/customer';
import {
  userFetchData,
  userFetchDataFullfilled,
  userFetchDataRejected,
} from '../_actions/setting';

import {
  roomFetchData,
  roomFetchDataFullfilled,
  roomFetchDataRejected,
} from '../_actions/room';

import {URL} from '../configurations/api';
import axios from 'axios';

export const fetchDataCheckin = id => {
  return dispatch => {
    dispatch(checkinFetchData(true));
    dispatch(customerFetchData(true));
    dispatch(userFetchData(true));
    dispatch(roomFetchData(true));
    axios
      .all([
        URL.get('customers'),
        URL.get('rooms'),
        URL.get('checkins'),
        URL.get(`user/${id}`),
      ])
      .then(res => {
        dispatch(customerFetchDataFullfilled(res[0].data)),
          dispatch(roomFetchDataFullfilled(res[1].data)),
          dispatch(checkinFetchDataFullfilled(res[2].data)),
          dispatch(userFetchDataFullfilled(res[3].data));
      })
      .catch(error => {
        dispatch(checkinFetchDataRejected(error)),
          dispatch(roomFetchDataRejected(error)),
          dispatch(checkinFetchDataRejected(error)),
          dispatch(userFetchDataRejected(error));
      });
  };
};

export const fetchAddCheckin = (room_id, customer_id, duration) => {
  return dispatch => {
    // dispatch(checkinFetchData(true));
    URL.post(`checkin`, {
      room_id,
      customer_id,
      duration: parseInt(duration),
    })
      .then(res => {
        dispatch(checkinFetchDataFullfilled(res.data));
      })
      .catch(error => {
        dispatch(checkinFetchDataRejected(error));
      });
  };
};

export const fetchCheckout = id_order => {
  return dispatch => {
    dispatch(checkinFetchData(true));
    URL.put(`order/${id_order}`)
      .then(res => {
        dispatch(checkinFetchDataFullfilled(res.data));
      })
      .catch(error => {
        dispatch(checkinFetchDataRejected(error));
      });
  };
};
