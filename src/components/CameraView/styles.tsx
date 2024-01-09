import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
  },
  flipArea: {
    position: 'absolute',
    bottom: 20,
    left: 20,
  },
  flipText: {
    fontSize: 20,
    marginBottom: 13,
    color: 'white',
  },
  takePhoto: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  takePhotoText: {
    fontSize: 20,
    marginBottom: 13,
    color: 'white',
  },
});

export default styles;
