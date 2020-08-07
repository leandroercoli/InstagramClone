import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Dimensions,
} from 'react-native';
import { HomeHeader, HomeStories, HomeFeed, StoriesModal } from '../components'
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/reducers';
import { updateFeed, likePost } from '../redux';
import { updateStories, updateMyStory, watchStory } from '../redux/actions/stories.actions';
import { StoryInterface } from '../redux/types';
const theme = "dark"
const { height } = Dimensions.get('window');
const userId = "1" // id of logged user (should ideally be retreived from server and saved in localstorage/redux)

interface Props { }
export const Home: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state: RootState) => state.feed)
  const { stories, myStory } = useSelector((state: RootState) => state.stories)
  const [initialStory, setInitialStory] = useState<number>(0)
  const [isStoriesModalOpen, setIsStoriesModalOpen] = useState<boolean>(false)
  const [isMyStoryModalOpen, setIsMyStoryModalOpen] = useState<boolean>(false)

  function refreshFeed() {
    dispatch(updateFeed())
  }

  function refreshStories() {
    dispatch(updateStories())
    dispatch(updateMyStory())
  }

  useEffect(() => {
    refreshFeed()
    refreshStories()
  }, [])

  function onPostLike(postId: String) {
    dispatch(likePost({ postId, userId }))
    refreshFeed()
  }

  function onStoryWatch(storyIndex: number) {
    const story: StoryInterface = stories[storyIndex]
    const { id } = story || {}
    setIsStoriesModalOpen(true)
    setInitialStory(storyIndex)
    dispatch(watchStory({ storyId: id }))
  }

  function onCloseStoriesModal() {
    setIsStoriesModalOpen(false)
    setInitialStory(0)
  }

  function onMyStoryWatch() {
    setIsMyStoryModalOpen(true)
  }

  function onCloseMyStoryModal() {
    setIsMyStoryModalOpen(false)
  }

  return (
    <>
      <View style={{ flexGrow: 1 }}>
        <HomeHeader countNotifications={1} />
        <StoriesModal stories={stories} initialId={initialStory} isOpen={isStoriesModalOpen} onClose={onCloseStoriesModal} onWatch={onStoryWatch} />
        <StoriesModal stories={myStory} initialId={0} isOpen={isMyStoryModalOpen} onClose={onCloseMyStoryModal} onWatch={() => { }} />
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <HomeStories stories={stories} myStory={myStory} onStoryWatch={onStoryWatch} onMyStoryWatch={onMyStoryWatch} />
          <HomeFeed posts={posts} onPostLike={onPostLike} />
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    height: height - 56,
    backgroundColor: theme === "dark" ? "#0a0a0a" : "#fff"
  }
});