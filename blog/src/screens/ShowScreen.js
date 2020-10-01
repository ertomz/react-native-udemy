import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Context } from '../context/BlogContext';
import { FontAwesome } from '@expo/vector-icons'; 

const ShowScreen = ({ navigation }) => {
    // Receive id passed in from IndexScreen when navigate to this screen
    const id = navigation.getParam('id');
    // Use 'Context' to access blog posts
    const { state } = useContext(Context);
    // Find blogPost with correct id
    const blogPost = state.find(
        (blogPost) => blogPost.id === id
    );

    return (
        <View style={styles.content}>
            <Text style={styles.titleStyle}>{blogPost.title}</Text>
            <Text style={styles.contentStyle}>{blogPost.content}</Text>
        </View>
    );
};

// Header: Edit
ShowScreen.navigationOptions = ({ navigation }) => {
    return {
        headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Edit', {id: navigation.getParam('id')})}>
                <FontAwesome name="edit" style={styles.edit}/>        
            </TouchableOpacity>
        )
    };
};

const styles = StyleSheet.create({
    content: {
        margin: 15
    },
    titleStyle: {
        alignSelf: 'center',
        fontSize: 24,
        fontWeight: 'bold',
    },
    contentStyle: {
        fontSize: 18,
        padding: 10,
    },
    edit: {
        fontSize: 24,
        margin: 10
    }
});

export default ShowScreen;
