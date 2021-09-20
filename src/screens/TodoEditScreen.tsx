import { RouteProp, useIsFocused, useNavigation, useRoute } from '@react-navigation/core';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import Layout from '../components/common/layout/Layout';
import HomeScreenProp from '../models/HomeScreenProp';
import TodoValue from '../models/TodoValue';
import { useStorage } from '../hooks/useStorage';
import { cloneDeep } from 'lodash';
import TodoForm from '../components/common/form/TodoForm';
import { Icon } from 'react-native-elements';

const TodoEditScreen = (): JSX.Element => {
  const navigation = useNavigation<HomeScreenProp>();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [todoValue, setTodoValue] = useState<TodoValue | null>(null);
  const todoValues = useRef<TodoValue[] | null>(null);
  const isFocused = useIsFocused();
  const storage = useStorage();
  const route = useRoute<RouteProp<{ params: { uuid: string } }>>();

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

  const handleTodoDelete = useCallback(() => {
    void (async (): Promise<void> => {
      if (!todoValues.current) return;
      try {
        const nextTodoValues = todoValues.current.filter((t) => t.uuid !== todoValue?.uuid);
        await storage?.save({ key: 'TODO', data: nextTodoValues });
        navigation.navigate('TodoTop');
      } catch (e) {
        return;
      }
    })();
  }, [navigation, storage, todoValue?.uuid]);

  const handlePressTodoDelete = useCallback(() => {
    Alert.alert(
      '削除',
      '該当タスクのデータが全て失われます。本当によろしいですか？',
      [
        { text: 'いいえ', onPress: undefined },
        { text: 'はい', onPress: () => handleTodoDelete() },
      ],
      { cancelable: false },
    );
  }, [handleTodoDelete]);

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
      <TouchableOpacity onPress={handlePressTodoSave}>
        <View style={styles.footerButtonWrap}>
          <Text>保存</Text>
        </View>
      </TouchableOpacity>
    </View>,
  ];

  const footerContents = [
    <View key={0} style={{ justifyContent: 'center', alignItems: 'center', width: '100%' }}>
      <TouchableOpacity onPress={handlePressTodoDelete}>
        <View style={styles.footerButtonWrap}>
          <Icon type="ant-design" name="delete" size={20} />
        </View>
      </TouchableOpacity>
    </View>,
  ];

  /**
   * タスク一覧と編集対象を取得
   */
  useEffect(() => {
    if (!isFocused) return;
    void (async (): Promise<void> => {
      try {
        const nextTodoValues = ((await storage?.load({
          key: 'TODO',
        })) ?? []) as TodoValue[];
        todoValues.current = nextTodoValues;

        const targetTodoValue = todoValues.current.find((t) => t.uuid === route.params.uuid);
        if (targetTodoValue) setTodoValue(targetTodoValue);
      } catch (e) {
        return;
      }
    })();
  }, [isFocused, route.params.uuid, storage]);

  /**
   * todoValueが変更されたらストレージの内容も更新
   */
  useEffect(() => {
    if (!isFocused) return;
    void (async (): Promise<void> => {
      if (!todoValues.current || !todoValue) return;
      try {
        const nextTodoValues = cloneDeep(todoValues.current);
        const nextTodoValueIndex = nextTodoValues.findIndex((n) => n.uuid === todoValue?.uuid);

        nextTodoValues[nextTodoValueIndex] = todoValue;

        todoValues.current = nextTodoValues;
        await storage?.save({ key: 'TODO', data: todoValues.current });
      } catch (e) {
        return;
      }
    })();
  }, [isFocused, storage, todoValue]);

  return (
    <Layout headerContents={headerContents} footerContents={footerContents}>
      {todoValue ? (
        <ScrollView>
          <TodoForm
            editable={true}
            currentDate={currentDate}
            onChangeCurrentDate={setCurrentDate}
            todoValue={todoValue}
            onChangeTodoValue={setTodoValue}
          />
        </ScrollView>
      ) : null}
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

export default TodoEditScreen;
