import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons'; 

const SearchBar = ({ term, onTermChange, onTermSubmit }) => {
    return <View style={styles.backgroundStyle}>
        <Feather style={styles.iconStyle} name="search" />
        <TextInput 
            style={styles.inputStyle} 
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Search"
            value={term}
            // onChangeText={newTerm => onTermChange(newTerm)}
            onChangeText={onTermChange} // simplified
            // onEndEditing={() => onTermSubmit()}
            onEndEditing={onTermSubmit} // simplified
        />
    </View>
};

const styles = StyleSheet.create({
    backgroundStyle: {
        backgroundColor: '#DEDCDC',
        height: 50,
        borderRadius: 5,
        marginHorizontal: 15,
        flexDirection: 'row', // gets icon and text input on same line
        marginTop: 10,
        marginBottom: 10
    },
    inputStyle: {
        flex: 1, // input takes up as much space as possible
        fontSize: 18
    },
    iconStyle: {
        fontSize: 35,
        alignSelf: 'center',
        marginHorizontal: 15
    }
});

export default SearchBar;