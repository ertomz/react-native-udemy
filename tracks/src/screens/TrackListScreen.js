import React, { useContext } from 'react';
import { Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { ListItem } from 'react-native-elements';
import { Context as TrackContext } from '../context/TrackContext';

const TrackListScreen = ({ navigation }) => {
    const { state, fetchTracks } = useContext(TrackContext);

    console.log(state);

    return <>
        {/* Callback envoked whenever we go to this screen */}
        <NavigationEvents onWillFocus={fetchTracks}/>
        <FlatList
            data={state} // Data is our state from TrackContext
            keyExtractor={item => item._id} // Function called with every item in state array (item._id is unique for each object)
            renderItem={({ item }) => {
                return (
                    // Show items and add navigation capabilities, bringing along the id so we can use it on the next screen
                    <TouchableOpacity onPress={() => navigation.navigate('TrackDetail', { _id: item._id })}>
                        <ListItem chevron title={item.name}/> 
                    </TouchableOpacity>
                );
            }}
        />
    </>
};

TrackListScreen.navigationOptions = {
    title: 'Tracks'
};

const styles = StyleSheet.create({});

export default TrackListScreen;