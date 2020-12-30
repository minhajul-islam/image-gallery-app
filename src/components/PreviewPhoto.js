import React from 'react';
import {
  View,
  Image,
  Modal,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import {Icons} from '../constants';
import {FullWidth} from '../constants/BaseStyle';

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
