import {View, Text, Image} from 'react-native';
import Style from './styles';
import React from 'react';
import Slider from '@react-native-community/slider';
import ButtonIcon from '../buttonIcon';

export default function CustomSlider({
  size = 15,
  styleContainer,
  styleSlider,
  value = 50,
  setValue = (data) => {},
}) {
  return (
    <View style={[Style.container, styleContainer]}>
      <ButtonIcon
        name="minus"
        size={size}
        onPress={() => {
          if (value > 0) setValue(value - 1);
        }}
      />
      <Slider
        vertical={true}
        maximumValue={100}
        minimumValue={0}
        value={value}
        onValueChange={(sliderValue) => {
          setValue(sliderValue);
        }}
        style={[Style.slider, styleSlider]}
        step={1}
      />
      <ButtonIcon
        name="plus"
        size={size}
        onPress={() => {
          if (value < 100) {
            setValue(value + 1);
          }
        }}
      />
    </View>
  );
}
