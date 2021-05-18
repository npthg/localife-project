import React, {useEffect, useState, useRef} from 'react';
import {View, ImageBackground, Text, Pressable, FlatList, useWindowDimensions, ScrollView, StatusBar, LogBox} from 'react-native';
import styles from './styles';

import PostCarouselItem from '../../components/PostCarouselItem';
import CategoryList from '../../components/CategoryList';

import {useNavigation} from '@react-navigation/native';

import { API, graphqlOperation, Auth } from 'aws-amplify';
import { listPosts, getUser } from '../../../graphql/queries';

import GetLocation from 'react-native-get-location';


const HomeScreen = (props) => {

   const navigation = useNavigation();

   const [posts, setPosts] = useState([]);
   const [postsCurrentLocation, setPostsCurrentLocation] = useState([]);
   const [user, setUser] = useState([]) ;

   const width = useWindowDimensions().width;

   useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested', 'Possible Unhandled Promise Rejection']);
  }, [])

   useEffect(() => {
    const fetchUser = async () => {
      const userInfo = await Auth.currentAuthenticatedUser();
  
      const getUserResponse = await API.graphql(
        graphqlOperation(getUser, {id: userInfo.attributes.sub}),
      );
  
      setUser(getUserResponse.data.getUser)
    };

     const fetchPost = async () => {
        try{
            const postResult = await API.graphql(
              graphqlOperation(listPosts)
            )
            setPosts(postResult.data.listPosts.items) ; 
        }catch(e){
          console.log(e)
        }
     }

     fetchUser();
     fetchPost();
   }, []) ;

   useEffect(() => {
        GetLocation.getCurrentPosition({
          enableHighAccuracy: true,
          timeout: 15000,
        })
        .then(location => {
        const fetchPost = async () => {
          try{
              const postResultCurrLocation = await API.graphql(
              graphqlOperation(listPosts , 
            {
            filter: {
              and: {
                latitude: {
                  between: [
                    location.latitude - 0.3,
                    location.latitude + 0.3,
                  ],
                },
                longitude: {
                  between: [
                    location.longitude - 0.3,
                    location.longitude + 0.3,
                  ],
                }
              }
            }
          })
        )
        setPostsCurrentLocation(postResultCurrLocation.data.listPosts.items) ; 
       }catch(e){
         console.log(e)
       }
    }
    fetchPost();
  })
  }, [])
   
  return (
    <ScrollView style={styles.container}>
      <StatusBar hidden/>

      {/* Header Section */}
      <ImageBackground
        source={require('../../../assets/images/wallpaper.jpg')}
        style={styles.image}>
        <Text style={styles.title}>Hi, {user.username}</Text>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate('Destination Search')} 
          >
          <Text style={styles.buttonText}>Explore new experience</Text>
        </Pressable>
      </ImageBackground>

      {/* Trending */}
      <Text style={styles.trendtxt}>Latest Activity</Text>
      <FlatList
          // ref={flatlist}
          data={posts}
          renderItem={({item}) => <PostCarouselItem post={item} isShow={true}/>}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={width - 60}
          snapToAlignment={"center"}
          decelerationRate={"fast"}
        /> 

      {/* Best around you Section */}
      <Text style={styles.bestarutxt}>Best Around You</Text>
         <FlatList
          data={postsCurrentLocation}
          renderItem={({item}) => <PostCarouselItem post={item} isShow={true}/>}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={width - 60}
          snapToAlignment={"center"}
          decelerationRate={"fast"}
        /> 


      {/* Category Section */}
      <Text style={styles.categorytxt}>Category</Text>
      <CategoryList />
    </ScrollView>
    
  );
};


export default HomeScreen;
