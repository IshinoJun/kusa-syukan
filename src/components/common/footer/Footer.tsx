import { SafeAreaView, StyleSheet, View } from 'react-native';
import React from 'react';

interface Props {
  contents: JSX.Element[];
}

const Footer = ({ contents }: Props): JSX.Element => {
  return (
    <SafeAreaView>
      <View style={styles.container}>{contents.map((content) => content)}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: '#F0F0F0',
    width: '100%',
  },
});

export default Footer;
