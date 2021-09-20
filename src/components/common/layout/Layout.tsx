import { ScrollView, StyleSheet, useWindowDimensions, View } from 'react-native';
import React, { useState } from 'react';
import Header from '../header/Header';
import Footer from '../footer/Footer';

interface Props {
  headerContents: JSX.Element[];
  footerContents?: JSX.Element[];
  children: React.ReactNode;
}

const Layout = ({ headerContents, children, footerContents }: Props): JSX.Element => {
  const [headerHight, setHeaderHight] = useState<number | null>(null);
  const [footerHight, setFooterHight] = useState<number | null>(null);
  const dimensions = useWindowDimensions();

  return (
    <View style={styles.container}>
      <Header contents={headerContents} onChangeHeaderHight={setHeaderHight} />
      <View style={{ height: dimensions.height - (footerHight ?? 0) - (headerHight ?? 0) }}>
        {children}
      </View>
      <Footer contents={footerContents} onChangeFooterHight={setFooterHight} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
});

export default Layout;
