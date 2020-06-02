import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    StatusBar
} from 'react-native'
import {screenHeightPercent, screenWidthPercent} from '../../../helpers/Layout'
import {Icon} from 'react-native-elements'
import { getDetailTindakanDokter } from "../../../services/ServiceTindakan";
import Ripple from 'react-native-material-ripple'
import ListDetailTindakan from '../../../components/list/ListDetailTindakan'
import moment from 'moment'
import LoaderTindakanDetail from '../../../components/loader/LoaderTindakanDetail';

export default class TindakanDetail extends Component{
    constructor(props){
        super(props)
        const params = this.props.route.params
        this.state = {
            loaderDetail: false,
            error : null,
            data: params,
            detail: null
        }
    }

    componentDidMount(){
        this.getTindakanDetail()
    }

    getTindakanDetail = () => {
        this.setState({
            loaderDetail: true,
            error: null
        })
        getDetailTindakanDokter(this.state.data.id_trx_tindakan).then(resp => {
            this.setState({
                detail: resp.response,
                loaderDetail: false,
                error: null
            })
        }).catch(err => {
            this.setState({
                loaderDetail: false,
                error: err
            })
        })
    }

    renderContentDetail(){
        const {detail} = this.state
        return (
            <View
                style={{
                    width: '100%'
                }}
            >
                <View
                    style={{
                        width: '100%',
                    }}
                >
                    <Text
                        style={{
                            fontSize: 16,
                            color: '#444',
                            fontWeight: 'bold'
                        }}
                >{detail !== null ? detail.nama_pasien : '-'}</Text>
                </View>
                <View
                    style={{
                        width: '100%',
                        height: '100%',
                        paddingVertical: 10
                    }}
                >
                    <ListDetailTindakan label="No Rekam Medik" value={detail !== null ? detail.norm : '-'} iconName="" iconType=""/>
                    <ListDetailTindakan label="Nomor Pendaftaran" value={detail !== null ? detail.no_pendaftaran : '-'} iconName="" iconType=""/>
                    <ListDetailTindakan label="Tanggal / Jam Pendaftaran" value={detail !== null ? moment(detail.tanggal_pendaftaran).format('DD MMMM YYYY / HH:mm:ss') : '-'} iconName="" iconType=""/>
                </View>
            </View>
        )
    }

    render(){
        const {detail} = this.state
        return(
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
                            paddingHorizontal: 20,
                            paddingVertical: 20
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 20
                            }}
                        >{this.state.data.nm_jns_tindakan}</Text>
                        <Text
                            style={{
                                marginTop: 5,
                                fontSize: 12
                            }}
                        >Tanggal tindakan : {moment(this.state.data.tanggal_tindakan).format('DD MMMM YYYY / HH:mm:ss')} </Text>
                    </View>
                    <View 
                        style={{
                            width: '100%',
                            height: '100%',
                            marginTop: 20,
                            paddingVertical: 40,
                            paddingHorizontal: 20,
                            borderTopLeftRadius: 30,
                            overflow: 'hidden',
                            borderTopRightRadius: 30,
                            backgroundColor: '#fff'
                        }}
                    >
                        
                        {this.state.loaderDetail ? <LoaderTindakanDetail /> : this.renderContentDetail()}
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
})