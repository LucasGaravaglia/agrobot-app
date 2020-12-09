import {StyleSheet, Dimensions} from 'react-native';

const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;
export default StyleSheet.create({
  title: {
    fontSize: 30,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
    paddingTop: heightScreen * 0.05,
  },
  inputText: {
    borderWidth: 1,
    width: widthScreen * 0.8,
    marginBottom: heightScreen * 0.01,
    borderRadius: 15,
  },
  buttonSave: {
    width: widthScreen * 0.5,
    height: heightScreen * 0.1,
  },
  textButtonSave: {
    fontSize: 15,
  },
});
