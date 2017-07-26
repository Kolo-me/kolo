import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';
import firebase from 'firebase';
import Tinder from "keywords/Tinder";
import Routes from "keywords/Routes";
import firebaseClient from  "keywords/src/pages/FirebaseClient";
import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType} from 'react-native-fcm';
export default class Home extends Component {
  componentDidMount(){
    var group = currentUserGroup;
    var save = this;
    var Notification = firebase.database()
       .ref('Notifications')
       .child(group);
  Notification.on('child_changed', function(childSnapshot, prevChildKey) {
    var body1="You have "+"username"+ " new offers ";
     firebaseClient.sendNotification("","Funshare",body1);
    });
   Notification.once('value').then(function(snapshot) {
        var username = snapshot.val().username;
        var body1="You have "+"username"+ " new offers ";
        firebaseClient.sendNotification("","Funshare",body1);
    });
       
}

  goToProfile(){
    this.props.replaceRoute(Routes.Profile());
  }
   goToLogin(){
    this.props.replaceRoute(Routes.Login());
  }
   componentDidMount() {
    FCM.requestPermissions(); // for iOS
    FCM.getFCMToken().then(token => {
      console.log(token)
      // store fcm token in your server
    });
    this.notificationUnsubscribe = FCM.on('notification', (notif) => {
      // there are two parts of notif. notif.notification contains the notification payload, notif.data contains data payload
    });
    this.refreshUnsubscribe = FCM.on('refreshToken', (token) => {
      console.log(token)
      // fcm token may not be available on first load, catch it here
    });

    FCM.subscribeToTopic('/topics/foo-bar');
    FCM.unsubscribeFromTopic('/topics/foo-bar');
  }

  componentWillUnmount() {
    // prevent leaking
    this.refreshUnsubscribe();
    this.notificationUnsubscribe();
  }

  render() { 
    return (
      <View style={styles.container}>

          <View style={{flexDirection:'row' ,alignItems:'center' , justifyContent:'center',marginTop:12}}>
          <View style={{flex:0.1 ,alignItems:'center'}}>

          <TouchableOpacity
          onPress={this.goToProfile.bind(this)}
          >
          <Image
          source={require('keywords/src/img/Undo.png')}
          style={{width:40, height:40}}
          />
          </TouchableOpacity>

          </View>

          <Image
          source={require('../img/keywords.png')}
          style={{height:50, width:150 , }}

          />
          <View style={{flex:0.1,alignItems:'center'}}>
           
          

           </View>
          </View>
     
         <Tinder favorite={this.props.favorite}/>
     
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:   'rgba(0, 0, 0, 0.1)'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('Home', () => Home);
