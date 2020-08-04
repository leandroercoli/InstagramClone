import { combineReducers } from 'redux';
// import login from './login.reducer';
import { feedReducer } from './feed.reducer';
import { storiesReducer } from './stories.reducer'

export const rootReducer = combineReducers({
  feed: feedReducer,
  stories: storiesReducer
});

export type RootState = ReturnType<typeof rootReducer>;
