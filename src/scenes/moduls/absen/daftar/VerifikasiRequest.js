import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    Image,
    FlatList,
    RefreshControl,
    TextInput
} from 'react-native'
import {screenHeightPercent, screenWidthPercent} from '../../../../helpers/Layout'
import { getData, clearData } from '../../../../services/LocalStorage'
import {Icon} from 'react-native-elements'
import { search } from '../../../../helpers/General'
import {getFaceRecognitionAbsenRegisterById, validasiRequestAbsensi} from '../../../../services/ServiceSdm'
import Ripple from 'react-native-material-ripple'
import CardImage from '../../../../components/cards/CardImage'
import Config from '../../../../Config'
import moment from 'moment'
export default class VerifikasiRequest extends Component{
    constructor(props){
        super(props)
        const params = props.route.params
        this.state = {
            userdetail: null,
            loader: false,
            dataRequest: null,
            params
        }
    }

    async componentDidMount(){
        try {
            const data = await getData('AuthUser')
            if (data === null){
                this.props.navigation.replace('login')
            }
            this.setState({
                userdetail: data
            })
            const {response} = await getFaceRecognitionAbsenRegisterById(this.state.params.id)
            this.setState({
                dataRequest: response
            })
        } catch (err){
            console.log(err)
        }
    }

    validateRequest = async (validType) => {
        try {
            const {reqStat} = await validasiRequestAbsensi(this.state.dataRequest._id,this.state.params.user_id, validType)
            if (reqStat.code === 200){
                this.props.navigation.replace('ListRequest')
            }
        } catch(err){
            console.log(err)
        }
    }

    renderImage(){
        return this.state.dataRequest.image.map((item, id) => {
            return (
                <CardImage
                    key={id}
                    width={'30%'}
                    height={100}
                    uri={`${Config.ws.resources.req_absen}/${this.state.params.user_id}/${item}`}
                />  
            )
        })
    }

    render(){
        const {userdetail} = this.state
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
                        height: screenHeightPercent(10),
                        paddingHorizontal: 10,
                        paddingVertical : 10,
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
                            marginLeft: 10,
                            fontSize: 16
                        }}
                    >Detail Permintaan </Text>
                </View>
                <View 
                    style={{
                        width: '100%',
                        height: '100%',
                        marginTop: 20,
                        paddingVertical: 10,
                        paddingHorizontal: 20,
                        position: 'relative',
                        borderTopLeftRadius: 30,
                        borderTopRightRadius: 30,
                        backgroundColor: '#fff'
                    }}
                >
                    <View
                        style={{
                            width: '100%',
                            height: '100%',
                            paddingVertical: 20,
                            paddingHorizontal: 10,
                            
                        }}
                    >
                        {this.state.dataRequest !== null &&
                            <View
                                style={{
                                    width: '100%',
                                    flexDirection: 'row'
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 13,
                                        width: '40%',
                                    }}
                                >Nama Pengguna</Text>
                                <Text
                                    style={{
                                        fontSize: 13,
                                        width: '60%',
                                    }}
                                >: {this.state.dataRequest.userdetail.nama_pegawai}</Text>
                            </View>
                        }
                        {this.state.dataRequest !== null && 
                            <View
                                style={{
                                    marginTop: 10,
                                    width: '100%',
                                    flexDirection: 'row'
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 13,
                                        width: '40%',
                                    }}
                                >Tanggal permintaan</Text>
                                <Text
                                    style={{
                                        fontSize: 13,
                                        width: '60%',
                                    }}
                                >: {moment(this.state.dataRequest.date_created).format('DD MMMM YYYY HH:mm:ss')}</Text>
                            </View>
                        }
                        <View
                            style={{
                                marginTop: 30,
                                width: "100%",
                                flexDirection: 'row'
                            }}
                        >
                            {this.state.dataRequest !== null && this.renderImage()} 
                        </View>
                        {this.state.dataRequest !== null &&
                            <View
                                style={{
                                    paddingTop: 20,
                                    width: '100%',
                                    height: '100%'
                                }}
                            >
                                <Ripple
                                    style={{
                                        marginTop: 10,
                                        width: '100%',
                                    }}
                                    onPress={() => this.validateRequest(1)}
                                    rippleColor={'rgba(255,255,255,.5)'}
                                >
                                    <View style={{
                                        backgroundColor: '#6ab1f7',
                                        width: '100%',
                                        paddingVertical: 15,
                                        borderRadius: 50,
                                        position: 'relative',
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                        alignItems: 'center'

                                    }}>
                                        <Text style={{color: '#fff',marginRight: 10}}>Valid</Text>
                                    </View>
                                </Ripple> 
                                <Ripple
                                    style={{
                                        marginTop: 10,
                                        width: '100%',
                                    }}
                                    onPress={() => this.validateRequest(2)}
                                    rippleColor={'rgba(255,255,255,.5)'}
                                >
                                    <View style={{
                                        backgroundColor: '#9ec7f0',
                                        width: '100%',
                                        paddingVertical: 15,
                                        borderRadius: 50,
                                        position: 'relative',
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                        alignItems: 'center'

                                    }}>
                                        <Text style={{color: '#fff',marginRight: 10}}>Tidak Valid</Text>
                                    </View>
                                </Ripple> 
                            </View>
                        }
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
    formTextInput: {
        height: '100%',
        color: '#444'
    }
})