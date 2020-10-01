import React from 'react';
import { createAppContainer, createNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import IndexScreen from './src/screens/IndexScreen';
import { Provider } from './src/context/BlogContext'; // need { } because not default export (named export)
import ShowScreen from './src/screens/ShowScreen';
import CreateScreen from './src/screens/CreateScreen';
import EditScreen from './src/screens/EditScreen';


const navigator = createStackNavigator(
  {
    Index: IndexScreen,
    Show: ShowScreen,
    Create: CreateScreen,
    Edit: EditScreen
  }, 
  {
    initialRouteName: 'Index',
    defaultNavigationOptions: {
      title: 'Blogs'
    }
  }
);

// PROVIDER Version
// make createAppContainer into a variable 'App'
const App = createAppContainer(navigator);
// Wrap App/navigator inside Provider
/// Pass App in as child to Provider
export default () => {
  return <Provider>
      <App/>
    </Provider>
};