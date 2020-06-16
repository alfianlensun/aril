import React, {Component} from 'react'
import {
    View,
    Image,
    StyleSheet,
    StatusBar,
    AsyncStorage,
    ImageBackground,
    Animated,
    Text,
    ActivityIndicator,
    PermissionsAndroid
} from 'react-native'
import {getData, storeData, clearData} from '../services/LocalStorage'
import {screenHeightPercent, screenWidthPercent} from '../helpers/Layout'
import Logo from '../../assets/icon/icon.png'
import {getVersion} from 'react-native-device-info'
import {getVersionApp, getSettingAllSetting} from '../services/ServiceSetting'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setUserLocation, setLocationSetting } from '../actions/redux/Location'

class Splash extends Component{
    constructor(props){
        super(props)
        this.state = {
            repeat: 0
        }
    }

    async componentDidMount(){
        this.mounted = true
        this.loader()
    } 

    componentWillUnmount(){
        this.mounted = false
    }

    loader = async () => {
        try{
            console.log('load')
            const auth =  await getData('AuthUser')
            const appversion = getVersion()
            const checkPermissionLocation = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
            const {response} = await getSettingAllSetting() 
    
            if (response !== undefined) this.props.setLocationSetting(response)
            let navigateTo = ''
            if (auth !== null){
                navigateTo = 'MainMenu'
            } else {
                navigateTo = 'Login'
            }
            if (checkPermissionLocation){
                this.props.navigation.replace(navigateTo)
            } else {
                this.props.navigation.replace('PermissionRequest', {navigateTo})
            }
        } catch (err){
            console.log(err)
            setTimeout(() => {
                this.setState({
                    repeat: this.state.repeat+1
                })
                this.loader()
            }, 1200)
        }
    }

    
    render(){
        return(
            <View 
                style={{
                    flex: 1,
                    overflow: 'hidden',
                    position: 'relative',
                    backgroundColor: '#6ab1f7',
                }}
            >
                <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
                <ImageBackground source={require('../../assets/background/backgroundSignUp.jpg')} style={{flex: 1, justifyContent: 'center' , alignItems: 'center'}} blurRadius={1}>
                    <Image 
                        style={{
                            height: 100,
                            width: 100
                        }}
                        source={Logo}  
                    />
                    <View
                        style={{
                            marginTop: 30
                        }}
                    >
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                paddingHorizontal: 10,
                                borderRadius: 30,
                                paddingVertical: 5
                            }}
                        >
                            <ActivityIndicator size={25} color={'#fff'}/>
                        </View>
                        
                    </View>
                </ImageBackground>
            </View>
        )
    }
    
}

function mapStateToProps(state){
    return {
        userLocation: state.userLocation,
    }
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({setUserLocation, setLocationSetting}, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(Splash)