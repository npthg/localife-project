import React from "react";
import { View, FlatList } from "react-native";
import Post from '../../components/Post';


const SearchResultsScreen = (props) => {

   const { posts } = props;

  return (
    <View style={{backgroundColor: '#FCF6EE'}}>
      <FlatList
        data={posts}
        renderItem={({item}) => <Post post={item} isShow={true}/>}
      />
    </View>
  );
};

export default SearchResultsScreen;
