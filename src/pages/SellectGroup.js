'use strict';
import React, {
  Component
} from 'react';
import {
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
var deviceheight = Dimensions.get('window').height;
var devicewidth = Dimensions.get('window').width;




export default class sellectGroup extends Component {

  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
    this.goToSignUp = this.goToSignUp.bind(this);
    this.state = {
      group: null,
    };
  }

  componentDidMount() {
    var self = this;
    BackAndroid.addEventListener('hardwareBackPress', () => {
      // console.log("did",currentUserGlobal);
      self.goBack();
      return true;
    });
  }
  goBack() {
    this.props.replaceRoute(Routes.Login());
    return true;
  }

  signup() {
    var self = this;
    if(self.state.group) {
      var groupname = self.state.group;
      firebase.database()
        .ref('Group')
        .once("value")
        .then(function(snapshot) {
          var hasName = snapshot.hasChild(groupname);
          if(hasName) {
            currentUserGroup = groupname;
            self.goToSignUp();
          } else
            alert("Keine Groppe gefunden")

        });

    } else
      alert("Füllen Sie alle die Felde")
  }
  goToSignUp() {
    this.props.replaceRoute(Routes.Signup());
  }

  render() {

    return(
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
      onChangeText={(text) => this.setState({group: text})} 
      placeholder={"Groppnname"}
      returnKeyType="done"
      onSubmitEditing={this.signup.bind(this)}  
      placeholderTextColor="white"
      underlineColorAndroid="transparent"     
      />       
      </View>
      <View style={{ margin:5,alignItems:'center'}}>
      <TouchableHighlight
      onPress={this.signup.bind(this)}
      >
        <Text style = {{fontSize:18 , color : 'white'}} >Weiter</Text>
      </TouchableHighlight>
      </View>
      <View style={{ margin:5,alignItems:'center'}}>
      <TouchableHighlight
      onPress={this.goBack.bind(this)}
      >
        <Text style = {{fontSize:18 , color : 'white'}} >Zurück</Text>
      </TouchableHighlight>
      </View>
      </View>
      </ScrollView>  
      </Image>
    );
  }
}
AppRegistry.registerComponent('sellectGroup', () => sellectGroup);