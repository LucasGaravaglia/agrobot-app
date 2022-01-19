import {StyleSheet, Dimensions} from 'react-native';

const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    height: '100%',
  },
  containerContent: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  joystickContainer: {
    height: 200,
    width: 200,
    alignItems: 'center',
    flexDirection: 'column-reverse',
    justifyContent: 'space-around',
  },
  slider: {
    width: 200,
  },
  sliderContainer: {
    width: 200,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    // backgroundColor: '#fff',
  },
  groupControllerContainer: {
    height: '90%',
    alignItems: 'center',
    justifyContent: 'space-around',
    // backgroundColor: '#fff',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: '2%',
    width: 80,
    // backgroundColor: '#fff',
  },
  buttonIcon: {
    width: 60,
    height: 60,
  },
  textSlider: {
    alignItems: 'center',
  },
  buttonMenu: {
    borderWidth: 0,
    marginLeft: 8,
    marginTop: 8,
  },
  header: {
    width: widthScreen,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
});
