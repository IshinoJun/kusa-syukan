import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import TodoSettingScreen from './src/screens/TodoAddScreen';
import TodoTopScreen from './src/screens/TodoTopScreen';
import AppLoading from 'expo-app-loading';
import {
  useFonts,
  BalooChettan2_400Regular,
  BalooChettan2_500Medium,
  BalooChettan2_600SemiBold,
  BalooChettan2_700Bold,
  BalooChettan2_800ExtraBold,
} from '@expo-google-fonts/baloo-chettan-2';
import TodoEditScreen from './src/screens/TodoEditScreen';
import TodoAddScreen from './src/screens/TodoAddScreen';

const Stack = createStackNavigator();

export default function App(): JSX.Element {
  const [fontsLoaded] = useFonts({
    BalooChettan2_400Regular,
    BalooChettan2_500Medium,
    BalooChettan2_600SemiBold,
    BalooChettan2_700Bold,
    BalooChettan2_800ExtraBold,
  });
  if (!fontsLoaded) return <AppLoading />;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="TodoTop" component={TodoTopScreen} />
        <Stack.Screen name="TodoAdd" component={TodoAddScreen} />
        <Stack.Screen name="TodoEdit" component={TodoEditScreen} />
        <Stack.Screen name="TodoSetting" component={TodoSettingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
