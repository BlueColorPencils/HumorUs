/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

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
import Login from './app/components/Login';
import Login2 from './app/components/Login2';
import TabIcon from './app/components/TabIcon';
import TabView from './app/components/TabView';

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
          <Scene key="register" component={Register} title="Register"/>
          <Scene key="register2" component={Register} title="Register2" duration={1}/>
          <Scene key="home" component={Home} title="Replace" type={ActionConst.REPLACE}/>
          <Scene key="launch" component={Launch} title="Launch" style={{flex:1, backgroundColor:'transparent'}} initial={true} />
          <Scene key="login" direction="vertical">
              <Scene key="loginModal" component={Login} schema="modal" title="Login"  hideNavBar={false}/>
              <Scene key="loginModal2" hideNavBar={true} component={Login2} title="Login2"/>
          </Scene>

          <Scene key="tabbar" tabs={true} >
              <Scene key="tab1"  title="Tab #1" icon={TabIcon} navigationBarStyle={{backgroundColor:'black'}} titleStyle={{color:'white'}}>
                  <Scene key="tab1_1" component={TabView} title="Tab #1_1" onRight={()=>alert("Right button")} rightTitle="Right" />
                  <Scene key="tab1_2" component={TabView} title="Tab #1_2" titleStyle={{color:'black'}}/>
              </Scene>
              <Scene key="tab2" initial={true} title="Tab #2" icon={TabIcon}>
                  <Scene key="tab2_1" component={TabView} title="Tab #2_1" onLeft={()=>alert("Left button!")} leftTitle="Left"/>
                  <Scene key="tab2_2" component={TabView} title="Tab #2_2"/>
              </Scene>
              <Scene key="tab3" component={TabView} title="Tab #3" hideTabBar={true} icon={TabIcon}/>
              <Scene key="tab4" component={TabView} title="Tab #4" hideNavBar={true} icon={TabIcon}/>
              <Scene key="tab5" component={TabView} title="Tab #5" icon={TabIcon} />
          </Scene>
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


// import React, { Component } from 'react';
// import {
//   AppRegistry,
//   StyleSheet,
//   Text,
//   View,
//   Image,
//   ListView,
//   Navigator,
//   TouchableHighlight,
//   PropTypes
// } from 'react-native';
//


//
// import AppNavigator from './app/navigation/AppNavigator';
//
//
// class HumorUs extends Component {
//   render() {
//     return (
//       <AppNavigator />
//     )
//   }
// }
//
//
// AppRegistry.registerComponent('HumorUs', () => HumorUs);

//
// var Router = require('react-native-router');
//
// // The initial page
// var HelloPage = React.createClass({
//   render: function() {
//     return <Text>Hello world!</Text>;
//   }
// });
//
// // Your route object should contain at least:
// // - The name of the route (which will become the navigation bar title)
// // - The component object for the page to render
// var firstRoute = {
//   name: 'Welcome!',
//   component: HelloPage
// };
//
// // The Router wrapper
// var MyApp = React.createClass({
//   render() {
//     return (
//       <Router firstRoute={firstRoute} />
//     )
//   }
// });
//
// AppRegistry.registerComponent('routerTest', () => MyApp);


//
// import React, { Component } from 'react';
// import { Router, Scene } from 'react-native-router-flux';
// import {  AppRegistry} from 'react-native'
//
// import Layout from './Layout';
// import PageOne from './PageOne';
// import PageTwo from './PageTwo';
//
// export default class App extends Component {
//   render() {
//     return (
//       <Router>
//         <Scene key="root">
//           <Scene key="Layout" component={Layout} title="LayoutPage">
//             <Scene key="pageOne" component={PageOne} title="PageOne" initial={true} />
//             <Scene key="pageTwo" component={PageTwo} title="PageTwo" />
//           </Scene>
//         </Scene>
//       </Router>
//     )
//   }
// }
// AppRegistry.registerComponent('HumorUs', () => App);
//


// // class ListViewBasics extends Component {
//   // Initialize the hardcoded data
//   constructor(props) {
//     super(props);
//     const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
//     this.state = {
//       dataSource: ds.cloneWithRows([
//         'John', 'Joel', 'James', 'Jimmy', 'Jackson', 'Jillian', 'Julie', 'Devin'
//       ])
//     };
//   }
//   render() {
//     return (
//       <View style={{paddingTop: 22}}>
//         <ListView
//           dataSource={this.state.dataSource}
//           renderRow={(rowData) => <Text>{rowData}</Text>}
//         />
//       </View>
//     );
//   }
// }
//
// // App registration and rendering
// AppRegistry.registerComponent('AwesomeProject', () => ListViewBasics);
//










// 'use strict'
// import React, { Component } from 'react'
// import {  AppRegistry, Navigator, Text, TouchableHighlight, StyleSheet} from 'react-native'
// import PeopleIndexScreen from './app/screens/PeopleIndexScreen'
// import PersonShowScreen from './app/screens/PersonShowScreen'
//
// class AppNavigator extends Component {
//
//   render() {
//     const routes = [
//       {title: 'First Scene', index: 0},
//       {title: 'Second Scene', index: 1},
//     ];
//     return (
//       <Navigator
//         initialRoute={routes[0]}
//         initialRouteStack={routes}
//         renderScene={(route, navigator) =>
//           <TouchableHighlight onPress={() => {
//             if (route.index === 0) {
//               navigator.push(routes[1]);
//             } else {
//               navigator.pop();
//             }
//           }}>
//           <Text>Hello {route.title}!</Text>
//           </TouchableHighlight>
//         }
//         style={{padding: 100}}
//       />
//     );
//   }
// }
// //   _renderScene(route, navigator) {
// //     var globalNavigatorProps = { navigator }
// //
// //     switch(route.ident) {
// //       case "PeopleIndex":
// //         return (
// //           <PeopleIndexScreen
// //             {...globalNavigatorProps} />
// //         )
// //
// //       case "PersonShow":
// //         return (
// //           <PersonShowScreen
// //             {...globalNavigatorProps}
// //             person={route.person} />
// //         )
// //
// //       default:
// //         return (
// //           <Text>{`YO YOU MESSED SOMETHING UP ${route}`}</Text>
// //         )
// //     }
// //   }
// //
// //   render() {
// //     return (
// //       <Navigator
// //         initialRoute={{this.props.initialRoute}}
// //         ref="appNavigator"
// //         style={styles.navigatorStyles}
// //         renderScene={this._renderScene, navigator}
// //         // configureScene={(route) => ({ Navigator.SceneConfigs.FloatFromRight })} />
// //     )
// //   }
// //
// // }
//
// const styles = StyleSheet.create({
//
//   navigatorStyles: {
//
//   }
//
// })
//
// // module.exports = AppNavigator
// AppRegistry.registerComponent('AppNavigator', () => AppNavigator);
