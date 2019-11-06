import {
  roomFetchData,
  roomFetchDataFullfilled,
  roomFetchDataRejected,
} from '../_actions/room';
import {checkinFetchDataFullfilled} from '../_actions/checkin';

import {URL} from '../configurations/api';

export const fetchAllRoom = () => {
  return dispatch => {
    dispatch(roomFetchData(false));

    URL.get(`rooms`)
      .then(res => {
        dispatch(roomFetchDataFullfilled(res.data));
      })
      .catch(error => {
        dispatch(roomFetchDataRejected(error));
      });
  };
};

export const addNewRoom = data => {
  return dispatch => {
    dispatch(roomFetchData(false));
    URL.post('room', {
      name: data,
    })
      .then(res => {
        dispatch(roomFetchDataFullfilled(res.data));
        URL.get('checkins').then(checkin => {
          dispatch(checkinFetchDataFullfilled(checkin.data));
        });
      })
      .catch(error => {
        dispatch(roomFetchDataRejected(error));
      });
  };
};

export const fetchEditRoom = (id, data) => {
  return dispatch => {
    dispatch(roomFetchData(false));
    URL.put(`room/${id}`, {
      name: data,
    })
      .then(res => {
        dispatch(roomFetchDataFullfilled(res.data));
        URL.get('checkins').then(checkin => {
          dispatch(checkinFetchDataFullfilled(checkin.data));
        });
      })
      .catch(error => {
        dispatch(roomFetchDataRejected(error));
      });
  };
};
