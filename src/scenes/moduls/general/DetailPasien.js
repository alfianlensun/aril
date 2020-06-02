import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    FlatList,
    TextInput,
    ActivityIndicator
} from 'react-native'
import {screenHeightPercent, screenWidthPercent} from '../../../helpers/Layout'
import {getData} from '../../../services/LocalStorage'

import {Icon} from 'react-native-elements'
import Ripple from 'react-native-material-ripple'
import DatePickerIos from 'react-native-datepicker'
import SlidingUpPanel from 'rn-sliding-up-panel'
import moment from 'moment'
import { TouchableOpacity } from 'react-native-gesture-handler'
import CardPendaftaranPasien from '../../../components/cards/CardPendaftaranPasien'
import {getPendaftaranInapActive} from '../../../services/ServicePasien'
import {updateBedTerisi, updateBedKosong,insertHistoryBed} from '../../../services/ServiceMonitoring'

export default class DetailPasien extends Component {
    constructor(props){
        super(props)
        const params = this.props.route.params
        this.state = {
            loader: false,
            loaderSlider: false,
            loaderMessage: 'Mohon tunggu...',
            errorMessage: '',
            success: false,
            params: params,
            pasiendetail: params.dataPasien.Properties !== undefined ? params.dataPasien.Properties : params.dataPasien,
            pendaftaranTerakhir: null,
            sliderUpContentHeight: 200,
            allowDragging: false,
            confirmStatus: 0,
            tanggalMasuk: new Date(),
            chosenDay: {
                [moment(new Date()).format('YYYY-MM-DD')]: {selected: true, marked: true, selectedColor: 'blue'}
            }
        }
        
    }

    componentDidMount(){
        this.mounted = true
        this.getPendaftaranTerakhir(this.state.pasiendetail.norm)
    }

    onSubmitUpdateKamar = () => {
        this.setState({
            confirmStatus: 0,
            loaderSlider: true,
            success: false,
            loaderMessage: 'Mohon tunggu...'
        })
        const {pendaftaranTerakhir, pasiendetail} = this.state
        const {DataBed} = this.state.params.params

        updateBedTerisi(DataBed._id, pendaftaranTerakhir.id_trx_pendaftaran, this.state.tanggalMasuk, pasiendetail.norm).then(resp => {
            if (resp.reqStat.code === 200){
                insertHistoryBed(DataBed._id, pendaftaranTerakhir.id_trx_pendaftaran, this.state.tanggalMasuk, pasiendetail.norm).then(history => {

                    updateBedKosong(pendaftaranTerakhir.id_bed, pendaftaranTerakhir.id_trx_pendaftaran, this.state.tanggalMasuk, pasiendetail.norm).then(updateKosong => {
                        this.setState({
                            loaderSlider: true,
                            success: true,
                            loaderMessage: 'Bed berhasil di perbarui'
                        })
                    }).catch(errUpdateKosong => {

                        this.setState({
                            confirmStatus: 3,
                            success: false,
                            loaderSlider: false,
                            loaderMessage: 'Somthing Went Wrong'
                        })
                    })
                }).catch(errorHistory => {
                    
                    this.setState({
                        confirmStatus: 3,
                        success: false,
                        loaderSlider: false,
                        loaderMessage: 'Somthing Went Wrong'
                    })
                })
                
            } 
            else 
            if (resp.reqStat.code === 201){
                this.setState({
                    confirmStatus: 2,
                    success: false,
                    loaderSlider: false,
                    errorMessage: resp.reqStat.message
                })
            } 
            else 
            {
                this.setState({
                    confirmStatus: 3,
                    success: false,
                    loaderSlider: false,
                    errorMessage: resp.reqStat.message
                })
            }
        }).catch(err => {
            this.setState({
                confirmStatus: 0,
                success: false,
                loaderSlider: false,
                loaderMessage: 'Somthing Went Wrong'
            })

            setTimeout(() => {
                this.sliderUp.hide()
            }, 2000);
        })
    }


    onSubmitInsertHistory = () => {
        insertHistoryBed(DataBed._id, pendaftaranTerakhir.id_trx_pendaftaran, this.state.tanggalMasuk, pasiendetail.norm).then(history => {
            this.setState({
                loaderSlider: true,
                success: true,
                loaderMessage: 'Bed berhasil di perbarui'
            })
        }).catch(errorHistory => {          
            this.setState({
                confirmStatus: 3,
                success: false,
                loaderSlider: false,
                loaderMessage: 'Somthing Went Wrong'
            })
        })
    }

    getPendaftaranTerakhir = (norm) => {
        getPendaftaranInapActive(norm).then(resp => {
            if ((resp.reqStat.code === 200 || resp.reqStat.code === 201) && resp.response !== null){
                if (this.mounted){
                    this.setState({
                        pendaftaranTerakhir: resp.response
                    })
                } 
            } else {
                if (this.mounted){
                    this.setState({
                        pendaftaranTerakhir: null
                    })
                }
            }
        })
        
    }
    

    componentWillUnmount(){
        this.mounted = false
    }

    renderLoaderSlider(){
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
                        <View>
                            <Ripple
                                onPress={() => this.props.navigation.navigate('MainMenu')}
                                rippleColor={'rgba(255,255,255,.4)'}
                                style={{
                                    marginTop: '5%',
                                    paddingHorizontal: 40,
                                    borderRadius: 10,
                                    paddingVertical: 10,
                                    backgroundColor: '#6ab1f7'
                                }}   
                            >
                                <Text style={{color: '#fff'}}>OK</Text>
                            </Ripple>
                        </View> : null
                    }
                </View>
            </View>
        )
    }

    // IF TARIK DATA PENDAFTARAN
    renderWarningTempatiKamar(){
        return (
            <View
                style={{
                    zIndex: 0,
                    width: '100%',
                    position: 'absolute',
                    backgroundColor: '#ff8a82',
                    
                    alignItems: 'center',
                    paddingVertical: 20,
                    bottom: 0,
                }}
            >   
                <Icon
                    type={'font-awesome'}
                    name={'exclamation-circle'}
                    color={'#fff'}
                />
                <Text
                    style={{
                        marginTop: 5,
                        color: '#fff',
                        fontSize: 12
                    }}
                >Pasien tidak memiliki pendaftaran inap aktif </Text>
                <Text
                    style={{
                        marginTop: 5,
                        color: '#fff',
                        fontSize: 12
                    }}
                >Tidak dapat menempati kamar</Text>
            </View>   
        )
    }

    renderButtonTempatiKamar(){
        return (
            <View
                style={{
                    zIndex: 0,
                    width: '100%',
                    position: 'absolute',
                    alignItems: 'center',
                    bottom: 0,
                }}
            >
                <View
                    style={{
                        width: '100%',
                        backgroundColor: '#fff',
                        borderTopColor: '#eee',
                        borderTopWidth: 1,
                    }}
                >
                    <View
                        style={{
                            width: '100%'
                        }}
                    >
                        <View
                            style={[{
                                width: '100%',
                                paddingBottom: 10,
                                paddingHorizontal: 10,
                                flexDirection: 'row',
                                borderTopColor: '#eee',
                                alignItems: 'center',
                            }]}
                        >
                            <Text
                                style={{
                                    width: '30%'
                                }}
                            >Tanggal Masuk</Text>
                            <View
                                style={{
                                    width: '70%',
                                    backgroundColor: '#fff',
                                    alignItems: 'flex-end'
                                }}
                            >
                                <View 
                                    style={[{
                                        marginTop: 10,
                                        position: 'relative',
                                        justifyContent:"center",
                                        height: 40,
                                        borderRadius: 10,
                                        paddingLeft: 20,
                                        overflow: 'hidden',
                                        backgroundColor: '#fff'
                                    }, Styles.shadow]}
                                >
                                    <DatePickerIos
                                        style={{alignSelf: 'flex-start', height: '100%'}}
                                        date={this.state.tanggalMasuk}
                                        mode="datetime"
                                        showIcon={true}
                                        iconComponent={
                                            <View
                                                style={{
                                                    position: 'absolute',
                                                    left: 0
                                                }}
                                            >
                                                <Icon 
                                                    type={'font-awesome'}
                                                    name={'calendar'}
                                                    color={'#000'}
                                                    size={14} 
                                                />
                                            </View>
                                        }
                                        customStyles={{
                                            dateInput:{
                                                borderWidth: 0,
                                                borderColor: '#86F49B'
                                            },
                                            placeholderText: {
                                                fontSize: 12,
                                            },
                                            dateText: {
                                                marginLeft: 5,
                                                fontSize: 12,
                                                color: "#222",
                                            }
                                        }}
                                        format="YYYY-MM-DD HH:mm:ss"
                                        confirmBtnText="Confirm"
                                        cancelBtnText="Cancel"
                                        onDateChange={(date) => {
                                            this.setState({
                                                tanggalMasuk: date
                                            })
                                        }}
                                    />
                                    
                                </View>
                            </View>
                            
                        </View>
                    </View>
                    
                </View>
                
                <Ripple
                    onPress={() => {
                        this.sliderUp.show(200, {
                            y: .2
                        })
                    }}
                    style={{
                        width: '100%',
                        backgroundColor: '#6ab1f7',
                        paddingHorizontal: 20,
                        paddingVertical: 20,
                        alignItems: 'center'
                        
                    }}
                    rippleColor={'rgba(0,0,0,.4)'}
                >
                    <Text
                        style={{
                            color: '#fff'
                        }}
                    >Tempati Kamar</Text>
                </Ripple>
            </View>
        )
    }

    renderKonfirmasiAddHistoryOpsiSlider(){
        return <View>
            <View
                style={{
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center'
                }}
            >
                <Text style={{marginRight: 10}}>{'Gagal'} memperbarui kamar</Text>
                <Icon 
                    type={'font-awesome'}
                    name={'exclamation-circle'}
                    size={14}
                    color={'#444'}
                />
            </View>
            <Text
                style={{
                    marginTop: 10,
                    fontSize: 12,
                    lineHeight: 20
                }}
            >{this.state.errorMessage}</Text>
            {this.state.confirmStatus === 1 ? 
                <Text
                    style={{
                        marginTop: 10,
                        fontSize: 12,
                        lineHeight: 20
                    }}
                >Simpan sebagai riwayat bed ?</Text> : null
            }
        </View>
    }

    renderKonfirmasiOpsiSlider(){
        const {pendaftaranTerakhir, params} = this.state
        return (
            <View>
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
                >{pendaftaranTerakhir.nm_unit_ruangan+'/'+pendaftaranTerakhir.nama_kamar+'/ Bed '+pendaftaranTerakhir.nama_bed}</Text>
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
                >{params.params.DataKamar.ParamsRuangan.namaRuangan} / {params.params.DataKamar.ParamsKamar.nama_kamar} / {'Bed '+params.params.DataBed.nama_bed}</Text>
            </View>
        )
    }

    renderOpsiSlider = () =>{
        const {pendaftaranTerakhir, params} = this.state
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
                    {this.state.confirmStatus === 0 ? this.renderKonfirmasiOpsiSlider() : this.renderKonfirmasiAddHistoryOpsiSlider()}
                    <View
                        style={{
                            marginTop: 20,
                            width: '100%',
                            flexDirection: 'row',
                            paddingHorizontal: 20,
                            justifyContent: 'center'
                        }}
                    >
                        <TouchableOpacity
                            onPress={() => {
                                this.sliderUp.hide()
                                if (this.state.confirmStatus === 2){
                                    this.props.navigation.replace('MainMenu')
                                }
                            }}
                            activeOpacity={.5}
                            style={[{
                                width: '100%',
                                backgroundColor: '#90cdf4',
                                paddingHorizontal: 10,
                                flexDirection: 'row',
                                justifyContent: 'center',
                                borderTopLeftRadius: 10,
                                borderBottomLeftRadius: 10,
                                borderTopRightRadius: this.state.confirmStatus === 2 ? 10 : 0,
                                borderBottomRightRadius: this.state.confirmStatus === 2 ? 10 : 0,
                                paddingVertical: 15,
                            }, Styles.shadow]}
                        >
                            <Text
                                style={{
                                    color: '#fff'
                                }}
                            >{this.state.confirmStatus === 0 ? 'Tidak' : (this.state.confirmStatus === 1) ? 'Kembali' : 'Ok'}</Text>
                        </TouchableOpacity>
                        {this.state.confirmStatus !== 2 ?
                            <TouchableOpacity
                                activeOpacity={.5}
                                onPress={() => {
                                    this.state.confirmStatus === 0 ? this.onSubmitUpdateKamar() : this.onSubmitInsertHistory()
                                }}
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
                            </TouchableOpacity> : null
                        }
                    </View>
                </View>
                
            </View>
        )
    }

    render(){
        const {pasiendetail,params, pendaftaranTerakhir} = this.state
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
                        >Detail Pasien </Text>
                    </View>
                </View>
                <View
                    style={{
                        width: '100%',
                        alignItems: 'center'
                    }}
                >
                    <Text
                        style={{
                            borderRadius: 5,
                            paddingVertical: 5,
                            paddingHorizontal: 10,
                            backgroundColor: '#6ab1f7',
                            color: '#fff',
                            fontSize: 12
                        }}
                    >Kamar Di Pilih : {params.params.DataKamar.ParamsRuangan.namaRuangan} / {params.params.DataKamar.ParamsKamar.nama_kamar} / {'Bed '+params.params.DataBed.nama_bed}</Text>
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
                            >{pasiendetail.nama_pasien.trim()}</Text>   
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
                                > {pasiendetail.norm} </Text>
                            </View>
                        </View>

                        {pendaftaranTerakhir !== null ? 
                            <CardPendaftaranPasien 
                                noPendaftaran={pendaftaranTerakhir.no_pendaftaran}
                                caraBayar={pendaftaranTerakhir.nama_cara_bayar}
                                ruangan={pendaftaranTerakhir.nm_unit_ruangan}
                                kamar={pendaftaranTerakhir.nama_kamar}
                                bed={pendaftaranTerakhir.nama_bed}
                            /> : null
                        }
                        <View
                            style={{
                                width: '100%',
                                marginTop: 20,
                            }}
                        >
                            <Ripple
                                onPress={() => this.props.navigation.navigate('DataDiriPasien', {
                                    norm: pasiendetail.norm,
                                    nama_pasien: pasiendetail.nama_pasien
                                })}
                                rippleColor={'rgba(0,0,0,.4)'}
                                style={{
                                    borderBottomWidth: 1,
                                    borderBottomColor: '#eee',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    marginTop: 10,
                                    height: 70,
                                    position: 'relative'
                                }}
                            >
                                <View
                                    style={{
                                        alignItems: 'flex-start',
                                        width: '15%',
                                        paddingHorizontal: 10
                                    }}
                                >
                                    <Icon 
                                        type={'font-awesome'}
                                        name={'info-circle'}
                                        size={18}
                                        color={'#444'}
                                    /> 
                                </View>
                                <View>
                                    <Text
                                        style={{
                                            color: '#333',
                                            fontSize: 14,
                                            fontWeight: 'bold'
                                        }}
                                    >Data Diri Pasien</Text>
                                    <Text
                                        style={{
                                            marginTop: 2,
                                            fontSize: 12
                                        }}
                                    >Lihat Data Diri Pasien</Text>
                                </View>
                            </Ripple>
                            <Ripple
                                onPress={() => this.props.navigation.navigate('RiwayatPendaftaranPasien', {
                                    norm: pasiendetail.norm,
                                    nama_pasien: pasiendetail.nama_pasien
                                })}
                                rippleColor={'rgba(0,0,0,.4)'}
                                style={{
                                    borderBottomWidth: 1,
                                    borderBottomColor: '#eee',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    marginTop: 10,
                                    height: 70,
                                    position: 'relative'
                                }}
                            >
                                <View
                                    style={{
                                        alignItems: 'flex-start',
                                        width: '15%',
                                        paddingHorizontal: 10
                                    }}
                                >
                                    <Icon 
                                        type={'font-awesome'}
                                        name={'history'}
                                        size={18}
                                        color={'#444'}
                                    /> 
                                </View>
                                <View>
                                    <Text
                                        style={{
                                            color: '#333',
                                            fontSize: 14,
                                            fontWeight: 'bold'
                                        }}
                                    >Riwayat Pendaftaran pasien</Text>
                                    <Text
                                        style={{
                                            marginTop: 2,
                                            fontSize: 12
                                        }}
                                    >Lihat Riwayat Pendaftaran</Text>
                                </View>
                            </Ripple>
                        </View>
                    </View>
                </View>
                {pendaftaranTerakhir !== null ? this.renderButtonTempatiKamar() : this.renderWarningTempatiKamar()}
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
                    {pendaftaranTerakhir !== null && this.state.loaderSlider !== true ? this.renderOpsiSlider() : this.renderLoaderSlider()}
                </SlidingUpPanel>
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