import React from 'react';
import { StyleSheet, Text as ReactNativeText, TextStyle } from 'react-native';
const theme = "dark"

interface Props {
  color?: string;
  fontWeight?: TextStyle['fontWeight'];
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'button' | 'datetime';
  numberOfLines?: number
  style?: TextStyle
}

export const ViewTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <Text color="#fff" variant="h1">{children}</Text>
}

export const Text: React.FC<Props & { children: React.ReactNode }> = ({
  color = theme === "dark" ? "#fff" : "#2b2b2b",
  fontWeight,
  variant,
  numberOfLines = 1,
  style,
  children,
}) => {
  return (
    <ReactNativeText
      ellipsizeMode="tail"
      numberOfLines={numberOfLines}
      style={[
        { color, fontWeight },
        styles.fontFamily,
        variant === 'h1'
          ? styles.h1
          : variant === 'h2'
            ? styles.h2
            : variant === 'h3'
              ? styles.h3
              : variant === 'h4'
                ? styles.h4
                : variant === 'h5'
                  ? styles.h5
                  : variant === 'h6'
                    ? styles.h6
                    : variant === 'button'
                      ? styles.button
                      : variant === "datetime"
                        ? styles.datetime
                        : styles.body,
        { ...style }
      ]}>
      {children}
    </ReactNativeText>
  );
};

const styles = StyleSheet.create({
  h1: { fontSize: 25 },
  h2: { fontSize: 23 },
  h3: { fontSize: 21 },
  h4: { fontSize: 19 },
  h5: { fontSize: 17 },
  h6: { fontSize: 15 },
  body: { fontSize: 14 },
  button: { fontSize: 12, textTransform: 'uppercase' },
  datetime: { fontSize: 12,  color: theme === "dark" ? "#c1c1c1" : "#4b4b4b" },
  fontFamily: { fontFamily: 'helvetica' }
});
