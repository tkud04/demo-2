import React from 'react';
import { View, ScrollView, StyleSheet, Platform, StatusBar} from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import { Text } from 'react-native';
import { WebView } from 'react-native-webview';
import CStatusBar from '../components/CStatusBar';
import RNFetchBlob from 'rn-fetch-blob';
var RNFS = require('react-native-fs');

export default class WebScreen extends React.Component { 
  static navigationOptions = {
       header: null
	  };

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
            onNavigationStateChange={(result) =>  this.handleDownload(result)}
		   />
		   </View>
    );
  }
  
  
  handleDownload(input){
	  console.log("result: " + input);
  }
  handleUrlWithZip(input) {

    //check if have another download
    //if (this.state.downloadStart == true || /*input.url.toLowerCase().includes('.zip') == false*/ ) {
    if (this.state.downloadStart == true) {
      return;
    } else {
      this.setState({ downloadStart: true, showModalLoading: true })
    } 

    const directoryFile = RNFS.ExternalStorageDirectoryPath + '/EschoolDownloads/';

    //Creating folder
    if (RNFS.exists(directoryFile)) {

      RNFS.unlink(directoryFile)
        .then(() => {
          console.log('FOLDER/FILE DELETED');
        })
        // `unlink` will throw an error, if the item to unlink does not exist
        .catch((err) => {
          console.log('CANT DELETE', err.message);
          this.setState({ showError: true })
        });

      RNFS.mkdir(directoryFile)
    }

    //If folder is created
    if (input) {
      //Verifing if the url have a .zip file
      if (/*input.url.toLowerCase().includes('.zip')*/true) {
        const urlDownload = input.url;

        let fileName;
        try {
          //fileName = urlDownload.substr(urlDownload.lastIndexOf('/')).replace('.zip', '') + '.zip';
          fileName = urlDownload;
        } catch (e) {
          console.log(e);
          fileName = 'example.zip'
        }

        console.log('URL = ' + urlDownload)

        //Downloading the file on a folder
        let dirs = directoryFile + '/' + fileName;
        RNFetchBlob
          .config({
            // response data will be saved to this path if it has access right.
            path: dirs
          })
          .fetch('GET', urlDownload, {
            //some headers ..
          })
          .progress((received, total) => {
            console.log('progress', received / total)
          })
          .then((res) => {
            // the path should be dirs.DocumentDir + 'path-to-file.anything'
            console.log('The file saved to ', res.path())

            //Acabou o download do arquivo
            this.setState({
              downloadStart: false, showModalLoading: false,
              showFileExplorer: true, startFolder: directoryFile
            })
          })
      }
    }
  }
  
  
}

const styles = StyleSheet.create({ 
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
