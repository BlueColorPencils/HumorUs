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


import SwipeCards from 'react-native-swipe-cards';

let Card = React.createClass({
  render() {
    return (
      <View style={styles.card}>
        <Image style={styles.thumbnail} source={{uri: this.props.image}} />
        <Text style={styles.text}>This is card {this.props.name}</Text>
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

const Cards = [
  {name: this.state.title, image: this.state.image}
]

export default React.createClass({
  getInitialState() {
    return {
      cards: Cards,
      outOfCards: false
    }
  },
  handleYup (card) {
    console.log("yup")
  },
  handleNope (card) {
    console.log("nope")
  },
  cardRemoved (index) {
    console.log(`The index is ${index}`);

    let CARD_REFRESH_LIMIT = 3

    if (this.state.cards.length - index <= CARD_REFRESH_LIMIT + 1) {

      if (!this.state.outOfCards) {
        // console.log(`Adding ${Cards2.length} more cards`)

        this.setState({
          cards: this.state.cards.concat(Cards2),
          outOfCards: true
        })
      }

    }

  },
  render() {
    return (
      <SwipeCards
        cards={this.state.cards}
        loop={false}

        renderCard={(cardData) => <Card {...cardData} />}
        renderNoMoreCards={() => <NoMoreCards />}
        showYup={true}
        showNope={true}

        handleYup={this.handleYup}
        handleNope={this.handleNope}
        cardRemoved={this.cardRemoved}
      />
    )
  }
})

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    borderRadius: 5,
    overflow: 'hidden',
    borderColor: 'grey',
    backgroundColor: 'white',
    borderWidth: 1,
    elevation: 1,
  },
  thumbnail: {
    flex: 1,
    width: 300,
    height: 300,
  },
  text: {
    fontSize: 20,
    paddingTop: 10,
    paddingBottom: 10
  },
  noMoreCards: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})



// import React from 'react';
// import {
//   StyleSheet,
//   ScrollView,
//   Text,
//   TouchableHighlight,
//   Alert,
//   View,
//   Image,
//   AsyncStorage,
// } from 'react-native';
//
// import {FBLogin, FBLoginManager} from 'react-native-facebook-login';
//
// import ScrollableTabView, { DefaultTabBar, } from 'react-native-scrollable-tab-view';
// import FacebookTabBar from './FacebookTabBar';
// import Icon from 'react-native-vector-icons/Ionicons';
//
// var Dimensions = require('Dimensions');
// var windowSize = Dimensions.get('window');
//
// // Using tabBarPosition='overlayTop' or 'overlayBottom' lets the content show through a
// // semitransparent tab bar. Note that if you build a custom tab bar component, its outer container
// // must consume a 'style' prop (e.g. <View style={this.props.style}) to support this feature.
// export default React.createClass({
//
//      getInitialState: function() {
//         return {myKey:'Loading'};
//     },
//
//     componentWillMount: function() {
//       this.getPictureData()
//     },
//
//     getPictureData: function() {
//       fetch("http://192.168.43.88:3000/api/user/11111111/unseen", {method: "GET"})
//       .then((response) => response.json())
//       .then((responseData) => {
//          AsyncStorage.setItem("myKey", responseData);
//           this.setState({"title": responseData.title});
//           this.setState({"image": responseData.link});
//       })
//       .done();
//     },
//
//     // getMatchData: function() {
//     //   fetch("http://172.24.128.164:3000/api/user/tttttt/unseen", {method: "GET"})
//     //   .then((response) => response.json())
//     //   .then((responseData) => {
//     //      AsyncStorage.setItem("myKey", responseData);
//     //       this.setState({"myKey": responseData.title});
//     //   })
//     //   .done();
//     // },
//     //
//
//   render() {
//
//     const IMAGE_PREFETCH_URL = this.state.image
//
//     return <ScrollableTabView
//       style={styles.container}
//       renderTabBar={()=><FacebookTabBar backgroundColor='rgba(255, 255, 255, 0.7)' />}
//       tabBarPosition='overlayTop'
//     >
//
//       <ScrollView tabLabel="photo">
//         <View style={styles.innercontainer}>
//           <Text style={styles.textcontainer}>{this.state.title}</Text>
//           <Image style={styles.picturecontainer} source={{uri: IMAGE_PREFETCH_URL}} />
//         </View>
//       </ScrollView>
//
//       <ScrollView tabLabel="forum">
//         <View style={styles.innercontainer}>
//         <Text>HELLOOO</Text>
//           <Icon name='logo-android' color='#A4C639' size={300} style={styles.icon} />
//           <Icon name='logo-android' color='black' size={300} style={styles.icon} />
//
//         </View>
//       </ScrollView>
//
//
//       <ScrollView tabLabel="account-box">
//       <View style={styles.innercontainer}>
//         <FBLogin />
//         </View>
//       </ScrollView>
//
//
//     </ScrollableTabView>;
//   },
// });
//
// const styles = StyleSheet.create({
//   container: {
//     // marginTop: 30,
//   },
//   icon: {
//     width: 300,
//     height: 300,
//     alignSelf: 'center',
//   },
//   innercontainer: {
//     marginTop: 70,
//     flex: 1,
//     height: windowSize.height,
//     alignItems: 'center',
//     backgroundColor: 'rgba(200, 200, 200, 0.43)',
//     // alignItems: 'center',
//     justifyContent: 'center',
//   },
//   textcontainer: {
//     // flex: 1,
//     marginTop: 10,
//     marginLeft: 2,
//     marginRight: 2,
//     fontSize: 15,
//     fontWeight: '500',
//     alignItems: 'center',
//     textAlign: 'center',
//
//   },
//     picturecontainer: {
//    flex:1,
//     marginTop: 10,
//     // position: 'absolute',
//     bottom: 0,
//     width: windowSize.width-20,
//     height: windowSize.height-150
//     },
// });



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
