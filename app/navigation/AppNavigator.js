import React, { Component, PropTypes } from 'react';
import { Navigator, Text, TouchableHighlight, View } from 'react-native';
import PicsView from '../screens/PicsScreen'


export default class SimpleNavigationApp extends Component {
  render() {
    const routes = [
      {title: 'Welcome Scene', index: 0, id: 'first'},
      {title: 'Login Scene', index: 1},
      {title: 'Pics Scene', index: 2},
      {title: 'Message Scene', index: 3},
      {title: 'Profile Scene', index: 4},
      {title: 'Edit Profile Scene', index: 5}
    ];
    var num = 1;
    return (
      <Navigator
        initialRoute={routes[0]}
        initialRouteStack={routes}
        renderScene={(route, navigator) =>
          <TouchableHighlight onPress={() => {
            if (route.title == 'Pics Scene') {
              return this._navigate()
              console.log('meowmeowmeow')
            }
            else if (route.index < 5) {
              navigator.push(routes[num]);
              num++
            // } else {
            //   navigator.pop();
            }
          }}>
          <Text>Hello {route.title}!</Text>
          </TouchableHighlight>
        }

        navigationBar={
          <Navigator.NavigationBar
            routeMapper={{
              LeftButton: (route, navigator, index, navState) =>
              {
                if (route.index === 0 || route.index === 5) {
                  return (<Text>PICS</Text>)
                  // return null;
                } else {
                  return (
                    <TouchableHighlight onPress={() => navigator.pop()}>
                      <Text>PICS</Text>
                    </TouchableHighlight>
                  );
                }
              },
              RightButton: (route, navigator, index, navState) =>
                { return (
                  <TouchableHighlight onPress={() => navigator.pop()}>
                    <Text>PROFILE</Text>
                  </TouchableHighlight>
                );
               },
              Title: (route, navigator, index, navState) =>
                { return (
                  <TouchableHighlight onPress={() => navigator.pop()}>
                    <Text>MESSAGES</Text>
                  </TouchableHighlight>
                );
               }
            }}
            style={{backgroundColor: 'mistyrose', padding: 10}}
          />
        }
        style={{padding: 100}}
      />
    );
  }

  _navigate(){
    console.log("navigate")
    this.props.navigator.push({
      title: 'Welcome Scene' // Matches route.name
    })
  }
  // navigatorRenderScene(route, navigator) {
  //  _navigator = navigator;
  //  switch (route.title) {
  //    case 'Welcome Scene':
  //      return (<First navigator={navigator} title="meow"/>);
  //    case 'second':
  //      return (<Second navigator={navigator} title="woof" />);
  //    }
  //  }
}

// class AppNavigator extends Component {
//   static propTypes = {
//     title: PropTypes.string.isRequired,
//     onForward: PropTypes.func.isRequired,
//     onBack: PropTypes.func.isRequired,
//   }
//   render() {
//     return (
//       <View>
//         <Text>Current Scene: { this.props.title }</Text>
//         <TouchableHighlight onPress={this.props.onForward}>
//           <Text>Tap me to load the next scene</Text>
//         </TouchableHighlight>
//         <TouchableHighlight onPress={this.props.onBack}>
//           <Text>Tap me to go back</Text>
//         </TouchableHighlight>
//       </View>
//     )
//   }
// }



// ---------------- ABOVE WORKS.... SO yeah ---------------------------
// import React, { Component, PropTypes } from 'react';
// import { Navigator, Text, TouchableHighlight, View } from 'react-native';
// import PicsView from '../screens/PicsScreen'
//
// export default class SimpleNavigationApp extends Component {
//   render() {
//     return (
//       <Navigator
//         style={{ flex:1 }}
//         initialRoute={{ name: 'Main' }}
//         renderScene={ this.renderScene } />
//   )}
//   renderScene(route, navigator) {
//    if(route.name == 'Main') {
//      return <Main navigator={navigator} />
//    }
//    if(route.name == 'Home') {
//      return <Home navigator={navigator} />
//    }
//   }
//
//   _navigate(){
//     this.props.navigator.push({
//       name: 'Home', // Matches route.name
//     })
//   }
// }
