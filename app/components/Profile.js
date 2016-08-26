
'use strict';

import React from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  TouchableHighlight,
  Alert,
  View,
  Image,
  AsyncStorage,
} from 'react-native';

import {FBLogin, FBLoginManager} from 'react-native-facebook-login';
import TimerMixin from 'react-timer-mixin';

// import ScrollableTabView, { DefaultTabBar, } from 'react-native-scrollable-tab-view';
// import NavigatorTabBar from './NavigatorTabBar';
// import MatchesPage from './Matches';
import Icon from 'react-native-vector-icons/Ionicons';
import SwipeCards from 'react-native-swipe-cards';


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

     getInitialState: function() {
      return {
        fbID: '',
        birthday: '',
        education: '',
        description: '',
        preferredAgeMax: '',
        photo: '',
        preferredLocationKM: '',
        name: '',
        preferredAgeMin: '',
        lat: '',
        long: '',
        age: ''
      };
    },

    componentWillMount: function() {

      AsyncStorage.getItem("user").then((value) => {
        let user_info = JSON.parse(value)
        // Alert.alert(JSON.parse(value).id)
        this.setState({"fbID": user_info.id})
        let url = "http://172.24.128.164:3000/api/user/"+user_info.id
        fetch(url, {method: "GET"})
          .then((response) => response.json())
          .then((responseData) => {
            this.setState({
              birthday: responseData.birthday,
              education: responseData.education,
              description: responseData.description,
              preferredAgeMax: responseData.preferredAgeMax,
              photo: responseData.photo,
              preferredLocationKM: responseData.preferredLocationKM,
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

    // getPictureData: function() {
    //   // let x = this.state.fbID
    //   var url = "http://172.24.128.164:3000/api/user/"+this.state.fbID.toString()+"/unseen"
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
      <View style={styles.textcontainer}>
        <Text style={styles.text}>Your Matches!</Text>
      </View>
    )
  }
});


const styles = StyleSheet.create({
  container: {
  },
  icon: {
    width: 300,
    height: 300,
    alignSelf: 'center',
  },
  innercontainer: {
    // marginTop: 70,
    flex: 1,
    height: windowSize.height,
    alignItems: 'center',
    backgroundColor: 'rgba(200, 200, 200, 0.43)',
    // alignItems: 'center',
    justifyContent: 'center',
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
  picturecontainer: {
    flex:1,
    marginTop: 10,
    bottom: 0,
    // width: windowSize.width-20,
    // height: windowSize.height-150
  },
  card: {
    marginTop: 80,
    marginLeft: 10,
    marginRight: 10,
    paddingTop: 10,
    marginBottom: 10,
    alignItems: 'center',
    borderRadius: 7,
    overflow: 'hidden',
    borderColor: 'rgb(144, 144, 144)',
    backgroundColor: 'rgb(255, 255, 255)',
    borderWidth: 2,
    elevation: 1,
    width: windowSize.width-20,
    height: windowSize.height-115
  },
  thumbnail: {
    flex: 2,
    flexDirection: 'row',
    marginBottom: 10,
    width: windowSize.width-40,
    height: windowSize.height-190,
    resizeMode:'contain'
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
  noMoreCards: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

module.exports = ProfilePage;
