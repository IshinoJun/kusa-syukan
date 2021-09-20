import { LayoutChangeEvent, SafeAreaView, StyleSheet, View } from 'react-native';
import React, { useCallback } from 'react';

interface Props {
  contents: JSX.Element[];
  onChangeHeaderHight: (hight: number) => void;
}

const Header = ({ contents, onChangeHeaderHight }: Props): JSX.Element => {
  const getHeight = useCallback(
    (event: LayoutChangeEvent) => {
      onChangeHeaderHight(event.nativeEvent.layout.height);
    },
    [onChangeHeaderHight],
  );

  return (
    <SafeAreaView onLayout={getHeight}>
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
