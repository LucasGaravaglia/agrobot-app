import {View} from 'react-native';
import Style from './style';
import React from 'react';
import {CommunicationContext} from '../../context/communication';
import ConnectedIndicator from '../ConnectedIndicator';
import ButtonIcon from '../buttonIcon';

export default function Header({navigation}) {
  const {connected} = React.useContext(CommunicationContext);
  return (
    <>
      <View style={Style.header}>
        <ButtonIcon
          name="bars"
          size={25}
          onPress={navigation.openDrawer}
          style={Style.buttonMenu}
        />
        <ConnectedIndicator connected={connected} />
      </View>
    </>
  );
}
