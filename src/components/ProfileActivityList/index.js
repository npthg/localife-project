import React, {useEffect, useState} from 'react';
import {View, Text, Image, Pressable, useWindowDimensions} from 'react-native';
import { getPost } from '../../../graphql/queries';
import {API, graphqlOperation} from 'aws-amplify';

import styles from './styles.js';

import { useNavigation } from '@react-navigation/native';


const ProfileActivityList = (props) => {

  const post = props.post;
  const onPress = props.onPress ;


  const [posts, setPosts] = useState([])

  const navigation = useNavigation();

  const width = useWindowDimensions().width;

  useEffect(() => {
    const fetchPost = async () => {

      const postResult = await API.graphql(
        graphqlOperation(getPost, {id: post.postID}),
      );
      setPosts(postResult.data.getPost);
    };
    fetchPost(); 
  }, []);

  const goToPostPage = () => {
    navigation.navigate('Posts', {postId: posts.id});
  }

//   const sendSelectedPost = () => {
//     onPress(posts.id)
//   }

  return (

    <Pressable onPress={goToPostPage} style={[styles.container, { width: width - 60}]}>
    {/* <Pressable onPress={sendSelectedPost} style={[styles.container, { width: width - 60}]}> */}
      <View style={styles.innerContainer}>
        {/* Image  */}
        <Image
          style={styles.image}
          source={{uri: posts.image}}
        />

        <View style={{flex: 1, marginHorizontal: 10}}>
          {/* Bed & Bedroom  */}
          <Text style={styles.bedrooms}>
            Booked {post.date}
          </Text>

          {/* Type & Description */}
          <Text style={styles.typetxt} numberOfLines={2}>
            {posts.type}
          </Text>
          <Text style={styles.description} numberOfLines={2}>
            {posts.title}
          </Text>

          {/*  Old price & new price */}
          <Text style={styles.prices}>
            <Text style={styles.price}>฿{posts.newPrice} </Text>
            / day
          </Text>
        </View>
      </View>
    </Pressable>


  );
};

export default ProfileActivityList;
