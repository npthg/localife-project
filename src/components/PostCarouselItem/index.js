import React from 'react';
import { View, Text, Image, useWindowDimensions, Pressable } from "react-native";
import styles from './styles.js';
import { useNavigation } from '@react-navigation/native';

const Post = (props) => {


  const {post, isShow, tripID, day, guests} = props
  const width = useWindowDimensions().width;

  const navigation = useNavigation();

  const goToPostPage = () => {
      navigation.push('Posts', {postId: post.id, isShow: isShow, tripID: tripID, day: day, guests: guests});

  }

  return (
    <Pressable onPress={goToPostPage} style={[styles.container, { width: width - 60}]}>
      <View style={styles.innerContainer}>
        {/* Image  */}
        <Image
          style={styles.image}
          source={{uri: post.image}}
        />

        <View style={{flex: 1, marginHorizontal: 10}}>
          {/* Bed & Bedroom  */}
          <Text style={styles.bedrooms}>
            {post.startTime} - {post.endTime}, {post.maxGuests} guests
          </Text> 

          {/* Type & Description */}
          <Text style={styles.typetxt} numberOfLines={2}>
            {post.type}
          </Text>
          <Text style={styles.description} numberOfLines={2}>
            {post.title}
          </Text>

          {/*  Old price & new price */}
          <Text style={styles.prices}>
            <Text style={styles.price}>฿ {post.newPrice} / day </Text>

          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default Post;
