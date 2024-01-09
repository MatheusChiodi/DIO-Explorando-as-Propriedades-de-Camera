import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import CameraView from './src/components/CameraView';

export default function App() {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  const flipCamera = () => {
    setType(type === CameraType.back ? CameraType.front : CameraType.back);
  };

  return (
    <View style={styles.container}>
      <CameraView type={type} onFlipCamera={flipCamera} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
