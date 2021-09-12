import { StyleSheet, TouchableOpacity, View, Image, GestureResponderEvent } from 'react-native';
import React from 'react';

interface Props {
  onPress: (event: GestureResponderEvent) => void;
}

const AddButton = ({ onPress }: Props): JSX.Element => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.addButton}>
        <Image source={require('../../../../assets/add.png')} style={styles.image} />
      </View>
    </TouchableOpacity>
  );
};

export default AddButton;

const styles = StyleSheet.create({
  addButton: {
    paddingVertical: 15,
    paddingHorizontal: 17,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    backgroundColor: '#F0F0F0',
  },
  image: {
    width: 15,
    height: 15,
  },
});
