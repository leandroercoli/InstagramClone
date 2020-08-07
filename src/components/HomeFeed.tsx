import React from 'react';
import { StyleSheet, View, Dimensions, FlatList, Image, } from 'react-native';
import { Text } from './base/Text';
import { IconPlane, IconMenuDots, IconSave, IconLike, IconLiked, IconComment } from './base/Icons';
import { Avatar } from './base/Avatar';
import { dateTimeToNowString } from '../extra/helpers.extra';
import { PostInterface, CommentInterface, ImgInterface } from '../redux/types';
const { width } = Dimensions.get('window');
const userId = "1" // id of logged user (should ideally be retreived from server and saved in localstorage/redux)

interface HomeFeedProps {
  posts: PostInterface[],
  onPostLike: (postId: String) => void
}

const Post: React.FC<PostInterface & { onPostLike: (postId: String) => void }> = ({ id, datetime, user, img, caption, likes, comments, onPostLike }) => {
  const { username, avatar } = user || {}
  const isPostLiked = likes.find(like => like == userId)

  return (
    <View style={styles.postContainer} >
      <View style={styles.postHeaderContainer}>
        <Avatar source={avatar} variant="small" />
        <View style={styles.postHeaderUsernameContainer} >
          <Text variant="h6" >{username}</Text>
        </View>
        <IconMenuDots onPress={() => { }} size="xs" />
      </View>
      <View style={styles.postImgListContainer} >
        <PostImgs imgs={img} />
      </View>
      <View style={styles.postInfo}>
        <View style={styles.postActionsContainer}>
          <View style={styles.postActionsInteractionsContainer} >
            <View style={{ marginRight: 16 }}>{isPostLiked ? <IconLiked onPress={() => onPostLike(id)} /> : <IconLike onPress={() => onPostLike(id)} />}</View>
            <View style={{ marginRight: 16 }}><IconComment onPress={() => { }} /></View>
            <IconPlane onPress={() => { }} />
          </View>
          <View style={styles.postSaveContainer} >
            <IconSave onPress={() => { }} />
          </View>
        </View>
        <View style={styles.postLikesContainer}>
          <Text fontWeight="bold" >{likes.length} Likes</Text>
        </View>
        <View style={styles.postCaptionContainer}>
          <View style={{ flexDirection: 'row' }}><Text numberOfLines={4} style={{ flex: 1 }}  ><Text fontWeight="bold" >{username} </Text>{caption}</Text></View>
        </View>
        <View style={styles.postCommentsContainer}>
          {
            comments.map((commentElement: CommentInterface, index) => {
              const { user: commentUser, comment } = commentElement || {}
              const { username: commentUsername, avatar: commentAvatar } = commentUser || {}
              return (
                <View style={styles.postComment} key={index}>
                  <View style={styles.postCommentHeader}>
                    <Text fontWeight="bold" >{commentUsername} </Text>
                    <Text >{comment} </Text>
                  </View>
                  <IconLike size='xxs' onPress={() => { }} />
                </View>
              )
            })}
        </View>
        <View style={styles.postDateContainer}>
          <Text variant="datetime" >{dateTimeToNowString(datetime)}</Text>
        </View>
      </View>
    </View>
  )
}

export const HomeFeed: React.FC<HomeFeedProps> = ({ posts = [], onPostLike }) => {
  function renderItem({ item }: { item: PostInterface }) {
    return < Post {...item} onPostLike={onPostLike} />
  }

  return (
    <FlatList
      data={posts}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      style={styles.feedContainer}
    />
  );
};

export const PostImgs: React.FC<{ imgs: ImgInterface[] }> = ({ imgs }) => {
  const showImgIndex = imgs.length > 1

  function renderItem({ item, index }: { item: ImgInterface, index: number }) {
    const { source, aspect } = item || {}
    return <View >
      <Image source={source} style={[styles.postImg, aspect === 'portrait' ? styles.postImgPortrait : aspect === "landscape" ? styles.postImgLandscape : null]} resizeMode="cover" />
      {showImgIndex && <Text style={styles.postImgIndex}>{index + 1}/{imgs.length}</Text> || null}
    </View>
  }

  return (
    <FlatList
      data={imgs}
      renderItem={renderItem}
      style={styles.postImgListContainer}
      horizontal
      snapToAlignment={"start"}
      snapToInterval={width}
      decelerationRate={"fast"}
      pagingEnabled
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

const HEIGHT_SQUARE = width
const HEIGHT_PORTRAIT = width * 5 / 4
const HEIGHT_LANDSCAPE = width / 1.91

const styles = StyleSheet.create({
  feedContainer: {
    flexGrow: 1,
    width,
    paddingBottom: 56
  },
  postContainer: {
    display: 'flex',
  },
  postHeaderContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingVertical: 10
  },
  postHeaderUsernameContainer: {
    flex: 1,
    paddingHorizontal: 5
  },
  postImgListContainer: {
    flexGrow: 0,
    width,
  },
  postImg: {
    width,
    height: HEIGHT_SQUARE
  },
  postImgIndex: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'rgba(0,0,0,0.8)',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 8
  },
  postImgPortrait: {
    height: HEIGHT_PORTRAIT
  },
  postImgLandscape: {
    height: HEIGHT_LANDSCAPE
  },
  postInfo: {
    display: 'flex',
    padding: 10
  },
  postActionsContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    flex: 2
  },
  postActionsInteractionsContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  postSaveContainer: {
    flex: 1,
    alignItems: 'flex-end'
  },
  postLikesContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  postCaptionContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5
  },
  postCommentsContainer: {
    display: 'flex',
  },
  postComment: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5
  },
  postCommentHeader: {
    flexGrow: 1,
    flexDirection: 'row'
  },
  postDateContainer: {
    display: 'flex',
  }
});
