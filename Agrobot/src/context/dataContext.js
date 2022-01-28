import React, {createContext, useState, useContext} from 'react';
import {CommunicationContext} from './communication';

export const DataContext = createContext({});

export const DataContextProvider = ({children}) => {
  const {
    sendPowerMotor,
    sendModuleIsActivated,
    sendAutoModeActivated,
    sendAutoModeParams,
    connected,
  } = useContext(CommunicationContext);
  const [limit, setLimit] = useState(50);
  const [power, setPower] = useState(false);
  const [autoMode, setAutoMode] = useState(false);
  const [moduleRobot, setModuleRobot] = useState(false);
  const [autoModeData, setAutoModeData] = useState(defaultAutoModeData);

  const handleModuleRobotSwitch = () => {
    if (connected) {
      setModuleRobot(!moduleRobot);
      sendModuleIsActivated(!moduleRobot);
      console.log(
        `LOG: Modulo do robô foi ${!moduleRobot ? 'ativado' : 'desativado'}`,
      );
    }
  };

  const handlePowerSwitch = () => {
    if (connected) {
      setPower(!power);
      sendPowerMotor(!power);
      console.log(
        `LOG: Motores do robô foram ${!power ? 'ligados' : 'desligados'}`,
      );
    }
  };

  const handleAutoModeSwitch = (data) => {
    if (connected) {
      if (data) {
        setAutoMode(!autoMode);
        sendAutoModeActivated(!autoMode);
        console.log(
          `LOG: Modo autônomo foi ${!autoMode ? 'ligado' : 'desligado'}`,
        );
      } else {
        setAutoMode(false);
        sendAutoModeActivated(false);
        console.log(
          `LOG: Modo autônomo foi ${!autoMode ? 'ligado' : 'desligado'}`,
        );
      }
    }
  };

  const updateAutoModeData = (data) => {
    setAutoModeData(data);
    sendAutoModeParams(data);
  };

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
        autoModeData,
        setAutoModeData: updateAutoModeData,
      }}>
      {children}
    </DataContext.Provider>
  );
};

const defaultAutoModeData = {
  correctionsMovements: '5',
  correctionFactor: '15',
  detectDistance: '1.5',
  moveTime: '0',
  stopTime: '0',
};
