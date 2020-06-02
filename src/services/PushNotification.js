
// import PushNotification from 'react-native-push-notification'
import messaging from '@react-native-firebase/messaging';
// import firebase from 'react-native-firebase';
// const Sound = require('react-native-sound');

export async function pushLocalNotification(notification){
console.log(notification.title)
// Sound.setCategory('Playback')
// const sound = new Sound('my_sound', Sound.MAIN_BUNDLE, () => {
//   sound.play()
// })
// console.log(notification)

// .setNotificationId(notification.notificationId)
// .setTitle(notification.title)
// .setBody(notification.body)
// .android.setChannelId('default')
// .android.setVibrate(200)
// .android.setColor('#000000')
// .android.setPriority(firebase.notifications.Android.Priority.High)
// .android.setGroupAlertBehaviour(firebase.notifications.Android.GroupAlert.All)
// .android.setCategory(firebase.notifications.Android.Category.Alarm)
// .android.setVisibility(firebase.notifications.Android.Visibility.Public)
// .setData(notification.body);


// const localNotification = new firebase.notifications.Notification({
//   sound: 'default',
//   show_in_foreground: true
// })
// .setNotificationId(notification.notificationId)
// .setTitle(notification.title)
// .android.setPriority(firebase.notifications.Android.Priority.High)
// .android.setVisibility(firebase.notifications.Android.Visibility.Public)
// .android.setVibrate(200)
// .setBody(notification.body)
// .setData({})

// localNotification.android.setChannelId('default')
// firebase.notifications().displayNotification(localNotification)
}

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