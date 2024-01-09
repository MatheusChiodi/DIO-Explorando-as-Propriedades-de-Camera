import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';

import CameraView from './src/components/CameraView';

export default function App() {
  const [type, setType] = useState<CameraType>(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [hasCameraPermission, setHasCameraPermission] =
    useState<boolean>(false);
  const [hasMediaPermission, setHasMediaPermission] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(status === 'granted');
    })();
    (async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      setHasMediaPermission(status === 'granted');
    })();
  }, []);

  if (hasCameraPermission === false) {
    return <View />;
  }

  if (hasMediaPermission === false) {
    return <View />;
  }

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
