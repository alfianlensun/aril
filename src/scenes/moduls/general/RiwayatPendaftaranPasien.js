import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    FlatList,
    TextInput
} from 'react-native'
import {screenHeightPercent, screenWidthPercent} from '../../../helpers/Layout'
import {getData} from '../../../services/LocalStorage'
import {Icon} from 'react-native-elements'
import Ripple from 'react-native-material-ripple'
import DatePickerIos from 'react-native-datepicker'
import SlidingUpPanel from 'rn-sliding-up-panel'
import moment from 'moment'
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler'
import ListRiwayatPendaftaran from '../../../components/list/ListRiwayatPendaftaran'
import {getRiwayatPendaftaran} from '../../../services/ServicePasien'
export default class RiwayatPendaftaranPasien extends Component {
    constructor(props){
        super(props)
        const params = this.props.route.params
        this.state = {
            pasiendetail: null,
            loader: false,
            params: params,
            pasiendetail: null,
            listRiwayatPendaftaran: []
        }
        
    }

    componentDidMount(){
        this.mounted = true
        this.getListRiwayatPendaftaran(this.state.params.norm)
    }
    
    getListRiwayatPendaftaran = (norm) => {
        this.setState({
            loader: true
        })
        getRiwayatPendaftaran(norm).then(resp => {
            if (this.mounted){
                this.setState({
                    loader: false,
                    listRiwayatPendaftaran: resp.response
                })
            }
        }).catch(err => {
            if (this.mounted){
                this.setState({
                    loader: false
                })
            }
        })
    }

    componentWillUnmount(){
        this.mounted = false
    }

    renderOpsiSlider(){
        return (
            <View style={Styles.containerSlider}>
                <View
                    style={{
                        height: 50,
                        backgroundColor: '#fff',
                        width: '100%',
                        position:'relative'
                    }}
                >
                    <Text
                        style={{
                            fontSize: 12
                        }}
                    >Pasien sedang berada di rawat di ruangan </Text>
                    <Text
                        style={{
                            fontWeight: 'bold',
                            fontSize: 12
                        }}
                    >{'IRINA A / Kamar 01 / Bed 001'}</Text>
                    <Text
                        style={{
                            fontSize: 12,
                            marginTop: 10
                        }}
                    >Apakah anda yakin ingin memindahkan pasien ke</Text>
                    <Text
                        style={{
                            fontWeight: 'bold',
                            fontSize: 12
                        }}
                    >{'IRINA A / Kamar 01 / Bed 002'}</Text>
                    <View
                        style={{
                            marginTop: 20,
                            width: '80%',
                            flexDirection: 'row'
                        }}
                    >
                        <TouchableOpacity
                            onPress={() => this.sliderUp.hide()}
                            activeOpacity={.5}
                            style={[{
                                width: '100%',
                                backgroundColor: '#90cdf4',
                                paddingHorizontal: 20,
                                flexDirection: 'row',
                                justifyContent: 'center',
                                borderTopLeftRadius: 10,
                                borderBottomLeftRadius: 10,
                                paddingVertical: 15,
                            }, Styles.shadow]}
                        >
                            <Text
                                style={{
                                    color: '#fff'
                                }}
                            >Tidak</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={.5}
                            onPress={() => console.log('ok')}
                            style={[{
                                width: '100%',
                                backgroundColor: '#63b3ed',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                borderTopRightRadius: 10,
                                borderBottomRightRadius: 10,
                                paddingHorizontal: 20,
                                paddingVertical: 15,
                            }, Styles.shadow]}
                        >
                            <Text
                                style={{
                                    color: '#fff'
                                }}
                            >Ya</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                
            </View>
        )
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
                <View style={Styles.header}></View>
                <View
                    style={{
                        paddingHorizontal: 20,
                        paddingVertical: 20,
                    }}
                >
                    <View
                        style={{
                            position: 'relative',
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}
                    >
                        <Ripple
                            onPress={() => this.props.navigation.goBack(null)}
                            style={{
                                height: 30,
                                width: 30,
                                overflow: 'hidden',
                                borderRadius: 50,
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
                        <Text
                            style={{
                                fontSize: 16,
                                marginLeft: 10,
                                fontWeight: 'bold'
                            }}
                        >Riwayat Pendaftaran Pasien </Text>
                    </View>
                </View>
               
                <View 
                    style={{
                        width: '100%',
                        height: screenHeightPercent(92),
                        marginTop: 20,
                        paddingTop: 20,
                        borderTopLeftRadius: 30,
                        borderTopRightRadius: 30,
                        paddingHorizontal: 20,
                        backgroundColor: '#fff'
                    }}
                >
                    <View
                        style={{
                            width: '100%',
                            height: '100%',
                        }}
                    >
                        <View
                            style={{
                                width: '100%',
                                alignItems: 'center'
                            }}
                        >
                            <Text
                                style={{
                                    color: '#333',
                                    fontSize: 16,
                                    fontWeight: 'bold'
                                }}
                            >{this.state.params.nama_pasien.trim()}</Text>   
                            <View
                                style={{
                                    marginTop: 5,
                                    flexDirection: 'row'
                                }}
                            >
                                <Text
                                    style={{
                                        backgroundColor: '#6ab1f7',
                                        color: '#fff',
                                        paddingHorizontal: 5,
                                        borderRadius: 30,
                                        marginRight: 5,
                                        fontSize: 10
                                    }}
                                > Norm </Text>
                                <Text
                                    style={{
                                        fontSize: 12
                                    }}
                                > {this.state.params.norm} </Text>
                            </View>
                        </View>
                        <View
                            style={{
                                width: '100%',
                                marginTop: 20,
                            }}
                        >
                            <FlatList
                                style={{
                                    height: '85%'
                                }}
                                showsVerticalScrollIndicator={false}
                                data={this.state.listRiwayatPendaftaran}
                                renderItem={({ item }) => {
                                    const instalasi = {
                                        1: 'Rawat Jalan',
                                        2: 'Rawat Darurat',
                                        3: 'Rawat Inap'
                                    }
                                    return <ListRiwayatPendaftaran 
                                        noPendaftaran={item.no_pendaftaran}
                                        tanggalPendaftaran={moment(item.tanggal_pendaftaran).format('DD-MM-YYYY HH:mm:ss')}
                                        caraBayar={item.nama_cara_bayar}
                                        instalasi={instalasi[item.id_mst_instalasi]}
                                        subInstalasi={item.nm_unit_sub_instalasi}
                                    />
                                }}
                                keyExtractor={item => item.id_trx_pendaftaran.toString()}
                            /> 
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}


const Styles = new StyleSheet.create({
    container: {
        flex : 1,
    },
    btnDetail: {
        height: 50,
    },
    containerWrapper:{
        width: '100%',
        justifyContent: 'center' 
    },
    header: {
        backgroundColor: '#e1f7fa',
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
    formTextInput: {
        height: '100%',
        color: '#fff'
    },
    containerSlider:{
        width: '100%',
        // alignItems: 'center',
        overflow: 'hidden',
        position: 'relative',
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        height: '100%',
        backgroundColor: '#fff'
    },
})