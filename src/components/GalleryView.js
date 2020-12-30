import React, {useRef, useState, useEffect} from 'react';
import {
  TouchableOpacity,
  Dimensions,
  View,
  Text,
  Alert,
  Image,
  Animated,
  StyleSheet,
} from 'react-native';
import {FullWidth} from '../constants/BaseStyle';
import {AnimatedView} from './common';
import PreviewPhoto from './PreviewPhoto';

function GalleryView(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [previewImageUri, setPreviewImageUri] = useState('');
  const [imageOne, setImageOne] = useState(null);
  const [imageTwo, setImageTwo] = useState(null);
  const [imageThree, setImageThree] = useState(null);
  const [imageFour, setImageFour] = useState(null);
  const [isFadeIn, setIsFadeIn] = useState(false);
  const [isFadeOut, setIsFadeOut] = useState(false);

  useEffect(() => {
    setIsFadeOut(true);
    setIsFadeIn(false);
    setTimeout(function () {
      setIsFadeOut(false);
      setIsFadeIn(true);
      setImageOne(props.selectedPage * 4 - 4);
      setImageTwo(props.selectedPage * 4 - 3);
      setImageThree(props.selectedPage * 4 - 2);
      setImageFour(props.selectedPage * 4 - 1);
    }, 500);
  }, [props.selectedPage]);

  if (props.photos == null) {
    return null;
  }

  const previewImage = (uri) => {
    setPreviewImageUri(uri);
    setModalVisible(true);
  };

  // const imageOne = props.selectedPage * 4 - 4;
  // const imageTwo = props.selectedPage * 4 - 3;
  //const imageThree = props.selectedPage * 4 - 2;
  //const imageFour = props.selectedPage * 4 - 1;
  return (
    <View>
      <AnimatedView
        isFadeIn={isFadeIn}
        isFadeOut={isFadeOut}
        selectedPage={props.selectedPage}>
        <View style={styles.container}>
          <View style={styles.rowContainer}>
            {props.photos[imageOne] && (
              <TouchableOpacity
                onPress={() => previewImage(props.photos[imageOne].uri)}>
                <Image
                  style={styles.image}
                  source={{uri: props.photos[imageOne].uri}}
                />
              </TouchableOpacity>
            )}
            {props.photos[imageTwo] && (
              <TouchableOpacity
                onPress={() => previewImage(props.photos[imageTwo].uri)}>
                <Image
                  style={styles.image}
                  source={{uri: props.photos[imageTwo].uri}}
                />
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.rowContainer}>
            {props.photos[imageThree] && (
              <TouchableOpacity
                onPress={() => previewImage(props.photos[imageThree].uri)}>
                <Image
                  style={styles.image}
                  source={{uri: props.photos[imageThree].uri}}
                />
              </TouchableOpacity>
            )}
            {props.photos[imageFour] && (
              <TouchableOpacity
                onPress={() => previewImage(props.photos[imageFour].uri)}>
                <Image
                  style={styles.image}
                  source={{uri: props.photos[imageFour].uri}}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </AnimatedView>
      <PreviewPhoto
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        previewImageUri={previewImageUri}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
  },
  image: {
    height: FullWidth / 2 - 40,
    width: FullWidth / 2 - 40,
    margin: 4,
    backgroundColor: '#DEE2E7',
  },
});

export default GalleryView;
