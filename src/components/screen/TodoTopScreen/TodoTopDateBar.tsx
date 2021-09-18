import AntDesign from '@expo/vector-icons/build/AntDesign';
import { format } from 'date-fns';
import React from 'react';
import { TouchableOpacity, View, StyleSheet, Text } from 'react-native';

interface Props {
  currentDate: Date;
  onClickNextDate: () => void;
  onClickPrevDate: () => void;
}

const TodoTopDateBar = ({ currentDate, onClickNextDate, onClickPrevDate }: Props): JSX.Element => {
  return (
    <View style={styles.dateBar}>
      <TouchableOpacity style={styles.arrow} onPress={onClickPrevDate}>
        <AntDesign name="left" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.date}>{format(currentDate, 'M月dd日')}</Text>
      <TouchableOpacity style={styles.arrow} onPress={onClickNextDate}>
        <AntDesign name="right" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  dateBar: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    paddingTop: 4,
    paddingHorizontal: 16,
  },
  date: {
    fontSize: 16,
    textAlign: 'center',
  },
  arrow: {
    width: 44,
    height: 31,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
  },
});

export default TodoTopDateBar;
