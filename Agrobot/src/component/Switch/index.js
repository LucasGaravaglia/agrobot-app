import {View, Switch, Text} from 'react-native';
import Style from './styles';
import React from 'react';

export default function CustomSwitch({
  onChange,
  styleContainer,
  value,
  text = 'Motor 1',
}) {
  return (
    <View style={[Style.container, styleContainer]}>
      <Text style={Style.text}>{text}</Text>
      <Switch value={value} onChange={onChange} />
    </View>
  );
}
