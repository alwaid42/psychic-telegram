import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import EventScreen from '../screens/EventScreen';
import EventFormScreen from '../screens/EventFormScreen'; // Import the EventFormScreen

const Stack = createStackNavigator();

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Event" component={EventScreen} />
                <Stack.Screen name="EventForm" component={EventFormScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
