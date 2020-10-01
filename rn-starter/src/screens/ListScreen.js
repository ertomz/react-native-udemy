import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const ListScreen = () => {
    const friends = [

        // Key METHOD 1 
        // { name: 'Friend #1', key: '1' },
        // { name: 'Friend #2', key: '2' },
        // { name: 'Friend #3', key: '3' },
        // { name: 'Friend #4', key: '4' },
        // { name: 'Friend #5', key: '5' },
        // { name: 'Friend #6', key: '6' },
        // { name: 'Friend #7', key: '7' },
        // { name: 'Friend #8', key: '8' },
        // { name: 'Friend #9', key: '9' }

        // Key METHOD 2 (see keyExtractor below)
        { name: 'Friend #1', age: '10' },
        { name: 'Friend #2', age: '20' },
        { name: 'Friend #3', age: '30' },
        { name: 'Friend #4', age: '40' },
        { name: 'Friend #5', age: '50' },
        { name: 'Friend #6', age: '60' },
        { name: 'Friend #7', age: '70' },
        { name: 'Friend #8', age: '80' },
        { name: 'Friend #9', age: '90' }
    ];

    return (<FlatList 
        // horizontal // list scrolls horizontally
        // showsHorizontalScrollIndicator={false} // hides scroll indicator

        // Key METHOD 2: Use name propery as key
        keyExtractor={(friend) => friend.name}

        // specify where the data is coming from
        data={friends}

        // renderItem = {(element)} gives the entire element
        // element === { item: { name: 'Friend #1' }, index: 0 }
        // We just want the item property
        renderItem={({ item }) => {
            return <Text style={styles.textStyle}>{item.name} is {item.age} years old</Text>
        }}
        />
    );
};

const styles = StyleSheet.create({
    textStyle: {
        marginVertical: 50
    }
});

export default ListScreen;