import React, { useRef, Component } from 'react'
import {
    View,
    ImageBackground,
    Text,
    Modal,
    StyleSheet,
    PermissionsAndroid
} from 'react-native'
import SlidingUpPanel from 'rn-sliding-up-panel';
import { screenHeightPercent } from '../../../helpers/Layout';
import { RNCamera } from 'react-native-camera';
import Ripple from 'react-native-material-ripple';
import { Icon } from 'react-native-elements';
import { abortRequest, createAbsensi } from '../../../services/ServiceSdm';
import {icon_color_primary, text_color_gray_800, ripple_color_primary, icon_color_secondary } from '../../../themes/Default';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { getData, removeData } from '../../../services/LocalStorage';
import moment from 'moment'

const initialState = {
    realTimeLocation: null,
    loaderCheckLocation: true,
    locationSetting: [],
    inLocation: false,
    absenType: 0,
    userid: null,
    status: 0,
    success: false,
    successdata: null,
    realTimeFaceData: null,
    detectedFace: false,
    fetch: false,
    permissionStatus: false,
    permissionRequest: [],
    scanFaceMessage: 'Hadapkan wajah anda ke camera',
    sliderUpContentHeight: 400,
    featureEnabled: false,
    allowDragging: false,
    errorCheck: false
}

export default class AmbilAbsen extends Component{

    constructor(props){
        super(props)
        this.state = {userData: null,...initialState}
        
    }

    async componentDidMount(){
        this.mounted = true
        const userData = await getData('AuthUser')   
        this.setState({
            userData
        })

        if (this.state.absenType === 0){
            this.sliderUp.hide()
        }
    }



    componentWillUnmount(){
        this.mounted = false
        this.setState({
            absenType: 0
        })
        this.sliderUp.hide()
    }

    show = async (parentdata) => {
        try{ 
            this.setState(initialState)
            this.setState({
                absenType: parentdata.type,
                userid: parentdata.userdata._id
            })

            this.setState({
                featureEnabled: this.state.userData.feature.absensi_mobile  
            })
            
            this.sliderUp.show()

            if (this.props.userPermission.camera && this.props.userPermission.location){
                this.setState({
                    permissionStatus: true
                })
                this.checkAbsen()
            } else {
                let permission = [...this.state.permissionRequest]
                if (!this.props.userPermission.camera) {
                    permission.push('kamera')
                }

                if (!this.props.userPermission.location){
                    permission.push('lokasi')
                }
                this.setState({
                    permissionRequest: permission
                })
            }
        } catch(err){
            alert(err.message)
        }
        
    }

    onFacesDetected = (faceData) => {
        if (this.timeoutdetectFace) clearTimeout(this.timeoutdetectFace)

        if (faceData.faces.length > 0){
            if (this.state.fetch === false){
                this.setState({
                    detectedFace: true,
                    realTimeFaceData: faceData,
                    scanFaceMessage: 'Jaga wajah Anda tetap berada dalam jangkauan kamera'
                })
            }
            
            this.timeoutdetectFace = setTimeout(() => {
                if (this.state.fetch === false){
                    this.setState({
                        detectedFace: false,
                        scanFaceMessage: 'Hadapkan wajah anda ke kamera'
                    })
                }
            },600)
        }
    }

    checkAbsen = async () => {
        try {
            if (this.timeoutFaceRecog) clearTimeout(this.timeoutFaceRecog)   
            if (this.state.detectedFace && this.camera){
                this.setState({
                    fetch: true,
                    scanFaceMessage: 'Memeriksa kecocokan wajah...'
                })

                const photo = await this.camera.takePictureAsync({
                    quality: 0.5,
                    base64: true,
                    width: 200,
                })
                const facelogin = await createAbsensi(photo, this.state.userid, this.state.absenType, this.props.userLocation)
                if (facelogin.reqStat.code === 200){
                    this.setState({
                        fetch: false,
                        successdata: facelogin.response,
                        success: true,
                    })
                } else {
                    this.setState({
                        scanFaceMessage: 'Wajah tidak cocok...',
                        errorCheck: true,
                        fetch: false
                    })
                }
            } else {
                this.timeoutFaceRecog = setTimeout(() => {
                    this.checkAbsen()
                },2000)
            }
            
        } catch(err){
            this.setState({
                scanFaceMessage: `Terjadi kesalahan saat proses scan wajah ${err.message !== undefined ? err.message : err}`,
                detectedFace: false
            })
        }   
    }

    renderFaceRecognition = () => {
        return (
            <View style={Styles.containerSlider}>
                <RNCamera
                    ref={ref => {
                        this.camera = ref;
                    }}
                    autoFocus={RNCamera.Constants.AutoFocus.on}
                    style={{
                        flex: 1,
                    }}
                    type={RNCamera.Constants.Type.front}
                    captureAudio={false}
                    onFacesDetected={this.state.errorCheck === false && this.onFacesDetected}
                    onFaceDetectionError={() => console.log('not detected')}
                    androidCameraPermissionOptions={{
                        title: 'Hallo',
                        message: 'Untuk melakukan absensi, aplikasi memerlukan izin penggunaan camera',
                        buttonPositive: 'Izinkan',
                        buttonNegative: 'Kembali',
                    }}
                >
                </RNCamera>
                <View
                    style={{
                        zIndex: 2,
                        width: '100%',
                        height: '100%',
                        paddingHorizontal: 20,
                        backgroundColor: '#fff',
                        position: 'absolute',
                    }}
                >
                    <View
                        style={{
                            width: '100%',
                            height: 200,
                            marginTop: 30,
                            position: 'relative',
                            justifyContent: 'flex-start',
                            alignItems: 'center'
                        }}
                    >
                        <Text
                            style={{
                                fontWeight: 'bold',
                                paddingBottom: 20
                            }}
                        >{this.state.absenType === 1 ? 'Absen Masuk' : 'Absen Pulang'}</Text>
                        {this.state.status === 1 ?
                            <ImageBackground
                                style={{
                                    width: '100%',
                                    height: '100%'
                                }}
                                source={require('../../../../assets/background/facerecognition_scan_success.gif')} >
                            </ImageBackground> :
                            <View
                                style={{
                                    width: '40%',
                                    height: '40%',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                            >
                                <ImageBackground
                                    style={{
                                        width: '100%',
                                        height: '100%',

                                    }}
                                    source={require('../../../../assets/background/facerecognition_scanning.gif')} >
                                </ImageBackground>
                            </View>
                        }
                        {this.state.status === 1 ? 
                            <Text
                                style={{
                                    marginTop: 20,
                                    fontSize: 16
                                }}
                            >Scan wajah berhasil </Text> : 
                            <View
                                style={{
                                    width: '100%',
                                    alignItems: 'center'
                                }}
                            >
                                <Text
                                    style={{
                                        marginTop: 20,
                                        fontSize: 14,
                                        textAlign: 'center'
                                    }}
                                >{this.state.scanFaceMessage}</Text>
                                {this.state.errorCheck && 
                                    <Ripple
                                        onPress={() => {
                                            this.setState({
                                                errorCheck: false
                                            })
                                            this.checkAbsen()
                                        }}
                                        style={{
                                            marginTop: 30,
                                            paddingHorizontal: 10,
                                            paddingVertical: 10,
                                            backgroundColor: icon_color_secondary,
                                            borderRadius: 20
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontSize: 13,
                                                color: '#fff'
                                            }}
                                        >Coba Lagi</Text>
                                    </Ripple>
                                }
                            </View>
                        }
                        {this.state.status === 1 &&
                            <Ripple
                                style={{
                                    marginTop: 20,
                                    width: '100%',
                                }}
                                onPress={() => {props.navigation.replace('MainMenu')}}
                                rippleColor={'rgba(255,255,255,.5)'}
                            >
                                <View style={{
                                    backgroundColor: '#6ab1f7',
                                    width: '100%',
                                    paddingVertical: 15,
                                    borderRadius: 50,
                                    position: 'relative',
                                    justifyContent: 'center',
                                    alignItems: 'center'

                                }}>
                                    <Text style={[Styles.buttonLoginText]}>Lanjutkan</Text>
                                </View>
                            </Ripple>   
                        }
                    </View>
                </View>
            </View>
        )
    }

    renderLoaderCheckLocation = () => {
        return <View style={Styles.containerSlider}>
            <View
                style={{
                    width: '40%',
                    height: '40%',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <ImageBackground
                    style={{
                        width: '100%',
                        height: '100%',

                    }}
                    source={require('../../../../assets/background/locationcheck.gif')} >
                </ImageBackground>
                <Text
                    style={{

                    }}
                >
                    Memeriksa lokasi...
                </Text>
            </View>
        </View>
    }   

    renderIfNotInLocation = () =>{
        return (
            <View style={Styles.containerSlider}>
                <View
                    style={{
                        width: '100%',
                        height: '30%',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <Icon
                        type={'font-awesome'}
                        name={'exclamation-circle'}
                        size={30}
                        color={icon_color_primary} />
                    <Text
                        style={{
                            marginTop: 20,
                            color: '#555'
                        }}
                    >
                        Anda tidak sedang berada di lingkungan
                    </Text>
                    <Text
                        style={{
                            marginTop: 5,
                            color: '#555'
                        }}
                    >
                        RSUP Prof Dr. R. D Kandou
                    </Text>
                </View>
            </View>
        )
    }

    renderFeatureNotEnabled = () =>{
        return (
            <View style={Styles.containerSlider}>
                <View
                    style={{
                        flex: 1,
                        paddingTop:'10%',
                        paddingHorizontal: '10%',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                    }}
                >
                    <Icon
                        type={'ionicons'}
                        name={'face'}
                        size={30}
                        color={icon_color_primary} />
                    <Text
                        style={{
                            fontSize: 13,
                            marginTop: 20
                        }}
                    >Anda belum mendaftar absen mobile</Text>
                    <Text
                        style={{
                            textAlign: 'center',
                            fontSize: 13,
                        }}
                    >Jika anda telah terdaftar dan sudah di verifikasi silahkan login kembali</Text>
                    <Ripple
                        onPress={() => this.props.navigation.navigate('ValidasiModul', {navigateTo: 'DaftarMobileAbsenIfExist'})}
                        rippleColor={'rgba(255,255,255,.4)'}
                        style={{
                            width: '100%',
                            marginTop: 20,
                            paddingVertical: 15,
                            borderRadius: 30,
                            alignItems: 'center',
                            backgroundColor: icon_color_secondary
                        }}
                    >
                        <Text
                            style={{
                                color: '#fff'
                            }}
                        >Daftar</Text>
                    </Ripple>
                    <Ripple
                        onPress={() => {
                            removeData('AuthUser').then(() => {
                                this.props.navigation.replace('Login')
                            })
                        }}
                        rippleColor={'rgba(255,255,255,.4)'}
                        style={{
                            width: '100%',
                            marginTop: 20,
                            paddingVertical: 15,
                            borderRadius: 30,
                            alignItems: 'center',
                            backgroundColor: icon_color_secondary
                        }}
                    >
                        <Text
                            style={{
                                color: '#fff'
                            }}
                        >Logout</Text>
                    </Ripple>
                </View>
            </View>
        )
    }

    renderSuccess = () => {
        return (
            <View style={Styles.containerSlider}>
                <View
                    style={{
                        width: '100%',
                        paddingTop: screenHeightPercent(10),
                        alignItems: 'center'
                    }}
                >
                    <View
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: 80,
                            width: 80,
                            backgroundColor: icon_color_secondary,
                            borderRadius: 30
                        }}
                    >
                        <MaterialCIcons
                            name={'face-recognition'}
                            size={50}
                            color={'#fff'}
                        />
                    </View>
                    <Text
                        style={{
                            fontSize: 13,
                            color: '#333',
                            marginTop: 20
                        }}
                    >Anda telah berhasil absen {this.state.successdata !== null ? (this.state.successdata.absenType === 1 ? 'masuk' : 'pulang') : 'Masuk'} pada pukul</Text>
                    <View
                        style={{
                            width: '100%',
                            flexDirection: 'column',
                            alignItems: 'center',
                            paddingHorizontal: '20%',
                        }}
                    >
                        <Text
                            style={{
                                width: '100%',
                                fontSize: 14,
                                fontWeight: 'bold',
                                backgroundColor: '#6ab1f7',
                                paddingVertical: 10,
                                paddingHorizontal: 20,
                                borderRadius: 30,
                                color: '#fff',
                                textAlign: 'center',
                                marginTop: 20
                            }}
                        >{this.state.successdata !== null ? moment(this.state.successdata.serverTime).format('DD MMMM YYYY') : ''}</Text>
                        <Text
                            style={{
                                width: '100%',
                                fontWeight: 'bold',
                                backgroundColor: '#6ab1f7',
                                paddingVertical: 10,
                                paddingHorizontal: 20,
                                textAlign: 'center',
                                borderRadius: 30,
                                fontSize: 14,
                                color: '#fff',
                                marginTop: 10
                            }}
                        >{this.state.successdata !== null ? moment(this.state.successdata.serverTime).format('HH:mm:ss') : ''}</Text>
                    </View>
                </View>
            </View>
        )
    }

    renderIfNotHavePermission = () => {
        return (<View style={Styles.containerSlider}>
            <View
                style={{
                    width: '100%',
                    height: '100%'
                }}
            >
                <View
                    style={{
                        width: '100%',
                        paddingTop: '30%',
                        paddingHorizontal: 30,
                        alignItems: 'center'
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        {this.state.permissionRequest.includes('kamera') &&
                            <MaterialIcons name="camera-enhance" size={40} color={icon_color_primary}/>
                        }

                        {this.state.permissionRequest.includes('lokasi') &&
                            <MaterialCIcons name="map-marker-check" size={40} color={icon_color_primary} style={{marginLeft: 10}}/>
                        }
                    </View>
                    <Text
                        style={{
                            textAlign: 'center',
                            lineHeight: 20,
                            marginTop: 20,
                            fontSize: 14,
                            color: text_color_gray_800
                        }}
                    >Aplikasi ini memerlukan akses {this.state.permissionRequest.join(' dan ')} untuk melakukan absensi. Izinkan aplikasi ?</Text>
                </View>
                <View
                    style={{
                        width: '100%',
                        paddingTop: 20,
                        alignItems: 'center'
                    }}
                >
                    <Ripple
                        onPress={ async () => {
                            try {
                                const permission = await PermissionsAndroid.requestMultiple([PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, PermissionsAndroid.PERMISSIONS.CAMERA]);   
                                
                                if (permission['android.permission.ACCESS_FINE_LOCATION'] === 'granted' && permission['android.permission.CAMERA'] === 'granted'){
                                    this.setState({
                                        permissionStatus: true
                                    })
                                    this.checkAbsen()
                                } else {
                                    this.sliderUp.hide()
                                }
                                
                            } catch(err){
                                console.log(err)
                            }
                        }}
                        rippleColor={ripple_color_primary}
                        style={{
                            width: '80%',
                            backgroundColor: icon_color_secondary,
                            alignItems: 'center',
                            paddingVertical: 15,
                            borderRadius: 30
                        }}
                    >
                        <Text
                            style={{
                                color: '#fff'
                            }}
                        >Lanjutkan</Text>
                    </Ripple>
                    <Ripple
                        onPress={() => {
                            this.sliderUp.hide()
                        }}
                        rippleColor={ripple_color_primary}
                        style={{
                            width: '80%',
                            marginTop: 10,
                            backgroundColor: icon_color_secondary,
                            alignItems: 'center',
                            paddingVertical: 15,
                            borderRadius: 30
                        }}
                    >
                        <Text
                            style={{
                                color: '#fff'
                            }}
                        >Kembali</Text>
                    </Ripple>
                </View>
            </View>
        </View>)
    }

    render(){
        return (
            <SlidingUpPanel
                friction={.4}
                onBottomReached={() => {
                    
                }}
                draggableRange={{ top: this.state.sliderUpContentHeight, bottom: 0 }}
                onBackButtonPress={() => {
                    this.sliderUp.hide() 
                    return true
                }}
                allowDragging={this.state.allowDragging}
                ref={c => this.sliderUp = c}>
                {this.state.success ? this.renderSuccess() : (this.state.permissionStatus === false ? this.renderIfNotHavePermission() : (this.state.featureEnabled === false ? this.renderFeatureNotEnabled() : (this.props.inRangeStatus ? this.renderFaceRecognition() : this.renderIfNotInLocation())))}
            </SlidingUpPanel>
        )
    }
}

const Styles = new StyleSheet.create({
    container: {
        flex : 1,
    },
    containerWrapper:{
        width: '100%',
        justifyContent: 'center' 
    },
    containerSlider:{
        zIndex: 2,
        width: '100%',
        // alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        overflow: 'hidden',
        position: 'relative',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        height: '100%',
        backgroundColor: '#fff'
    },
    imageBackground: {
        width: '100%',
        height: '100%',
    },
    header: {
        height: screenHeightPercent(6)
    },
    headerBackground: {
        position: 'absolute',
        overflow: 'hidden',
        backgroundColor: '#555',
        top: 0,
        left: 0,
        width: '100%',
        height: screenHeightPercent(40),
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 2.84,
        elevation: 2,
    }
})