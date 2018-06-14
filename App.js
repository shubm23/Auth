import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Header, Button, Spinner} from './src/components/common';
import firebase from 'firebase';
import LoginForm from './src/components/LoginForm';

export default class App extends React.Component {
  state = { loggedIn: null };
  componentWillMount(){
    firebase.initializeApp({
      apiKey: "AIzaSyApd0BKZdCkJxSMkrmzYa2fhtm927V6fPc",
      authDomain: "authentication-5380c.firebaseapp.com",
      databaseURL: "https://authentication-5380c.firebaseio.com",
      projectId: "authentication-5380c",
      storageBucket: "authentication-5380c.appspot.com",
      messagingSenderId: "675828264423"
    });
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }
    renderContent() {
      switch (this.state.loggedIn) {
        case true:
          return (
            <Button onPress={() => firebase.auth().signOut()}>
              Log Out
          </Button>
          );
        case false:
          return <LoginForm />;
        default:
          return <Spinner size="large" />;
      }
    };
  
  
  render() {
    return (
      <View>
        <Header headerText="Authentication" />
        {this.renderContent()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  //container: {flex: 1,backgroundColor: '#fff',alignItems: 'center',justifyContent: 'center',},
});
