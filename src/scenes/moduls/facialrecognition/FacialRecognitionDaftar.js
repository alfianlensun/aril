
import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    Image,
    FlatList,
    RefreshControl,
    TextInput,
    ActivityIndicator
} from 'react-native'
import {screenHeightPercent, screenWidthPercent} from '../../../helpers/Layout'
import { getData, storeData } from '../../../services/LocalStorage'
import {faceRecognitionRegister} from '../../../services/ServiceAuth'
import {Icon} from 'react-native-elements'
import Ripple from 'react-native-material-ripple'
import SlidingUpPanel from 'rn-sliding-up-panel'
import { RNCamera } from 'react-native-camera'; 

export default class FacialRecognitionDaftar extends Component{
    constructor(props){
        super(props)
        this.state = {
            userdata: null,
            sliderUpContentHeight: 100,
            message: 'Place your face inside the frame',
            detectedFace: false,
            realTimeFaceData: null,
            success: false,
            successPath: null,
            loaderUpload: false,
            uploaded: false
        }
    }

    async componentDidMount(){
        this.mounted = true
        let userdata = await getData('AuthUser')
        if (this.mounted){
            this.setState({
                userdata 
            })
            this.registerWajah()
        } 
    }

    componentWillUnmount(){
        this.mounted = false
    }

    registerWajah = async () => {
        try {
            const userdetail = {...this.state.userdata}
            if (this.timeoutFaceRecog) clearTimeout(this.timeoutFaceRecog)   
            if (this.state.detectedFace){
                this.timeoutFaceRecog = setTimeout(async () => {
                    const options = { quality: 0.5, base64: true };
                    const photo = await this.camera.takePictureAsync(options);
                    if (this.mounted){
                        this.setState({
                            success: true,
                            uploaded: false,
                            loaderUpload: true,
                            successPath: photo.uri
                        })
                    } 
                    const upload = await faceRecognitionRegister(photo, this.state.userdata._id)
                    if (this.mounted){
                        userdetail.feature.facerecognition_login = true
                        userdetail.facerecognition.auth = "face.jpg"
                        
                        await storeData('AuthUser', userdetail)
                        if (upload.reqStat.code === 200){
                            this.setState({
                                success: true,
                                loaderUpload: false,
                                uploaded: true,
                            })
                        } else {
                            this.timeoutFaceRecog = setTimeout(async () => {
                                this.registerWajah()
                            },1000)
                        }
                    }
                },2000)
            } else {
                this.timeoutFaceRecog = setTimeout(async () => {
                    this.registerWajah()
                },1000)
            }
        } catch(err){
            console.log('err', err)
            this.setState({
                loader: false
            })
            this.timeoutFaceRecog = setTimeout(async () => {
                this.registerWajah()
            },1000)
        }

    }   

    onFacesDetected = (faceData) => {
        if (this.timeoutdetectFace) clearTimeout(this.timeoutdetectFace)
        this.setState({
            detectedFace: true,
            message: 'Keep your face inside the frame',
            realTimeFaceData: faceData
        })
        this.timeoutdetectFace = setTimeout(() => {
            this.setState({
                message: 'Place your face inside the frame',
                detectedFace: false
            })
        },600)
    }

    renderDaftar = () => {
        return(
            <View 
                style={{
                    flex: 1,
                    overflow: 'hidden',
                    position: 'relative',
                    backgroundColor: '#e1f7fa',
                }}
            >
                <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
                <View
                    style={{
                        position: 'absolute',
                        backgroundColor: '#fff',
                        top: screenHeightPercent(8),
                        left: 20,
                        zIndex: 10,
                        height: 40,
                        width: 40,
                        borderRadius: 50
                    }}
                >
                    <Ripple
                        onPress={() => {
                            this.props.navigation.goBack(null)
                        }}
                        style={{
                            height: '100%',
                            width: '100%',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                        rippleColor={'rgba(0,0,0,.5)'}
                    >
                        <Icon 
                            type={'ionicons'}
                            name={'arrow-back'}
                            color={'#444'}
                            size={24}
                        />
                    </Ripple>
                </View>
                {/* tmpt camera */}
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems:'center'
                    }}
                >
                    <View
                        style={{
                            height: screenWidthPercent(80),
                            width: screenWidthPercent(80),
                            overflow: 'hidden',
                            borderRadius: 200,
                            zIndex: 0,
                            position: 'relative'
                        }}
                    >
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
                            androidCameraPermissionOptions={{
                                title: 'Hallo',
                                message: 'Untuk melakukan scan wajah, aplikasi memerlukan izin penggunaan camera',
                                buttonPositive: 'Izinkan',
                                buttonNegative: 'Kembali',
                            }}                  
                        >
                        </RNCamera>
                    </View>
                    <Text
                        style={{
                            marginTop: 50,
                            fontSize: 16,
                            color: '#333',
                            fontWeight: 'bold'
                        }}
                    >{this.state.message}</Text>
                </View>
            </View>
        )
    }

    renderSuccess = () => {
        return (
            <View 
                style={{
                    flex: 1,
                    overflow: 'hidden',
                    position: 'relative',
                    backgroundColor: '#e1f7fa',
                }}
            >
                <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
                <View
                    style={{
                        position: 'absolute',
                        backgroundColor: '#fff',
                        top: screenHeightPercent(8),
                        left: 20,
                        zIndex: 10,
                        height: 40,
                        width: 40,
                        borderRadius: 50
                    }}
                >
                    <Ripple
                        onPress={() => {
                            this.props.navigation.goBack(null)
                        }}
                        style={{
                            height: '100%',
                            width: '100%',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                        rippleColor={'rgba(0,0,0,.5)'}
                    >
                        <Icon 
                            type={'ionicons'}
                            name={'arrow-back'}
                            color={'#444'}
                            size={24}
                        />
                    </Ripple>
                </View>
                {/* tmpt camera */}

                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems:'center'
                    }}
                >
                    <Text
                        style={{
                            fontWeight: 'bold',
                            fontSize: 24,
                            color: '#333'
                        }}
                    >{this.state.loaderUpload ? 'Uploading...' : 'Done !'}</Text>
                    <View
                        style={{
                            height: screenWidthPercent(82),
                            width: screenWidthPercent(82),
                            marginTop: 20,
                            borderRadius: 200,
                            zIndex: 0,
                            padding: 5,
                            borderWidth: 4,
                            borderColor: '#82befa',
                            position: 'relative'
                        }}
                    >
                        <View
                            style={{
                                height: '100%',
                                width: '100%',
                                backgroundColor: '#fff',
                                overflow: 'hidden',
                                borderRadius: 200,
                                zIndex: 0,
                                position: 'relative'
                            }}
                        >
                            <Image source={{uri: this.state.successPath}}
                                style={{
                                    width: '100%',
                                    height: '100%'
                                }}
                            />
                        </View>
                    </View>
                    <View
                        style={{
                            width: '80%'
                        }}
                    >
                        <Ripple
                            style={{
                                marginTop: 20,
                                width: '100%',
                            }}
                            onPress={() => {
                                this.setState({success: false, successPath: null, loaderUpload: false})
                                this.registerWajah()
                            }}
                            rippleColor={'rgba(255,255,255,.5)'}
                        >
                            <View style={{
                                backgroundColor: '#82befa',
                                width: '100%',
                                paddingVertical: 15,
                                borderRadius: 50,
                                position: 'relative',
                                justifyContent: 'center',
                                alignItems: 'center'

                            }}>
                                <Text style={{color: '#fff'}}>Reset</Text>
                            </View>
                        </Ripple>  
                        <Ripple
                            style={{
                                marginTop: 10,
                                width: '100%',
                            }}
                            onPress={() => {this.props.navigation.replace('FacialRecognitionIfExist')}}
                            rippleColor={'rgba(255,255,255,.5)'}
                        >
                            <View style={{
                                backgroundColor: this.state.loaderUpload ? '#9ec7f0' : '#6ab1f7',
                                width: '100%',
                                paddingVertical: 15,
                                borderRadius: 50,
                                position: 'relative',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center'

                            }}>
                                <Text style={{color: '#fff', marginRight: 5}}>{this.state.loaderUpload ? 'Uploading...' : 'Done'}</Text>
                                {this.state.loaderUpload &&
                                    <ActivityIndicator size="small" color="#fff" />
                                }
                            </View>
                        </Ripple>  
                    </View> 
                </View>
            </View>
        )
    }

    render(){
        return this.state.success ? this.renderSuccess() : this.renderDaftar()
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
    header: {
        backgroundColor: '#e1f7fa',
        height: screenHeightPercent(5)
    },
    headerBackground: {
        overflow: 'hidden',
        backgroundColor: '#555',
        top: 0,
        left: 0,
        width: '100%',
        height: screenHeightPercent(30),
        borderBottomLeftRadius: 50
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
    },
    formTextInput: {
        height: '100%',
        color: '#444'
    }
})