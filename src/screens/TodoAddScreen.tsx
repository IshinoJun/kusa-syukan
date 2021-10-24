import { useIsFocused, useNavigation } from '@react-navigation/core';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Layout from '../components/common/layout/Layout';
import HomeScreenProp from '../models/HomeScreenProp';
import TodoValue from '../models/TodoValue';
import { useStorage } from '../hooks/useStorage';
import { getUniqueStr } from '../utils/UUIDUtils';
import { cloneDeep } from 'lodash';
import TodoForm from '../components/common/form/TodoForm';

const TodoAddScreen = (): JSX.Element => {
  const navigation = useNavigation<HomeScreenProp>();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [todoValue, setTodoValue] = useState<TodoValue>({
    name: '',
    values: [],
    color: '#EB5757',
    uuid: getUniqueStr(),
  });
  const todoValues = useRef<TodoValue[] | null>(null);
  const isFocused = useIsFocused();
  const storage = useStorage();

  const handleClickBack = useCallback(() => {
    navigation.navigate('TodoTop');
  }, [navigation]);

  const handlePressTodoSave = useCallback(() => {
    void (async (): Promise<void> => {
      if (!todoValues.current) return;
      try {
        await storage?.save({ key: 'TODO', data: todoValues.current });
        navigation.navigate('TodoTop');
      } catch (e) {
        return;
      }
    })();
  }, [navigation, storage]);

  const headerContents = [
    <View key={0} style={{ width: '20%', alignItems: 'flex-start' }}>
      <TouchableOpacity onPress={handleClickBack}>
        <View style={styles.footerButtonWrap}>
          <Text>戻る</Text>
        </View>
      </TouchableOpacity>
    </View>,
    <View key={2} style={{ width: '20%', alignItems: 'flex-end' }}>
      <TouchableOpacity onPress={handlePressTodoSave} disabled={todoValue.name === ''}>
        <View style={styles.footerButtonWrap}>
          <Text style={{ color: todoValue.name === '' ? 'grey' : undefined }}>保存</Text>
        </View>
      </TouchableOpacity>
    </View>,
  ];

  /**
   * タスク一覧と新規登録
   */
  useEffect(() => {
    if (!isFocused) return;
    void (async (): Promise<void> => {
      try {
        const nextTodoValues = ((await storage?.load({
          key: 'TODO',
        })) ?? []) as TodoValue[];

        todoValues.current = nextTodoValues;
      } catch (e) {
        return;
      }
    })();
  }, [isFocused, storage]);

  /**
   * todoValueが変更されたらストレージの内容も更新
   */
  useEffect(() => {
    if (!isFocused) return;
    void (async (): Promise<void> => {
      if (!todoValues.current) return;
      try {
        const nextTodoValues = cloneDeep(todoValues.current);
        const nextTodoValueIndex = nextTodoValues.findIndex((n) => n.uuid === todoValue.uuid);
        if (nextTodoValueIndex === -1) {
          nextTodoValues.push(todoValue);
        } else {
          nextTodoValues[nextTodoValueIndex] = todoValue;
        }
        todoValues.current = nextTodoValues;
      } catch (e) {
        return;
      }
    })();
  }, [isFocused, storage, todoValue]);

  return (
    <Layout headerContents={headerContents}>
      <ScrollView>
        <TodoForm
          currentDate={currentDate}
          onChangeCurrentDate={setCurrentDate}
          todoValue={todoValue}
          onChangeTodoValue={setTodoValue}
        />
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  headerTitle: {
    fontFamily: 'BalooChettan2_700Bold',
    fontSize: 17,
  },
  footerButtonWrap: {
    width: 44,
    height: 44,
    justifyContent: 'center',
  },
});

export default TodoAddScreen;
