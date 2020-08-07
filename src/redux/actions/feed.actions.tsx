import { UPDATE_FEED, LIKE_POST, FeedActionTypes, PostInterface } from '../types';
import { feedService } from '../../services';
import { request, failure } from './common.actions';
import { ActionCreator } from 'redux';

const updateStoredFeedSuccess: ActionCreator<FeedActionTypes> = (posts: PostInterface[]) => {
  return { type: UPDATE_FEED, payload: posts };
}
const likePostSuccess: ActionCreator<FeedActionTypes> = (posts: PostInterface[]) => {
  return { type: LIKE_POST, payload: posts };
}

export function updateFeed() {
  return dispatch => { // async action: uses Redux-Thunk middleware to return a function instead of an action creator
    dispatch(request());
    return feedService.updateFeed()
      .then(
        response => {
          dispatch(updateStoredFeedSuccess(response))
        },
        error => {
          dispatch(failure('Server error.'))
        })
  }
}

export function likePost({ postId, userId }: { postId: String, userId: String }) {
  return dispatch => {
    dispatch(request());
    return feedService.likePost({ postId, userId })
      .then(
        response => {
          dispatch(likePostSuccess(response))
        },
        error => {
          dispatch(failure('Server error.'))
        })
  }
}