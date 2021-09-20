import { LayoutChangeEvent, SafeAreaView, StyleSheet, View } from 'react-native';
import React, { useCallback } from 'react';

interface Props {
  contents?: JSX.Element[];
  onChangeFooterHight: (hight: number) => void;
}

const Footer = ({ contents, onChangeFooterHight }: Props): JSX.Element => {
  const getHeight = useCallback(
    (event: LayoutChangeEvent) => {
      onChangeFooterHight(event.nativeEvent.layout.height);
    },
    [onChangeFooterHight],
  );

  return (
    <SafeAreaView style={styles.container} onLayout={getHeight}>
      <View style={styles.content}>{contents?.map((content) => content)}</View>
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
