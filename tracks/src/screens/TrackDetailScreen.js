import React, { useContext } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Context as TrackContext } from '../context/TrackContext';
import MapView, { Polyline } from 'react-native-maps';

const TrackDetailScreen = ({ navigation }) => {
    // Get state from TrackContext
    const { state } = useContext(TrackContext);
    // Get _id, passed along from TrackListScreen
    const _id = navigation.getParam('_id');
    // Iterate through each track 't' inside list of tracks and find the right track
    const track = state.find(t => t._id === _id);
    // Get first coordinates from the track
    const initialCoords = track.locations[0].coords;
    return <>
        <Text style={{ fontSize: 48 }}>{track.name}</Text>
        {/* For every location in the list, map over the location and pull out its coordinates */}
        <MapView
            style={styles.map}
            initialRegion={{
                ...initialCoords,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01
            }}
        >
            <Polyline coordinates={track.locations.map(loc => loc.coords)}/>
        </MapView>
    </>;
};

const styles = StyleSheet.create({
    map: {
        height: 300
    }
});

export default TrackDetailScreen;