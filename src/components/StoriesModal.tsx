import React from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  FlatList,
  Image,
  Modal,
} from 'react-native';
import {  Text } from './base/Text';
import { IconCamera, IconPlane, IconClose } from './base/Icons';
import { Avatar } from './base/Avatar';
import { dateTimeToNowString } from '../extra/helpers.extra';
import { StoryInterface } from '../redux/types';
const { width, height } = Dimensions.get('window');

const Story: React.FC<StoryInterface & { onClose: () => void }> = ({ id, user, img, isSeen = false, isCloseFriend = false, datetime, onClose, interactionsBlocked }) => {
  const { username, avatar } = user || {}
  return (
    <View style={styles.storyContainer}  >
      <View style={styles.storyImgContainer}>
        <Image source={img} style={styles.storyImg} resizeMode="cover" />
      </View>
      <View style={styles.storyContentContainer} >
        <View style={stylesHeader.storyHeaderContainer} >
          <Avatar source={avatar} variant="small" />
          <View style={{ flexGrow: 1, paddingHorizontal: 15, flexDirection: 'row', alignItems: 'center' }}><Text >{username} </Text><Text color="#d1d1d1">{dateTimeToNowString(datetime, true)}</Text></View>
          <IconClose onPress={onClose} />
        </View>
        {!interactionsBlocked && <View style={stylesFooter.storyFooterContainer} >
          <View style={[stylesFooter.storyFooterElement, stylesFooter.storyFooterInteractionContainer]}>
            <IconCamera size="lg" />
          </View>
          <View style={[stylesFooter.storyFooterElement, stylesFooter.storyFooterInteractionContainer, stylesFooter.storyFooterTextResponseContainer]}>
            <Text variant="h6" >Send message</Text>
          </View>
          <View style={[stylesFooter.storyFooterElement, stylesFooter.storyFooterShareContainer]}>
            <IconPlane size="lg" />
          </View>
        </View> || null}
      </View>
    </View>
  )
}

interface StoriesModalProps {
  stories: StoryInterface[]
  initialId: number
  isOpen: boolean
  onClose: () => void
  onWatch: (id: number) => void
}
export const StoriesModal: React.FC<StoriesModalProps> = ({ stories, initialId, isOpen, onClose, onWatch }) => {
  function renderItem({ item }: { item: StoryInterface }) {
    return < Story {...item} onClose={onClose} />
  }

  const onViewRef = React.useRef(({ viewableItems }) => {
    const viewableItemIndex = viewableItems[0].index;
    console.log('view items change', viewableItemIndex)
    onWatch(viewableItemIndex)
  })
  const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 50 })

  return (
    <Modal
      animationType="slide"
      visible={isOpen}
      onRequestClose={onClose}
    >
      <FlatList
        data={stories}
        renderItem={renderItem}
        horizontal
        initialScrollIndex={initialId}
        snapToAlignment={"start"}
        snapToInterval={width}
        decelerationRate={"fast"}
        pagingEnabled
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewConfigRef.current}
        style={styles.storiesModalContainer}
        keyExtractor={(item, index) => index.toString()}
      />
    </Modal>
  );
};

const styles = StyleSheet.create({
  storiesModalContainer: {
    width,
    height,
  },
  storyContainer: {
    width,
    height,
  },
  storyImgContainer: {
    width,
    height,
    overflow: 'hidden',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  storyImg: {
    width,
    height,
  },
  storyContentContainer: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 10
  },
});

const stylesHeader = StyleSheet.create({
  storyHeaderContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15
  },
});

const stylesFooter = StyleSheet.create({
  storyFooterContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    paddingHorizontal: 15
  },
  storyFooterElement: {
    marginHorizontal: 5
  },
  storyFooterInteractionContainer: {
    borderRadius: width / 8,
    borderColor: '#d1d1d1',
    borderWidth: 2,
    padding: 10,
  },
  storyFooterTextResponseContainer: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  storyFooterShareContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  }
});

