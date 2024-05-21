import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Toast from 'react-native-toast-message';

import LoginScreen from './screens/LoginScreen';
import SingupScreen from './screens/SingupScreen';
import MainContainerAluno from './screens/MainContainerAluno';
import MainContainerServidor from './screens/MainContainerServidor';
import MainContainerAdm from './screens/MainContainerAdm';

const Stack = createStackNavigator();

// Define a função App
function App() {
  // Define o Tab Navigator para a MainContainerAluno
  function TabNavigationAluno() {
    return <MainContainerAluno />;
  }
  function TabNavigationAdm() {
    return <MainContainerAdm />;
  }
  function TabNavigationServidor() {
    return <MainContainerServidor />;
  }

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Login' screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SingUp" component={SingupScreen} />
          <Stack.Screen name="HomeAluno" component={TabNavigationAluno} />
          <Stack.Screen name="HomeAdm" component={TabNavigationAdm} />
          <Stack.Screen name="HomeServer" component={TabNavigationServidor} />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </>
  );
}

export default App;
