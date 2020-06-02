import React, {Component} from 'react'
import {
    Text,
    View,
    StyleSheet,
    StatusBar,
    ImageBackground,
    FlatList
} from 'react-native'
import {screenHeightPercent, screenWidthPercent} from '../../../helpers/Layout'
import {Icon} from 'react-native-elements'
import Ripple from 'react-native-material-ripple'
import Carousel from 'react-native-snap-carousel'
import DatePicker from 'react-native-datepicker'
import moment from 'moment'
import {getData} from '../../../services/LocalStorage'
import {getListTindakanDokter, getSliderJmlTindakanDokter} from '../../../services/ServiceTindakan'
import ListTindakan from '../../../components/list/ListTindakan'
import LoaderListTindakan from '../../../components/loader/LoaderListTindakan'
import LoaderSliderTindakan from '../../../components/loader/LoaderSliderTindakan'


export default class Tindakan extends Component{
       
    constructor(props){
        super(props)
        this.state = {
            loaderList: false,
            loaderSlider: false,
            errorList: null,
            errorSlider: null,
            userDetail: null,
            sliderJmlTindakan: [{
                title: 'Jumlah tindakan kemarin',
                jml: 0,
            },
            {
                title: 'Jumlah tindakan hari ini',
                jml: 0
            },
            {
                title: 'Jumlah tindakan bulan ini',
                jml: 0
            }],
            tanggalTindakan: moment(new Date()).format('YYYY-MM-DD'),
            listTindakan: []
        }
    }

    componentDidMount(){
        this.mounted = true
        getData('AuthUser').then(data => {
            if (this.mounted){
                this.setState({
                    userDetail: data
                })    
            }
            this.getSliderJmlTindakan(data.user_detail.id_sdm_trx_kepegawaian)
            this.getTindakanDokter(data.user_detail.id_sdm_trx_kepegawaian)
        }).catch(err => {
            console.log(err)
        })
        
    }

    componentWillUnmount(){
        this.mounted = false
    }

    getSliderJmlTindakan = (id_pegawai) => {
        this.setState({
            loaderSlider: true,
            errorSlider: null
        })
        getSliderJmlTindakanDokter(id_pegawai).then(resp => {
            if (this.mounted){
                this.setState({
                    loaderSlider: false,
                    errorSlider: null,
                    sliderJmlTindakan: resp.response
                })
            }
        }).catch(err => {
            if (this.mounted){
                this.setState({
                    errorSlider: 'Can`t Connected To Server'
                })
            }
        }) 
    }

    getTindakanDokter = (id_pegawai,tanggal = '2019-08-12') => {
        this.setState({
            loaderList: true,
            errorList: null,
        })
        getListTindakanDokter(id_pegawai, tanggal).then(resp => {
            if (this.mounted){
                this.setState({
                    loaderList: false,
                    errorList: null,
                    listTindakan: resp.response
                })
            }
        }).catch(err => {
            if (this.mounted){
                this.setState({
                    errorList: 'Can`t Connected To Server'
                })
            }
        })      
    }
    
    
    cardSlider({item, index}){
        return (
            <View style={[Styles.cardSliderWrapper]}>
                <View style={[Styles.backgroundStyles, {
                    bottom: -20,
                    left: -10
                }]}></View>
                <View style={[Styles.backgroundStyles, {
                    top: -30,
                    right: -30
                }]}></View>

                <View style={Styles.cardSliderTitle}>
                    <Text style={Styles.cardSliderTitleTexttitle}>{item.title}</Text>
                    <Text style={Styles.cardSliderTitleTextJml}>{item.jml}</Text>
                </View>
            </View>
        );
    }

    cardSliderLoader({item, index}){
        return (
            <LoaderSliderTindakan key={index}/>
        )
    }

    renderListTindakan(){
        if (this.state.errorList === null){
            if (this.state.listTindakan.length > 0){
                return (
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={this.state.listTindakan}
                        renderItem={({ item }) => {
                            return <ListTindakan {...this.props} data={item} namaTindakan={item.nm_jns_tindakan} tglTindakan={item.tanggal_tindakan} dateCreated={item.date_created}/>
                        }}
                        keyExtractor={item => item.id_trx_tindakan_pelaksana}
                    />
                )
            } else {
                return (
                    <View>
                        <Text>Belum ada tindakan hari ini</Text>
                    </View>
                )
            }
        } else {
            return (
                <View>
                    <Text>{this.state.errorList}</Text>
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
                            flexDirection: 'row',
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
                                    color={'#444'}
                                    size={24}
                                />
                            </Ripple>
                        </View>
                    </View>
                    <View style={Styles.sliderWrapper}>
                        <View style={Styles.sliderContent}>
                            
                            <Carousel
                                ref={(c) => { this._carousel = c; }}
                                data={this.state.sliderJmlTindakan}
                                renderItem={this.state.loaderSlider ? this.cardSliderLoader : this.cardSlider}
                                firstItem={1}
                                sliderWidth={screenWidthPercent(100)}
                                itemWidth={screenWidthPercent(70)}
                            />
                        </View>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-end'
                        }}
                    >
                        <View 
                            style={[{
                                borderTopLeftRadius: 30,
                                borderBottomLeftRadius: 30,
                                alignSelf: 'flex-start',
                                position: 'relative',
                                justifyContent:"center",
                                height: 50,
                                paddingTop: 5,
                                paddingLeft: 20,
                                overflow: 'hidden',
                                backgroundColor: '#fff'
                            }, Styles.shadow]}
                        >
                            <DatePicker
                                style={{alignSelf: 'flex-start', height: '100%'}}
                                date={this.state.tanggalTindakan}
                                mode="date"
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
                                            size={18} 
                                        />
                                    </View>
                                }
                                customStyles={{
                                    dateInput:{
                                        borderWidth: 0,
                                        borderColor: '#86F49B'
                                    },
                                    placeholderText: {
                                        fontSize: 14,
                                    },
                                    datePicker: {
                                        backgroundColor: "#000"
                                    },
                                    dateText: {
                                        marginLeft: 10,
                                        fontSize: 14,
                                        color: "#222",
                                    }
                                }}
                                format="YYYY-MM-DD"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                onDateChange={(date) => {
                                    this.setState({tanggalTindakan: date})
                                    this.getTindakanDokter(date)
                                }}
                            />
                            
                        </View>
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
                        <View
                            style={{
                                paddingHorizontal: 20, 
                                paddingTop: 20,
                                paddingBottom: 20,
                            }}
                        >
                            <Text
                                style={{
                                    fontWeight: 'bold',
                                    color: '#555'
                                }}
                            >{this.state.tanggalTindakan !== moment(new Date()).format('YYYY-MM-DD') ? moment(this.state.tanggalTindakan).format('DD MMMM YYYY') : 'Hari Ini'}</Text>
                        </View>
                        <View
                            style={{
                                height: screenHeightPercent(50),
                                alignItems: 'center'
                            }}
                        >
                            
                            {this.state.loaderList && this.state.errorList === null  ? <LoaderListTindakan /> : this.renderListTindakan()}
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
