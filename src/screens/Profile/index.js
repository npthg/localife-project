import React, {useState, useEffect, useCallback} from "react";
import { ScrollView, View, Pressable, Text, FlatList, SafeAreaView, Image, useWindowDimensions, RefreshControl } from "react-native";
import {Auth, API, graphqlOperation} from 'aws-amplify';
import { getUser, listBookeds, listExperiences } from '../../../graphql/queries';
import ProfileActivityList from '../../components/ProfileActivityList';
import Ionicons from 'react-native-vector-icons/Ionicons';

import ExpProfile from '../../components/ExpProfile';

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}


const ProfileScreen = (props) => {

  const logout = () => {
    Auth.signOut();
  }

  const [user, setUser] = useState([]) ;
  const [doneAct, setDoneAct] = useState([]);
  const [exp, setExp] = useState([]);

  const [refreshing, setRefreshing] = useState(false);


  var todayDate = new Date().toISOString().slice(0,10);

  const width = useWindowDimensions().width;
  const height = useWindowDimensions().height;

  const fetchUser = async () => {
    const userInfo = await Auth.currentAuthenticatedUser();

    const getUserResponse = await API.graphql(
      graphqlOperation(getUser, {id: userInfo.attributes.sub}),
    );

    setUser(getUserResponse.data.getUser)
  };


  const fetchHistory = async () => {

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
                   lt: todayDate
                 }
               },
               and:{
                 isDone: true
               }
             }
           })
         )

         setDoneAct(postResult.data.listBookeds.items) ;

     }catch(e){
       console.log(e)
     }
  }

  const fetchExp = async () => {

    const userInfo = await Auth.currentAuthenticatedUser();

     try{
         const postResult = await API.graphql(
           graphqlOperation(listExperiences,{
             filter:{
               userID: {
                 eq: userInfo.attributes.sub
               }
             }
           })
         )

         setExp(postResult.data.listExperiences.items) ;

     }catch(e){
       console.log(e)
     }
  }

  useEffect(() => {
    fetchUser();
    fetchHistory();
    fetchExp();
    
  }, []);

  
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false)).then(() => fetchExp());
  }, []);

  const renderExp = () => {
    return exp.map((exp, index)=>{
      return(

          <ExpProfile exp = {exp} index = {index}/>

       );
       
    })
  }



  return (
    <View style={{flex:1, backgroundColor: '#FCF6EE'}}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        } >
      {/* profile detail */}
      <View style={{backgroundColor: '#281C4A', borderBottomLeftRadius: 40, borderBottomRightRadius: 40  }}>
      <View style={{alignSelf: 'center'}}>
          <View style={{width: 175, height: 175, borderRadius: 100,marginTop: 20, overflow: 'hidden'}}>
              <Image source={{uri: user.imageUri}} style={{flex: 1}} resizeMode="center"/>
          </View>
          <View style={{backgroundColor: '#41444B', position: 'absolute', bottom:0, right:0, width: 60, height: 60, borderRadius:30, alignItems: 'center', justifyContent: 'center' }}>
          <Ionicons name="ios-add" size={36} color="#DFD8c8" /> 
          </View>
 

      </View>
      

      <View style={{alignSelf: 'center', alignItems: 'center', marginBottom: 20, marginTop: 10}}>
              <Text style={{fontSize: 36, fontWeight: '600', color: '#FCF6EE'}}>{user.username}</Text>
              <Text style={{fontSize: 12, fontWeight: '200', color: '#FCF6EE'}}>{user.email}</Text>
      </View>
      </View>

      {/* Activity List */}
      <View style={{marginTop: 20}}>
        <Text style={{fontSize: 25, fontWeight: 'bold', color: 'black', marginLeft: 15, marginBottom:5}}>Travel Again</Text>
        {doneAct.length > 0 ?
        <FlatList
          data={doneAct}
          renderItem={({item}) => <ProfileActivityList post={item} />}
          horizontal
          horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={width - 60}
            snapToAlignment={"center"}
            decelerationRate={"fast"}
        />
        : <Text style={{alignSelf: 'center', fontSize: 12, color: 'lightgray', marginTop: 15}}>You did not travel anywhere. Let's explore ! </Text>}
      </View>

       {/* exp grid */}
       <View style={{marginTop: 40}}>
       <Text style={{fontSize: 25, fontWeight: 'bold', color: 'black', marginLeft: 15, marginBottom:5}}>Experience</Text>
       <View style={{marginTop: 10, flexDirection: 'row', flexWrap: 'wrap'}}>
        {renderExp()}
      </View>
      </View>
      {/* Log out btn */}
      <Pressable
        onPress={logout}
        style={{
        width: '15%',
        height: 40,
        borderRadius: 20,
        backgroundColor: '#B03A2E',
        justifyContent: 'center', alignItems: 'center', alignSelf:'center', marginTop: 20}}>
            <Ionicons name="power-outline" size={20} color="#DFD8c8" />
      </Pressable>


      </ScrollView>

      </View>

  );
};

export default ProfileScreen;
