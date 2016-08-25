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

import ScrollableTabView, { DefaultTabBar, } from 'react-native-scrollable-tab-view';
import FacebookTabBar from './NavigatorTabBar';
import Icon from 'react-native-vector-icons/Ionicons';
import SwipeCards from 'react-native-swipe-cards';


var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');

let Card = React.createClass({
  render() {
    return (
      <View style={styles.card}>
        <Text style={styles.text}>{this.props.name}</Text>
        <Image style={styles.thumbnail} source={{uri: this.props.image}} />
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

     getInitialState: function() {
        return {myKey:'Loading',
        cards: {},
        imgurID: '',
        outOfCards: false};
    },

    componentWillMount: function() {
      this.getPictureData()
    },

    getPictureData: function() {
      fetch("http://192.168.43.88:3000/api/user/11111111/unseen", {method: "GET"})
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
          fbID: "11111111",
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
          fbID: "11111111",
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

    const IMAGE_PREFETCH_URL = this.state.image

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
    // marginTop: 30,
  },
  icon: {
    width: 300,
    height: 300,
    alignSelf: 'center',
  },
  innercontainer: {
    marginTop: 70,
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
    flex: 1,
    // marginLeft: 50,
    width: windowSize.width-24,
    height: 100,
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



// import React from 'react';
// import {
//   View,
//   Text,
//   Component,
//   StyleSheet,
//   TouchableHighlight,
//   ScrollView,
//   Image,
//   Dimensions,
//   ListView
// } from "react-native";
//
// let windowWidth = Dimensions.get("window").width
// import API from "./api"
// // let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
//
//
// class Home extends React.Component {
//   // constructor (props) {
//   //   super(props)
//   //   this.state = {
//   //     dataSource: ds,
//   //     loading: true,
//   //     images: []
//   //   }
//   // }
//   // componentDidMount () {
//   //   API.get()
//   //     .then((response) => {
//   //       console.log("HELLO", response)
//   //       this.setState({
//   //         dataSource: ds.cloneWithRows(response.data.items),
//   //         loading: false
//   //       })
//   //     }, (error) => {
//   //     console.log('error: ', error)
//   //   })
//   // }
//   // renderRow (rowData) {
//   //   if (rowData.link.match(/\.(jpg|png|gif)/g)) {
//   //     return (
//   //       <View>
//   //         <Image
//   //           source={{ uri: rowData.link }}
//   //           style={{width: windowWidth, height: windowWidth}} />
//   //       </View>)
//   //   } else {
//   //     return null
//   //   }
//   // }
//   // render () {
//   //   let { loading, images } = this.state
//   //   if (loading) {
//   //     images = (
//   //       <ListView
//   //                  dataSource={this.state.dataSource}
//   //                  renderRow={this.renderRow.bind(this)} />
//   //
//   //       // <View style={style.loadingContainer}>
//   //       //   <Text style={style.loading}>Loading images…</Text>
//   //       // </View>
//   //     )
//   //   }
//   //   if (!loading) {
//   //     images = <ListView
//   //                dataSource={this.state.dataSource}
//   //                renderRow={this.renderRow.bind(this)} />
//   //   }
//   //   return (
//   //     <View style={{flex: 1}}>
//   //       <TouchableHighlight
//   //         underlayColor="transparent"
//   //         onPress={this.props.closeModal}
//   //         style={style.closeButton}>
//   //         <Text style={style.closeButtonText}>MEOW</Text>
//   //       </TouchableHighlight>
//   //       <ScrollView style={{flex: 1}}>
//   //         {images}
//   //       </ScrollView>
//   //     </View>
//   //   )
//   // }
// }
//
// var style = StyleSheet.create({
//     container: {
//       // marginTop: 150,
//       flex: 1,
//       alignItems: 'center',
//       justifyContent: 'center',
//       backgroundColor: "#F5FCFF"
//     },
//     innercontainer: {
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//         backgroundColor: "#F5FCFF"
//     },
//     welcome: {
//         fontSize: 20,
//         textAlign: "center",
//         margin: 10
//     },
//     instructions: {
//         textAlign: "center",
//         color: "#333333",
//         marginBottom: 5,
//     },
// });
