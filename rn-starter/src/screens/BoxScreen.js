import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const BoxScreen = () => {
    return <View style={styles.parentStyle}>
       <View style={styles.viewOneStyle}/>
       <View style={styles.viewTwoStyle}/>
       <View style={styles.viewThreeStyle}/>
    </View>
};

const styles = StyleSheet.create({
    // parent    
    parentStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 200
    },
    // child
    viewOneStyle: {
        height: 100,
        width: 100,
        backgroundColor: 'red',
    },
    viewTwoStyle: {
        height: 100,
        width: 100,
        backgroundColor: 'green',
        alignSelf: 'flex-end', // METHOD 1: get green square to bottom
        // top: 100 // METHOD 2: get green square to bottom
        // marginTop: 100 // METHOD 3: get gren square to bottom
    },
    viewThreeStyle: {
        height: 100,
        width: 100,
        backgroundColor: 'blue',
    }
});

export default BoxScreen;