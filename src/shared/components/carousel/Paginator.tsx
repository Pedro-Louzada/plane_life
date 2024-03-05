import React from 'react';
import {View, Animated, StyleSheet, useWindowDimensions} from 'react-native';
import {IDetailUser} from '../../interfaces/IDetailUser';

interface Props {
  data: IDetailUser[];
  scrollX: Animated.Value;
}

function Paginator({data, scrollX}: Props) {
  const {width} = useWindowDimensions();
  return (
    <View style={estilos.container}>
      {data.map((_, index) => {
        const inputRange = [
          (index - 1) * width,
          index * width,
          (index + 1) * width,
        ];

        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [10, 20, 10],
          extrapolate: 'clamp',
        });

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.3, 1, 0.3],
          extrapolate: 'clamp',
        });

        return (
          <Animated.View
            style={[estilos.dot, {width: dotWidth, opacity: opacity}]}
            key={String(index)}
          />
        );
      })}
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 64,
    justifyContent: 'center',
    paddingTop: 10,
  },
  dot: {
    height: 10,
    borderRadius: 5,
    backgroundColor: '#1937FE',
    marginHorizontal: 8,
  },
});

export default Paginator;
