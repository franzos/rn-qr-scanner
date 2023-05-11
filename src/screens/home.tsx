import React from 'react';
import {View, Button, Text} from 'react-native';
import {Section} from '../components/section';
import {Navigation} from '../navigation';
import {styles} from '../styles/common';

export const HomeScreen = ({navigation}) => {
  return (
    <Section title="Welcome">
      <>
        <Text style={styles.title}>Got a QR code handy?</Text>
        <View style={styles.isCentered}>
          <Button
            title="Open QR Scanner"
            onPress={() => navigation.navigate(Navigation.barcodeScanner.name)}
          />
        </View>
      </>
    </Section>
  );
};
