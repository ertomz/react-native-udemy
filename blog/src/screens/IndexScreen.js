import React, { useContext, useEfect, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Button, TouchableOpacity } from 'react-native';
import { Context } from '../context/BlogContext'; // Import Provider
import { Feather } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons'; 

const IndexScreen = ({ navigation }) => {
    // Get 'Contact' from return of BlogContext (don't need Provider here)
    const { state, deleteBlogPost, getBlogPosts } = useContext(Context);
    
    useEffect(() => {
        // Calls whenever app reloaded
        getBlogPosts();
        // Calls whenever Index is the primary screen
        const listener = navigation.addListener('didFocus', () => {
            getBlogPosts();
        });
        // Turns off listener if we completely remove Index screen
        return () => {
            listener.remove();
        };
    }, []);
    
    // Add, delete, and view blog posts
    return <View style={styles.background}>
        {/* List of Blog Posts */}
        <FlatList 
            data={state}
            keyExtractor={(blogPost) => blogPost.title}
            // Render each item (blog post)
            renderItem={({ item }) => {
                return (
                    // Detects tap of blog post
                    <TouchableOpacity onPress={() => navigation.navigate('Show', { id: item.id })}>
                        <View style={styles.row}>
                            <Text style={styles.title}>{item.title}</Text>
                            {/* Detects tap of trash can */}
                            <TouchableOpacity onPress={() => deleteBlogPost(item.id)}>
                                <Feather style={styles.trash} name="trash-2" />
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                );
            }}
        />
    </View>
};

// Header: Create
IndexScreen.navigationOptions = ({ navigation }) => {
    return {
        headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Create')}>
                <Entypo name="plus" size={30} />        
            </TouchableOpacity>
        )
    };
};

const styles = StyleSheet.create({
    background: {
        backgroundColor: '#303960',
        flex: 1
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 20,
        paddingHorizontal: 10,
        marginVertical: 5,
        marginHorizontal: 10,
        top: 15,
        backgroundColor: 'white',
        borderRadius: 7,
        shadowColor: 'gray',
        shadowOpacity: 0.5,
        shadowOffset: {
            width: 0,
            height: 1
        }
    },
    title: {
        fontSize: 18,
        color: 'black',
        fontWeight: 'bold'
    },
    trash: {
        fontSize: 24,
        color: 'red'
    }
});

export default IndexScreen;
