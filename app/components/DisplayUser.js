
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
      photo: '',
      name: ''
    };
  },

  componentWillMount() {
    AsyncStorage.getItem("userinfo").then((value) => {
      let user_info = JSON.parse(value)
      console.log("WTF?", user_info)
      if (this.isMounted()) {
        this.setState({photo: user_info.photo, name: user_info.name})
      }
    }).done();
  },


  render() {
    return(

      <View style={styles.profilecontainer}>
        <Image
          source={{uri:this.state.photo}}
          style={styles.profilepicture}
        />

        </View>
    )
  }
});


const styles = StyleSheet.create({
  profilecontainer: {
    flex: 1,
    // position: 'absolute',
    // top: 39,
    borderWidth: 2,
    borderColor: '#5c5b5b',
    width: windowSize.width-48,
    height: windowSize.height-256,
    borderRadius: 10,

    // height: windowSize.height,
    // alignItems: 'center',
    alignItems: 'center',
  },
  profiletext: {
    flex: 1,
    position: 'relative',
    top: 0,
    height: windowSize.height-190,
  },
  profilepicture: {
    width: windowSize.width-50,
    height: windowSize.height-260,

    borderRadius: 10,
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

});

module.exports = UserPage;
