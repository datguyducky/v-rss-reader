import React from 'react';
import { StatusBar } from 'react-native';
import Home from './screens/Home'; 

import { Colors } from 'react-native/Libraries/NewAppScreen';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const App = () => {
  return (
	<NavigationContainer>
		<StatusBar barStyle="dark-content" animated={true} backgroundColor="#fff"/>

		<Stack.Navigator>
        	<Stack.Screen name="Home" component={Home} />
      	</Stack.Navigator>
	</NavigationContainer>
  );
  
}; export default App;
