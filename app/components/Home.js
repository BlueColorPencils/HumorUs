
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

import TimerMixin from 'react-timer-mixin';

import ScrollableTabView, { DefaultTabBar, } from 'react-native-scrollable-tab-view';
import NavigatorTabBar from './NavigatorTabBar';
import MatchesPage from './Matches';
import ProfilePage from './Profile';
import DisplayUserPage from './DisplayUser';
import Icon from 'react-native-vector-icons/Ionicons';
import SwipeCards from 'react-native-swipe-cards';
import {FBLogin, FBLoginManager} from 'react-native-facebook-login';

import Launch from './Launch';


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

     getInitialState() {
        return {myKey:'Loading',
        cards: {},
        imgurID: '',
        outOfCards: false,
        fbID: ''};
    },

    componentWillMount() {
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
            photo: user_info.photo,
            gender: user_info.gender,
            preferredAgeMax: null,
            preferredLocationMI: null,
            long: null,
            dateLastLogin: null,
            name: user_info.name,
            fbID: user_info.id,
            preferredAgeMin: null,
            lat: null,
            age: user_info.age
          })
        }).done();
        this.setState({"fbID": user_info.id})
      }).done();

       this.setTimeout(() => {
        this.getPictureData() },400
      );

    },

    getPictureData() {
      // let x = this.state.fbID
      var url = "http://192.168.43.88:3000/api/user/"+this.state.fbID.toString()+"/unseen"
      fetch(url, {method: "GET"})
      .then((response) => response.json())
      .then((responseData) => {
          this.setState({"cards": [{name: responseData.title, image: responseData.link}]});
          this.setState({"imgurID": responseData.imgurID})
      })
      .done();
    },

    likePicture() {
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

    dislikePicture() {
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

    newMatches() {
      // let x = this.state.fbID
      var url = "http://192.168.43.88:3000/api/user/"+this.state.fbID.toString()+"/newmatches"
      fetch(url, {method: "GET"})
      .then((response) => response.json())
      .then((responseData) => {
          // this.setState({"cards": [{name: responseData.title, image: responseData.link}]});
          // this.setState({"imgurID": responseData.imgurID})
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
      this.newMatches()
  },

  render() {

    return <ScrollableTabView renderTabBar={()=><NavigatorTabBar backgroundColor='rgba(200, 200, 200, 0.43)' />}
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
        <View style={styles.textcontainer}>
        <Text style={styles.text}>Your Matches!</Text>
        </View>
          <MatchesPage />
      </ScrollView>


      <ScrollView tabLabel="account-box">
        <View style={styles.container}>
        <DisplayUserPage />
          <TouchableHighlight style={styles.btnClickContain} underlayColor='transparent' onPress={ () => this.props.navigator.push({  name: 'Profile'})}>
          <View style={styles.button}>
          <Icon
            name='md-settings'
            size={20}
            style={styles.btnIcon}/>
          <Text style={styles.btnText}>Settings</Text>
          </View>
          </TouchableHighlight>
          </View>
      </ScrollView>




    </ScrollableTabView>;
  }
});


const styles = StyleSheet.create({
  btnClickContain: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
    alignSelf: 'stretch',
    paddingTop: 18,
  },
  btnIcon: {
    // flex: 1,
    color: 'rgb(50, 50, 50)',
    paddingTop: 20,
    paddingRight: 5
  },
  btnText: {
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
  container: {
    flex: 1,
    paddingTop: 80,
    paddingBottom: 120,
    // fontSize: 22,
    // height: windowSize.height-100,
    alignItems: 'center',
    // textAlign: 'center',
    backgroundColor: 'rgba(200, 200, 200, 0.43)',

  },
  textcontainer: {
    flex: 1,
    paddingTop: 80,
    paddingBottom: 20,
    // fontSize: 22,
    // height: windowSize.height-100,
    alignItems: 'center',
    // textAlign: 'center',
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
    fontSize: 18,
    fontFamily: 'sans-serif-condensed',
    fontWeight: '400',
    color: 'rgb(50, 50, 50)',
    paddingTop: 0,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    // textAlign: 'center',
  },
  noMoreCards: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    flex: 1,
    // flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // alignSelf: 'stretch',
  }
});
