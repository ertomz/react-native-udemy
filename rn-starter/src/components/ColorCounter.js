import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';


const ColorCounter = ({ color, onIncrease, onDecrease }) => { // grab relevant property from SquareScreen
    
    // Adding increase and decrease functions through callback function from SquareScreen
    return <View>
        <Text>{color}</Text>
        <Button title={`Increase ${color}`} onPress={() => onIncrease()}/>
        <Button title={`Decrease ${color}`} onPress={() => onDecrease()}/>
    </View>
}

const styles = StyleSheet.create({});

export default ColorCounter;