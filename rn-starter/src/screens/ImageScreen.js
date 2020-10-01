import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ImageDetail from '../components/ImageDetail'; // import child into parent

// Parent component file
const ImageScreen = () => {

    // Call child inside parent
    // Customizable props (props passed from parent to child)
    return <View>
        <ImageDetail title="Forest" image={require("../../assets/forest.jpg")} score={1}/>
        <ImageDetail title="Beach" image={require("../../assets/beach.jpg")} score={2}/>
        <ImageDetail title="Mountain" image={require("../../assets/mountain.jpg")} score={3}/>
    </View>
};

const styles = StyleSheet.create({});

export default ImageScreen;