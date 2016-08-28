
import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  Navigator,
  View
} from 'react-native';

import Button from 'react-native-button'

import Main from './app/components/Home';
import Profile from './app/components/Profile';
import FBLogin from './app/components/Launch';

class HumorUs extends Component {
  renderScene(route, navigator) {
   if(route.name == 'FBLogin') {
     return <FBLogin navigator={navigator} />
   }
   if(route.name == 'Main') {
     return <Main navigator={navigator} />
   }
   if(route.name == 'Profile') {
     return <Profile navigator={navigator} />
   }
  }

  render() {
    const routes = [
      {name: 'FBLogin', index: 0},
      {name: 'Main', index: 1},
      {name: 'Profile', index: 1},
    ];
    return (
      <Navigator
        initialRoute={routes[0]}
        initialRouteStack={routes}
        renderScene = {this.renderScene} />
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('HumorUs', () => HumorUs);
