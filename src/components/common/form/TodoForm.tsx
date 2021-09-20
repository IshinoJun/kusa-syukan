import React, { useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input } from 'react-native-elements';
import TodoValue from '../../../models/TodoValue';
import TodoCalender from '../calender/TodoCalender';
import TodoColorPalette from '../colorPalette/TodoColorPalette';

interface Props {
  todoValue: TodoValue;
  onChangeTodoValue: (nextTodoValue: TodoValue) => void;
  currentDate: Date;
  onChangeCurrentDate: (nextCurrentDate: Date) => void;
}

const TodoForm = ({
  todoValue,
  onChangeTodoValue,
  currentDate,
  onChangeCurrentDate,
}: Props): JSX.Element => {
  const handleChangeTodoName = useCallback(
    (name: string) => {
      onChangeTodoValue({ ...todoValue, name });
    },
    [todoValue, onChangeTodoValue],
  );

  return (
    <View>
      <View style={styles.topContainer}>
        <Input
          placeholder="タスク名"
          style={styles.input}
          inputContainerStyle={styles.inputContainer}
          onChangeText={handleChangeTodoName}
          value={todoValue.name}
        />
        <View style={styles.colorPaletteContainer}>
          <TodoColorPalette todoValue={todoValue} onChangeTodoValue={onChangeTodoValue} />
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <TodoCalender
          currentDate={currentDate}
          onChangeCurrentDate={onChangeCurrentDate}
          todoValue={todoValue}
          onChangeTodoValue={onChangeTodoValue}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topContainer: { paddingHorizontal: 24, paddingBottom: 9, backgroundColor: '#FFF' },
  colorPaletteContainer: { paddingTop: 45 },
  bottomContainer: { paddingTop: 12 },
  input: { marginTop: 16 },
  inputContainer: { borderBottomWidth: 0 },
});

export default TodoForm;
