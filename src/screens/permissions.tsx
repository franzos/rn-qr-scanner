import React, {useCallback, useEffect, useState} from 'react';
import {Button, Linking, Text, View} from 'react-native';
import {Camera, CameraPermissionStatus} from 'react-native-vision-camera';
import {Section} from '../components/section';
import {styles} from '../styles/common';
import {Navigation} from '../navigation';

export const PermissionsScreen = ({navigation}) => {
  const [cameraPermissionStatus, setCameraPermissionStatus] =
    useState<CameraPermissionStatus>('not-determined');

  const requestCameraPermission = useCallback(async () => {
    console.log('Requesting camera permission ...');
    const permission = await Camera.requestCameraPermission();
    console.log(`Camera permission status: ${permission}`);

    if (permission === 'denied') await Linking.openSettings();
    setCameraPermissionStatus(permission);
  }, []);

  const onLoad = async () => {
    const permission = await Camera.getCameraPermissionStatus();
    setCameraPermissionStatus(permission);
  };

  useEffect(() => {
    if (cameraPermissionStatus === 'not-determined') {
      onLoad();
    }
    if (cameraPermissionStatus === 'authorized')
      navigation.replace(Navigation.home.name);
  }, [cameraPermissionStatus, navigation]);

  return (
    <Section title="Permissions">
      <Text style={styles.title}>
        Camera permission status: {cameraPermissionStatus}
      </Text>
      <View style={styles.isCentered}>
        <Button title="Grant permission" onPress={requestCameraPermission} />
      </View>
    </Section>
  );
};
