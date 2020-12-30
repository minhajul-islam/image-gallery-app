import React, {useRef, useEffect} from 'react';
import {Animated} from 'react-native';

function AnimatedView(props) {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  useEffect(() => {
    if (props.isFadeOut) {
      fadeOut();
    }
  }, [props.isFadeOut]);

  useEffect(() => {
    if (props.isFadeIn) {
      fadeIn();
    }
  }, [props.isFadeIn]);

  // action for next page with fade in
  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  };

  // action for fade out previous page
  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 800,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View
      key={props.selectedPage}
      style={{
        ...props.style,
        opacity: fadeAnim,
      }}>
      {props.children}
    </Animated.View>
  );
}

export default AnimatedView;
