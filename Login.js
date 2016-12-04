'use stric';

import React, { Component } from 'react';
import {
  ActivityIndicatorIOS,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View
} from 'react-native';
import buffer from 'buffer';
import AuthService from './AuthService';

export default class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showProgress: false
    }
  }

  onLoginPressed = () => {
    this.setState({showProgress: true});

    AuthService.login({
      username: this.state.username,
      password: this.state.password
    }, (results) => {
      this.setState(Object.assign({
        showProgress: false
      }, results));

      if(results.success && this.props.onLogin) {
        this.props.onLogin();
      }
    });
  }

  render() {
    let errorCtrl = <View />;

    if(!this.state.success && this.state.badCredentials){
      errorCtrl = <Text style={styles.error}>
        That username and password combination did not work
      </Text>;
    }

    if(!this.state.success && this.state.unknownError){
      errorCtrl = <Text style={styles.error}>
        We expected an unexpected issue
      </Text>;
    }

    return (
      <View style={styles.container}>
        <Text style={styles.heading}>
          GitHub Browser
        </Text>
        <TextInput style={styles.input}
          onChangeText={(text) => this.setState({username: text})}
          placeholder="GitHub username" />
        <TextInput style={styles.input}
          onChangeText={(text) => this.setState({password: text})}
          placeholder="GitHub password" secureTextEntry={true} />
        <TouchableHighlight style={styles.button}>
          <Text style={styles.buttonText}
            onPress={this.onLoginPressed}>
            Log in
          </Text>
        </TouchableHighlight>

        {errorCtrl}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    paddingTop: 40,
    alignItems: 'center',
    padding: 10
  },
  heading: {
    fontSize: 30,
    marginTop: 10
  },
  input: {
    height: 50,
    marginTop: 10,
    padding: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48BBEC'
  },
  button:{
    height: 50,
    backgroundColor: '#48BBEC',
    alignSelf: 'stretch',
    marginTop: 10,
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 22,
    color: '#FFF',
    alignSelf: 'center'
  },
  loader: {
    marginTop: 20
  },
  error: {
    color: 'red',
    paddingTop: 10
  }
});
