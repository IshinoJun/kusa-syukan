import { useNavigation } from '@react-navigation/core';
import React, { useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AddButton from '../components/common/button/AddButton';
import Layout from '../components/common/layout/Layout';
import HomeScreenProp from '../models/HomeScreenProp';

const TodoHomeScreen = (): JSX.Element => {
  const navigation = useNavigation<HomeScreenProp>();
  const handlePressAddButton = useCallback(() => {
    navigation.navigate('TodoAdd');
  }, [navigation]);

  const headerContents = [
    <Text style={styles.headerTitle} key={0}>
      Daily Todo
    </Text>,
    <AddButton key={1} onPress={handlePressAddButton} />,
  ];

  const footerContents = [
    <Text key={0}>今日</Text>,
    <Text key={1}>今日</Text>,
    <Text key={2}>今日</Text>,
  ];

  return (
    <Layout headerContents={headerContents} footerContents={footerContents}>
      <View style={styles.content}>
        <Text>TodoHomeScreen</Text>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  headerTitle: {
    fontFamily: 'BalooChettan2_700Bold',
    fontSize: 17,
  },
  content: {
    height: 1000,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TodoHomeScreen;
