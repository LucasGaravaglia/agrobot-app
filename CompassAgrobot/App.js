import React, {useEffect, useRef, useState} from 'react';
import {Text, View, TextInput} from 'react-native';
import io from 'socket.io-client';
import {
  magnetometer,
  setUpdateIntervalForType,
  SensorTypes,
  gyroscope,
} from 'react-native-sensors';
import LPF from 'lpf';
setUpdateIntervalForType(SensorTypes.magnetometer, 300);
setUpdateIntervalForType(SensorTypes.gyroscope, 300);

const App = () => {
  const connected = useRef(false);
  const subscriptionMagnetometer = magnetometer.subscribe(
    ({x, y, z, timestamp}) => {
      let angle;
      angle = Math.atan2(y, x) * (180 / Math.PI);
      angle = angle - 84;
      if (angle < 0) angle = 360 + angle;
      // if (angle >= 90 && angle <= 300) angle = angle - 16;
      console.log(Math.round(LPF.next(angle)));
      if (connected.current) {
        client.emit('compass_update', Math.round(LPF.next(angle)));
      }
    },
  );

  const subscriptionGyroscope = gyroscope.subscribe(({x, y, z, timestamp}) => {
    if (connected.current) {
      client.emit('gyroscope_update', z);
    }
  });

  const [client, setClient] = useState(io(''));
  const [ip, setIp] = useState('http://192.168.1.2:3000');

  const connect = () => {
    client.close();
    const newClient = io(ip);
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

      <TextInput
        style={{width: 250, borderWidth: 1, borderRadius: 45}}
        placeholder={'IP: http://192.168.1.2:3000'}
        onEndEditing={text => {
          if (text.nativeEvent.text != '') setIp(text.nativeEvent.text);
        }}
        keyboardType="string"
      />
    </View>
  );
};

export default App;
