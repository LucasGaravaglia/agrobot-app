import {View, Switch, Dimensions} from 'react-native';
import React, {useState} from 'react';
import Joystick from 'multitouchjoystick';

import {DataContext} from '../../context/dataContext';
import {CommunicationContext} from '../../context/communication';

import Style from './style.js';
import Header from '../../component/Header';
import CustomSwitch from '../../component/Switch';
let heightScreen = Dimensions.get('window').height;

export default function CalibrationPage({navigation}) {
  const {sendWheelAdjustment} = React.useContext(CommunicationContext);
  const [wheel1, setWheel1] = useState(false);
  const [wheel2, setWheel2] = useState(false);
  const [wheel3, setWheel3] = useState(false);
  const [wheel4, setWheel4] = useState(false);
  const handlerSwitch = (data) => {
    if (data == wheel) setWheel(0);
    setWheel(data);
  };
  const actualWheel = () => {
    if (wheel1) return 1;
    if (wheel2) return 2;
    if (wheel3) return 3;
    if (wheel4) return 4;
    return 0;
  };
  return (
    <>
      <View style={Style.container}>
        <Header navigation={navigation} />
        <CustomSwitch
          value={wheel1}
          text="Motor 1"
          onChange={() => {
            setWheel1((previousState) => !previousState);
            setWheel2(false);
            setWheel3(false);
            setWheel4(false);
          }}
        />
        <CustomSwitch
          value={wheel2}
          text="Motor 2"
          onChange={() => {
            setWheel1(false);
            setWheel2((previousState) => !previousState);
            setWheel3(false);
            setWheel4(false);
          }}
        />
        <CustomSwitch
          value={wheel3}
          text="Motor 3"
          onChange={() => {
            setWheel1(false);
            setWheel2(false);
            setWheel3((previousState) => !previousState);
            setWheel4(false);
          }}
        />
        <CustomSwitch
          value={wheel4}
          text="Motor 4"
          onChange={() => {
            setWheel1(false);
            setWheel2(false);
            setWheel3(false);
            setWheel4((previousState) => !previousState);
          }}
        />
        <View style={Style.joystickContainer}>
          <Joystick
            backgroundColor={'rgba(0, 0, 0, 0.8)'}
            ballColor="rgba(0, 0, 0, 1)"
            ballRadius={40}
            height={1}
            width={heightScreen * 0.3}
            onValue={(x, y) => {
              console.log('Control:', x);
              sendWheelAdjustment({
                wheel: actualWheel(),
                direction: x * -1,
              });
            }}
          />
        </View>
      </View>
    </>
  );
}
