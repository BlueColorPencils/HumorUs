import React from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  View
} from 'react-native';

import Launch from './Launch';

import ScrollableTabView, { DefaultTabBar, } from 'react-native-scrollable-tab-view';
import FacebookTabBar from './FacebookTabBar';
import Icon from 'react-native-vector-icons/Ionicons';

// Using tabBarPosition='overlayTop' or 'overlayBottom' lets the content show through a
// semitransparent tab bar. Note that if you build a custom tab bar component, its outer container
// must consume a 'style' prop (e.g. <View style={this.props.style}) to support this feature.
export default React.createClass({
  render() {
    return <ScrollableTabView
      style={styles.container}
      renderTabBar={()=><FacebookTabBar backgroundColor='rgba(255, 255, 255, 0.7)' />}
      tabBarPosition='overlayTop'
    >

      <ScrollView tabLabel="photo">
        <View style={styles.innercontainer}>
          <Text>HEELLO FROM THE OTHER SIIIIIDE   <Icon name="ios-book" color="#4F8EF7" /></Text>
        </View>
      </ScrollView>

      <ScrollView tabLabel="forum">
        <View style={styles.innercontainer}>
          <Icon name='logo-android' color='#A4C639' size={300} style={styles.icon} />
          <Icon name='logo-android' color='black' size={300} style={styles.icon} />

        </View>
      </ScrollView>


      <ScrollView tabLabel="account-box">
        {Launch}

      </ScrollView>


    </ScrollableTabView>;
  },
});

const styles = StyleSheet.create({
  container: {
    // marginTop: 30,
  },
  icon: {
    width: 300,
    height: 300,
    alignSelf: 'center',
  },
  innercontainer: {
    marginTop: 100
  }
});

// import React from 'react';
// import {
//   View,
//   Text,
//   Component,
//   StyleSheet,
//   TouchableHighlight,
//   ScrollView,
//   Image,
//   Dimensions,
//   ListView
// } from "react-native";
//
// let windowWidth = Dimensions.get("window").width
// import API from "./api"
// // let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
//
//
// class Home extends React.Component {
//   // constructor (props) {
//   //   super(props)
//   //   this.state = {
//   //     dataSource: ds,
//   //     loading: true,
//   //     images: []
//   //   }
//   // }
//   // componentDidMount () {
//   //   API.get()
//   //     .then((response) => {
//   //       console.log("HELLO", response)
//   //       this.setState({
//   //         dataSource: ds.cloneWithRows(response.data.items),
//   //         loading: false
//   //       })
//   //     }, (error) => {
//   //     console.log('error: ', error)
//   //   })
//   // }
//   // renderRow (rowData) {
//   //   if (rowData.link.match(/\.(jpg|png|gif)/g)) {
//   //     return (
//   //       <View>
//   //         <Image
//   //           source={{ uri: rowData.link }}
//   //           style={{width: windowWidth, height: windowWidth}} />
//   //       </View>)
//   //   } else {
//   //     return null
//   //   }
//   // }
//   // render () {
//   //   let { loading, images } = this.state
//   //   if (loading) {
//   //     images = (
//   //       <ListView
//   //                  dataSource={this.state.dataSource}
//   //                  renderRow={this.renderRow.bind(this)} />
//   //
//   //       // <View style={style.loadingContainer}>
//   //       //   <Text style={style.loading}>Loading images…</Text>
//   //       // </View>
//   //     )
//   //   }
//   //   if (!loading) {
//   //     images = <ListView
//   //                dataSource={this.state.dataSource}
//   //                renderRow={this.renderRow.bind(this)} />
//   //   }
//   //   return (
//   //     <View style={{flex: 1}}>
//   //       <TouchableHighlight
//   //         underlayColor="transparent"
//   //         onPress={this.props.closeModal}
//   //         style={style.closeButton}>
//   //         <Text style={style.closeButtonText}>MEOW</Text>
//   //       </TouchableHighlight>
//   //       <ScrollView style={{flex: 1}}>
//   //         {images}
//   //       </ScrollView>
//   //     </View>
//   //   )
//   // }
// }
//
// var style = StyleSheet.create({
//     container: {
//       // marginTop: 150,
//       flex: 1,
//       alignItems: 'center',
//       justifyContent: 'center',
//       backgroundColor: "#F5FCFF"
//     },
//     innercontainer: {
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//         backgroundColor: "#F5FCFF"
//     },
//     welcome: {
//         fontSize: 20,
//         textAlign: "center",
//         margin: 10
//     },
//     instructions: {
//         textAlign: "center",
//         color: "#333333",
//         marginBottom: 5,
//     },
// });
//
// // import React from 'react';
// // import {View, Text, StyleSheet, ToolbarAndroid} from "react-native";
// // import Button from "react-native-button";
// // import {Actions} from "react-native-router-flux";
// // import {FBLogin, FBLoginManager} from 'react-native-facebook-login';
//
// //
// // var styles = StyleSheet.create({
// //     container: {
// //       // marginTop: 150,
// //       flex: 1,
// //       alignItems: 'center',
// //       justifyContent: 'center',
// //       backgroundColor: "#F5FCFF"
// //     },
// //     innercontainer: {
// //         flex: 1,
// //         justifyContent: "center",
// //         alignItems: "center",
// //         backgroundColor: "#F5FCFF"
// //     },
// //     welcome: {
// //         fontSize: 20,
// //         textAlign: "center",
// //         margin: 10
// //     },
// //     instructions: {
// //         textAlign: "center",
// //         color: "#333333",
// //         marginBottom: 5,
// //     },
// // });
// //
// // class Home extends React.Component {
// //     render(){
// //         var _this = this;
// //         return (
// //           <View style={styles.container}>
// //           <ToolbarAndroid
// //             style={styles.nav}
// //             title="AwesomeApp"
// //             actions={[{title: 'TOOLBAR', show: 'always'}]}
// //             onActionSelected={this.onActionSelected} />
// //
// //             <View style={styles.innercontainer}>
// //                 <Text>MAIN SCREEN</Text>
// //             </View>
// //
// //             <FBLogin style={styles.loginbutton}
// //               onLogout={function(){
// //                 console.log("Logged out.");
// //                 _this.setState({ user : null });
// //               }}
// //             />
// //           </View>
// //         );
// //     }
// // }
// //
// //
// //
// // var styles = StyleSheet.create({
// //     nav: {
// //       padding: 40,
// //       flex: 1
// //
// //     }
// //   })
// //
// module.exports = Home;
//
// import React from 'react';
// import {PropTypes} from "react";
// import {StyleSheet, Text, View} from "react-native";
// import Button from 'react-native-button';
// import { Actions } from 'react-native-router-flux';
//
// const contextTypes = {
//   drawer: React.PropTypes.object,
// };
//
// const propTypes = {
//   name: PropTypes.string,
//   sceneStyle: View.propTypes.style,
//   title: PropTypes.string,
// };
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//     borderWidth: 1,
//     borderColor: 'red',
//   },
// });
//
// const TabView = (props, context) => {
//   const drawer = context.drawer;
//   return (
//     <View style={[styles.container, props.sceneStyle ]}>
//       <Text>Tab {props.title}</Text>
//       {props.name === 'tab1_1' &&
//         <Button onPress={Actions.tab1_2}>next screen for tab1_1</Button>
//       }
//       {props.name === 'tab2_1' &&
//         <Button onPress={Actions.tab2_2}>next screen for tab2_1</Button>
//       }
//       <Button onPress={Actions.pop}>Back</Button>
//
//     </View>
//   );
// };
//
// TabView.contextTypes = contextTypes;
// TabView.propTypes = propTypes;
//
// export default TabView;
