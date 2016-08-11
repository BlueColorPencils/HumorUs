import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { DefaultRenderer, Actions } from 'react-native-router-flux';
import Button from 'react-native-button';

export default class Layout extends Component {
  constructor(props) {
      super(props)
  }

  _handlePress() {
    console.log('pressed');
  }

  render() {
    const goToPageTwo = () => Actions.pageTwo({text: 'Hello World!'});
    const state = this.props.navigationState;
    const children = state.children;

    return (
      <View style={{margin: 120}}>
        <Text>Layout txt</Text>
        <Button onPress={goTo}>Page Two</Button>
        <DefaultRenderer navigationState={children[0]}
          onNavigate={this.props.onNavigate} />
      </View>
    )
  }
}
