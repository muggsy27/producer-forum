import axios from 'axios';
import { handleNetworkError } from '../util/network-error';

export const SAVE_STORY = 'SAVE_STORY';
export const UNSAVE_STORY = 'UNSAVE_STORY';

export const saveStory = _id => ({
  type: SAVE_STORY,
  _id
});

export const startSaveStory = ({ _id, user }) => {
  return dispatch => {
    dispatch(saveStory(_id));

    axios.post(`http://localhost:3000/api/users/save_story/${user}`, { _id })
      .then(error => handleNetworkError(error))
  }
}

export const unsaveStory = _id => ({
  type: UNSAVE_STORY,
  _id
});

export const startUnsaveStory = ({ _id, user }) => {
  return dispatch => {
    dispatch(unsaveStory(_id));

    axios.post(`http://localhost:3000/api/users/unsave_story/${user}`, { _id })
      .then(error => handleNetworkError(error))
  }
}