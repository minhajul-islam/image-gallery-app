import {Dimensions} from 'react-native';

const FullHeight = Dimensions.get('window').height;
const FullWidth = Dimensions.get('window').width;
const BaseStyle = {
  SemiBold: {
    fontFamily: 'Poppins-SemiBold',
    letterSpacing: 0.34,
    fontWeight: '600',
    fontStyle: 'normal',
  },
  Regular: {
    fontFamily: 'Poppins-Regular',
    letterSpacing: 0.34,
    fontWeight: 'normal',
    fontStyle: 'normal',
  },
  Medium: {
    fontFamily: 'Poppins-Medium',
    letterSpacing: 0.34,
    fontWeight: '500',
    fontStyle: 'normal',
  },
};

export {FullHeight, FullWidth, BaseStyle};
