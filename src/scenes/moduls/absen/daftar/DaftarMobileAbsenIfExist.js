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
import { getData, storeData } from '../../../../services/LocalStorage'
import {Icon} from 'react-native-elements'
import {faceRecognitionDelete, faceRecognitionUpdateOpsi} from '../../../../services/ServiceAuth'
import {getFaceRecognitionAbsenRegister} from '../../../../services/ServiceSdm'
import Ripple from 'react-native-material-ripple'
import ListSetting from '../../../../components/list/ListSetting'
import ListSettingOpsi from '../../../../components/list/ListSettingOpsi'
import ListRequestAbsen from '../../../../components/list/ListRequestAbsen'
import moment from 'moment'

export default class DaftarMobileAbsenIfExist extends Component{
    constructor(props){
        super(props)
        this.state = {
            userdetail: null,
            detailrequest: null,
            faceDataExist: false
        }
    }

    async componentDidMount(){
        this.mounted = true
        try {
            const data = await getData('AuthUser')

            if (data === null){
                this.props.navigation.replace('login')
            }

            const {response} = await getFaceRecognitionAbsenRegister(data._id)

            if (response === null){
                this.props.navigation.replace('DaftarMobileAbsen')
            }
            if (this.mounted){
                this.setState({
                    userdetail: data,
                    detailrequest: response
                })
            }
        } catch(err){
            console.log(err)
        }
    }

    componentWillUnmount(){
        this.mounted = false
    }

    onChangeOpsiLoginFaceData = async () => {
        try {
            const status = !this.state.loginFaceData
            const {reqStat} = await faceRecognitionUpdateOpsi(this.state.userdetail._id, status);
            if (reqStat.code === 200){
                this.setState({loginFaceData: status})
            } 
        } catch(err){
            console.log(err)
        }
    }

    deleteFaceAuthData = async () => {
        try {
            const userdetail = {...this.state.userdetail}
            const id = this.state.userdetail._id
            const {reqStat} = await faceRecognitionDelete(id)
            if (reqStat.code === 200){
                userdetail.feature.facerecognition_login = false
                userdetail.facerecognition.auth = ""
                await storeData('AuthUser', userdetail);
                this.props.navigation.replace('Setting')
            }
        } catch(err){
            console.log(err)
        }
    }

    renderButton(){
        const {detailrequest} = this.state
        if (detailrequest.flag_approve === 1 || detailrequest.flag_approve === 2){
            console.log('ok')
            return <Ripple
                style={{
                    marginTop: 10,
                    width: '100%',
                }}
                onPress={() => this.props.navigation.navigate('DaftarMobileAbsen')}
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
                    <Text style={{color: '#fff',marginRight: 10}}>{detailrequest.flag_approve === 1 ? 'Perbarui' : 'Ulangi'}</Text>
                </View>
            </Ripple> 
        } else {
            console.log('awdawd')
            return null
        }
    }

    render(){
        return (
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
                        onPress={() => this.props.navigation.canGoBack() ? this.props.navigation.goBack(null) : this.props.navigation.replace('MainMenu')}
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
                    >Absen Mobile</Text>
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
                        {this.state.detailrequest !== null &&
                            <ListRequestAbsen 
                                status={this.state.detailrequest.flag_approve}
                                waktupengajuan={moment(this.state.detailrequest.date_created).format('DD MMMM YYYY HH:mm:ss')}
                                onPress={this.deleteFaceAuthData}
                                title="Permintaan mobile absensi"
                            />
                        }
                        {this.state.detailrequest !== null && this.renderButton()}
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