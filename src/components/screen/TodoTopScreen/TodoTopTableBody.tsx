import FontAwesome from '@expo/vector-icons/build/FontAwesome';
import React, { useCallback } from 'react';
import { View, Text, ScaledSize, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import CheckBox from 'react-native-elements/dist/checkbox/CheckBox';
import { Rows, Table } from 'react-native-table-component';
import DateValue from '../../../models/DateValue';
import TodoValue from '../../../models/TodoValue';
import { cloneDeep } from 'lodash';
import { useNavigation } from '@react-navigation/core';
import HomeScreenProp from '../../../models/HomeScreenProp';

interface Props {
  dayValues: DateValue[];
  todoValues: TodoValue[];
  dimensions: ScaledSize;
  onChangeTodoValues: (nextTodoValues: TodoValue[]) => void;
  editTodoValue?: TodoValue;
}

const TodoTopTableBody = ({
  dayValues,
  todoValues,
  dimensions,
  onChangeTodoValues,
}: Props): JSX.Element => {
  const navigation = useNavigation<HomeScreenProp>();

  const handleClickEdit = useCallback(
    (uuid: string) => {
      navigation.navigate('TodoEdit', { uuid });
    },
    [navigation],
  );

  const getTaskTextMaxWidth = useCallback(() => {
    return dimensions.width / 3;
  }, [dimensions.width]);

  const handleClickCheck = useCallback(
    (day: string, todoValueIndex: number) => {
      const nextTodoValues = cloneDeep(todoValues);
      const nextTodoValue = nextTodoValues[todoValueIndex];
      const value = nextTodoValue.values.find((v) => v.day === day);
      if (value) {
        value.check = !value.check;
      } else {
        nextTodoValue.values.push({ day, check: true });
      }
      onChangeTodoValues(nextTodoValues);
    },
    [onChangeTodoValues, todoValues],
  );

  const generateRowsData = useCallback(() => {
    return todoValues.map((todoValue, todoValueIndex) => {
      return dayValues.map((dayValue, dayValueIndex) => {
        const value = todoValue.values.find((v) => v.day === dayValue.day);
        if (dayValues.length === dayValueIndex + 1) {
          return (
            <View
              key={dayValueIndex}
              style={{ flexDirection: 'row', justifyContent: 'space-between', maxWidth: '100%' }}>
              <View style={{ flexDirection: 'row', position: 'relative' }}>
                <CheckBox
                  center
                  checkedIcon="check-circle"
                  uncheckedIcon="circle"
                  size={40}
                  onPress={() => handleClickCheck(dayValue.day, todoValueIndex)}
                  checkedColor="#219653"
                  checked={value?.check}
                  containerStyle={{ paddingLeft: 0, paddingRight: 0 }}
                />
                <View
                  style={{
                    alignContent: 'center',
                    justifyContent: 'center',
                    maxWidth: getTaskTextMaxWidth(),
                  }}>
                  <Text numberOfLines={3} ellipsizeMode="tail" style={styles.todoName}>
                    {todoValue.name}
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => handleClickEdit(todoValue.uuid)}
                style={{ width: 44, flexDirection: 'row', justifyContent: 'flex-end' }}>
                <View style={styles.editIconWrapper}>
                  <Icon
                    type="ant-design"
                    name="rightcircleo"
                    size={14}
                    iconStyle={styles.editIcon}
                  />
                </View>
                <View
                  style={{
                    backgroundColor: todoValue.color,
                    width: 17,
                  }}
                />
              </TouchableOpacity>
            </View>
          );
        } else {
          return (
            <View style={styles.row} key={dayValueIndex}>
              {value?.check ? <FontAwesome name="check" size={17} color="#219653" /> : null}
            </View>
          );
        }
      });
    });
  }, [dayValues, getTaskTextMaxWidth, handleClickCheck, handleClickEdit, todoValues]);

  return (
    <Table borderStyle={{ borderWidth: 1, borderColor: '#DDDDDD' }}>
      <Rows data={generateRowsData()} flexArr={[1, 1, 1, 1, 1, 1, 8]} />
    </Table>
  );
};

const styles = StyleSheet.create({
  row: {
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0F0F0',
  },
  todoName: {
    fontSize: 14,
  },
  editIconWrapper: {
    position: 'absolute',
    right: 10,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
    height: '100%',
  },
  editIcon: { backgroundColor: '#FFF', borderRadius: 8 },
});

export default TodoTopTableBody;
