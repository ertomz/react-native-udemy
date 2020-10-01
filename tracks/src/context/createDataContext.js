import React, { useReducer} from 'react';

export default (reducer, actions, defaultValue) => {
    // Context: connects child screens to Provider to get info
    const Context = React.createContext();
    // Provider, distributer with info
    const Provider = ({ children }) => {
        // Pass in reducer function and default state
        const [state, dispatch] = useReducer(reducer, defaultValue);
        // Loop over actions functions, call each with dispatch (dispatch sends action to reducer where it is completed)
        const boundActions = {};
        for (let key in actions) {
            boundActions[key] = actions[key](dispatch);
        };
        // Return Context.Provider (makes data available to components underneath it)
        return (
            <Context.Provider value={{ state, ...boundActions }}>
                {children}
            </Context.Provider>
        );
    };
    // Return object with Context, Provider (getter of info, place of info)
    return { Context, Provider };
};