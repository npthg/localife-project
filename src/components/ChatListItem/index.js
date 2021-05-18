import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback
} from "react-native";

import styles from "../ChatListItem/styles";

import { useNavigation } from '@react-navigation/native';

import {API, graphqlOperation, Auth} from 'aws-amplify';

import { getPost } from '../../../graphql/queries';

import { socket } from '../../services/socket'

const ChatListItem = (props) => {
  const postID  = props.postID;
  const [ posts, setPosts] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {

    const fetchPost = async () => {
        const postResult = await API.graphql(
          graphqlOperation(getPost, {id: postID}),
        );
        setPosts(postResult.data.getPost);
      };

      fetchPost(); 

  }, [])

  const onClick = () => {
    socket.on("disconnect", () => {
  })
  navigation.navigate('Messages', {
    lineID: posts.lineUserID,
    title: posts.title,
  })
  }


  return (
    <TouchableWithoutFeedback onPress={onClick}>
      <View style={styles.container}>
        <View style={styles.lefContainer}>
          <Image source={{ uri: posts.image }} style={styles.avatar}/>

          <View style={styles.midContainer}>
            <Text style={styles.username}>{posts.title}</Text>

            {/* <Text
              numberOfLines={2}
              style={styles.lastMessage}>
              {chatRoom.lastMessage
                ? `${chatRoom.lastMessage.user.name}: ${chatRoom.lastMessage.content}`
                : ""}
            </Text> */}

          </View>

        </View>

        {/* <Text style={styles.time}>
          {chatRoom.lastMessage && moment(chatRoom.lastMessage.createdAt).format("DD/MM/YYYY")}
        </Text> */}
      </View>
    </TouchableWithoutFeedback>
  )
};

export default ChatListItem;