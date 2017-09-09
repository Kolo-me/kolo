import React, {
  Component
} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  BackAndroid,
  Alert
} from 'react-native';
import Tinder from "keywords/Tinder";
import Routes from "keywords/Routes";
import Navbar from "keywords/src/components/Navbar";
import firebase from 'firebase';
var deviceheight = Dimensions.get('window').height / (3 / 2);
var deviceWidth = Dimensions.get('window').width - 30;
var array = {
  w1: 1,
  w2: null,
  w3: null
};
export default class addwards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      w1: null,

    }
  }
  componentDidMount() {
    this._mounted = true;
    var self = this;
    BackAndroid.addEventListener('hardwareBackPress', () => {
      self.goBack();
      return true;
    });
  }
  componentWillUnmount() {
    this._mounted = false;
  }
  goBack() {
    this.props.replaceRoute(Routes.Home());
  }
  StartUpbload() {

    if(this.state.w1 &&
      this.state.w2 &&
      this.state.w3 &&
      this.state.w4 &&
      this.state.w5 &&
      this.state.w6 &&
      this.state.w7 &&
      this.state.w8) {
      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth() + 1; //January is 0!
      var yyyy = today.getFullYear();
      var uid = currentUserGlobal.uid;
      var username = currentUserGlobal.displayName;
      if(dd < 10) {
        dd = '0' + dd
      }

      if(mm < 10) {
        mm = '0' + mm
      }
      today = dd + '/' + mm + '/' + yyyy;
      var uploadTask1 = firebase.database()
        .ref('Group')
        .child(currentUserGroup);

      var uploadTaskNoti = firebase.database()
        .ref("Notifications")
        .child(currentUserGroup);
      var itemData = {
        w1: this.state.w1,
        w2: this.state.w2,
        w3: this.state.w3,
        w4: this.state.w4,
        w5: this.state.w5,
        w6: this.state.w6,
        w7: this.state.w7,
        w8: this.state.w8,
        uid: uid,
        username: username,
        starCount: 0,
        date: today
      };
      var Message = 'Liebe ' + username;
      uploadTaskNoti.set(itemData).key;
      var newItemKey = uploadTask1.push(itemData).key;
      Alert.alert(Message, "Wir danken dir", [{
        text: 'OK',
        onPress: () => this.goBack()
      }]);
    } else {
      alert("Bitte fülle Alle die Felder")
    }
  }
  render() {
    return(
      <View style = {{flex:1}}>
      <Navbar goBack = {()=>this.goBack()}/>
      <ScrollView>
      <View style={styles.container}>

        <Text> hi</Text>
        </View>  
        </ScrollView>
        <TouchableOpacity onPress = {this.StartUpbload.bind(this)} style = {{alignItems:'center' , padding:10 , backgroundColor:   'rgba(0, 0, 0, 0.7)'}} >
        <Text style = {{color:'white' , fontSize:18 ,fontWeight: "500"}} >Fertig</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    backgroundColor: 'white',
  },
  card: {
    width: deviceWidth,
    height: deviceheight,
    borderWidth: 2,
    borderColor: '#e3e3e3',
    borderRadius: 2,
  },
  row: {
    width: deviceWidth,
    height: deviceheight / 4,
    borderColor: "white",
    borderWidth: 1,
    flexDirection: 'row'
  },
  textinput: {
    color: 'white',
    backgroundColor: '#222d59',
    fontSize: 20,
    flex: 0.5,
    textAlign: 'center',
    borderColor: 'black',
    textAlignVertical: 'center'
  },
  textinput1: {
    color: 'white',
    backgroundColor: '#592252',
    fontSize: 20,
    flex: 0.5,
    textAlign: 'center',
    textAlignVertical: 'center'
  },
});

AppRegistry.registerComponent('addwards', () => addwards);