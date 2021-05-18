import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ExploreNavigator from './ExploreNavigator';
import ProfileScreen from '../screens/Profile';
import Trip from '../screens/Trip';
import ChatRoom from '../screens/ChatRoom';
import LocalifeAndCam from '../screens/LocalifeAndCam';


import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Tab = createBottomTabNavigator();

const HomeTabNavigator = (props) => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#1D565D',
      }}
        >
      <Tab.Screen
        name={'Explore'}
        component={ExploreNavigator}
        options={{
          tabBarIcon: ({color}) => (
            <Fontisto name="search" size={22} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={'Trip'}
        component={Trip}
        options={{
          tabBarIcon: ({color}) => (
            <FontAwesome name="binoculars" size={22} color={color} />
          ),
        }}
      />
       
      <Tab.Screen
        name={'Localife'}
        component={LocalifeAndCam}
        options={{
          tabBarIcon: ({color}) => (
            <FontAwesome5 name="pagelines" size={22} color={color} />
          )
          ,
          tabBarVisible: false
        }}
      />

      <Tab.Screen
        name={'Chat'}
        component={ChatRoom}
        options={{
          tabBarIcon: ({color}) => (
            <FontAwesome5 name="comments" size={22} color={color} />
          ),
        }}
      />

       <Tab.Screen
        name={'Profile'}
        component={ProfileScreen}
        options={{
          tabBarIcon: ({color}) => (
            <FontAwesome5 name="user" size={22} color={color} />
          ),
        }}
      /> 
    </Tab.Navigator>
  );
};

export default HomeTabNavigator;
