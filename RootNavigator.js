
'use strict';
import React, { Component } from 'react';
import  {
  Navigator,
  ActivityIndicator,
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity,
  BackAndroid,
  PropTypes,
  Image,
  View,
  AsyncStorage
} from 'react-native';
import Routes from './Routes';



const styles = StyleSheet.create({
  sceneContainer: {
    flex: 1
  },
});



export default class RootNavigator extends React.Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {

  }

  componentWillUnmount() {
    if (this._listeners)
      this._listeners.forEach((listener) => listener.remove());
  }

  onNavWillFocus(route) {

  }
 

  render() {




    return (
      <Navigator
      ref={(navigator) => this._setNavigatorRef(navigator)}
      initialRoute={this._getInitialRoute()}
      renderScene={(route, navigator) => this.renderScene(route, navigator)}
      />
      );
    }

    _setNavigatorRef(navigator) {
      if (navigator !== this.navigator) {
        this.navigator = navigator;

        if (navigator) {
          this._listeners = [
          navigator.navigationContext.addListener("willfocus", this.onNavWillFocus.bind(this))
          ];
        } else {
          if (this._listeners)
            this._listeners.forEach((listener) => listener.remove());
        }
      }
    }

       _getInitialRoute() {
        if(currentUserGlobal)
          return Routes.Home();
        else
          return Routes.Login();
      }


    renderScene(route, navigator) {

      return (
      <View style={styles.sceneContainer}>
      <route.component
      {...route.passProps}
      navigator={navigator}
      replaceRoute={(route, args) => this.replaceRoute(route, args)}
      />
      </View>
      )
    }

 
 
 
    replaceRoute(route, args) {
      if ("string" != typeof route || (route = Routes.get(route, args))) {
        this.navigator.replace(route);
      }
    }

 
 


  }