
'use strict';

import React from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  TouchableHighlight,
  Alert,
  View,
  Navigator,
  Image,
  AsyncStorage,
} from 'react-native';

import Button from 'react-native-button';

import {FBLogin, FBLoginManager} from 'react-native-facebook-login';
import TimerMixin from 'react-timer-mixin';

import ScrollableTabView, { DefaultTabBar, } from 'react-native-scrollable-tab-view';
// import NavigatorTabBar from './NavigatorTabBar';
// import MatchesPage from './Matches';
import Icon from 'react-native-vector-icons/Ionicons';
import SwipeCards from 'react-native-swipe-cards';

import { Form, InputField, LinkField, Separator } from 'react-native-form-generator';

var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
//
// let Card = React.createClass({
//   render() {
//     const IMAGE_URL = this.props.image
//     return (
//       <View style={styles.card}>
//         <Text style={styles.text}>{this.props.name}</Text>
//         <Image style={styles.thumbnail} source={{uri:IMAGE_URL}} />
//       </View>
//     )
//   }
// })


var ProfilePage = React.createClass({
    mixins: [TimerMixin],

     getInitialState() {
      return {
        fbID: '',
        birthday: '',
        education: '',
        description: '',
        preferredAgeMax: '',
        photo: '',
        preferredLocationMI: '',
        name: '',
        preferredAgeMin: '',
        lat: '',
        long: '',
        gender: '',
        age: ''
      };
    },

    componentWillMount() {

      AsyncStorage.getItem("user").then((value) => {
        let user_info = JSON.parse(value)
        // Alert.alert(JSON.parse(value).id)
        this.setState({"fbID": user_info.id})
        let url = "http://192.168.43.88:3000/api/user/"+user_info.id
        fetch(url, {method: "GET"})
          .then((response) => response.json())
          .then((responseData) => {
            // Alert.alert(responseData.gender)
            this.setState({
              birthday: responseData.birthday,
              education: responseData.education,
              gender: responseData.gender,
              description: responseData.description,
              preferredAgeMax: responseData.preferredAgeMax,
              photo: responseData.photo,
              preferredLocationMI: responseData.preferredLocationMI,
              name: responseData.name,
              preferredAgeMin: responseData.preferredAgeMin,
              lat: responseData.lat,
              long: responseData.long,
              age: responseData.age
            })
          }).done();
        // Alert.alert(this.state.fbID)
        }).done();

      //  this.setTimeout(() => {
      //   this.setUserData() },400
      // );
    },
     _handleFormChange(formData) {
        this.state.birthday = formData.birthday;
        this.state.gender = formData.gender;
        this.state.description = formData.description;
    },

    _handleSubmit() {
        this.props.handleSubmit(this._input);
    },
        _openTermsAndConditions() {},


    // getPictureData: function() {
    //   // let x = this.state.fbID
    //   var url = "http://192.168.43.88:3000/api/user/"+this.state.fbID.toString()+"/unseen"
    //   fetch(url, {method: "GET"})
    //   .then((response) => response.json())
    //   .then((responseData) => {
    //       this.setState({"cards": [{name: responseData.title, image: responseData.link}]});
    //       this.setState({"imgurID": responseData.imgurID})
    //   })
    //   .done();
    //
    // },

  render() {
    return(
      <ScrollView>
      <View style={styles.profilecontainer}>
          <Image
            source={{uri: this.state.photo}}
            style={styles.profilepicture}
          />

          <Text>{this.state.name}</Text>

          <View style={styles.formcontainer}>
            <Form ref='logInForm' label="Information" onChange={this._handleFormChange.bind(this)}>
              <Separator label='Birthday'/>
              <InputField ref='birthday' placeholder='hi'
               value='' autoCapitalize='none' autoCorrect={false}/>

              <Separator label='Gender'/>
              <InputField ref='gender' placeholder={this.state.gender} value='' autoCapitalize='none' autoCorrect={false}  keyboardType='email-address'/>

              <Separator label='About Me'/>
              <InputField ref='description' placeholder={this.state.description} value='' secureTextEntry={true}/>
            </Form>


            <FBLogin
              onLogout={() => {
                this.props.navigator.push({
                    name: 'FBLogin',
                });
              }}
            />

            <Button containerStyle={styles.buttonContainer} onPress={this._handleSubmit}>
              <Text style={styles.button} allowFontScaling={false}>
                  Save
              </Text>
            </Button>

          </View>
        </View>
      </ScrollView>
    )
  }
});


const styles = StyleSheet.create({
  profilecontainer: {
    // marginTop: 70,
    flex: 1,
    position: 'relative',
    top: 0,
    // height: windowSize.height-190,
    // alignItems: 'center',
    // backgroundColor: 'rgba(200, 200, 200, 0.43)',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  profiletext: {
    // marginTop: 70,
    flex: 1,
    position: 'relative',
    top: 0,
    height: windowSize.height-190,
    // alignItems: 'center',
    // backgroundColor: 'rgba(200, 200, 200, 0.43)',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  textcontainer: {
    // flex: 1,
    paddingTop: 80,
    paddingBottom: 10,
    fontSize: 22,
    fontWeight: '500',
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: 'rgba(200, 200, 200, 0.43)',

  },
    formcontainer: {
      // flex: 1,
      // alignItems: 'left',
      // textAlign: 'left',
      // backgroundColor: 'rgba(200, 200, 200, 0.43)',

    },
  picturecontainer: {
    flex:1,
    marginTop: 10,
    bottom: 0,
    // width: windowSize.width-20,
    // height: windowSize.height-150
  },
  profilepicture: {
    width: 200,
    height: 200,
    borderRadius: 25,
    // resizeMode:'contain',
    // flex: 1,
    // alignItems: 'center',
  },
  text: {
    fontSize: 17,
    fontFamily: 'sans-serif-condensed',
    fontWeight: '400',
    color: 'rgb(50, 50, 50)',
    paddingTop: 0,
    paddingLeft: 10,
    paddingBottom: 10,
    // textAlign: 'center',
  },
   buttonContainer: {
      marginLeft: 16,
      marginRight: 16,
      marginTop: 20,
      marginBottom: 20,
      overflow: 'hidden',
      borderRadius: 5,
      padding: 10,
      backgroundColor: 'lightslategrey'
  },
    button: {
        textAlign: 'center',
        color: '#fff'
    }
});

module.exports = ProfilePage;
