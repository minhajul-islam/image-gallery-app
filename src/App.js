/**
 * Image gallery project for interview
 * @author
 * Md Minhajul islam
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {StyleSheet, View, AsyncStorage} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import {CameraButton, GalleryView, PaginationView} from './components';

function App() {
  const asyncStorageKey = '@photos';
  const [photos, setPhotos] = useState([]);
  const [selectedPosition, setSelectedPosition] = useState(1);

  // Initialization
  useEffect(() => {
    restorePhotosFromAsync();
  }, []);

  // Action for take photo from camera
  const takePhoto = () => {
    ImagePicker.launchCamera(
      {
        mediaType: 'photo',
        quality: 1,
        saveToPhotos: true,
        includeBase64: false,
      },
      _storePhotoHandler,
    );
  };

  // Action for save photo to local storage
  const _storePhotoHandler = (response) => {
    if (response.uri == null) {
      return;
    }
    const key = Math.random().toString();
    const newPhotos = [{uri: response.uri, key}, ...photos];
    setPhotos(newPhotos);
    storePhotosInAsync(newPhotos);
  };

  // Store photos to async storage
  const storePhotosInAsync = (newPhotos) => {
    const stringifyData = JSON.stringify(newPhotos);
    AsyncStorage.setItem(asyncStorageKey, stringifyData).catch((err) => {
      console.warn('Error storing photos in Async');
    });
  };

  // Get photos from async storage
  const restorePhotosFromAsync = () => {
    AsyncStorage.getItem(asyncStorageKey)
      .then((stringifyData) => {
        const parsedPhotos = JSON.parse(stringifyData);
        if (!parsedPhotos || typeof parsedPhotos !== 'object') {
          return;
        }
        setPhotos(parsedPhotos);
      })
      .catch((err) => {
        console.warn('Error restoring photos from async');
      });
  };

  // Actions for pagination such as previous, next and specific position
  const seePrevious = () => {
    if (selectedPosition > 1) {
      setSelectedPosition(selectedPosition - 1);
    }
  };
  const seeNext = () => {
    if (selectedPosition < photos.length / 4) {
      setSelectedPosition(selectedPosition + 1);
    }
  };
  const seeSpecificItem = (selectedPosition) => {
    setSelectedPosition(selectedPosition + 1);
  };

  return (
    <View style={styles.container}>
      <CameraButton takePhoto={takePhoto} />
      <View style={styles.space} />
      <GalleryView photos={photos} selectedPage={selectedPosition} />
      <View style={styles.space} />
      <PaginationView
        hasPrevious
        hasNext
        selectedPosition={selectedPosition}
        numberOfPhotos={photos.length}
        photosPerPage={4}
        seePrevious={seePrevious}
        seeSpecificItem={seeSpecificItem}
        seeNext={seeNext}
      />
    </View>
  );
}

// Style for app page
const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: 'white',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  space: {
    height: 16,
  },
});

export default App;
