import {View, TextInput, Text} from 'react-native';
import React from 'react';
import {useFocusEffect} from '@react-navigation/native';
import Orientation from 'react-native-orientation';

import {CommunicationContext} from '../../context/communication';

import Button from '../../component/Button';
import Header from '../../component/Header';
import Style from './style';

export default function Communication({navigation}) {
  const {
    updateAddress,
    updatePort,
    port,
    address,
    sendMission,
  } = React.useContext(CommunicationContext);
  useFocusEffect(() => {
    Orientation.lockToPortrait();
  });
  return (
    <>
      <Header navigation={navigation} />
      <View style={Style.container}>
        <Text style={Style.title}>Comunicação</Text>
        <View style={Style.containerInput}>
          <TextInput
            style={Style.inputText}
            placeholder={'IP: ' + address}
            onEndEditing={(text) => {
              if (text.nativeEvent.text != '')
                updateAddress(text.nativeEvent.text);
            }}
            keyboardType="numeric"
          />
          <TextInput
            style={Style.inputText}
            placeholder={'Porta: ' + port}
            onEndEditing={(text) => {
              if (text.nativeEvent.text != '')
                updatePort(text.nativeEvent.text);
            }}
            keyboardType="numeric"
          />
        </View>
        <View style={Style.containerButton}>
          <Button
            style={Style.buttonSendFile}
            styleText={Style.textButtonSendFile}
            onPress={() => {
              sendMission();
            }}>
            Selecionar arquivo
          </Button>
          <Button
            style={Style.buttonSave}
            styleText={Style.textButtonSave}
            onPress={() => {
              navigation.navigate('Controle principal');
            }}>
            Salvar
          </Button>
        </View>
      </View>
    </>
  );
}
