import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    StatusBar
} from 'react-native'
import {screenHeightPercent, screenWidthPercent} from '../../../helpers/Layout'
import { getData, clearData } from '../../../services/LocalStorage'
import {Icon} from 'react-native-elements'
import Ripple from 'react-native-material-ripple'
import moment from 'moment'
import { getProfilUser } from '../../../services/ServiceAuth'
import LinearGradient from 'react-native-linear-gradient'
import { background_color_gradient } from '../../../themes/Default'

export default class InfoPribadi extends Component{
    constructor(props){
        super(props)
        this.state = {
            userdetail: null,
            userinfo: null
        }
    }

    componentDidMount(){
        this.mounted = true
        getData('AuthUser').then(data => {
            this.setState({
                userdetail: data
            })
            this.getUserDetail(data.user_detail.id_sdm_trx_kepegawaian)
        })        
    }

    componentWillUnmount(){
        this.mounted = false
    }

    getUserDetail = async (id_sdm_trx_kepegawaian) => {
        try {
            const {response} = await getProfilUser(id_sdm_trx_kepegawaian)
            if (this.mounted){
                this.setState({
                    userinfo: response
                })
            }
        } catch(err){
            alert(err.message)
        }
    }


    render(){
        const {userdetail, userinfo} = this.state
        return(
            <LinearGradient
                start={{x: 0, y: 0}} 
                end={{x: 2, y: 0}} 
                colors={background_color_gradient} 
                style={{
                    flex: 1,
                    position: 'relative',
                }}>
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
                                size={22}
                            />
                        </Ripple>
                        
                    </View>
                    <Text
                        style={{
                            fontSize: 17,
                            marginLeft: 10,
                            color: '#fff'
                        }}
                    >Info Pribadi</Text>
                </View>
                <View 
                    style={{
                        width: '100%',
                        marginTop: 20,
                        paddingTop: 20,
                        position: 'relative',
                        borderTopLeftRadius: 30,
                        borderTopRightRadius: 30,
                        backgroundColor: '#fff'
                    }}
                >
                    <View
                        style={{
                            width: '100%',
                            height: '100%'
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
                            >{userdetail !== null ? userdetail.user_detail.nama_pegawai : null}</Text>    
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
                                > {userdetail !== null ? (userdetail.user_detail.id_sdm_mst_status_pegawai == '5' ? 'NIP' : 'NRPK') : null} </Text>
                                <Text
                                    style={{
                                        fontSize: 10
                                    }}
                                > {userdetail !== null ? userdetail.user_detail.nip_baru : null} </Text>
                            </View>
                        </View>
                        <View
                            style={{
                                width: '100%',
                                marginTop: 20,
                            }}
                        >
                            <Ripple
                                rippleColor={'rgba(0,0,0,.4)'}
                                style={{
                                    borderBottomWidth: 1,
                                    borderBottomColor: '#eee',
                                    paddingHorizontal: 20,
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
                                        width: '10%'
                                    }}
                                >
                                    {
                                        userinfo !== null &&
                                        (userinfo.jenis_kelamin === '2' ? 
                                        <Icon 
                                            type={'font-awesome'}
                                            name={'male'}
                                            size={18}
                                        /> : 
                                        <Icon 
                                            type={'font-awesome'}
                                            name={'female'}
                                            size={18}
                                        />)
                                    }
                                </View>
                                <View>
                                    <Text
                                        style={{
                                            color: '#333',
                                            fontSize: 14,
                                            fontWeight: 'bold'
                                        }}
                                    >Jenis Kelamin</Text>
                                    <Text
                                        style={{
                                            marginTop: 2,
                                            fontSize: 12
                                        }}
                                        >{userinfo !== null ? (userinfo.jenis_kelamin == '2' ? 'Laki - laki' : 'Perempuan') : ''}</Text>
                                </View>
                            </Ripple>
                            <Ripple
                                rippleColor={'rgba(0,0,0,.4)'}
                                style={{
                                    borderBottomWidth: 1,
                                    borderBottomColor: '#eee',
                                    paddingHorizontal: 20,
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
                                        width: '10%'
                                    }}
                                >
                                    <Icon 
                                        type={'ionicons'}
                                        name={'call'}
                                        size={18}
                                    /> 
                                </View>
                                <View>
                                    <Text
                                        style={{
                                            color: '#333',
                                            fontSize: 14,
                                            fontWeight: 'bold'
                                        }}
                                    >No Telp</Text>
                                    <Text
                                        style={{
                                            marginTop: 2,
                                            fontSize: 12
                                        }}
                                    >{userinfo !== null ? userinfo.no_telp : null}</Text>
                                </View>
                            </Ripple>
                            <Ripple
                                rippleColor={'rgba(0,0,0,.4)'}
                                style={{
                                    borderBottomWidth: 1,
                                    borderBottomColor: '#eee',
                                    paddingHorizontal: 20,
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
                                        width: '10%'
                                    }}
                                >
                                    <Icon 
                                        type={'font-awesome'}
                                        name={'home'}
                                        size={18}
                                    /> 
                                </View>
                                <View>
                                    <Text
                                        style={{
                                            color: '#333',
                                            fontSize: 14,
                                            fontWeight: 'bold'
                                        }}
                                    >Tempat Lahir</Text>
                                    <Text
                                        style={{
                                            marginTop: 2,
                                            fontSize: 12
                                        }}
                                    >{userinfo !== null ? userinfo.tempat_lahir : null}</Text>
                                </View>
                            </Ripple>
                            <Ripple
                                rippleColor={'rgba(0,0,0,.4)'}
                                style={{
                                    borderBottomWidth: 1,
                                    borderBottomColor: '#eee',
                                    paddingHorizontal: 20,
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
                                        width: '10%'
                                    }}
                                >
                                    <Icon 
                                        type={'font-awesome'}
                                        name={'calendar'}
                                        size={18}
                                    /> 
                                </View>
                                <View>
                                    <Text
                                        style={{
                                            color: '#333',
                                            fontSize: 14,
                                            fontWeight: 'bold'
                                        }}
                                    >Tanggal Lahir</Text>
                                    <Text
                                        style={{
                                            marginTop: 2,
                                            fontSize: 12
                                        }}
                                    >{userinfo !== null && userinfo !== '0000-00-00' ? moment(userinfo.tanggal_lahir).format('DD MMMM YYYY') : null}</Text>
                                </View>
                            </Ripple>
                        </View>
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
})