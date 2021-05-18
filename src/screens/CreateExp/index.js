import React, {useEffect, useRef, useState, useMemo} from 'react';
import {View, Text, TextInput, TouchableOpacity, useWindowDimensions, FlatList} from 'react-native';

import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';

import {Storage, API, graphqlOperation, Auth} from 'aws-amplify';
import {useRoute, useNavigation} from '@react-navigation/native';

import styles from './styles';
import { createExperience } from '../../../graphql/mutations';
import { listBookeds, getPost } from '../../../graphql/queries'

import SelectActivityList from '../../components/SelectActivityList'
import { initialWindowMetrics } from 'react-native-safe-area-context';

const CreateExp = () => {
  const [description, setDescription] = useState('');
  const [videoKey, setVideoKey] = useState(null);
  const [history, setHistory] = useState([]);

  const [selectedPost, setSelectedPost] = useState('');
  const [selectedPostID, setSelectedPostID] = useState('');


  const route = useRoute();
  const navigation = useNavigation();

  const width = useWindowDimensions().width;

  var todayDate = new Date().toISOString().slice(0,10);

  const uploadToStorage = async (imagePath) => {
    try {

        const response = await fetch(imagePath);     
        const blob = await response.blob();
        const filename = `${uuidv4()}.mp4`;
        const s3Response = await Storage.put(filename, blob);
        setVideoKey(s3Response.key);

    } catch (e) {
      console.error(e);
    }
  };

 
  useEffect(() => {

   uploadToStorage(route.params.videoUri);

    const fetchTodayActivity = async () => {

      const userInfo = await Auth.currentAuthenticatedUser();
  
       try{
           const postResult = await API.graphql(
             graphqlOperation(listBookeds,{
               filter:{
                 userID: {
                   eq: userInfo.attributes.sub
                 },
                 and: {
                   date:{
                     eq: todayDate
                   }
                 }
               }
             })
           )
  
          setHistory(postResult.data.listBookeds.items) ;
       }catch(e){
         console.log(e)
       }
    }
    
    fetchTodayActivity()

  }, []); 

  const onPublish = async () => {
    // create post in the database (API)
    if (!videoKey) {
      console.warn('Video is not yet uploaded');
      return;
    }

    try {
      const userInfo = await Auth.currentAuthenticatedUser();

      const newPost = {
        contentUri: videoKey,
        description: description,
        userID: userInfo.attributes.sub,
        postID: selectedPost
      };

      const response = await API.graphql(
        graphqlOperation(createExperience, {input: newPost}),
      );
      navigation.navigate("Localife", { screen: "LocalifeAndCam" });
    } catch (e) {
      console.error(e);
    }
  };



  return (

    <View style={styles.container}>
    <View style={{marginTop: 30}}>
    <Text style={{fontSize: 25, fontWeight: 'bold', color: 'black', marginLeft: 15, marginBottom:5, marginTop:10}}>Select activity</Text>
    <FlatList
          data={history}
          renderItem={({item}) => <SelectActivityList post={item} onPress={() => setSelectedPost(item.postID)} 
                      isSelected = {item.postID === selectedPost}/>}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={width - 60}
          snapToAlignment={"center"}
          decelerationRate={"fast"}
         
        />

      </View>
      <View style={{marginTop: 50}}>
      <Text style={{fontSize: 25, fontWeight: 'bold', color: 'black', marginLeft: 15, marginBottom:5}}>Say something</Text>
      <TextInput
        value={description}
        onChangeText={setDescription}
        numberOfLines={3}
        style={styles.textInput}
        multiline = {true}
        textAlignVertical = {'top'}
      />
      </View>
      <TouchableOpacity onPress={onPublish}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Publish</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CreateExp;
