import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeTabNavigator from "./HomeTabNavigator";
import CategoryScreen from "../screens/Category"
import DestinationSearchScreen from '../screens/DestinationSearch'
import GuestsScreen from '../screens/Guests'
import PostScreen from '../screens/PostScreen'
import Confirmation from '../screens/Confirmation'
import Calendars from '../screens/Calendar';
import CameraScreen from "../screens/Camera"
import CreatePostScreen from '../screens/CreateExp';
import Messages from '../screens/Messages';
import User from '../screens/User'

const Stack = createStackNavigator();

const Router = (props) => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={"Home"}
          component={HomeTabNavigator}
          options={{
            headerShown: false,
          }}
        />

        
       <Stack.Screen
          name={"Posts"}
          component={PostScreen}
          options={{
            headerShown: false,
          }}
        />

        
      <Stack.Screen
          name={"Category"}
          component={CategoryScreen}
          options={{
            title: "Category"
          }}
          
        />

        <Stack.Screen
          name={"Destination Search"}
          component={DestinationSearchScreen}
          options={{
            title: "Explore Province"
          }}
        />

       <Stack.Screen
          name={"Guests"}
          component={GuestsScreen}
          options={{
            title: "How many people?"
          }}
        />


       
    <Stack.Screen
        name={'Calendars'}
        component={Calendars}
        options={{
            headerShown: false,
        }}
      />

    <Stack.Screen
        name={'Confirmation'}
        component={Confirmation}
        options={{
          title: "Confirmation"
        }}
      />



  
<Stack.Screen
        name={'Camera'}
        component={CameraScreen}
        options={{
          headerShown: false,
        }}
      />

<Stack.Screen
        name={'CreatePost'}
        component={CreatePostScreen}
        options={{
            headerShown: false,
        }}
      />
 
<Stack.Screen
        name={'Messages'}
        component={Messages}
        options={{
            headerShown: false,
        }}
      />

<Stack.Screen
        name={'User'}
        component={User}
         options={{
             headerShown: false,
         }}
      />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
