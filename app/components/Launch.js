'use strict';
import React from 'react';
import {View, Alert, Text, StyleSheet, TextInput, Image, Navigator, AsyncStorage, Icon} from "react-native";

import {FBLogin, FBLoginManager} from 'react-native-facebook-login';
// import MainApp from './Home';
import Button from "react-native-button";
import Spinner from 'react-native-loading-spinner-overlay';

//
// var TabView = require('./TabView');
// var TabIcon = require('./TabIcon');

var FB_PHOTO_WIDTH = 900;
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');

var Launch = React.createClass({
 getInitialState(){
    return {
      user: null,
      initialPosition: 'unknown',
      lastPosition: 'unknown',
      lat: '',
      long:'',
      fbID: '',
      loggedin: ''
    };
  },

  componentWillMount() {
     navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log("GEO?!?!", position)
        this.setState({lat: JSON.stringify(position.coords.latitude), long: JSON.stringify(position.coords.longitude)})
        fetch("http://humorusneo-dev.us-west-2.elasticbeanstalk.com/api/user/updateloc", {
          method: "POST",
          headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            fbID: this.state.fbID,
            lat: position.coords.latitude,
            long: position.coords.longitude
          })
        })
        .done();
      },
      (error) => error.message,
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
    // this.geoLocation()
  },

  render() {

    var _this = this;
    var user = this.state.user;

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

        onLogin={(data) => {

          AsyncStorage.setItem("fbID", data.credentials.userId)
          _this.setState({fbID: data.credentials.userId})
          console.log("fbID datacredentials?", data.credentials.userId)

          var api = `https://graph.facebook.com/v2.7/${data.credentials.userId}/picture?width=${FB_PHOTO_WIDTH}&redirect=false&access_token=${data.credentials.token}`;

          fetch(api)
            .then((response) => response.json())
            .then((responseData) => {
              console.log("picturedata", responseData.data.url)
              AsyncStorage.setItem("picture", responseData.data.url)
            })
          .done();

          var api = `https://graph.facebook.com/v2.7/${data.credentials.userId}?fields=id,name,age_range,gender&access_token=${data.credentials.token}`;

          fetch(api)
            .then((response) => response.json())
            .then((responseData) => {
              AsyncStorage.getItem("picture").then((value) => {
                console.log("getitem picutre meow", value)
                AsyncStorage.setItem("signin", 'true')

                fetch("http://humorusneo-dev.us-west-2.elasticbeanstalk.com/api/user/", {
                  method: "POST",
                  headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    birthday: null,
                    description: null,
                    photo: value,
                    gender: [responseData.gender],
                    preferredAgeMax: null,
                    long: null,
                    name: responseData.name,
                    fbID: responseData.id,
                    preferredAgeMin: null,
                    lat: null,
                    age: responseData.age_range.min
                  })
                }).done()
              }).done();

                var url = "http://humorusneo-dev.us-west-2.elasticbeanstalk.com/api/user/"+data.credentials.userId
                fetch(url, {method: "GET"})
                .then((response) => response.json())
                .then((responseData) => {
                    // this.setState({"cards": [{name: responseData.title, image: responseData.link}]});
                  // Alert.alert(JSON.stringify(responseData))
                  console.log("find user info", responseData)
                  AsyncStorage.setItem("userinfo", JSON.stringify(responseData))
                }).done();
                AsyncStorage.setItem("loggedin", 'true')
                console.log("after finding/creating user")
            }).done();


          console.log("Existing login found.");
          console.log(data.credentials.token);

          this.props.navigator.push({
            name: 'Main',
          });


          console.log("!!!!!!!!!!! Logged in!", data);
          _this.setState({ user : data.credentials });
        }}
          // onLogout={() => {
          //   _this.setState({ user : null });
          //   AsyncStorage.setItem("loggedin", 'false')
          //   AsyncStorage.setItem("user", '')
          // }}

        onLoginFound={(data) => {
          _this.setState({ user : data.credentials.userId });
          console.log("login found")

          AsyncStorage.setItem("fbID", data.credentials.userId)
          _this.setState({fbID: data.credentials.userId})

          var api = `https://graph.facebook.com/v2.7/${data.credentials.userId}/picture?width=${FB_PHOTO_WIDTH}&redirect=false&access_token=${data.credentials.token}`;

          fetch(api)
            .then((response) => response.json())
            .then((responseData) => {
              AsyncStorage.setItem("picture", responseData.data.url)
            })
          .done();

          // var api = `https://graph.facebook.com/v2.7/${data.credentials.userId}?fields=id,name,age_range,gender&access_token=${data.credentials.token}`;
          //
          // fetch(api)
          //   .then((response) => response.json())
          //   .then((responseData) => {
              // AsyncStorage.getItem("picture").then((value) => {

                AsyncStorage.setItem("signin", 'true')

              //   fetch("http://humorusneo-dev.us-west-2.elasticbeanstalk.com/api/user/", {
              //     method: "POST",
              //     headers: {
              //     'Accept': 'application/json',
              //     'Content-Type': 'application/json'
              //     },
              //     body: JSON.stringify({
              //       birthday: null,
              //       description: null,
              //       photo: value,
              //       gender: [responseData.gender],
              //       preferredAgeMax: null,
              //       long: null,
              //       name: responseData.name,
              //       fbID: responseData.id,
              //       preferredAgeMin: null,
              //       lat: null,
              //       age: responseData.age_range.min
              //     })
              //   }).done()
              // }).done();

                var url = "http://humorusneo-dev.us-west-2.elasticbeanstalk.com/api/user/"+data.credentials.userId
                fetch(url, {method: "GET"})
                .then((response) => response.json())
                .then((responseData) => {
                    // this.setState({"cards": [{name: responseData.title, image: responseData.link}]});
                  // Alert.alert(JSON.stringify(responseData))
                  console.log("find user info", responseData)
                  AsyncStorage.setItem("userinfo", JSON.stringify(responseData))
                }).done();
                AsyncStorage.setItem("loggedin", 'true')
                console.log("after finding/creating user")
            // }).done();


          console.log("Existing login found.");
          console.log(data.credentials.token);

          this.props.navigator.push({
            name: 'Main',
          });




        }}
        onLoginNotFound={()=>{
          console.log("No user logged in.");
          // AsyncStorage.setItem("loggedin", 'false')
          _this.setState({ user : null });
        }}
        onError={(data)=>{
          console.log("ERROR");
          console.log(data);
        }}
        onCancel={()=>{
          console.log("User cancelled.");
          // AsyncStorage.setItem("signin", false)
        }}
        onPermissionsMissing={(data)=>{
          console.log("Check permissions!");
          console.log(data);
        }}
        />
    </View>
    )
  }
});


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
        height: 22
    },
    inputUsername: {
      marginLeft: 15,
      width: 20,
      height: 20
    },
    inputContainer: {
        padding: 12,
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
