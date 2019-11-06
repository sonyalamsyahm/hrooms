import {
  GET_USER_PENDING,
  GET_USER_FULLFILLED,
  GET_USER_REJECTED,
} from '../configurations/constant';

const initialState = {
  data: [],
  isLoading: true,
  error: null,
};

const users = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_PENDING:
      return {
        ...state,
        isLoading: action.payload,
        error: null,
      };
    case GET_USER_FULLFILLED:
      return {
        ...state,
        data: action.payload,
        isLoading: false,
      };
    case GET_USER_REJECTED:
      return {
        ...state,
        isLoading: action.isLoading,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default users;
