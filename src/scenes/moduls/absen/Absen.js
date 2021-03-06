import React, {Component} from 'react'
import {
    Text,
    View,
    StyleSheet,
    StatusBar,
    ImageBackground,
    FlatList,
    ScrollView
} from 'react-native'
import {screenHeightPercent, screenWidthPercent} from '../../../helpers/Layout'
import {Icon} from 'react-native-elements'
import Ripple from 'react-native-material-ripple'
import DatePickerIos from 'react-native-datepicker'
import moment from 'moment'
import {getData} from '../../../services/LocalStorage'
import {Calendar} from 'react-native-calendars';
import {getAbsensi,getAbsensiMobile, abortRequest} from '../../../services/ServiceSdm'
import ListAbsenDetail from '../../../components/list/ListAbsenDetail'
import LoaderListAbsenDetail from '../../../components/loader/LoaderListAbsenDetail'
import ListAbsenDetailMobile from '../../../components/list/ListAbsenDetailMobile'
import LinearGradient from 'react-native-linear-gradient'
import { background_color_gradient } from '../../../themes/Default'


export default class Absen extends Component{
       
    constructor(props){
        super(props)
        this.state = {
            loaderList: false,
            loaderSlider: false,
            errorList: null,
            errorSlider: null,
            userDetail: null,
            changedMonth: false,
            currentCalendarSelect: moment(new Date()).format('YYYY-MM-DD'),
            tanggalAwal: moment(new Date()).format('YYYY-MM')+'-'+'01',
            tanggalAkhir: moment(new Date()).format('YYYY-MM-DD'),
            tanggalDipilih: moment(new Date()).format('YYYY-MM-DD'),
            rawListAbsen: [],
            listAbsensi: {},
            listAbsensiDetail: null,
            listAbsensiDetailMobile: null
        }
    }

    componentDidMount(){
        this.mounted = true
        getData('AuthUser').then(data => {
            this.setState({
                userDetail: data
            })
            this.getListAbsensi(data.user_detail.id_sdm_trx_kepegawaian, this.state.tanggalAwal, this.state.tanggalAkhir)
        }).catch(err => {
            
        })
    }

    getListAbsensi = async (idMstPegawai, tanggalAwal, tanggalAkhir) => {
        try {
            this.setState({
                loaderList: true
            })
            const resp = await getAbsensi(idMstPegawai,tanggalAwal, tanggalAkhir)
            const {response} = await getAbsensiMobile(this.state.userDetail._id,tanggalAwal, tanggalAkhir)
        
            const listabsen = resp.response.result
            let calendars = {}
            let mergeListItem = [...response.masuk, ...response.pulang]
            this.setState({
                rawListAbsen: listabsen,
                rawListAbsenMobile: mergeListItem
            })
            for (const item of listabsen){
                let dotsMasuk = {}
                let dotsPulang = {}
                if (item.absen_masuk !== null){
                    dotsMasuk = {key:'masuk', color: '#34ebab', selectedDotColor: '#fff'}
                }
                if (item.absen_keluar !== null){
                    dotsPulang = {key:'pulang', color: '#42afed', selectedDotColor: '#fff'}
                }
                calendars[item.tanggal_absen] = {dots: [dotsMasuk, dotsPulang], selected: false, selectedColor: '#6ab1f7'}
            }


            for (const item of response.masuk){                
                if (calendars[moment(item.server_datetime).format('YYYY-MM-DD')] === undefined){
                    calendars[moment(item.server_datetime).format('YYYY-MM-DD')] = {dots: [{key:'masuk-mobile', color: '#34ebab', selectedDotColor: '#fff'}], selected: false, selectedColor: '#6ab1f7'}
                } else {
                    calendars[moment(item.server_datetime).format('YYYY-MM-DD')].dots.push({key:'masuk-mobile', color: '#34ebab', selectedDotColor: '#fff'})      
                }
                
            }
            for (const item of response.pulang){                
                if (calendars[moment(item.server_datetime).format('YYYY-MM-DD')] === undefined){
                    calendars[moment(item.server_datetime).format('YYYY-MM-DD')] = {dots: [{key:'pulang-mobile', color: '#42afed', selectedDotColor: '#fff'}], selected: false, selectedColor: '#6ab1f7'}
                } else {
                    calendars[moment(item.server_datetime).format('YYYY-MM-DD')].dots.push({key:'pulang-mobile', color: '#42afed', selectedDotColor: '#fff'})      
                }
                
            }
            
            let selectedDay = listabsen.filter(item => {
                return item.tanggal_absen === moment(new Date()).format('YYYY-MM-DD')
            })

            const selectedDayMobileMasuk = mergeListItem.filter(item => {
                return moment(item.server_datetime).format('YYYY-MM-DD') === moment(new Date()).format('YYYY-MM-DD') && item.absen_type === 1
            })
            const selectedDayMobilePulang = mergeListItem.filter(item => {
                return moment(item.server_datetime).format('YYYY-MM-DD') === moment(new Date()).format('YYYY-MM-DD') && item.absen_type === 2
            })

            const absenMobile = {
                absen_detail_masuk: selectedDayMobileMasuk.length > 0 ? selectedDayMobileMasuk[0] : null,
                absen_detail_pulang: selectedDayMobilePulang.length > 0 ? selectedDayMobilePulang[0]:null,
                absen_masuk: selectedDayMobileMasuk.length > 0 ? moment(selectedDayMobileMasuk[0].server_datetime).format('HH:mm:ss') : null,
                absen_keluar: selectedDayMobilePulang.length > 0 ? moment(selectedDayMobilePulang[0].server_datetime).format('HH:mm:ss') : null
            }
    
            if (this.mounted){
                this.setState({
                    listAbsensi: calendars,
                    listAbsensiDetail: selectedDay[0] !== undefined ? selectedDay[0] : null,
                    listAbsensiDetailMobile: absenMobile,
                    loaderList: false
                })
            }
        } catch(err){
            console.log(err)
        }
    }

    componentWillUnmount(){
        this.mounted = false
    }

    renderCalendar(){
        return (<Calendar
            onDayPress={(day) => {
                const {rawListAbsen, rawListAbsenMobile,listAbsensi} = this.state
                // ganti selected
                let listdate = {...listAbsensi}
                listdate[day.dateString] = day.dateString

                const selectedDay = rawListAbsen.filter(item => {
                    return item.tanggal_absen === day.dateString
                })

                const selectedDayMobileMasuk = rawListAbsenMobile.filter(item => {
                    return moment(item.server_datetime).format('YYYY-MM-DD') === day.dateString && item.absen_type === 1
                })
                const selectedDayMobilePulang = rawListAbsenMobile.filter(item => {
                    return moment(item.server_datetime).format('YYYY-MM-DD') === day.dateString && item.absen_type === 2
                })

                const absenMobile = {
                    absen_detail_masuk: selectedDayMobileMasuk.length > 0 ? selectedDayMobileMasuk[0] : null,
                    absen_detail_pulang: selectedDayMobilePulang.length > 0 ? selectedDayMobilePulang[0]:null,
                    absen_masuk: selectedDayMobileMasuk.length > 0 ? moment(selectedDayMobileMasuk[0].server_datetime).format('HH:mm:ss') : null,
                    absen_keluar: selectedDayMobilePulang.length > 0 ? moment(selectedDayMobilePulang[0].server_datetime).format('HH:mm:ss') : null
                }
                
                this.setState({
                    listAbsensiDetail: selectedDay[0] !== undefined ? selectedDay[0] : null,
                    listAbsensiDetailMobile: absenMobile,
                    tanggalDipilih: day.dateString
                })
            }}
            pagingEnabled={true}
            onMonthChange={(months) => {
                abortRequest().then(() => {
                    this.getListAbsensi(this.state.userDetail.user_detail.id_sdm_trx_kepegawaian, moment(months.dateString).format('YYYY-MM')+'-01', moment(months.dateString).format('YYYY-MM')+'-31')  
                })
            }}
            markingType={'multi-dot'}
            markedDates={this.state.listAbsensi}
        />)
    }

    renderListAbsenDetail = () => {
        const {listAbsensiDetail, listAbsensiDetailMobile} = this.state
        if (listAbsensiDetail !== null || listAbsensiDetailMobile !== null){
            return(
                <View
                    style={{
                        paddingHorizontal: 20,
                    }}
                >
                    <View
                        style={{
                            width: '100%',
                            alignItems: 'center'
                        }}
                    >
                        {listAbsensiDetail !== null && listAbsensiDetail.absen_masuk !== null ? 
                            <ListAbsenDetail 
                                masuk
                                jam={listAbsensiDetail.absen_masuk}
                            /> : null
                        }
                        {listAbsensiDetailMobile !== null &&  listAbsensiDetailMobile.absen_masuk !== null ? 
                            <ListAbsenDetailMobile 
                                masuk
                                detail={listAbsensiDetailMobile.absen_detail_masuk}
                                jam={listAbsensiDetailMobile.absen_masuk}
                                {...this.props}
                            /> : null
                        }
                        {listAbsensiDetail !== null && listAbsensiDetail.absen_keluar !== null ? 
                            <ListAbsenDetail 
                                jam={listAbsensiDetail.absen_keluar}
                            /> : null
                        }
                        {listAbsensiDetailMobile !== null && listAbsensiDetailMobile.absen_keluar !== null ? 
                            <ListAbsenDetailMobile 
                                detail={listAbsensiDetailMobile.absen_detail_pulang}
                                jam={listAbsensiDetailMobile.absen_keluar}
                                {...this.props}
                            /> : null
                        }
                        {listAbsensiDetail !== null && listAbsensiDetail.absen_masuk === null && listAbsensiDetail.absen_keluar === null ? 
                            <Text
                                style={{
                                    color: '#444'
                                }}
                            >Anda tidak absen {moment(this.state.tanggalDipilih).format('DD MMMM YYYY')}</Text> : null
                        }
                    </View>
                    
                </View>
            )
        } else {
            return (
                <View
                    style={{
                        paddingHorizontal: 20,
                        flexDirection: 'row',
                        justifyContent: 'center'
                    }}
                >
                    <Text
                        style={{
                            color: '#444'
                        }}
                    >Pilih hari terlebih dahulu</Text>
                </View>
            )
        }
    }

    render(){
        return (
            <LinearGradient
                start={{x: 0, y: 0}} 
                end={{x: 2, y: 0}} 
                colors={background_color_gradient} 
                style={{
                    flex: 1,
                }}>
                <View 
                    style={{
                        flex: 1,
                    }}
                >
                    <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
                    <View style={Styles.header}></View>
                    <View 
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingHorizontal: 10
                        }}
                    >
                        <View 
                            style={{
                                height: 50,
                                width: 50,
                                borderRadius: 50,
                                overflow: 'hidden'
                            }}
                        >
                            <Ripple
                                onPress={() => this.props.navigation.goBack(null)}
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
                                    color={'#fff'}
                                    size={24}
                                />
                            </Ripple>
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems:'center'
                            }}
                        >
                            <Icon 
                                type={'ionicons'}
                                name={'fingerprint'}
                                color={'#fff'}
                                size={24}
                            />
                            <Text
                                style={{
                                    fontSize: 20,
                                    marginLeft: 10,
                                    color: '#fff'
                                }}
                            >Absensi</Text>
                        </View>
                    </View>
                    <View 
                        style={[Styles.shadowTiny, {
                            flex: 1,
                            position: 'relative',
                            backgroundColor: '#fff',
                            borderTopLeftRadius: 30,
                            borderTopRightRadius: 30,
                            flexDirection: 'column',
                            overflow: 'hidden',
                            position: 'relative',
                            marginTop: 20,
                        }]}
                    >
                        
                        {this.renderCalendar()}
                        <View
                            style={{
                                paddingVertical: 20,
                                paddingHorizontal: 20, 
                                paddingBottom: 20,
                                flexDirection: 'row'
                            }}
                        >
                            <Text
                                style={{
                                    width: '100%',
                                    fontWeight: 'bold',
                                    color: '#555'
                                }}
                            >{this.state.tanggalDipilih !== moment(new Date()).format('YYYY-MM-DD') ? moment(this.state.tanggalDipilih).format('DD MMMM YYYY') : 'Hari Ini'}</Text>
                            
                        </View>
                        {this.state.loaderList ? <LoaderListAbsenDetail /> : (
                                <View
                                    style={{
                                        flex: 1,
                                        position: 'relative',
                                    }}
                                >
                                    <ScrollView
                                        style={{
                                            flex: 1
                                        }}
                                    >
                                        {this.renderListAbsenDetail()}
                                    </ScrollView>
                                </View>
                            )
                        }
                        
                    </View>
                    
                </View>
            </LinearGradient>
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
        height: screenHeightPercent(5)
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
    sliderWrapper: {
        position: 'relative',
        marginTop: screenHeightPercent(5),
        height: screenHeightPercent(20)
    },
    sliderTitle:{
        paddingLeft: 20,
        height: '20%',
    },
    sliderTitleText: {
        color: '#fff'
    },
    sliderContent:{
        height: '80%',
    },
    backgroundStyles: {
        height: 80,
        width: 80,
        backgroundColor: 'rgba(255,255,255,.3)',
        borderRadius: 50,
        position: 'absolute'
    },  
    cardSliderWrapper:{
        overflow: "hidden",
        padding: 10,
        position: 'relative',
        backgroundColor: '#0b73db',
        borderRadius: 10,
        width: '100%',
        height: '100%',
    },
    cardSliderStatus: {
        flexDirection: 'row',
        paddingVertical: 2,
        paddingHorizontal: 10,
        borderRadius: 5,
        backgroundColor: '#00C617',
        alignSelf: 'flex-start'
    },
    cardSliderStatusText: {
        fontSize: 14,
        color: '#fff',
        fontWeight: "bold"
    },
    cardSliderTitle: {
        marginTop: 5
    },
    cardSliderTitleTexttitle:{
        color: '#fff',
        fontSize: 16
    },
    cardSliderTitleTextJml:{
        alignSelf: "flex-end",
        color: '#fff',
        fontSize: 28,
        fontWeight: 'bold',
        paddingRight: 20,
        paddingTop: 20
    },
})
