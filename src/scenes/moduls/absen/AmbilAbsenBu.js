import React, { createRef, useState, forwardRef, useImperativeHandle, useEffect } from 'react'
import {
    View,
    ImageBackground,
    Text,
    StyleSheet
} from 'react-native'
import SlidingUpPanel from 'rn-sliding-up-panel';
import { screenHeightPercent } from '../../../helpers/Layout';
import { RNCamera } from 'react-native-camera';
import Ripple from 'react-native-material-ripple';
import Geolocation from 'react-native-geolocation-service';
import { Icon } from 'react-native-elements';
import { getSettingAllSetting } from '../../../services/ServiceSetting';
import GeoFencing from 'react-native-geo-fencing';

const sliderUp = createRef()
const camera = createRef()
const timeoutdetectFace = createRef()
const watchPosition = createRef()
const AmbilAbsen = forwardRef((props, ref) => {
    const [realTimeLocation, setRealTimeLocation] = useState(null)
    const [loaderCheckLocation, setLoaderCheckLocation] = useState(true)
    const [locationSetting, setLocationSetting] = useState([])
    const [inLocation, setInLocation] = useState(false)
    const [absenType, setAbsenType] = useState(0)
    const [status, setStatus] = useState(0)
    const [realTimeFaceData, setRealTimeFaceData] = useState(false)
    const [detectedFace, setDetectedFace] = useState(false)
    const [scanFaceMessage, setScanFaceMessage] = useState('Hadapkan wajah anda ke camera')
    const [sliderUpContentHeight, setsliderUpContentHeight] = useState(400)
    const [allowDragging, setAllowDragging] = useState(false)

    useImperativeHandle(ref, () => ({
        show(height = 400) {
            sliderUp.current.show(height, {
                y: .2
            })
            getLocationSetting().then((location) => {
                setLocationSetting(location)
                watchMyPosition().then(() => {
                    checkLocation()
                })
            })
        }
    }));

    const checkLocation = () => {
        console.log('why', (locationSetting))
        if (realTimeLocation === null){
            return false
        }
        let point = {
            lat: realTimeLocation.latitude,
            lng: realTimeLocation.longitude
        }
        let range = locationSetting.map(item => {
            return {
                lat: item.latitude,
                lng: item.longitude
            }
        })

        GeoFencing.containsLocation(point, range)
                    .then((result) => {
                        console.log('tes call')
                        setLoaderCheckLocation(false)
                        setInLocation(true)
                    })
                    .catch((err) => {
                        console.log(err)
                        setLoaderCheckLocation(false)
                        setInLocation(false)
                    })
    }

    useEffect(() => {
        
        return () => {
            console.log('unmount')
            setInLocation(false)
            setRealTimeLocation(null)
            setLoaderCheckLocation(false)
            if (watchPosition.current){
                Geolocation.clearWatch(watchPosition.current)
            }
        }
    }, [])

    const onFacesDetected = (faceData) => {
        if (timeoutdetectFace.current) clearTimeout(timeoutdetectFace.current)
        setDetectedFace(true)
        setRealTimeFaceData(faceData)
        setScanFaceMessage('Jaga wajah Anda tetap berada dalam jangkauan kamera')
        timeoutdetectFace.current = setTimeout(() => {
            setDetectedFace(false)
            setScanFaceMessage('Hadapkan wajah anda ke kamera')
        },600)
    }

    const watchMyPosition = async () => {
        console.log('watch position', locationSetting)
        watchPosition.current = Geolocation.watchPosition(async (location) => {
            setRealTimeLocation({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
            })
        }, (err) => {
            console.log(err)
        }, {
            enableHighAccuracy: true,
            fastestInterval: 1000,
            interval: 1000,
            distanceFilter: 1,
            forceRequestLocation: true,
        })
    }

    const getLocationSetting = async () => {
        try {
            const {response} = await getSettingAllSetting()  
            return response
        } catch(err){
            throw new Error(err)
        }
    }

    const renderFaceRecognition = () => {
        return (
            <View style={Styles.containerSlider}>
                <RNCamera
                    ref={ref => {
                        camera.current = ref;
                    }}
                    autoFocus={RNCamera.Constants.AutoFocus.on}
                    style={{
                        flex: 1,
                    }}
                    type={RNCamera.Constants.Type.front}
                    captureAudio={false}
                    onFacesDetected={onFacesDetected}
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
                        >{absenType === 1 ? 'Absen Masuk' : 'Absen Pulang'}</Text>
                        {status === 1 ?
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
                        {status === 1 ? 
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
                            >{scanFaceMessage}</Text>
                        }
                        {status === 1 &&
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

    const renderLoaderCheckLocation = () => {
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

    const renderIfNotInLocation = () =>{
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
                        color={'#555'} />
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

    const renderOpsiAbsen = () => {
        return (
            <View style={Styles.containerSlider}>
                <View
                    style={{
                        width: '100%',
                        padding: 20,
                        alignItems: 'center'
                    }}
                >
                    <Text
                        style={{
                            fontWeight: 'bold',
                            width: '100%',
                            paddingVertical: 10
                        }}
                    >
                        Hal yang di perlukan untuk melakukan absensi : 
                    </Text>
                    <View
                        style={{
                            paddingVertical: 5,
                            flexDirection: 'row'
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 13,
                                width: '5%'
                            }}
                        >
                            1.   
                        </Text>
                        <Text
                            style={{
                                fontSize: 13,
                                width: '95%',
                                lineHeight: 22
                            }}
                        >
                            Pastikan wajah anda telah terdaftar di aplikasi.
                        </Text>
                    </View>
                    <View
                        style={{
                            paddingVertical: 5,
                            flexDirection: 'row'
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 13,
                                width: '5%'
                            }}
                        >
                            2.   
                        </Text>
                        <Text
                            style={{
                                fontSize: 13,
                                color: '#333',
                                width: '95%',
                                lineHeight: 22
                            }}
                        >
                            Pastikan anda berada dilingkungan RSUP Prof Dr. R. D. Kandou
                        </Text>
                    </View>
                    <Ripple
                        onPress={() => setAbsenType(1)}
                        rippleColor={'rgba(0,0,0,.4)'}
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '100%',
                            height: 50,
                            borderRadius: 30,
                            marginTop: 40,
                            backgroundColor: '#6ab1f7'
                        }}
                    >
                        <Text
                            style={{color: '#fff'}}
                        >Masuk</Text>   
                    </Ripple>
                    <Ripple
                        onPress={() => setAbsenType(2)}
                        rippleColor={'rgba(0,0,0,.4)'}
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '100%',
                            height: 50,
                            borderRadius: 30,
                            marginVertical: 10,
                            backgroundColor: '#6ab1f7'
                        }}
                    >
                        <Text
                            style={{color: '#fff'}}
                        >Pulang</Text>   
                    </Ripple>
                </View>
            </View>
        )   
    }
    return (
        <SlidingUpPanel
            friction={.4}
            onBottomReached={() => setAbsenType(0)}
            draggableRange={{ top: sliderUpContentHeight, bottom: 0 }}
            onBackButtonPress={() => {
                sliderUp.current.hide() 
                return true
            }}
            allowDragging={allowDragging}
            ref={c => sliderUp.current = c}>
            {loaderCheckLocation === true ? renderLoaderCheckLocation() :(inLocation === false ? renderIfNotInLocation() : (absenType === 0 ? renderOpsiAbsen() : renderFaceRecognition()))}
        </SlidingUpPanel>
    )
})

export default AmbilAbsen

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
    }
})