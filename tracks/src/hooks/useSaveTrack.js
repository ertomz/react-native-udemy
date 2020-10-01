import { useContext } from 'react';
import { Context as TrackContext } from '../context/TrackContext';
import { Context as LocationContext } from '../context/LocationContext';
import { navigate } from '../navigationRef';

export default () => {
    // Pull info from Track and Location Context
    const { createTrack } = useContext(TrackContext);
    const { 
        state: { name, locations },
        reset
    } = useContext(LocationContext);
    // Call createTrack, pass in arguments of locations and name
    const saveTrack = async() => {
        // After a successful request to backend api, reset and navigate back
        await createTrack(name, locations);
        reset();
        navigate('TrackList');
    }
    // Returning a function that any component can use to save a new track (convention: return as array)
    return [saveTrack];
};
