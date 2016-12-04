/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View
} from 'react-native';
import Login from './Login';

export default class githubBrowser extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false
    }
  }

  onLogin() {
    this.setState({isLoggedIn: true});
    console.log('isLoggedIn');
  }

  render() {
    if(this.state.isLoggedIn){
      return (
        <View style={styles.container}>
          <Text style={styles.welcome}>
            Logged in
          </Text>
        </View>
      )
    } else {
      return (
        <View style={styles.container}>
          <Login
            onLogin={this.onLogin} />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  }
});

AppRegistry.registerComponent('githubBrowser', () => githubBrowser);
