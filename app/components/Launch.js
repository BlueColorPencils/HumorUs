'use strict';
import React from 'react';
import {View, Alert, Text, StyleSheet, TextInput, Image, AsyncStorage, Icon} from "react-native";
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
// var FBLoginMock = require('./FBLoginMock');
import {FBLogin, FBLoginManager} from 'react-native-facebook-login';
import Home from './Home';
import Button from "react-native-button";


var TabView = require('./TabView');
var TabIcon = require('./TabIcon');

var FB_PHOTO_WIDTH = 200;
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');


const reducerCreate = params=>{
    const defaultReducer = Reducer(params);
    return (state, action)=>{
        console.log("ACTION:", action);
        return defaultReducer(state, action);
    }
};

const scenes = Actions.create(
  <Scene key="root">
    <Scene key="home" component={Home} hideNavBar={true}/>
  </Scene>
);

var Launch = React.createClass({
 getInitialState(){
    return {
      user: null,
    };
  },

  render() {
    var _this = this;
    var user = this.state.user;

    if(this.state.user) {
        var info = this.state.info;
          return <Router scenes={scenes}/>

    } else {
      return (
      <View style={styles.container}>
        <Image style={styles.bg} source={{uri: 'https://scontent-sea1-1.xx.fbcdn.net/t31.0-8/13323231_10207167534975001_2138488519942298615_o.jpg'}} />

        <View style={styles.message}>
          <Text style={styles.messageFont}>Find your lol mate.</Text>
        </View>

        <View style={styles.header}>
            <Image style={styles.logo} source={{uri: 'http://i.imgur.com/da4G0Io.png'}} />
        </View>

        <View style={styles.terms}>
          <Text style={styles.greyFont}>By continuing, you agree to our <Text style={styles.whiteFont}>Terms of Service</Text> and <Text style={styles.whiteFont}>Privacy policy</Text></Text>
        </View>


        <FBLogin style={styles.loginbutton}
          permissions={["email","public_profile"]}
          onLogin={function(data){
            console.log("Logged in!");
            console.log(data);
            _this.setState({ user : data.credentials });
          }}
          onLogout={function(){
            console.log("Logged out.");
            _this.setState({ user : null });
          }}
          onLoginFound={function(data){

            var api = `https://graph.facebook.com/v2.3/${data.credentials.userId}/picture?width=${FB_PHOTO_WIDTH}&redirect=false&access_token=${data.credentials.token}`;

            fetch(api)
              .then((response) => response.json())
              .then((responseData) => {
                AsyncStorage.setItem("picture", responseData.data.url)
              })
              .done();

            var api = `https://graph.facebook.com/v2.3/${data.credentials.userId}?fields=id,name,age_range,gender&access_token=${data.credentials.token}`;

            fetch(api)
              .then((response) => response.json())
              .then((responseData) => {
                AsyncStorage.getItem("picture").then((value) => {
                  let obj = {}
                  obj["pic"] = value;
                  obj["id"] = responseData.id;
                  obj["name"] = responseData.name;
                  obj["age"] = responseData.age_range.min;
                  obj["gender"] = responseData.gender;

                  AsyncStorage.setItem("user", JSON.stringify(obj))

                }).done();
              })
              .done();

            console.log("Existing login found.");
            console.log(data.credentials.token);

            _this.setState({ user : data.credentials.userId });
          }}
          onLoginNotFound={function(){
            console.log("No user logged in.");
            _this.setState({ user : null });
          }}
          onError={function(data){
            console.log("ERROR");
            console.log(data);
          }}
          onCancel={function(){
            console.log("User cancelled.");
          }}
          onPermissionsMissing={function(data){
            console.log("Check permissions!");
            console.log(data);
          }}
        />
      </View>
    )
    }
  }
});



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
//   render(){
//     if(this.state.photo == null) return this.renderLoading();
//
//     var photo = this.state.photo;
//
//     return (
//       <View style={styles.bottomBump}/>
//     );
//   },
//   renderLoading: function(){
//     return (
//       <View>
//         <Text>Loading...</Text>
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
//
//       fetch("http://172.24.128.164:3000/api/user/", {
//         method: "POST",
//         headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           birthday: this.state.info.birthday,
//           dateJoined: null,
//           description: null,
//           photo: this.state.info.photo,
//           gender: this.state.info.gender,
//           preferredAgeMax: null,
//           preferredLocationKM: null,
//           long: null,
//           dateLastLogin: null,
//           name: this.state.info.name,
//           fbID: this.state.info.id,
//           preferredAgeMin: null,
//           lat: null,
//           age: this.state.info.age
//         })
//       })
//       .done();
//     },
//
//   render(){
//   }
// });
//
//

var styles = StyleSheet.create({
    loginContainer: {
      marginTop: 150,
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    loginbutton: {
      flex:1,
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'center',
      backgroundColor: '#FF3366',
      height: 60

    },
    bottomBump: {
      marginBottom: 50,
    },
    container: {
      flexDirection: 'column',
      flex: 1,
      backgroundColor: 'transparent'
    },
    message: {
      justifyContent: 'center',
      alignItems: 'center',
      top: 30
    },
    messageFont: {
      color: '#FFF',
      fontSize: 20
    },
    bg: {
        position: 'absolute',
        bottom: -4,
        width: windowSize.width,
        height: windowSize.height
    },
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: .5,
        backgroundColor: 'transparent'
    },
    logo: {
        width: 150,
        height: 150,
        bottom: 66
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
      top: 35,
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
      color: '#FFF',
      fontSize: 11,
      fontWeight: '400'
    },
    whiteFont: {
      color: '#FFF',
      fontWeight: '600'
    }
})

module.exports = Launch;
