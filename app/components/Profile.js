
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
var {GiftedForm, GiftedFormManager} = require('react-native-gifted-form');

var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');

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
        age: '',
        formData: {}
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
        this.props.navigator.pop()
    },


  render() {
    return(
      <ScrollView>
          <View style={styles.topnavbar}>
            <TouchableHighlight
              onPress={this._handleSubmit} style={styles.btnClickContain}
              underlayColor='transparent'>
              <View style={styles.btnContainer}>
                <Icon
                  name='ios-arrow-back'
                  size={30}
                  // color='#042'
                  style={styles.btnIcon}/>
                <Text style={styles.btnText}>Profile</Text>
              </View>
            </TouchableHighlight>
          </View>


          <View style={styles.profilecontainer}>
          <Image
            source={{uri:this.state.photo}}
            style={styles.profilepicture}
          />

          <Text>{this.state.name}</Text>
          </View>

          <View style={styles.formcontainer}>
            
            <FBLogin
              onLogout={() => {
                this.props.navigator.push({
                    name: 'FBLogin',
                });
              }}
            />



        </View>
      </ScrollView>
    )
  }
});


const styles = StyleSheet.create({
  profilecontainer: {
    // marginTop: 70,
    flex: 1,
    flexDirection: 'row',
    position: 'relative',
    top: 0,
    // height: windowSize.height-190,
    // alignItems: 'center',
    backgroundColor: 'rgba(200, 200, 200, 0.43)',
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
    topnavbar: {
      height: 65,
      flexDirection: 'row',
      // paddingTop: 15,
      // paddingLeft: 10,
      borderWidth: 1,
      borderTopWidth: 0,
      borderLeftWidth: 0,
      borderRightWidth: 0,
      backgroundColor: 'white',
      borderBottomColor: 'rgba(0,0,0,0.4)'
    },
    topnavtext:{
      fontSize: 20,
      // paddingBottom: 5,
      // marginLeft: 20
    },
  picturecontainer: {
    flex:1,
    marginTop: 10,
    bottom: 0,
    // width: windowSize.width-20,
    // height: windowSize.height-150
  },
  profilepicture: {
    marginTop: 50,
    width: 150,
    height: 150,
    borderRadius: 25,
    // resizeMode:'contain',
    // flex: 1,
    // alignItems: 'center',
  },

   btnClickContain: {
    width: 140,
    justifyContent: 'center',
    alignItems: 'stretch',
    alignSelf: 'stretch',
    // backgroundColor: '#853d3d',

    paddingTop: 18,
    // marginBottom: 5,
  },
  btnContainer: {
    flex: 1,
    // height: 60,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
    alignSelf: 'stretch',
    // borderRadius: 10,
  },
  btnIcon: {
    height: 30,
    width: 30,
    // paddingBottom: 5,
    // marginBottom: 5

  },
  btnText: {
    fontSize: 20,
    color: 'rgb(255, 17, 131)',
    // paddingLeft: 5,
    // marginTop: 2,
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
  //  buttonContainer: {
  //     // marginLeft: 10,
  //     marginRight: 16,
  //     marginTop: 20,
  //     marginBottom: 20,
  //     overflow: 'hidden',
  //     borderRadius: 5,
  //     padding: 10,
  //     backgroundColor: 'lightslategrey'
  // },
  //   button: {
  //       textAlign: 'center',
  //       color: '#fff'
  //   }
});

module.exports = ProfilePage;
