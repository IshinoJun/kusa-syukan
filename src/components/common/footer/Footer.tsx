import { SafeAreaView, StyleSheet, View } from 'react-native';
import React from 'react';

interface Props {
  contents: JSX.Element[];
}

const Footer = ({ contents }: Props): JSX.Element => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>{contents.map((content) => content)}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#F0F0F0',
  },
  content: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: '#F0F0F0',
  },
});

export default Footer;
