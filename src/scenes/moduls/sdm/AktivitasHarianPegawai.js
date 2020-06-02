import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    Picker,
    TextInput,
    ScrollView,
    KeyboardAvoidingView,
    ActivityIndicator
} from 'react-native'
import {screenHeightPercent, screenWidthPercent} from '../../../helpers/Layout'
import {getData} from '../../../services/LocalStorage'
import {getListSubIndikator} from '../../../services/ServiceSdm'
import {Icon} from 'react-native-elements'
import Ripple from 'react-native-material-ripple'
import DateTimePicker from '@react-native-community/datetimepicker';
import SlidingUpPanel from 'rn-sliding-up-panel'
import { FlatList } from 'react-native-gesture-handler'
import SwitchSelector from "react-native-switch-selector"
import {search} from '../../../helpers/General'
import {createAktivitasPegawai} from '../../../services/ServiceSdm'
import moment from 'moment'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import { shadowxl, shadow, background_color } from '../../../themes/Default'

export default class AktivitasHarianPegawai extends Component {
    constructor(props){
        super(props)
        const params = this.props.route.params
        this.state = {
            userdetail: null,
            search: '',
            loader: false,
            success: false,
            showDatePicker: false,
            validateMessage: '',
            loaderMessage: 'Mohon tunggu...',
            tanggalAktivitas: new Date(),
            aktivitas: '',
            paramsBed: params,
            sliderUpContentHeight: 400,
            allowDragging: false,
            listpencarian: [],
            listIndikatorKinerja: [],
            listRenderSelect: [],
            chosenIndikator: null,
            chosenDataPendukung: null,
            statusPengerjaan: 'Dalam Pengerjaan',
            slideType: 0
        }
    }

    componentDidMount(){
        this.mounted = true
        this.sliderUp.hide()
        getData('AuthUser').then(data => {
            if (this.mounted) this.setState({userdetail: data})
        }).catch(err => {
            console.log(err)
        })
        this.getSubIndikator()
        
    }

    onSubmitAktivitas = () => {
        const {chosenDataPendukung, chosenIndikator, userdetail} = this.state
        if (chosenIndikator === null) {
            this.setState({validateMessage: 'Belum memilih indikator'}) 
            return false
        }
        if (chosenDataPendukung === null) {
            this.setState({validateMessage: 'Belum memilih data pendukung'}) 
            return false
        }
        
        if (this.state.aktivitas.length === 0) {
            this.setState({validateMessage: 'Aktivitas tidak boleh kosong'}) 
            return false
        }

        
        const data = {
            TanggalAktivitas: this.state.tanggalAktivitas,
            IdMstIndikator: chosenIndikator.item._id_indikator,
            IdMstSubIndikator: chosenIndikator.item._id,
            IdMstIndikatorIki: chosenIndikator.item.indikator_iki.id_mst_indikator_iki,
            NamaIndikator: chosenIndikator.item.nama_indikator,
            NamaSubIndikator: chosenIndikator.value,
            NamaIndikatorIki: chosenIndikator.item.indikator_iki.nama_mst_indikator,
            Aktivitas: this.state.aktivitas,
            StatusPengerjaan: this.state.statusPengerjaan,
            IdUser: userdetail._id,
            IdPegawai: userdetail.user_detail.id_sdm_trx_kepegawaian,
            NamaPegawai: userdetail.user_detail.nama_lengkap,
            Norm: chosenDataPendukung !== null ? chosenDataPendukung.norm : '',
            NamaPasien: chosenDataPendukung !== null ? chosenDataPendukung.nama_pasien : ''
        }

        this.sliderUp.show(200, {
            y: .2
        })
        this.setState({
            loader: true,
            validateMessage: '',
            loaderMessage: 'Mohon tunggu...'
        })
        createAktivitasPegawai(data).then(resp => {
            this.setState({
                loaderMessage: 'Berhasil Menyimpan data',
                success: true
            })
        }).catch(err => {
            this.sliderUp.hide()
            this.setState({
                loader: false
            })
        })

    }

    getSubIndikator = () => { 
        getListSubIndikator().then(resp => {
            let id = 0
            const listSubIndikator = resp.response.map(item => {
                return {
                    id: id++,
                    value: item.nama_sub_indikator,
                    label: item.nama_sub_indikator,
                    item
                }
            })
            this.setState({
                listIndikatorKinerja: listSubIndikator,
                listRenderSelect: listSubIndikator
            })
        }).catch(err => {
            setTimeout(() => {
                this.getSubIndikator()
            }, 5000);
        })
    }


    returnData(datapasien){
        this.setState({
            chosenDataPendukung: datapasien.dataPasien.Properties !== undefined ? datapasien.dataPasien.Properties: datapasien.dataPasien
        })
    }

    componentWillUnmount(){
        this.mounted = false   
        this.sliderUp.hide()
    }

    renderOpsiDataPendukung(){
        return (
            <View style={Styles.containerSlider}>
                <View
                    style={{
                        flexDirection: 'row'
                    }}
                >
                    <Ripple
                        onPress={() => {
                            this.sliderUp.hide()
                            this.props.navigation.navigate('ScanNorm', {
                                goBack: true,
                                nextTo: 'AktivitasHarianPegawai',
                                returnData: this.returnData.bind(this)
                            })
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
                                type={'font-awesome'}
                                name={'qrcode'}
                                size={34}
                            />
                        </View>
                        <Text
                            style={{
                                fontSize: 12
                            }}
                        >Scan Qr</Text>
                    </Ripple>
                    <Ripple
                        onPress={() => {
                            this.sliderUp.hide()
                            this.props.navigation.navigate('CariPasien', {
                                goBack: true,
                                nextTo: 'AktivitasHarianPegawai',
                                returnData: this.returnData.bind(this)
                            })
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
                                width: 80,
                                height: 50
                            }}
                        >
                            <Icon 
                                type={'ionicons'}
                                name={'search'}
                                size={30}
                            />
                        </View>
                        <Text
                            style={{
                                
                                fontSize: 12
                            }}
                        >Cari Pasien</Text>
                    </Ripple>
                    <Ripple
                        onPress={() => this.sliderUp.hide()}
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
            </View>
        )
    }

    renderLoader(){
        return (
            <View style={Styles.containerSlider}>
                <View
                    style={{
                        width: '100%',
                        height: 150,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    {this.state.success === false ? <ActivityIndicator size="small" color="#00ff00" /> : null}
                    <View
                        style={{
                            marginTop: 20,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <Text
                            style={{
                                marginRight: 10,
                                fontSize: 14,
                                color: '#444'
                            }}
                        >
                            {this.state.loaderMessage}
                        </Text>
                        {this.state.success === true ? 
                            <Icon 
                                type={'font-awesome'}
                                name={'check-circle'}
                                color={'#6ab1f7'}
                                size={20}
                            /> : null
                        }
                    </View>
                    {this.state.success ? 
                        <View
                            style={{
                                marginTop: 10
                            }}
                        >
                            <Ripple
                                onPress={() => {
                                    this.setState({
                                        loader: false,
                                        success: false,
                                        validateMessage: '',
                                        loaderMessage: 'Mohon tunggu...',
                                        tanggalAktivitas: new Date(),
                                        aktivitas: '',
                                        sliderUpContentHeight: 400,
                                        allowDragging: false,
                                        chosenIndikator: null,
                                        chosenDataPendukung: null,
                                        statusPengerjaan: 'Dalam Pengerjaan',
                                        slideType: 0
                                    })
                                    this.sliderUp.hide()
                                }}
                                rippleColor={'rgba(255,255,255,.4)'}
                                style={{
                                    marginTop: '5%',
                                    paddingHorizontal: 40,
                                    borderRadius: 10,
                                    marginHorizontal: 5,
                                    paddingVertical: 10,
                                    backgroundColor: '#6ab1f7'
                                }}   
                            >
                                <Text style={{color: '#fff'}}>Tambah Aktivitas</Text>
                            </Ripple>
                            <Ripple
                                onPress={() => this.props.navigation.navigate('RekapAktivitasHarianPegawai')}
                                rippleColor={'rgba(255,255,255,.4)'}
                                style={{
                                    marginTop: '5%',
                                    paddingHorizontal: 40,
                                    borderRadius: 10,
                                    marginHorizontal: 5,
                                    paddingVertical: 10,
                                    backgroundColor: '#6ab1f7'
                                }}   
                            >
                                <Text style={{color: '#fff', textAlign: 'center'}}>Lihat Aktivitas</Text>
                            </Ripple>
                        </View> : null
                    }
                </View>
            </View>
        )
    }

    renderSelectSlider(){
        return (
            <View style={Styles.containerSlider}>
                <View
                    style={{
                        width: '100%',
                        height: 40
                    }}
                >
                    <TextInput
                        onSubmitEditing={() => {
                              
                        }}
                        onChangeText={(value) => {
                            this.setState({
                                listRenderSelect: search(this.state.listIndikatorKinerja,value)
                            })
                        }}
                        style={[Styles.formTextInput]}
                        value={this.state.searchSelect}
                        placeholder={"Cari Indikator"}
                    />
                </View>
                <View
                    style={{
                        height: 300
                    }}
                >
                    {this.state.listRenderSelect.length === 0 ?     
                        <View
                            style={{
                                marginTop: 20,
                                alignItems: 'center'
                            }}
                        >
                            <Text>Data tidak di temukan</Text>
                        </View>  : null
                    }
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={this.state.listRenderSelect}
                        renderItem={({ item }) => {
                            return <Ripple
                                onPress={() => {
                                    this.sliderUp.hide()
                                    this.setState({
                                        chosenIndikator: item
                                    })
                                }}
                                rippleColor={'rgba(0,0,0,.4)'}
                                style={{
                                    height: 60,
                                    position: 'relative'
                                }}
                            >
                                <View
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        borderBottomWidth: 1,
                                        borderBottomColor: '#ccc',
                                    }}
                                >
                                    <View
                                        style={{
                                            width: '80%',
                                            justifyContent: 'center'
                                        }}
                                    >
                                        <Text
                                            style={{
                                                color: '#444',
                                                fontSize: 12,
                                                marginTop: 2
                                            }}
                                        >{item.value}</Text>
                                    </View>
                                    <View
                                        style={{
                                            width: '20%'
                                        }}
                                    >
                                        <Icon
                                            type={'font-awesome'}
                                            name={'pencil'}
                                            color={'#444'}
                                            size={18} 
                                        />
                                    </View>
                                </View>
                            </Ripple>
                        }}
                        keyExtractor={item => item.id.toString()}
                    />
                </View>
            </View>
        )
    }

    render(){
        return(
            <KeyboardAvoidingView style={{flex: 1}} behavior="height" enabled>
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
                            paddingVertical: 10,
                        }}
                    >
                        <View
                            style={{
                                width: '100%',
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
                                    color: '#333',
                                    fontWeight: 'bold'
                                }}
                            >Aktivitas Harian</Text>
                            <Ripple
                                onPress={() => this.props.navigation.navigate('RekapAktivitasHarianPegawai')}
                                rippleColor={'rgba(0,0,0,.4)'}
                                style={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: 50,
                                    overflow: 'hidden',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    position: 'absolute',
                                    right: 0
                                }}
                            >
                                <Icon 
                                    type={'font-awesome'}
                                    name={'history'}
                                    size={16}
                                    color={'#333'}
                                />
                            </Ripple>
                        </View>
                        <View>
                            <Text
                                style={{
                                    color: '#333',
                                    marginTop: 20,
                                    fontSize: 13
                                }}
                            >Total Aktivitas Kemarin</Text>
                        </View>
                    </View>
                    <View 
                        style={{
                            width: '100%',
                            height: '90%',
                            marginTop: 20,
                            borderTopLeftRadius: 30,
                            borderTopRightRadius: 30,
                            paddingHorizontal: 10,
                            backgroundColor: '#fff'
                        }}
                    >
                        <View
                            style={{
                                overflow: 'hidden'
                            }}
                        >
                            <View
                                style={{
                                    width: '100%',
                                    height: '90%',
                                    paddingHorizontal: 10
                                }}
                            >
                                
                                <View
                                    style={{
                                        marginTop: 30,
                                        width: '100%',
                                        height: '100%',
                                        position: 'relative',
                                    }}
                                >
                                    <ScrollView
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                        }}
                                    >
                                        <View
                                            style={{
                                                width: '100%',
                                                height: 50,
                                                alignItems: 'center',
                                                flexDirection: 'row'
                                            }}
                                        >
                                            <View
                                                style={{
                                                    width: '40%'
                                                }}
                                            >
                                                <Text 
                                                    style={{
                                                        fontSize: 13,
                                                        color: '#333'
                                                    }}
                                                >Tanggal</Text>
                                            </View>
                                            <View
                                                style={{
                                                    width: '60%',
                                                    paddingRight: 10,
                                                    backgroundColor: '#fff',
                                                    alignItems: 'flex-end'
                                                }}
                                            >
                                                <Ripple
                                                    onPress={() => this.setState({showDatePicker: true})} 
                                                    style={[{
                                                        width: '90%',
                                                        position: 'relative',
                                                        justifyContent:"center",
                                                        height: 40,
                                                        borderRadius: 10,
                                                        paddingLeft: 20,
                                                        overflow: 'hidden',
                                                        backgroundColor: '#fff'
                                                    }, Styles.shadow]}
                                                >
                                                    <View
                                                        style={{
                                                            width: '100%',
                                                            flexDirection: 'row'
                                                        }}
                                                    >
                                                        <View
                                                            style={{
                                                                height: '100%',
                                                                justifyContent: 'center'
                                                            }}
                                                        >
                                                            <Ionicons name="md-calendar" size={14}/>
                                                        </View>
                                                        <View
                                                            style={{
                                                                height: '100%',
                                                                justifyContent: 'center',
                                                                paddingLeft: 10
                                                            }}
                                                        >
                                                            <Text
                                                                style={{
                                                                    fontSize: 13
                                                                }}
                                                            >{moment(this.state.tanggalAktivitas).format('DD-MM-YYYY HH:mm:ss')}</Text>
                                                        </View>
                                                    </View>
                                                    {this.state.showDatePicker &&
                                                        <DateTimePicker
                                                            value={this.state.tanggalAktivitas}
                                                            mode="datetime"
                                                            mode={'date'}
                                                            is24Hour={true}
                                                            display="default"
                                                            onChange={(event, value) => {
                                                                if (value !== undefined){
                                                                    this.setState({
                                                                        showDatePicker: false,
                                                                        tanggalAktivitas: value
                                                                    })
                                                                } else {
                                                                    this.setState({
                                                                        showDatePicker: false
                                                                    })
                                                                }
                                                                
                                                            }}
                                                        />
                                                    }
                                                </Ripple>
                                            </View>
                                        </View>
                                        
                                        <View
                                            style={{
                                                marginTop: 10,
                                                width: '100%',
                                                height: 50,
                                                alignItems: 'center',
                                                flexDirection: 'row'
                                            }}
                                        >
                                            <Text 
                                                style={{
                                                    width: '40%',
                                                    fontSize: 13,
                                                    color: '#333'
                                                }}
                                            >Indikator kinerja</Text> 
                                            <View
                                                style={{
                                                    width: '60%',
                                                    paddingLeft: 10,
                                                    alignItems: 'center'
                                                }}
                                            >
                                                <Ripple
                                                    onPress={() => {
                                                        this.setState({
                                                            slideType: 0
                                                        })
                                                        this.sliderUp.show(400, {
                                                            y: .2
                                                        })
                                                    }}
                                                    rippleColor={'rgba(0,0,0,.4)'}
                                                    style={[{
                                                        width: '90%',
                                                        position: 'relative',
                                                        alignItems:"center",
                                                        flexDirection: 'row',
                                                        height: 40,
                                                        borderRadius: 10,
                                                        paddingLeft: 10,
                                                        overflow: 'hidden',
                                                        backgroundColor: '#fff'
                                                    }, shadow]}
                                                >
                                                    <Text
                                                        style={{
                                                            fontSize: 13
                                                        }}
                                                    >{this.state.chosenIndikator !== null ? 'Ganti Indikator' : 'Pilih Indikator'}</Text>
                                                    {this.state.chosenIndikator !== null &&
                                                        <View
                                                            style={{
                                                                flex: 1,
                                                                alignItems: 'flex-end',
                                                                paddingRight: 10
                                                            }}
                                                        >
                                                            <Feather name={'edit'} size={18}/>   
                                                        </View>
                                                    }
                                                </Ripple> 
                                            </View>
                                        </View>
                                        {this.state.chosenIndikator !== null &&
                                            <View
                                                style={{
                                                    width: '100%', 
                                                    backgroundColor: background_color,
                                                    padding: 10,
                                                    borderRadius: 10,
                                                }}
                                            >
                                                <Text
                                                    style={{
                                                        fontSize: 13,
                                                        color: '#333',
                                                        lineHeight: 20
                                                    }}
                                                >{this.state.chosenIndikator !== null && this.state.chosenIndikator.value}</Text>
                                            </View>
                                        }
                                        
                                        {/* <View
                                            style={{
                                                width: '100%',
                                                paddingHorizontal: 5,
                                                alignItems: 'center'
                                            }}
                                        >
                                            <Ripple
                                                onPress={() => {
                                                    this.setState({
                                                        slideType: 0
                                                    })
                                                    this.sliderUp.show(400, {
                                                        y: .2
                                                    })
                                                }}
                                                rippleColor={'rgba(0,0,0,.4)'}
                                                style={[{
                                                    width: '100%',
                                                    borderRadius: 10,
                                                    overflow: 'hidden',
                                                    minHeight: 40,
                                                    maxHeight: 60,
                                                    position: 'relative',
                                                    flexDirection: 'row',
                                                    justifyContent: 'center', 
                                                    backgroundColor: '#fff',
                                                    alignItems: 'center'
                                                },Styles.shadow]}
                                            >
                                                <Text
                                                    style={{
                                                        width: '80%',
                                                        paddingHorizontal: 10,
                                                        lineHeight: 20,
                                                        fontSize: 13
                                                    }}
                                                >
                                                    {this.state.chosenIndikator !== null ? this.state.chosenIndikator.value : 'Pilih Indikator Kinerja'}
                                                </Text>
                                                <View
                                                    style={{
                                                        justifyContent: 'center',
                                                        paddingBottom: 5,
                                                        height: '100%',
                                                        width: '20%'
                                                    }}
                                                >
                                                    <Icon 
                                                        type={'font-awesome'}
                                                        name={'sort-down'}
                                                        color={'#333'}
                                                        size={18}
                                                    />
                                                </View>
                                            </Ripple>
                                            
                                        </View> */}
                                        <View
                                            style={{
                                                marginTop: 10,
                                                width: '100%',
                                                height: 50,
                                                alignItems: 'center',
                                                flexDirection: 'row'
                                            }}
                                        >
                                            <Text 
                                                style={{
                                                    width: '40%',
                                                    fontSize: 13,
                                                    color: '#333'
                                                }}
                                            >Data pendukung</Text>   
                                            <View
                                                style={{
                                                    width: '60%',
                                                    paddingRight: 10,
                                                    alignItems: 'flex-end'
                                                }}
                                            >
                                                <Ripple
                                                    onPress={() => {
                                                        this.setState({
                                                            slideType: 1
                                                        })
                                                        this.sliderUp.show(150, {
                                                            y: .2
                                                        })
                                                    }}
                                                    rippleColor={'rgba(0,0,0,.4)'}
                                                    style={[{
                                                        width: '90%',
                                                        borderRadius: 10,
                                                        overflow: 'hidden',
                                                        height: 40,
                                                        position: 'relative',
                                                        flexDirection: 'row',
                                                        justifyContent: 'center', 
                                                        backgroundColor: '#fff',
                                                        alignItems: 'center'
                                                    },Styles.shadow]}
                                                >
                                                    <Text
                                                        style={{
                                                            width: '100%',
                                                            paddingHorizontal: 10,
                                                            fontSize: 13
                                                        }}
                                                    >
                                                        Masukan Data pendukung
                                                    </Text>
                                                </Ripple>
                                                
                                            </View>
                                        </View>
                                        {this.state.chosenDataPendukung !== null ? 
                                            <View
                                                style={{
                                                    paddingVertical: 10,
                                                    paddingHorizontal: 10,
                                                    marginTop: 10,
                                                    backgroundColor: '#e1f7fa',
                                                    borderRadius: 10,
                                                    width: '100%',
                                                }}
                                            >
                                                <View
                                                    style={{
                                                        flexDirection:'row',
                                                        alignItems: 'center'
                                                    }}
                                                >
                                                    <Text
                                                        style={{
                                                            width: '40%',
                                                            color: '#333',
                                                            fontSize: 13
                                                        }}
                                                    >
                                                        Norm 
                                                    </Text>
                                                    <Text
                                                        style={{
                                                            width: '60%',
                                                            color: '#333',
                                                            fontSize: 13
                                                        }}
                                                    >
                                                        : {this.state.chosenDataPendukung.norm} 
                                                    </Text>
                                                </View>
                                                <View
                                                    style={{
                                                        marginTop: 10,
                                                        flexDirection:'row',
                                                        alignItems: 'center'
                                                    }}
                                                >
                                                    <Text
                                                        style={{
                                                            width: '40%',
                                                            color: '#333',
                                                            fontSize: 13
                                                        }}
                                                    >
                                                        Nama Pasien 
                                                    </Text>
                                                    <Text
                                                        style={{
                                                            width: '60%',
                                                            color: '#333',
                                                            fontSize: 13
                                                        }}
                                                    >
                                                        : {this.state.chosenDataPendukung.nama_pasien}
                                                    </Text>
                                                </View>
                                            </View> : null
                                        }
                                        <View
                                            style={{
                                                marginTop: 20,
                                                width: '100%',
                                            }}
                                        >
                                            <Text 
                                                style={{
                                                    fontWeight: 'bold',
                                                    width: '100%',
                                                    fontSize: 13,
                                                    color: '#333'
                                                }}
                                            >Aktivitas</Text>   
                                            <View
                                                style={{
                                                    marginTop: 10,
                                                    width: '100%',
                                                    borderRadius: 10,
                                                    backgroundColor: '#e1f7fa',
                                                    height: 100
                                                }}
                                            >
                                                <TextInput
                                                    onSubmitEditing={() => {
                                                        
                                                    }}
                                                    onChangeText={(value) => {
                                                        this.setState({aktivitas: value})
                                                    }}
                                                    multiline={true}
                                                    style={[Styles.formTextInput, {textAlignVertical: 'top', padding: 10}]}
                                                    value={this.state.aktivitas}
                                                    placeholder={"Isi aktivitas yang di lakukan"}
                                                />
                                            </View>
                                        </View>
                                        <View
                                            style={{
                                                marginTop: 10,
                                                width: '100%'
                                            }}
                                        >
                                            <SwitchSelector
                                                options={[
                                                    {
                                                        label: 'Dalam Pengerjaan',
                                                        value: 'Dalam Pengerjaan'
                                                    },
                                                    {
                                                        label: 'Selesai',
                                                        value: 'Selesai'
                                                    }
                                                ]}
                                                textStyle={{
                                                    fontSize: 12,
                                                    color: '#333'
                                                }}
                                                borderRadius={10}
                                                buttonColor={'#63b3ed'}
                                                initial={0}
                                                onPress={value => this.setState({statusPengerjaan: value})}
                                            />
                                        </View>
                                        <View
                                            style={{
                                                marginTop: 20,
                                                width: '100%',
                                                alignItems: 'center'
                                            }}
                                        >
                                            {this.state.validateMessage.length > 0 ? 
                                                <View
                                                    style={{
                                                        width: '100%',
                                                        flexDirection: 'row',
                                                        alignItems: 'center',
                                                        justifyContent: 'center'
                                                    }}
                                                >
                                                    <Text 
                                                        style={{
                                                            color: '#ff776e',
                                                            fontSize: 12,
                                                            marginRight: 10,
                                                            paddingVertical: 20
                                                        }}
                                                        >{this.state.validateMessage}</Text>
                                                    <Icon 
                                                        type={'font-awesome'}
                                                        name={'exclamation-circle'}
                                                        size={12}
                                                        color={'#ff776e'}
                                                    />
                                                </View> : null
                                            }
                                            <Ripple
                                                onPress={() => this.onSubmitAktivitas()}
                                                rippleColor={'rgba(255,255,255,.6)'}
                                                style={{
                                                    width: '100%',
                                                    backgroundColor: '#63b3ed',
                                                    flexDirection: 'row',
                                                    justifyContent: 'center',
                                                    borderRadius: 10,
                                                    paddingHorizontal: 20,
                                                    paddingVertical: 15
                                                }}
                                            >
                                                <Text
                                                    style={{
                                                        color: '#fff'
                                                    }}
                                                >Simpan</Text>
                                            </Ripple>
                                        </View>
                                    </ScrollView>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <SlidingUpPanel 
                    onBottomReached={() => this.state.confirmStatus === 2 ? this.props.navigation.replace('MainMenu') : {}}
                    containerStyle={{
                        zIndex: 50
                    }}
                    friction={.4}
                    draggableRange={{ top: this.state.sliderUpContentHeight, bottom: 0 }}
                    onBackButtonPress={() => {
                        this.sliderUp.hide(); 
                        return true
                    }}
                    allowDragging={this.state.allowDragging}
                    ref={c => this.sliderUp = c}>
                    {this.state.loader !== true ? (this.state.slideType === 0 ? this.renderSelectSlider() : this.renderOpsiDataPendukung()): this.renderLoader() }
                </SlidingUpPanel>
            </KeyboardAvoidingView>
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
        color: '#000'
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
    }
})