import React from 'react' ;
import {View, Text, Image, TouchableOpacity, FlatList} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

import category from '../../../assets/data/category' ;

import {useNavigation} from '@react-navigation/native';

const CategoryList = (props) => {

    const navigation = useNavigation();

        const renderItem = ({ item }) => {
            return (
                <TouchableOpacity
                    style={{
                        padding: 10,
                        paddingBottom: 10,
                        backgroundColor: "#FCF6EE",
                        borderRadius: 30,
                        alignItems: "center",
                        justifyContent: "center",
                        marginRight: 18,
                        marginVertical: 5
                    }}
                    onPress={() => navigation.navigate('Category', { category: item.name }) }
                >
                    <View
                        style={{
                            width: 75,
                            height: 75,
                            borderRadius: 25,
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "#E2C8B6"
                        }}
                    >
                        <FontAwesome5
                            name={item.icon}
                            size={30}
                        />
                    </View>

                    <Text
                        style={{
                            marginTop: 5,
                            color: "#1E1F20",
                            fontSize: 12, 
                            lineHeight: 22 
                        }}
                    >
                        {item.name}
                    </Text>
                </TouchableOpacity>
            )
        }

        return (
            <View>
                <FlatList
                    data={category}
                    keyExtractor={item => `${item.id}`}
                    renderItem={renderItem}
                    contentContainerStyle={{ paddingVertical: 10, alignItems: 'center', justifyContent: 'space-between' }}
                    numColumns = {3}
                />
            </View>
        )

};

export default CategoryList ;