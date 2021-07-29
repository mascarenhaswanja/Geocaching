import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignInScreen from './Screens/SignInScreen';
import SignUpScreen from './Screens/SignUpScreen';
import HomeTabContainer from './Screens/HomeTabContainer';


const Stack = createStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
     <Stack.Navigator initialRouteName="SignIn">
       <Stack.Screen name="SignIn" component={SignInScreen}/>
       <Stack.Screen name="SignUp" component={SignUpScreen}/>
       <Stack.Screen name="HomeTabContainer" component={HomeTabContainer}/>
     </Stack.Navigator>
   </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
