import React, {useRef, useState, useEffect} from 'react';
import {TouchableOpacity, View, Image, StyleSheet} from 'react-native';
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
    }, 800);
  }, [props.selectedPage]);

  const previewImage = (uri) => {
    setPreviewImageUri(uri);
    setModalVisible(true);
  };

  const imageItem = (uri) => {
    return (
      <TouchableOpacity onPress={() => previewImage(uri)}>
        <Image style={styles.image} source={{uri: uri}} />
      </TouchableOpacity>
    );
  };

  if (props.photos == null) {
    return null;
  }
  return (
    <View>
      <AnimatedView
        isFadeIn={isFadeIn}
        isFadeOut={isFadeOut}
        selectedPage={props.selectedPage}>
        <View style={styles.container}>
          <View style={styles.rowContainer}>
            {props.photos[imageOne] && imageItem(props.photos[imageOne].uri)}
            {props.photos[imageTwo] && imageItem(props.photos[imageTwo].uri)}
            {props.photos[imageThree] && imageItem(props.photos[imageThree].uri)}
            {props.photos[imageFour] && imageItem(props.photos[imageFour].uri)}
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
    flexWrap: 'wrap',
    marginHorizontal: 12,
  },
  image: {
    height: (FullWidth - 40) / 2,
    width: (FullWidth - 40) / 2,
    margin: 4,
    backgroundColor: '#DEE2E7',
  },
});

export default GalleryView;
