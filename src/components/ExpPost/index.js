import React, {useEffect, useState, useRef} from 'react';
import {View, TouchableWithoutFeedback, Text, Image, TouchableOpacity, useWindowDimensions, LogBox} from 'react-native';
import {Storage} from 'aws-amplify';

import { Button } from 'native-base';

import { useNavigation } from '@react-navigation/native';

import Video from 'react-native-video';
import styles from './styles';

import FontAwesome from 'react-native-vector-icons/FontAwesome';


const ExpPost = (props) => {
  const [post, setPost] = useState(props.post);
  const [isLiked, setIsLiked] = useState(false);
  const [videoUri, setVideoUri] = useState('');

  const [paused, setPaused] = useState(false);

  const width = useWindowDimensions().width;

  const navigation = useNavigation();

  useEffect(() => {
    LogBox.ignoreLogs(['Trying to load empty source']);
  }, [])

  const onPlayPausePress = () => {
    setPaused(!paused);
  };

  const gotoPost = () =>{
    onPlayPausePress();
    navigation.navigate('Posts', {postId: post.post.id, isShow: true});
   };

  const getVideoUri = async () => {
    if (post.contentUri.startsWith('http')) {
      setVideoUri(post.contentUri); // get video from url
      return;
    }
    setVideoUri(await Storage.get(post.contentUri));  //get video from s3
  };

  useEffect(() => {
    getVideoUri();
  },[]);


  return (
    <View style={{backgroundColor: 'white'}}>

      {/* Content */}
      <TouchableWithoutFeedback onPress={onPlayPausePress}>
        <View style={styles.container}>
          
          <Video
            source={{uri: videoUri}}
            style={styles.video}
            onError={(e) => console.log(e)}
            resizeMode={'cover'}
            repeat={true}
            paused={paused}
            maxBitRate={756000}
          />
          <View style={styles.uiContainer}>
            <View style={styles.rightContainer}>
            <Button rounded style={{width: 52, height: 50, borderRadius: 10, paddingLeft: 8, backgroundColor: '#1D565D'}} 
            onPress={gotoPost}>
              <FontAwesome name={'compass'} size={42} color="white"/>
            </Button>
            </View>

         </View>
         
        </View>
      </TouchableWithoutFeedback>

        {/* Profile */}
      <TouchableOpacity onPress={() => navigation.navigate('User', {userID : post.user.id}) }>
      <View style={{marginLeft: 20, marginTop: 10, flex: 1, flexDirection: "row"}}>              
            <Image
                style={styles.profilePicture}
                source={{uri: post.user.imageUri}}
              />      
            <Text style={styles.handle}>  {post.user.username}</Text>
           
       </View>
       </TouchableOpacity>

        {/* Description */}
       <View style={{marginLeft: 20, marginTop: 5, marginBottom: 50 }}> 
       <Text style={styles.description}>{post.description}</Text>
       </View>

    </View>
  );
};

export default ExpPost;
