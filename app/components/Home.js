import React from 'react';
import {View, Text, StyleSheet} from "react-native";
import Button from "react-native-button";
import {Actions} from "react-native-router-flux";
import {FBLogin, FBLoginManager} from 'react-native-facebook-login';


var styles = StyleSheet.create({
    container: {
      // marginTop: 150,
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: "#F5FCFF"
    },
    innercontainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF"
    },
    welcome: {
        fontSize: 20,
        textAlign: "center",
        margin: 10
    },
    instructions: {
        textAlign: "center",
        color: "#333333",
        marginBottom: 5,
    },
});

class Home extends React.Component {
    render(){
        var _this = this;
        return (
          <View style={styles.container}>
            <View style={styles.innercontainer}>
                <Text>MAIN SCREEN</Text>
            </View>

            <FBLogin style={styles.loginbutton}
              onLogout={function(){
                console.log("Logged out.");
                _this.setState({ user : null });
              }}
            />
          </View>
        );
    }
}


module.exports = Home;
