import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

// Child component file
// Parent gives the child props, child does something with them
const ImageDetail = (props) => {
    return <View>
        <Image source={props.image}/>
        <Text>This is a {props.title}!</Text>
        <Text>The score is {props.score}.</Text>
    </View>
};

const styles = StyleSheet.create({});

export default ImageDetail;