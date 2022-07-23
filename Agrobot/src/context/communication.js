import React, {useState, useEffect, createContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import io from 'socket.io-client';
import DocumentPicker from 'react-native-document-picker';

export const CommunicationContext = createContext({});

export function CommunicationProvider({children}) {
  const [address, setAddress] = useState('192.168.1.2');
  const [port, setPort] = useState('3000');
  const [connected, setConnected] = useState(false);
  const [client, setClient] = useState(io(''));

  const sendMission = () => {
    if (connected) {
      try {
        DocumentPicker.pick({
          type: [DocumentPicker.types.plainText],
        }).then((data) => {
          let frmData = new FormData();
          frmData.append('file', data[0]);
          // const blob = new Blob([data], { type: "text/json" });
          console.log(frmData);
          client.emit('mission_update', data);
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  const sendControl = (data) => {
    if (connected) client.emit('control_update', data);
  };

  const sendWheelAdjustment = (data) => {
    if (connected) client.emit('manual_wheel_adjustment_update', data);
  };

  const sendPowerMotor = (data) => {
    if (connected) client.emit('power_motor', data);
  };

  const sendModuleIsActivated = (data) => {
    if (connected) client.emit('module_activated', data);
  };

  const sendAutoModeParams = (data) => {
    if (connected) client.emit('auto_mode_params_update', data);
  };

  const sendAutoModeActivated = (data) => {
    if (connected) client.emit('auto_mode_activated', data);
  };

  const sendTypeModuleControl = (data) => {
    if (connected) client.emit('control_mode_update', data);
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
      if (client.connected) client.close();
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
        connected,
        sendControl,
        sendWheelAdjustment,
        sendPowerMotor,
        sendModuleIsActivated,
        sendAutoModeActivated,
        sendTypeModuleControl,
        sendMission,
      }}>
      {children}
    </CommunicationContext.Provider>
  );
}
