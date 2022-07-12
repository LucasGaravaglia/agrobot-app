import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
// import io from 'socket.io-client';
import {magnetometer} from 'react-native-sensors';
import LPF from 'lpf';

const App = () => {
  const subscription = magnetometer.subscribe(data => {
    let {x, y, z, timestamp} = data;
    let angle;
    if (Math.atan2(y, x) >= 0) {
      angle = Math.atan2(y, x) * (180 / Math.PI);
    } else {
      angle = (Math.atan2(y, x) + 2 * Math.PI) * (180 / Math.PI);
    }
    // angle = angle - 90 >= 0 ? angle - 90 : angle + 271;
    angle = angle - 84;
    if (angle < 0) angle = 360 + angle;
    if (angle >= 90 && angle <= 300) angle = angle - 16;
    console.log(Math.round(LPF.next(angle)));
  });

  // const [client, setClient] = useState(io(''));
  // const [connected, setConnected] = useState(false);

  // const connect = () => {
  //   client.close();
  //   const newClient = io('http://192.168.0.107:3000/%27);
  //   newClient.on('disconnect', () => {
  //     setConnected(false);
  //     console.log('Cliente desconectado');
  //   });

  //   newClient.on('connect', () => {
  //     setConnected(true);
  //     console.log('Cliente conectado');
  //   });

  //   setClient(newClient);
  // };
  // useEffect(() => {
  //   connect();
  // }, []);

  // const emit = () => {
  //   client.emit('auto_mode_params_update', data);
  // };
  return (
    <View>
      <Text>asasa $</Text>
    </View>
  );
};

export default App;
