'use strict';

import React from 'react';
import {
  AppRegistry,
  Image,
  ListView,
  StyleSheet,
  Text,
  AsyncStorage,
  View,
  Alert
} from 'react-native';

import GridView from 'react-native-grid-view'
import TimerMixin from 'react-timer-mixin';
import Spinner from 'react-native-loading-spinner-overlay';


var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var MOVIES_PER_ROW = 3;

var User = React.createClass({
  render() {
      return (
       <View style={styles.movie} >
          <Image
            source={{uri: this.props.user.photo}}
            style={styles.thumbnail}
          />
          <View >
            <Text
            style={styles.title}
            numberOfLines={3}>{this.props.user.name}, {this.props.user.age}</Text>
            <Text style={styles.year}>{this.props.user.percentage}% match</Text>
          </View>
        </View>
      );
  }
})

var UsersList = React.createClass({
      mixins: [TimerMixin],

  getInitialState() {
    return {
      matches: null,
      fbID: '',
    };
  },

  componentWillMount() {
    AsyncStorage.getItem("userinfo").then((value) => {
      let user_info = JSON.parse(value)
      this.setState({"fbID": user_info.fbID})
    }).done();

     this.setTimeout(() => {
      this.fetchData() },50
    );
  },

  fetchData() {
    var url = "http://humorusneo-dev.us-west-2.elasticbeanstalk.com/api/user/"+this.state.fbID+"/matches"
    fetch(url, {method: "GET"})
    .then((response) => response.json())
    .then((responseData) => {
      if (responseData.error){
        this.setState({matches: false})
      } else {
        this.setState({matches: JSON.parse(JSON.stringify(responseData))});
      }
    })
    .done();
  },

  render() {
    if (this.state.matches && this.state.matches != null && this.state.matches != false) {
      return (
        <GridView
          items={this.state.matches}
          itemsPerRow={MOVIES_PER_ROW}
          renderItem={this.renderItem}
          style={styles.listView}
        />
      )
    } else if (!this.state.matches) {
      return (
        <View style={styles.nomatchesView}>
          <Text style={{fontSize: 60, textAlign: 'center', paddingTop:100, paddingBottom: 20}}>😭</Text>
          <Text style={styles.noMatches}>No matches.</Text>
          <Text style={styles.noMatches}>Keep swiping!</Text></View>
      )
    }
    return (
      <View><Spinner visible={true}/></View>
      )
  },

  renderItem(item) {
      return <User user={item} />
  }
})

var styles = StyleSheet.create({
  movie: {
    height: 150,
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
  },
  noMatches:{
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center',
    paddingTop: 5
  },
  title: {
    paddingTop: 8,
    // fontSize: 14,
    // fontWeight: '500',
    marginBottom: 2,
    width: 110,
    textAlign: 'center',
  },
  year: {
    textAlign: 'center',
    paddingBottom: 2,
  },
  thumbnail: {
    width: 100,
    height: 100,
   borderRadius: 50,
  },
  listView: {
    height: windowSize.height-10,
    backgroundColor: 'rgba(200, 200, 200, 0.43)',
  },
  nomatchesView: {
    height: windowSize.height-150,
    backgroundColor: 'rgba(200, 200, 200, 0.43)',
  }
});

module.exports = UsersList;
