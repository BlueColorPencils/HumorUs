
import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  Navigator,
  AsyncStorage,
  Alert,
  View
} from 'react-native';

import Button from 'react-native-button'
import TimerMixin from 'react-timer-mixin';

import Profile from './app/components/Profile';
import FBLogin from './app/components/Launch';
import Main from './app/components/Home';
// const Main = require('HomePage')

import Spinner from 'react-native-loading-spinner-overlay';

class HumorUs extends Component {
      mixins: [TimerMixin]

  constructor(props) {
    super(props)
    this.state = {
      num: 0,
      persists: false
    }
  }

  componentWillMount() {
    // AsyncStorage.getItem("user").then((value) => {
    // this.setState({ num: '0', persists: true });

    AsyncStorage.getItem("loggedin").then((value) => {
      console.log("value", value)
      if (value === 'true') {
        console.log("logged in")
        this.setState({ num: '1', persists: true });
      } else {
        console.log("not logged in?")
        this.setState({ num: '0', persists: true });
      }

    }).done()
  }

  renderScene(route, navigator) {
    console.log("ROUTE?", route)
    if(route.name == 'FBLogin') {
      return <FBLogin navigator={navigator} />
    }
    if(route.name === 'Main') {
      return <Main navigator={navigator} />
    }
    if(route.name == 'Profile') {
      return <Profile navigator={navigator} />
    }
  }


    render() {
       if (!this.state.persists) {
        return <View><Spinner visible={true}/></View>
        // return <View><Text>Loading...</Text></View>;
      }
      const routes = [
        {name: 'FBLogin', index: 0},
        {name: 'Main', index: 1},
        {name: 'Profile', index: 2},
      ];

      return (  <Navigator
        initialRoute={routes[this.state.num]}
        // initialRouteStack={routes}
       configureScene={() => {
          return Navigator.SceneConfigs.FadeAndroid;
        }}
        renderScene = {this.renderScene} />
      )
    // }
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
    marginBottom: 5
  },
});

AppRegistry.registerComponent('HumorUs', () => HumorUs);
