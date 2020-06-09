/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect,useState, Component, useRef } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, CardStyleInterpolators, TransitionPresets} from '@react-navigation/stack';
import Splash from './src/scenes/Splash'
import Login from './src/scenes/Login'
import SignUp from './src/scenes/signup/SignUp'
import SignUpStep2 from './src/scenes/signup/SignUpStep2'
import SignUpStep3 from './src/scenes/signup/SignUpStep3'
import MainMenu from './src/scenes/MainMenu'
import Tindakan from './src/scenes/moduls/tindakan/Tindakan'
import TindakanDetail from './src/scenes/moduls/tindakan/TindakanDetail'
import Bed from './src/scenes/moduls/bed/Bed'
import BedDetail from './src/scenes/moduls/bed/BedDetail';
import BedList from './src/scenes/moduls/bed/BedList';
import GantiPassword from './src/scenes/admin/settinguser/GantiPassword';
import InfoPribadi from './src/scenes/moduls/profil/InfoPribadi';
import Absen from './src/scenes/moduls/absen/Absen'
import Visite from './src/scenes/moduls/visite/Visite'
import ScanNorm from './src/scenes/moduls/general/ScanNorm';
import CariPasien from './src/scenes/moduls/general/CariPasien';
import DetailPasien from './src/scenes/moduls/general/DetailPasien';
import DataDiriPasien from './src/scenes/moduls/general/DataDiriPasien';
import RiwayatPendaftaranPasien from './src/scenes/moduls/general/RiwayatPendaftaranPasien';
import FormKeluarBed from './src/scenes/moduls/bed/FormKeluarBed';
import AktivitasHarianPegawai from './src/scenes/moduls/sdm/AktivitasHarianPegawai';
import RekapAktivitasHarianPegawai from './src/scenes/moduls/sdm/RekapAktivitasHarianPegawai';
import SettingUser from './src/scenes/admin/settinguser/SettingUser'
import SettingUserDetail from './src/scenes/admin/settinguser/SettingUserDetail'
import SettingAplikasi from './src/scenes/admin/settingaplikasi/SettingAplikasi';
import SettingAplikasiGeofence from './src/scenes/admin/settingaplikasi/SettingAplikasiGeofence';
import messaging from '@react-native-firebase/messaging';
import Setting from './src/scenes/user/Setting';
import FacialRecognitionIfExist from './src/scenes/moduls/facialrecognition/FacialRecognitionIfExist';
import FacialRecognitionDaftar from './src/scenes/moduls/facialrecognition/FacialRecognitionDaftar';
import UpdateApp from './src/scenes/UpdateApp';
import ValidasiModul from './src/scenes/moduls/general/ValidasiModul';
import FacialRecognitionIfNotExist from './src/scenes/moduls/facialrecognition/FacialRecognitionIfNotExist';
import DaftarMobileAbsen from './src/scenes/moduls/absen/daftar/DaftarMobileAbsen';
import DaftarMobileAbsenIfExist from './src/scenes/moduls/absen/daftar/DaftarMobileAbsenIfExist';
import ListRequest from './src/scenes/moduls/absen/daftar/ListRequest';
import VerifikasiRequest from './src/scenes/moduls/absen/daftar/VerifikasiRequest';
import PermissionRequest from './src/scenes/PermissionRequest';
import NetInfo from "@react-native-community/netinfo";
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import AllReducer from './src/reducers/AllReducer'
import TestingVideo from './src/scenes/videocall/Testing';
import VideoCall from './src/scenes/videocall/VideoCall';
import RiwayatKredensial from './src/scenes/moduls/kredensial/RiwayatKredensial';
import ListUserChat from './src/scenes/moduls/chat/ListUserChat';
import ChatDetail from './src/scenes/moduls/chat/ChatDetail';
import { getData } from './src/services/LocalStorage';
import io from 'socket.io-client'
import codePush from 'react-native-code-push'
import About from './src/scenes/About';
import ListUnitKerja from './src/scenes/moduls/absen/monitoring/ListUnitKerja';
import { BackHandler } from 'react-native';
import MonitoringAbsen from './src/scenes/moduls/absen/monitoring/MonitoringAbsen';


const store = createStore(AllReducer)
const Stack = createStackNavigator()
// const sliderUpNetwork = useRef();
class App extends Component {
	constructor(props){
		super(props)
		this.state = {
			initialRoute: 'Splash',
			sliderUpContentHeight: 200,
			allowDragging: false,
			showErrorConnection: false,
			messageErrorConnection: '',
			userdata: null
		}
	}

	async componentDidMount(){
		await messaging().registerDeviceForRemoteMessages()
		const userdata = await getData('AuthUser')
		
		messaging().onNotificationOpenedApp(remoteMessage => {
			console.log(
				'Notification caused app to open from background state:',
				remoteMessage.notification,
			);
			this.props.navigation.navigate(remoteMessage.data.auto_load_menu.navigateTo !== '' ? data.auto_load_menu.navigateTo : 'Splash');
		});
	  
		messaging()
			.getInitialNotification()
			.then(remoteMessage => {
				console.log(remoteMessage)
				if (remoteMessage) {
					console.log(
						'Notification caused app to open from quit state:',
						remoteMessage.notification,
					);
					this.setState({initialRoute: remoteMessage.data.auto_load_menu.navigateTo !== '' ? data.auto_load_menu.navigateTo : 'Splash'});
				}
			});

		this.socket = io("http://172.31.64.112:4001/webrtcPeer",{
			query: {}
		});

		if (userdata !== null){
			this.socket.emit('online', {
				userID: userdata._id,
				namaUser: userdata.user_detail.nama_pegawai
			})

			this.socket.on('receive-call', (data) => {
				console.log(data)
				// if (data.sender !== this.state.userdata._id){
				// 	this.setState({
				// 		callerData: data,
				// 		receiveCall: true
				// 	})
				// }
			})
		}

		
		
		this.unsubscribe = messaging().onMessage(async remoteMessage => {
			
		});

		this.netinfo = NetInfo.addEventListener(state => {
			if (state.isConnected){
				this.setState({
					showErrorConnection: false
				})
			} else {
				this.setState({
					showErrorConnection: true,
					messageErrorConnection: 'Anda tidak terhubung dengan server'
				})
			}
		});
		
	}

	componentWillUnmount(){
		this.unsubscribe
		this.netinfo

		messaging().onTokenRefresh(token => {
			
		});
	}
	
	render(){
		return (
			<Provider store={store}>
				<NavigationContainer>
					<Stack.Navigator
						headerMode="none"
						screenOptions={{
						cardStyleInterpolator: 
						CardStyleInterpolators.forHorizontalIOS,
						transitionSpec: {
							open: config,
							close: config
						}
						}}
						animation="fade"
						initialRouteName={this.state.initialRoute}
					>
						<Stack.Screen name="MonitoringAbsen" component={MonitoringAbsen} />
						<Stack.Screen name="ListUserChat" component={ListUserChat} />
						<Stack.Screen name="About" component={About} />
						<Stack.Screen name="ListUnitKerja" component={ListUnitKerja} />
						<Stack.Screen name="VideoCall" component={VideoCall} />
						<Stack.Screen name="ChatDetail" component={ChatDetail} />
						<Stack.Screen name="RiwayatKredensial" component={RiwayatKredensial} />
						<Stack.Screen name="Splash" component={Splash} />
						<Stack.Screen name="ListRequest" component={ListRequest} />
						<Stack.Screen name="PermissionRequest" component={PermissionRequest} />
						<Stack.Screen name="VerifikasiRequest" component={VerifikasiRequest} />
						<Stack.Screen name="ValidasiModul" component={ValidasiModul} />
						<Stack.Screen name="DaftarMobileAbsen" component={DaftarMobileAbsen} />
						<Stack.Screen name="DaftarMobileAbsenIfExist" component={DaftarMobileAbsenIfExist} />
						<Stack.Screen name="UpdateApp" component={UpdateApp} />
						<Stack.Screen name="Login" component={Login} />
						<Stack.Screen name="SignUp" component={SignUp} />
						<Stack.Screen name="SignUpStep2" component={SignUpStep2} />
						<Stack.Screen name="SignUpStep3" component={SignUpStep3} />
						<Stack.Screen name="MainMenu" component={MainMenu} />
						<Stack.Screen name="RekapAktivitasHarianPegawai" component={RekapAktivitasHarianPegawai} />
						<Stack.Screen name="AktivitasHarianPegawai" component={AktivitasHarianPegawai} />
						<Stack.Screen name="SettingUser" component={SettingUser} />
						<Stack.Screen name="SettingUserDetail" component={SettingUserDetail} />
						<Stack.Screen name="FormKeluarBed" component={FormKeluarBed} />
						<Stack.Screen name="ScanNorm" component={ScanNorm} />
						<Stack.Screen name="DataDiriPasien" component={DataDiriPasien} />
						<Stack.Screen name="RiwayatPendaftaranPasien" component={RiwayatPendaftaranPasien} />
						<Stack.Screen name="DetailPasien" component={DetailPasien} />
						<Stack.Screen name="CariPasien" component={CariPasien} />
						<Stack.Screen name="InfoPribadi" component={InfoPribadi} />
						<Stack.Screen name="GantiPassword" component={GantiPassword} />
						<Stack.Screen name="Bed" component={Bed} />
						<Stack.Screen name="BedDetail" component={BedDetail} />
						<Stack.Screen name="BedList" component={BedList} />
						<Stack.Screen name="Absen" component={Absen} />
						<Stack.Screen name="Visite" component={Visite} />
						<Stack.Screen name="Tindakan" component={Tindakan} />
						<Stack.Screen name="TindakanDetail" component={TindakanDetail} />
						{/* <Stack.Screen name="SettingAplikasi" component={SettingAplikasi} /> */}
						{/* <Stack.Screen name="SettingAplikasiGeofence" component={SettingAplikasiGeofence} /> */}
						<Stack.Screen name="Setting" component={Setting} />
						<Stack.Screen name="FacialRecognitionIfExist" component={FacialRecognitionIfExist} />
						<Stack.Screen name="FacialRecognitionIfNotExist" component={FacialRecognitionIfNotExist} />
						<Stack.Screen name="FacialRecognitionDaftar" component={FacialRecognitionDaftar} />
					</Stack.Navigator>				
				</NavigationContainer>
			</Provider>
		);
	}
}


const codePushOptions = {
	checkFrequency: codePush.CheckFrequency.ON_APP_RESUME
}

export default codePush(codePushOptions)(App)

const config = {
	animation: 'spring',
	config: {
		stiffness: 1000,
		damping: 500,
		mass: 3,
		overshootClamping: false,
		restDisplacementThreshold: 0.01,
		restSpeedThreshold: 0.01,
	},
};