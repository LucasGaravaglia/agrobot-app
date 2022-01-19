import React from 'react';
import Routes from './routes';
import {StatusBar} from 'react-native';
import {DataContextProvider} from './context/dataContext.js';
import {CommunicationProvider} from './context/communication';

export default App = () => (
  <CommunicationProvider>
    <StatusBar barStyle="dark-content" hidden={false} backgroundColor="#fff" />
    <DataContextProvider>
      <Routes />
    </DataContextProvider>
  </CommunicationProvider>
);
