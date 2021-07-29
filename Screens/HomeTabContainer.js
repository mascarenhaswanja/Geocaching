import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import MapGeoCachingScreen from './MapGeoCachingScreen';
import ProfileScreen from './ProfileScreen';
import FavouriteScreen from './FavouriteScreen';


function HomeTabContainer(props) {
    const Tab = createBottomTabNavigator();
    return (
    <Tab.Navigator screenOptions={({route}) => ({tabBarIcon : (focused,color,size) => {
        let iconName;
        if(route.name === "MapGeoCaching"){
            iconName= focused ? 'map' : 'map-outline' ;

        }else if(route.name === "Favourite"){
            iconName= focused ? 'heart' : 'heart-outline' ;

        }else if(route.name === "Profile"){
            iconName = focused ? 'person' : 'person-outline';
        }
        return <Ionicons name={iconName}   size={size} color={color} />
         }})} tabBarOptions={{activeTintColor : 'tomato',inactiveTintColor: 'gray'}}>
        <Tab.Screen name="MapGeoCaching" component={MapGeoCachingScreen}/>
        <Tab.Screen name="Profile" component={ProfileScreen}/>
        <Tab.Screen name="Favourite" component={FavouriteScreen}/>
    </Tab.Navigator>
        );
}

export default HomeTabContainer;