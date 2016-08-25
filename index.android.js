

import React, { Component } from 'react';
import {
  Scene,
  Router,
  TabBar,
  Modal,
  Schema,
  Actions,
  Reducer,
  ActionConst
} from 'react-native-router-flux'

import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Button from 'react-native-button'

import Home from './app/components/Home';
import Launch from './app/components/Launch';


const reducerCreate = params=>{
    const defaultReducer = Reducer(params);
    return (state, action)=>{
        console.log("ACTION:", action);
        return defaultReducer(state, action);
    }
};

const Register = () => (
  <View style={styles.container}>
    <Text>Register page</Text>
    <Button onPress={Actions.home}>Replace screen</Button>
    <Button onPress={Actions.pop}>Back</Button>
  </View>
);


class test_proj extends Component {
  render() {
    return <Router createReducer={reducerCreate} sceneStyle={{backgroundColor:'#F7F7F7'}}>
      <Scene key="modal" component={Modal} >
        <Scene key="root" hideNavBar={true}>


          <Scene key="launch" component={Launch}
          title="Launch" style={{flex:1, backgroundColor:'transparent'}} initial={true} />

        </Scene>
        <Scene key="error" component={Error}/>
      </Scene>
    </Router>;
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Test project
        </Text>
      </View>
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

AppRegistry.registerComponent('HumorUs', () => test_proj);
