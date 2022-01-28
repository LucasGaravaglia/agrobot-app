import React, {useEffect, useContext, useState, useRef} from 'react';
import {Text, View} from 'react-native';
import Orientation from 'react-native-orientation';
import Joystick from 'multitouchjoystick';

import Slider from '../../component/Slider';
import ButtonIcon from '../../component/buttonIcon';
import {DataContext} from '../../context/dataContext';

import Style from './style.js';
import {useFocusEffect} from '@react-navigation/native';
import {CommunicationContext} from '../../context/communication';
import Header from '../../component/Header';

export default function Control({navigation}) {
  useFocusEffect(() => {
    Orientation.lockToLandscape();
  });
  const {setLimit, limit, handlePowerSwitch, power} = React.useContext(
    DataContext,
  );
  const {sendControl} = React.useContext(CommunicationContext);
  const speed = useRef(0);
  const steer = useRef(0);
  return (
    <>
      <View style={Style.container}>
        <Header navigation={navigation} />
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
                  console.log(x);
                  steer.current = x * -1;
                  sendControl({
                    limit: limit / 100,
                    steer: steer.current,
                    speed: speed.current,
                  });
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
                  console.log(y);
                  speed.current = y * -1;
                  sendControl({
                    limit: limit / 100,
                    steer: steer.current,
                    speed: speed.current,
                  });
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
