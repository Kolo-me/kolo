'use strict';
import React, { Component } from 'react';
import  {
  AppRegistry,
  Text,
  TextInput,
  View,
  Image,
  ScrollView,
  ActivityIndicator,
  BackAndroid,
  Modal,
  Dimensions,
  TouchableHighlight,
  AsyncStorage
} from 'react-native';
import IcoButton from 'keywords/src/components/icobutton';
import Routes from 'keywords/Routes';
import firebase from 'firebase';
import costyles from '../styles/co-styles.js';
var deviceheight = Dimensions.get('window').height ;
var devicewidth = Dimensions.get('window').width ;

 


export default class signup extends Component {

  constructor(props){
    super(props);
    this.goBack = this.goBack.bind(this);
    this.state = {
      email: '',
      password: '',
      name: '',
      modalVisible: false
    };
  }
 
componentDidMount() {
  var self=this;
  BackAndroid.addEventListener('hardwareBackPress', () => {
  // console.log("did",currentUserGlobal);
  self.goBack();
  return true;
});
  }

 
  signup(){
    if (this.state.password && this.state.name &&this.state.email)
    {
        
        var save = this;
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then(function() {
        var user = firebase.auth().currentUser;
          user.updateProfile({
            //photoURL: "https://firebasestorage.googleapis.com/v0/b/funshare-c6017.appspot.com/o/profiles%2Fdefault%2Fdefault_user-884fcb1a70325256218e78500533affb.jpg?alt=media&token=36955131-29cc-40a8-9db5-2511ed6a39ce",
            displayName: save.state.name,
          }).then(function() {

            save.login();
          }, function(error) {
          });
        }, function(error) {
          alert("Signup failed")
         
        });
    }
    else
      alert("Füllen Sie alle die Felde")
  }
  goBack(){
    this.props.replaceRoute(Routes.Login())
  }
  login(){
    var email =this.state.email;
    var password =this.state.password;
    var self = this;
    var group = currentUserGroup;
    return new Promise((next, error) => {

      firebase.auth().signInWithEmailAndPassword(
       email,
       password
       ).then(function(result) {
         firebase.database().ref('users/' + result.uid).set({
            group : group ,
          });
           AsyncStorage.setItem('userData', JSON.stringify(result));
           currentUserGlobal=result;
            self.goToHome();
       }, function(error) {
        alert("Sign-in failed");
      });

     });
  }
goToHome(){
  this.props.replaceRoute(Routes.Home());
}
  render() {
 
    return (
      <Image
      resizeMode={Image.resizeMode.cover}
      source={require('../img/Background.png')}
      style = {costyles.backgroundImage}
      >
      <ScrollView style= {{flex:1}} >  
   
      <View style= {{position: 'absolute',
      top: 10,
      left: 10,}}>
      <IcoButton
      source={require('keywords/src/img/arrow.png')}
      onPress={this.goBack.bind(this)}
      icostyle={{width:25, height:25}}
      />
      </View>
      <View style={costyles.LogoComponent}>
      <Image 
      resizeMode={Image.resizeMode.contain}
      source={require('../img/keywolrdsLogo.png')}
      style={costyles.fLogo}                                
      />
      <Image 
      resizeMode={Image.resizeMode.contain}
      source={require('../img/Logo.png')}
      style={costyles.Logo}                                
      />
      </View>
      <View style={{flex:0.4,justifyContent:'flex-end',marginTop:deviceheight/16}}>
      <View style = {costyles.textinputcontainer}>
      <TextInput
      maxLength = {18}
      style={costyles.textinput}
      onChangeText={(text) => this.setState({name: text})}
      keyboardType={"email-address"}
      placeholder={"Vollständiger Name"}
      onSubmitEditing={() => this.email.focus()}
      returnKeyType="next"
      placeholderTextColor="white"
      underlineColorAndroid="transparent"
      />
      </View>
      <View style = {costyles.textinputcontainer}>
      <TextInput
      ref={(ref) => this.email = ref}
      style={costyles.textinput}
      onChangeText={(text) => this.setState({email: text.replace(/\s/g, '')})}
      keyboardType={"email-address"}
      value={this.state.email}
      placeholder={"E-Mail Adresse"}
      onSubmitEditing={() => this.password.focus()}
      returnKeyType="next"
      placeholderTextColor="white"
      underlineColorAndroid="transparent"
      />
      </View>
      <View style = {costyles.textinputcontainer}>
      <TextInput
      maxLength = {18}
      ref={(ref) => this.password = ref}
      style={costyles.textinput}
      onChangeText={(text) => this.setState({password: text})} 
      secureTextEntry={true}
      placeholder={"Passwort (Mindestens 6 Zeichen)"}
      returnKeyType="done"
      onSubmitEditing={ this.signup.bind(this)}  
      placeholderTextColor="white"
      underlineColorAndroid="transparent"     
      />       
      </View>
    <View style={{ margin:5,alignItems:'center'}}>
      <TouchableHighlight
      onPress={this.signup.bind(this)}
      >
        <Text style = {{fontSize:18 , color : 'white'}} >weiter</Text>
      </TouchableHighlight>
      </View>
      </View>
      </ScrollView>  
      </Image>
      );
    }
  }
  AppRegistry.registerComponent('signup', () => signup);