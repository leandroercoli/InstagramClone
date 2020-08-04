import React from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconFeather from 'react-native-vector-icons/Feather';
import IconSimpleLines from 'react-native-vector-icons/SimpleLineIcons';
import { Text } from './Text';
const { height, width } = Dimensions.get('window');
const theme = "dark"

const iconSize = {
  'xxs': width / 28,
  'xs': width / 24,
  'sm': width / 20,
  'md': width / 16,
  'lg': width / 12,
  'xl': width / 8
}

interface IconProps {
  color?: string;
  size?: 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  onPress?(): void;
  disabled?: boolean,
  badgeCount?: number
}

export const IconCamera: React.FC<IconProps> = props => {
  return <IconBase type="ant-design" name="camerao" {...props} />;
};

export const IconPlane: React.FC<IconProps> = props => {
  return <IconBase type="simple-lines" name="paper-plane" {...props} />;
};

export const IconBack: React.FC<IconProps> = props => {
  return <IconBase type="ant-design" name="arrowleft" {...props} />;
};

export const IconMenuDots: React.FC<IconProps> = props => {
  return <IconBase type="simple-lines" name="options-vertical" {...props} />;
};

export const IconSave: React.FC<IconProps> = props => {
  return <IconBase type="feather" name="bookmark" {...props} />;
};

export const IconComment: React.FC<IconProps> = props => {
  return <IconBase type="simple-lines" name="bubble" {...props} />;
};

export const IconLike: React.FC<IconProps> = props => {
  return <IconBase type="ant-design" name="hearto" {...props} />;
};

export const IconLiked: React.FC<IconProps> = props => {
  return <IconBase type="ant-design"  name="heart" color="#bd081c" {...props} />;
};

export const IconClose: React.FC<IconProps> = props => {
  return <IconBase type="ant-design"  name="close" {...props} />;
};

interface IconBaseProps {
  name: string;
  type: 'ant-design' | 'simple-lines' | 'feather';
}

const IconBase: React.FC<IconBaseProps & IconProps> = ({
  name = '',
  type,
  color = theme === "dark" ? "#fff" : "#2b2b2b",
  size = 'md',
  onPress,
  disabled = false,
  badgeCount = 0
}) => {
  const icon = type === "ant-design" ? <IconAntDesign size={iconSize[size]} name={name} color={color} /> : type === "simple-lines" ? <IconSimpleLines size={iconSize[size]} name={name} color={color} /> : type === "feather" ? <IconFeather size={iconSize[size]} name={name} color={color} /> : null
  return onPress ? <TouchableOpacity onPress={onPress} disabled={disabled} >
    <View style={styles.iconContainer}>
      {icon}
      {badgeCount && badgeCount > 0 && <View style={styles.badgeCountContainer}>
        <Text color="#fff" fontWeight="bold" >{badgeCount}</Text>
      </View> || null}
    </View>
  </TouchableOpacity> : icon
};

const styles = StyleSheet.create({
  iconContainer: {
    position: 'relative'
  },
  badgeCountContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: width / 18,
    height: width / 18,
    borderRadius: width / 9,
    elevation: 4,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
