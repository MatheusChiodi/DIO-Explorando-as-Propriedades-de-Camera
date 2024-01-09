import React, { useRef, useState } from 'react';
import { View, TouchableOpacity, Text, Modal, Image } from 'react-native';
import { Camera, FlashMode, AutoFocus, ImageType } from 'expo-camera';
import CameraViewProps from './interfaces/CameraViewProps';
import * as MediaLibrary from 'expo-media-library';

import styles from './styles';

export default function CameraView({ type, onFlipCamera }: CameraViewProps) {
  const camRef = useRef<Camera>(null);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  async function takePicture() {
    const options = { quality: 1, imageType: ImageType.png };

    if (camRef && camRef.current) {
      const data = await camRef.current.takePictureAsync(options);
      setModalIsOpen(true);
      setCapturedPhoto(data.uri);
    }
  }

  async function savePicture() {
    if (capturedPhoto != null) {
      await saveToAlbum(capturedPhoto, 'ExplorandoAppDeCamera')
    }
  }

  async function saveToAlbum(uri: string, album: string) {
    const asset = await MediaLibrary.createAssetAsync(uri);
    await MediaLibrary.createAlbumAsync(album, asset);
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
              style={{ width: '100%', height: 450, borderRadius: 20 }}
              source={{ uri: capturedPhoto }}
            />
          </View>
        </Modal>
      )}
    </Camera>
  );
}
