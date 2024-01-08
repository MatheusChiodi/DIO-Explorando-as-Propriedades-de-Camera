import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Camera, CameraType } from 'expo-camera';

export default function App() {
  const [type, setType] = useState<CameraType>(CameraType.back);
  const [permission, setPermission] = Camera.useCameraPermissions();

  return (
    <View style={styles.container}>
      <Camera type={type}></Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
