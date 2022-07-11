import {ScrollView, View, TextInput, Text, Alert} from 'react-native';
import React, {useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import Orientation from 'react-native-orientation';

import {DataContext} from '../../context/dataContext';
import Button from '../../component/Button';
import Style from './style';
import Header from '../../component/Header';
import {Picker} from '@react-native-community/picker';
import {CommunicationContext} from '../../context/communication';

export default function SetParameters({navigation}) {
  useFocusEffect(() => {
    Orientation.lockToPortrait();
  });
  const {
    updateModeData,
    autoModeData,
    autoMode,
    setAutoMode,
    moduleRobot,
    setAutoModeData,
  } = React.useContext(DataContext);

  const {sendTypeModuleControl} = React.useContext(CommunicationContext);

  const correctionsMovements = React.useRef(5);
  const correctionFactor = React.useRef(15);
  const detectDistance = React.useRef(1.5);
  const moveTime = React.useRef(0);
  const stopTime = React.useRef(0);

  const [selectedValue, setSelectedValue] = useState('');

  const onSave = () => {
    setAutoModeData({
      correctionsMovements: correctionsMovements.current,
      correctionFactor: correctionFactor.current,
      detectDistance: detectDistance.current,
      moveTime: moveTime.current,
      stopTime: stopTime.current,
    });
    navigation.navigate('Controle principal');
  };
  return (
    <>
      <View style={Style.container}>
        <Header navigation={navigation} />
        <Text style={Style.title}>Parâmetros</Text>
        <View style={Style.containerInput}>
          <TextInput
            style={Style.inputText}
            placeholder={
              'N de movimentos de correção: ' +
              autoModeData.correctionsMovements
            }
            onChangeText={(text) => {
              correctionsMovements.current = text;
            }}
            keyboardType="numeric"
          />
          <TextInput
            style={Style.inputText}
            placeholder={'Fator de correção: ' + autoModeData.correctionFactor}
            onChangeText={(text) => {
              correctionFactor.current = text;
            }}
            keyboardType="numeric"
          />
          <TextInput
            style={Style.inputText}
            placeholder={'Distancia de colisão: ' + autoModeData.detectDistance}
            onChangeText={(text) => {
              detectDistance.current = text;
            }}
            keyboardType="numeric"
          />
          <TextInput
            style={Style.inputText}
            placeholder={'Andar por(seg): ' + autoModeData.moveTime}
            onChangeText={(text) => {
              moveTime.current = text;
            }}
            keyboardType="numeric"
          />
          <TextInput
            style={Style.inputText}
            placeholder={'Parar por(Seg): ' + autoModeData.stopTime}
            onChangeText={(text) => {
              stopTime.current = text;
            }}
            keyboardType="numeric"
          />
          <Picker
            style={Style.inputText}
            selectedValue={selectedValue}
            onValueChange={(itemValue, itemIndex) => {
              setSelectedValue(itemValue);
              sendTypeModuleControl(itemValue);
            }}>
            <Picker.Item label="Modo A" value={'A'} />
            <Picker.Item label="Modo B" value={'B'} />
            <Picker.Item label="Modo C" value={'C'} />
          </Picker>
        </View>
        <Button
          style={Style.buttonSave}
          styleText={Style.textButtonSave}
          onPress={onSave}>
          Salvar
        </Button>
      </View>
    </>
  );
}
