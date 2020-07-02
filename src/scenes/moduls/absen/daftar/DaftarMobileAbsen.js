
import React, {Component} from 'react'
import {
    View,
    Text,
    StatusBar,
    Image,
    ScrollView,
    FlatList,
    Modal,
    RefreshControl,
    TextInput,
    ActivityIndicator,
    ToastAndroid,
    TouchableOpacity
} from 'react-native'
import {screenHeightPercent, screenWidthPercent} from '../../../../helpers/Layout'
import { getData, storeData } from '../../../../services/LocalStorage'
import {faceRecognitionAbsenRegister, testAbsensi, deletefaceRecognitionAbsenRegister, simpanfaceRecognitionAbsenRegister, getFaceRecognitionAbsenUnRegister} from '../../../../services/ServiceSdm'
import {Icon} from 'react-native-elements'
import Ripple from 'react-native-material-ripple'
import { RNCamera } from 'react-native-camera'
import CardImage from '../../../../components/cards/CardImage'
import LinearGradient from 'react-native-linear-gradient'
import { background_color_gradient, ripple_color_primary, shadow, icon_color_primary, icon_color_secondary } from '../../../../themes/Default'
import Feather from 'react-native-vector-icons/Feather'
import MCI from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
export default class DaftarMobileAbsen extends Component{
    constructor(props){
        super(props)
        this.state = {
            userdata: null,
            unregister: null,
            sliderUpContentHeight: 100,
            message: 'Place your face inside the frame',
            detectedFace: false,
            showModalInfo: false,
            realTimeFaceData: null,
            success: false,
            successTest: false,
            uploadMessage: 'Mengupload...',
            testMessage: 'Test Face Recognition',
            successPath: null,
            loaderUpload: false,
            loaderTest: false,
            loaderSimpan: false,
            uploaded: false,
            errUpload: false,
            listFoto: []
        }
    }

    async componentDidMount(){
        try {
            this.mounted = true
            let userdata = await getData('AuthUser')
            if (this.mounted){
                const {response} = await getFaceRecognitionAbsenUnRegister(userdata._id)

                if (response !== null){
                    await deletefaceRecognitionAbsenRegister(userdata._id)
                }
                this.setState({
                    userdata 
                })
                this.registerWajah()
            } 
        }catch(err){
            ToastAndroid.show('Err on start activity'+err.message, 1000)
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
                    if (!this.state.detectedFace){
                        throw new Error('Face not deteceted')
                    }

                    
                },2000)
            } else {
                this.timeoutFaceRecog = setTimeout(async () => {
                    this.registerWajah()
                },1000)
            }
        } catch(err){
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
            this.setState({
                loaderUpload: true,
                uploadMessage: 'Mengupload..'
            })
            let i = 1
            for (const foto of listFoto){
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
                this.setState({
                    success: true
                })
                // this.props.navigation.replace('DaftarMobileAbsenIfExist')
            }
        } catch(err){
            this.setState({
                errUpload: true,
                loaderUpload: false,
                uploadMessage: `Connection Lost..try again? (${err.message})`
            })
        }
    }

    testFaceRecognition = async () => {
        try {
            this.setState({
                loaderTest: true
            })
            const photo = await this.camera.takePictureAsync({
                quality: 0.5,
                base64: true,
                orientation: 'portrait',
                width: 200,
            });
            const statusTest = await testAbsensi(photo, this.state.userdata._id)
            
            this.setState({
                loaderTest: false
            })
            if (statusTest.reqStat.code === 200){
                this.setState({
                    successTest: true
                })
            } 
            else
            if (statusTest.reqStat.code === 201){
                this.setState({
                    successTest: false,
                    testMessage: 'Coba Lagi'
                })
            } 
            else 
            {
                this.setState({
                    successTest: false,
                    testMessage: 'Wajah tidak cocok. Coba lagi?'
                })   
            }
        } catch(err){
            ToastAndroid.show('Somthing went wrong :'+err, 1000)
        }
    }

    takePicture = async () => {
        try {
            if (this.state.listFoto.length <= 2){
                const photo = await this.camera.takePictureAsync({
                    quality: 0.5,
                    base64: true,
                    orientation: 'portrait',
                    width: 200,
                });
                let listFoto = [...this.state.listFoto]
                
                listFoto.push(photo)
                this.setState({
                    listFoto
                })
            } else {
                
            }
        } catch(err){
            console.log(err)
        }
    }

    onFacesDetected = (faceData) => {
        try {
            if (this.timeoutdetectFace) clearTimeout(this.timeoutdetectFace)
            if (faceData.faces.length > 0){
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
            } else {
                this.setState({
                    detectedFace: false
                })
            }
        } catch(err){
            ToastAndroid.show(err.message, 1000)
        }
        
    }

    renderMiniListImageTaken = () => {
        return this.state.listFoto.map(item => {
            return <CardImage
                width={50}
                uri={item.uri}           
            />
        })
    }

    renderListImageTaken = () => {
        return this.state.listFoto.map(item => {
            return <CardImage
                width={screenWidthPercent(30)-10}
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
                }}
            >
                <Modal
                    transparent={true}
                    onRequestClose={() => {
                        this.setState({
                            showModalInfo: false
                        })
                    }}
                    animationType={'slide'}
                    visible={this.state.showModalInfo}
                >
                    <View
                        style={{
                            bottom: 0,
                            flex: 1,
                            flexDirection: 'column',
                            position: 'relative'
                        }}
                    >
                        {/* <TouchableOpacity
                            onPress={() => {
                                this.setState({
                                    showModalInfo: false
                                })
                            }}
                            style={{
                                flex: 1
                            }}
                        >

                        </TouchableOpacity> */}
                        <LinearGradient
                            start={{x: 0, y: 0}} 
                            end={{x: 2, y: 0}} 
                            colors={background_color_gradient} 
                            style={{
                                width: '100%',
                                height: '100%',
                                borderTopLeftRadius: 25,
                                borderTopRightRadius: 25,
                                backgroundColor: '#fff'
                            }}>
                            <View
                                style={{
                                    paddingHorizontal: 10, 
                                    alignSelf: 'flex-start',
                                    backgroundColor: "#fff",
                                    borderRadius: 20,
                                    paddingVertical: 5,
                                    margin: 10,
                                    flexDirection: 'row',
                                    alignItems: 'center'
                                }}
                            >
                                <Feather 
                                    name={'info'}
                                    color={icon_color_primary}
                                    size={16}
                                />
                                <Text
                                    style={{
                                        fontSize: 16,
                                        color: icon_color_primary,
                                        paddingLeft: 10
                                    }}
                                >Informasi</Text>
                                
                            </View>
                            <View
                                style={{
                                    flex: 1,
                                    paddingHorizontal: 10,
                                    paddingBottom: 10,
                                    position: 'relative'
                                }}
                            >
                                <View
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        paddingTop: 20,
                                        paddingHorizontal: 10,
                                        backgroundColor: '#fff',
                                        borderRadius: 20
                                    }}
                                >
                                    <View
                                        style={{
                                            width: '100%',
                                            flexDirection: 'row',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <Text
                                            style={{
                                                paddingRight: 10,
                                                color: icon_color_primary
                                            }}
                                        >1.</Text>
                                        <Text
                                            style={{
                                                color: icon_color_primary
                                            }}
                                        >Pastikan foto jelas dan tidak blur</Text>   
                                    </View>
                                    <View
                                        style={{
                                            marginTop: 10,
                                            width: '100%',
                                            flexDirection: 'row',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <Text
                                            style={{
                                                paddingRight: 10,
                                                color: icon_color_primary
                                            }}
                                        >2.</Text>
                                        <Text
                                            style={{
                                                color: icon_color_primary
                                            }}
                                        >Pastikan foto terang / tidak backlight</Text>   
                                    </View>
                                    <View
                                        style={{
                                            marginTop: 10,
                                            width: '100%',
                                            flexDirection: 'row',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <Text
                                            style={{
                                                paddingRight: 10,
                                                color: icon_color_primary
                                            }}
                                        >3.</Text>
                                        <Text
                                            style={{
                                                color: icon_color_primary
                                            }}
                                        >Pastikan anda tidak menggunakan masker saat mengambil foto</Text>      
                                    </View>
                                    <View
                                        style={{
                                            marginTop: 10,
                                            width: '100%',
                                            flexDirection: 'row',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <Text
                                            style={{
                                                paddingRight: 10,
                                                color: icon_color_primary
                                            }}
                                        >4.</Text>
                                        <Text
                                            style={{
                                                flex: 1,
                                                color: icon_color_primary
                                            }}
                                        >Pastikan foto yang di ambil merupakan foto selfie (tidak ada orang lain dalam foto).</Text>      
                                    </View>
                                </View>
                            </View>
                        </LinearGradient>
                    </View>
                </Modal>
                <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
                <View
                    style={{
                        position: 'absolute',
                        zIndex: 4,
                        width: '100%',
                        flexDirection: 'row',
                        paddingHorizontal: 20,
                        justifyContent: 'flex-end',
                        top: screenHeightPercent(6)
                    }}
                >
                    {this.state.listFoto.length < 3 &&
                        <View
                            style={{
                                height: 50,
                                flexDirection: 'row'  
                            }}
                        >
                            {this.renderMiniListImageTaken()}
                        </View>
                    }
                    
                    <Ripple
                        onPress={() => {
                            if (this.state.detectedFace){
                                ToastAndroid.show('Wajah terdeteksi', 600)
                            } else {
                                ToastAndroid.show('Wajah tidak terdeteksi', 600)
                            }
                        }}
                        rippleColor={ripple_color_primary}
                        style={{
                            width: 45,
                            height: 45,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: '#fff',
                            borderRadius: 10
                        }}
                    >
                        {this.state.detectedFace ? 
                            <Feather 
                                name={'user-check'}
                                size={20}
                                color={icon_color_primary}
                            /> : 
                            <Feather 
                                name={'user-x'}
                                size={20}
                                color={icon_color_primary}
                            />
                        }
                        
                    </Ripple>
                </View>
                <View
                    style={{
                        height: screenHeightPercent(70),
                        position: 'absolute',
                        width: '100%'
                    }}
                >
                    <RNCamera
                        ref={ref => {
                            this.camera = ref;
                        }}
                        autoFocus={RNCamera.Constants.AutoFocus.on}
                        style={{
                            width: '100%',
                            height: '100%'
                        }}  
                        faceDetectionLandmarks={RNCamera.Constants.FaceDetection.Landmarks.all}
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
                <Ripple
                    onPress={async () => {
                        try {
                            if (this.state.success){
                                const {reqStat} = await deletefaceRecognitionAbsenRegister(this.state.userdata._id)
                                this.setState({
                                    success: false,
                                    errUpload: false,
                                    testMessage: 'Test Face Recognition',
                                    listFoto: []
                                })
                            } else {
                                this.props.navigation.goBack(null)
                            }
                        } catch(err){
                            console.log(err)
                        }
                    }}
                    style={[{
                        height: 50,
                        marginLeft: 10,
                        paddingHorizontal: 20,
                        borderRadius: 25,
                        zIndex: 3,
                        position: 'absolute',
                        bottom: screenHeightPercent(40)-25,
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'flex-start',
                        backgroundColor: '#fff',
                        flexDirection: 'row'
                    },shadow]}
                    rippleColor={ripple_color_primary}
                >
                    <Icon 
                        type={'ionicons'}
                        name={this.state.success ? 'close' : 'arrow-back'}  
                        color={icon_color_primary}
                        size={22}
                    />
                    <Text
                        style={{
                            color: icon_color_primary,
                            fontSize: 13,
                            marginLeft: 10,
                        }}
                    >{this.state.success ? 'Reset' : 'Kembali'}</Text>
                </Ripple>
                <Ripple
                    onPress={() => {
                        this.setState({
                            showModalInfo: true
                        })
                    }}
                    style={[{
                        height: 50,
                        width: 50,
                        marginRight: 10,
                        borderRadius: 25,
                        zIndex: 3,
                        right: 0,
                        position: 'absolute',
                        bottom: screenHeightPercent(40)-25,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#fff',
                        flexDirection: 'row'
                    },shadow]}
                    rippleColor={ripple_color_primary}
                >
                    <Feather 
                        name={'info'}
                        color={icon_color_primary}
                        size={22}
                    />
                </Ripple>
                <LinearGradient
                    start={{x: 0, y: 0}} 
                    end={{x: 2, y: 0}} 
                    colors={background_color_gradient} 
                    style={[{
                        width: '100%',
                        height: screenHeightPercent(40),
                        backgroundColor: "#fff",
                        position: 'absolute',
                        bottom: 0
                    }]}>
                    <ScrollView
                        style={{
                            flex:1,
                        }}
                    >
                        <View
                            style={{
                                paddingTop: '10%',
                                paddingHorizontal: 20
                            }}
                        >
                            {this.state.listFoto.length < 3 ?
                                <View
                                    style={{
                                        width: '100%'
                                    }}
                                >
                                    <Text
                                        style={{
                                            width: '100%',
                                            textAlign: 'center',
                                            fontSize: 13,
                                            fontWeight: 'bold',
                                            color: '#fff'
                                        }}
                                    >
                                        Daftarkan wajah anda minimal 3 foto wajah
                                    </Text>
                                    <Text
                                        style={{
                                            marginTop: 5,
                                            width: '100%',
                                            textAlign: 'center',
                                            fontSize: 13,
                                            color: '#fff'
                                        }}
                                    >Tap tombol berikut untuk mengambil foto</Text>
                                    <View
                                        style={{
                                            width:'100%',
                                            paddingTop: 20,
                                            alignItems: 'center'
                                        }}
                                    >
                                        <Ripple
                                            onPress={this.takePicture}
                                            rippleColor={ripple_color_primary}
                                            style={{
                                                height: 80,
                                                width: 80,
                                                overflow: 'hidden',
                                                borderRadius: 40,
                                                backgroundColor: this.state.detectedFace ? icon_color_primary : '#eee',
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }}
                                        >
                                            <View
                                                style={{
                                                    height: 70,
                                                    width: 70,
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    borderRadius: 40,
                                                    backgroundColor: '#fff'
                                                }}
                                            >
                                                {this.state.detectedFace ? 
                                                    <MCI 
                                                        name={'face-outline'}
                                                        size={25}
                                                        color={icon_color_primary}
                                                    />
                                                    : 
                                                    <Ionicons 
                                                        name={'ios-close'}
                                                        size={40}
                                                        color={icon_color_primary}
                                                    />
                                                }
                                                
                                            </View>
                                        </Ripple>
                                    </View>  
                                </View> 
                                : 
                                <View
                                    style={{
                                        flex: 1
                                    }}
                                >
                                    <View
                                        style={{
                                            justifyContent: 'space-between',
                                            flexDirection: 'row',
                                            marginTop: 20,
                                            width: '100%',
                                            height: screenWidthPercent(35)
                                        }}
                                    >
                                        {this.renderListImageTaken()}
                                    </View>
                                    <View
                                        style={{
                                            width: '100%',
                                            justifyContent: 'center',
                                            flexDirection: 'row',
                                            paddingTop: 20
                                        }}
                                    >
                                        {this.state.success ? 
                                            (this.state.successTest ? 
                                                <Ripple
                                                    onPress={async () => {
                                                        try {
                                                            this.setState({
                                                                loaderSimpan: true
                                                            })
                                                            await simpanfaceRecognitionAbsenRegister(this.state.userdata._id)
                                                            this.setState({
                                                                loaderSimpan: false
                                                            }, () =>{
                                                                this.props.navigation.replace('DaftarMobileAbsenIfExist')
                                                            })
                                                        } catch(err){
                                                            this.setState({
                                                                loaderSimpan: false
                                                            })
                                                            ToastAndroid.show('Something went wrong'+err, 1000)
                                                        }
                                                    }}
                                                    rippleColor={ripple_color_primary}
                                                    style={[{
                                                        backgroundColor: this.state.detectedFace === true ? '#fff' : '#eee',
                                                        paddingVertical: 10,
                                                        paddingHorizontal: 20,
                                                        borderRadius: 20,
                                                        flexDirection: 'row',
                                                        alignItems: 'center',
                                                        overflow: 'hidden'
                                                    }]}
                                                >
                                                    <Text
                                                        style={{
                                                            fontSize: 14,
                                                            marginRight: 10,
                                                            color: icon_color_primary
                                                        }}
                                                    >Lanjutkan</Text>
                                                    {this.state.loaderSimpan ? 
                                                        <ActivityIndicator size={20} color={icon_color_primary}/> 
                                                        : 
                                                        <Icon 
                                                            type={'ionicons'}
                                                            name={'arrow-forward'}  
                                                            color={icon_color_primary}
                                                            size={22}
                                                        />
                                                    }
                                                    
                                                </Ripple> :  
                                                <Ripple
                                                    onPress={() => {
                                                        this.testFaceRecognition()
                                                    }}
                                                    rippleColor={ripple_color_primary}
                                                    style={[{
                                                        backgroundColor: this.state.detectedFace === true ? '#fff' : '#eee',
                                                        paddingVertical: 10,
                                                        paddingHorizontal: 20,
                                                        borderRadius: 20,
                                                        flexDirection: 'row',
                                                        alignItems: 'center',
                                                        overflow: 'hidden'
                                                    }]}
                                                >
                                                    <Text
                                                        style={{
                                                            fontSize: 14,
                                                            marginRight: 10,
                                                            color: icon_color_primary
                                                        }}
                                                    >{this.state.testMessage}</Text>
                                                    {this.state.loaderTest ? 
                                                        <ActivityIndicator size={20} color={icon_color_primary}/> 
                                                        : 
                                                        <MCI 
                                                            name={'face-recognition'}
                                                            size={15}
                                                            color={icon_color_primary}
                                                        />
                                                    }
                                                    
                                                </Ripple>  
                                            )
                                            : 
                                            <Ripple
                                                onPress={() => {
                                                    this.doUploadAndRegist()
                                                }}
                                                rippleColor={ripple_color_primary}
                                                style={[{
                                                    backgroundColor: '#fff',
                                                    paddingVertical: 10,
                                                    paddingHorizontal: 20,
                                                    borderRadius: 20,
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    overflow: 'hidden'
                                                }]}
                                            >
                                                <Text
                                                    style={{
                                                        fontSize: 14,
                                                        marginRight: 10,
                                                        color: icon_color_primary
                                                    }}
                                                >{this.state.loaderUpload || this.state.errUpload ? this.state.uploadMessage : 'Simpan'}</Text>
                                                {this.state.loaderUpload ? 
                                                    <ActivityIndicator size={20} color={icon_color_primary}/> 
                                                    : 
                                                    <Feather 
                                                        name={'upload'}
                                                        size={15}
                                                        color={icon_color_primary}
                                                    />
                                                }
                                            </Ripple>
                                        }
                                        
                                        {/* <Ripple
                                            rippleColor={ripple_color_primary}
                                            style={[{
                                                backgroundColor: '#fff',
                                                paddingVertical: 10,
                                                paddingHorizontal: 20,
                                                borderRadius: 20,
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                overflow: 'hidden'
                                            }]}
                                        >
                                            <Text
                                                style={{
                                                    fontSize: 14,
                                                    marginRight: 10,
                                                    color: icon_color_primary
                                                }}
                                            >Coba</Text>
                                            <MCI 
                                                name={'face'}
                                                size={15}
                                                color={icon_color_primary}
                                            />
                                        </Ripple> */}
                                    </View>
                                </View>
                            }
                            
                        </View>
                    </ScrollView>
                </LinearGradient>
            </View>
        )
    }

    render(){
        return this.renderDaftar()
    }
}

{/* <View
    style={{
        flex: 1,
        justifyContent: 'center',
        alignItems:'center'
    }}
>
    
    
    
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
</View> */}