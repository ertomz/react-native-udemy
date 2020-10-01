import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Context } from '../context/BlogContext';
import BlogPostForm from '../components/BlogPostForm';

const CreateScreen = ({ navigation }) => {
    const { addBlogPost } = useContext(Context);

    // pass in the title and content from the user
    return <BlogPostForm onSubmit={(title, content) => {
        // Add new post with title, content, and go back to main screen
        addBlogPost(title, content, () => navigation.navigate('Index'))}
    }/>
};

const styles = StyleSheet.create({});

export default CreateScreen;
