import createDataContext from './createDataContext';

// Reducer
const locationReducer = (state, action) => {
    switch (action.type) {
        case 'start_recording':
            return { ...state, recording: true }
        case 'stop_recording':
            return { ...state, recording: false }
        // Change current location and add to list
        case 'add_current_location':
            return { ...state, currentLocation: action.payload };
        case 'add_location':
            // Don't want to change original array, so much create new one with [ ], and then push.
            return { ...state, locations: [...state.locations, action.payload] };
        case 'change_name':
            return { ...state, name: action.payload }
        case 'reset':
            return { ...state, name: '', locations: []} ;
        default:
            return state;
    }
};

// Action functions
const startRecording = dispatch => () => {
    dispatch({ type: 'start_recording' });
};

const stopRecording = dispatch => () => {
    dispatch({ type: 'stop_recording' });
};

const addLocation = dispatch => (location, recording) => {
    dispatch({ type: 'add_current_location', payload: location });
    if (recording) {
        dispatch({ type: 'add_location', payload: location });
    };
};

const changeName = dispatch => (name) => {
    dispatch({ type: 'change_name', payload: name });
};

const reset = dispatch => () => {
    dispatch({ type: 'reset'})
}


export const { Context, Provider } = createDataContext(
    locationReducer, // Reducer
    { startRecording, stopRecording, addLocation, changeName, reset }, // Action functions
    { name: '', recording: false, locations: [], currentLocation: null } // Default values
);