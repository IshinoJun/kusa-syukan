/* eslint-disable indent */
import { format } from 'date-fns';
import { cloneDeep } from 'lodash';
import React, { useCallback } from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Calendar, DateObject, LocaleConfig } from 'react-native-calendars';
import { Icon } from 'react-native-elements';
import TodoValue from '../../../models/TodoValue';

interface Props {
  currentDate: Date;
  onChangeCurrentDate: (nextCurrentDate: Date) => void;
  todoValue: TodoValue;
  onChangeTodoValue: (nextTodoValue: TodoValue) => void;
}

const renderArrow = (direction: 'left' | 'right') => {
  if (direction === 'left') {
    return <Icon type="ant-design" name="left" size={18} color="black" />;
  } else {
    return <Icon type="ant-design" name="right" size={18} color="black" />;
  }
};

const TodoCalender = ({
  onChangeCurrentDate,
  currentDate,
  todoValue,
  onChangeTodoValue,
}: Props): JSX.Element => {
  const handlePressArrowLeft = (substractMonth: () => void) => {
    onChangeCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, currentDate.getDate()),
    );
    substractMonth();
  };

  const handlePressArrowRight = (substractMonth: () => void) => {
    onChangeCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate()),
    );
    substractMonth();
  };

  const handlePressDay = useCallback(
    (day: string) => {
      const nextTodoValue = cloneDeep(todoValue);
      const value = nextTodoValue.values.find((v) => v.day === day);
      if (value) {
        value.check = !value.check;
      } else {
        nextTodoValue.values.push({ day, check: true });
      }

      onChangeTodoValue(nextTodoValue);
    },
    [onChangeTodoValue, todoValue],
  );

  const renderDay = useCallback(
    ({ date }: { date: DateObject }) => {
      return (
        <TouchableOpacity onPress={() => handlePressDay(date.dateString)}>
          <View style={dayTextStyle(date, currentDate).wrapper}>
            <Text style={dayTextStyle(date, currentDate).dayText}>{date.day}</Text>
            {todoValue.values?.find((v) => v.day === date.dateString)?.check ? (
              <Icon
                style={{ paddingTop: 12 }}
                name="check"
                type="font-awesome"
                size={17}
                color="#219653"
              />
            ) : null}
          </View>
        </TouchableOpacity>
      );
    },
    [currentDate, handlePressDay, todoValue.values],
  );

  return (
    <Calendar
      current={format(currentDate, 'yyyy-MM-dd')}
      monthFormat={'yyyy年 M月'}
      style={{ backgroundColor: '#F0F0F0', borderBottomWidth: 1, borderColor: '#D1D3D4' }}
      onPressArrowLeft={handlePressArrowLeft}
      onPressArrowRight={handlePressArrowRight}
      renderArrow={renderArrow}
      dayComponent={renderDay}
      theme={{
        'stylesheet.calendar.header': {
          dayTextAtIndex0: {
            color: 'red',
          },
          dayTextAtIndex1: {
            color: 'black',
          },
          dayTextAtIndex2: {
            color: 'black',
          },
          dayTextAtIndex3: {
            color: 'black',
          },
          dayTextAtIndex4: {
            color: 'black',
          },
          dayTextAtIndex5: {
            color: 'black',
          },
          dayTextAtIndex6: {
            color: 'blue',
          },
        },
        'stylesheet.calendar.main': {
          dayContainer: {
            borderColor: '#D1D3D4',
            borderTopWidth: 1,
            borderRightWidth: 1,
            flex: 1,
            padding: 0,
          },
          emptyDayContainer: {
            borderColor: '#D1D3D4',
            borderTopWidth: 1,
            borderRightWidth: 1,
            flex: 1,
            padding: 0,
          },
          week: {
            borderLeftWidth: 1,
            borderColor: '#D1D3D4',
            marginBottom: 0,
            flexDirection: 'row',
            justifyContent: 'space-around',
          },
        },
      }}
    />
  );
};

const dayTextStyle = (date: DateObject, currentDate: Date) =>
  StyleSheet.create({
    wrapper: {
      backgroundColor: date.month !== currentDate.getMonth() + 1 ? '#F0F0F0' : 'transparent',
      width: '100%',
      height: 62,
      paddingTop: 9,
    },
    dayText: {
      fontSize: 13,
      textAlign: 'center',
      color:
        date.month !== currentDate.getMonth() + 1
          ? '#D1D3D4'
          : date.dateString === format(currentDate, 'yyyy-MM-dd')
          ? '#EB5757'
          : 'black',
    },
  });

LocaleConfig.locales.jp = {
  today: '今日',
  monthNames: [
    '1月',
    '2月',
    '3月',
    '4月',
    '5月',
    '6月',
    '7月',
    '8月',
    '9月',
    '10月',
    '11月',
    '12月',
  ],
  monthNamesShort: [
    '1月',
    '2月',
    '3月',
    '4月',
    '5月',
    '6月',
    '7月',
    '8月',
    '9月',
    '10月',
    '11月',
    '12月',
  ],
  dayNames: ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'],
  dayNamesShort: ['日', '月', '火', '水', '木', '金', '土'],
};
LocaleConfig.defaultLocale = 'jp';

export default TodoCalender;
