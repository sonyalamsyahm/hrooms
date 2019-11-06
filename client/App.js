import React from 'react';
import {Provider} from 'react-redux';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';

import store from './src/_stores/index';
import Apps from './src/screens';

const RootNavigation = createAppContainer(
  createSwitchNavigator(
    {
      index: {
        screen: Apps,
      },
    },
    {
      initialRouteName: 'index',
    },
  ),
);

const App = () => {
  return (
    <Provider store={store}>
      <RootNavigation />
    </Provider>
  );
};

export default App;
