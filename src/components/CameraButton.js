import React from 'react';
import {TouchableOpacity, View, Text, Image, StyleSheet} from 'react-native';

function CameraButton(props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={props.takePhoto}>
        <Image
          style={styles.cameraImage}
          source={require('../../assets/icons/camera.png')}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  cameraImage: {
    height: 48,
    width: 48,
  },
});

export default CameraButton;
