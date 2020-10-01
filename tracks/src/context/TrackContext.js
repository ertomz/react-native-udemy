import createDataContext from './createDataContext';
import trackerApi from '../api/tracker';
import { AsyncStorage } from 'react-native';

const trackReducer = (state, action) => {
    switch (action.type) {
        case 'fetch_tracks':
            // NOTE: whenever we make an API request, we trust it, don't include ...state here
            return action.payload;
        default: 
            return state;
    }
};


// Action functions

const fetchTracks = dispatch => async () => {
    // Make a tracks get request, get data which is an array of tracks
    const response = await trackerApi.get('/tracks');
    dispatch({ type: 'fetch_tracks', payload: response.data })
};

const createTrack = dispatch => async( name, locations ) => {
    // Make a tracks post request, with the track name and locations list
    await trackerApi.post('/tracks', { name, locations })
};

export const { Provider, Context } = createDataContext(
    trackReducer,
    { fetchTracks, createTrack},
    [] // Default, empty array to store tracks
);
