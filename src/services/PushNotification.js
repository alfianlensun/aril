
// import PushNotification from 'react-native-push-notification'
import messaging from '@react-native-firebase/messaging';
// import firebase from 'react-native-firebase';
// const Sound = require('react-native-sound');


export async function requestUserPermission() {
	const settings = await messaging().requestPermission();
	if (settings) {
				
	}
	
  }


export async function getPushNotificationToken(){
	try {
		return await messaging().getToken()
	} catch(err){
		console.log(err)
	}
}

export async function checkPushNotificationPermission() {
	const enabled = await messaging().hasPermission();
	return enabled
}


export async function requestPermission() {
	try {
		await firebase.messaging().requestPermission();
	} catch (error) {
		throw new Error('Permission rejected')
	}
}


export async function createNotificationListeners() {
firebase.notifications().onNotification(pushLocalNotification)
}