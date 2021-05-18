import React from 'react';
import {View, Text, Image, Pressable} from 'react-native';
import { Badge } from 'native-base' ;

const ChatText = (props) => {

  const message = props.message;
  const source = props.source ;

  const isLineMessage = () => {
    return source === "line" ; 
  }

  return (

       <View style={{ borderRadius: 5, padding: 10, backgroundColor: isLineMessage() ? '#FCF6EE' : '#1D565D',
                      marginRight: isLineMessage() ? 150 : 0, marginLeft: isLineMessage() ? 0 : 150 , 
                      marginTop: 20, height: 50, borderRadius: 10}}>
        <Text style={{color: isLineMessage() ? 'black' : 'white'}}>{message}</Text>
      </View>
  );
};

export default ChatText;
