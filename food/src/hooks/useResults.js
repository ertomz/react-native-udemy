import { useEffect, useState } from 'react';
import yelp from '../api/yelp'; // api for network request

// Esports a function which returns [searchApi, results, errorMessage]
export default () => {
    const [results, setResults] = useState([]); // array of results
    const [errorMessage, setErrorMessage] = useState(''); // string of error message

    // API request
    const searchApi = async (searchTerm) => {
        console.log('searchApi run');
        try {
            // '/search' gets concatenated onto the baseURL
            const response = await yelp.get('/search', {
                params: {
                    limit: 50,
                    term: searchTerm,
                    location: 'Park City'
                }
            }); 
            setResults(response.data.businesses);
        } catch (err) {
            setErrorMessage('Something went wrong!');
        }
    };

    // Call searchApi when component first rendered
    // Dont do this:
    // searchApi('pasta')
    useEffect(() => {
        searchApi('pasta');
    }, [])

    // return what we reference in SearchScreen
    // SearcScreen references searchApi, results, and errorMessage
    return [searchApi, results, errorMessage];


}