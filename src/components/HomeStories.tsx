import React from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { Text } from './base/Text';
import { Avatar } from './base/Avatar';
import { StoryInterface } from '../redux/types';
const { width } = Dimensions.get('window');

interface HomeStoriesProps {
  stories: StoryInterface[]
  myStory: StoryInterface[]
  onStoryWatch: (storyIndex: number) => void
  onMyStoryWatch: () => void
}

const Story: React.FC<StoryInterface & { isMyStory?: boolean, onStoryWatch: () => void }> = ({ id, user, isSeen = false, isCloseFriend = false, isMyStory = false, onStoryWatch }) => {
  const { username, avatar } = user || {}
  return (
    <TouchableOpacity style={styles.storyContainer} onPress={onStoryWatch} >
      <View style={[styles.storyImgContainer, isSeen ? styles.seenStory : null, isCloseFriend && !isSeen ? styles.closeFriendStory : null]} >
        <Avatar source={avatar} />
        {isMyStory && <View style={styles.addStoryButton}>
          <Text color="#fff" fontWeight="bold" >+</Text>
        </View>}
      </View>
      <View style={{ flexDirection: 'row' }}><Text style={{ flex: 1 }}  >{isMyStory ? "Your Story" : username}</Text></View>
    </TouchableOpacity>
  )
}

export const HomeStories: React.FC<HomeStoriesProps> = ({ stories, myStory, onStoryWatch, onMyStoryWatch }) => {
  function renderItem({ item, index }: { item: StoryInterface, index: number }) {
    return < Story {...item} onStoryWatch={() => onStoryWatch(index)} />
  }

  function renderHeaderItem() { // TODO: render multiple own stories
   return  (myStory.length > 0) ? < Story {...myStory[0]} isMyStory={true} onStoryWatch={onMyStoryWatch} /> : null
  }

  return (
    <FlatList
      data={stories}
      renderItem={renderItem}
      ListHeaderComponent={renderHeaderItem}
      horizontal
      style={styles.storiesContainer}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

const STORY_WIDTH = 64
const styles = StyleSheet.create({
  storiesContainer: {
    // height: 64,
    width,
    paddingHorizontal: 5,
    paddingVertical: 10,
    borderBottomWidth: 0.2,
    borderBottomColor: '#3b3b3b'
  },
  storyContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flexWrap: 'nowrap',
    marginHorizontal: 5,
    width: STORY_WIDTH
  },
  storyImgContainer: {
    height: STORY_WIDTH,
    width: STORY_WIDTH,
    borderRadius: STORY_WIDTH / 2,
    borderColor: '#bd081c',
    borderWidth: 2,
    marginBottom: 5,
    elevation: 4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  seenStory: {
    borderColor: '#c1c1c1',
  },
  closeFriendStory: {
    borderColor: '#4caf50',
  },
  addStoryButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: width / 18,
    height: width / 18,
    borderRadius: width / 9,
    backgroundColor: '#2b2b2b',
    elevation: 4,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
