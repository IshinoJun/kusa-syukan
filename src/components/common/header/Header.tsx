import { SafeAreaView, StyleSheet, View } from 'react-native';
import React from 'react';

interface Props {
  contents: JSX.Element[];
}

const Header = ({ contents }: Props): JSX.Element => {
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
    padding: 16,
    backgroundColor: '#F0F0F0',
  },
});

export default Header;
