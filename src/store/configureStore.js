import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import storiesReducer from '../reducers/stories';
import userReducer from '../reducers/user';
import commentReducer from '../reducers/comment';
import storyReducer from '../reducers/story';
import voteReducer from '../reducers/vote';
import saveReducer from '../reducers/save';

const rootReducer = combineReducers({
  story: storyReducer,
  stories: storiesReducer,
  users: userReducer,
  comment: commentReducer,
  vote: voteReducer,
  save: saveReducer
});

const reduxStore = createStore(
  rootReducer,
  applyMiddleware(thunk, logger)
);

export default reduxStore;