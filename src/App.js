/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Alert,
  AsyncStorage,
} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import {CameraButton, GalleryView, PaginationView} from './components';
import PreviewPhoto from './components/PreviewPhoto';

function App() {
  const asyncStorageKey = '@photos';
  const [response, setResponse] = useState(null);
  const [pictureBase64, setPictureBase64] = useState(null);
  const [picture, setPicture] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [selectedPosition, setSelectedPosition] = useState(1);
  useEffect(() => {
    restorePhotosFromAsync();
  }, []);

  const _storeData = async (response) => {
    try {
      setResponse(response);
      setPictureBase64(response.uri);
      await AsyncStorage.setItem('image', response.uri);
    } catch (error) {
      // Error saving data
    }
  };

  const _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('image');
      if (value !== null) {
        setPicture(value);
      }
    } catch (error) {
      // Error retrieving data
    }
  };
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
  const _storePhotoHandler = (response) => {
    if (response.uri == null) {
      return;
    }
    const key = Math.random().toString();
    const newPhotos = [{uri: response.uri, key}, ...photos];
    setPhotos(newPhotos);
    storePhotosInAsync(newPhotos);
  };

  const storePhotosInAsync = (newPhotos) => {
    const stringifyData = JSON.stringify(newPhotos);
    AsyncStorage.setItem(asyncStorageKey, stringifyData).catch((err) => {
      console.warn('Error storing photos in Async');
    });
  };

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

  // Pagination
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

  const seeNumberItem = (selectedPosition) => {
    setSelectedPosition(selectedPosition + 1);
  };

  return (
    <View style={styles.container}>
      <CameraButton takePhoto={takePhoto} />
      <GalleryView photos={photos} selectedPage={selectedPosition} />
      <View style={styles.space} />
      <PaginationView
        hasPrevious
        hasNext
        selectedPosition={selectedPosition}
        numberOfPhotos={photos.length}
        photosPerPage={4}
        seePrevious={seePrevious}
        seeNumberItem={seeNumberItem}
        seeNext={seeNext}
      />
    </View>
  );
}

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
