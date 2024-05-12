import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from '@react-navigation/stack';

// Screens
import HomeScreenAdm from './adm/HomeScreenAdm';
import LabScreenAdm from './adm/LabScreenAdm';
import ContaScreenAdm from './adm/ContaScreenAdm';
import CadastroScreenAdm from './adm/CadastroScreenAdm';
import editarScreenAdm from './adm/editarScreenAdm';

//Screen names
const homeName = "Home";
const labName = "Laboratorio";
const contaName = "Conta";
const cadastroName = "Cadastro";



const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MainContainerAdm() {
  return (
    <Tab.Navigator
      initialRouteName={homeName}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;

          if (rn === homeName) {
            iconName = focused ? 'home' : 'home-outline';

          } else if (rn === labName) {
            iconName = focused ? 'bar-chart' : 'bar-chart-outline';

          } else if (rn === contaName) {
            iconName = focused ? 'person' : 'person-outline';
          
          } else if (rn === cadastroName) {
            iconName = focused ? 'person-add' : 'person-add-outline';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'grey',
        labelStyle: { paddingBottom: 1, fontSize: 10 },
        style: { padding: 10, height: 70}
      }}>

      <Tab.Screen name={homeName} component={HomeScreenAdm} />
      <Tab.Screen name={labName} component={LabScreenAdm} />
      <Tab.Screen name={cadastroName} component={CadastroScreenAdm} />
      <Tab.Screen name={contaName} component={ContaScreenAdm} />
      

    </Tab.Navigator>
  );
}

function MainContainerWithEditScreenAdm() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MainContainerAdm" component={MainContainerAdm} options={{ headerShown: false }} />
      <Stack.Screen name="editarScreenAdm" component={editarScreenAdm} />
    </Stack.Navigator>
  );
}

export default MainContainerWithEditScreenAdm;