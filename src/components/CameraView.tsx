import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Camera, FlashMode, AutoFocus, CameraType } from 'expo-camera';
import CameraViewProps from '../interfaces/CameraViewProps';

export default function CameraView({ type, onFlipCamera }: CameraViewProps) {
  return (
    <Camera
      style={{ flex: 1 }}
      type={type}
      ratio={'16:9'}
      zoom={0}
      flashMode={FlashMode.off}
      autoFocus={AutoFocus.on}
    >
      <View style={styles.mainView}>
        <TouchableOpacity style={styles.flipArea} onPress={() => onFlipCamera}>
          <Text style={styles.flipText}>Flip Camera</Text>
        </TouchableOpacity>
      </View>
    </Camera>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
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
});
