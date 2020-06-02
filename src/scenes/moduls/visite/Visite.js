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
import DatePickerIos from 'react-native-datepicker'
import moment from 'moment'
import {getData} from '../../../services/LocalStorage'
import LoaderListTindakan from '../../../components/loader/LoaderListTindakan'
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';


export default class Visite extends Component{
       
    constructor(props){
        super(props)
        this.state = {
            loaderList: false,
            loaderSlider: false,
            errorList: null,
            errorSlider: null,
            userDetail: null,
            tanggalDipilih: moment(new Date()).format('YYYY-MM-DD'),
            listTindakan: []
        }
    }

    componentDidMount(){
        this.mounted = true
        
        
    }

    componentWillUnmount(){
        this.mounted = false
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
                    <View
                        style={{
                            marginTop: 20,
                            flexDirection: 'row',
                            paddingHorizontal: 20
                        }}
                    >
                        <Icon 
                            type={'font-awesome'}
                            name={'stethoscope'}
                            color={'#444'}
                            size={24}
                        />
                        <Text
                            style={{
                                fontSize: 20,
                                marginLeft: 10,
                                color: '#444'
                            }}
                        >Visite</Text>
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
                                paddingVertical: 20,
                                paddingHorizontal: 20, 
                                paddingBottom: 20,
                            }}
                        >
                            <Text
                                style={{
                                    fontWeight: 'bold',
                                    color: '#555'
                                }}
                            >{this.state.tanggalDipilih !== moment(new Date()).format('YYYY-MM-DD') ? moment(this.state.tanggalDipilih).format('DD MMMM YYYY') : 'Hari Ini'}</Text>
                        </View>
                        <View
                            style={{
                                paddingHorizontal: 20,
                                height: screenHeightPercent(50),
                                alignItems: 'center'
                            }}
                        >
                            
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
