import React, {
  Component
} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  AsyncStorage
} from 'react-native';
import * as firebase from 'firebase';
import RootNavigator from './RootNavigator';
// Initialize Firebase

var config = {
  apiKey: "AIzaSyBhZ1E0SaMHerBhpbjU-LF5DnAYtw84ZZQ",
  authDomain: "learn-7b3c9.firebaseapp.com",
  databaseURL: "https://learn-7b3c9.firebaseio.com",
  storageBucket: "learn-7b3c9.appspot.com",
  messagingSenderId: "174907828383"
};
firebase.initializeApp(config);
global.currentUserGlobal = null;
global.currentUserGroup = null;
export default class keywords extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }
  componentWillMount() {
    // get the current user from firebase
    // const userData = this.props.firebaseApp.auth().currentUser;AsyncStorage
    var self = this;
    try {
      AsyncStorage.getItem('userData').then((user_data_json) => {
        let userData = JSON.parse(user_data_json);
        if(userData) {
          firebase.database().ref('/users/' + userData.uid).once('value').then(function(snapshot) {
            var group = snapshot.val().group;
            currentUserGroup = group;
            currentUserGlobal = userData;
            self.setState({
              loading: true
            });
          }, function(error) {
            alert("Sign-in failed");
          });
        } else if(!userData)
          self.setState({
            loading: true
          });

      });
    } catch(error) {
      alert(error)
    }
  }
  render() {
    if(this.state.loading)
      return(
        <View style={styles.container}>
          <RootNavigator ref="rootNavigator" />
      </View>
      );
    else
      return(
        <View style={styles.container}>
          
      </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

AppRegistry.registerComponent('keywords', () => keywords);