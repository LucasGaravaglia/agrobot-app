import React, {useEffect, useRef, useState} from 'react';
import {Text, View} from 'react-native';
import io from 'socket.io-client';
import {
  magnetometer,
  setUpdateIntervalForType,
  SensorTypes,
} from 'react-native-sensors';
import LPF from 'lpf';
setUpdateIntervalForType(SensorTypes.magnetometer, 3000);

const App = () => {
  const connected = useRef(false);

  const subscription = magnetometer.subscribe(({x, y, z, timestamp}) => {
    let angle;
    if (Math.atan2(y, x) >= 0) {
      angle = Math.atan2(y, x) * (180 / Math.PI);
    } else {
      angle = (Math.atan2(y, x) + 2 * Math.PI) * (180 / Math.PI);
    }
    angle = angle - 84;
    if (angle < 0) angle = 360 + angle;
    if (angle >= 90 && angle <= 300) angle = angle - 16;
    // console.log(Math.round(LPF.next(angle)));
    if (connected.current) {
      client.emit('compass_update', Math.round(LPF.next(angle)));
    }
  });
  const [client, setClient] = useState(io(''));

  const connect = () => {
    client.close();
    const newClient = io('http://192.168.1.2:3000');
    newClient.on('disconnect', () => {
      connected.current = false;
      console.log('Cliente desconectado');
    });

    newClient.on('connect', () => {
      connected.current = true;
      console.log('Cliente conectado');
    });

    setClient(newClient);
  };

  useEffect(() => {
    connect();
  }, []);

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text
        style={{
          fontSize: 20,
        }}>
        Bússola
      </Text>
    </View>
  );
};

export default App;
