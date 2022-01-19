import {StyleSheet, Dimensions} from 'react-native';

const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;

export default StyleSheet.create({
  container: {
    width: 250,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },

  slider: {
    width: 200,
  },
});
