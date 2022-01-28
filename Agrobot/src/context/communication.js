import React, {useState, useEffect, createContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import io from 'socket.io-client';

export const CommunicationContext = createContext({});

export function CommunicationProvider({children}) {
  const [address, setAddress] = useState('192.168.1.2');
  const [port, setPort] = useState('3000');
  const [connected, setConnected] = useState(false);
  const [client, setClient] = useState(io(''));

  const sendControl = (data) => {
    if (connected) {
      client.emit('control_update', data);
    }
  };

  const sendWheelAdjustment = (data) => {
    if (connected) {
      client.emit('manual_wheel_adjustment_update', data);
    }
  };

  const sendAutoModeParams = (data) => {
    if (connected) {
      client.emit('auto_mode_params_update', data);
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
    setAddress(value);
    await AsyncStorage.setItem('address', value);
  };

  const updatePort = async (value) => {
    setPort(value);
    await AsyncStorage.setItem('port', value);
  };

  const connect = () => {
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

    setClient(newClient);
  };

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
        address,
        port,
        updateAddress,
        updatePort,
        sendControl,
        connected,
        sendWheelAdjustment,
      }}>
      {children}
    </CommunicationContext.Provider>
  );
}
