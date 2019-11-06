import {
  GET_CHECKIN_PENDING,
  GET_CHECKIN_FULLFILLED,
  GET_CHECKIN_REJECTED,
} from '../configurations/constant';

const initialState = {
  data: [],
  isLoading: false,
  error: null,
};

const checkins = (state = initialState, action) => {
  switch (action.type) {
    case GET_CHECKIN_PENDING:
      return {
        ...state,
        isLoading: action.payload,
        error: null,
      };
    case GET_CHECKIN_FULLFILLED:
      return {
        ...state,
        data: action.payload,
        isLoading: action.isLoading,
      };
    case GET_CHECKIN_REJECTED:
      return {
        ...state,
        isLoading: action.isLoading,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default checkins;
