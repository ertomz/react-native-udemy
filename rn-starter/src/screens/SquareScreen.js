import React, { useReducer } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ColorCounter from '../components/ColorCounter'; // import child


// Set constant adjustment value: use CAPS for set variables
const COLOR_INCREMENT = 15; 


// Define reducer function
const reducer = (state, action) => {
    // state === { red: number, green: number, blue: number };
    // action === { colorToChange: 'red' || 'green' || 'blue', amount: 15 || -15 }
    
    switch(action.colorToChange) {
        // Never change state directly, don't do (state.red = state.red - 15)
        // Instead, rebuild ENTIRE state object
        // ... means create brand new object but take existing ones from state, overwrite color
        case 'red':
            return state.red + action.amount > 255 || state.red + action.amount < 0 
            ? state 
            : { ...state, red: state.red + action.amount } 
        case 'green':
            return state.green + action.amount > 255 || state.green + action.amount < 0
            ? state
            : { ...state, green: state.green + action.amount }
        case 'blue':
            return state.blue + action.amount > 255 || state.blue + action.amount < 0
            ? state
            :  { ...state, blue: state.blue + action.amount }
        default:
            // if not appropriate state, no change
            return state;
    }
}

const SquareScreen = () => {
    // Create reducer variable, combine colors into one 'state' object
    const [state, dispatch] = useReducer(reducer, { red: 0, green: 0, blue: 0 }); // dispatch: run reducer    

    // 'Dispatch' runs 'useReducer', which calls 'reducer' which changs the color
    return <View>
        <ColorCounter 
            onIncrease={() => dispatch({ colorToChange: 'red', amount: COLOR_INCREMENT})} 
            onDecrease={() => dispatch({ colorToChange: 'red', amount: -COLOR_INCREMENT})}
            color="Red"
        />
        <ColorCounter 
            onIncrease={() => dispatch({ colorToChange: 'green', amount: COLOR_INCREMENT})} 
            onDecrease={() => dispatch({ colorToChange: 'green', amount: -COLOR_INCREMENT})}
            color="Green"
        />
        <ColorCounter 
            onIncrease={() => dispatch({ colorToChange: 'blue', amount: COLOR_INCREMENT})} 
            onDecrease={() => dispatch({ colorToChange: 'blue', amount: -COLOR_INCREMENT})}
            color="Blue"
        />
        <View 
            style={{ 
                height: 150, 
                width: 150, 
                backgroundColor: `rgb(${state.red}, ${state.green}, ${state.blue})` 
            }}
        /> 
    </View>
}

const styles = StyleSheet.create({});

export default SquareScreen;