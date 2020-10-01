// import '../_mockLocation'; // Fake location testing
import React, { useContext, useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import { SafeAreaView, withNavigationFocus } from 'react-navigation';
import Map from '../components/Map';
import { Context as LocationContext } from '../context/LocationContext';
import useLocation from '../hooks/useLocation'; // Reusable location info
import TrackForm from '../components/TrackForm';
import { FontAwesome } from '@expo/vector-icons'; 


// Include 'isFocused' to determine if should be tracking location or not
const TrackCreateScreen = ({ isFocused }) => {
    // Add location (grab function from LocationContext)
    const { state: { recording }, addLocation } = useContext(LocationContext);
    // *UseCallback* 
    const callback = useCallback(location => {
        addLocation(location, recording);
    }, [recording]);
    // Receive permissions error if any, track location if user is on the screen OR if they're recording
    const [err] = useLocation(isFocused || recording, callback);
        
    return ( 
        <SafeAreaView forceInset={{ top: 'always' }}>
            <Text h1>Create a Track</Text>
            <Map/>
            {/* If error, ask for permission, otherwise nothing */}
            {err ? <Text>Please enable locations services.</Text> : null}
            <TrackForm/>
        </SafeAreaView>
    );
};

TrackCreateScreen.navigationOptions = {
    title: 'Add Track',
    tabBarIcon: <FontAwesome name="plus" size={24} />
};

const styles = StyleSheet.create({});

export default withNavigationFocus(TrackCreateScreen);