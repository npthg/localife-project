import React, { useEffect, useState, useRef } from "react";
import { TextInput, StyleSheet, Text, View, FlatList, ScrollView, LogBox, Keyboard  } from "react-native";
import { Button } from 'native-base';

import ChatText from '../../components/ChatText';

import { socket } from '../../services/socket';

import { useRoute } from "@react-navigation/native";

import FontAwesome from 'react-native-vector-icons/FontAwesome';


const Messages = (props) => {
   
  const [chatMessage, setChatMessage] = useState("") ;
  const [lineMessage, setLineMessage] = useState([]) ;

  const route = useRoute();
  const tinput = useRef();

  const { lineID, title }  = route.params;

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedList', 'Can\'t perform a React state update on an unmounted component']);
  }, [])


    useEffect(() => {
    socket.on("line", msg => {
        setLineMessage((oldmsg) => ([ ...oldmsg, {message: msg, source: "line"} ])) ;
    })

  }, [])

  function sendText(){
    socket.emit("chat", chatMessage, lineID);
    setLineMessage((oldmsg) => ( [...oldmsg, {message: chatMessage, source: "app"} ])) ;
    Keyboard.dismiss();
    tinput.current.clear();

  }

    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{flexDirection: 'row', width: '100%', marginBottom: 20}}>

        <FlatList
          data={lineMessage}
          renderItem={({item}) => <ChatText message={item.message} source={item.source} />}
          style={{marginLeft: 20, marginRight: 20}}
          inverted
          showsVerticalScrollIndicator ={false}
        />
 
      </View>

      <View style={{flexDirection: 'row', position: 'absolute', bottom:0, width: '100%', backgroundColor:'white', paddingTop: 5}}>
      <TextInput
        style = {{ height: 45, borderWidth: 2, width: '75%', marginLeft: 20, borderRadius: 25, marginBottom: 20, borderColor: 'lightgray', paddingLeft: 20}} 
        onChangeText = {
          chat => {
              setChatMessage(chat)
          }
        }
        value = {chatMessage}
        ref={tinput}
      />

      <Button success  style = {{ height: 40, marginLeft: 15, borderRadius: 45, width: 40, paddingLeft: 7}}  onPress={() => sendText()}>
      <FontAwesome name={'paper-plane'} size={20} color="white"/>
      </Button>
      </View>

      </View>
    );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  }
});


export default Messages;
