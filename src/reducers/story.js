import { GET_STORY } from '../actions/story';

const initialState = {
  _id: '',
  title: '',
  link: '',
  comment: '',
  category: '',
  date: '',
  username: '',
  vote: ''
};

const storyReducer = (state = initialState, action) => {
  const { story, type } = action;
  switch (type) {
    case GET_STORY:
      return {
        ...state,
        _id: story._id,
        title: story.title,
        link: story.link,
        comment: story.comment,
        category: story.category,
        date: story.date,
        username: story.username,
        vote: story.vote
      }
    default:
      return state
  }
}

export default storyReducer;