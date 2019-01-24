import { AUTH_USER, CREATE_USER } from '../actions/user';

const userReducer = (state = {}, action) => {
  const { type, username, _id } = action;
  switch (type) {
    case AUTH_USER:
      return {
        ...state,
        authenticated: true
      }
    case CREATE_USER:
      return {
        ...state,
        _id,
        username
      }
    default:
      return state;
  }
};

export default userReducer;