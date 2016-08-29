
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

import Icon from 'react-native-vector-icons/Ionicons';
import SwipeCards from 'react-native-swipe-cards';

import { Form, InputField, LinkField, Separator } from 'react-native-form-generator';

var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');


var UserPage = React.createClass({
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
      this.setState({"fbID": user_info.id})
      let url = "http://192.168.43.88:3000/api/user/"+user_info.id
      fetch(url, {method: "GET"})
        .then((response) => response.json())
        .then((responseData) => {
          this.setState({
            birthday: responseData.birthday,
            education: responseData.education,
            gender: responseData.gender,
            preferredGender: responseData.preferredGender,
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
      }).done();
  },


  render() {
    return(
      <ScrollView>
      <View style={styles.profilecontainer}>
        <Image
          source={{uri:this.state.photo}}
          style={styles.profilepicture}
        />

        <Text style={styles.rightcontainer}>{this.state.name}</Text>
        </View>

        <View>
          <Separator label='Birthday'/>
           <Text>{this.state.age}</Text>

          <Separator label='Gender'/>
          <Text>{this.state.gender} </Text>

          <Separator label='Preferred Gender'/>
          <Text>{this.state.preferredGender} </Text>

          <Separator label='About Me'/>
          <Text>{this.state.description}</Text>

        </View>
      </ScrollView>
    )
  }
});


const styles = StyleSheet.create({
  profilecontainer: {
    flex: 1,
    flexDirection: 'row',
    position: 'relative',
    top: 0,
    // height: windowSize.height-190,
    // alignItems: 'center',
    backgroundColor: 'rgba(200, 200, 200, 0.43)',
    // alignItems: 'center',
  },
  profiletext: {
    flex: 1,
    position: 'relative',
    top: 0,
    height: windowSize.height-190,
  },
  textcontainer: {
    paddingTop: 80,
    paddingBottom: 10,
    fontSize: 22,
    fontWeight: '500',
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: 'rgba(200, 200, 200, 0.43)',
  },
  picturecontainer: {
    flex:1,
    marginTop: 10,
    bottom: 0,
  },
  profilepicture: {
    width: 150,
    height: 150,
    borderRadius: 25,
  },
    rightcontainer: {
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

module.exports = UserPage;
