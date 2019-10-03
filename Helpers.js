import { Text, Linking } from 'react-native';
import { WebView } from 'react-native-webview';
import util from 'react-native-util';
import * as FileSystem from 'expo-file-system';
import * as WebBrowser from 'expo-web-browser';
import * as Permissions from 'expo-permissions';
import { Notifications } from 'expo';
 
 
  export async function download(url){
	 //result = await WebBrowser.openBrowserAsync(url);
	 result = await Linking.openURL(url);
	 console.log(result);
  }
  
    export function tryParseJSON(jsonString){
    try {
        var o = JSON.parse(jsonString);

        // Handle non-exception-throwing cases:
        // Neither JSON.parse(false) or JSON.parse(1234) throw errors, hence the type-checking,
        // but... JSON.parse(null) returns null, and typeof null === "object", 
        // so we must check for that, too. Thankfully, null is falsey, so this suffices:
        if (o && typeof o === "object") {
            return o;
        }
    }
    catch (e) { }

    return false;
}
  
    export async function handlePostMessageAsync(msgg){
	  let uu = ""; //main url to launch in browser  
	  let uc = ""; //user cookie
	  let au = "" //active user
	  
	  console.log("posted message: " + msgg);
	  parsedMsg = this.tryParseJSON(msgg);
	  
	  if(parsedMsg){
		  console.log("parsed message\n\nschool code: " + parsedMsg.userCook + "\nusername: " + parsedMsg.activeUser);
          uc = parsedMsg.userCook;	  
          au = parsedMsg.activeUser;	  
          cid = parsedMsg.cid;	  
		//this.setState({userCook: parsedMsg.userCook,activeUser: parsedMsg.activeUser});
	    postData = parsedMsg.data;
	  }
	  else{
		  postData = msgg;
	  }
	  console.log("postData: " + postData);
	  
	  if(postData === 'notification'){
		  this.registerForPushNotificationsAsync(parsedMsg);
	  }
	  else if(postData === 'logout'){
		  this.logout();
	  }
	  else{
		   this.download(postData);
		 /*
	  let msgArr = postData.split('|');
	  //let result = null;
	  
	  if(msgArr[0] == "report"){
		  uu = msgArr[1];
		  ffname = FileSystem.documentDirectory + "eschoolng.pdf";
		   console.log("report card script to download: " + uu);
           this.download(uu);
	  }
	  else if(msgArr[0] == "assignment"){
		  msg = msgArr[1];
		  let nmsg = msg.substr(3);
	      uu = "https://eschoolng.net/" + uc + "/" + nmsg;
		   console.log("assignment file to download: " + uu);
	      fnameArr =  msg.split('/');
	      ffname = FileSystem.documentDirectory + fnameArr[3];	  
          this.download(uu);
	  }
	  
	  */
	  
	  /**
	  else if(msgArr[0] == "assignment"){
		  msg = msgArr[1];
		  let nmsg = msg.substr(3);
	      uu = "https://eschoolng.net/berkley/" + nmsg;
		   console.log("assignment file to download: " + uu);
	      fnameArr =  msg.split('/');
	      ffname = FileSystem.documentDirectory + fnameArr[3];
		  
		  let result = await WebBrowser.openBrowserAsync(uu);
	  if(result.type == "opened"){
		  dmb = WebBrowser.dismissBrowser();
	  }
	  console.log(result);
	  }
	  

	
	 //alert(msg);
	 
	 //We have the URI, download the file to Documents
	 
	 //iOS
	 /*
	 if(Platform.OS === 'ios'){
	 
     }
     else if(Platform.OS === 'android'){
		 CameraRoll.saveToCameraRoll( uu, 'photo');
	 }	 
	 **/
	  }
   }
  
  
    export async function _getPermissionAsync(){
  //const { status, permissions } = await Permissions.askAsync(Permissions.READ_EXTERNAL_STORAGE,Permissions.WRITE_EXTERNAL_STORAGE,Permissions.CAMERA);
 // const {cp} = await Permissions.askAsync(Permissions.READ_EXTERNAL_STORAGE);
  //const {wes} = await Permissions.askAsync(Permissions.WRITE_EXTERNAL_STORAGE);
  const {wen} = await Permissions.askAsync(Permissions.NOTIFICATIONS);

  if (wen === 'granted') {
    console.log('permissions granted');
  } else {
    throw new Error('permissions not granted');
  }
}




export async function registerForPushNotificationsAsync(pm) {
	const PUSH_ENDPOINT = 'https://whispering-river-45224.herokuapp.com/push-token';
	//const PUSH_ENDPOINT = encodeURIComponent(`https://www.eschoolng.net/mobileapp/expo_url.php?ppp=n`);
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  let finalStatus = existingStatus;

  // only ask if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  if (existingStatus !== 'granted') {
    // Android remote notification permissions are granted during the app
    // install, so this will only ask on iOS
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }

  // Stop here if the user did not grant permissions
  if (finalStatus !== 'granted') {
    return;
  }

  // Get the token that uniquely identifies this device
  let token = await Notifications.getExpoPushTokenAsync();

  // POST the token to your backend server from where you can retrieve it to send push notifications.
  let upu = PUSH_ENDPOINT + "?tk=" + token + "&sc=" + pm.userCook + "&au=" + pm.activeUser + "&cid=" + pm.cid;
  return fetch(upu, {
    method: 'GET'
  })
  .then(response => {
	    console.log(`response: ${response}`);
         if(response.status === 200){
			   //console.log(response);
			   
			   return response.json();
		   }
		   else{
			   return {status: "error:", message: "Couldn't fetch push endpoint url"};
		   }
		   })
    .catch(error => {
		   console.log(`Failed to fetch push endpoint ${PUSH_ENDPOINT}: ${error}`);		
	   })
	   .then(res => {
		   console.log(res); 
		   
		   
	   }).catch(error => {
		   console.log(`Unknown error: ${error}`);			
	   });
}

export async function logout() {
	const PUSH_ENDPOINT2 = 'https://powerful-tundra-70186.herokuapp.com/logout';
	//const PUSH_ENDPOINT2 = 'https://www.eschoolng.net/mobileapp/expo_url.php?ppp=l';
 
  // Get the token that uniquely identifies this device
  let token = await Notifications.getExpoPushTokenAsync();

  // POST the token to your backend server from where you can retrieve it to send push notifications.
  let upu = PUSH_ENDPOINT2 + "?tk=" + token;
  return fetch(upu, {
    method: 'GET'
  });
}

