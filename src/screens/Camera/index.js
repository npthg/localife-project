import React, {useRef, useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, LogBox} from 'react-native';
import {RNCamera} from 'react-native-camera';

import styles from './styles';
import awaitAsyncGenerator from '@babel/runtime/helpers/esm/awaitAsyncGenerator';

import {useNavigation} from '@react-navigation/native';


const Camera = () => {
  const [isRecording, setIsRecording] = useState(false);
  const camera = useRef();
  const recordOption = {
        quality: RNCamera.Constants.VideoQuality['480p'],
        videoBitrate: 600*1000,
      }
  useEffect(() => {
      LogBox.ignoreLogs(['Animated']);
    }, [])

  const navigation = useNavigation();
  const onRecord = async () => {
    if (isRecording) {
      camera.current.stopRecording();
    } else {
      const data = await camera.current.recordAsync(recordOption);
      navigation.navigate('CreatePost', {videoUri: data.uri});
    }
  };

  return (
    <View style={styles.container}>
      <RNCamera
        ref={camera}
        onRecordingStart={() => setIsRecording(true)}
        onRecordingEnd={() => setIsRecording(false)}
        style={styles.preview}
      />
      <TouchableOpacity
        onPress={onRecord}
        style={
          isRecording ? styles.buttonStop : styles.buttonRecord
        }
      />
    </View>
  );
};

export default Camera;
