'use strict';
import React, { Component } from 'react';
import {
  StyleSheet,
  PropTypes,
  Text,
  TouchableOpacity,
  View,
  AppRegistry,
  Image
} from 'react-native';


const styles = StyleSheet.create({
 
});

export default class Navbar extends Component {
  render() {
    return (
    <View style={{ padding: 8, flexDirection: 'row', backgroundColor: '#336E7B' }}>
    <View style={{ flex:0.4 , justifyContent:'center' , margin:5  }}>
    <TouchableOpacity
    onPress={this.props.goBack}
    >
    <Image 
    source={require('keywords/src/img/arrow.png')}
    style={{width:20, height:20}}
    />

    </TouchableOpacity>
    </View>
     
    <View style={{ flex:0.2 , alignItems:'center', justifyContent:'center' , margin:5  }}>
    <Image
    //source={require('keywords/src/img/ilupe.png')}
    style={{width:32, height:32}}
    />
    </View>

 
   <View style={{ flex:0.4 , alignItems:'flex-end', justifyContent:'center' , margin:5  }}>
   
    </View>
 
    </View>
      );
  }
}
AppRegistry.registerComponent('Navbar', () => Navbar);
 

