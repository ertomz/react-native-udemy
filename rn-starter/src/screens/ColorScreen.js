import React, { useState } from 'react';
import { View, StyleSheet, Button, FlatList } from 'react-native';


const ColorScreen = () => {

    const [colors, setColors] = useState([]); // default start is an empty array

    return <View>
        <Button title="Add a Color" onPress={() => {
            setColors([...colors, randomRgb()]); // ... means add a new color to the array
        }}/>
        

        <FlatList 
            keyExtractor={item => item}
            data={colors}
            renderItem={({ item }) => { // item === some rbg color
                return <View 
                    /* Style not in StyleSheet because creating style (colors on the fly) */
                    style={{ height: 100, width: 100, backgroundColor: item }}
                /> 
            }}
        />
    </View>
};


const randomRgb = () => {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);

    return `rgb(${red}, ${green}, ${blue})` // String you can slice into with $
};

const styles = StyleSheet.create({});

export default ColorScreen;