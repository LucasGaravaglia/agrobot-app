import React, {
  createContext,
  useState,
  useEffect,
  useRef,
  useContext,
} from 'react';
import {CommunicationContext} from './communication';

export const DataContext = createContext({});

export const DataContextProvider = ({children}) => {
  const {sendControl, sendAutoModeParams, connected} = useContext(
    CommunicationContext,
  );
  const [steer, setSteer] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [limit, setLimit] = useState(50);
  const [power, setPower] = useState(false);
  const [autoMode, setAutoMode] = useState(false);
  const [moduleRobot, setModuleRobot] = useState(false);
  const [autoModeData, setAutoModeData] = useState(defaultAutoModeData);

  const handleModuleRobotSwitch = () => {
    if (connected) {
      setModuleRobot(!moduleRobot);
      handleAutoModeData();
    }
  };

  const handlePowerSwitch = () => {
    if (connected) {
      setPower(!power);
    }
  };

  const handleAutoModeSwitch = () => {
    if (connected) {
      handleAutoModeData(true);
      setAutoMode(!autoMode);
    }
  };

  function handleSendData() {
    sendControl({
      limit: limit / 100,
      moduleRobot,
      autoMode,
      power,
      steer,
      speed,
    });
  }

  function handleAutoModeData(flag = false) {
    var obj = {};
    if (flag) {
      obj = {
        limit: autoModeData.limit,
        steer: autoModeData.steer,
        speed: autoModeData.speed,
        correctionsMovements: autoModeData.correctionsMovements,
        correctionFactor: autoModeData.correctionFactor,
        detectDistance: autoModeData.detectDistance,
        moveTime: autoModeData.moveTime,
        stopTime: autoModeData.stopTime,
        moduleRobot: moduleRobot,
        autoMode: !autoMode,
      };
    } else {
      obj = {
        limit: autoModeData.limit,
        steer: autoModeData.steer,
        speed: autoModeData.speed,
        correctionsMovements: autoModeData.correctionsMovements,
        correctionFactor: autoModeData.correctionFactor,
        detectDistance: autoModeData.detectDistance,
        moveTime: autoModeData.moveTime,
        stopTime: autoModeData.stopTime,
        moduleRobot: moduleRobot,
        autoMode: autoMode,
      };
    }
    setAutoModeData(obj);
  }

  useEffect(() => {
    handleSendData();
  }, [limit, moduleRobot, power, speed, steer]);

  useEffect(() => {
    sendAutoModeParams(autoModeData);
  }, [autoMode]);

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
        setSteer,
        setSpeed,
        send: handleSendData,
        autoModeData,
        setAutoMode,
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
  moduleRobot: false,
  autoMode: false,
};
