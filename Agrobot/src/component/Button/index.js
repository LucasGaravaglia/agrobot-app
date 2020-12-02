import { Text, TouchableOpacity, StyleSheet } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';
import React from 'react';

function isIcon({ name, size, color, children }) {
  if (name === null)
    return <Text style={[Styles.text, styleText]}>{children}</Text>;
  else return <Icon name={name} size={size} color={color} />;
}

export default function button({
  onPress,
  style,
  styleText,
  children,
  name = null,
  size = 30,
  color,
}) {
  return (
    <TouchableOpacity
      delayPressIn={0}
      style={[Styles.button, style]}
      onPress={onPress}>
      <isIcon name={name} size={size} color={color}>
        {children}
      </isIcon>
    </TouchableOpacity>
  );
}

const Styles = StyleSheet.create({
  text: {
    fontSize: 25,
    textAlign: 'center',
    borderRadius: 10,
  },
  button: {
    alignContent: 'center',
    justifyContent: 'center',
    width: 140,
    height: 90,
  },
});
