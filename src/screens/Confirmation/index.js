import React, {useState, useEffect} from "react";
import { ScrollView, FlatList, Text, View, Image, useWindowDimensions, Pressable, Modal, StyleSheet, TextInput } from "react-native";
import PostCarouselItem from '../../components/PostCarouselItem';

import {useRoute, useNavigation} from '@react-navigation/native';

import { API, graphqlOperation, Auth } from 'aws-amplify';
import { updateTrip, updateBooked } from '../../../graphql/mutations';
import { listPosts, getTrip, getUser } from '../../../graphql/queries';

import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input";


import { socket } from '../../services/socket';

import base64 from 'react-native-base64'

const publicKey = 'pkey_test_5nn4b8nexjmi8ft3quq' ;
const secretKey = 'skey_test_5nn4b8nf84g2w0s9vlc' ;

const Confirmation = (props) => {

    const [posts, setPost] = useState([]);
    const [relatePost, setRelatePost] = useState([]);
    const [user, setUser] = useState([]) ;
    const [creditVisible, setCreditVisible] = useState(false);
    const [confirmVisible, setConfirmVisible] = useState(false);
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const [expYear, setExpYear] = useState(0);
    const [expMonth, setExpMonth] = useState(0);
    const [secureCode, setSecureCode] = useState('');
    const [totalPrice, setTotalPrice] = useState(0);
    const [form, setForm] = useState(null);

    const route = useRoute();
    const day = route.params.date;
    const tripID = route.params.tripID;
    const guests = route.params.guests;
    const province = route.params.province;
    
    const width = useWindowDimensions().width;

    const navigation = useNavigation();

    const fetchUser = async () => {
        const userInfo = await Auth.currentAuthenticatedUser();
    
        const getUserResponse = await API.graphql(
          graphqlOperation(getUser, {id: userInfo.attributes.sub}),
        );
    
        setUser(getUserResponse.data.getUser)
      };

    const fetchTrip = async () => {
        try{
            const tripResult = await API.graphql(
              graphqlOperation(getTrip, {id: tripID})
            )

         setPost(tripResult.data.getTrip.booked.items);
         fetchPost(tripResult.data.getTrip.tripStartTime, tripResult.data.getTrip.tripEndTime)

         let arr = []
         for( const p of tripResult.data.getTrip.booked.items){
             arr.push(p.post.newPrice)
         }
 
        setTotalPrice(arr.reduce((a, b) => a + b, 0))


        }catch(e){
          console.log(e)
        }
    }

        const fetchPost = async (s,e) => {
            try{
                const postResult = await API.graphql(
                    graphqlOperation(listPosts,{
                        filter: {
                                    maxGuests:{
                                        ge: guests
                                    },
                                    province:{
                                        eq: province
                                    },
                                    not:{
                                        startTime:{
                                            between: [s, e]
                                        }
                                    },
                                    not:{
                                        endTime:{
                                            between: [s, e]
                                        }
                                    }
                                }
                    })
                )
                setRelatePost(postResult.data.listPosts.items) ; 
            }catch(e){
                console.log(e)
            }
     }

    useEffect(() => {
        fetchUser();
        fetchTrip();

      }, []);


    function ChangeFormateDate(oldDate){
        return oldDate.toString().split("-").reverse().join("-");
    }


    const renderPostDetail = ({item}) => (
        <View style={{flexDirection: 'row', marginVertical: 15}}>
            <Image source={{ uri: item.post.image }} 
                    style={{width: 120,
                            height: 120,
                            borderRadius: 10,
                            marginRight: 15,
                        }}
            />
                    
            <View>
                <Text style={{fontWeight: 'bold',fontSize: 18,marginTop: 10}} numberOfLines={2}> 
                {item.post.title}
                </Text>
                <Text style={{fontSize: 14, marginTop:10}}> 
                {item.post.hours} hr. {item.post.activity_n} activities
                </Text>
                <Text style={{fontSize: 14,}}>
                {item.post.startTime} - {item.post.endTime}
                </Text>
            </View>

        </View>
                    
      );

      const renderPrice = ({item}) => (
        <View style={{marginLeft: 40, marginTop: 20, flexDirection: 'row', width:'100%', marginBottom: 25}}>
            <Text style={{fontWeight: 'bold',fontSize: 18, color: 'black'}}>{item.post.title}  </Text> 
            <Text style={{fontSize: 18, color: '#A0A0A0', marginLeft:50}}>{item.post.newPrice} ฿</Text> 
         </View>     
      );






    const onPaymentClick = () => {

        setConfirmVisible(true);
        //setCreditVisible(true);

    }

    const onModalCreditPress = () => {
        setCreditVisible(false);
        setConfirmVisible(true);
    }

    const onModalConfirmPress = () => {
        updateTrips() ;
        //payment();
        navigation.navigate('Explore'); 
        setConfirmVisible(false);


    }
    


    const updateTrips = async () => {
        try {

            for(const p of posts){
                // let updateBook = {
                //     id: p.id,
                //     isDone: true
                // }

                // const bookResponse =  await API.graphql(
                //     graphqlOperation(updateBooked, {input: updateBook})
                // )

                socket.emit("place", day, p.post.lineUserID, user.username, guests, p.id);
            }

            // const updateDetail = {
            //     id: tripID,
            //     isDone: true
            // }

            // const tripResponse = await API.graphql(
            //   graphqlOperation(updateTrip, {input: updateDetail})
            // )

          } catch (e) {
            console.error(e);
          }
       

    }

    // const payment = async () => {
    //     const data = await fetch('https://vault.omise.co/tokens', {
    //         method: 'POST',
    //         headers: 
    //         {
    //             'Authorization': 'Basic ' + base64.encode(publicKey+ ":") ,
    //             'Content-Type': 'application/json',
    //             'Omise-Version': '2019-05-29'
    //         }           ,
    //           body: JSON.stringify({
    //             'card': {
    //                 'name': 'Localife',
    //                 'city': 'Bangkok',
    //                 'number': form.values.number,
    //                 'expiration_month': parseInt((form.values.expiry).split('/')[0]),
    //                 'expiration_year': parseInt('20'+(form.values.expiry).split('/')[1]),
    //                 'security_code': parseInt(form.values.cvc)
    //             }
    //           })
    //      }) .then(response => response.json())
    //      .then(data => { 
    //          fetch('https://api.omise.co/charges',{
    //             method: 'POST',
    //             headers: 
    //             {
    //             'Authorization': 'Basic ' + base64.encode(secretKey+ ":") ,
    //             'Content-Type': 'application/json',
    //             'Omise-Version': '2019-05-29'
    //             },
    //             body: JSON.stringify({
    //                 'amount': totalPrice*100,
    //                 'currency': 'thb',
    //                 'card' : data.id
    //             }) 
    //          }).then(response => response.json()).then(data => console.log(data)).catch(err => console.error(err));
    //      })
    //      .catch(err => console.error(err));

    // }

    const onCreditCardChange = (form) => {
        setForm(form);
    }
    

    return (
        <ScrollView style={{backgroundColor: '#FCF6EE'}}>
            <View style={{
                    width: "100%",
                    padding: 20,
                    borderBottomWidth: 10
                    , borderBottomColor: '#E2E2E2'}}>

                    <FlatList 
                        data = {posts}
                        renderItem = {renderPostDetail}
                        showsVerticalScrollIndicator ={false}
                    />
            </View>

            <View style={{width: "100%", borderBottomWidth:10, borderBottomColor: '#E2E2E2',marginTop: 10}}>
                <Text style={{marginTop: 15, marginLeft: 20, fontSize: 24, fontWeight:"bold"}}>Reserved</Text>
                    <View style={{marginLeft: 40, marginTop: 20,}}>
                        <Text style={{fontWeight: 'bold',fontSize: 18, color: 'black'}}>Date </Text> 
                        <Text style={{fontSize: 16, color: '#A0A0A0'}}>{day} </Text> 
                    </View>
                    <View style={{marginLeft: 40, marginTop: 20, marginBottom: 25}}>
                        <Text style={{fontWeight: 'bold',fontSize: 18}}>Guest </Text> 
                        <Text style={{fontSize: 16, color: '#A0A0A0'}}>{guests} Persons</Text> 
                    </View>
            </View>

            

            <View style={{width: "100%", borderBottomWidth:10, borderBottomColor: '#E2E2E2',marginTop: 10}}>
                <Text style={{marginTop: 15, marginLeft: 20, fontSize: 24, fontWeight:"bold"}}>Summary</Text>

                <FlatList 
                        data = {posts}
                        renderItem = {renderPrice}
                        showsVerticalScrollIndicator ={false}
                    />
                    
            </View>


            <View style={{width: "100%" ,marginTop: 10}}>
                <Text style={{marginTop: 15, marginLeft: 20, fontSize: 24, fontWeight:"bold"}}>Join more activity on this day</Text>
                {relatePost.length > 0 ?
                <FlatList
                    data={relatePost}
                    renderItem={({item}) => <PostCarouselItem post={item} isShow={false} tripID={tripID} day={day} guests={guests}/>}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    snapToInterval={width - 60}
                    snapToAlignment={"center"}
                    decelerationRate={"fast"}
                    style={{marginVertical:25}}
                />
                : <Text style={{alignSelf: 'center', marginVertical:20, color:'lightgray'}}>Sorry, no activity available</Text>
                }                   
                    
            </View>

            <View style={{width: "100%" ,marginTop: 10,alignItems: 'center', marginBottom: 20}}>
            <Pressable
                style={{
                    backgroundColor: '#281C4A',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 50,
                    borderRadius: 10,
                    width: '80%',
                    marginTop: 15 
                    }}
                onPress = {onPaymentClick}

            >
                <Text style={{fontSize: 18, color: 'white', fontWeight: 'bold'}}>
                Payment
                </Text>
        </Pressable>    
                    
            </View>
            
            {/* <Modal
                animationType="slide"
                transparent={true}
                visible={creditVisible}
              >
                  <View style={styles.centeredView}>

                      <View style={styles.modalView}>
                          <Text style={styles.modalText}>Credit card information</Text>
                         
                            <LiteCreditCardInput autoFocus onChange={onCreditCardChange} />

                          <Pressable
                              style={styles.buttonDone}
                              onPress={onModalCreditPress}
                          >
                              <Text style={styles.textStyle}>Confirm</Text>
                          </Pressable>
                        </View>

                    </View>
              </Modal> */}

              <Modal
                animationType="slide"
                transparent={true}
                visible={confirmVisible}
              >
                  <View style={styles.centeredView}>

                      <View style={styles.modalView}>
                          <Text style={styles.modalText}>Confirmation</Text>
                          <View style={styles.row}>
                          <Text>Date: {day}</Text>
                          </View>
                          <View style={styles.row}>
                          <Text>Guests: {guests}</Text>
                          </View>
                          <View style={styles.row}>
                          <Text>TotalPrice: {totalPrice}</Text>
                          </View>
                          <Pressable
                              style={styles.buttonDone}
                              onPress={onModalConfirmPress}
                          >
                              <Text style={styles.textStyle}>Confirm</Text>
                          </Pressable>
                        </View>

                    </View>
              </Modal>
            
            
        </ScrollView>
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
      textAlign: "center",
      fontWeight:'bold',
      fontSize: 20
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
      paddingVertical: 10,
      marginHorizontal: 20,
  
    }
  });

export default Confirmation;
