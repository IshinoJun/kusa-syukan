import { useNavigation } from '@react-navigation/core';
import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AddButton from '../components/common/button/AddButton';
import Layout from '../components/common/layout/Layout';
import HomeScreenProp from '../models/HomeScreenProp';

import TodoTopDateBar from '../components/screen/TodoTopScreen/TodoTopDateBar';
import { useWindowDimensions } from 'react-native';
import { format } from 'date-fns';
import DateValue from '../models/DateValue';
import TodoTopTable from '../components/screen/TodoTopScreen/TodoTopTable';

interface todoValue {
  name: string;
  values: { day: string; check: boolean }[];
  color: string;
}

const DAY_OF_WEEK_STR = ['日', '月', '火', '水', '木', '金', '土'] as const;
const hoge: todoValue[] = [
  {
    name: 'サンプリを飲む',
    values: [
      { day: '2021-09-17', check: true },
      { day: '2021-09-18', check: true },
    ],
    color: 'red',
  },
];

const TodoHomeScreen = (): JSX.Element => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [dayValues, setDayValues] = useState<DateValue[] | null>(null);
  const dimensions = useWindowDimensions();
  const navigation = useNavigation<HomeScreenProp>();

  const handlePressAddButton = useCallback(() => {
    navigation.navigate('TodoAdd');
  }, [navigation]);

  const headerContents = [
    <Text style={styles.headerTitle} key={0}>
      Daily Todo
    </Text>,
    <AddButton key={1} onPress={handlePressAddButton} />,
  ];

  const footerContents = [
    <Text key={0}>今日</Text>,
    <Text key={1}>今日</Text>,
    <Text key={2}>今日</Text>,
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

  return (
    <>
      {dayValues ? (
        <Layout headerContents={headerContents} footerContents={footerContents}>
          <View style={styles.container}>
            <TodoTopDateBar
              onClickNextDate={handleClickNextDate}
              onClickPrevDate={handleClickPrevDate}
              currentDate={currentDate}
            />
            <View style={styles.tableContainer}>
              <TodoTopTable todoValues={hoge} dayValues={dayValues} dimensions={dimensions} />
            </View>
          </View>
        </Layout>
      ) : null}
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
});

export default TodoHomeScreen;
