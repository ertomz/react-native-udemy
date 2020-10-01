// FAKE LOCATION TESTING

import * as Location from 'expo-location';

// Represents 10 meters in longitude or latitude
const tenMetersWithDegrees = 0.0001;

// Fake location
const getLocation = (increment) => {
    return {
        timestamp: 1000000,
        coords: {
            speed: 0,
            heading: 0,
            accuracy: 5,
            altitudeAccuracy: 5,
            altitude: 5,
            // My actual location
            longitude: -111.5523566958602 + increment * tenMetersWithDegrees,
            latitude: 40.687566096932336 + increment * tenMetersWithDegrees
        }
    };
};

let counter = 0;

// Every second, emit a new location into the locations library
setInterval(() => {
    Location.EventEmitter.emit('Expo.locationChanged', {
        watchId: Location._getCurrentWatchId(),
        location: getLocation(counter) // Fake location, changes 1x/second by 10m long and lat
    });
    counter++;
}, 1000);