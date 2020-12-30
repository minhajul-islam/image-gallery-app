import React from 'react';
import {TouchableOpacity, View, Image, StyleSheet} from 'react-native';
import {Icons} from '../constants';

function CameraButton(props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={props.takePhoto}>
        <Image style={styles.cameraImage} source={Icons.camera} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  cameraImage: {
    height: 56,
    width: 56,
  },
});

export default CameraButton;
