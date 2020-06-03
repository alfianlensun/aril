
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
import {screenHeightPercent, screenWidthPercent} from '../../../../helpers/Layout'
import { getData, storeData } from '../../../../services/LocalStorage'
import {faceRecognitionAbsenRegister} from '../../../../services/ServiceSdm'
import {Icon} from 'react-native-elements'
import Ripple from 'react-native-material-ripple'
import { RNCamera } from 'react-native-camera'
import CardImage from '../../../../components/cards/CardImage'
import * as Progress from 'react-native-progress';

export default class DaftarMobileAbsen extends Component{
    constructor(props){
        super(props)
        this.state = {
            userdata: null,
            sliderUpContentHeight: 100,
            message: 'Place your face inside the frame',
            detectedFace: false,
            realTimeFaceData: null,
            success: false,
            uploadMessage: 'Uploading...',
            successPath: null,
            loaderUpload: false,
            uploaded: false,
            errUpload: false,
            listFoto: []
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
        clearTimeout(this.timeoutupload)
    }
    

    registerWajah = async () => {
        try {
            const userdetail = {...this.state.userdata}
            if (this.timeoutFaceRecog) clearTimeout(this.timeoutFaceRecog)   
            if (this.state.detectedFace){
                this.timeoutFaceRecog = setTimeout(async () => {
                    const options = { quality: 0.5, base64: true };

                    if (!this.state.detectedFace){
                        throw new Error('Face not deteceted')
                    }

                    const photo = await this.camera.takePictureAsync(options);
                    if (this.state.listFoto.length < 3){
                        let listFoto = [...this.state.listFoto]
                        
                        listFoto.push(photo)
                        this.setState({
                            listFoto
                        })
                        this.registerWajah()
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

    doUploadAndRegist = async () => {
        try {
            const listFoto = [...this.state.listFoto]
            let successUpload = 0
            if (listFoto.length === 3){
                this.setState({
                    loaderUpload: true,
                    uploadMessage: 'Uploading..'
                })
                let i = 1
                for (const foto of listFoto){
                    this.setState({
                        uploadMessage: `Uploading image ${i}..`
                    })
                    const {reqStat} = await faceRecognitionAbsenRegister(foto, this.state.userdata._id)
                    if (reqStat.code === 200){
                        successUpload=successUpload+1;
                    } else {
                        setTimeout(() => {
                            this.doUploadAndRegist()
                        },2000)
                    }
                    i++
                }

                if (successUpload === 3){
                    this.props.navigation.replace('DaftarMobileAbsenIfExist')
                }
            }
        } catch(err){
            this.setState({
                errUpload: true,
                loaderUpload: false,
                uploadMessage: `Connection Lost..try again? (${err.message})`
            })
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
            // potensi bug **** cleartimeout timeoutFaceRecog
            this.setState({
                message: 'Place your face inside the frame',
                detectedFace: false
            })
        },600)
    }

    renderListImageTaken = () => {
        return this.state.listFoto.map(item => {
            return <CardImage
                width={'30%'}
                uri={item.uri}              
            />
        })
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
                    <Text
                        style={{
                            fontSize: 14,
                            color: '#333',
                        }}
                    >Take at least 3 photos</Text>
                    <Text
                        style={{
                            marginBottom: 40,
                            fontSize: 14,
                            color: '#333',
                        }}
                    >{this.state.message}</Text>
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
                    
                    <View
                        style={{
                            justifyContent: 'center',
                            flexDirection: 'row',
                            marginTop: 20,
                            width: '100%',
                            height: '15%'
                        }}
                    >
                    {this.renderListImageTaken()}
                    </View>
                    <View
                        style={{
                            width: '100%',
                            paddingHorizontal: 40
                        }}
                    >
                        {this.state.listFoto.length > 0 &&
                            <Ripple
                                style={{
                                    marginTop: 20,
                                    width: '100%',
                                }}
                                onPress={() => {
                                    this.setState({
                                        listFoto: []
                                    })
                                    this.registerWajah()
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
                                    <Text style={{color: '#fff'}}>Reset</Text>
                                </View>
                            </Ripple> 
                        }
                        {this.state.listFoto.length === 3 &&
                            <Ripple
                                style={{
                                    marginTop: 10,
                                    width: '100%',
                                }}
                                onPress={() => this.doUploadAndRegist()}
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
                                    <Text style={{color: '#fff',marginRight: 10}}>{this.state.loaderUpload || this.state.errUpload ? this.state.uploadMessage : 'Next'}</Text>
                                    {this.state.loaderUpload && 
                                        <ActivityIndicator size="small" color="#fff" />
                                    }
                                </View>
                            </Ripple> 
                        }
                    </View>
                </View>
            </View>
        )
    }

    render(){
        return this.renderDaftar()
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