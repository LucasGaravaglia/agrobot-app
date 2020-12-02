import React, {
  createContext,
  useState,
  useEffect,
  useRef,
  useContext,
} from 'react';
import {CommunicationContext} from './communication';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';

export const DataContext = createContext();

export const DataContextProvider = ({children}) => {
  const {sendControl, sendAutoModeParams, connected} = useContext(
    CommunicationContext,
  );

  const steer = useRef(0);
  const speed = useRef(0);
  const [limit, setLimit] = useState(0);
  const [moduleRobot, setModuleRobot] = useState(false);
  const [autoMode, setAutoMode] = useState(false);
  const [power, setPower] = useState(false);
  const [autoModeData, setAutoModeData] = useState(defaultAutoModeData);

  const handleModuleRobotSwitch = () => {
    if (connected) {
      setModuleRobot(!moduleRobot);
    }
  };

  const handlePowerSwitch = () => {
    if (connected) {
      setPower(!power);
    }
  };

  const handleAutoModeSwitch = () => {
    if (connected) {
      setAutoMode(!autoMode);
    }
  };

  function handleSendData() {
    sendControl({
      limit,
      moduleRobot,
      autoMode,
      power,
      steer: steer.current,
      speed: speed.current,
    });
  }

  async function loadDataFromStorage() {
    try {
      const autoModeDataStorage = await AsyncStorage.getItem('autoModeData');
      if (autoModeDataStorage) {
        const obj = JSON.parse(autoModeDataStorage);
        setAutoModeData(obj);
      }
    } catch (e) {
      Alert.alert('Erro', 'Erro ao carregar os dados.\n' + e);
    }
  }

  async function updateModeData(data) {
    try {
      const str = JSON.stringify(data);
      await AsyncStorage.setItem('autoModeData', str);
      setAutoModeData(data);
      Alert.alert('Sucesso', 'As informações foram salvas com êxito.');
    } catch (e) {
      Alert.alert('Erro', 'Erro ao salvar os dados.\n' + e);
    }
  }

  useEffect(() => {
    handleSendData();
  }, [limit, moduleRobot, autoMode, power]);

  useEffect(() => {
    sendAutoModeParams(autoModeData);
  }, [autoMode, autoModeData]);

  useEffect(() => {
    loadDataFromStorage();
  }, []);

  return (
    <DataContext.Provider
      value={{
        handleModuleRobotSwitch,
        handleAutoModeSwitch,
        handlePowerSwitch,
        setLimit,
        moduleRobot,
        limit,
        autoMode,
        power,
        steer,
        speed,
        send: handleSendData,
        updateModeData,
        autoModeData,
      }}>
      {children}
    </DataContext.Provider>
  );
};

const defaultAutoModeData = {
  limit: '50',
  steer: '-2',
  speed: '-26',
  correctionsMovements: '5',
  correctionFactor: '15',
  detectDistance: '1.5',
  moveTime: '0',
  stopTime: '0',
  moduleRobot: true,
  autoMode: false,
};
