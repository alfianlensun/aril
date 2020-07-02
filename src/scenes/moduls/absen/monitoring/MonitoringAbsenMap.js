import React, {Component} from 'react'
import {
    View,
    Text,
    RefreshControl,
    StatusBar,
    Image,
    ToastAndroid,
    FlatList,
    Switch,
    ActivityIndicator,
    ImageBackground
} from 'react-native'
import {icon_color_secondary, ripple_color_primary, shadow, icon_color_primary } from '../../../../themes/Default';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import Feather from 'react-native-vector-icons/Feather'
import MapboxGL from "@react-native-mapbox-gl/maps";
import { screenHeightPercent, screenWidthPercent } from '../../../../helpers/Layout';
import Ripple from 'react-native-material-ripple'
import { getAbsensiMobileByUnitKerja, getAbsenTerdaftar, getAllAbsensiUser } from '../../../../services/ServiceSdm';
import { getData } from '../../../../services/LocalStorage';
import moment from 'moment'
import config from '../../../../Config'
import {Icon} from 'react-native-elements'
import SlidingUpPanel from 'rn-sliding-up-panel';
import ListAbsenMonitoringMobile from '../../../../components/list/ListAbsenMonitoringMobile'

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
            tampilkanHanyaFoto: false,
            tampilkanAbsenMasuk: true,
            tampilkanAbsenPulang: true,
            sliderType: 0,
            selectedUser: null,
            sliderBottomReach: false,
            selectedUserImageAbsen: [],
            listDetailLoader: false,
            listRiwayatAbsenDetail: []
        }
    }

    async componentDidMount(){
        try {
            
            const userDetail = await getData('AuthUser')
            this.setState({
                userDetail
            })
            await this.prepareDataAbsen()  
        }catch(err){
            console.log(err)
        }
        // this.showDetail()
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

                if (params.dataunitkerja.id_user_mobile !== undefined){ 
                    const listAbsenMasuk = absenmasuk.filter(item => {return item.user.ID === params.dataunitkerja.id_user_mobile})
                    const listAbsenPulang = absenpulang.filter(item => {return item.user.ID === params.dataunitkerja.id_user_mobile})
                    this.setState({
                        listAbsenMasuk,
                        listAbsenPulang
                    })
                } else {
                    this.setState({
                        listAbsenMasuk: absenmasuk,
                        listAbsenPulang: absenpulang
                    })
                }
                
            }
        } catch(err){
            ToastAndroid.show('Something went wrong :'+err.message, 1000)
        }
    }

    showDetail = async (item) => {
        try {
            this.setState({
                sliderType: 1,
                sliderBottomReach: false,
                selectedUser: item,
                listDetailLoader: true
            })
            
    
            const tanggalAwal = `${moment(new Date()).format('YYYY-MM')}-01`
            const tanggalAkhir = moment(new Date()).format('YYYY-MM-DD')
            const absenTerdaftar = await getAbsenTerdaftar(item.user.ID)
            const absenUserSatuBulanTerakhir = await getAllAbsensiUser(item.user.ID,tanggalAwal, tanggalAkhir)
            

            this.setState({
                selectedUserImageAbsen: absenTerdaftar.response,
                listRiwayatAbsenDetail: absenUserSatuBulanTerakhir.response,
                listDetailLoader: false
            }, () => {
                setTimeout(() => {
                    this.sliderUp.show()
                }, 100);
            })
            
        }catch(err){
            this.setState({
                listDetailLoader: false
            })
            ToastAndroid.show(`Something went wrong : ${err.message !== undefined ? err.message : JSON.stringify(err)}`, 600)
        }
    }

    showListDetail = async () => {
        try {
            this.setState({
                listDetailLoader: true,
                sliderBottomReach: false
            })
    
            const tanggalAwal = `${moment(new Date()).format('YYYY-MM')}-01`
            const tanggalAkhir = moment(new Date()).format('YYYY-MM-DD')
            const absenTerdaftar = await getAbsenTerdaftar(this.state.params.dataunitkerja.id_user_mobile)
            const absenUserSatuBulanTerakhir = await getAllAbsensiUser(this.state.params.dataunitkerja.id_user_mobile,tanggalAwal, tanggalAkhir)
            if (absenUserSatuBulanTerakhir.response.length > 0){
                this.setState({
                    sliderType: 1,
                    selectedUser: absenUserSatuBulanTerakhir.response[0]
                })
            }
             
            this.setState({
                selectedUserImageAbsen: absenTerdaftar.response,
                listRiwayatAbsenDetail: absenUserSatuBulanTerakhir.response,
                listDetailLoader: false
            }, () => {
                setTimeout(() => {
                    this.sliderUp.show()
                }, 100);
            })
            
        }catch(err){
            this.setState({
                listDetailLoader: false
            })
            ToastAndroid.show(`Something went wrong : ${err.message !== undefined ? err.message : JSON.stringify(err)}`, 600)
        }
    }

    renderDetail(){
        return (
            <View
                style={{
                    flex: 1,
                    flexDirection: 'column'
                }}
            >
                <View
                    style={{
                        width: '100%',
                        flexDirection: "row"
                    }}
                >
                    <Ripple
                        style={{
                            borderRadius: 10,
                            overflow: 'hidden',
                            height: screenWidthPercent(30),
                            width: screenWidthPercent(30)
                        }}
                    >
                        <Image 
                            onLoadEnd={() => this.setState({loadImage: false})}
                            source={{uri: `${config.ws.resources.absen_image}/${this.state.selectedUser.user.ID}/${this.state.selectedUser.imagepath}`}} 
                            style={{
                                height: screenWidthPercent(30),
                                width: screenWidthPercent(30)
                            }} 
                        />
                    </Ripple>
                    <View
                        style={{
                            flex: 1,
                            paddingTop: 10,
                            paddingLeft: 20
                        }}
                    >
                        <View
                            style={{
                                width: '100%',
                                paddingTop: 20
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 12,
                                    color: '#333'
                                }}
                            >Wajah terdaftar</Text>
                            <View
                                style={{
                                    width: '100%',
                                    paddingVertical: 10,
                                    flexDirection: 'row',
                                }}
                            >
                                {this.state.selectedUserImageAbsen.map((item, key) => {
                                    return (
                                        <Ripple
                                            style={{
                                                marginLeft: key !== 0 ? 10 : 0,
                                                borderRadius: 10,
                                                overflow: 'hidden',
                                                height: screenWidthPercent(15),
                                                width: screenWidthPercent(15),
                                            }}
                                        >
                                            <Image 
                                                onLoadEnd={() => this.setState({loadImage: false})}
                                                source={{uri: `${config.ws.resources.absen_image_terdaftar}/${this.state.selectedUser.user.ID}/${item}`}} 
                                                style={{
                                                    height: screenWidthPercent(15),
                                                    width: screenWidthPercent(15),
                                                }} 
                                            />
                                        </Ripple>
                                    )
                                })}
                            </View>
                        </View>
                    </View>
                </View>
                <View
                    style={{
                        width: '100%',
                        paddingTop: 20,
                        paddingRight: 20,
                        flexDirection: 'row'
                    }}
                >
                    <Text
                        style={{
                            flex: 1,
                            color: '#444',
                            fontSize: 15,
                            fontWeight: 'bold'
                        }}
                    >{this.state.selectedUser.user.name}</Text>
                     {/* <Text
                        style={{
                            alignSelf: 'flex-end',
                            color: '#fff',
                            fontSize: 12,
                            paddingHorizontal: 10,
                            paddingVertical: 2,
                            borderRadius: 20,
                            backgroundColor: icon_color_secondary
                        }}>
                        
                    </Text> */}
                </View>
                <View
                    style={{
                        flex: 1,
                        position: 'relative',
                        marginTop: 20
                    }}
                >
                    <Text
                        style={{
                            width: '100%',
                            fontSize: 12,
                            color: '#444',
                            borderRadius: 20
                        }}
                    >Riwayat Absen Bulan Ini</Text>
                    <View
                        style={{
                            marginTop: 10,
                            position: 'relative',
                            width: '100%',
                            height: screenHeightPercent(40)
                        }}
                    >
                        <FlatList
                            style={{
                                flex: 1
                            }}
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.state.listDetailLoader}
                                    onRefresh={() => this.showDetail(this.state.selectedUser)}
                                />
                            }
                            showsVerticalScrollIndicator={false}
                            data={this.state.listRiwayatAbsenDetail}
                            renderItem={({ item }) => {
                                return (
                                    <ListAbsenMonitoringMobile 
                                        onPress={() => {
                                            if (item.absen_type === 1){
                                                this.setState({
                                                    listAbsenMasuk: [item],
                                                    listAbsenPulang: []
                                                })
                                            } else {
                                                this.setState({
                                                    listAbsenMasuk: [],
                                                    listAbsenPulang: [item]
                                                })
                                            }
                                            this.sliderUp.hide()
                                            this.sliderUp.hide()
                                        }}
                                        masuk={item.absen_type === 1 ? true : false}
                                        items={item}
                                        uriImage={`${config.ws.resources.absen_image}/${this.state.selectedUser.user.ID}/${item.imagepath}`}
                                        tanggal={moment(item.server_datetime).format('DD MMMM YYYY')}
                                        jam={moment(item.server_datetime).format('HH:mm')}
                                        {...this.props}
                                    />
                                )
                            }}
                            keyExtractor={item => item._id.toString()}
                        />
                    </View>
                </View>
            </View>
        )
    }
    
    renderFilter(){
        return (
            <View
                style={{
                    flex: 1
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
                        paddingHorizontal: 20,
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
                        <Switch
                            trackColor={{ false: "#eee", true: "#6ab1f7" }}
                            thumbColor={this.state.tampilkanHanyaFoto ? "#6ab1f7" : "#eee"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={isOn => this.setState({tampilkanHanyaFoto: isOn})}
                            value={this.state.tampilkanHanyaFoto}
                        />
                    </View>
                </View>
                <View
                    style={{
                        marginTop: 10,
                        paddingVertical: 10,
                        width: '100%',
                        paddingHorizontal: 20,
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
                        >Tampilkan absen masuk</Text>
                    </View>
                    <View
                        style={{
                            width: '20%',
                            alignItems: 'flex-end'
                        }}
                    >
                        <Switch
                            trackColor={{ false: "#eee", true: "#6ab1f7" }}
                            thumbColor={this.state.tampilkanAbsenMasuk ? "#6ab1f7" : "#eee"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={isOn => this.setState({tampilkanAbsenMasuk: isOn})}
                            value={this.state.tampilkanAbsenMasuk}
                        />
                    </View>
                </View>
                <View
                    style={{
                        marginTop: 10,
                        paddingVertical: 10,
                        width: '100%',
                        paddingHorizontal: 20,
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
                        >Tampilkan absen pulang</Text>
                    </View>
                    <View
                        style={{
                            width: '20%',
                            alignItems: 'flex-end'
                        }}
                    >
                        <Switch
                            trackColor={{ false: "#eee", true: "#6ab1f7" }}
                            thumbColor={this.state.tampilkanAbsenPulang ? "#6ab1f7" : "#eee"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={isOn => this.setState({tampilkanAbsenPulang: isOn})}
                            value={this.state.tampilkanAbsenPulang}
                        />
                    </View>
                </View>
            </View>
        )
    }

    render(){
        console.log(this.state.sliderBottomReach)
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
                        flex: 1,
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
                        {this.state.listAbsenMasuk.length > 0 && this.state.tampilkanAbsenMasuk &&
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
                                                {this.state.tampilkanHanyaFoto === false &&
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
                                                }
                                                <Ripple
                                                    onPress={() => this.showDetail(item)}
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
                                                </Ripple>
                                            </View>
                                        </View>
                                    </MapboxGL.MarkerView>
                                )
                            })
                        }
                        {this.state.listAbsenPulang.length > 0 && this.state.tampilkanAbsenPulang &&
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
                                                {this.state.tampilkanHanyaFoto === false &&
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
                                                }
                                                <Ripple
                                                    onPress={() => this.showDetail(item)}
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
                                                </Ripple>
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
                                    onPress={() => {
                                        this.sliderUp.hide()
                                        this.sliderUp.hide()
                                        this.props.navigation.goBack(null)
                                    }}
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
                                onPress={() => console.log('okok')}
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
                                    onPress={() => {
                                        this.setState({
                                            sliderType: 0,
                                            sliderBottomReach: false
                                        })
                                        this.sliderUp.show()
                                    }}
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
                    {this.state.params.dataunitkerja.id_user_mobile !== undefined && this.state.sliderBottomReach === true &&
                        <View
                            style={{
                                position: 'absolute',
                                right: 0,
                                bottom: 0,
                                padding: 20
                            }}
                        >
                            <Ripple
                                onPress={() => this.showListDetail()}
                                rippleColor={ripple_color_primary}
                                style={[{
                                    height: 50,
                                    width: 50,
                                    borderRadius: 25,
                                    backgroundColor: "#fff",
                                    overflow: 'hidden',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }, shadow]}
                            >
                                <Feather name="list" size={20} color={'#333'}/>
                            </Ripple>
                        </View>
                    }
                </View>
                <SlidingUpPanel
                    onBottomReached={() => {
                        this.setState({
                            sliderBottomReach: true
                        })
                    }}
                    friction={.4}
                    onBackButtonPress={() => {
                        this.sliderUp.hide()
                    }}
                    snappingPoints={[0, 200]}
                    draggableRange={{top: this.state.sliderType === 0 ? screenHeightPercent(50) : screenHeightPercent(70), bottom: 0}}
                    allowDragging={true}
                    ref={c => this.sliderUp = c}>
                    <View
                        style={{
                            flex: 1,
                            backgroundColor: "#fff",
                            borderTopLeftRadius: 20,
                            borderTopRightRadius: 20,
                            paddingHorizontal: 10,
                            paddingVertical: 10
                        }}
                    >
                        {this.state.sliderType === 0 ? this.renderFilter() : this.renderDetail()}
                    </View>
                </SlidingUpPanel>
            </View>
        )
    }
}
