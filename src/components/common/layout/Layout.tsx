import { ScrollView, StyleSheet, View } from 'react-native';
import React from 'react';
import Header from '../header/Header';
import Footer from '../footer/Footer';

interface Props {
  headerContents: JSX.Element[];
  footerContents: JSX.Element[];
  children: React.ReactNode;
}

const Layout = ({ headerContents, children, footerContents }: Props): JSX.Element => {
  return (
    <View style={styles.container}>
      <Header contents={headerContents} />
      <ScrollView>{children}</ScrollView>
      <Footer contents={footerContents} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Layout;
