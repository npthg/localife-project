import React, {useEffect, useState} from "react";
import { View, FlatList, Text } from "react-native";

import Post from '../../components/Post';

import { useRoute } from "@react-navigation/native";

import { API, graphqlOperation} from 'aws-amplify';
import { listPosts } from '../../../graphql/queries';

const CategoryScreen = (props) => {

    const route = useRoute();
    const { category }  = route.params;

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPost = async () => {
           try{
            const postResult = await API.graphql(
                graphqlOperation(listPosts
                , 
                  {
                    filter: {
                        type: {
                            eq: category
                            }
                        }
                    })
                )   
   
               setPosts(postResult.data.listPosts.items) ; 
           }catch(e){
             console.log(e)
           }
        }
   
        fetchPost();
      }, [])

   
  return (
    <View style={{backgroundColor: '#FCF6EE', height: '100%'}}>
      <FlatList
        data={posts}
        renderItem={({item}) => <Post post={item} isShow={true}/>}
      />
    </View>
  );
};

export default CategoryScreen;
