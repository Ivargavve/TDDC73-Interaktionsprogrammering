import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './screens/HomeScreen';
import ResultsScreen from './screens/ResultScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Lab3">
        <Stack.Screen name="Lab3" component={HomeScreen} />
        <Stack.Screen name="Github Repos" component={ResultsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
