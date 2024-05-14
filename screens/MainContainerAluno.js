import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens
import HomeScreenAluno from './aluno/HomeScreenAluno';
import LabScreenAluno from './aluno/LabScreenAluno';
import ContaScreenAluno from './aluno/ContaScreenAluno';
import editarScreenAluno from './aluno/editarScreenAluno';

// Screen names
const homeName = "Home";
const labName = "Laboratorio";
const contaName = "Conta";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MainContainerAluno() {
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
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={null} // Remove tabBarOptions
    >
      <Tab.Screen name={homeName} component={HomeScreenAluno} />
      <Tab.Screen name={labName} component={LabScreenAluno} />
      <Tab.Screen name={contaName} component={ContaScreenAluno} />
    </Tab.Navigator>
  );
}

function MainContainerWithEditScreenAluno() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MainContainerAluno" component={MainContainerAluno} options={{ headerShown: false }} />
      <Stack.Screen name="editarScreenAluno" component={editarScreenAluno} />
    </Stack.Navigator>
  );
}

export default MainContainerWithEditScreenAluno;
