import { request, failure } from './common.actions';
import { UPDATE_STORIES, UPDATE_MY_STORY, WATCH_STORY } from '../types';
import { storiesService } from '../../services';
import { StoryInterface, StoriesActionTypes } from '../types'
import { ActionCreator } from 'redux';

const updateStoriesSuccess: ActionCreator<StoriesActionTypes> = (stories: StoryInterface[]) => {
  return { type: UPDATE_STORIES, payload: stories };
}

const updateMyStorySuccess: ActionCreator<StoriesActionTypes> = (myStory: StoryInterface[]) => {
  return { type: UPDATE_MY_STORY, payload: myStory };
}

const watchStorySuccess: ActionCreator<StoriesActionTypes> = (stories: StoryInterface[]) => {
  return { type: WATCH_STORY, payload: stories };
}

export function updateStories() {
  return dispatch => {
    dispatch(request());
    return storiesService.updateStories()
      .then(
        response => {
          dispatch(updateStoriesSuccess(response))
        },
        error => {
          dispatch(failure('Server error.'))
        })
  }
}

export function updateMyStory() {
  return dispatch => {
    dispatch(request());
    return storiesService.updateMyStory()
      .then(
        response => {
          dispatch(updateMyStorySuccess(response))
        },
        error => {
          dispatch(failure('Server error.'))
        })
  }
}

export function watchStory({ storyId }: { storyId: String }) {
  return dispatch => {
    dispatch(request());
    return storiesService.watchStory({ storyId })
      .then(
        response => {
          dispatch(watchStorySuccess(response))
        },
        error => {
          dispatch(failure('Server error.'))
        })
  }
}