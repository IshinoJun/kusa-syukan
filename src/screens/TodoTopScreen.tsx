import { useIsFocused, useNavigation } from '@react-navigation/core';
import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AddButton from '../components/common/button/AddButton';
import Layout from '../components/common/layout/Layout';
import HomeScreenProp from '../models/HomeScreenProp';

import TodoTopDateBar from '../components/screen/TodoTopScreen/TodoTopDateBar';
import { useWindowDimensions } from 'react-native';
import { format } from 'date-fns';
import DateValue from '../models/DateValue';
import TodoTopTable from '../components/screen/TodoTopScreen/TodoTopTable';
import { useStorage } from '../hooks/useStorage';
import TodoValue from '../models/TodoValue';
import { Icon } from 'react-native-elements';

const DAY_OF_WEEK_STR = ['日', '月', '火', '水', '木', '金', '土'] as const;

const TodoHomeScreen = (): JSX.Element => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [dayValues, setDayValues] = useState<DateValue[] | null>(null);
  const [todoValues, setTodoValues] = useState<TodoValue[] | null>(null);
  const storage = useStorage();
  const dimensions = useWindowDimensions();
  const navigation = useNavigation<HomeScreenProp>();
  const isFocused = useIsFocused();

  const handlePressAddButton = useCallback(() => {
    navigation.navigate('TodoAdd');
  }, [navigation]);

  const headerContents = [<Text key={0} />, <AddButton key={1} onPress={handlePressAddButton} />];

  const getCurrentDayDone = () => {
    const done =
      todoValues?.filter((t) =>
        t.values.some((v) => v.day === format(currentDate, 'yyyy-MM-dd') && v.check),
      ) ?? [];

    return (
      <View style={{ position: 'relative', flexDirection: 'row' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ paddingRight: 5, fontFamily: 'BalooChettan2_700Bold' }}>
            {done.length}
          </Text>
          <Text style={{ fontFamily: 'BalooChettan2_700Bold' }}>/</Text>
          <Text style={{ paddingLeft: 5, fontFamily: 'BalooChettan2_700Bold' }}>
            {todoValues?.length ?? 0}
          </Text>
        </View>
        <Text
          style={{
            fontFamily: 'BalooChettan2_700Bold',
            position: 'absolute',
            left:
              17 * (done.length.toString().length + (todoValues?.length ?? 0).toString().length),
          }}>
          done!
        </Text>
      </View>
    );
  };

  const handleClickToday = useCallback(() => {
    setCurrentDate(new Date());
  }, []);

  const footerContents = [
    <View key={0} style={{ width: '20%', alignItems: 'flex-start' }}>
      <TouchableOpacity onPress={handleClickToday}>
        <View style={styles.footerButtonWrap}>
          <Text>今日</Text>
        </View>
      </TouchableOpacity>
    </View>,
    <View style={{ width: '60%', alignItems: 'center' }} key={1}>
      {getCurrentDayDone()}
    </View>,
    <View key={2} style={{ width: '20%', alignItems: 'flex-end' }}>
      {/** 機能としてないので非表示 */}
      <Icon type="simple-line-icons" name="settings" size={20} color={'transparent'} />
    </View>,
  ];

  /**
   * 基準日の6日前から基準日まで曜日と日付の配列を返す。
   */
  const generateDays = useCallback(() => {
    const BEFORE_SIX_DAY = -6 as const;
    const beforeDays = [...Array(7)].map((_, i) => BEFORE_SIX_DAY + i);

    return beforeDays.map((beforeDay) => {
      const targetDay = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() + beforeDay,
      );

      return {
        day: format(targetDay, 'yyyy-MM-dd'),
        wDay: DAY_OF_WEEK_STR[targetDay.getDay()],
      };
    });
  }, [currentDate]);

  /**
   * 現在の日付を前日にする
   */
  const handleClickPrevDate = useCallback(() => {
    const prevDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() - 1,
    );
    setCurrentDate(prevDate);
  }, [currentDate]);

  /**
   * 現在の日付を翌日にする
   */
  const handleClickNextDate = useCallback(() => {
    const nextDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() + 1,
    );
    setCurrentDate(nextDate);
  }, [currentDate]);

  useEffect(() => {
    setDayValues(generateDays());
  }, [generateDays]);

  useEffect(() => {
    if (todoValues) {
      void (async (): Promise<void> => {
        await storage?.save({ key: 'TODO', data: todoValues });
      })();
    }
  }, [generateDays, storage, todoValues]);

  useEffect(() => {
    if (isFocused) {
      void (async (): Promise<void> => {
        try {
          const nextTodoValues = (await storage?.load({
            key: 'TODO',
          })) as TodoValue[] | null;
          setTodoValues(nextTodoValues ?? []);
        } catch (e) {
          /** TODO:ちゃんとエラーハンドリング 初回はないので */
          setTodoValues([]);
          return;
        }
      })();
    }
  }, [storage, isFocused]);

  return (
    <>
      <Layout headerContents={headerContents} footerContents={footerContents}>
        {dayValues && todoValues ? (
          <View style={styles.container}>
            <TodoTopDateBar
              onClickNextDate={handleClickNextDate}
              onClickPrevDate={handleClickPrevDate}
              currentDate={currentDate}
            />
            <View style={styles.tableContainer}>
              <TodoTopTable
                todoValues={todoValues}
                dayValues={dayValues}
                dimensions={dimensions}
                onChangeTodoValues={setTodoValues}
              />
            </View>
          </View>
        ) : null}
      </Layout>
    </>
  );
};

const styles = StyleSheet.create({
  headerTitle: {
    fontFamily: 'BalooChettan2_700Bold',
    fontSize: 17,
  },
  container: {
    marginTop: 4,
    height: '90%',
  },
  weekBar: {
    flexDirection: 'row',
  },
  tableContainer: { marginTop: 20 },
  row: {
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0F0F0',
  },
  footerButtonWrap: {
    width: 44,
    height: 44,
    flex: 1,
    justifyContent: 'center',
  },
});

export default TodoHomeScreen;
