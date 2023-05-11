/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useCallback, useEffect, useState } from 'react';
import type {PropsWithChildren} from 'react';
import {
  Button,
  Linking,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Camera, CameraPermissionStatus, useCameraDevices, useFrameProcessor } from 'react-native-vision-camera';
import { BarcodeFormat, scanCodes, Barcode } from 'vision-camera-code-scanner';
import { runOnJS } from 'react-native-reanimated';

const Stack = createNativeStackNavigator();

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): JSX.Element {
  return (
    <View style={styles.sectionContainer}>
      <Text>
        {title}
      </Text>
      <Text>
        {children}
      </Text>
    </View>
  );
}

// SCREENS

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <Section title="For this to work, you will need a QR code to scan :)">
            <Button
              title="Open QR Scanner"
              onPress={() =>
                navigation.navigate('BarcodeScanner')
              }
            />
          </Section>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const LoadingScreen = () => {
  return <Text>Loading ...</Text>;
};

const PermissionsScreen = ({ navigation }) => {
  const [cameraPermissionStatus, setCameraPermissionStatus] = useState<CameraPermissionStatus>('not-determined');

  const requestCameraPermission = useCallback(async () => {
    console.log('Requesting camera permission...');
    const permission = await Camera.requestCameraPermission();
    console.log(`Camera permission status: ${permission}`);

    if (permission === 'denied') await Linking.openSettings();
    setCameraPermissionStatus(permission);
  }, []);

  useEffect(() => {
    if (cameraPermissionStatus === 'authorized') navigation.replace('Home');
  }, [cameraPermissionStatus, navigation]);

  return (
    <Section title="Permissions">
      <Text>Camera permission status: {cameraPermissionStatus}</Text>
      {cameraPermissionStatus !== 'authorized' && (
          <>
            <Text>
              Vision Camera needs Camera permission
            </Text>
            <Button
                title="Grant permission"
                onPress={requestCameraPermission}
              />
          </>
            
        )}
      </Section>
    )
  }

const BarcodeScannerScreen = () => {
  const devices = useCameraDevices()
  const device = devices.back
  const [barcodes, setBarcodes] = React.useState<Barcode[]>([]);

  const frameProcessor = useFrameProcessor((frame) => {
    'worklet';
    const data = scanCodes(frame, [BarcodeFormat.ALL_FORMATS], {
      checkInverted: true,
    });
    runOnJS(setBarcodes)(data);
  }, []);

  React.useEffect(() => {
    console.log(barcodes);
  }, [barcodes]);
    
  if (device == null) return LoadingScreen()
  return (
    <>
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        frameProcessor={frameProcessor}
        frameProcessorFps={5}
      />
      {barcodes.map((barcode, idx) => (
        <Text key={idx} style={styles.barcodeTextURL}>
          {barcode.displayValue}
        </Text>
      ))}
    </>
  )
};

function App(): JSX.Element {
  const [cameraPermission, setCameraPermission] = useState<CameraPermissionStatus>();

  useEffect(() => {
    Camera.getCameraPermissionStatus().then(setCameraPermission);
  }, []);

  const showPermissionsPage = cameraPermission !== 'authorized';
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={showPermissionsPage ? 'PermissionsScreen' : 'Home'}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen name="PermissionsScreen" component={PermissionsScreen} />
        <Stack.Screen name="BarcodeScanner" component={BarcodeScannerScreen} />
        <Stack.Screen name="Loading" component={LoadingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  barcodeTextURL: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default App;
