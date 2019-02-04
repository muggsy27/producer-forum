import axios from 'axios';

export const ADD_STORY = 'ADD_STORY';
export const GET_STORIES = 'GET_STORIES';

/* DATA FLOW
Dispatch Call => Action Generator (This file) => Reducer
*/

/* 
{ title, link, comment, category }
are destructured from the dispatch object
*/

// processes story data to ADD_STORY reducer
export const addStory = ({ title, link, comment, category, username, date }) => ({
  type: ADD_STORY,
  title,
  link,
  comment,
  category,
  username,
  date
});

/*
- redux-thunk function uses axios to perform POST request to stories API
- dispatches addStories action generator to update redux state
- POST request route for /api/stories is handled in server/server.js
*/
export const startAddStory = story => {
  return dispatch => {
    dispatch(addStory(story))
    axios.post('/api/stories', { story })
      .then(() => console.log(`succesfully posted ${story}`))
      .catch(e => console.log(`error with axios POST request ${e}`));
  }
}

// processes stories data to GET_STORIES reducer
export const getStories = stories => ({
  type: GET_STORIES,
  stories
});

/*
- gets ALL stories for the index page
- redux-thunk function uses axios to perform GET request to stories API
- dispatches getStories action generator to update redux state
- GET request route for /api/stories is handled in server/server.js 
*/
export const startGetStories = () => {
  return dispatch => {
    axios.get('/api/stories')
      .then(res => dispatch(getStories(res.data)))
      .catch(e => console.log(`error with axios GET request ${e}`));
  }
}