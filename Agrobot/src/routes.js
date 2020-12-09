import React from 'react';

import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';

import Control from './pages/Control';

const Drawer = createDrawerNavigator();

export default App = () => (
  <NavigationContainer>
    <Drawer.Navigator
      initialRouteName="Control"
      drawerStyle={{backgroundColor: '#FFFFFF'}}
      drawerContentOptions={{
        activeBackgroundColor: '#efefef',
        labelStyle: {color: '#000', fontWeight: 'bold'},
        itemStyle: {
          borderBottomColor: '#000',
          borderBottomWidth: 2,
        },
      }}>
      <Drawer.Screen name="Controle" component={Control} />
    </Drawer.Navigator>
  </NavigationContainer>
);
