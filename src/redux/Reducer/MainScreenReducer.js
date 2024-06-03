import { types } from '../Action/actionTypes';
import { logfunction } from '../../helpers/FunctionHelper';

const initialState = {
  loadApplication: true,
  navScreen: '',
  backgroundImage: '',
};
export default (state = initialState, action) => {
  logfunction('STATE LOG ====', action.type);
  switch (action.type) {
    case types.REQUEST_INIT:
      return {
        ...state,
        loadApplication: false,
      };
    case types.SUCCESS_INIT:
      return {
        ...state,
        loadApplication: true,
        navScreen: action.payload,
      };
    case types.GET_BACKGROUND_IMAGE:
      return {
        ...state,
        backgroundImage: action.payload,
      };
    default:
      return state;
  }
};
