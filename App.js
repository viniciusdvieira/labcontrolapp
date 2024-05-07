import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GestureHandlerRootView} from 'react-native-gesture-handler'

import LoginScreen from './screens/LoginScreen';
import SingupScreen from './screens/SingupScreen';
import HomeScreenAdm from './screens/adm/HomeScreenAdm';
import HomeScreenServer from './screens/servidor/HomeScreenServer';
import CadastroScreenAdm from './screens/adm/CadastroScreenAdm';
import MainContainerAluno from './screens/MainContainerAluno';

const Stack = createStackNavigator();


// Define a função App
function App() {
  // Define o Tab Navigator para a MainContainerAluno
  function TabNavigation() {
    return <MainContainerAluno />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login' screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SingUp" component={SingupScreen} />
        <Stack.Screen name="HomeAluno" component={TabNavigation} />
        <Stack.Screen name="HomeAdm" component={HomeScreenAdm} />
        <Stack.Screen name="HomeServer" component={HomeScreenServer} />
        <Stack.Screen name="CadastroAdm" component={CadastroScreenAdm} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

  export default App;