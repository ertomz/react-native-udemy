import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import yelp from '../api/yelp';


const ResultsShowScreen = ({ navigation }) => {
    // Result is default null because we haven't fetched anything yet from yelp
    const [result, setResult] = useState(null);
    // Gets 'id' of restaurant from parent navigation call in ResultsList
    const id = navigation.getParam('id');

    // API call to get the restaurant components (pass in the id)
    const getResult = async (id) => {
        const response = await yelp.get(`/${id}`);
        setResult(response.data);
    };

    // Calls the getResult function exactly once
    useEffect(() => {
        getResult(id);
    }, []);

    // If there is no result yet, don't show anything on the screen 
    if (!result) {
        return null;
    };

    // Iterate over array of photos, display to user
    return (
        <View>
            <Text style={styles.titleStyle}>{result.name}</Text>
            <FlatList
                data={result.photos}
                keyExtractor={(photo) => photo}
                renderItem={({ item }) => {
                    return <Image style={styles.image} source={{ uri: item }}/>
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    image: {
        height: 200,
        width: 300,
        marginBottom: 10
    },
    titleStyle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10
    }
});

export default ResultsShowScreen;