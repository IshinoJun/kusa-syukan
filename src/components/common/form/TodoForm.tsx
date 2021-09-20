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
  editable?: boolean;
}

const TodoForm = ({
  todoValue,
  onChangeTodoValue,
  currentDate,
  onChangeCurrentDate,
  editable,
}: Props): JSX.Element => {
  const handleChangeTodoName = useCallback(
    (name: string) => {
      onChangeTodoValue({ ...todoValue, name });
    },
    [todoValue, onChangeTodoValue],
  );

  const generateErrorMassage = useCallback(() => {
    if (todoValue.name === '') {
      return 'タスク名を入力しましょう！';
    } else {
      return undefined;
    }
  }, [todoValue.name]);

  return (
    <View>
      <View style={styles.topContainer}>
        <View style={{ height: 105 }}>
          <Input
            placeholder="タスク名"
            style={styles.input}
            inputContainerStyle={styles.inputContainer}
            onChangeText={handleChangeTodoName}
            value={todoValue.name}
            autoFocus={!editable}
            errorMessage={generateErrorMassage()}
          />
        </View>
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
