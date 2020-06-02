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
import ListDataDiriPasien from '../../../components/list/ListDataDiriPasien'
import {getDetailPasien} from '../../../services/ServicePasien'
export default class DataDiriPasien extends Component {
    constructor(props){
        super(props)
        const params = this.props.route.params
        this.state = {
            loader: false,
            params: params,
            pasiendetail: null
        }
    }

    componentDidMount(){
        this.mounted = true
        this.getDataDiriPasien(this.state.params.norm)
    }

    getDataDiriPasien(norm){
        getDetailPasien(norm).then(resp => {
            if (this.mounted){
                if (resp.reqStat.code === 200 && resp.response !== null){
                    this.setState({
                        pasiendetail: resp.response
                    })
                }
            }
        })
    }

    componentWillUnmount(){
        this.mounted = false
    }

    render(){
        const {params, pasiendetail} = this.state
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
                        >Data Diri Pasien </Text>
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
                            >{params.nama_pasien}</Text>   
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
                                > {params.norm} </Text>
                            </View>
                        </View>
                        <View
                            style={{
                                width: '100%',
                                marginTop: 20,
                            }}
                        >
                            <ScrollView
                                style={{
                                    height: '85%'
                                }}
                            >
                                <ListDataDiriPasien title={'No identitas pasien'} value={pasiendetail !== null && pasiendetail.identitas !== 'TANPA IDENTITAS' ? pasiendetail.no_identitas : ''} badge={pasiendetail !== null ? pasiendetail.identitas : ''}/>
                                <ListDataDiriPasien title={'Tempat / Tanggal Lahir'} value={pasiendetail !== null ? pasiendetail.tempat_lahir.trim() + ' / ' + moment(pasiendetail.tanggal_lahir).format('DD-MM-YYYY') : ''} />
                                <ListDataDiriPasien title={'Jenis Kelamin'} value={pasiendetail !== null ? (pasiendetail === 1 ? 'Laki - laki' : 'Perempuan') : ''}/>
                                <ListDataDiriPasien title={'No Telp'} value={pasiendetail !== null ? pasiendetail.no_tlp : ''}/>
                                <ListDataDiriPasien title={'Status Nikah'} value={pasiendetail !== null ? pasiendetail.status_perkawinan : ''}/>
                                {/* <ListDataDiriPasien title={'Golongan Darah'} value={''}/>
                                <ListDataDiriPasien title={'Agama'} value={''}/> */}
                            </ScrollView>
                            
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