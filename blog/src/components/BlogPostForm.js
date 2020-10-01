import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button } from 'react-native';
import { Context } from '../context/BlogContext';


const BlogPostForm = ({ onSubmit, initialValues }) => {
    const [title, setTitle] = useState(initialValues.title);
    const [content, setContent] = useState(initialValues.content);

    return <View>
        <Text style={styles.label}>Enter Title:</Text>
        <TextInput
            style={styles.input}
            value={title} 
            onChangeText={(text) => setTitle(text)}
        />
        <Text style={styles.label}>Enter Content:</Text>
        <TextInput 
            style={styles.input}
            value={content} 
            onChangeText={(text) => setContent(text)}
        />
        <Button 
            title="Save Blog Post"
            // When pressed, submit post with entered title and content
            onPress={() => { onSubmit(title, content) }}
        />
    </View>
};

// Set default props for initialValues (if none specified)
BlogPostForm.defaultProps = {
    initialValues: {
        title: '',
        content: ''
    }
};

const styles = StyleSheet.create({    
    input: {
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 5,
        marginHorizontal: 10,
        marginBottom: 15,
        fontSize: 18,
        padding: 5
    },
    label: {
        fontSize: 20,
        margin: 10
    }
});

export default BlogPostForm;
