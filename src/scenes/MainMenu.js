import React, {Component, createRef} from 'react'
import {
    View,
    StyleSheet,
    ImageBackground,
    AppState,
    Vibration,
    Text,
    ScrollView,
    RefreshControl,
    ToastAndroid
} from 'react-native'
import {screenHeightPercent, screenWidthPercent} from '../helpers/Layout'
import Home from './Home'
import Admin from './Admin'
import Notifikasi from './Notifikasi'
import Profil from './Profil'
import NavigationBottom from '../components/navigation/NavigationBottom'
import {manageAutoNavigate} from '../actions/PushNotification'
import config from '../Config'
import {getData} from '../services/LocalStorage'
import {getNotifikasi} from '../services/ServiceNotifikasi'
import { getPushNotificationToken, registerForPushNotifications,checkPermission, requestPermission, createNotificationListeners } from "../services/PushNotification";
import Geolocation from 'react-native-geolocation-service';
import {requestPermissionLocation} from '../services/Permission'
import {connect} from 'react-redux'
import {setUserLocation, setLocationSetting, setInRangeStatus, setFeatureEnabled} from '../actions/redux/Location'
import { bindActionCreators } from 'redux'
import GeoFencing from 'react-native-geo-fencing';
import { setUserPermission } from '../actions/redux/General'
import RNMockLocationDetector from 'react-native-mock-location-detector';


class MainMenu extends Component{
    constructor(props){
        super(props)
        this.state = {
            detailuser: null,
            activeTab: 1,
            refresh: false,
            notification: '',
            messageNotRead: 0,
            back: false
        }
        this.homeRef = createRef()
    }

    componentDidMount(){
        this.mounted = true
        RNMockLocationDetector.checkMockLocationProvider(
            "Penyalahgunaan Aplikasi",
            "Anda terdeteksi melakukan penyalahgunaan aplikasi, aktivitas anda telah tercatat di database bagian sdm silahkan hubungi bagian SDM",
            "Saya Mengerti"
        )
        this.watchMyPosition()
        
        getData('AuthUser').then(async (data) => {
            if (data == null){
                this.props.navigation.replace('login')
            } else {
                this.setState({
                    detailuser: data
                })
            }
        })

        
    }

    componentWillUnmount(){
        this.mounted = false

        if (this.watchPosition){
            Geolocation.clearWatch(this.watchPosition)
        }   
    }

    watchMyPosition = () => {
        this.watchPosition = Geolocation.watchPosition((location) => {
            if (this.mounted){
                this.props.setUserLocation({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude
                })
                this.checkInRangeStatus(location)
            }
        }, (err) => {
            alert(err.message)
        }, {
            enableHighAccuracy: true,
            fastestInterval: 2000,
            interval: 5000,
            distanceFilter: 1,
            forceRequestLocation: true,
        })
        
    }

    checkInRangeStatus = (location) => {
        let point = {
            lat: location.coords.latitude,
            lng: location.coords.longitude
        }

        let range = this.props.locationSetting.map(item => {
            return {
                lat: item.latitude,
                lng: item.longitude
            }
        })


        GeoFencing.containsLocation(point, range)
                    .then((result) => {
                        this.props.setInRangeStatus(true)
                    })
                    .catch((err) => {
                        // this.props.setInRangeStatus(false)
                        this.props.setInRangeStatus(false)
                    })
    }

    changeActiveTab = (activeTab) => {
        this.setState({activeTab})
    }

    render(){
        return(
            <View 
                style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: '#fff',
                    position: 'relative'
                }}
            >
                {/* <ScrollView
                    contentContainerStyle={{
                        flex: 1
                    }}
                    refreshControl={
                        <RefreshControl refreshing={this.state.refresh} onRefresh={async () => {
                            try{
                                this.setState({
                                    refresh: true
                                })
                                
                                switch (this.state.activeTab) {
                                    case 1:
                                        await this.homeRef.current.getListUserMenu(this.state.detailuser)
                                        break;
                                    case 2:
                                        console.log('ok')
                                        break;
                                    case 3:
                                        console.log('ok')
                                        break;
                                    default:
                                        break;
                                }

                                this.setState({
                                    refresh: false
                                })
                            } catch (err){
                                console.log(err)
                            }
                        }} />
                    }
                > */}
                    <View
                        style={{
                            flex: 1,
                            backgroundColor: '#fff'  
                        }}
                    >
                        {this.state.activeTab === 1 && <Home {...this.props} ref={this.homeRef}/>}
                        {this.state.activeTab === 2 && <Notifikasi {...this.props}/>}
                        {this.state.activeTab === 3 && <Profil {...this.props}/>}
                    </View>
                    <NavigationBottom {...this.props} changeActiveTab={this.changeActiveTab} activeTab={this.state.activeTab}/>
                {/* </ScrollView>  */}
            </View>
        )
    }
}


function mapStateToProps(state){
    return {
        userLocation: state.userLocation,
        userPermission: state.userPermission,
        inRangeStatus: state.inRangeStatus,
        locationSetting: state.locationSetting
    }
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({setUserLocation, setLocationSetting, setInRangeStatus, setFeatureEnabled, setUserPermission}, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(MainMenu)