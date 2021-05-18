import React, {useEffect, useState} from "react";
import { Text, Pressable, View } from "react-native";

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import {useNavigation} from '@react-navigation/native';

import { API, graphqlOperation, Auth } from 'aws-amplify';

import { createBooked, updateTrip } from '../../../graphql/mutations';
import { getTrip } from '../../../graphql/queries';

const BookButton = (props) => {

  const [tripStartTime, setTripStartTime] = useState(null);
  const [tripEndTime, setTripEndTime] = useState(null);

  const {postID, isShow, price, tripID, day, guests, province, startTime, endTime} = props
  const navigation = useNavigation();


  const fetchTrip = async () => {
    try{
        const tripResult = await API.graphql(
          graphqlOperation(getTrip, {id: tripID})
        )

     setTripStartTime(tripResult.data.getTrip.tripStartTime);
     setTripEndTime(tripResult.data.getTrip.tripEndTime);
    
    }catch(e){
      console.log(e)
    }
}

useEffect(() => {
  fetchTrip();
}, []);


  const onTripPress = () => {
      updateTrips() ;
  }

  const updateTrips = async () =>{

    const userInfo = await Auth.currentAuthenticatedUser();

    if(startTime > tripEndTime){
        const updateDetail = {
          id: tripID,
          tripEndTime: endTime
      }

      const tripResponse = await API.graphql(
        graphqlOperation(updateTrip, {input: updateDetail})
      )


    }else if(endTime < tripStartTime){
        const updateDetail = {
          id: tripID,
          tripStartTime: startTime
        }

        const tripResponse = await API.graphql(
          graphqlOperation(updateTrip, {input: updateDetail})
        )
    }

    const detail = {
      userID: userInfo.attributes.sub,
      postID: postID,
      date: day,
      tripID: tripID,
      isDone: false
    };

    try{
        const response = await API.graphql(
          graphqlOperation(createBooked, {input: detail})
        );
    }catch(e){
        console.error(e);
    }

    navigation.push('Confirmation', 
          {
            date: day,
            tripID: tripID,
            guests: guests,
            province: province
          }
        ); 
  }


  return (
    <View style={{flexDirection: "row", backgroundColor: 'white', borderTopColor: '#D7D7D7', borderTopWidth: 1, paddingBottom: 15}}>
        <Text style={{alignItems:'flex-start', marginTop: 20, marginLeft: 20}}><Text style={{fontWeight:'bold', fontSize: 28}}>฿{price}</Text> / day</Text>
        <View style={{alignItems: 'flex-end', width:'80%'}}>
        {isShow ? 
            <Pressable
                onPress={()=> {
                  navigation.navigate('Calendars',
                    {
                      postID: postID,
                      startTime: startTime,
                      endTime: endTime,
                      province: province
                    }
                  ); 
                }}
                style={{
                backgroundColor: '#281C4A',
                alignItems: 'center',
                justifyContent: 'center',
                height: 50,
                marginRight: 70,
                borderRadius: 10,
                width: '65%',
                marginTop: 15,
                }}>
                    <Text style={{fontSize: 18, color: 'white', fontWeight: 'bold'}}>
                    Check Available
                    </Text>
            </Pressable>
          : <Pressable
                style={{
                  backgroundColor: '#281C4A',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 50,
                  marginHorizontal: 10,
                  borderRadius: 10,
                  width: '45%',
                  marginTop: 15,
                  borderWidth: 1,
                  flexDirection: "row",
                  marginRight: 70,
                }}
                onPress={onTripPress}
                >
                  <FontAwesome5 name={'plus'} size={18} color="white" style={{marginRight: 5 }}/>
                    <Text style={{fontSize: 20, color: 'white', fontWeight: 'bold', marginLeft: 5}}>
                      Trip
                    </Text>
            </Pressable> }    
            </View>
      </View>

  );
};

export default BookButton;

