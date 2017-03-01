'use strict';
import React , {Component} from 'react';
import {
  Platform,
  Switch,
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  BackAndroid,
  Dimensions,
  Modal,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
  ListView
} from'react-native';
import IcoButton from './src/components/icobutton';
import SwipeCards from 'react-native-swipe-cards';
import firebase from 'firebase';
var deviceheight = Dimensions.get('window').height/(3/2)  ;
var deviceWidth = Dimensions.get('window').width-30  ;
var modalheight = Dimensions.get('window').height/2 ;
var Cards = [];
const imagesViewer = [];
var currentLikedItem = null;
let NoMoreCards = React.createClass({
  getInitialState () {
        return {
          dataSource: new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
          }),
          visible: false,
          title:"this.props.info.title",
          desc:"this.props.info.description",
          piclink:"this.props.info.image",
          goback:"this.props.info.goback",
          username:"this.props.info.username",
          uidOfLikedItem:"this.props.info.uidOfLikedItem",
          keyOfWantedItem:"this.props.info.keyOfWantedItem",
          category:"this.props.info.category",
          search:"this.props.info.search",
          offerData:null,
          modalVisible:false
        };
      },
  render() {

    return (
      <View style={styles.noMoreCards}>
       <Text style = {{fontSize:19 ,  textAlign: 'center',}}>Diese Kategorie enthält noch keine Objekte, bitte versuche es mit einer anderen Kategorie</Text>
      </View>
      )
  }
})




const Cards2 = [

]

export default React.createClass({
    componentDidMount() {

      this._mounted = true;
      var self = this;
      this.getItems().then((rm) => {
        if (this._mounted){
          this.setState({
          cards:rm,
          outOfCards: false
        }) 
        }
      });
    },
    componentWillUnmount() {
      this._mounted = false;
      //Cards=[];
    },
    getInitialState() {
      return {
        loading:false,
        cards: Cards,
        outOfCards: false,
        modalVisible:false,
        hideword:20,
        hidemeaning:20,
        index:0,

      }
    },
 
  Card(x) {
      currentLikedItem=x;
     return (
       <View style={styles.container}>

       <View style={styles.card}>
       <View style = {styles.row}>
        <Text
        onPress={()=> this.pronounce(x.w1)}
        style={[styles.textinput,{fontSize:this.state.hideword}]}>
        {x.w1}
        </Text>
        <Text
        style={[styles.textinput1, {fontSize:this.state.hidemeaning}]}>
        {x.w2}
        </Text>
       </View>  
        <View style = {styles.row}>
          <Text
         style={[styles.textinput,{fontSize:this.state.hideword}]}>
        {x.w3}
        </Text>
          <Text
        style={[styles.textinput1, {fontSize:this.state.hidemeaning}]}>
        {x.w4}
        </Text>
       </View>  
            <View style = {styles.row}>
          <Text
         style={[styles.textinput,{fontSize:this.state.hideword}]}>
        {x.w5}
        </Text>
          <Text
        style={[styles.textinput1, {fontSize:this.state.hidemeaning}]}>
        {x.w6}
        </Text>
       </View>  
        <View style = {styles.row}>
        <Text
         style={[styles.textinput,{fontSize:this.state.hideword}]}>
        {x.w7}
        </Text>
        <Text
        style={[styles.textinput1, {fontSize:this.state.hidemeaning}]}>
        {x.w8}
        </Text>
       </View>
        <View style = {{flex:1,alignItems:'center', justifyContent:'center'}}>
        <Text
        style={{fontSize:14}}>
        {x.number}
        </Text>
       </View>      
       </View>

        </View>  

      )
    },
  handleYup (card) {
   
  },
  handleNope(card) {
     if(this._mounted)
      this.setState({hidemeaning:20,hideword:20});
   this.refs['swiper']._goToPrevCard();
  },
  cardRemoved (index) {
    console.log(`The index is ${index}`);
 
    let CARD_REFRESH_LIMIT = 3
 
    if (this.state.cards.length - index <= CARD_REFRESH_LIMIT + 1) {
      console.log(`There are only ${this.state.cards.length - index - 1} cards left.`);
 
      if (!this.state.outOfCards) {
        console.log(`Adding ${Cards2.length} more cards`)
 
        this.setState({
          cards: this.state.cards.concat(Cards2),
          outOfCards: true
        })
      }
 
    }
 
  },
    getItems(){
      var uid = currentUserGlobal.uid;
      var group = currentUserGroup;
      var self = this ;
      var ar = [];
       Cards= [];
      if(this.props.favorite){
       var refrence =  firebase.database()
      .ref('profiles')
      .child(uid)
      .child(group)
      .child('favorite');
      }
       else{
         var refrence =  firebase.database()
        .ref('Group')
        .child(currentUserGroup);
       }       
      return new Promise((next, error) => {
        var i = 0;
        var num=0;
        refrence
        .once('value', function(snapshot){
          num =snapshot.numChildren();
           refrence
           .once('value', function(snapshot){
            snapshot.forEach(function(childSnapshot) {
            refrence.child(childSnapshot.key).once('value').then(function(snapshot) {
              var w1 = snapshot.val().w1;
              var w2 = snapshot.val().w2;
              var w3 = snapshot.val().w3;
              var w4 = snapshot.val().w4;
              var w5 = snapshot.val().w5;
              var w6 = snapshot.val().w6;
              var w7 = snapshot.val().w7;
              var w8 = snapshot.val().w8;
              var keyOfWords = snapshot.key;
              var uidOfOwner=snapshot.val().uid;
              var number =i;
              // console.log(uidOfLikedItem);
              var im = {w1:w1 ,w2:w2 , w3:w3 , w4:w4 , w5:w5, w6:w6 , w7:w7 , w8:w8,number:number,keyOfWords:keyOfWords,uidOfOwner:uidOfOwner  }   
              ar.push(im);
              i++;
              if (i==num){
               
                self.reflectArray(ar).then((rm) => {
                Cards = rm 
                });
                
                
                next(Cards);
              }

            });
          });
         })
       
         
        });
      }); 
      

    },

    reflectArray(array)
    { if (this._mounted){
        this.setState({loading:false});
      }
      return new Promise((next, error) => {
      let reflect = [];
      for(var i=array.length-1 ; i>= 0 ; i --)
      {
        Cards.push(array[i]);
      }
    })
      next(Cards);

    },
 
    addtofavorite (x){
        var group = currentUserGroup;
        var today = new Date();
       var dd = today.getDate();
       var mm = today.getMonth()+1; //January is 0!
       var yyyy = today.getFullYear();
       var uid = currentUserGlobal.uid;
       var username = currentUserGlobal.displayName;
       if(dd<10) {
           dd='0'+dd
       } 
   
       if(mm<10) {
           mm='0'+mm
       } 
       today = dd+'/'+mm+'/'+yyyy;
      var favoriteref= firebase.database()
        .ref('profiles')
        .child(uid)
        .child(group)
        .child('favorite');
      if(x)
      {
        favoriteref.once("value")
        .then(function(snapshot) {
          var hasName = snapshot.hasChild(x.keyOfWords);
          if (hasName){
           favoriteref.child(x.keyOfWords).remove().then(function(){
             alert("Item removed from favorite Items");
            });
          }
          else {
            var favData = {
               w1:x.w1,
               w2:x.w2,
               w3:x.w3,
               w4:x.w4,
               w5:x.w5,
               w6:x.w6,
               w7:x.w7,
               w8:x.w8,
               uid:uid,
               username:username,
               starCount: 0,
               date: today
            };        
            var uploadTask = favoriteref
            .child(x.keyOfWords);
            var favoriteKey = uploadTask.set(favData);
            alert("Item has been added to favorite");
         }    
        });       
      }
    },
    _goToPrevCard(card) {
      if(card)
      this.refs['swiper']._goToPrevCard()
    },
    hideword(){
      if(this.state.hidemeaning!=20)
        this.setState({hidemeaning:20});
      if(this.state.hideword==20)
        this.setState({hideword:1});
      else
        this.setState({hideword:20});
    },
      hidemeaning(){
        if(this.state.hideword!=20)
        this.setState({hideword:20});
      if(this.state.hidemeaning==20)
        this.setState({hidemeaning:1});
      else
        this.setState({hidemeaning:20});
    },
  pronounce(x){
    tts.speak({
    text:'Please provide some text to speak.', // Mandatory 
    pitch:1.5, // Optional Parameter to set the pitch of Speech, 
    forceStop : false , //  Optional Parameter if true , it will stop TTS if it is already in process 
    language : 'en' // Optional Paramenter Default is en you can provide any supported lang by TTS 
}).then(isSpeaking=>{
    alert("Hi")
    console.log(isSpeaking);
}).catch(error=>{
    //Errror Callback 
    console.log(error)
});
  },
    render() {


      return (
      <View style = {{flex:1, alignItems:'center'}} >
        
      
      <View style= {{flex:1.1}} >
      
      <SwipeCards

      ref = {'swiper'}
      cards={this.state.cards}
      loop={true}
      containerStyle = {{flex:1,  backgroundColor: 'white',justifyContent:'center', alignItems:'center', marginTop:10}}
      renderCard={(cardData) => this.Card(cardData)}  
      renderNoMoreCards={() => <NoMoreCards />}
      showYup={false}
      showNope={false}
      handleYup={this.handleYup}
      handleNope={this.handleYup}
      cardRemoved={this.cardRemoved}
      />
      </View>


      <View style = {{ flex:0.2 , justifyContent:'flex-end'}}>
      <View style={{flex : 1 ,flexDirection:'row' ,width:deviceWidth , alignItems:'flex-end'}}>
       <View style={{position:'absolute', bottom:10,width:deviceWidth  ,flex:1,flexDirection:'row',alignItems:'center', justifyContent:'center'}}>
       <View style ={{flex:0.12,alignItems:'center'}}/>
      <View style={{flex:0.25,alignItems:'center'}}>
      <IcoButton
      onPress={() => this.hideword()}
      source={require('./src/img/red.png')}
      icostyle={{width:60, height:60}}
      />
      </View>
      <View style={{flex:0.25,alignItems:'center'}}>
      <IcoButton

      source={require('./src/img/addtofavorites.png')}
      onPress={()=>{this.addtofavorite(currentLikedItem)}}
      icostyle={{width:45, height:45}}
      />
      </View>

      <View style={{flex:0.25,alignItems:'center'}}>
      <IcoButton
      onPress={() =>this.hidemeaning()}
      source={require('./src/img/black.png')}
      icostyle={{width:60, height:60}}
      />
      </View>
      <View style ={{flex:0.12,alignItems:'center'}}/>
      
      </View>
      </View> 

      </View>

      </View>
      )
    }
  })

  const styles = StyleSheet.create({
    card: {

      width: deviceWidth,
      height: deviceheight,
      borderWidth:2,
      borderColor:'#e3e3e3',
      borderRadius:2,
    },
    thumbnail: {
      borderRadius:2,
      flex:1,
      width:deviceWidth, 
      height:deviceheight-50
    },
    text: {
      fontSize: 20,
      padding:10,
    },
    noMoreCards: {
      flex: 1,
      backgroundColor:'white',
      height:deviceheight+10,
      width:deviceWidth,
      justifyContent: 'center',
      alignItems: 'center',
    },
  row:{
    width:deviceWidth,
    height:deviceheight/4-5,
    borderColor:"white",
    borderWidth:1,
    flexDirection:'row'
  },
   textinput: {
    color: 'white',
    backgroundColor:'#222d59',
    fontSize: 20,
    flex: 0.5,
    textAlign: 'center',
    borderColor:'black',
    textAlignVertical: 'center' 
  },
 textinput1: {
  color: 'white',
  backgroundColor:'#592252',
  fontSize: 20,
  flex: 0.5,
  textAlign: 'center',
  textAlignVertical: 'center' 
  },
  })