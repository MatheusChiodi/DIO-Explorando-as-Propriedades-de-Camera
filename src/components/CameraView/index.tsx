import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Camera, FlashMode, AutoFocus } from 'expo-camera';
import CameraViewProps from './interfaces/CameraViewProps';

import styles from './styles';

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
        <TouchableOpacity style={styles.flipArea} onPress={onFlipCamera}>
          <Text style={styles.flipText}>Flip Camera</Text>
        </TouchableOpacity>
      </View>
    </Camera>
  );
}
