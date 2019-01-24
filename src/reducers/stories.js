import { ADD_STORY, GET_STORIES } from '../actions/stories';

/*
- designs state of application
- important to follow state schema in action generators in reducers
- application will be fucked up otherwise
*/
const initialState = [];

/* 
DATA FLOW:
Dispatch Call => Action Generator => Reducer (This File)
*/

/*
- action refers to the data being passed in from action generator
*/
const storiesReducer = (state = initialState, action) => {
  const { type, title, link, comment, category, username, date, stories } = action;
  switch (type) {
    case ADD_STORY:
      return [
        ...state,
        {
          title: title,
          link: link,
          comment: comment,
          category: category,
          username: username,
          date: date
        }
      ]
    default:
      return state
  }
}

export default storiesReducer;