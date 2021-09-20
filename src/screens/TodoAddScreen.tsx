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
  // 初期のぶち込む処理のため
  const todoValueDefaultRef = useRef<TodoValue>({
    name: '',
    values: [],
    color: '#EB5757',
    uuid: getUniqueStr(),
  });
  const navigation = useNavigation<HomeScreenProp>();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [todoValue, setTodoValue] = useState<TodoValue>(todoValueDefaultRef.current);
  const todoValues = useRef<TodoValue[] | null>(null);
  const isFocused = useIsFocused();
  const storage = useStorage();

  const handleClickBack = useCallback(() => {
    navigation.navigate('TodoTop');
  }, [navigation]);

  const handlePressTodoDelete = () => {
    void (async (): Promise<void> => {
      if (!todoValues.current) return;
      try {
        const nextTodoValues = todoValues.current.filter((t) => t.uuid !== todoValue.uuid);
        await storage?.save({ key: 'TODO', data: nextTodoValues });
        navigation.navigate('TodoTop');
      } catch (e) {
        return;
      }
    })();
  };

  const headerContents = [
    <View key={0} style={{ width: '20%', alignItems: 'flex-start' }}>
      <TouchableOpacity onPress={handleClickBack}>
        <View style={styles.footerButtonWrap}>
          <Text>戻る</Text>
        </View>
      </TouchableOpacity>
    </View>,
    <View style={{ width: '60%', alignItems: 'center' }} key={1}>
      <Text style={styles.headerTitle} key={1}>
        Daily Todo
      </Text>
    </View>,
    <View key={2} style={{ width: '20%', alignItems: 'flex-end' }}>
      <TouchableOpacity onPress={handlePressTodoDelete}>
        <View style={styles.footerButtonWrap}>
          <Text>削除</Text>
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

        nextTodoValues?.push(todoValueDefaultRef.current);
        todoValues.current = nextTodoValues;
        await storage?.save({ key: 'TODO', data: todoValues.current });
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
        await storage?.save({ key: 'TODO', data: todoValues.current });
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
