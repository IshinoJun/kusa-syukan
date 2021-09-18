import React from 'react';
import { ScaledSize, ScrollView } from 'react-native';
import DateValue from '../../../models/DateValue';
import TodoValue from '../../../models/TodoValue';
import TodoTopTableBody from './TodoTopTableBody';
import TodoTopTableHeader from './TodoTopTableHeader';

interface Props {
  dayValues: DateValue[];
  todoValues: TodoValue[];
  dimensions: ScaledSize;
  onChangeTodoValues: (nextTodoValues: TodoValue[]) => void;
}

const TodoTopTable = ({
  dayValues,
  todoValues,
  dimensions,
  onChangeTodoValues,
}: Props): JSX.Element => {
  return (
    <>
      <TodoTopTableHeader dayValues={dayValues} />
      <ScrollView>
        <TodoTopTableBody
          todoValues={todoValues}
          dayValues={dayValues}
          dimensions={dimensions}
          onChangeTodoValues={onChangeTodoValues}
        />
      </ScrollView>
    </>
  );
};

export default TodoTopTable;
