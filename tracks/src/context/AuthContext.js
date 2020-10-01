import createDataContext from './createDataContext';
import trackerApi from '../api/tracker';
import { AsyncStorage } from 'react-native';
import { navigate } from '../navigationRef'; // use {} for named exports

// Reducer, called by dispatch
const authReducer = (state, action) => {
    switch(action.type) {
        // Add error: update error message with action's payload
        case 'add_error':
            return { ...state, errorMessage: action.payload };
        case 'signin': // Signup and Signin SAME, condense into one
            // Reset state, don't carry it through with ...state
            return { errorMessage: '', token: action.payload };
        case 'signout':
            return { errorMessage: '', token: null };
        case 'clear_error_message':
            return { ...state,  errorMessage: ''};
        default:
            return state;
    };
};


// Define action functions (ftn called with dispatch, that returns a ftn)
const signup = (dispatch) => async({ email, password }) => {
    // Make API request to sign up with email and password
    try {
        // Response to api post request to sign up
        const response = await trackerApi.post('/signup', { email, password });
        // Store JWT inside AsyncStorage, response.data is an object with token property from API request
        await AsyncStorage.setItem('token', response.data.token);
        // Update state to signed up
        dispatch({ type: 'signin', payload: response.data.token });
        // Navigate to tracklist (using navigationRef and navigation from outside RN)
        navigate('TrackList');
    } catch (err) {
        // Update state to error
        dispatch({ type: 'add_error', payload: 'Something went wrong with sign up.' });
    }
    // If sign up works, update state, say we are authenticated

    // If sign up fails, reflect error message

};

const signin = (dispatch) => async({ email, password }) => {
    // Make API request to sign in
    try {
        const response = await trackerApi.post('/signin', { email, password });
        await AsyncStorage.setItem('token', response.data.token);
        dispatch({ type: 'signin', payload: response.data.token });
        navigate('TrackList');
    } catch (err) {
        // Update state to error
        console.log(err);
        dispatch({ type: 'add_error', payload: 'Something went wrong with sign in.' });
    }
    // If sign in works, update state

    // If sign in fails, reflect error message
};

const signout = (dispatch) => async() => {
    // Remove token piece of authentication piece
    await AsyncStorage.removeItem('token');
    dispatch({ type: 'signout' });
    navigate('loginFlow');
};

const clearErrorMessage = dispatch => () => {
    dispatch({ type: 'clear_error_message' });
};

// Automatic authentication
const tryLocalSignin = dispatch => async() => {
    const token = await AsyncStorage.getItem('token');
    // If token exists, sign in and go to tracks
    if (token) {
        dispatch({ type: 'signin', payload: token });
        navigate('TrackList');
    // If no token, go to login flow
    } else {
        navigate('Signup');
    }
};

export const { Provider, Context } = createDataContext(
    authReducer, // reducer
    { signup, signin, signout, clearErrorMessage, tryLocalSignin }, // object of functions
    { token: null, errorMessage: '' } // initial values

)