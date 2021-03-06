import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Signup from './Signup';
import Signin from './Signin/index';
import Amplify from 'aws-amplify';
import amplify from './aws-exports';
import Welcome from './Welcome';

Amplify.configure(amplify);

const Stack = createStackNavigator();

function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="Signin" headerMode="none">
				{
					<>
						<Stack.Screen name="Welcome" component={Welcome} />
						<Stack.Screen name="Signin" component={Signin} />
						<Stack.Screen name="Signup" component={Signup} />
					</>
				}
			</Stack.Navigator>
		</NavigationContainer>
	);
}

export default App;