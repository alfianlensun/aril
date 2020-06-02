import React, {Component} from 'react'
import {
    Text,
    View,
    StyleSheet,
    StatusBar,
    RefreshControl,
    ImageBackground,
    FlatList
} from 'react-native'
import {screenHeightPercent, screenWidthPercent} from '../../../helpers/Layout'
import {Icon} from 'react-native-elements'
import Ripple from 'react-native-material-ripple'
import DatePickerIos from 'react-native-datepicker'
import moment from 'moment'
import {getData} from '../../../services/LocalStorage'
import {Calendar} from 'react-native-calendars';
import {getAktivitasByDate, abortRequest} from '../../../services/ServiceSdm'
import ListAbsenDetail from '../../../components/list/ListAbsenDetail'
import LoaderListAbsenDetail from '../../../components/loader/LoaderListAbsenDetail'


export default class RekapAktivitasHarianPegawai extends Component{
       
    constructor(props){
        super(props)
        this.state = {
            loaderList: false,
            loaderSlider: false,
            errorList: null,
            errorSlider: null,
            userDetail: null,
            chosenDay: {},
            changedMonth: false,
            currentCalendarSelect: moment(new Date()).format('YYYY-MM-DD'),
            tanggalDipilih: moment(new Date()).format('YYYY-MM-DD'),
            rawListAbsen: [],
            listRekapAktivitas: {},
            listRekapAktivitasDetail: []
        }
    }

    componentDidMount(){
        this.mounted = true
        getData('AuthUser').then(data => {
            this.setState({
                chosenDay: {[ moment(new Date()).format('YYYY-MM-DD')]: {selected: true, marked: true, selectedColor: '#6ab1f7'}},
                userDetail: data
            })
            this.getAktivitas(this.state.tanggalDipilih)
        }).catch(err => {
            // this.setState({
            //     loader: false
            // })
        })
    }

    getAktivitas(date){
        const id_user = '';
        this.setState({
            loader: true
        })
        
        getAktivitasByDate(date, this.state.userDetail.user_detail.id_sdm_trx_kepegawaian).then(resp => {
            console.log(resp)
            if (this.mounted){
                this.setState({
                    loaderList: false,
                    listRekapAktivitasDetail: resp.response
                })
            }
        }).catch(err => {
            if (this.mounted){
                this.setState({
                    loaderList: false
                })
            }
        })
    }

    componentWillUnmount(){
        this.mounted = false
    }

    renderCalendar(){
        return (<Calendar
            onDayPress={(day) => {
                if (day.dateString !== this.state.tanggalDipilih){
                    this.getAktivitas(day.dateString)
                }
                
                this.setState({chosenDay: {[day.dateString]: {selected: true, marked: true, selectedColor: '#6ab1f7'}}, tanggalDipilih: day.dateString})
            }}
            pagingEnabled={true}
            onMonthChange={(months) => {
                
            }}
            markingType={'multi-dot'}
            markedDates={this.state.chosenDay}
        />)
    }

    renderListAktivitasDetail = () => {
        const {listRekapAktivitasDetail} = this.state
        if (listRekapAktivitasDetail !== null){
            if (listRekapAktivitasDetail.length > 0){
                return (
                    <FlatList
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.loaderList}
                                onRefresh={() => this.getAktivitas(this.state.tanggalDipilih)}
                            />
                        }
                        showsVerticalScrollIndicator={false}
                        data={this.state.listRekapAktivitasDetail}
                        renderItem={({ item }) => {
                            return <Ripple
                                rippleColor={'rgba(0,0,0,.1)'}
                                style={[{
                                    width: '100%',
                                    height: 130,
                                    borderBottomWidth: 1,
                                    position: 'relative',
                                    marginTop: 20,
                                    borderRadius: 10,
                                    borderBottomColor: '#eee',
                                    backgroundColor: '#6ab1f7',
                                    overflow: 'hidden'
                                }]}
                            >
                                <View
                                    style={{
                                        width: '100%',
                                        height: 20,
                                    }}
                                >
                                    <View>
                                        {/* <Text
                                            style={{
                                                fontSize: 12,
                                                borderBottomLeftRadius: 10,
                                                borderTopLeftRadius: 10,
                                                alignSelf: 'flex-start',
                                                backgroundColor: '#6ab1f7',
                                                color: '#fff',
                                                paddingVertical: 5,
                                                paddingHorizontal: 10
                                            }}
                                        >Selesai</Text> */}
                                        <Text
                                            style={{
                                                fontSize: 12,
                                                borderBottomRightRadius: 10,
                                                borderTopRightRadius: 10,
                                                width: '40%',
                                                backgroundColor: '#6ab1f7',
                                                color: '#fff',
                                                fontWeight: 'bold',
                                                paddingVertical: 5,
                                                paddingHorizontal: 10
                                            }}
                                            >{item.status_pengerjaan}</Text>
                                    </View>
                                </View>
                                <View
                                    style={{
                                        justifyContent: 'center',
                                        height: 80,
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontSize: 12,
                                            padding: 10,
                                            lineHeight: 15,
                                            color: '#fff'
                                        }}
                                    >
                                        {item.aktivitas}
                                    </Text>
                                </View>
                                <View
                                    style={{
                                        alignItems: 'center',
                                        height: 30,
                                        flexDirection: 'row',
                                        borderTopWidth: 1,
                                        borderTopColor: '#eee'
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontSize: 12,
                                            color: '#fff',
                                            paddingVertical: 5,
                                            paddingHorizontal: 10
                                        }}
                                    >Data Pendukung</Text>
                                    <Text
                                        style={{
                                            fontSize: 12,
                                            color: '#fff',
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        : NORM ({item.data_pendukung[0].norm})
                                    </Text>
                                </View>
                            </Ripple>
                        }}
                        keyExtractor={item => item._id}
                    />
                )
            } else {
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
                            <Text
                                style={{
                                    color: '#444',
                                    lineHeight: 30
                                }}
                            >Anda tidak mempunyai aktivitas pada tanggal {moment(this.state.tanggalDipilih).format('DD MMMM YYYY')}</Text>   
                        </View>
                    </View>
                )
            }
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
            <View 
                style={{
                    flex: 1,
                    backgroundColor: '#fff'
                }}
            >
                <View 
                    style={{
                        flex: 1,
                        backgroundColor: '#e1f7fa',
                    }}
                >
                    <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
                    <View style={Styles.header}></View>
                    <View 
                        style={{
                            marginTop: 10,
                            flexDirection: 'row',
                            paddingHorizontal: 10,
                            alignItems: 'center'
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
                                    color={'#444'}
                                    size={24}
                                />
                            </Ripple>
                        </View>
                        <Text
                            style={{
                                fontSize: 16,
                                marginLeft: 10,
                                color: '#444'
                            }}
                        >Rekap Aktivitas Harian</Text>
                    </View>
                    <View 
                        style={[Styles.shadowTiny, {
                            width: '100%',
                            height: '100%',
                            backgroundColor: '#fff',
                            borderTopLeftRadius: 30,
                            borderTopRightRadius: 30,
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
                        <View
                            style={{
                                width: '100%',
                                height: '33%',
                                paddingHorizontal: 10,
                            }}
                        >
                            {this.state.loaderList ? <LoaderListAbsenDetail /> : this.renderListAktivitasDetail()}
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
    containerWrapper:{
        width: '100%',
        justifyContent: 'center' 
    },
    header: {
        backgroundColor: '#e1f7fa',
        height: screenHeightPercent(4)
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
