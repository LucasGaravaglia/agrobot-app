import React, {useEffect, useContext} from 'react';
import {Text, View} from 'react-native';
import Orientation from 'react-native-orientation';
import Joystick from 'multitouchjoystick';

import Slider from '../../component/Slider';
import ButtonIcon from '../../component/buttonIcon';
import {DataContext} from '../../context/dataContext';

import Style from './style.js';
import {useFocusEffect} from '@react-navigation/native';
import {CommunicationContext} from '../../context/communication';
import ConnectedIndicator from '../../component/ConnectedIndicator';

export default function Control({navigation}) {
  useFocusEffect(() => {
    Orientation.lockToLandscape();
  });
  const {
    setSpeed,
    setSteer,
    setLimit,
    limit,
    handlePowerSwitch,
    power,
  } = React.useContext(DataContext);
  const {connected} = React.useContext(CommunicationContext);

  return (
    <>
      <View style={Style.container}>
        <View style={Style.header}>
          <ButtonIcon
            name="bars"
            size={25}
            onPress={navigation.openDrawer}
            style={Style.buttonMenu}
          />
          <ConnectedIndicator connected={connected} />
        </View>
        <View style={Style.containerContent}>
          <View style={Style.groupControllerContainer}>
            <View style={Style.joystickContainer}>
              <Joystick
                backgroundColor={'#000'}
                ballColor="rgba(0, 0, 0, 1)"
                ballRadius={40}
                height={1}
                width={200}
                onValue={(x, y) => {
                  setSteer(x);
                }}
              />
            </View>
            <View style={Style.textSlider}>
              <Text>{limit}</Text>
              <Slider setValue={setLimit} value={limit} />
            </View>
          </View>
          <View style={Style.buttonsContainer}>
            <ButtonIcon
              name="power-off"
              size={30}
              color={power ? '#0f0' : '#ff6666'}
              onPress={handlePowerSwitch}
              style={Style.buttonIcon}
            />
          </View>
          <View style={Style.groupControllerContainer}>
            <View style={Style.joystickContainer}>
              <Joystick
                backgroundColor={'#000'}
                ballColor="rgba(0, 0, 0, 1)"
                ballRadius={40}
                height={200}
                width={1}
                onValue={(x, y) => {
                  setSpeed(y);
                }}
              />
            </View>
            <View style={Style.textSlider}>
              <Text>{limit}</Text>
              <Slider setValue={setLimit} value={limit} />
            </View>
          </View>
        </View>
      </View>
    </>
  );
}
