import axios from 'axios';
import { handleNetworkError } from '../util/network-error';

export const UPVOTE = 'UPVOTE';
export const ADD_UPVOTE = 'ADD_UPVOTE';
export const MODIFY_UPVOTE = 'MODIFY_UPVOTE';
export const DOWNVOTE = 'DOWNVOTE';
export const ADD_DOWNVOTE = 'ADD_DOWNVOTE';
export const MODIFY_DOWNVOTE = 'MODIFY_DOWNVOTE';

/* Upvote Actions */
export const upvote = () => ({
  type: UPVOTE
});

export const startUpvote = _id => {
  return dispatch => {
    dispatch(upvote());

    axios.post('/api/votes', { _id, upvoted: true })
      .then(error => handleNetworkError(error))

  }
}

/* Add Upvote Actions */
export const addUpvote = () => ({
  type: ADD_UPVOTE
});

export const startAddUpvote = ({ user, _id, upvoted, downvoted }) => {
  return dispatch => {
    dispatch(addUpvote());

    axios.post(`/api/users/add_upvote/${user}`, { storyId: _id, upvoted, downvoted })
      .then(error => handleNetworkError(error))

  }
};

/* Modify Upvote Actions */
export const modifyUpvote = () => ({
  type: MODIFY_UPVOTE
});

export const startModifyUpvote = ({ user, _id, upvoted, downvoted }) => {
  return dispatch => {
    dispatch(modifyUpvote())
    axios.post(`/api/users/modify_upvote/${user}`, { storyId: _id, upvoted, downvoted })
      .then(error => handleNetworkError(error))

  }
};

/* Downvote Actions */
export const downvote = () => ({
  type: DOWNVOTE
});

export const startDownvote = _id => {
  return dispatch => {
    dispatch(downvote());
    axios.post('/api/votes', { _id, downvoted: true })
      .then(error => handleNetworkError(error))

  }
}

export const addDownvote = () => ({
  type: ADD_DOWNVOTE
});

export const startAddDownvote = ({ user, _id }) => {
  return dispatch => {
    dispatch(addDownvote());

    axios.post(`/api/users/add_downvote/${user}`, { storyId: _id, upvoted: false, downvoted: true })
      .then(error => handleNetworkError(error))

  }
}

export const modifyDownvote = () => ({
  type: MODIFY_DOWNVOTE
});

export const startModifyDownvote = ({ user, _id, upvoted, downvoted }) => {
  return dispatch => {
    dispatch(modifyDownvote());

    axios.post(`/api/users/modify_downvote/${user}`, { storyId: _id, upvoted, downvoted })
      .then(error => handleNetworkError(error))

  }


}