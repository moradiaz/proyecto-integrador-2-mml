import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { FontAwesome5, Ionicons, Octicons } from '@expo/vector-icons'
import Home from '../screens/Home'
import Search from '../screens/Search'
import Profile from '../screens/Profile'
import NewPost from '../screens/NewPost'
import Comments from '../screens/Comments'

const Tab = createBottomTabNavigator()

export default function TabNavigation() {
  return (
    <Tab.Navigator>
        <Tab.Screen
        name='Home'
        component={Home}
        options={{
            headerShown: false, 
            tabBarIcon: () => <FontAwesome5 name='home' size={24} color='black' />
        }}        
        />
        <Tab.Screen
        name='Profile'
        component={Profile}
        options={{
            headerShown: false,
            tabBarIcon: () => <Ionicons name='person-circle-outline' size={24} color='black' />
        }}        
        />
        <Tab.Screen
        name='New Post'
        component={NewPost}
        options={{
            headerShown: false,
            tabBarIcon: () => <Octicons name='diff-added' size={24} color='black' />
        }}        
        />
        <Tab.Screen
        name='Search'
        component={Search}
        options={{
            headerShown: false,
            tabBarIcon: () => <Ionicons name= 'search' size= {24} color = 'black'/>
        }}        
        />
    </Tab.Navigator>
  )
}