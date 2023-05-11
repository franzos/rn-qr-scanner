import React, {PropsWithChildren} from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import {styles} from '../styles/common';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

export function Section({children, title}: SectionProps): JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.sectionTitle}>{title}</Text>
        <View>{children}</View>
      </View>
    </SafeAreaView>
  );
}
