import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Context } from '../context/BlogContext';
import BlogPostForm from '../components/BlogPostForm';

const EditScreen = ({ navigation }) => {
    const { state, editBlogPost } = useContext(Context);
    const id = navigation.getParam('id');
    // Get the correct blog post we want to edit
    const blogPost = state.find((blogPost) => blogPost.id === id);
    // Call onSubmit with a new title and content
    // Grab initialValues from the current post
    return <BlogPostForm 
        initialValues={{ title: blogPost.title, content: blogPost.content }}
        onSubmit={(title, content) => {
            editBlogPost(id, title, content, () => navigation.pop())
        }}
    />
};

const styles = StyleSheet.create({});

export default EditScreen;
