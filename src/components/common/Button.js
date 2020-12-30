import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

function Button(props) {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      disabled={props.disabled}
      style={[styles.container, props.style]}>
      {props.text && (
        <Text
          style={[
            props.disabled ? styles.disabledTextStyle : styles.textStyle,
            props.textStyle,
          ]}>
          {props.text}
        </Text>
      )}
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    minWidth: 48,
  },
  textStyle: {
    fontSize: 16,
    color: '#2383FB',
  },
  disabledTextStyle: {
    fontSize: 16,
    color: '#DEE2E7',
  },
});

export default Button;
