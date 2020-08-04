import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Dimensions,
} from 'react-native';
import { ViewTitle } from './base/Text';
import { IconCamera, IconPlane } from './base/Icons';
const { width } = Dimensions.get('window');
const theme = "dark"

interface HomeHeaderProps {
  countNotifications: number
}
export const HomeHeader: React.FC<HomeHeaderProps> = ({ countNotifications = 0 }) => {
  return (
    <Header
      leftComponent={<IconCamera />}
      rightComponent={<IconPlane onPress={()=>{}} badgeCount={countNotifications} />}>
      <ViewTitle>Instagram</ViewTitle>
    </Header>
  );
};

interface HeaderProps {
  leftComponent?: any;
  rightComponent?: any;
  children: any;
}

const Header: React.FC<HeaderProps> = ({ leftComponent, rightComponent, children }) => {
  return (
    <View style={styles.headerContainer}>
      {leftComponent ? <View style={styles.sideComponentContainer}>
        {leftComponent}
      </View> : null}
      <View style={styles.childrenContainer}>
        {children}
      </View>
      {rightComponent ? <View style={styles.sideComponentContainer}>
        {rightComponent}
      </View> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 56,
    width,
    backgroundColor: theme === "dark" ? '#1b1b1b' : "#fff",
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  },
  sideComponentContainer: {
    height: 56,
    flex: 0,
    paddingHorizontal: 5,
    justifyContent:'center',
  },
  childrenContainer: {
    flex: 1,
    paddingHorizontal: 5
  }
});
