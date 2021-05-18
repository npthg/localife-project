import React, {useEffect, useState, useCallback} from 'react';
import {View, FlatList, Dimensions, Pressable, Text, RefreshControl, LogBox} from 'react-native';
import ExpPost from '../../components/ExpPost';
import {API, graphqlOperation} from 'aws-amplify';

import { listExperiences } from '../../../graphql/queries';


const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

const Localife = () => {
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [currentVisibleIndex, setCurrentVisibleIndex] = useState(0);

  useEffect(() => {
    LogBox.ignoreLogs(['Warning']);
  }, [])

  const fetchPost = async () => {
    try {
      const response = await API.graphql(graphqlOperation(listExperiences));
      setPosts(response.data.listExperiences.items);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false)).then(() => fetchPost());
  }, []);


  return (
    <View style={{flex: 1}}>
      <FlatList
        data={posts}
        renderItem={({item}) => <ExpPost post={item} />}
        showsVerticalScrollIndicator={false}
        snapToInterval={Dimensions.get('window').height}
        snapToAlignment={'start'}
        decelerationRate={'fast'}
        initialNumToRender={2}
        maxToRenderPerBatch={3}
        windowSize={3}
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

export default Localife;
