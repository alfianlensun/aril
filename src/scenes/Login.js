import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    ImageBackground,
    StatusBar,
    SafeAreaView,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Image,
    ActivityIndicator,
    PermissionsAndroid
} from 'react-native'
import {screenHeightPercent, screenWidthPercent} from '../helpers/Layout'
import Ripple from 'react-native-material-ripple';
import {deviceDetail} from '../middlewares/VerifiedDevice'
import {login, faceRecognitionLogin} from '../services/ServiceAuth'
import { storeData, getData } from '../services/LocalStorage'
import {Icon} from 'react-native-elements'
import Logo from '../../assets/icon/icon.png'
import {requestPermissionLocation} from '../services/Permission'
import Geolocation from 'react-native-geolocation-service';
import GeoFencing from 'react-native-geo-fencing';
import {getPushNotificationToken, requestUserPermission, checkPushNotificationPermission} from '../services/PushNotification'
import { getSettingAllSetting } from '../services/ServiceSetting';
import { RNCamera } from 'react-native-camera'; 
import SlidingUpPanel from 'rn-sliding-up-panel';
import { abortRequest } from '../services/ServiceAuth';

export default class Login extends Component{
    constructor(props){
        super(props)

        this.state = {
            loader: false,
            showCamera: false,
            IDTelegram: '',
            Password: '',
            passwordValid: null,
            validateTelegram: '',
            validatePassword: '',
            accessRange: [],
            realTimeLocation: {
                latitude: 1.456508,
                longitude: 124.809054
            },
            scanFaceMessage: 'Hadapkan wajah anda ke camera',
            sliderUpContentHeight: 400,
            scanned: false,
            faceData: null,
            detectedFace: false,
            realTimeFaceData: null,
            faceRecognitionStatus: 0
        }


        getData('AuthUser').then(data => {
            if (data !== null){
                props.navigation.replace('MainMenu')
            }
        })
    }



    async componentDidMount(){
        this.mounted = true
        try {
            this.sliderUp.hide()
            // const Permission = await requestPermissionLocation()
            // const PushNotifPermission = await requestUserPermission()
            // const token = await getPushNotificationToken()
            // this.biometryScan()
            
            // this.watchMyPosition()
            const {response} = await getSettingAllSetting()
            
            if (response !== null){
                if (this.mounted){
                    this.setState({
                        accessRange: response
                    })
                }
            }
        } catch (err) {
            console.log(err)
        }
    }

    componentWillUnmount(){
        this.mounted = false
        abortRequest()
    }

    async geoLocation(getData) {
        Geolocation.getCurrentPosition((position) => {
                
            },(error) => {
                console.log(error)
            },
            { 
                enableHighAccuracy: true, 
                timeout: 15000, 
                maximumAge: 10000 
            }
        );
    }

    async watchMyPosition(){
        Geolocation.watchPosition((location) => {
            this.setState({
                realTimeLocation: {
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude
                }
            })
        }, (err) => {
            console.log(err)
        }, {
            enableHighAccuracy: true,
            fastestInterval: 1000,
            interval: 1000,
            distanceFilter: 1,
            forceRequestLocation: true
        })
    }

    async checkLocation(){
        try{
            const {realTimeLocation} = this.state
            let point = {
                lat: realTimeLocation.latitude,
                lng: realTimeLocation.longitude
            }

            const check = new Promise((rs, rj) => {
                let range = this.state.accessRange.map(item => {
                    return {
                        lat: item.latitude,
                        lng: item.longitude
                    }
                })
                GeoFencing.containsLocation(point, range)
                            .then((result) => rs({
                                inRange: true
                            }))
                            .catch((err) => rs({
                                inRange: false
                            }))
            })
            return check
        }catch(err){
            throw new Error(err)
        }
    }

    renderFaceRecognition(){
        return (
            <View style={Styles.containerSlider}>
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

                    {this.state.faceRecognitionStatus === 1 ?
                        <ImageBackground
                            style={{
                                width: '100%',
                                height: '100%'
                            }}
                            source={require('../../assets/background/facerecognition_scan_success.gif')} >
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
                                source={require('../../assets/background/facerecognition_scanning.gif')} >
                            </ImageBackground>
                        </View>
                    }
                    {this.state.faceRecognitionStatus === 1 ? 
                        <Text
                            style={{
                                marginTop: 20,
                                fontSize: 16
                            }}
                        >Scan wajah berhasil </Text> : 
                        <Text
                            style={{
                                marginTop: 20,
                                fontSize: 14,
                                textAlign: 'center'
                            }}
                        >{this.state.scanFaceMessage}</Text>
                    }
                    {this.state.faceRecognitionStatus === 1 &&
                        <Ripple
                            style={{
                                marginTop: 20,
                                width: '100%',
                            }}
                            onPress={() => {
                                this.sliderUp.hide()
                                setTimeout(() => {
                                    this.props.navigation.replace('MainMenu')
                                },600)
                            }}
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
        )
    }

    onSubmitLogin = async () => {
        try{
            const {IDTelegram, Password} = this.state
            if (IDTelegram.length > 0){
                if (Password.length > 0){
                    this.setState({
                        loader: true,
                        validateTelegram: '',
                        validatePassword: ''
                    })

                    const token = await getPushNotificationToken()
                    login(IDTelegram, Password, token).then(async (resp) => {
                        
                        if (resp.reqStat.code === 200){
                            resp.response.jwtToken = resp.reqStat.token
                            await storeData('AuthUser', resp.response)
                            await storeData('LastLogin', Date.now())
                            // const {inRange} = await this.checkLocation()

                            this.props.navigation.replace('MainMenu')
                            // if (inRange === false){
                            // } else {
                            //     this.props.navigation.replace('MainMenu')
                            //     this.setState({
                            //         loader: false
                            //     })
                            // }
                            
                        } else {
                            this.setState({
                                loader: false
                            })
                            let state = resp.response.type === 'ID' ? {validateTelegram: resp.reqStat.message} : {validatePassword: resp.reqStat.message}
                            this.setState(state) 
                        }
                    }).catch(err => {
                        throw new Error(err.message)
                    })
                } else {
                    this.setState({
                        validatePassword: 'Password tidak boleh kosong'
                    })
                    throw new Error('Password tidak boleh kosong')  
                }
            } else {
                this.setState({
                    ValidateTelegram: 'ID Telegram tidak boleh kosong'
                })
                throw new Error('ID Telegram tidak boleh kosong')  
            }
        }
        catch(err){
            this.setState({
                loader: false
            })
        }
    }

    onFacesDetected = (faceData) => {
        if (this.timeoutdetectFace) clearTimeout(this.timeoutdetectFace)
        this.setState({
            detectedFace: true,
            realTimeFaceData: faceData
        })
        this.timeoutdetectFace = setTimeout(() => {
            this.setState({
                detectedFace: false
            })
        },200)
    }

    checkAuth = async () => {
        try {
            if (this.timeoutFaceRecog) {
                clearTimeout(this.timeoutFaceRecog)   
            } else {
                this.sliderUp.show(400, {
                    y: .2
                })
            }

            if (this.state.detectedFace){
                
                this.setState({
                    loader: true,
                    scanFaceMessage: 'Memeriksa kecocokan wajah'
                })
                const options = { quality: 0.5, base64: true };
                const photo = await this.camera.takePictureAsync(options);
                const token = await getPushNotificationToken()
                const facelogin = await faceRecognitionLogin(photo, token)
                if (facelogin.reqStat.code === 200){
                    facelogin.response.jwtToken = facelogin.reqStat.token
                    await storeData('AuthUser', facelogin.response)
                    await storeData('LastLogin', Date.now())
                    
                    const {inRange} = await this.checkLocation()
                    this.setState({
                        faceRecognitionStatus: 1
                    })
                } else {
                    this.setState({
                        scanFaceMessage: 'Anda mungkin tidak terdaftar di sistem, coba lagi...',
                        detectedFace: false,
                        loader: false
                    })
                    this.timeoutFaceRecog = setTimeout(async () => {
                        this.checkAuth()
                    },2000)
                }
            } else {
                console.log('face not detected')
                this.timeoutFaceRecog = setTimeout(async () => {
                    this.checkAuth()
                },1000)
            }
            
        } catch(err){
            this.setState({
                scanFaceMessage: 'Terjadi kesalahan saat proses scan wajah',
                detectedFace: false,
                loader: false
            })
            this.timeoutFaceRecog = setTimeout(async () => {
                this.checkAuth()
            },1000)
        }

    }   


    renderWarning(type){
        if (type === 'ID'){
            return (
                <View
                    style={{
                        width: '80%',
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: 5
                    }}
                >
                    <Text
                        style={{
                            height: 20,
                            paddingRight: 5,
                            fontSize: 12,
                            color: '#ff776e'
                        }}
                    >
                        {this.state.validateTelegram}
                    </Text> 
                    <Icon 
                        type={'font-awesome'}
                        name={'exclamation-circle'}
                        color={'#ff776e'}
                        size={13} 
                    />   
                </View>
            )
        } 
        else 
        if (type === 'Password'){
            return (
                <View
                    style={{
                        width: '80%',
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: 5
                    }}
                >
                    <Text
                        style={{
                            height: 20,
                            paddingRight: 5,
                            fontSize: 12,
                            color: '#ff776e'
                        }}
                    >
                        {this.state.validatePassword}
                    </Text> 
                    <Icon 
                        type={'font-awesome'}
                        name={'exclamation-circle'}
                        color={'#ff776e'}
                        size={13} 
                    />   
                </View>
            )
        }
    }

    render(){
        const {scanned} = this.state 
        return (
            <SafeAreaView style={Styles.container}>
                <View style={{position: 'absolute', zIndex: -1, height: '100%', width: '100%'}}>
                    {this.state.showCamera &&
                        <RNCamera
                            ref={ref => {
                                this.camera = ref;
                            }}
                            autoFocus={RNCamera.Constants.AutoFocus.on}
                            style={{
                                flex: 1
                            }}  
                            type={RNCamera.Constants.Type.front}
                            captureAudio={false}
                            onFacesDetected={this.onFacesDetected}
                            onFaceDetectionError={() => console.log('not detected')}
                        >

                        </RNCamera>
                    }
                </View>
                <View style={[Styles.container]} >
                    <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
                    <KeyboardAvoidingView style={Styles.container} behavior="margin" enabled>
                        <ImageBackground
                            blurRadius={1}
                            source={require('../../assets/background/background.png')} style={Styles.imageBackground}>
                            <View
                                style={Styles.contentWrapper}
                            >
                                <View 
                                    style={Styles.content}
                                >
                                    <View>
                                        <Image 
                                            style={{
                                                height: 100,
                                                width: 100
                                            }}
                                            source={Logo}    
                                        />
                                    </View>
                                    <View>
                                        <Text style={[Styles.textWhite, {fontWeight: 'bold', fontSize: 24}]}></Text>
                                    </View>
                                    <View
                                        style={{
                                            marginTop: screenHeightPercent(5),
                                            alignItems: 'center'
                                        }}
                                    >
                                        <Text style={{color: '#eee'}}>Silahkan login untuk melanjutkan</Text>
                                    </View>
                                    <View
                                        style={{
                                            width: '90%',
                                            marginTop: 20,
                                            borderRadius: 20,
                                            overflow:'hidden',
                                            height: 50,
                                            position: 'relative'
                                        }}
                                    >
                                        <TextInput
                                            onSubmitEditing={() => {
                                                this.Password.focus()
                                            }}
                                            onChangeText={(IDTelegram) => {
                                                this.setState({IDTelegram, IDTelegramValid: null})
                                            }}
                                            keyboardType={'numeric'}
                                            style={Styles.formTextInput}
                                            value={this.state.IDTelegram}
                                            placeholder="ID telegram / No Telepon"
                                            placeholderTextColor="#aaa"
                                        /> 
                                    </View>
                                    {this.state.validateTelegram.length > 0 ? this.renderWarning('ID') : null}
                                    <View
                                        style={{
                                            width: '90%',
                                            marginTop: 10,
                                            borderRadius: 20,
                                            overflow:'hidden',
                                            height: 50,
                                            position: 'relative'
                                        }}
                                    >
                                        <TextInput
                                            onSubmitEditing={() => console.log('ok')}
                                            onChangeText={(Password) => {
                                                this.setState({Password})
                                            }}
                                            ref={(input) => { this.Password = input }}
                                            secureTextEntry={true}
                                            style={Styles.formTextInput}
                                            value={this.state.Password}
                                            placeholder="Password"
                                            placeholderTextColor="#aaa"
                                            
                                        />   
                                    </View>
                                    {this.state.validatePassword.length > 0 ? this.renderWarning('Password') : null}
                                    <View
                                        style={{
                                            width: '90%',
                                            borderRadius: 50,
                                            overflow: 'hidden',
                                            marginTop: 25
                                        }}
                                    >
                                        <ImageBackground
                                            style={{
                                                width: '100%',
                                                paddingVertical: 2,
                                                resizeMode: 'cover'
                                            }}
                                            source={require('../../assets/background/background3.png')}
                                        >
                                            <Ripple
                                                onPress={() => this.onSubmitLogin()}
                                                rippleColor={'rgba(255,255,255,.5)'}
                                            >
                                                <View style={Styles.buttonLogin}>
                                                    <Text style={[Styles.buttonLoginText, {marginRight: 15}]}>Masuk</Text>
                                                    <View
                                                        style={{
                                                            position: 'absolute',
                                                            right: 10,
                                                            opacity: this.state.loader ? 1 : 0
                                                        }}
                                                    >
                                                        <ActivityIndicator size="small" color="#fff" />
                                                    </View>
                                                </View>
                                            </Ripple>
                                        </ImageBackground>
                                    </View>
                                    {/* <View
                                        style={{
                                            alignItems: 'center',
                                            width: '100%',
                                            marginTop: 25
                                        }}
                                    >
                                        <TouchableOpacity 
                                            onPress={() => this.props.navigation.navigate('SignUp')}
                                        >
                                            <View style={{}}>
                                                <Text style={{color: '#ddd'}}>Lupa Password ?</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View> */}
                                    <View
                                        style={{
                                            width: '90%',
                                            borderRadius: 50,
                                            overflow: 'hidden',
                                            // marginTop: 10
                                        }}
                                    >
                                        {/* <Ripple
                                            onPress={async () => {
                                                try {
                                                    const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
                                                    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                                                        this.setState({
                                                            showCamera: true
                                                        })
                                                        this.checkAuth()
                                                    } else {
                                                        this.setState({
                                                            showCamera: false
                                                        })
                                                        this.sliderUp.hide()
                                                        throw new Error('Location permission denied')
                                                    }
                                                } catch (err) {
                                                    throw new Error(err)
                                                }
                                            }}
                                            rippleColor={'rgba(255,255,255,.5)'}
                                        >
                                            <View style={Styles.buttonLogin}>
                                                <Text style={[Styles.buttonLoginText]}>Face Recogition</Text>
                                            </View>
                                        </Ripple> */}
                                    </View>
                                    <View
                                        style={{
                                            alignItems: 'center',
                                            width: '100%',
                                            marginTop: 25
                                        }}
                                    >
                                        <TouchableOpacity 
                                            onPress={() => this.props.navigation.navigate('SignUp')}
                                        >
                                            <View style={{}}>
                                                <Text style={{color: '#fff'}}>Belum pernah mendaftar ?</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View
                                    style={{
                                        width: '100%',
                                        position: 'absolute',
                                        paddingBottom: 10,
                                        bottom: 0,
                                        alignItems: 'center'
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontSize: 12,
                                            color: '#fff'
                                        }}
                                    >Version 1.0.0</Text>
                                </View>
                            </View>
                        </ImageBackground>
                        <SlidingUpPanel 
                            friction={.4}
                            onBottomReached={() => {
                                this.setState({
                                    showCamera: false,
                                    faceRecognitionStatus: 0
                                })
                            }}
                            draggableRange={{ top: this.state.sliderUpContentHeight, bottom: 0 }}
                            onBackButtonPress={() => {
                                this.sliderUp.hide(); 
                                return true
                            }}
                            allowDragging={this.state.allowDragging}
                            ref={c => this.sliderUp = c}>
                            {this.renderFaceRecognition()}
                        </SlidingUpPanel>
                    </KeyboardAvoidingView>
                </View>
            </SafeAreaView>
        )
    }
}

const Styles = new StyleSheet.create({
    container: {
        flex : 1,
    },
    containerWrapper:{
        width: '100%',
        height: '100%',
        justifyContent: 'center' 
    },
    header: {
        backgroundColor: '#333',
        height: screenHeightPercent(4)
    },
    containerSlider:{
        zIndex: 2,
        width: '100%',
        // alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        overflow: 'hidden',
        position: 'relative',
        paddingHorizontal: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        height: '100%',
        backgroundColor: '#fff'
    },
    imageBackground: {
        width: '100%',
        height: '100%',
    },
    contentWrapper: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,.6)'
    },
    content: {
        paddingHorizontal: '10%',
        width: '100%',
        alignItems: 'center'  
    },
    textWhite: {
        color: '#fff'
    },
    formInputWrapper: {
        position: 'relative',
        borderBottomWidth: 1,
        borderBottomColor: '#fff',
        height: 40,
        width: '100%',
    },
    buttonLogin: {
        width: '100%',
        paddingVertical: 12,
        borderRadius: 50,
        flexDirection: 'row',
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonLoginText: {
        color: '#fff'
    },
    formTextInput: {
        backgroundColor: 'rgba(0,0,0,.4)',
        paddingHorizontal: 20,
        height: '100%',
        color: '#fff'
    }
})