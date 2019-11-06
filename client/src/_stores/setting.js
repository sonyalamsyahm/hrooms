import {
  userFetchData,
  userFetchDataFullfilled,
  userFetchDataRejected,
} from '../_actions/setting';

import {URL} from '../configurations/api';

export const fetchDataUser = id => {
  return dispatch => {
    dispatch(userFetchData(true));
    URL.get(`user/${id}`)
      .then(res => {
        dispatch(userFetchDataFullfilled(res.data));
      })
      .catch(error => {
        dispatch(userFetchDataRejected(error));
      });
  };
};

export const fetchChangeImage = (id, data) => {
  return dispatch => {
    dispatch(userFetchData(true));

    URL.put(`profile/${id}`, data)
      .then(res => {
        dispatch(userFetchDataFullfilled(res.data));
        console.log('test');
      })
      .catch(error => {
        dispatch(userFetchDataRejected(error));
      });
  };
};
