import {View, Text, Dimensions} from 'react-native';
import React from 'react';
import Joystick from 'multitouchjoystick';

import Footer from '../../component/Footer';
import ConnectedIndicator from '../../component/ConnectedIndicator';
import Button from '../../component/Button';
import ButtonIcon from '../../component/buttonIcon';
import Slider from '../../component/Slider';

import {DataContext} from '../../context/dataContext';
import {CommunicationContext} from '../../context/communication';

import Style from './style.js';
import {useFocusEffect} from '@react-navigation/native';
import Orientation from 'react-native-orientation';
import Header from '../../component/Header';
let heightScreen = Dimensions.get('window').height;
export default function Control({navigation}) {
  const {
    setLimit,
    limit,
    handleModuleRobotSwitch,
    handlePowerSwitch,
    handleAutoModeSwitch,
    power,
    moduleRobot,
    autoMode,
    setAutoMode,
  } = React.useContext(DataContext);

  const {connected, sendControl} = React.useContext(CommunicationContext);

  useFocusEffect(() => {
    Orientation.lockToPortrait();
    heightScreen = Dimensions.get('window').height;
  });

  React.useEffect(() => {
    if (!connected) {
      navigation.navigate;
    }
  }, []);

  return (
    <>
      <View style={Style.container}>
        <Header navigation={navigation} />
        <View style={Style.joystickContainer}>
          <Joystick
            backgroundColor={'#fff'}
            ballColor="rgba(0, 0, 0, 0.8)"
            ballRadius={40}
            height={heightScreen * 0.3}
            width={heightScreen * 0.3}
            onValue={(x, y) => {
              console.log('Control:', x, y);
              sendControl({
                limit: limit / 100,
                moduleRobot,
                autoMode,
                power,
                steer: x * -1,
                speed: y * -1,
              });
            }}
          />
        </View>
        <View style={Style.internalContainer}>
          <View style={Style.buttonsContainer}>
            <ButtonIcon
              name="power-off"
              size={30}
              color={power ? '#0f0' : '#ff6666'}
              onPress={handlePowerSwitch}
              style={Style.buttonIcon}
            />
            <ButtonIcon
              name="puzzle-piece"
              size={30}
              color={moduleRobot ? '#0f0' : '#ff6666'}
              onPress={handleModuleRobotSwitch}
              style={Style.buttonIcon}
            />
            <ButtonIcon
              name="car"
              size={30}
              color={autoMode ? '#0f0' : '#000'}
              onPress={handleAutoModeSwitch}
              style={Style.buttonIcon}
            />
          </View>
          <Text>Velocidade: {limit}</Text>
          <Slider
            value={limit}
            setValue={setLimit}
            styleContainer={Style.sliderContainer}
            styleSlider={Style.slider}
          />
          <Button
            style={Style.buttonStop}
            styleText={Style.textButtonStop}
            onPress={() => {
              setAutoMode(false);
            }}>
            Parar
          </Button>
        </View>
        <Footer />
      </View>
    </>
  );
}
