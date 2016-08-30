
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

import Main from './app/components/Home';
import Profile from './app/components/Profile';
import FBLogin from './app/components/Launch';

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
    AsyncStorage.getItem("user").then((value) => {
      let info = (JSON.parse(value))
      if(info.id && info.id !== '' ) {
        this.setState({ num: '1', persists: true });
      }
      else {
        this.setState({ num: '0', persists: true });
      }
    }).done()
  }

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
        initialRouteStack={routes}
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
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('HumorUs', () => HumorUs);
