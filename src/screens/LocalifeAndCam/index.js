import React, {useEffect, useState} from 'react';
import {View, FlatList, Dimensions, Pressable, Text} from 'react-native';
import SwipeToCamera from '../../navigation/SwipeToCamera'

const LocalifeAndCam = () => {

  return (
    <View style={{flex: 1}}>
        <SwipeToCamera />
    </View>
  );
};

export default LocalifeAndCam;
