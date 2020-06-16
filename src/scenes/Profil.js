import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    Image
} from 'react-native'
import {screenHeightPercent, screenWidthPercent} from '../helpers/Layout'
import { getData, removeData } from '../services/LocalStorage'
import {getProfilUser} from '../services/ServiceAuth'
import {Icon} from 'react-native-elements'
import Ripple from 'react-native-material-ripple'
import Feather from 'react-native-vector-icons/Feather'
import AntDesign from 'react-native-vector-icons/AntDesign'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import { icon_color_primary, background_color } from '../themes/Default'
import LinearGradient from 'react-native-linear-gradient'
export default class Profil extends Component{
    constructor(props){
        super(props)
        this.state = {
            userdetail: null,
            userprofil: null
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
                    userprofil: response
                })
            }
        } catch(err){
            alert(err.message)
        }
    }

    render(){
        const {userdetail, userprofil} = this.state
        return(
            <LinearGradient 
                start={{x: 0, y: 0}} 
                end={{x: 2, y: 0}} 
                colors={['#667eea', '#63b3ed', '#434190']} 
                style={{
                    flex: 1,
                    overflow: 'hidden',
                    position: 'relative',
                }}>
                <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
                <View style={Styles.header}></View>
                <View
                    style={{
                        height: screenHeightPercent(13),
                        paddingHorizontal: 20,
                        paddingVertical: 20
                    }}
                >
                    
                </View>
                <View 
                    style={{
                        width: '100%',
                        height: screenHeightPercent(76),
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
                            flexDirection: 'row',
                            justifyContent: 'center'
                        }}
                    >
                        <View
                            style={{
                                top: -70,
                                position: 'absolute',
                                borderRadius: 50,
                                width: screenWidthPercent(25),
                                height: screenWidthPercent(25),
                                justifyContent: 'center',
                                overflow: 'hidden',
                                borderWidth: 3,
                                borderColor: icon_color_primary,
                                alignItems: 'center',
                                backgroundColor: background_color
                            }}
                        >
                            <View
                                style={{
                                    width: '93%',
                                    height: '93%',
                                    borderRadius: 50,
                                    backgroundColor: '#fff',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                            >
                                 {/* {userdetail !== null ?
                                    <Image 
                                        style={{
                                            width: '100%', 
                                            height: '100%'
                                        }}
                                        source={{uri: 'http://172.19.2.133/app/sirs/assets/img/foto_pegawai/'+userdetail.user_detail.foto_pegawai}}
                                    /> :  */}
                                    <Feather name="user" size={30} color={'#333'}/>
                                {/* } */}
                            </View>
                        </View>
                    </View>
                    <View
                        style={{
                            width: '100%',
                            height: '100%'
                        }}
                    >
                        <View
                            style={{
                                width: '100%',
                                paddingTop: '10%',
                                alignItems: 'center'
                            }}
                        >
                            <Text
                                style={{
                                    color: '#333',
                                    fontSize: 16,
                                    fontWeight: 'bold'
                                }}
                            >{userprofil !== null ? userprofil.nama_pegawai : null}</Text>   
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
                                > {userprofil !== null ? (userprofil.id_sdm_mst_status_pegawai == 5 ? 'NIP' : 'NRPK') : null} </Text>
                                <Text
                                    style={{
                                        fontSize: 10
                                    }}
                                > {userprofil !== null ? userprofil.nip_baru : null} </Text>
                            </View>
                        </View>
                        <View
                            style={{
                                width: '100%',
                                marginTop: 20,
                            }}
                        >
                            <Ripple
                                onPress={() => this.props.navigation.navigate('InfoPribadi')}
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
                                    <SimpleLineIcons name={'user-following'} size={20}/>
                                </View>
                                <View>
                                    <Text
                                        style={{
                                            fontSize: 14,
                                            fontWeight: 'bold'
                                        }}
                                    >Identitas Pribadi</Text>
                                    <Text
                                        style={{
                                            marginTop: 2,
                                            fontSize: 12
                                        }}
                                    >Lihat data diri anda</Text>
                                </View>
                            </Ripple>
                            <Ripple
                                onPress={() => this.props.navigation.navigate('Setting')}
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
                                    <AntDesign name="setting" size={20}/>
                                </View>
                                <View>
                                    <Text
                                        style={{
                                            fontSize: 14,
                                            fontWeight: 'bold'
                                        }}
                                    >Pengaturan</Text>
                                    <Text
                                        style={{
                                            marginTop: 2,
                                            fontSize: 12
                                        }}
                                    >Pengaturan password, dll</Text>
                                </View>
                            </Ripple>
                            <Ripple
                                onPress={() => this.props.navigation.navigate('About')}
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
                                    <Feather name="info" size={20}/>
                                </View>
                                <View>
                                    <Text
                                        style={{
                                            fontSize: 14,
                                            fontWeight: 'bold'
                                        }}
                                    >Tentang Aplikasi</Text>
                                </View>
                            </Ripple>
                            <Ripple
                                onPress={() => {
                                    removeData('AuthUser').then(() => {
                                        this.props.navigation.replace('Login')
                                    })
                                }}
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
                                    <AntDesign name={'logout'} size={20} />
                                </View>
                                <View>
                                    <Text
                                        style={{
                                            fontSize: 14,
                                            fontWeight: 'bold'
                                        }}
                                    >Keluar</Text>
                                    <Text
                                        style={{
                                            marginTop: 2,
                                            fontSize: 12
                                        }}
                                    >Keluar dari aplikasi dan hapus data login</Text>
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