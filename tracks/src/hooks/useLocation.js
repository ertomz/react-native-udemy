import { useState, useEffect } from 'react';
import { Accuracy, requestPermissionsAsync, watchPositionAsync } from 'expo-location';

// Arguments: shouldTrack (true/false), callback (function called when new location)
export default(shouldTrack, callback) => {
    // Variable to track error
    const [err, setErr] = useState(null);
    // Run startWatching once when first displayed on screen
    // When shouldTrack changes, run useEffect again
    // Additionally, if shouldTrack is true, startWatching || if shouldTrack is false, stop
    useEffect(() => {
        // Variable for watching/not
        let subscriber;
        // Track location helper function (put these inside useEffect!)
        const startWatching = async() => {
            try {
                // Ask user for permissions to track location
                await requestPermissionsAsync();
                // Track location
                subscriber = await watchPositionAsync(
                    {
                        accuracy: Accuracy.BestForNavigation, // Give best accuracy
                        timeInterval: 1000, // update 1x/second
                        distanceInterval: 10 // or, update 1x/10 meters
                    }, 
                    // Callback any time there's a new location
                    callback
                );
            } catch (err) {
                // If not granted, show error message
                setErr(err);
            };
        };
        // Start or stop watching, depending on if shouldTrack is true/false
        if (shouldTrack) {
            startWatching();
        } else {
            // Coding defensively, assuming there might be a bug (null if expecting not null)
            if (subscriber) {
                // Stop watching
                subscriber.remove();
            }
            subscriber = null;
        }
        // Cleanup Function
        return () => {
            // If subscriber exists, remove it (if null, do nothing)
            if (subscriber) {
                subscriber.remove();
            };
        };
    }, [shouldTrack, callback]); 

    // Return error if one occurs during permissions process
    return [err];

};