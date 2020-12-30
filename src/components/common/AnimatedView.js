import React, {useRef, useEffect} from 'react';
import {Animated, Alert, View} from 'react-native';

function AnimatedView(props) {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 5000,
    }).start();
  }, [fadeAnim]);

  // useEffect(() => {
  //   fadeOut();
  // }, [props.selectedPage]);

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


  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
    }).start();
  };

  const fadeOut = () => {
    // Will change fadeAnim value to 0 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
    }).start();
  };

  return (
    <Animated.View
      key={props.selectedPage} // Special animatable View
      style={{
        ...props.style,
        opacity: fadeAnim, // Bind opacity to animated value
      }}>
      {props.children}
    </Animated.View>
  );
}

export default AnimatedView;
