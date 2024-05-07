import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';


// Screens
import HomeScreenAluno from './aluno/HomeScreenAluno';
import LabScreenAluno from './aluno/LabScreenAluno';
import ContaScreenAluno from './aluno/ContaScreenAluno';


//Screen names
const homeName = "Home";
const labName = "Laboratorio";
const contaName = "Conta";



const Tab = createBottomTabNavigator();

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

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'grey',
        labelStyle: { paddingBottom: 10, fontSize: 10 },
        style: { padding: 10, height: 70}
      }}>

      <Tab.Screen name={homeName} component={HomeScreenAluno} />
      <Tab.Screen name={labName} component={LabScreenAluno} />
      <Tab.Screen name={contaName} component={ContaScreenAluno} />

    </Tab.Navigator>
  );
}

export default MainContainerAluno;