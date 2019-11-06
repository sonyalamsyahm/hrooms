import {
  customerFetchData,
  customerFetchDataFullfilled,
  customerFetchDataRejected,
} from '../_actions/customer';

import {URL} from '../configurations/api';

export const getAllCustomer = () => {
  return dispatch => {
    dispatch(customerFetchData(false));

    URL.get(`customers`)
      .then(res => {
        dispatch(customerFetchDataFullfilled(res.data));
      })
      .catch(error => {
        dispatch(customerFetchDataRejected(error));
      });
  };
};

export const addNewCustomer = (name, identityNumber, phoneNumber) => {
  return dispatch => {
    dispatch(customerFetchData(false));
    URL.post(`customer`, {
      name: name,
      identity_number: identityNumber,
      phone_number: phoneNumber,
      image:
        'https://cdn3.f-cdn.com/contestentries/1269942/15600440/5a991c82be987_thumb900.jpg',
    })
      .then(res => {
        dispatch(customerFetchDataFullfilled(res.data));
      })
      .catch(error => {
        dispatch(customerFetchDataRejected(error));
      });
  };
};

export const EditCustomer = (id, name, identityNumber, phoneNumber, Img) => {
  return dispatch => {
    dispatch(customerFetchData(false));
    URL.put(`customer/${id}`, {
      name: name,
      identity_number: identityNumber,
      phone_number: phoneNumber,
      image: Img,
    })
      .then(res => {
        dispatch(customerFetchDataFullfilled(res.data));
      })
      .catch(error => {
        dispatch(customerFetchDataRejected(error));
      });
  };
};
