import createDataContext from './createDataContext'; // Reusable function for automating Context creation
import jsonServer from '../api/jsonServer.js';

// Reducer
const blogReducer = (state, action) => {
    switch (action.type) {
        // Add blog post: json called
        // Delete blog post
        case 'delete_blogpost':
            // Iterate through elements in array, check if the id is same as the argument id from dispatch
            // Keep only elements that don't contain the id we want to delete
            return state.filter((blogPost) => blogPost.id !== action.payload);
        // Edit current blog post
        case 'edit_blogpost':
            return state.map((blogPost) => {
                // If same id, return edited version
                // If diffrent id, return original version
                return blogPost.id === action.payload.id ? action.payload : blogPost
            });
        // Get blog posts from API
        case 'get_blogposts':
            // Returns total list of blog posts, replace current state
            return action.payload;
        default:
            return state;
    }
};

// Dispatch add blog post, call back function, runs blogReducer
// Dispatch called first so that we have access to it in the return
// Only the return dispatch function with specified type is being called
const addBlogPost = () => {
    return async(title, content, callback) => {
        // Tells jsonServer to create a new blog post
        await jsonServer.post('/blogposts', { title, content });        
        // Navigate back to Index screen
        if (callback) {
            callback();
        }
    };
};
// Dispatch delete blog post, call back function, runs blogReducer
const deleteBlogPost = (dispatch) => {
    return async(id) => {
        // Tells jsonServer to delete blog post, need back ticks to add the id
        await jsonServer.delete(`/blogposts/${id}`);
        // Keep dispatch to update on client side (although could refresh entire list like in getBlogPosts)
        dispatch({ type: 'delete_blogpost', payload: id })
    };
};
// Dispatch edit blog post
const editBlogPost = (dispatch) => {
    // Provide id of post we want to edit, new title, and new content 
    return async(id, title, content, callback) => {
        // Give jsonServer the id and updated content
        await jsonServer.put(`/blogposts/${id}`, { title, content });
        // Reload page with dispatch
        dispatch({ type: 'edit_blogpost', payload: {id, title, content} });
        if (callback) {
            callback();
        }
    };
};
// Dispatch get blog post from API
const getBlogPosts = (dispatch) => {
    return async() => {
        const response = await jsonServer.get('/blogposts');
        // response.data === array of blog posts like [{}, {}, {}]
        dispatch({ type: 'get_blogposts', payload: response.data });
    };
};

export const { Context, Provider } = createDataContext(
    blogReducer, 
    { addBlogPost, deleteBlogPost, editBlogPost, getBlogPosts },
    []
);