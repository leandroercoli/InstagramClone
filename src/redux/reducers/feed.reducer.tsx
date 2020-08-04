import { LIKE_POST, UPDATE_FEED, PostInterface, FeedActionTypes } from '../types';

interface FeedState {
  posts: PostInterface[]
}

const initialState: FeedState = {
  posts: []
};

export function feedReducer(state = initialState, action: FeedActionTypes): FeedState {
  switch (action.type) {
    case UPDATE_FEED: {
      return {
        ...state,
        posts: action.payload
      };
    }
    case LIKE_POST: {
      return {
        ...state,
        posts: action.payload
      };
    }
    default:
      return state
  }
};
