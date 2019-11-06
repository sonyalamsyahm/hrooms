import {
  GET_ROOM_PENDING,
  GET_ROOM_FULLFILLED,
  GET_ROOM_REJECTED,
} from '../configurations/constant';

const initialState = {
  data: [],
  isLoading: true,
  error: null,
};

const rooms = (state = initialState, action) => {
  switch (action.type) {
    case GET_ROOM_PENDING:
      return {
        ...state,
        isLoading: action.payload,
        error: null,
      };
    case GET_ROOM_FULLFILLED:
      return {
        ...state,
        data: action.payload,
        isLoading: false,
      };
    case GET_ROOM_REJECTED:
      return {
        ...state,
        isLoading: action.isLoading,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default rooms;
