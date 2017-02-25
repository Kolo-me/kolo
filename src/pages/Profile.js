'use strict';
import React from 'react'; 
import{
  AppRegistry,
  AsyncStorage,
  Dimensions,
  Image,
  NativeModules,
  PropTypes,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  BackAndroid,
  Platform,
  Text
} from 'react-native';
import IcoButton from 'keywords/src/components/icobutton';
import firebase from 'firebase';
import Routes from 'keywords/Routes';
import IconButton from 'keywords/src/components/icotextButton';
var deviceWidth = Dimensions.get('window').width -6;
var deviceheight = Dimensions.get('window').height  ;
const styles = StyleSheet.create({

  inputContainer: {
    flex:1,
    margin:20, 
    marginTop:10,
    marginBottom:0   
  },
  input: {
    textAlign: 'center',
    fontSize: 18,
    color: '#FF4470',
    fontWeight: 'bold',
  },
  username: {
    marginTop:10,
    textAlign: 'center',
    fontSize: 23,
    fontWeight: 'bold',
  },
  imageContainer:{  
    marginTop: 25,
    flex:0.3,
  },
  profilePictureContainer: {
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center"
  },
  profilePicture: {
    width: 140,
    height: 140,
    borderRadius: 70,
    marginBottom: 5,
  },
  buttongrop: {
    flex:1,
    justifyContent:'center',
  },
});

class Profile extends React.Component {
  constructor(props) {
   
    super(props);
    this.exit = this.exit.bind(this); 
    this.state={user:"hi" , loading:false};
  }

  componentWillUnmount () {
    this._mounted = false;
    }

  exit(){
    BackAndroid.exitApp();   
  }
   componentWillMount() {
   /* var user = firebase.auth().currentUser;

     user.sendEmailVerification().then(function() {
    alert("hi")
  }, function(error) {
    // An error happened.
  });
*/
 /*   var auth = firebase.auth();
    var emailAddress = "emsfoit@gmail.com";

    auth.sendPasswordResetEmail(emailAddress).then(function() {
     alert("Hi")
    }, function(error) {
      // An error happened.
    });
*/
  }  


  componentDidMount() {
    console.log(currentUserGlobal)
   this._mounted = true;
   var self=this;
   BackAndroid.addEventListener('hardwareBackPress', () => {
    self.exit();
    return true;
    });
  }
  logout() {
    // logout, once that is complete, return the user to the login screen.
    AsyncStorage.removeItem('userData').then(() => {
      firebase.auth().signOut().then(() => {
        this.props.replaceRoute(Routes.Login());
      });  
    });

  }
  goToHome()
  {
    this.props.replaceRoute(Routes.Home());
  }
   goToAddwords()
  {
    this.props.replaceRoute(Routes.Addwords());
  }
  goToWish()
  {
    this.props.replaceRoute(Routes.wishlist());
  }
  goToPendingOffers()
  {
    this.props.replaceRoute(Routes.PendingOffers());
  }
  render() {
    var content = this.state.loading ? "Hi" : this.state.user.desplayName ;
             
    const TopNavigation = () => (
      <View style={{ padding: 10, flexDirection: 'row', backgroundColor: '#FF5C7E' }}>
      <View style={{ flex:0.4 , justifyContent:'center' , margin:5  }}>
      </View>
      <View style={{ flex:0.2 , alignItems:'center', justifyContent:'center'   }}>
      <Image
      source={require('keywords/src/img/f.png')}
      style={{width:45, height:45}}
      />
      </View>
      <View style={{ flex:0.4 , alignItems:'flex-end', justifyContent:'center' , margin:5  }}>
      <IcoButton
      source={require('keywords/src/img/swop.png')}
      onPress={this.goToHome.bind(this)}
      icostyle={{width:35, height:35}}
      />
      </View>

      </View>
      );
    return (

      <View style={{  flex:1, backgroundColor:'white',   }}>
      <TopNavigation/>  
      <View style={styles.imageContainer}>
      <View
      style={styles.profilePictureContainer}
      >       
      <View style = {styles.profilePicture}>
        <Image
        source={require('../img/userTemp.png')}
        style={styles.profilePicture}
        >

        </Image>

        
      </View>
   
     
      </View>
       <View>
        <Text
       style={styles.username}
       >Guten Tag</Text>
       <Text
       style={styles.username}
       >{currentUserGlobal.displayName}</Text>
       </View>       
      </View>



      <View style= {{flex:0.3,marginTop:70,alignItems:'center' , }}>
      <View style = {styles.buttongrop} >

    
      <IconButton     
      container={{flex:1}}
      withoutlike={true}
      value={"Add new words"}
      source={require('../img/box.png')}
      icostyle={{ width:30,
        height: 30,
        marginLeft:3}}
        onPress={this.goToAddwords.bind(this)}
        />

        <IconButton
        container={{  flex: 1 ,flexDirection: "row" }}
        withoutlike={true}
        value={"Einstellungen"}
        source={require('../img/tools.png')}
        //onPress={this.logout.bind(this)}
        />

     
     
        <IconButton
        container={{  flex: 1 , flexDirection: "row" }}
        withoutlike={true}
        value={"abmeleden"}
        source={require('../img/wunsch.png')}
         onPress={this.logout.bind(this)}
        />

       
 

      
        </View>
        </View>

        <View style = {{flex:0.1,marginBottom:10,justifyContent:'flex-end',  alignItems:'center'}}>

        <Image

        source={require('../img/ifunshare.png')}
        style={{height:50, width:170 }}

        />

        </View>

        </View>

        );
      }
 

      addstuff() {

        //this.props.replaceRoute(Routes.addstuff());

      }

      goTomysuff() {

        //this.props.replaceRoute(Routes.mystuff());

      }
      goToAcceptedOffers() {

        //this.props.replaceRoute(Routes.AcceptedOffers());

      }

      goToSetting() {

        //this.props.replaceRoute(Routes.setting());

      }

_onLoadUserCompleted(user) {
 
}

_onLogout() {
  this.props.replaceRoute(Routes.login());
}



onOnboardStarted(url) {


  Actions.onboard(url);
}

 




}


export default Profile;