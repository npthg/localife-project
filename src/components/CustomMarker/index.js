import React from "react";
import { View, Text } from "react-native";
import { Marker } from "react-native-maps";

const CustomMarker = (props) => {
  const { coordinate, price, onPress, isSelected, title } = props;
  return (
    <Marker coordinate={coordinate} onPress={onPress}>
      <View style={{
        backgroundColor: isSelected ? "#20163B" : "#FCF6EE",
        padding: 5,
        borderRadius: 20,
        borderColor: "grey",
        borderWidth: 1,
      }}>
        <Text style={{ color: isSelected ? "white" : "black", fontWeight: "bold", textAlign: 'center', fontSize:12 }}>{title}</Text>
        <Text style={{ color: isSelected ? "white" : "black", fontWeight: "bold", textAlign: 'center', fontSize:12  }}>฿{price}</Text>

      </View>
    </Marker>
  );
};

export default CustomMarker;
