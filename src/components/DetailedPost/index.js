import React, {useState, useEffect}  from 'react';
import {View, Text, Image, ScrollView, FlatList, SectionList} from 'react-native';
import styles from './styles.js';

const Post = (props) => {
  
  const post = props.post;
 

  return (

      <View style={styles.container}>

        {/* Bed & Bedroom  */}
        <Text style={styles.bedrooms}>
          {post.hours} hr. {post.activity_n} activity , {post.maxGuests} guests
        </Text>

        {/* Type & Description */}
        <Text style={styles.typetxt} numberOfLines={2}>
          {post.type}
        </Text>
        <Text style={styles.description}>
          {post.title}
        </Text>
        <Text style={{fontSize: 12, marginBottom: 5}}>
          {post.address}
        </Text>

        {/*  Old price & new price */}
        <Text style={styles.prices}>
          <Text style={styles.price}>{post.startTime}-{post.endTime} </Text>
        </Text>

        <Text style={styles.longDescription}>
          {post.description}
        </Text>
        
      </View>
  

     
  );
};

export default Post;
