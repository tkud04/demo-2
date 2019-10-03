import React from 'react';
import { View, ScrollView, StyleSheet, Platform, StatusBar} from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import { Text } from 'react-native';
import { WebView } from 'react-native-webview';
import CStatusBar from '../components/CStatusBar';
import util from 'react-native-util';
//var RNFS = require('react-native-fs');

export default class PracticeScreen extends React.Component { 
  static navigationOptions = {
       header: null
	  };

  render() {
	  const html = `
      <html>
      <head></head>
      <body>
        <script>
          setTimeout(function () {
            window.ReactNativeWebView.postMessage("Hello!")
          }, 2000)
        </script>
      </body>
      </html>
    `;
    return (
	       <View style={{flex: 1}}>
	       <CStatusBar backgroundColor="#2EBD6B" barStyle="light-content" />		   
           <WebView 
		    source={{ html }} 
		    style={{flex: 1}}
			onMessage={event => {
               alert(event.nativeEvent.data);
            }}
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
