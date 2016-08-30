
'use strict';

import React from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Alert,
  View,
  Navigator,
  Image,
  TextInput,
  Picker,
  DatePickerAndroid,
  Slider,
  AsyncStorage,
} from 'react-native';

import Button from 'react-native-button';

import {FBLogin, FBLoginManager} from 'react-native-facebook-login';
import TimerMixin from 'react-timer-mixin';

import ScrollableTabView, { DefaultTabBar, } from 'react-native-scrollable-tab-view';
// import NavigatorTabBar from './NavigatorTabBar';
// import MatchesPage from './Matches';
import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/MaterialIcons';
import SwipeCards from 'react-native-swipe-cards';

import { Form, InputField, LinkField, Separator } from 'react-native-form-generator';
// var {GiftedForm, GiftedFormManager} = require('react-native-gifted-form');

var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var date = (new Date(1991, 0, 21));

var ProfilePage = React.createClass({
    mixins: [TimerMixin],
     getInitialState() {
      return {
        fbID: '',
        birthday: "01-21-1991",
        // education: '',
        description: '',
        preferredAgeMax: 60,
        photo: '',
        preferredLocationMI: 0,
        name: '',
        preferredAgeMin: 18,
        preferredGender: '',
        // lat: '',
        // long: '',
        gender: '',
        // age: '',
        formData: {},
        date: '',
        datenum: ''
      };
    },

    componentWillMount() {

      AsyncStorage.getItem("user").then((value) => {
        let user_info = JSON.parse(value)
        this.setState({"fbID": user_info.id})
        let url = "http://192.168.43.88:3000/api/user/"+user_info.id
        fetch(url, {method: "GET"})
          .then((response) => response.json())
          .then((responseData) => {
            this.setState({
              birthday: Number(responseData.birthday),
              gender: responseData.gender,
              preferredGender: responseData.preferredGender,
              description: responseData.description,
              preferredAgeMax: responseData.preferredAgeMax,
              photo: responseData.photo,
              preferredLocationMI: responseData.preferredLocationMI,
              name: responseData.name,
              preferredAgeMin: responseData.preferredAgeMin,
              // lat: responseData.lat,
              // long: responseData.long,
              age: responseData.age
            })

            if (!responseData.preferredLocationMI) {
              this.setState({preferredLocationMI: 100})
            }
            if (!responseData.birthday) {
              this.setState({birthday: 664444800000})
            } else {
              let date = new Date(Number(responseData.birthday))
              date = date.toString().slice(4,15)
              this.setState({date: date, datenum: Number(responseData.birthday)})
            }
          }).done();
        }).done();

    },
     _handleFormChange(formData) {
        // this.state.birthday = formData.birthday;
        // this.state.gender = formData.gender;
        // this.state.description = formData.description;

      this.setState({formData:formData})
      this.props.onFormChange && this.props.onFormChange(formData);
    },

    _handleSubmit() {
      fetch("http://192.168.43.88:3000/api/user/update", {
        method: "POST",
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          birthday: this.state.birthday,
          description: this.state.description,
          gender: this.state.gender,
          preferredGender: this.state.preferredGender,
          preferredAgeMax: this.state.preferredAgeMax,
          preferredLocationMI: this.state.preferredLocationMI,
          fbID: this.state.fbID,
          preferredAgeMin: this.state.preferredAgeMin,
        })
      }).done();
      this.props.navigator.pop()
    },

    _handleGender(gender) {
      var genderArr = this.state.gender
      let index = genderArr.indexOf(gender)

      if (index !== -1 && gender && gender != "") {
        genderArr.splice(index-1, 2)
        this.setState({gender: genderArr})
      } else if (gender!== "") {
        genderArr.push(" ")
        genderArr.push(gender)
        this.setState({gender: genderArr})
      }
    },

    _handlePreferredGender(gender) {
      var genderPrefArr = this.state.preferredGender
      let index = genderPrefArr.indexOf(gender)

      if (index !== -1 && gender && gender!== "") {
        genderPrefArr.splice(index-1, 2)
        this.setState({preferredGender: genderPrefArr})
      } else if (gender!== "") {
        genderPrefArr.push(" ")
        genderPrefArr.push(gender)
        this.setState({preferredGender: genderPrefArr})
      }
    },
    async showPicker(stateKey, options) {
      try {
        var newState = {};
        const {action, year, month, day} = await DatePickerAndroid.open(options);
        if (action === DatePickerAndroid.dismissedAction) {
          newState[stateKey + 'Text'] = 'dismissed';
        } else {
          var date = new Date(year, month, day);
          newState[stateKey + 'Text'] = date.toLocaleDateString();
          newState[stateKey + 'Date'] = date;
          let date = new Date(newState.presetDate)
          let datestring = date.toString()
          let datenum = Number(date)
          let datestr = datenum.toString()
          let datefinal = datestring.slice(4,15)
          this.setState({birthday: datenum, date: datefinal, datenum: datenum});
        }
        // Alert.alert(JSON.stringify(newState))
      } catch ({code, message}) {
        console.warn(`Error in example '${stateKey}': `, message);
      }
    },

  render() {

    return(
      <View style={{flex: 1}}>
        <View style={styles.topnavbar}>
          <TouchableHighlight
            onPress={this._handleSubmit} style={styles.btnClickContain}
            underlayColor='transparent'>
            <View style={styles.btnContainer}>
              <Icon
                name='ios-arrow-back'
                size={30}
                style={styles.btnIcon}/>
              <Text style={styles.btnText}>Settings</Text>
            </View>
          </TouchableHighlight>
           <TouchableHighlight
              onPress={this._handleSubmit} style={styles.btnClick}
              underlayColor='transparent'>
              <View style={styles.btnSave}>
              <Icon
                name='md-checkmark'
                size={30}
              />
            </View>
          </TouchableHighlight>
        </View>

        <ScrollView>
          <View style={styles.picturecontainer}>
            <View style={styles.leftpic}>
            <Image
              source={{uri:this.state.photo}}
              style={styles.profilepicture}
            />
          </View>
          <View style={styles.midpic}>
            <Icons name='add-a-photo'
              size={38}
              color='rgb(204,204,204)'
            />
          </View>
          <View style={styles.rightpic}>
            <Icons name='add-a-photo'
              size={38}
              color='rgb(204,204,204)'
            />
            </View>
          </View>

          <View style={styles.formcontainer}>
            <View style={styles.separatornormal}>
              <Text style={styles.separatortext}>About Me</Text>
            </View>

            <TextInput defaultValue={this.state.description} maxNumberOfLines={5} multiline numberOfLines={5} onChangeText={(text) => this.setState({description: text})} underlineColorAndroid='rgba(0,0,0,0)' style={styles.textInput}/>

            <View style={styles.separatornormal}>
              <Text style={styles.separatortext}>Birthday</Text>
            </View>

            <TouchableWithoutFeedback onPress={this.showPicker.bind(this, 'preset', {date: this.state.datenum})}>
              <Text style={{height: 50, fontSize: 15, textAlign: 'center', paddingTop:15}}>{this.state.date}</Text>
            </TouchableWithoutFeedback>

            <View style={styles.separatornormal}>
              <Text style={styles.separatortext}>Gender</Text>
              <Text style={styles.gendertext}>{this.state.gender}</Text>
            </View>

             <Picker mode='dropdown'
              selectedValue={this.state.gender}
              onValueChange={this._handleGender.bind(this)}>
              <Picker.Item label="    -" value="" />
              <Picker.Item label="Male" value="Male" />
              <Picker.Item label="Female" value="Female" />
              <Picker.Item label="Agender" value="Agender" />
              <Picker.Item label="Androgyne" value="Androgyne" />
              <Picker.Item label="Androgynous" value="Androgynous" />
              <Picker.Item label="Bigender" value="Bigender" />
              <Picker.Item label="Cis" value="Cis" />
              <Picker.Item label="Cisgender" value="Cisgender" />
              <Picker.Item label="Cis Female" value="Cis Female" />
              <Picker.Item label="Cis Male" value="Cis Male" />
              <Picker.Item label="Cis Man" value="Cis Man" />
              <Picker.Item label="Cis Woman" value="Cis Woman" />
              <Picker.Item label="Cisgender Female" value="Cisgender Female" />
              <Picker.Item label="Cisgender Male" value="Cisgender Male" />
              <Picker.Item label="Female to Male" value="Female to Male" />
              <Picker.Item label="Gender Fluid" value="Gender Fluid" />
              <Picker.Item label="Gender Nonconforming" value="Gender Nonconforming" />
              <Picker.Item label="Gender Questioning" value="Gender Questioning" />
              <Picker.Item label="Gender Variant" value="Gender Variantt" />
              <Picker.Item label="Genderqueer" value="Genderqueer" />
              <Picker.Item label="Intersex" value="Intersex" />
              <Picker.Item label="Male to Female" value="Male to Female" />
              <Picker.Item label="Neutrois" value="Neutrois" />
              <Picker.Item label="Non-binary" value="Non-binary" />
              <Picker.Item label="Other" value="Other" />
              <Picker.Item label="Pangender" value="Pangender" />
              <Picker.Item label="Trans" value="Trans" />
              <Picker.Item label="Trans Female" value="Trans Female" />
              <Picker.Item label="Trans Male" value="Trans Male" />
              <Picker.Item label="Trans Person" value="Trans Person" />
              <Picker.Item label="Transfeminine" value="Transfeminine" />
              <Picker.Item label="Transgender" value="Transgender" />
              <Picker.Item label="Transgender Female" value="Transgender Female" />
              <Picker.Item label="Transgender Male" value="Transgender Male" />
              <Picker.Item label="Transgender Person" value="Transgender Person" />
              <Picker.Item label="Transmasculine" value="Transmasculine" />
              <Picker.Item label="Transsexual" value="Transsexual" />
              <Picker.Item label="Transsexual Female" value="Transsexual Female" />
              <Picker.Item label="Transsexual Male" value="Transsexual Male" />
              <Picker.Item label="Transsexual Person" value="Transsexual Person" />
              <Picker.Item label="Two-Spirit" value="Two-spirit" />
            </Picker>

            <View style={styles.separatornormal}>
              <Text style={styles.separatortext}>Interested In</Text>
              <Text style={styles.gendertext}>{this.state.preferredGender}</Text>
            </View>

            <View style={styles.innercontainer}>
            <Picker mode='dropdown'
              selectedValue={this.state.preferredGendergender}
              onValueChange={this._handlePreferredGender.bind(this)}>
              <Picker.Item label="   -" value="" />
              <Picker.Item label="Friends" value="Friends" />
              <Picker.Item label="Male" value="Male" />
              <Picker.Item label="Female" value="Female" />
              <Picker.Item label="Agender" value="Agender" />
              <Picker.Item label="Androgyne" value="Androgyne" />
              <Picker.Item label="Androgynous" value="Androgynous" />
              <Picker.Item label="Bigender" value="Bigender" />
              <Picker.Item label="Cis" value="Cis" />
              <Picker.Item label="Cisgender" value="Cisgender" />
              <Picker.Item label="Cis Female" value="Cis Female" />
              <Picker.Item label="Cis Male" value="Cis Male" />
              <Picker.Item label="Cis Man" value="Cis Man" />
              <Picker.Item label="Cis Woman" value="Cis Woman" />
              <Picker.Item label="Cisgender Female" value="Cisgender Female" />
              <Picker.Item label="Cisgender Male" value="Cisgender Male" />
              <Picker.Item label="Female to Male" value="Female to Male" />
              <Picker.Item label="Gender Fluid" value="Gender Fluid" />
              <Picker.Item label="Gender Nonconforming" value="Gender Nonconforming" />
              <Picker.Item label="Gender Questioning" value="Gender Questioning" />
              <Picker.Item label="Gender Variant" value="Gender Variantt" />
              <Picker.Item label="Genderqueer" value="Genderqueer" />
              <Picker.Item label="Intersex" value="Intersex" />
              <Picker.Item label="Male to Female" value="Male to Female" />
              <Picker.Item label="Neutrois" value="Neutrois" />
              <Picker.Item label="Non-binary" value="Non-binary" />
              <Picker.Item label="Other" value="Other" />
              <Picker.Item label="Pangender" value="Pangender" />
              <Picker.Item label="Trans" value="Trans" />
              <Picker.Item label="Trans Female" value="Trans Female" />
              <Picker.Item label="Trans Male" value="Trans Male" />
              <Picker.Item label="Trans Person" value="Trans Person" />
              <Picker.Item label="Transfeminine" value="Transfeminine" />
              <Picker.Item label="Transgender" value="Transgender" />
              <Picker.Item label="Transgender Female" value="Transgender Female" />
              <Picker.Item label="Transgender Male" value="Transgender Male" />
              <Picker.Item label="Transgender Person" value="Transgender Person" />
              <Picker.Item label="Transmasculine" value="Transmasculine" />
              <Picker.Item label="Transsexual" value="Transsexual" />
              <Picker.Item label="Transsexual Female" value="Transsexual Female" />
              <Picker.Item label="Transsexual Male" value="Transsexual Male" />
              <Picker.Item label="Transsexual Person" value="Transsexual Person" />
              <Picker.Item label="Two-Spirit" value="Two-spirit" />
            </Picker>
            </View>
            <View style={styles.separatornormal}>
              <Text style={styles.separatortext}>Search Distance</Text>
              <Text style={styles.separatortext}>{this.state.preferredLocationMI} mi.</Text>
            </View>


            <Slider minimumTrackTintColor='#ff1183' style={styles.slider} minimumValue={0} maximumValue={100} value={this.state.preferredLocationMI}  onValueChange={(value) => this.setState({preferredLocationMI: Math.round(value)})} />

            <View style={styles.separatornormal}>
              <Text style={styles.separatortext}>Age Minimum</Text>
              <Text style={styles.separatortext}>{this.state.preferredAgeMin}</Text>
            </View>

            <Slider style={styles.slider} minimumValue={18} maximumValue={60} value={this.state.preferredAgeMin} onValueChange={(value) => this.setState({preferredAgeMin: Math.round(value)})} />

            <View style={styles.separatornormal}>
              <Text style={styles.separatortext}>Age Maximum</Text>
              <Text style={styles.separatortext}>{this.state.preferredAgeMax}</Text>
            </View>

            <Slider minimumTrackTintColor='#ff1183' style={styles.slider} minimumValue={19} maximumValue={100} value={60}  onValueChange={(value) => this.setState({preferredAgeMax: Math.round(value)})} />

            <View style={styles.bottom}>
            </View>

            <FBLogin
              onLogout={() => {
                this.props.navigator.push({
                    name: 'FBLogin',
                });
              }}
            />
        </View>
      </ScrollView>
    </View>
    )
  }
});


const styles = StyleSheet.create({
  topnavbar: {
    height: 65,
    flexDirection: 'row',
    borderWidth: 2,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    backgroundColor: 'white',
    borderBottomColor: 'rgba(0,0,0,0.4)'
  },

  topnavtext:{
    fontSize: 20,

  },
  bottom:{
    backgroundColor: 'rgba(200, 200, 200, 0.43)',
    height: 80,
    borderTopColor: 'rgba(0,0,0,0.25)',
    borderTopWidth: 1,
  },
  picturecontainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'relative',
    top: 0,
    paddingLeft: 10,
    paddingRight:10,
    paddingBottom: 30,
    backgroundColor: 'rgba(200, 200, 200, 0.43)',
  },
  profilepicture: {
    width: 100,
    height: 100,
    alignItems: 'center',
  },
  leftpic: {
    marginTop: 25,
    width: 100,
    height: 100,
  },
  midpic: {
    marginTop: 25,
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(138, 135, 135, 0.5)',
  },
  rightpic: {
    marginTop: 25,
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(138, 135, 135, 0.5)',
  },
   btnClickContain: {
    width: 140,
    justifyContent: 'center',
    alignItems: 'stretch',
    alignSelf: 'stretch',
    paddingTop: 18,
  },
   btnClick: {
    position: 'absolute',
    right: 0,
    width: 40,
    justifyContent: 'center',
    alignItems: 'stretch',
    alignSelf: 'stretch',
    paddingTop: 17,
  },
  btnContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
    alignSelf: 'stretch',
  },
  btnIcon: {
    height: 30,
    width: 30,
  },
  btnText: {
    fontSize: 20,
    color: 'rgb(255, 17, 131)',
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
  separatornormal: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 30,
    backgroundColor: 'rgba(200, 200, 200, 0.43)',
    paddingLeft: 10,
    paddingRight: 10,
    borderTopColor: 'rgba(0,0,0,0.25)',
    borderTopWidth: 1,
    paddingTop: 10,
  },
  separatortext: {
    fontSize: 17,
    paddingTop: 7,
    color:'rgb(50, 50, 50)',
    paddingRight: 10,
  },
  gendertext: {
    paddingTop: 7,
    paddingRight: 10,
    fontSize: 15,
    // paddingBottom: 10,
  },
  textInput: {
    color:'rgb(130, 129, 129)',
    flex: 1,
    fontSize: 15,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 50,
    alignItems: 'flex-start'
  },
   slider: {
    height: 20,
    margin: 10,
  },

});

module.exports = ProfilePage;
