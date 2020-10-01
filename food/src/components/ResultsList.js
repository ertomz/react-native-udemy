// Reusable list to show Yelp API results component

import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import ResultsDetail from './ResultsDetail';

// Here, results are already filtered for the correct price
const ResultsList = ({ title, results, navigation }) => {

    // If no results for a category, don't show it
    if (!results.length){
        return null;
    }

    return <View style={styles.container}>
        <Text style={styles.titleStyle}>{title}</Text>
        <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={results}
            // For each result in array, return the id (key)
            keyExtractor={(result) => result.id}
            // Make list show up
            renderItem={({ item }) => {
                // Pass ResultsDetail the item we're iterating over
                // ResultsShowScreen can access this 'id' of the respective business
                return (
                    <TouchableOpacity onPress={() => navigation.navigate('ResultsShow', { id: item.id })}>
                        <ResultsDetail result={item}/>
                    </TouchableOpacity>
                ); 
            }}
        />
    </View>
};

const styles = StyleSheet.create({
    titleStyle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 15,
        marginBottom: 5
    },
    container: {
        marginBottom: 10
    }
});

export default withNavigation(ResultsList);