import React from 'react'; // whole librar
import {Text, StyleSheet, View} from 'react-native'; // specific part of library

// <Text> is a JSX
// <View> lets us return multiple JSX elements
// JSX doesn't like semicolons ;
const ComponentsScreen = () => { 
    // setting instance variables, use { } to reference them
    const greeting = "hiya!";
    const sty = {color: "blue"};
    const hello = <Text style={styles.subHeaderStyle}>Wazzupppp</Text>

    return <View> 
        <Text style={styles.textStyle}>This is a components screen.</Text>
        <Text style={sty, {fontSize:50}}>{greeting}</Text>
        {hello}
    </View>
}

const styles = StyleSheet.create({ // can also add styles inside elements (like inline CSS)
    textStyle: {
        fontSize: 30,
        color: "green",
        shadowOpacity: 0.25
    },
    subHeaderStyle: {
        fontSize: 50,
        backgroundColor: "purple"
    }
})


export default ComponentsScreen; // doesn't mean project changes, not shown on screen yet