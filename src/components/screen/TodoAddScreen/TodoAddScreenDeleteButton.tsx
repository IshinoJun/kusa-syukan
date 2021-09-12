import React from 'react';
import { View, StyleSheet, TouchableOpacity, GestureResponderEvent } from 'react-native';

interface Props {
  onPress?: (event: GestureResponderEvent) => void;
}

const TodoAddScreenDeleteButton = ({ onPress }: Props): JSX.Element => {
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity onPress={onPress}>
        <View>削除</View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginRight: 12,
  },
});

export default TodoAddScreenDeleteButton;
