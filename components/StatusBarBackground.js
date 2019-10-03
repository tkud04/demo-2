'use strict'
import React, {Component} from 'react';
import {View, Text, StyleSheet, Platform, StatusBar} from 'react-native';

class StatusBarBackground extends Component{
  render(){
    return(
      <Text style={[styles.statusBarBackground, this.props.style || {}]}> //This part is just so you can change the color of the status bar from the parents by passing it as a prop
      </Text>
    );
  }
}

const styles = StyleSheet.create({
  statusBarBackground: {
    height: (Platform.OS === 'ios') ? 18 : StatusBar.currentHeight , //this is just to test if the platform is iOS to give it a height of 18, else, no height (Android apps have their own status bar)
    backgroundColor: "white",
  }

})

module.exports= StatusBarBackground;