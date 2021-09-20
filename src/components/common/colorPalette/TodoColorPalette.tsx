import React, { useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { CheckBox } from 'react-native-elements';
import TodoValue from '../../../models/TodoValue';

interface Props {
  todoValue: TodoValue;
  onChangeTodoValue: (nextTodoValue: TodoValue) => void;
}

const COLOR_LIST = [
  '#EB5757',
  '#F2994A',
  '#F2C94C',
  '#219653',
  '#27AE60',
  '#2F80ED',
  '#56CCF2',
  '#9B51E0',
] as const;

const TodoColorPalette = ({ todoValue, onChangeTodoValue }: Props): JSX.Element => {
  const handlePressCheck = useCallback(
    (color: string) => {
      onChangeTodoValue({ ...todoValue, color });
    },
    [onChangeTodoValue, todoValue],
  );

  return (
    <View style={styles.wrapper}>
      {COLOR_LIST.map((color, i) => (
        <CheckBox
          key={color}
          size={36}
          containerStyle={{
            padding: 0,
            margin: 0,
            marginLeft: COLOR_LIST.length !== i ? 5 : 0,
            marginRight: 0,
          }}
          checkedIcon="check-square"
          uncheckedIcon="square"
          checkedColor={color}
          uncheckedColor={color}
          checked={todoValue.color === color}
          onPress={() => handlePressCheck(color)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default TodoColorPalette;
