import React, { useContext } from 'react';
import { Text, StyleSheet, ActivityIndicator } from 'react-native';
import MapView, { Polyline, Circle } from 'react-native-maps';
import { Context as LocationContext } from '../context/LocationContext';



const Map = () => {
    // Get currentLocation and location list from state object
    const { state: { currentLocation, locations } } = useContext(LocationContext);
    // If don't have a currentLocation
    if (!currentLocation) {
        // Spinner, show up in middle of screen
        return <ActivityIndicator size="large" style={{ marginTop: 200 }} />;
    }
    // If do have a currentLocation
    return <MapView
        // Set initial map region
        style={styles.map}
        // Get long and lat from coords
        initialRegion={{
            ...currentLocation.coords,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01
        }}
        // Recenters and zooms on user
        // region={{
        //     ...currentLocation.coords,
        //     latitudeDelta: 0.01,
        //     longitudeDelta: 0.01
        // }}
    > 
        <Circle
            center={currentLocation.coords}
            radius={30}
            strokeColor="rgba(158, 158, 255, 1.0)"
            fillColor="rgba(158, 158, 255, 0.3)"
        />
        {/* For every location in the list, map over the location and pull out its coordinates */}
        <Polyline coordinates={locations.map(loc => loc.coords)}/>
    </MapView>
};

const styles = StyleSheet.create({
    map: {
        height: 300
    }
});

export default Map;