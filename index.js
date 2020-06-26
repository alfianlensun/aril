/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import 'react-native-gesture-handler';
import messaging from '@react-native-firebase/messaging';
import {name as appName} from './app.json';
console.disableYellowBox = true;

messaging().setBackgroundMessageHandler(async remoteMessage => {
    
});
AppRegistry.registerComponent(appName, () => App);

