import React from 'react';
import { View, ScrollView, StyleSheet, Platform, StatusBar, CameraRoll} from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import { Text, Linking } from 'react-native';
import { WebView } from 'react-native-webview';
import CStatusBar from '../components/CStatusBar';
import * as helpers from '../Helpers';
import util from 'react-native-util';
import * as FileSystem from 'expo-file-system';
import * as WebBrowser from 'expo-web-browser';
import * as Permissions from 'expo-permissions';
import { Notifications } from 'expo';

//var RNFS = require('react-native-fs');

export default class WebScreen extends React.Component { 
  static navigationOptions = {
       header: null
	  };

  state = {
	userCook: "",
	activeUser: ""
  };
  static navigatorStyle = {
    tabBarHidden: true,
}

  render() {
    return (
	       <View style={{flex: 1}}>
	       <CStatusBar backgroundColor="#2EBD6B" barStyle="light-content" />		   
           <WebView 
		    source={{ uri: 'https://eschoolng.net/mobileapp' }} 
		    style={{flex: 1}}
			startInLoadingState={true}
            allowUniversalAccessFromFileURLs={true}
            javaScriptEnabled={true}
            mixedContentMode={'always'}
			onMessage={event => {
               helpers.handlePostMessageAsync(event.nativeEvent.data);
            }}
            onNavigationStateChange={this.handleNavStateChange}
		   />
		   </View>
    );
  }
  
      handleNavStateChange = newNavState => {
	 const { url } = newNavState;
	 	 if (!url) return;
	// console.log("url: " + url);
	 if(url.includes("admin/assignment")){
		 this.webview.stopLoading();
		 console.log("url: " + url);
	 }

  };
}

const styles = StyleSheet.create({ 
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
