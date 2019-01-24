import { ADD_COMMENT } from '../actions/comment';

const initialState = [];

const commentReducer = (state = initialState, action) => {
  const { username, storyId, date, comment, type } = action;
  switch (type) {
    case ADD_COMMENT:
      return [
        ...state,
        {
          username,
          storyId,
          date,
          comment
        }
      ]
    default:
      return state
  }
}

export default commentReducer;