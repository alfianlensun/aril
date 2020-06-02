import React, {Component} from 'react'
import {
    View,
    Text,
    StatusBar,
    StyleSheet
} from 'react-native'
import Ripple from 'react-native-material-ripple'
import {screenHeightPercent, screenWidthPercent} from '../../../helpers/Layout'
import {Icon} from 'react-native-elements'
import MapView, { PROVIDER_GOOGLE, Marker, Polygon } from 'react-native-maps';
import { requestPermissionLocation } from '../../../services/Permission'
import Geolocation from 'react-native-geolocation-service';
import SlidingUpPanel from 'rn-sliding-up-panel'
import { getSettingAllSetting, createSettingRangeAccess } from '../../../services/ServiceSetting'

export default class SettingAplikasiGeofence extends Component{
    constructor(props){
        super(props)
        this.state = {
            sliderUpContentHeight: 100,
            allowDragging: false,
            reset: false,
            coordinate: {
                latitude: 1.456508,
                longitude: 124.809054
            },
            realTimeLocation: {
                latitude: 1.456508,
                longitude: 124.809054
            },
            tempMarkLocation: [],
            markLocation: [],
            initialRegion: {
                latitude: 1.456508,
                longitude: 124.809054,
                latitudeDelta: 0.0000001,
                longitudeDelta: 0.01,
            }
        }
    }

    componentDidMount(){
        this.sliderUp.hide()
        this.geoLocation()
        this.getSetting()
        
    }

    getSetting = async () => {
        try{
            const {response} = await getSettingAllSetting()
            console.log(response)
            if (response){
                this.setState({
                    tempMarkLocation: response,
                    markLocation: response
                })
            }
        } catch(err){
            console.log(err)
        }
    }

    saveSetting = async () => {
        try{
            await createSettingRangeAccess(this.state.markLocation)
        } catch(err){
            console.log(err)
        }
    }


    renderOpsiSliderBedKosong(){
        return (
            <View style={Styles.containerSlider}>
                <Ripple
                    onPress={async () => {
                        try{
                            await this.saveSetting()  
                            this.props.navigation.goBack(null)
                        }catch(err){    
                            this.sliderUp.hide()
                        }
                    }}
                    rippleColor={'rgba(0,0,0, .4)'}
                    style={{
                        width: '33%',
                        height: 100,
                        borderRadius: 45,
                        justifyContent: 'center',
                        overflow: 'hidden',
                        alignItems: 'center'
                    }}
                >
                    <View
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 50,
                            width: 70,
                            height: 50
                        }}
                    >
                        <Icon 
                            type={'ionicons'}
                            name={'check-circle'}
                            color={'rgba(66, 179, 245, 1)'}
                            size={34}
                        />
                    </View>
                    <Text
                        style={{
                            fontSize: 12
                        }}
                    >Simpan Perubahan</Text>
                </Ripple>
                <Ripple
                    onPress={() => {
                        this.sliderUp.hide()
                        this.props.navigation.goBack(null)
                    }}
                    rippleColor={'rgba(0,0,0, .4)'}
                    style={{
                        width: '33%',
                        height: 100,
                        borderRadius: 45,
                        overflow: 'hidden',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <View
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 50,
                            width: 80,
                            height: 50
                        }}
                    >
                        <Icon 
                            type={'ionicons'}
                            name={'close'}
                            color={'rgba(66, 179, 245, 1)'}
                            size={30}
                        />
                    </View>
                    <Text
                        style={{
                            
                            fontSize: 12
                        }}
                    >Batal</Text>
                </Ripple>
                
            </View>
        )
    }

    async geoLocation() {
        requestPermissionLocation().then(resp => {
            Geolocation.getCurrentPosition((position) => {
                    this.setState({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    })
                },(error) => {
                    console.log(error)
                },
                { 
                    enableHighAccuracy: true, 
                    timeout: 15000, 
                    maximumAge: 10000 
                }
            );

            console.log(this.state.markLocation)
            Geolocation.watchPosition((location) => {
                this.setState({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude
                })
            }, (err) => {
                console.log(err)
            }, {
                enableHighAccuracy: true,
                fastestInterval: 5000,
                interval: 5000,
                forceRequestLocation: true
            })
        }).catch(err => {
            console.log(err)
        })
    }

    render(){
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
                            if (this.state.tempMarkLocation !== this.state.markLocation){
                                this.sliderUp.show()
                            } else {
                                this.sliderUp.hide()
                                this.props.navigation.goBack(null)
                            }
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
                {this.state.tempMarkLocation.length > 0 ? 
                    <View
                        style={{
                            position: 'absolute',
                            backgroundColor: '#fff',
                            top: screenHeightPercent(8),
                            right: this.state.reset ? 80 : 20,
                            zIndex: 10,
                            height: 40,
                            width: 40,
                            borderRadius: 50
                        }}
                    >
                        <Ripple
                            onPress={() => {
                                this.setState({
                                    markLocation: []
                                })
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
                                name={'close'}
                                color={'#444'}
                                size={24}
                            />
                        </Ripple>
                    </View> : null
                }
                {this.state.reset ? 
                    <View
                        style={{
                            position: 'absolute',
                            backgroundColor: '#fff',
                            top: screenHeightPercent(8),
                            right: 20,
                            zIndex: 10,
                            height: 40,
                            width: 40,
                            borderRadius: 50
                        }}
                    >
                        <Ripple
                            onPress={() => {
                                this.setState({
                                    reset: false,
                                    markLocation: this.state.tempMarkLocation
                                })
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
                                name={'undo'}
                                color={'#444'}
                                size={24}
                            />
                        </Ripple>
                    </View> : null
                }
                <MapView 
                    showsUserLocation={true}
                    onPress={(event) => {
                        let mark = [...this.state.markLocation];
                        mark.push({
                            latitude: event.nativeEvent.coordinate.latitude,
                            longitude: event.nativeEvent.coordinate.longitude
                        })

                        this.setState({
                            reset: true,
                            markLocation: mark
                        })
                    }}
                    style={{...StyleSheet.absoluteFillObject}}
                    provider={PROVIDER_GOOGLE}
                    initialRegion={this.state.initialRegion}>
                    
                    {this.state.markLocation.length > 0 ? 
                        <Polygon 
                            strokeColor={'rgba(66, 179, 245, .3)'}
                            fillColor={'rgba(66, 179, 245, .3)'}
                            coordinates={this.state.markLocation}
                        /> : null
                    }
                </MapView>
                <SlidingUpPanel
                    friction={.4}
                    draggableRange={{ top: this.state.sliderUpContentHeight, bottom: 0 }}
                    onBackButtonPress={() => {
                        this.sliderUp.hide(); 
                        return true
                    }}
                    allowDragging={this.state.allowDragging}
                    ref={c => this.sliderUp = c}>
                    {this.renderOpsiSliderBedKosong()}
                </SlidingUpPanel>
            </View>
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
    header: {
        height: screenHeightPercent(6)
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
})