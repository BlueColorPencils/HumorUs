'use strict';
import React from 'react';
import {View, Text, StyleSheet, TextInput, Image, Icon} from "react-native";
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
// var FBLoginMock = require('./FBLoginMock');
import {FBLogin, FBLoginManager} from 'react-native-facebook-login';
import Home from './Home';

var TabView = require('./TabView');

var FB_PHOTO_WIDTH = 200;
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');


const reducerCreate = params=>{
    const defaultReducer = Reducer(params);
    return (state, action)=>{
        console.log("ACTION:", action);
        return defaultReducer(state, action);
    }
};



var Launch = React.createClass({
 getInitialState(){
    return {
      user: null
    };
  },

  render() {
    var _this = this;
    var user = this.state.user;

    if(this.state.user) {
      // return (
        var info = this.state.info;
        return <Router createReducer={reducerCreate} sceneStyle={{backgroundColor:'#F7F7F7'}}>
          <Scene key="modal" component={Modal} >
            <Scene key="root" hideNavBar={true}>
              <Scene key="home" component={Home} title="Nav Bar Here" type={ActionConst.REPLACE} />
            </Scene>
          </Scene>
        </Router>
        console.log("this.state.user", this.state.user)
        // return (<Text>HIIIII</Text>)
    // );
    } else {
      return (
      <View style={styles.container}>
        <Image style={styles.bg} source={{uri: 'https://scontent-sea1-1.xx.fbcdn.net/t31.0-8/13323231_10207167534975001_2138488519942298615_o.jpg'}} />

        <View style={styles.message}>
          <Text style={styles.messageFont}>Find your lol mate.</Text>
        </View>

        <View style={styles.header}>
            <Image style={styles.logo} source={{uri: 'http://i.imgur.com/da4G0Io.png'}} />
        </View>

        <View style={styles.terms}>
          <Text style={styles.greyFont}>By continuing, you agree to our <Text style={styles.whiteFont}>Terms of Service</Text> and <Text style={styles.whiteFont}>Privacy policy</Text></Text>
        </View>

        { user && <Photo user={user} /> }
        { user && <Info user={user} /> }

        <FBLogin style={styles.loginbutton}
          permissions={["email","user_friends"]}
          onLogin={function(data){
            console.log("Logged in!");
            console.log(data);
            _this.setState({ user : data.credentials });
          }}
          onLogout={function(){
            console.log("Logged out.");
            _this.setState({ user : null });
          }}
          onLoginFound={function(data){
            console.log("Existing login found.");
            console.log(data);
            _this.setState({ user : data.credentials });
          }}
          onLoginNotFound={function(){
            console.log("No user logged in.");
            _this.setState({ user : null });
          }}
          onError={function(data){
            console.log("ERROR");
            console.log(data);
          }}
          onCancel={function(){
            console.log("User cancelled.");
          }}
          onPermissionsMissing={function(data){
            console.log("Check permissions!");
            console.log(data);
          }}
        />
      </View>
    )
    }
  }
});




var Photo = React.createClass({
  propTypes: {
    user: React.PropTypes.object.isRequired,
  },

  getInitialState: function(){
    return {
      photo: null,
    };
  },

  componentWillMount: function(){
    var _this = this;
    var user = this.props.user;
    var api = `https://graph.facebook.com/v2.3/${user.userId}/picture?width=${FB_PHOTO_WIDTH}&redirect=false&access_token=${user.token}`;

    fetch(api)
      .then((response) => response.json())
      .then((responseData) => {
        _this.setState({
          photo : {
            url : responseData.data.url,
            height: responseData.data.height,
            width: responseData.data.width,
          },
        });
      })
      .done();
  },

  render(){
    if(this.state.photo == null) return this.renderLoading();

    var photo = this.state.photo;

    return (
      <View style={styles.bottomBump}/>

        // <Image
        //   style={photo &&
        //     {
        //       height: photo.height,
        //       width: photo.width,
        //     }
        //   }
        //   source={{uri: photo && photo.url}}
        // />
      // </View>
    );
  },
  renderLoading: function(){
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
});






var Info = React.createClass({
  propTypes: {
    user: React.PropTypes.object.isRequired,
  },

  getInitialState: function(){
    return {
      info: null,
    };
  },

  componentWillMount: function(){
    var _this = this;
    var user = this.props.user;
    var api = `https://graph.facebook.com/v2.3/${user.userId}?fields=name,email&access_token=${user.token}`;

    fetch(api)
      .then((response) => response.json())
      .then((responseData) => {
        _this.setState({
          info : {
            name : responseData.name,
            email: responseData.email,
          },
        });
      })
      .done();
  },

  render(){
    // var info = this.state.info;
    // return <Router createReducer={reducerCreate} sceneStyle={{backgroundColor:'#F7F7F7'}}>
    //   <Scene key="modal" component={Modal} >
    //     <Scene key="root" hideNavBar={false}>
    //       <Scene key="home" component={Home} title="Replace" type={ActionConst.REPLACE} intial={true}/>
    //     </Scene>
    //   </Scene>
    // </Router>

      // console.log("you are in the last render")
      <View style={styles.bottomBump}>
      <Text>HELLOOOOOOOOOOO </Text>
      </View>
    // );
  }
});



var styles = StyleSheet.create({
    loginContainer: {
      marginTop: 150,
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    loginbutton: {
      flex:1,
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'center',
      backgroundColor: '#FF3366',
      height: 60
      // paddingLeft: 15,
      // marginRight: 15,
      // marginBottom: 15
    },
    bottomBump: {
      marginBottom: 50,
    },
    container: {
      flexDirection: 'column',
      flex: 1,
      backgroundColor: 'transparent'
    },
    message: {
      justifyContent: 'center',
      alignItems: 'center',
      top: 30
    },
    messageFont: {
      color: '#FFF',
      fontSize: 20
    },
    bg: {
        position: 'absolute',
        bottom: -4,
        width: windowSize.width,
        height: windowSize.height
    },
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: .5,
        backgroundColor: 'transparent'
    },
    logo: {
        width: 150,
        height: 150,
        bottom: 66
    },
    signin: {
        bottom: 20,
        backgroundColor: '#FF3366',
        padding: 20,
        marginLeft: 15,
        marginRight: 15,
        alignItems: 'center'
    },
    terms: {
      top: 35,
      justifyContent: 'center',
      alignItems: 'center',
      flex: .15
    },
    inputs: {
        marginTop: 10,
        marginBottom: 10,
        flex: .25
    },
    inputPassword: {
        marginLeft: 15,
        width: 20,
        // marginTop: -10,
        height: 22
    },
    inputUsername: {
      marginLeft: 15,
      width: 20,
      height: 20
    },
    inputContainer: {
        padding: 12,
        // borderWidth: 1,
        borderBottomColor: '#CCC',
        borderColor: 'transparent'
    },
    input: {
        position: 'absolute',
        left: 61,
        top: 4,
        right: 16,
        height: 44,
        fontSize: 18,
        color: '#000'
    },
    forgotContainer: {
      alignItems: 'flex-end',
      padding: 15,
    },
    greyFont: {
      color: '#FFF',
      fontSize: 11,
      fontWeight: '400'
    },
    whiteFont: {
      color: '#FFF',
      fontWeight: '600'
    }
})

module.exports = Launch;
