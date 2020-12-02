import React, {createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import io from 'socket.io-client';

export const CommunicationContext = createContext();

export const CommunicationProvider = ({children}) => {
  const [address, setAddress] = useState('192.168.0.109');
  const [port, setPort] = useState('3000');
  const [connected, setConnected] = useState(false);
  const [client, setClient] = useState(io(''));

  const sendControl = (data) => {
    if (connected) {
      client.emit('control_update', data);
    }
  };

  const sendAutoModeParams = (data) => {
    if (connected) {
      client.emit('auto_mode_params_update', {
        data,
      });
    }
  };

  const loadInitialConfig = async () => {
    const addressStr = await AsyncStorage.getItem('address');
    const portStr = await AsyncStorage.getItem('port');
    if (addressStr && portStr) {
      setAddress(addressStr);
      setPort(portStr);
    }
  };

  const updateAddress = async (value) => {
    await AsyncStorage.setItem('address', value);
    setAddress(value);
  };

  const updatePort = async (value) => {
    await AsyncStorage.setItem('port', value);
    setPort(value);
  };

  function connect() {
    client.close();
    const newClient = io(`http://${address}:${port}`);

    newClient.on('disconnect', () => {
      setConnected(false);
      console.log('Cliente desconectado');
    });

    newClient.on('connect', () => {
      setConnected(true);
      console.log('Cliente conectado');
    });

    newClient.on('data_from_robot', (data) => {
      console.log('Message from robot');
      console.log(data);
    });

    setClient(newClient);
  }

  useEffect(() => {
    loadInitialConfig();
    return () => {
      if (client.connected) {
        client.close();
      }
    };
  }, []);

  useEffect(() => {
    connect();
  }, [address, port]);

  return (
    <CommunicationContext.Provider
      value={{
        sendAutoModeParams,
        sendControl,
        address,
        port,
        updateAddress,
        updatePort,
        connected,
      }}>
      {children}
    </CommunicationContext.Provider>
  );
};
