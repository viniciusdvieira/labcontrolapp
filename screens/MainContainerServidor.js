import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens
import HomeScreenServer from './servidor/HomeScreenServer';

//Screen names
const homeName = "Home";

const Tab = createBottomTabNavigator();

function MainContainerServidor() {
  return (
    <Tab.Navigator
      initialRouteName={homeName}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;

          if (rn === homeName) {
            iconName = focused ? 'home' : 'home-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={null} // Remove tabBarOptions
    >
      <Tab.Screen name={homeName} component={HomeScreenServer} />
    </Tab.Navigator>
  );
}

export default MainContainerServidor;
