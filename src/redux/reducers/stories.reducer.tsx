import { StoryInterface, UPDATE_STORIES, WATCH_STORY, UPDATE_MY_STORY, StoriesActionTypes } from "../types";

interface StoriesState {
  stories: StoryInterface[],
  myStory: StoryInterface[]
}

const initialState: StoriesState = {
  stories: [],
  myStory: []
};

export function storiesReducer(state = initialState, action: StoriesActionTypes): StoriesState {
  switch (action.type) {
    case UPDATE_STORIES:
    case WATCH_STORY: {
      return {
        ...state,
        stories: action.payload
      };
    }
    case UPDATE_MY_STORY: {
      return {
        ...state,
        myStory: action.payload
      };
    }
    default:
      return state;
  }
}