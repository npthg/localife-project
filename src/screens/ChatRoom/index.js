import React, {useEffect, useState, useCallback} from 'react';
import {View, Text, Image, FlatList, RefreshControl} from 'react-native';
import {
    API,
    graphqlOperation,
    Auth,
  } from 'aws-amplify';

import {listBookeds} from '../../../graphql/queries' 
import ChatListItem from '../../components/ChatListItem'

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

const ChatRoom = (props) => {

    const [todayActivity, setTodayActivity] = useState([]);
    var todayDate = new Date().toISOString().slice(0,10);

    const [refreshing, setRefreshing] = useState(false);

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
  
          setTodayActivity(postResult.data.listBookeds.items) ;
       }catch(e){
         console.log(e)
       }
    }

    useEffect(() => {
         fetchTodayActivity()
       }, []); 

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false)).then(() => fetchTodayActivity());
      }, []);
     
  return (
    <View style = {{flex: 1, backgroundColor: '#FCF6EE'}}> 

        <View style={{marginTop: 20, marginLeft: 20}}>
            <Text style={{fontSize: 38, fontWeight:'bold'}}>Chat</Text>
        </View>
          <FlatList
           style={{width: '100%', marginTop: 10}}
            data={todayActivity}
            renderItem={({ item }) => <ChatListItem postID={item.postID} />}
            keyExtractor={(item) => item.id}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                />}           
            >
            
          </FlatList>
    </View>
  );
};

export default ChatRoom;
