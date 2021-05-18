import React from 'react';
import {View, Text, Image, Pressable} from 'react-native';
import styles from './styles.js';
import { useNavigation } from '@react-navigation/native';
import { Badge } from 'native-base' ;

const Post = (props) => {

  const post = props.post;
  const isShow = props.isShow ;

  const navigation = useNavigation();

  const goToPostPage = () => {
    navigation.navigate('Posts', {postId: post.id, isShow: isShow});
 }



 function BadgeCat() {
  let cat = post.type;
  if (cat == "Farmer") {
    return <Badge success style={{marginLeft: 10}}> 
                <Text style={styles.typetxt} numberOfLines={2}>
                    {post.type} 
                </Text> 
            </Badge>
  }
  if (cat == "Fishing") {
    return <Badge info style={{marginLeft: 10}}>  
                <Text style={styles.typetxt} numberOfLines={2}>
                    {post.type} 
                </Text> 
            </Badge>
  }
  if (cat == "Handmade") {
    return <Badge warning style={{marginLeft: 10}}> 
                <Text style={styles.typetxt} numberOfLines={2}>
                    {post.type} 
                </Text> 
            </Badge>
  }
  if (cat == "Eatable") {
    return <Badge Light style={{marginLeft: 10}}> 
                <Text style={styles.typetxt} numberOfLines={2}>
                    {post.type} 
                </Text> 
            </Badge>
  }

  if (cat == "Husbandry") {
    return <Badge Danger style={{marginLeft: 10}}> 
                <Text style={styles.typetxt} numberOfLines={2}>
                    {post.type} 
                </Text> 
            </Badge>
  }
  if (cat == "Hill") {
    return <Badge Dark style={{marginLeft: 10}}> 
                <Text style={styles.typetxt} numberOfLines={2}>
                    {post.type} 
                </Text> 
            </Badge>
  }
}


  return (

     <Pressable onPress={goToPostPage} style={styles.container}> 
      {/* Image  */}
      <Image
        style={styles.image}
        source={{uri: post.image}}
      />

      {/* Bed & Bedroom  */}
      <Text style={styles.bedrooms}>
        {post.hours} hr. {post.activity_n} activity
      </Text>

      {/* Type & Description */}
      

      <BadgeCat />

      <Text style={styles.description} numberOfLines={2}>
        {post.title}
      </Text>


      {/*  Old price & new price */}
      <Text style={styles.prices}>
        <Text style={styles.oldPrice}>฿{post.oldPrice}</Text>
        <Text style={styles.price}>  ฿{post.newPrice} </Text>
        / day
      </Text>

    </Pressable>
  );
};

export default Post;
