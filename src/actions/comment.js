import axios from 'axios';

export const ADD_COMMENT = 'ADD_COMMENT';

export const addComment = ({ username, storyId, date, comment }) => ({
  type: ADD_COMMENT,
  username,
  storyId,
  date,
  comment
});

export const startAddComment = comment => {
  return dispatch => {
    dispatch(addComment(comment));
    axios.post('/api/comments', { comment })
      .then()
      .catch(e => console.log(`error with axios POST request ${e}`))
  }
}