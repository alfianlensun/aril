import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    Image,
    ToastAndroid,
    ActivityIndicator,
    ImageBackground
} from 'react-native'
// import MapView, { PROVIDER_GOOGLE, Marker, Polygon } from 'react-native-maps';
import SlidingUpPanel from 'rn-sliding-up-panel'
import { icon_color_primary, icon_color_secondary, ripple_color_primary } from '../../../themes/Default';
import Entypo from 'react-native-vector-icons/Entypo'
import { Dimensions } from "react-native";
import moment from 'moment'
import config from '../../../Config'
import MapboxGL from "@react-native-mapbox-gl/maps";
import { screenHeightPercent, screenWidthPercent } from '../../../helpers/Layout';
import Ripple from 'react-native-material-ripple'
import {Icon} from 'react-native-elements'

MapboxGL.setAccessToken('pk.eyJ1IjoiYWxmaWFubGVuc3VuIiwiYSI6ImNqbmFhc3RzbjdteDIzcW55dzl0ZWwzdzEifQ.3M-jznSp5U5rwWxO1h01Lw');
export default class AbsenDetail extends Component{
    constructor(props){
        super(props)
        const params = props.route.params
        const {width, height} = Dimensions.get('window')
        const latitudeDelta = 0.28
        const longitudeDelta = latitudeDelta * (width/height)
        this.state = {
            params: params.params,
            location_absen: null,
            loadImage: true,
            initialRegion: [124.809054, 1.456508],
            latitudeDelta: 0.28,
            longitudeDelta: longitudeDelta
        }
    }

    async componentDidMount(){
        this.prepareDataAbsen()   
        // this.sliderUp.show(100); 
    }

    prepareDataAbsen = () => {
        try {
            const {params} = this.state
            if (params.location !== undefined){
                if (params.location.latitude.length > 0 && params.location.longitude > 0){
                    this.setState({
                        location_absen: [params.location.longitude, params.location.latitude]
                    })       
                }
            }
        } catch(err){
            ToastAndroid.show('Something went wrong :', err.message, 1000)
        }
    }
    
    render(){
        return(
            <View
                style={{
                    flex: 1,
                    backgroundColor: "#fff"
                }}
            >
                <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
                <View
                    style={{
                        flex: 1
                    }}
                >
                    <MapboxGL.MapView
                        styleURL={'mapbox://styles/alfianlensun/ckbep7o6p3ds81iqoylih8ton'}
                        ref={map => this.maps = map}
                        style={{
                            flex: 1
                        }}

                        attributionEnabled={false}
                        zoomEnabled={true}
                        compassEnabled={false}
                        compassViewPosition={2}   
                        logoEnabled={false}
                    >
                        <MapboxGL.UserLocation 
                            visible={true}
                        />
                        <MapboxGL.Camera 
                            zoomLevel={16}
                            defaultSettings={{
                                zoomLevel: 10,
                                centerCoordinate: this.state.location_absen
                            }}
                            centerCoordinate={this.state.location_absen}
                        />
                        {this.state.location_absen !== null && 
                            <MapboxGL.MarkerView
                                coordinate={this.state.location_absen}
                            >
                                <View
                                    style={{
                                        backgroundColor: 'transparent',
                                        alignItems: 'center'
                                    }}
                                >
                                    <View
                                        style={{
                                            alignItems: 'center'
                                        }}
                                    >
                                        <View
                                            style={{
                                                backgroundColor: '#2b6cb0',
                                                borderRadius: 10,
                                                paddingVertical: 5,
                                                paddingHorizontal: 10,
                                                alignItems: 'center',
                                                flexDirection: 'row'

                                            }}
                                        >
                                            <Text
                                                style={{
                                                    fontWeight: 'bold',
                                                    color: "#fff",
                                                    fontSize: 13
                                                }}
                                            >Absen {this.state.params.absen_type === 1 ? 'Masuk' : 'Pulang'} </Text>
                                            <Entypo name="dot-single" color={'#fff'} size={20}/>
                                            <Text
                                                style={{
                                                    fontSize: 13,
                                                    fontWeight: 'bold',
                                                    color: '#fff'
                                                }}
                                            >{moment(this.state.params.server_datetime).format('DD-MM-YYYY HH:mm:ss')}</Text>
                                        </View>
                                        <View
                                            style={{
                                                marginTop: 10,
                                                height: 50,
                                                width: 50,
                                                borderRadius: 15,
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                backgroundColor: '#aaa',
                                                overflow: 'hidden',
                                                position: 'relative',
                                                borderWidth: 1,
                                                borderColor: '#fff'
                                            }}
                                        >
                                            {this.state.loadImage &&
                                                <View
                                                    style={{
                                                        height: '100%',
                                                        width: '100%',
                                                        position: 'absolute',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                    }}
                                                >
                                                    <ActivityIndicator size={20} color="#fff"/>
                                                </View>
                                            }
                                            <Image 
                                                onLoadEnd={() => this.setState({loadImage: false})}
                                                source={{uri: `${config.ws.resources.absen_image}/${this.state.params.user.ID}/${this.state.params.imagepath}`}} 
                                                style={{
                                                    height: 50,
                                                    width: 50,
                                                }} 
                                            />
                                        </View>
                                    </View>
                                </View>
                            </MapboxGL.MarkerView>
                        }
                    </MapboxGL.MapView>
                    <View
                        style={{
                            width: '100%',
                            position: 'absolute',
                            flexDirection: 'row',
                            top: screenHeightPercent(5),
                            left: 10
                        }}
                    >
                        <Ripple
                            onPress={() => this.props.navigation.goBack(null)}
                            rippleColor={ripple_color_primary}
                            style={{
                                backgroundColor: '#fff',
                                height: 40,
                                width: 40,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 20,
                            }}
                        >
                            <Icon 
                                type={'ionicons'}
                                name={'arrow-back'}
                                color={'#444'}
                                size={24}
                            />
                        </Ripple>
                    </View>
                </View>
                {/* <SlidingUpPanel 
                    onBottomReached={() => console.log('bottom')}
                    containerStyle={{
                        flex: 1,
                    }}
                    friction={.4}
                    onBackButtonPress={() => {
                        
                    }}
                    snappingPoints={[200, 200]}
                    draggableRange={{top: screenHeightPercent(90), bottom: 200}}
                    allowDragging={true}
                    ref={c => this.sliderUp = c}>
                    <View
                        style={{
                            flex: 1,
                            backgroundColor: "#fff"
                        }}
                    >
                        
                    </View>
                </SlidingUpPanel> */}
            </View>
        )
    }
}
