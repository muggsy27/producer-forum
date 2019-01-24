import { UPVOTE, DOWNVOTE, ADD_UPVOTE, MODIFY_UPVOTE } from '../actions/vote';

const initialState = {
  votes: 0,
  upvoted: false,
  downvoted: false
};

const voteReducer = (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case UPVOTE:
      return {
        ...state,
        votes: state.votes + 1,
        upvoted: true,
        downvoted: false
      }
    case DOWNVOTE:
      return {
        ...state,
        votes: state.votes - 1,
        upvoted: false,
        downvoted: true
      }
    default:
      return state;
  }
}

export default voteReducer;