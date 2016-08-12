
        <Text>{ user ? user.token : "WTF" }</Text>



import React from 'react';
import {View, Text, StyleSheet, TextInput, Image} from "react-native";
import {FBLogin, FBLoginManager} from 'react-native-facebook-login';
var Icon = require('react-native-vector-icons/FontAwesome');


'use strict';
// var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');

class FBLoginView extends React.Component {
  static contextTypes = {
    isLoggedIn: React.PropTypes.bool,
    login: React.PropTypes.func,
    logout: React.PropTypes.func,
    props: React.PropTypes.object
	};

  constructor(props) {
      super(props);
    }

    render(){
        return (
          <View style={[]}>
            <Icon.Button onPress={() => {
                if(!this.context.isLoggedIn){


                  this.context.login()
                }else{
                  this.context.logout()
                }

              }}
              // <Text style={styles.blackFont}>Sign In with Facebook</Text>
              color={"#000000"}
              backgroundColor={"#ffffff"} name={"facebook"}  size={20} borderRadius={100} >

            </Icon.Button>
          </View>
      )
    }
}

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
        <Image style={styles.bg} source={{uri: 'https://scontent-sea1-1.xx.fbcdn.net/t31.0-8/13323231_10207167534975001_2138488519942298615_o.jpg'}} />



        <View style={styles.header}>
            <Image style={styles.mark} source={{uri: 'http://i.imgur.com/da4G0Io.png'}} />
        </View>

        <View style={styles.terms}>
          <Text style={styles.greyFont}>By continuing, you agree to our <Text style={styles.whiteFont}>Terms of Service</Text> and <Text style={styles.whiteFont}>Privacy policy</Text></Text>
        </View>

       <FBLogin
        buttonView={<FBLoginView />}
        />


      </View>
    );
  }
});
      // <View style={styles.container}>
      <View style={styles.message}>
        <Text style={styles.messageFont}>Find your lol mate.</Text>
      </View>
      // </View>

// var styles = StyleSheet.create({
//     container: {
//       flexDirection: 'column',
//       flex: 1,
//       backgroundColor: 'transparent'
//     },
//     message: {
//       justifyContent: 'center',
//       alignItems: 'center',
//       top: 30
//     },
//     messageFont: {
//       color: '#FFF',
//       fontSize: 20
//     },
//     bg: {
//         position: 'absolute',
//         // marginLeft: 10,
//         // top: 0,
//         bottom: 0,
//         width: windowSize.width,
//         height: windowSize.height
//     },
//     header: {
//         justifyContent: 'center',
//         alignItems: 'center',
//         flex: .5,
//         backgroundColor: 'transparent'
//     },
//     mark: {
//         width: 150,
//         height: 150,
//         bottom: 70
//     },
//     signin: {
//         bottom: 20,
//         backgroundColor: '#FF3366',
//         padding: 20,
//         marginLeft: 15,
//         marginRight: 15,
//         alignItems: 'center'
//     },
//     terms: {
//       top: 10,
//       justifyContent: 'center',
//       alignItems: 'center',
//       flex: .15
//     },
//     inputs: {
//         marginTop: 10,
//         marginBottom: 10,
//         flex: .25
//     },
//     inputPassword: {
//         marginLeft: 15,
//         width: 20,
//         // marginTop: -10,
//         height: 22
//     },
//     inputUsername: {
//       marginLeft: 15,
//       width: 20,
//       height: 20
//     },
//     inputContainer: {
//         padding: 12,
//         // borderWidth: 1,
//         borderBottomColor: '#CCC',
//         borderColor: 'transparent'
//     },
//     input: {
//         position: 'absolute',
//         left: 61,
//         top: 4,
//         right: 16,
//         height: 44,
//         fontSize: 18,
//         color: '#000'
//     },
//     forgotContainer: {
//       alignItems: 'flex-end',
//       padding: 15,
//     },
//     greyFont: {
//       color: '#FFF',
//       fontSize: 10
//     },
//     whiteFont: {
//       color: '#FFF'
//     },
//     blackFont: {
//       color: '#000'
//     }
// })
// module.exports = Launch;




      // <View style={styles.container}>
        // <Image style={styles.bg} source={{uri: 'https://scontent-sea1-1.xx.fbcdn.net/t31.0-8/13323231_10207167534975001_2138488519942298615_o.jpg'}} />
        //
        // <View style={styles.message}>
        //   <Text style={styles.messageFont}>Find your troll mate.</Text>
        // </View>
        //
        // <View style={styles.header}>
        //     <Image style={styles.mark} source={{uri: 'http://i.imgur.com/da4G0Io.png'}} />
        // </View>
        //
        // <View style={styles.terms}>
        //   <Text style={styles.greyFont}>By continuing, you agree to our <Text style={styles.whiteFont}>Terms of Service</Text> and <Text style={styles.whiteFont}>Privacy policy</Text></Text>
        // </View>

        // <View style={styles.signin}>
            // <Text style={styles.whiteFont}>Sign In with Facebook</Text>
        // </View>
      // </View>
//     );
//   }
// });



// import React from 'react';
// import {View, Text, StyleSheet, TextInput, Image} from "react-native";
//
// 'use strict';
// // var React = require('react-native');
// var Dimensions = require('Dimensions');
// var windowSize = Dimensions.get('window');
//
//
// var Launch = React.createClass({
//   getInitialState: function() {
//     return {
//       username: '',
//       password: ''
//     }
//   },
//   render: function() {
//     return (
//       <View style={styles.container}>
//         <Image style={styles.bg} source={{uri: 'https://scontent-sea1-1.xx.fbcdn.net/t31.0-8/13323231_10207167534975001_2138488519942298615_o.jpg'}} />
//
//         <View style={styles.message}>
//           <Text style={styles.messageFont}>Find your troll mate.</Text>
//         </View>
//
//         <View style={styles.header}>
//             <Image style={styles.mark} source={{uri: 'http://i.imgur.com/da4G0Io.png'}} />
//         </View>
//
//         <View style={styles.terms}>
//           <Text style={styles.greyFont}>By continuing, you agree to our <Text style={styles.whiteFont}>Terms of Service</Text> and <Text style={styles.whiteFont}>Privacy policy</Text></Text>
//         </View>
//
//         <View style={styles.signin}>
//             <Text style={styles.whiteFont}>Sign In with Facebook</Text>
//         </View>
//       </View>
//     );
//   }
// });
// var styles = StyleSheet.create({
//     container: {
//       flexDirection: 'column',
//       flex: 1,
//       backgroundColor: 'transparent'
//     },
//     message: {
//       justifyContent: 'center',
//       alignItems: 'center',
//       top: 30
//     },
//     messageFont: {
//       color: '#FFF',
//       fontSize: 20
//     },
//     bg: {
//         position: 'absolute',
//         // marginLeft: 10,
//         // top: 0,
//         bottom: 0,
//         width: windowSize.width,
//         height: windowSize.height
//     },
//     header: {
//         justifyContent: 'center',
//         alignItems: 'center',
//         flex: .5,
//         backgroundColor: 'transparent'
//     },
//     mark: {
//         width: 150,
//         height: 150,
//         bottom: 70
//     },
//     signin: {
//         bottom: 20,
//         backgroundColor: '#FF3366',
//         padding: 20,
//         marginLeft: 15,
//         marginRight: 15,
//         alignItems: 'center'
//     },
//     terms: {
//       top: 10,
//       justifyContent: 'center',
//       alignItems: 'center',
//       flex: .15
//     },
//     inputs: {
//         marginTop: 10,
//         marginBottom: 10,
//         flex: .25
//     },
//     inputPassword: {
//         marginLeft: 15,
//         width: 20,
//         // marginTop: -10,
//         height: 22
//     },
//     inputUsername: {
//       marginLeft: 15,
//       width: 20,
//       height: 20
//     },
//     inputContainer: {
//         padding: 12,
//         // borderWidth: 1,
//         borderBottomColor: '#CCC',
//         borderColor: 'transparent'
//     },
//     input: {
//         position: 'absolute',
//         left: 61,
//         top: 4,
//         right: 16,
//         height: 44,
//         fontSize: 18,
//         color: '#000'
//     },
//     forgotContainer: {
//       alignItems: 'flex-end',
//       padding: 15,
//     },
//     greyFont: {
//       color: '#FFF',
//       fontSize: 10
//     },
//     whiteFont: {
//       color: '#FFF'
//     }
// })
// module.exports = Launch;
//



//
//
//
//
// 'use strict';
// var React = require('react');
// var ReactNative = require('react-native');
//
// var {
//   StyleSheet,
//   Image,
//   Text,
//   View,
//   Icon,
// } = ReactNative;
//
// var FBLoginMock = require('./FBLoginMock');
// import {FBLogin, FBLoginManager} from 'react-native-facebook-login';

//
//
// var FB_PHOTO_WIDTH = 200;
//
// var Launch = React.createClass({
//   getInitialState: function(){
//     return {
//       user: null,
//     };
//   },
//
//   componentWillMount: function(){
//     this.updateView();
//   },
//
//   updateView: function(){
//     var _this = this;
//     FBLoginManager.getCredentials(function(error, data){
//       if (!error) {
//         _this.setState({ user : data.credentials });
//       } else {
//         _this.setState({ user : null });
//       }
//     });
//   },
//
//   render: function() {
//     var _this = this;
//     var user = this.state.user;
//
//     return (
//       <View style={styles.loginContainer}>
//
//         { user && <Photo user={user} /> }
//         { user && <Info user={user} /> }
//
//         <FBLoginMock style={{ marginBottom: 10, }}
//           onPress={function(){
//             console.log("FBLoginMock clicked.");
//           }}
//           onLogin={function(){
//             console.log("FBLoginMock logged in!");
//             _this.updateView();
//           }}
//           onLogout={function(){
//             console.log("FBLoginMock logged out.");
//             _this.setState({ user : null });
//           }}
//         />
//
//         <Text>{ user ? user.token : "N/A" }</Text>
//       </View>
//     );
//   }
// });
//
// var Photo = React.createClass({
//   propTypes: {
//     user: React.PropTypes.object.isRequired,
//   },
//
//   getInitialState: function(){
//     return {
//       photo: null,
//     };
//   },
//
//   componentWillMount: function(){
//     var _this = this;
//     var user = this.props.user;
//     var api = `https://graph.facebook.com/v2.3/${user.userId}/picture?width=${FB_PHOTO_WIDTH}&redirect=false&access_token=${user.token}`;
//
//     fetch(api)
//       .then((response) => response.json())
//       .then((responseData) => {
//         _this.setState({
//           photo : {
//             url : responseData.data.url,
//             height: responseData.data.height,
//             width: responseData.data.width,
//           },
//         });
//       })
//       .done();
//   },
//
//   render: function(){
//     var photo = this.state.photo;
//
//     return (
//       <View style={styles.bottomBump}>
//
//         <Image
//           style={photo &&
//             {
//               height: photo.height,
//               width: photo.width,
//             }
//           }
//           source={{uri: photo && photo.url}}
//         />
//       </View>
//     );
//   }
// });
//
// var Info = React.createClass({
//   propTypes: {
//     user: React.PropTypes.object.isRequired,
//   },
//
//   getInitialState: function(){
//     return {
//       info: null,
//     };
//   },
//
//   componentWillMount: function(){
//     var _this = this;
//     var user = this.props.user;
//     var api = `https://graph.facebook.com/v2.3/${user.userId}?fields=name,email&access_token=${user.token}`;
//
//     fetch(api)
//       .then((response) => response.json())
//       .then((responseData) => {
//         _this.setState({
//           info : {
//             name : responseData.name,
//             email: responseData.email,
//           },
//         });
//       })
//       .done();
//   },
//
//   render: function(){
//     var info = this.state.info;
//
//     return (
//       <View style={styles.bottomBump}>
//         <Text>{ info && this.props.user.userId }</Text>
//         <Text>{ info && info.name }</Text>
//         <Text>{ info && info.email }</Text>
//       </View>
//     );
//   }
// });
//
// var styles = StyleSheet.create({
//   loginContainer: {
//     marginTop: 150,
//
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   bottomBump: {
//     marginBottom: 15,
//   },
// });
//
// module.exports = Launch;




'use strict';

import React from 'react';
import {View, Text, StyleSheet} from "react-native";

// var React = require('react-native');
// var {View, Text, StyleSheet} = React;
var Icon = require('react-native-vector-icons/FontAwesome');

class Launch extends React.Component {
  static contextTypes = {
    isLoggedIn: React.PropTypes.bool,
    login: React.PropTypes.func,
    logout: React.PropTypes.func,
    props: React.PropTypes.object
	};

  constructor(props) {
      super(props);
    }

    render(){
        return (
          <View style={[]}>
            <Icon.Button onPress={() => {
                if(!this.context.isLoggedIn){
                  this.context.login()
                }else{
                  this.context.logout()
                }

              }}
              color={"#000000"}
              backgroundColor={"#ffffff"} name={"facebook"}  size={20} borderRadius={100} >

            </Icon.Button>
          </View>
      )
    }
}
module.exports = Launch;
