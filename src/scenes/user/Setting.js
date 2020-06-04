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
import {screenHeightPercent, screenWidthPercent} from '../../helpers/Layout'
import { getData, clearData } from '../../services/LocalStorage'
import {Icon} from 'react-native-elements'
import { search } from '../../helpers/General'
import {getListUser} from '../../services/ServiceAuth'
import Ripple from 'react-native-material-ripple'
export default class Setting extends Component{
    constructor(props){
        super(props)
        this.state = {
            userdetail: null,
            listAllUser: [],
            renderListAllUser: [],
            loader: false
        }
    }

    componentDidMount(){
        getData('AuthUser').then(data => {
            if (data === null){
                this.props.navigation.replace('login')
            }
            this.getListAllUser()
            this.setState({
                userdetail: data
            })
        })        
    }

    getListAllUser = () => {
        this.setState({
            loader: true
        })
        getListUser().then(resp => {
            const listuser = resp.response.map(item => {
                item.value = item.user_detail.nama_lengkap
                return item
            })
            this.setState({
                loader: false
            })
            
            this.setState({
                listAllUser: listuser,
                renderListAllUser: listuser
            })
        }).catch(err => {
            this.setState({
                loader: false
            })
            setTimeout(() => {
                this.getListAllUser()
            }, 10000);
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
                    >Pengaturan </Text>
                </View>
                <View 
                    style={{
                        width: '100%',
                        height: '100%',
                        marginTop: 20,
                        paddingVertical: 10,
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
                            paddingHorizontal: 10,
                        }}
                    >
                        <Ripple
                            onPress={() => this.props.navigation.navigate('GantiPassword')}
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
                                    name={'lock'}
                                    size={18}
                                />
                            </View>
                            <View>
                                <Text
                                    style={{
                                        fontSize: 14,
                                        fontWeight: 'bold'
                                    }}
                                >Ganti Password</Text>
                                <Text
                                    style={{
                                        marginTop: 2,
                                        fontSize: 12
                                    }}
                                >Ganti password anda dengan password yang baru</Text>
                            </View>
                        </Ripple>
                        {/* <Ripple
                            onPress={async () => {
                                try {
                                    const auth = await getData('AuthUser')
                                    if (auth.facerecognition){
                                        if (auth.facerecognition.auth !== ''){
                                            this.props.navigation.navigate('ValidasiModul', {navigateTo: 'FacialRecognitionIfExist'})
                                        } else {
                                            this.props.navigation.navigate('ValidasiModul', {navigateTo: 'FacialRecognitionIfNotExist'})
                                        }
                                    } else {
                                        this.props.navigation.navigate('ValidasiModul', {navigateTo: 'FacialRecognitionIfNotExist'})
                                    }
                                } catch(err){
                                    console.log(err)
                                }
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
                                <Icon 
                                    type={'ionicons'}
                                    name={'lock'}
                                    size={18}
                                />
                            </View>
                            <View>
                                <Text
                                    style={{
                                        fontSize: 14,
                                        fontWeight: 'bold'
                                    }}
                                >Face Recognition</Text>
                                <Text
                                    style={{
                                        marginTop: 2,
                                        fontSize: 12
                                    }}
                                >Aktifkan Login Dengan Pengenalan Wajah</Text>
                            </View>
                        </Ripple> */}
                        <Ripple
                            onPress={() => this.props.navigation.navigate('ValidasiModul', {navigateTo: 'DaftarMobileAbsenIfExist'})}
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
                                    name={'lock'}
                                    size={18}
                                />
                            </View>
                            <View>
                                <Text
                                    style={{
                                        fontSize: 14,
                                        fontWeight: 'bold'
                                    }}
                                >Pengaturan Mobile Absensi</Text>
                                <Text
                                    style={{
                                        marginTop: 2,
                                        fontSize: 12
                                    }}
                                >Atur scan wajah untuk mobile absensi</Text>
                            </View>
                        </Ripple>
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