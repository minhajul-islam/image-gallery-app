import React, {useState} from 'react';
import {
  Alert,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TouchableHighlight,
  View,
} from 'react-native';
import {FullWidth} from '../constants/BaseStyle';
import {Icons} from '../constants';

function PreviewPhoto(props) {
  const {modalVisible, setModalVisible} = props;
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false);
      }}>
      <TouchableOpacity
        style={styles.centeredView}
        onPressOut={() => {
          setModalVisible(!modalVisible);
        }}>
        {/*<View style={styles.centeredView}>*/}
        <TouchableWithoutFeedback>
          <View style={styles.modalView}>
            <View style={{flexDirection: 'row'}}>
              <View style={{flex: 1}} />
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}>
                <Image style={styles.close} source={Icons.close} />
              </TouchableOpacity>
            </View>

            {props.previewImageUri && (
              <Image
                resizeMode={'contain'}
                style={styles.image}
                source={{uri: props.previewImageUri}}
              />
            )}
          </View>
        </TouchableWithoutFeedback>
        {/*</View>*/}
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  image: {
    height: FullWidth,
    width: FullWidth - 32,
    margin: 4,
  },
  close: {
    height: 16,
    width: 16,
    margin: 8,
  },
});

export default PreviewPhoto;
