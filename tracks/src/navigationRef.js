// Navigate from outside of React: function that gives us access to RN navigator

import { NavigationActions } from 'react-navigation';

// Define variable (with let)
let navigator;

// nav object comes from React Navigation, lets you navigate!
export const setNavigator = (nav) => {
    // Assign nav to our navigator variable (lol)
    navigator = nav;
};

// Where to navigate to, and what info we're taking with us
export const navigate = (routeName, params) => {
    // Dispatch an action: change state, show different screen to user
    navigator.dispatch(
        NavigationActions.navigate({
            routeName,
            params
        })
    );
};