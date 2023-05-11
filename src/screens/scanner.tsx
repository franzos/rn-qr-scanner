import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {runOnJS} from 'react-native-reanimated';
import {
  useCameraDevices,
  useFrameProcessor,
  Camera,
} from 'react-native-vision-camera';
import {BarcodeFormat, scanCodes, Barcode} from 'vision-camera-code-scanner';
import {styles} from '../styles/common';
import {LoadingScreen} from './loading';

export const BarcodeScannerScreen = () => {
  const devices = useCameraDevices();
  const device = devices.back;
  const [barcodes, setBarcodes] = React.useState<Barcode[]>([]);

  const frameProcessor = useFrameProcessor(frame => {
    'worklet';
    const data = scanCodes(frame, [BarcodeFormat.ALL_FORMATS], {
      checkInverted: true,
    });
    runOnJS(setBarcodes)(data);
  }, []);

  React.useEffect(() => {
    console.log(barcodes);
  }, [barcodes]);

  if (device == null) return LoadingScreen();
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
  );
};
