// Reusable function for automating Context creation

import React, { useReducer } from 'react';

export default (reducer, actions, initialState) => {
    // Responsible for connecting the Provider to children 
    const Context = React.createContext();

    const Provider = ({ children }) => {
        const [state, dispatch] = useReducer(reducer, initialState);
        // Loop thorugh actions object. For every key, call function with dispatch function, returns function which will be passed down through value prop
        const boundActions = {};
        for (let key in actions) {
            // key === 'addBlogPost'
            boundActions[key] = actions[key](dispatch);
        }
        // Create component that can accept another component (children)
        // Value is what the parent shares with the child (Provider --> BlogList)
        return <Context.Provider value={{ state, ...boundActions }}>
            {children}
        </Context.Provider>
    }

    return { Context, Provider }
};