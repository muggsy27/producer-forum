import axios from 'axios';

export const GET_STORY = 'GET_STORY';

// processes story data to GET_STORY reducer
export const getStory = story => ({
  type: GET_STORY,
  story
});

// fetches a SINGLE story for the /story/:id page 
export const startGetStory = id => {
  return dispatch => {
    axios.get(`/api/stories/${id}`)
      .then(res => {
        dispatch(getStory(res.data))
      })
      .catch(e => console.log(`error with axios GET request ${e}`))
  }
}