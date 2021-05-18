import React, {useState, useEffect } from "react";
import { Text, Pressable, View, Modal, StyleSheet } from "react-native";
import { CalendarList } from 'react-native-calendars';

import {useRoute, useNavigation} from '@react-navigation/native';

import { API, graphqlOperation, Auth } from 'aws-amplify';
import { listBookeds, getPost } from '../../../graphql/queries';
import { createTrip, createBooked } from '../../../graphql/mutations';


const Calendars = (props) => {

    const [existDate, setExistDate] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [guests, setGuests] = useState(1);
    const [day, setDay] = useState(null);
    const [mxGeust, setMxGuest] = useState(0);

    const route = useRoute();
    const postIDs = route.params.postID;
    const startTime = route.params.startTime;
    const endTime = route.params.endTime;
    const province = route.params.province;

    let  disableDay = {} ;

    const navigation = useNavigation();
    
    let tripID = "" ;

    useEffect(() => {
      const fetchExistDay = async () => {
         try{
             const postResult = await API.graphql(
               graphqlOperation(listBookeds,{
                 filter:{
                   postID: {
                     eq: postIDs
                   },
                   and:{
                     isDone:{
                       eq: true
                     }
                   }
                 }
               })
             )
    
             setExistDate(postResult.data.listBookeds.items) ;

         }catch(e){
           console.log(e)
         }
      }
      fetchExistDay();
    }, []);
    
    useEffect(() => {
      const fetchPost = async () => {
        try{
          const postResult = await API.graphql(
            graphqlOperation(getPost,{
              id: postIDs
            })
          )
          setMxGuest(postResult.data.getPost.maxGuests)
        }catch(e){
          console.error(e)
        }
      }

      fetchPost();
    }, [])
    
    existDate.forEach((day) => {
      disableDay = {
          ...disableDay,
          [day.date]: {
              selected: true,
              disableTouchEvent: true,
              selectedColor: 'white',
              selectedTextColor: '#D7D7D7'
          }
      }
  }) 

  const onDayPress = (day) => {
    setDay(day.dateString)
    setModalVisible(true);

  };

   const createUserBooked = async () => {
    
        const userInfo = await Auth.currentAuthenticatedUser();

          try {

            const tripDetail = {
              userID: userInfo.attributes.sub,
              date: day,
              isDone: false,
              guests: guests,
              tripStartTime: startTime,
              tripEndTime: endTime
            }

            const tripResponse = await API.graphql(
              graphqlOperation(createTrip, {input: tripDetail})
            )

            tripID = tripResponse.data.createTrip.id ;

            const detail = {
              userID: userInfo.attributes.sub,
              postID: postIDs,
              date: day,
              tripID: tripID,
              isDone: false
            };

            const response = await API.graphql(
              graphqlOperation(createBooked, {input: detail})
            );
      
          } catch (e) {
            console.error(e);
          }

          navigation.navigate('Confirmation', 
          {
            date: day,
            tripID: tripID,
            guests: guests,
            province: province

          }
        ); 
            
    };
    
    const onModalPress = () => {
           
      setModalVisible(!modalVisible)
      createUserBooked(day);

    };

  
      var todayDate = new Date().toISOString().slice(0,10);


    return (
        <View style={{backgroundColor: 'white', height: '100%', paddingTop: 25}}>
            <CalendarList 
                onDayPress={onDayPress}
                markedDates={disableDay}
                minDate={todayDate}
            />

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
              >
                  <View style={styles.centeredView}>

                      <View style={styles.modalView}>
                          <Text style={styles.modalText}>How many guests</Text>
                          <View style={styles.row}>
                              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Pressable
                                  onPress={() => setGuests(Math.max(1, guests - 1))}
                                  style={styles.button}>
                                  <Text style={{fontSize: 20, color: '#474747', marginBottom: 5}}>-</Text>
                                </Pressable>

                                <Text style={{marginHorizontal: 20, fontSize: 16}}>{guests}</Text>

                                <Pressable
                                  onPress={() => setGuests(Math.min(guests + 1, mxGeust))}
                                  style={styles.button}>
                                  <Text style={{fontSize: 20, color: '#474747', marginBottom:4}}>+</Text>
                                </Pressable>

                              </View>
                            </View>

                          <Pressable
                              style={styles.buttonDone}
                              onPress={onModalPress}
                          >
                              <Text style={styles.textStyle}>Confirm</Text>
                          </Pressable>
                        </View>

                    </View>
              </Modal>

          </View>
    );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  buttonDone: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 20,
    backgroundColor: '#281C4A'
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  button: {
    borderWidth: 1,
    width: 30,
    height: 30,
    borderRadius: 15,
    borderColor: '#474747',
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
    marginHorizontal: 20,

  }
});

export default Calendars ;
