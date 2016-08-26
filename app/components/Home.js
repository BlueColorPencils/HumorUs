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

import ScrollableTabView, { DefaultTabBar, } from 'react-native-scrollable-tab-view';
import FacebookTabBar from './NavigatorTabBar';
import Icon from 'react-native-vector-icons/Ionicons';
import SwipeCards from 'react-native-swipe-cards';


var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');

let Card = React.createClass({
  render() {
    const IMAGE_URL = this.props.image
    return (
      <View style={styles.card}>
        <Text style={styles.text}>{this.props.name}</Text>
        <Image style={styles.thumbnail} source={{uri:IMAGE_URL}} />
      </View>
    )
  }
})

let NoMoreCards = React.createClass({
  render() {
    return (
      <View style={styles.noMoreCards}>
        <Text>No more cards</Text>
      </View>
    )
  }
})


export default React.createClass({
    mixins: [TimerMixin],

     getInitialState: function() {
        return {myKey:'Loading',
        cards: {},
        imgurID: '',
        outOfCards: false,
        fbID: ''};
    },

    componentWillMount: function() {

      AsyncStorage.getItem("user").then((value) => {
        let user_info = JSON.parse(value)
        // Alert.alert(JSON.parse(value).id)

        fetch("http://192.168.43.88:3000/api/user/", {
          method: "POST",
          headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            birthday: null,
            dateJoined: null,
            description: null,
            photo: user_info.pic,
            gender: user_info.gender,
            preferredAgeMax: null,
            preferredLocationKM: null,
            long: null,
            dateLastLogin: null,
            name: user_info.name,
            fbID: user_info.id,
            preferredAgeMin: null,
            lat: null,
            age: user_info.age
          })
        }).done();
        // Alert.alert(this.state.fbID)
        this.setState({"fbID": user_info.id})
      }).done();

       this.setTimeout(() => {
        this.getPictureData() },400
      );


      // AsyncStorage.getItem("fbID").then((value) => {
      //   this.setState({"fbIDs": value})
      // }).done();


    },

    getPictureData: function() {
      let x = this.state.fbID
      var url = "http://192.168.43.88:3000/api/user/"+this.state.fbID.toString()+"/unseen"
      fetch(url, {method: "GET"})
      .then((response) => response.json())
      .then((responseData) => {
          this.setState({"cards": [{name: responseData.title, image: responseData.link}]});
          this.setState({"imgurID": responseData.imgurID})
      })
      .done();

    },

    likePicture: function() {
      fetch("http://192.168.43.88:3000/api/picture/newpictures", {
        method: "POST",
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fbID: this.state.fbID,
          imgurID: this.state.imgurID,
          relationship: "LIKES",
        })
      })
      .done();
    },
    dislikePicture: function() {
      fetch("http://192.168.43.88:3000/api/picture/newpictures", {
        method: "POST",
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fbID: this.state.fbID,
          imgurID: this.state.imgurID,
          relationship: "DISLIKES",
        })
      })
      .done();
    },

    handleYup (card) {
      this.likePicture()
      this.getPictureData()
    },
    handleNope (card) {
      this.dislikePicture()
      this.getPictureData()
    },
    cardRemoved (index) {
  },





  render() {

    return <ScrollableTabView
      style={styles.container}
      renderTabBar={()=><FacebookTabBar backgroundColor='rgba(200, 200, 200, 0.43)' />}
      tabBarPosition='overlayTop'
    >

      <ScrollView tabLabel="photo">
        <SwipeCards
          cards={this.state.cards}
          loop={false}

          renderCard={(cardData) => <Card {...cardData} />}
          renderNoMoreCards={() => <NoMoreCards />}
          showYup={true}
          showNope={true}

          getPictureData={this.getPictureData}
          handleYup={this.handleYup}
          handleNope={this.handleNope}
          cardRemoved={this.cardRemoved}
        />
      </ScrollView>

      <ScrollView tabLabel="forum">
        <View style={styles.innercontainer}>
        <Text>HELLOOO</Text>
          <Icon name='logo-android' color='#A4C639' size={300} style={styles.icon} />
          <Icon name='logo-android' color='black' size={300} style={styles.icon} />

        </View>
      </ScrollView>


      <ScrollView tabLabel="account-box">
      <View style={styles.innercontainer}>
        <FBLogin />
        </View>
      </ScrollView>


    </ScrollableTabView>;
  },
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
    marginTop: 10,
    marginLeft: 2,
    marginRight: 2,
    fontSize: 15,
    fontWeight: '500',
    alignItems: 'center',
    textAlign: 'center',
  },
  picturecontainer: {
    flex:1,
    marginTop: 10,
    // position: 'absolute',
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
