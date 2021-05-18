import React, {useEffect, useState } from 'react';
import {View, FlatList, Dimensions, TouchableWithoutFeedback, Text, Modal, LogBox, useWindowDimensions} from 'react-native'

import {API, graphqlOperation} from 'aws-amplify';
import { getPost } from '../../../graphql/queries';
import {Storage} from 'aws-amplify';
import Video from 'react-native-video';

import { Button } from 'native-base';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {useNavigation} from '@react-navigation/native';

const ExpProfile = (props) => {

  const exp = props.exp ;  
  const index = props.index ;

  const [videoUri, setVideoUri] = useState('');
  const [pause, setPause] = useState(false);
  const [modalVisible, setModalVisible] = useState(false)
  const [post, setPost] = useState([]);
  const width = useWindowDimensions().width ;

  const navigation = useNavigation();

  useEffect(() => {
    LogBox.ignoreLogs(['Trying to load empty source']);
  }, [])

  useEffect(() => {
    const fetchPost = async () => {
      try{
        const postResult = await API.graphql(
          graphqlOperation(getPost,{
            id: exp.postID
          })
        )
        setPost(postResult.data.getPost)
      }catch(e){
        console.error(e)
      }
    }

    fetchPost();
  }, [])


  const getVideoUri = async () => {
    if (exp.contentUri.startsWith('http')) {
      setVideoUri(exp.contentUri); // get video from url
      return;
    }
    setVideoUri(await Storage.get(exp.contentUri));  //get video from s3
  };

  useEffect(() => {
    getVideoUri();
  }, []) ;

  const onExpPress = () => {
    setModalVisible(true);
  }

  const gotoPost = () =>{
    setPause(true);
    setModalVisible(false);
    navigation.navigate('Posts', {postId: exp.postID, isShow: true});
   };

 
  return (

    <View>
    <TouchableWithoutFeedback onPress={onExpPress}>
    <View key={index} style={[{width: width/3.2}, {height: width/2.5}, {marginBottom: 2}, {marginLeft: 5} ]}>

       <Video
            source={{uri: videoUri}}
            onError={(e) => console.log(e)}
            resizeMode={'cover'}
            repeat={true}
            // onLoad={(e) => setPause(true)}
            paused={pause}
            muted = {true}
            maxBitRate={756000}
            style={{position: 'absolute',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,}}
          />
    </View>
    </TouchableWithoutFeedback>
    <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
          >
          <TouchableWithoutFeedback  onPressOut={() => setModalVisible(false)}>
              <View style={{flex: 1,
                            justifyContent: "center",
                            alignItems: "center",
                           }}>

                  <View style={{margin: 10,
                                backgroundColor: "white",
                                borderRadius: 0,
                                paddingBottom: 15,
                                alignItems: "center",
                                shadowColor: "#000",
                                shadowOffset: {
                                  width: 0,
                                  height: 2
                                },
                                shadowOpacity: 0.25,
                                shadowRadius: 4,
                                elevation: 5}}>

                            <Video
                                source={{uri: videoUri}}
                                onError={(e) => console.log(e)}
                                resizeMode={'cover'}
                                repeat={true}
                                paused={false}
                                maxBitRate={756000}
                                style={{position: 'relative',
                                        height: 500,
                                        width: width}}
                              />


                        <View style={{
                                    height: 70,
                                    position: 'absolute',
                                    justifyContent: 'flex-end',
                                    height:'100%',
                                    width: '100%',
                                    }}>
                        <Button rounded style={{width: 52, height: 50, borderRadius: 10, paddingLeft: 8, backgroundColor: '#1D565D', alignSelf: 'flex-end'}} 
                        onPress={gotoPost}>
                          <FontAwesome name={'compass'} size={42} color="white"/>
                        </Button>
                        </View>

                        


                <View style={{alignSelf: "flex-start", marginTop: 10, marginLeft: 10}}>
                      <Text style={{fontSize: 10}}>{post.startTime}-{post.endTime}, {post.maxGuests} guests</Text>
                      <Text>{post.title}, {post.province}</Text>
                      <Text>{post.newPrice} ฿ / day</Text>
                </View>

                  </View>

                </View>
            </TouchableWithoutFeedback>
          </Modal> 
      </View>                         
  );
};

export default ExpProfile;
