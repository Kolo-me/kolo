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
export default class keywords extends Component {
    componentDidMount(){
  
  
    }

   goToProfile(){
    this.props.replaceRoute(Routes.Profile());
  }
   goToLogin(){
    this.props.replaceRoute(Routes.Login());
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
          source={require('keywords/src/img/Home.png')}
          style={{width:40, height:40}}
          />
          </TouchableOpacity>

          </View>

          <Image
          source={require('../img/ifunshare.png')}
          style={{height:50, width:150 , }}

          />
          <View style={{flex:0.1,alignItems:'center'}}>
           
          <TouchableOpacity
          //onPress={this.goToChat.bind(this,0)}
          >
          <Image
          source={require('keywords/src/img/ichat.png')}
          style={{width:40, height:40}}
          />
          </TouchableOpacity>

           </View>
          </View>
     
         <Tinder/>
     
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
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

AppRegistry.registerComponent('keywords', () => keywords);
