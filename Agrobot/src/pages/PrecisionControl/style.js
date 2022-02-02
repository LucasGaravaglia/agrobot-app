import {StyleSheet} from 'react-native';

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
    height: 250,
    width: 250,
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
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1%',
    width: 80,
    height: 300,
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
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  text: {
    fontFamily: 'sans-serif-light',
    fontWeight: 'bold',
    fontSize: 9,
  },
});
