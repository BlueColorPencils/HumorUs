import React from 'react';
import {View, Text, StyleSheet, TextInput, Image} from "react-native";
// import Button from "react-native-button";
// import {Actions} from "react-native-router-flux";
//
// const styles = StyleSheet.create({
//   container: {
//     padding: 26,
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "transparent",
//     borderWidth: 2,
//     borderColor: 'red',
//   }
// });
//
// class Launch extends React.Component {
//   render(){
//     return (
//       <View {...this.props}  style={styles.container}>
//         <Text>Launch page \(Login page)</Text>
//
//         // <TextInput/>
//         <Button onPress={()=>Actions.login({data:"Custom data", title:"Custom title" })}>Go to Login page</Button>
//         <Button onPress={Actions.register}>Go to Register page</Button>
//         <Button onPress={Actions.register2}>Go to Register page without animation</Button>
//         <Button onPress={()=>Actions.error("Error message")}>Popup error</Button>
//         <Button onPress={Actions.tabbar}>Go to TabBar page</Button>
//         <Button onPress={Actions.switcher}>Go to switcher page</Button>
//         <Button onPress={Actions.pop}>back</Button>
//       </View>
//     );
//   }
// }
//
// module.exports = Launch;


'use strict';
// var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');


var Launch = React.createClass({
  getInitialState: function() {
    return {
      username: '',
      password: ''
    }
  },
  render: function() {
    return (
      <View style={styles.container}>
        <Image style={styles.bg} source={{uri: 'http://i.imgur.com/xlQ56UK.jpg'}} />

        <View style={styles.header}>
            <Image style={styles.mark} source={{uri: 'http://i.imgur.com/da4G0Io.png'}} />
        </View>

        <View style={styles.terms}>
          <Text style={styles.greyFont}>By continuing, you agree to our <Text style={styles.whiteFont}>Terms of Service</Text> and <Text style={styles.whiteFont}>Privacy policy</Text></Text>
        </View>

        <View style={styles.signin}>
            <Text style={styles.whiteFont}>Sign In with Facebook</Text>
        </View>
      </View>
    );
  }
});
var styles = StyleSheet.create({
    container: {
      flexDirection: 'column',
      flex: 1,
      backgroundColor: 'transparent'
    },
    bg: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: windowSize.width,
        height: windowSize.height
    },
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: .5,
        backgroundColor: 'transparent'
    },
    mark: {
        width: 150,
        height: 150
    },
    signin: {
        bottom: 20,
        backgroundColor: '#FF3366',
        padding: 20,
        marginLeft: 15,
        marginRight: 15,
        alignItems: 'center'
    },
    terms: {
      top: 10,
      justifyContent: 'center',
      alignItems: 'center',
      flex: .15
    },
    inputs: {
        marginTop: 10,
        marginBottom: 10,
        flex: .25
    },
    inputPassword: {
        marginLeft: 15,
        width: 20,
        // marginTop: -10,
        height: 22
    },
    inputUsername: {
      marginLeft: 15,
      width: 20,
      height: 20
    },
    inputContainer: {
        padding: 12,
        // borderWidth: 1,
        borderBottomColor: '#CCC',
        borderColor: 'transparent'
    },
    input: {
        position: 'absolute',
        left: 61,
        top: 4,
        right: 16,
        height: 44,
        fontSize: 18,
        color: '#000'
    },
    forgotContainer: {
      alignItems: 'flex-end',
      padding: 15,
    },
    greyFont: {
      color: '#D8D8D8',
      fontSize: 10
    },
    whiteFont: {
      color: '#FFF'
    }
})
module.exports = Launch;
