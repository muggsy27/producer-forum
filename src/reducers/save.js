import { SAVE_STORY, UNSAVE_STORY } from '../actions/save';

const initialState = [];

const saveReducer = (state = initialState, action) => {
  const { type, _id } = action;

  switch (type) {
    case SAVE_STORY:
      return [
        ...state,
        _id
      ];
    case UNSAVE_STORY:
      return state.filter(_id => _id !== _id);
    default:
      return state;
  }
}

export default saveReducer;