import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    Image,
    ToastAndroid,
    CheckBox,
    ActivityIndicator,
    ImageBackground
} from 'react-native'
import { icon_color_primary, icon_color_secondary, ripple_color_primary, shadow, shadowxl } from '../../../../themes/Default';
import Octicons from 'react-native-vector-icons/Octicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import MapboxGL from "@react-native-mapbox-gl/maps";
import { screenHeightPercent, screenWidthPercent } from '../../../../helpers/Layout';
import Ripple from 'react-native-material-ripple'
import { getAbsensiMobileByUnitKerja } from '../../../../services/ServiceSdm';
import { getData } from '../../../../services/LocalStorage';
import moment from 'moment'
import config from '../../../../Config'
import {Icon} from 'react-native-elements'
import SlidingUpPanel from 'rn-sliding-up-panel';
import ToggleSwitch from 'toggle-switch-react-native'

MapboxGL.setAccessToken('pk.eyJ1IjoiYWxmaWFubGVuc3VuIiwiYSI6ImNqbmFhc3RzbjdteDIzcW55dzl0ZWwzdzEifQ.3M-jznSp5U5rwWxO1h01Lw');
export default class MonitoringAbsenMap extends Component{
    constructor(props){
        super(props)
        const params = props.route.params
        this.state = {
            params,
            tanggalDiPilih: params.dataunitkerja.tanggaldipilih,
            location_absen: null,
            loadImage: true,
            listAbsenMasuk: [],
            listAbsenPulang: [],
            userDetail: null,
            initialRegion: [124.806901, 1.453767],
            tampilkanHanyaFoto: false
        }
    }

    async componentDidMount(){
        try {
            const userDetail = await getData('AuthUser')
            this.setState({
                userDetail
            })
            this.sliderUp.show()
            await this.prepareDataAbsen()  
        }catch(err){
            console.log(err)
        }
        // this.sliderUp.show(100); 
    }

    prepareDataAbsen = async () => {
        try {
            const {params} = this.state
            const {response} = await getAbsensiMobileByUnitKerja(params.dataunitkerja.unitKerja.id_unit_kerja, this.state.tanggalDiPilih, this.state.tanggalDiPilih)
            if (response !== undefined){
                let absenmasuk = []
                let absenpulang = []
                for (const item of response){
                    if (item.absen_masuk !== null){
                        if (item.absen_masuk.location !== undefined){
                            if (item.absen_masuk.location.longitude !== '' && item.absen_masuk.location.latitude !== ''){
                                absenmasuk.push(item.absen_masuk)
                            }
                        }
                    } 
                    if (item.absen_pulang !== null){
                        if (item.absen_pulang.location !== undefined){
                            if (item.absen_pulang.location.longitude !== '' && item.absen_pulang.location.latitude !== ''){
                                absenpulang.push(item.absen_pulang)
                            }
                        }
                    } 
                }
                this.setState({
                    listAbsenMasuk: absenmasuk,
                    listAbsenPulang: absenpulang
                })
            }
        } catch(err){
            ToastAndroid.show('Something went wrong :'+err.message, 1000)
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
                                centerCoordinate: this.state.initialRegion
                            }}
                            centerCoordinate={this.state.initialRegion}
                        />
                        {this.state.listAbsenMasuk.length > 0 &&
                            this.state.listAbsenMasuk.map(item => {
                                return (
                                    <MapboxGL.MarkerView
                                        coordinate={[item.location.longitude, item.location.latitude]}
                                    >
                                        <View
                                            style={{
                                                backgroundColor: 'transparent',
                                                alignSelf: 'flex-start',
                                                alignItems: 'center'
                                            }}
                                        >
                                            <View
                                                style={{
                                                    alignSelf: 'flex-start',
                                                    overflow: 'hidden',
                                                    alignItems: 'center'
                                                }}
                                            >
                                                <View
                                                    style={[{
                                                        overflow: 'hidden',
                                                        backgroundColor: '#2b6cb0',
                                                        borderRadius: 10,
                                                        paddingVertical: 5,
                                                        paddingHorizontal: 10,
                                                        position: 'relative'
                                                    },shadow]}
                                                >
                                                    <View
                                                        style={{
                                                            alignSelf: 'flex-start',
                                                            alignItems: 'flex-start'
                                                        }}
                                                    >
                                                        <Text
                                                            style={{
                                                                fontSize: 12,
                                                                color: '#fff'
                                                            }}
                                                        >{item.user.name}</Text>
                                                    </View>
                                                    <View
                                                        style={{
                                                            flexDirection: 'row',
                                                            alignItems: 'center'
                                                        }}
                                                    >
                                                        <Text
                                                            style={{
                                                                color: "#fff",
                                                                fontSize: 12
                                                            }}
                                                        >Absen Masuk </Text>
                                                        <Entypo name="dot-single" color={'#fff'} size={20}/>
                                                        <Text
                                                            style={{
                                                                fontSize: 12,
                                                                color: '#fff'
                                                            }}
                                                        >{moment(item.server_datetime).format('HH:mm')}</Text>
                                                    </View>
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
                                                        source={{uri: `${config.ws.resources.absen_image}/${item.user.ID}/${item.imagepath}`}} 
                                                        style={{
                                                            height: 50,
                                                            width: 50,
                                                        }} 
                                                    />
                                                </View>
                                            </View>
                                        </View>
                                    </MapboxGL.MarkerView>
                                )
                            })
                        }
                        {this.state.listAbsenPulang.length > 0 &&
                            this.state.listAbsenPulang.map(item => {
                                return (
                                    <MapboxGL.MarkerView
                                        onSelected={() => alert()}
                                        coordinate={[item.location.longitude, item.location.latitude]}
                                    >
                                        <View
                                            style={{
                                                backgroundColor: 'transparent',
                                                alignSelf: 'flex-start',
                                                alignItems: 'center'
                                            }}
                                        >
                                            <View
                                                style={{
                                                    alignItems: 'center'
                                                }}
                                            >
                                                <View
                                                    style={[{
                                                        backgroundColor: '#2b6cb0',
                                                        borderRadius: 10,
                                                        paddingVertical: 5,
                                                        paddingHorizontal: 10,
                                                        position: 'relative'
                                                    },shadow]}
                                                >
                                                    <View
                                                        style={{
                                                            width: '100%',
                                                            alignItems: 'flex-start'
                                                        }}
                                                    >
                                                        <Text
                                                            style={{
                                                                fontSize: 12,
                                                                color: '#fff'
                                                            }}
                                                        >{item.user.name}</Text>
                                                    </View>
                                                    <View
                                                        style={{
                                                            flexDirection: 'row',
                                                            alignItems: 'center'
                                                        }}
                                                    >
                                                        <Text
                                                            style={{
                                                                color: "#fff",
                                                                fontSize: 12
                                                            }}
                                                        >Absen Pulang </Text>
                                                        <Entypo name="dot-single" color={'#fff'} size={20}/>
                                                        <Text
                                                            style={{
                                                                fontSize: 12,
                                                                color: '#fff'
                                                            }}
                                                        >{moment(item.server_datetime).format('HH:mm')}</Text>
                                                    </View>
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
                                                        source={{uri: `${config.ws.resources.absen_image}/${item.user.ID}/${item.imagepath}`}} 
                                                        style={{
                                                            height: 50,
                                                            width: 50,
                                                        }} 
                                                    />
                                                </View>
                                            </View>
                                        </View>
                                    </MapboxGL.MarkerView>
                                )
                            })
                        }
                    </MapboxGL.MapView>
                    <View
                        style={{
                            width: '100%',
                            position: 'absolute',
                            flexDirection: 'column',
                            top: screenHeightPercent(5),
                            left: 10
                        }}
                    >
                        <View
                            style={{
                                flex: 1,
                                flexDirection: 'row'
                            }}
                        >
                            <View
                                style={{
                                    zIndex: 10
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
                            <Ripple
                                rippleColor={ripple_color_primary}
                                style={[{
                                    flex: 4,
                                    backgroundColor: '#fff',
                                    paddingVertical: 10,
                                    paddingHorizontal: 15,
                                    borderRadius: 20,
                                    alignItems: 'center',
                                    left: 10,
                                    flexDirection: 'row',
                                }, shadow]}
                            >
                                <Text
                                    style={{
                                        width: '100%',
                                        textAlign: 'center',
                                        fontSize: 13,
                                        color: '#444',
                                        paddingRight: 10
                                    }}
                                >{this.state.params.dataunitkerja.unitKerja.nama_unit_kerja}</Text>
                            </Ripple>
                            <View
                                style={{
                                    flex: 1,
                                    alignItems: 'flex-end',
                                    paddingRight: 20
                                }}
                            >
                                <Ripple
                                    onPress={() => this.sliderUp.show()}
                                    rippleColor={ripple_color_primary}
                                    style={[{
                                        width: 40,
                                        height: 40,
                                        backgroundColor: '#fff',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        borderRadius: 20,
                                        flexDirection: 'row',
                                    }, shadow]}
                                >
                                    <AntDesign name={'filter'} size={16} color={'#444'}/>
                                </Ripple>
                            </View>
                        </View>
                    </View>
                </View>
                <SlidingUpPanel
                    onBottomReached={() => console.log('bottom')}
                    containerStyle={{
                        flex: 1,
                    }}
                    friction={.4}
                    onBackButtonPress={() => {
                        
                    }}
                    snappingPoints={[0, 200]}
                    draggableRange={{top: screenHeightPercent(50), bottom: 0}}
                    allowDragging={true}
                    ref={c => this.sliderUp = c}>
                    <View
                        style={{
                            flex: 1,
                            backgroundColor: "#fff",
                            borderTopLeftRadius: 30,
                            borderTopRightRadius: 30,
                            paddingHorizontal: 10,
                            paddingVertical: 20
                        }}
                    >
                        <View
                            style={{
                                width: '100%',
                                alignItems: 'center'
                            }}
                        >
                            <View
                                style={{
                                    width: 40,
                                    borderTopWidth: 1,
                                    borderBottomWidth: 1,
                                    borderColor: '#555',
                                    paddingVertical:2
                                }}
                            >
                                
                            </View>
                        </View>
                        <View
                            style={{
                                marginTop: 20,
                                paddingVertical: 10,
                                width: '100%',
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}
                        >
                            <View
                                style={{
                                    width: '80%'
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 13,
                                        color: '#444'
                                    }}
                                >Tampilkan hanya foto</Text>
                            </View>
                            <View
                                style={{
                                    width: '20%',
                                    alignItems: 'flex-end'
                                }}
                            >
                                <ToggleSwitch
                                    isOn={this.state.tampilkanHanyaFoto}
                                    onColor="#6ab1f7"
                                    offColor="#eee"
                                    labelStyle={{ color: "black", fontWeight: "900" }}
                                    size="medium"
                                    onToggle={isOn => this.setState({tampilkanHanyaFoto: isOn})}
                                />
                            </View>
                        </View>
                    </View>
                    
                </SlidingUpPanel>
            </View>
        )
    }
}
