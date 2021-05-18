import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, TouchableOpacity, RefreshControl, Linking } from 'react-native';
import { Agenda } from 'react-native-calendars'

import {Auth, API, graphqlOperation} from 'aws-amplify';
import { listTrips } from '../../../graphql/queries';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { useNavigation } from '@react-navigation/native';

import { Badge } from 'native-base' ;



const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

const Trip = (props) => {

  const [trips, setTrips] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const navigation = useNavigation();

  var todayDate = new Date().toISOString().slice(0,10);

  let  trip = {} ;


  const fetchTrips = async () => {

    const userInfo = await Auth.currentAuthenticatedUser();

     try{
         const postResult = await API.graphql(
           graphqlOperation(listTrips,{
             filter:{
               userID: {
                 eq: userInfo.attributes.sub
               }
             }
           })
         )

         setTrips(postResult.data.listTrips.items) ;

      

     }catch(e){
       console.log(e)
     }

  
  }



  useEffect(() => {
    fetchTrips();
 
  }, []) ;

              
  trips.forEach((p) => {
    if(p.date >= todayDate){
      trip = {
        ...trip,
        [p.date] : p.booked.items
      }

      }
  });

        


  const renderItem = (item) => {
    return (
      <View>
        <TouchableOpacity
          style={{backgroundColor: '#FCF6EE',
                  flex: 1,
                  borderRadius: 5,
                  padding: 10,
                  marginRight: 10,
                  marginTop: 17}}
                  onPress={() => navigation.navigate('Posts', {postId: item.post.id, isShow: true})}
        >
          <View>
          <View style={{marginBottom: 10}}>
          {item.isDone == true ?
          <Badge success > 
                <Text style={{fontSize: 12, color: 'white'}}>
                    Approved
                </Text> 
          
          </Badge>
          : item.isDone == null ?
          <Badge danger> 
                <Text style={{fontSize: 12, color: 'white'}}>
                    Declined 
                </Text> 
          
          </Badge>
          : 
          <Badge warning> 
                <Text style={{fontSize: 12, color: 'white'}}>
                    Pending 
                </Text> 
          
          </Badge>}
          </View>
          <Text>{item.post.startTime} - {item.post.endTime}</Text>
          <Text style={{fontWeight:'bold'}}>{item.post.title}</Text>

          </View>

          <TouchableOpacity  onPress={() => Linking.openURL('google.navigation:q='+item.post.latitude+'+'+item.post.longitude)}>
          <View style={{justifyContent:'flex-end'}}>
          <FontAwesome5 name={'map-marker-alt'} size={22} color="#1D565D" style={{alignSelf: 'flex-end', marginRight: 5, marginBottom: 5}}/>
          </View>
          </TouchableOpacity>

        </TouchableOpacity>
        
      </View>
    ); 
  }


  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false)).then(() => fetchTrips());
  }, []);

  return (

    <View style={{height: '100%', flex: 1}}>
        <Agenda 
         items={trip}
         renderItem={(item, firstItemInDay) => renderItem(item)}
         theme={{backgroundColor: 'white', agendaKnobColor: '#20163B'}}
         minDate={todayDate}
         refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                />
                
         }

        />

    </View>

    
  );
};


export default Trip;
