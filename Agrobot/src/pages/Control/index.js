import {View, Text} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import Joystick from '../../component/Joystick';
import Footer from '../../component/Footer';
import DataContext from '../../context/dataContext';
import communicationContext from '../../context/communication';
import Style from './style.js';

export default function Control({navigation, route}) {
  const {
    autoMode,
    switchAutoMode,
    lightOn,
    switchLight,
    limit,
    setLimit,
    powerA,
    switchPowerA,
    speed,
    steer,
    send,
  } = useContext(DataContext);

  const {connected} = useState(communicationContext);

  return (
    <>
      <View style={Style.container}>
        <Joystick
          wrapperStyle={{backgroundColor: '#314159'}}
          handlerStyle={{backgroundColor: '#000'}}
          resetOnRelease={true}
          autoCenter={true}
          onValue={({x, y}) => {
            // values are between -1 and 1
            console.log(x, y);
          }}
        />
        <Text>Ola mundo</Text>
        <Footer />
      </View>
    </>
  );
}
