import React, { useRef, useState } from 'react';
import { View, TouchableOpacity, Text, Modal, Image } from 'react-native';
import { Camera, FlashMode, AutoFocus } from 'expo-camera';
import CameraViewProps from './interfaces/CameraViewProps';
import * as MediaLibrary from 'expo-media-library';

import styles from './styles';

export default function CameraView({ type, onFlipCamera }: CameraViewProps) {
  const camRef = useRef<Camera>(null);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  async function takePicture() {
    if (camRef && camRef.current) {
      const data = await camRef.current.takePictureAsync();
      setModalIsOpen(true);
      setCapturedPhoto(data.uri);
    }
  }

  async function savePicture() {
    if (capturedPhoto != null) {
      await MediaLibrary.saveToLibraryAsync(capturedPhoto).then(() => {
        setModalIsOpen(false);
        setCapturedPhoto(null);
      });
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

      {capturedPhoto && (
        <Modal animationType="slide" transparent={false} visible={modalIsOpen}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              margin: 20,
            }}
          >
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              <TouchableOpacity
                style={{ margin: 10 }}
                onPress={() => setModalIsOpen(false)}
              >
                <Text style={{ fontSize: 20 }}>Close</Text>
              </TouchableOpacity>

              <TouchableOpacity style={{ margin: 10 }} onPress={savePicture}>
                <Text style={{ fontSize: 20 }}>Save</Text>
              </TouchableOpacity>
            </View>

            <Image
              style={{ width: '100%', height: 300, borderRadius: 20 }}
              source={{ uri: capturedPhoto }}
            />
          </View>
        </Modal>
      )}
    </Camera>
  );
}
