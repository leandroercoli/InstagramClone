import React from 'react';
import { StyleSheet, ImageSourcePropType, View, Image } from 'react-native';

interface Props {
  source: ImageSourcePropType
  variant?: 'small' | 'medium' | 'large';
}

export const Avatar: React.FC<Props> = ({
  source, variant
}) => {
  const style = variant === 'small' ? smallAvatar : mediumAvatar
  return (
    <View style={style.avatarContainer} >
      <Image source={source} style={style.storyImg} resizeMode="cover" />
    </View>
  );
};

const AVATAR_WIDTH_MEDIUM = 56
const AVATAR_WIDTH_SMALL = 35
const avatarStyles = (width: number) => StyleSheet.create({
  avatarContainer: {
    height: width,
    width: width,
    borderRadius: (width) / 2,
    overflow: 'hidden'
  },
  storyImg: {
    height: width,
    width: width
  },
});
const smallAvatar = avatarStyles(AVATAR_WIDTH_SMALL)
const mediumAvatar = avatarStyles(AVATAR_WIDTH_MEDIUM)