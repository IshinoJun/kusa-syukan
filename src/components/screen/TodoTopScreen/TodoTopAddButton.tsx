import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import HomeScreenProp from '../../../models/HomeScreenProp';
import AddButton from '../../common/button/AddButton';

const TodoTopAddButton = (): JSX.Element => {
  const navigation = useNavigation<HomeScreenProp>();

  const handlePress = () => {
    navigation.navigate('TodoSetting');
  };

  return (
    <View style={styles.wrapper}>
      <AddButton onPress={handlePress} />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginRight: 12,
  },
});

export default TodoTopAddButton;
