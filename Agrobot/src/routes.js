import React from 'react';

import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';

import Control from './pages/Control';
import Communication from './pages/Communication';
import SetAutoParameters from './pages/SetAutoParameters';
import LoadingPage from './pages/LoadingPage';

const Drawer = createDrawerNavigator();

export default App = () => (
  <NavigationContainer>
    <Drawer.Navigator
      initialRouteName="Control"
      drawerStyle={{backgroundColor: '#FFFFFF'}}
      screenOptions={{
        activeBackgroundColor: '#efefef',
        labelStyle: {color: '#000', fontWeight: 'bold'},
        itemStyle: {
          borderBottomColor: '#000',
          borderBottomWidth: 2,
        },
      }}>
      <Drawer.Screen name="Controle" component={Control} />
      <Drawer.Screen name="Comunicação" component={Communication} />
      <Drawer.Screen
        name="Configuração parâmetros"
        component={SetAutoParameters}
      />
      <Drawer.Screen name="Instruções" component={LoadingPage} />
    </Drawer.Navigator>
  </NavigationContainer>
);
