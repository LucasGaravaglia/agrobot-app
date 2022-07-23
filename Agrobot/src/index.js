import React from 'react';
import Routes from './routes';
import {StatusBar, LogBox} from 'react-native';
import {DataContextProvider} from './context/dataContext.js';
import {CommunicationProvider} from './context/communication';

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

export default App = () => (
  <CommunicationProvider>
    <StatusBar barStyle="dark-content" hidden={false} backgroundColor="#fff" />
    <DataContextProvider>
      <Routes />
    </DataContextProvider>
  </CommunicationProvider>
);
