'use strict'
import React, {Component} from 'react';
import {View, Platform, StatusBar} from 'react-native';

class CStatusBar extends Component{
  render(){
	  const height = (Platform.OS === 'ios') ? 20 : StatusBar.currentHeight;
    const { backgroundColor } = this.props;
    return(
      <View style={{ height, backgroundColor }}>
            <StatusBar { ...this.props } />
        </View>
    );
  }
}

module.exports= CStatusBar;