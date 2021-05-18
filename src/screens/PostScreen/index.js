import React , {useEffect, useState} from "react";

import { View, Text, FlatList, Image, useWindowDimensions, StatusBar, ImageBackground, Pressable, LogBox, Linking } from "react-native";

import { Container, Header, Tab, Tabs, TabHeading, Icon } from 'native-base';

import DetailedPost from '../../components/DetailedPost';

import {useRoute} from '@react-navigation/native';

import { API, graphqlOperation} from 'aws-amplify';
import { getPost } from '../../../graphql/queries';

import Timeline  from 'react-native-timeline-flatlist' ;
import { ScrollView } from "react-native-gesture-handler";

import Carousel, { Pagination } from 'react-native-snap-carousel';

import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';

import BookButton from '../../components/BookButton'




const PostScreen = (props) => {

   const [posts, setPosts] = useState([]);
   const [activity, setActivity] = useState([]);

   const route = useRoute();
   const { postId, isShow, tripID, day, guests } = route.params ;

   

   const width = useWindowDimensions().width;
   const height = useWindowDimensions().height;
   
   const [activeSlide, setSlide]  = useState(0);
   const [length, setLength] = useState(0);

  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  useEffect(() => {
    LogBox.ignoreLogs(['Failed prop type']);
  }, [])

   
   useEffect(() => {
     const fetchPost = async () => {
        try{
            const postResult = await API.graphql(
              graphqlOperation(getPost, {id: postId})
            )
   
            setPosts(postResult.data.getPost) ; 
            setActivity(postResult.data.getPost.activity.items) ;
            setLength(postResult.data.getPost.gallery.length) ;
            setLatitude(postResult.data.getPost.latitude) ;
            setLongitude(postResult.data.getPost.longitude) ;

        }catch(e){
          console.log(e)
        }
     }
   
     fetchPost();
   }, []);

  return (
    <View style={{flex: 1}}>
    <ScrollView>
    <StatusBar hidden/>

      {/* Image Gallery */}
      <Carousel 
        layout={'stack'}
        data={posts.gallery}
        sliderWidth={width}
        itemWidth={width}
        sliderHeight={height*0.75}
        itemHeight={height*0.75}
        renderItem={({item}) =>   
                    <View>
                          <ImageBackground source= {{uri: item}} 
                                  style={{width: '100%'  ,
                                  height: height*0.6,
                                  resizeMode: 'cover',
                                  justifyContent: 'center',}}>
                      {/* 
                          <Text style={{
                                        fontSize: 50,
                                        fontWeight: 'bold',
                                        color: 'white',
                                        width: '70%',
                                        marginLeft: 25,
                                      }}>{posts.title}</Text> */}
                                      
                          </ImageBackground>
                      </View> 
                    }
        onSnapToItem={(index) => setSlide(index) }
      ></Carousel>
      <Pagination
              dotsLength={length}
              activeDotIndex={activeSlide}
              containerStyle={{ marginTop: -70 }}
              dotStyle={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  marginHorizontal: 8,
                  backgroundColor: 'rgba(255, 255, 255, 0.92)'
              }}
              inactiveDotStyle={{
                  // Define styles for inactive dots here
              }}
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
       />

      <Container style={{height: 550}}>
      <Tabs>

      <Tab style={{backgroundColor: '#FCF6EE'}}
          heading={ <TabHeading style={{backgroundColor: '#1D565D'}}><Text style={{fontWeight: '700', color: 'white'}}>Information</Text></TabHeading>}>

      {/* Detail */}
      <DetailedPost post={posts} />

      {/* Notice */}
      {/* <NoticeList /> */}

      </Tab>

      <Tab style={{backgroundColor: '#FCF6EE'}} heading={ <TabHeading style={{backgroundColor: '#1D565D'}}><Text style={{fontWeight: '700', color: 'white'}}>Activity</Text></TabHeading>}>
      {/* Timeline */}
      <Timeline data={activity.reverse()} 
          circleSize={15}
          circleColor='#8FA879'
          lineColor='#8FA879'
          lineWidth= {3}
          timeContainerStyle={{minWidth:25}}
          timeStyle={{textAlign: 'center', backgroundColor:'#B9AC9E', color:'white', padding:5, borderRadius:10}}
          descriptionStyle={{color:'gray'}}
          options={{
            style:{marginLeft: 15, marginTop: 30}
          }}
          innerCircle={'dot'}
          separator = {false}
          titleStyle={{fontSize: 18}}
          detailContainerStyle={{marginTop: -5}}
      />
      
      </Tab>


      <Tab  heading={ <TabHeading style={{backgroundColor: '#1D565D'}}><Text style={{fontWeight: '700', color: 'white'}}>Map</Text></TabHeading>}>
      {/* Map */}
      <View style={{height: '100%', width: '100%', borderRadius: 20}}>
          <MapView
            style={{width: '100%', height: '100%', borderRadius: 20}}
            provider={PROVIDER_GOOGLE}
            initialRegion={{
              latitude: latitude,
              longitude: longitude,
              latitudeDelta: 0.3,
              longitudeDelta: 0.3,
            }}
          >
            <Marker coordinate={{ latitude: latitude, longitude: longitude }} onPress={e => Linking.openURL('google.navigation:q='+e.nativeEvent.coordinate.latitude+'+'+e.nativeEvent.coordinate.longitude)}/>
          </MapView>
       </View>
       </Tab>

       </Tabs>

       </Container>

       </ScrollView>

      {/*Book Button*/}
      <BookButton postID={postId} isShow={isShow} price={posts.newPrice} tripID={tripID} day={day} guests={guests} province={posts.province} startTime={posts.startTime} endTime={posts.endTime}/>


      </View>



  );
};

export default PostScreen;