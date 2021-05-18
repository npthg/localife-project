import React, {useEffect} from 'react';
import Router from './src/navigation/Router'

import {
  StatusBar,
} from 'react-native';

import {Auth, API, graphqlOperation} from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react-native';
import { createUser } from './graphql/mutations';
import { getUser } from './graphql/queries';

const App: () => Node = () => {
  

  const randomImages = [
    'https://hieumobile.com/wp-content/uploads/avatar-among-us-2.jpg',
    'https://hieumobile.com/wp-content/uploads/avatar-among-us-3.jpg',
    'https://hieumobile.com/wp-content/uploads/avatar-among-us-6.jpg',
    'https://hieumobile.com/wp-content/uploads/avatar-among-us-9.jpg',
  ];

  useEffect(() => {
    const fetchUser = async () => {
      // get currently authenticated user
      const userInfo = await Auth.currentAuthenticatedUser({bypassCache: true});

      if (!userInfo) {
        return;
      }

      const getUserResponse = await API.graphql(
        graphqlOperation(getUser, {id: userInfo.attributes.sub}),
      );
      if (getUserResponse.data.getUser) {
        console.log('User already exists in database');
        return;
      }

      const newUser = {
        id: userInfo.attributes.sub,
        username: userInfo.username,
        email: userInfo.attributes.email,
        imageUri: 'https://hieumobile.com/wp-content/uploads/avatar-among-us-9.jpg',
      };

      await API.graphql(graphqlOperation(createUser, {input: newUser}));
   };

   fetchUser();
  }, []);
   
  return (
    <>
    <StatusBar barStyle="dark-content" />
      
    <Router />

    </>
  
  );
};



export default withAuthenticator(App);
