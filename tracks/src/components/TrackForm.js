import React, { useContext } from 'react';
import { Input, Button } from 'react-native-elements';
import Spacer from './Spacer';
import { Context as LocationContext } from '../context/LocationContext';
import useSaveTrack from '../hooks/useSaveTrack';

const TrackForm = () => {
    const { state: { name, recording, locations }, 
        startRecording, stopRecording, changeName 
    } = useContext(LocationContext);
    // Get the returned saveTrack function from the hook
    const [saveTrack] = useSaveTrack();

    return <>
        <Spacer>
            <Input value={name} onChangeText={changeName} placeholder="Enter track name"/>
        </Spacer>
        {/* Show different button depeniding on recording value */}
        <Spacer>
            {recording ? 
                <Button title="Stop" onPress={stopRecording}/> 
                : <Button title="Start Recording" onPress={startRecording}/>
            }
        </Spacer>
        {/* If not recording AND some locations saved, let user save recording */}
        <Spacer>
            {!recording && locations.length ? 
                <Button title="Save Recording" onPress={saveTrack}/> 
                : null 
            }
        </Spacer>
    </>
};

export default TrackForm;