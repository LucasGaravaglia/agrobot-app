import React from 'react';

import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';

import Control from './pages/Control';
import Communication from './pages/Communication';
import SetAutoParameters from './pages/SetAutoParameters';
import LoadingPage from './pages/LoadingPage';
import PrecisionControl from './pages/PrecisionControl';

const Drawer = createDrawerNavigator();

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
      <Drawer.Screen
        name="Configuração parâmetros"
        component={SetAutoParameters}
      />
      <Drawer.Screen name="Instruções" component={LoadingPage} />
    </Drawer.Navigator>
  </NavigationContainer>
);
