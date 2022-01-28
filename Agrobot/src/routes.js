import React from 'react';

import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';

import Control from './pages/Control';
import Communication from './pages/Communication';
import SetParameters from './pages/SetParameters';
import LoadingPage from './pages/LoadingPage';
import PrecisionControl from './pages/PrecisionControl';
import CalibrationPage from './pages/CalibrationPage';

const Drawer = createDrawerNavigator();

console.disableYellowBox = true;
export default App = () => (
  <NavigationContainer>
    <Drawer.Navigator
      initialRouteName="Controle"
      drawerStyle={{backgroundColor: '#FFFFFF'}}
      screenOptions={{
        drawerActiveBackgroundColor: '#efefef',
        drawerLabelStyle: {color: '#000', fontWeight: 'bold'},
        headerShown: false,
        drawerItemStyle: {
          borderBottomColor: '#000',
          borderBottomWidth: 2,
        },
        drawerType: 'slide',
        gestureEnabled: false,
        swipeEnabled: false,
      }}>
      <Drawer.Screen name="Controle" component={Control} />
      <Drawer.Screen name="Precisão de controle" component={PrecisionControl} />
      <Drawer.Screen name="Comunicação" component={Communication} />
      <Drawer.Screen name="Calibração" component={CalibrationPage} />
      <Drawer.Screen name="Configuração parâmetros" component={SetParameters} />
      <Drawer.Screen name="Instruções" component={LoadingPage} />
    </Drawer.Navigator>
  </NavigationContainer>
);
