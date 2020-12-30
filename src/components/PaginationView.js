import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button} from './common';

function PaginationView(props) {
  const {numberOfPhotos, photosPerPage} = props;
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(numberOfPhotos / photosPerPage); i++) {
    pageNumbers.push(i);
  }

  if (pageNumbers.length < 2) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Button
        onPress={props.seePrevious}
        disabled={props.selectedPosition <= 1}
        style={styles.prev}
        text={'Prev'}
      />
      {pageNumbers &&
        pageNumbers.map((item, index) => {
          return (
            <Button
              onPress={() => props.seeSpecificItem(index)}
              disabled={index + 1 == props.selectedPosition}
              style={styles.prev}
              text={item.toString()}
            />
          );
        })}
      <Button
        onPress={props.seeNext}
        disabled={props.selectedPosition >= pageNumbers.length}
        text={'Next'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#DEE2E7',
    height: 50,
  },
  prev: {
    height: 48,
    borderRightWidth: 1,
    borderRightColor: '#DEE2E7',
  },
  spaceBetween: {
    flex: 1,
  },
});

export default PaginationView;
