/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Camera, CameraPermissionStatus} from 'react-native-vision-camera';
import {Navigation} from './src/navigation';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  const [cameraPermission, setCameraPermission] =
    useState<CameraPermissionStatus>();

  useEffect(() => {
    Camera.getCameraPermissionStatus().then(setCameraPermission);
  }, []);

  const showPermissionsPage = cameraPermission !== 'authorized';
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={
          showPermissionsPage
            ? Navigation.permissions.name
            : Navigation.home.name
        }
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen
          name={Navigation.home.name}
          component={Navigation.home.component}
        />
        <Stack.Screen
          name={Navigation.permissions.name}
          component={Navigation.permissions.component}
        />
        <Stack.Screen
          name={Navigation.barcodeScanner.name}
          component={Navigation.barcodeScanner.component}
        />
        <Stack.Screen
          name={Navigation.loading.name}
          component={Navigation.loading.component}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
