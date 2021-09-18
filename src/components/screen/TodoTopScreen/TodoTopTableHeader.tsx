import { View, StyleSheet, Text } from 'react-native';
import { Row, Table } from 'react-native-table-component';
import React, { useCallback } from 'react';
import DateValue from '../../../models/DateValue';

interface Props {
  dayValues: DateValue[];
}

const TodoTopTableHeader = ({ dayValues }: Props): JSX.Element => {
  const generateRow = useCallback(() => {
    return dayValues.map((dayValue, i) =>
      dayValues.length !== i + 1 ? (
        <Text style={styles.rowText}>{dayValue.wDay}</Text>
      ) : (
        <View style={styles.currentRow}>
          <Text style={styles.currentRowText}>{dayValue.wDay}</Text>
        </View>
      ),
    );
  }, [dayValues]);

  return (
    /** テーブルでボーダー当てないとズレるのでその対策 */
    <Table borderStyle={styles.wrap}>
      <Row data={generateRow()} style={styles.row} flexArr={[1, 1, 1, 1, 1, 1, 8]} />
    </Table>
  );
};

const styles = StyleSheet.create({
  wrap: { borderWidth: 1, borderColor: 'transparent' },
  row: { height: 20 },
  rowText: {
    textAlign: 'center',
  },
  currentRow: {
    width: 50,
    backgroundColor: 'green',
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    height: 20,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  currentRowText: {
    color: '#FFF',
  },
});

export default TodoTopTableHeader;
