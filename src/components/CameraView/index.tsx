import React, { useEffect, useRef, useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Camera, FlashMode, AutoFocus } from 'expo-camera';
import CameraViewProps from './interfaces/CameraViewProps';

import styles from './styles';

export default function CameraView({ type, onFlipCamera }: CameraViewProps) {
  const camRef = useRef<Camera>(null);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);

  async function takePicture() {
    if (camRef && camRef.current) {
      const data = await camRef.current.takePictureAsync();
      setCapturedPhoto(data.uri);
    }
  }

  return (
    <Camera
      style={{ flex: 1 }}
      type={type}
      ratio={'16:9'}
      zoom={0}
      flashMode={FlashMode.off}
      autoFocus={AutoFocus.on}
      ref={camRef}
    >
      <View style={styles.mainView}>
        <TouchableOpacity style={styles.flipArea} onPress={onFlipCamera}>
          <Text style={styles.flipText}>Flip Camera</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.takePhoto} onPress={takePicture}>
          <Text style={styles.takePhotoText}>Take Picture</Text>
        </TouchableOpacity>
      </View>
    </Camera>
  );
}
