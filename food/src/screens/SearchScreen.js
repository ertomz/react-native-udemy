import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import SearchBar from '../components/SearchBar'; // import child
import useResults from '../hooks/useResults'; // api call function and variables
import ResultsList from '../components/ResultsList';

const SearchScreen = () => {
    const [term, setTerm] = useState(''); // string search term, set default search
    const [searchApi, results, errorMessage] = useResults(); // get the returned values from useResults

    // Filter results by price
    const filterResultsByPrice = (price) => {
        // price === '$' || '$$' || '$$$'
        // return only results with price the same as input price
        return results.filter(result => {
            return result.price === price
        });
    };

    // Return search bar, sections, and results
    // Flex makes the view fill the entire area
    return <> 
        <SearchBar 
            term={term} 
            onTermChange={setTerm}
            // onTermSubmit={searchApi} // old
            onTermSubmit={ () => searchApi(term)} // new: searchApi now takes a parameter of searchTerm
        />
        {errorMessage ? <Text>{errorMessage}</Text> : null}

        {/* 3X ResultsList for the 3 scrollable sections 
        Pass down navigation prop so we can navigate to each restaurant's page */}
        <ScrollView>
            <ResultsList results={filterResultsByPrice('$')} title="Cost Effective"/>
            <ResultsList results={filterResultsByPrice('$$')} title="Bit Pricier"/>
            <ResultsList results={filterResultsByPrice('$$$')} title="Big Spender"/>
        </ScrollView>
    </>
};

const styles = StyleSheet.create({});

export default SearchScreen;