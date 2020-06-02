import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    ImageBackground,
    StatusBar,
    SafeAreaView,
    TextInput,
    Image,
    KeyboardAvoidingView,
    ActivityIndicator
} from 'react-native'
import {screenHeightPercent, screenWidthPercent} from '../../helpers/Layout'
import Ripple from 'react-native-material-ripple';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { userRegister } from '../../services/ServiceAuth'
import {storeData} from '../../services/LocalStorage'
import {Icon} from 'react-native-elements'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Logo from '../../../assets/icon/icon.png'
import { getPushNotificationToken} from "../../services/PushNotification";
import config from '../../Config'

export default class SignUpStep3 extends Component{
    constructor(props){
        super(props)
        const params = props.route.params
        this.state = {
            kode1: '',
            kode2: '',
            kode3: '',
            kode4: '',
            timeout: 0,
            params: params,
            valid: true,
            notValidMessage: '',
            loader: false,
            password: '',
            confirmPassword: '',
            passwordValid: ''
        }
    }

    componentDidMount(){
        
    }


    onSubmitPassword = async () => {
        try {
            if (this.state.password.length === 0) throw new Error('Password tidak boleh kosong')
            if (this.state.confirmPassword.length === 0) throw new Error('Anda belum konfirmasi password')
            if (this.state.password !== this.state.confirmPassword ) throw new Error('Password tidak cocok')

            this.setState({
                loader: true
            })
            console.log(this.state.params)

            const token = await getPushNotificationToken()
            const resp = await userRegister(this.state.params.datapegawai.id_telegram,this.state.password, token)

            if (resp.reqStat.code === 200){
                resp.response.jwtToken = resp.reqStat.token
                await storeData('AuthUser', resp.response)
                this.props.navigation.replace('MainMenu')
            } else {
                throw new Error(resp.reqStat.message)
            }
        } catch(err){
            this.setState({
                loader: false,
                valid: false,
                notValidMessage: err.message
            })
        } 
    }

    renderWarning(){
        return (
            <View
                style={{
                    width: '70%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 10
                }}
            >
                <Text
                    style={{
                        paddingRight: 5,
                        fontSize: 12,
                        color: '#ddd'
                    }}
                >
                    {this.state.notValidMessage}
                </Text> 
                <Icon 
                    type={'font-awesome'}
                    name={'exclamation-circle'}
                    color={'#ddd'}
                    size={13} 
                />   
            </View>
        )
    }

    renderValidate(){
        return(
            <View
                style={{
                    position: 'absolute',
                    top: 20,
                    right: 0,
                }}
            >
                <Icon 
                    type={'font-awesome'}
                    name={'check-circle'}
                    color={'#5fe38d'}
                    size={20} 
                />   
            </View> 
        )
    }

    render(){
        return (
            <SafeAreaView style={Styles.container}>
                <KeyboardAvoidingView style={Styles.container} behavior="margin" enabled>
                    <View style={[Styles.container]} >
                        <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
                        <ImageBackground source={require('../../../assets/background/backgroundSignUp.jpg')} style={Styles.imageBackground} blurRadius={1}>
                            <View
                                style={Styles.contentWrapper}
                            >
                                <View 
                                    style={Styles.content}
                                >   
                                    <View
                                        style={{
                                            width: '100%',
                                            marginTop: screenHeightPercent(5)
                                        }}
                                    >
                                        <Text style={{color: '#fff', fontSize: 25, fontWeight: 'bold'}}>Password</Text>
                                        <Text style={{color: '#fff', fontSize: 12,lineHeight: 22,marginTop: 10}}>Masukan password untuk akun anda </Text>
                                    </View>
                                    <View
                                        style={{
                                            marginTop: 25,
                                            width: '100%',
                                            position: 'relative',
                                            flexDirection: 'row',
                                            height: 50,
                                        }}
                                    >
                                        <TextInput
                                            onChangeText={(password) => {
                                                this.setState({password})
                                            }}
                                            secureTextEntry={true}
                                            style={Styles.formTextInput}
                                            value={this.state.password}
                                            placeholder="Password"
                                            placeholderTextColor="#aaa"
                                        />
                                    </View>
                                    <View
                                        style={{
                                            marginTop: 10,
                                            width: '100%',
                                            position: 'relative',
                                            flexDirection: 'row',
                                            height: 50,
                                        }}
                                    >
                                        <TextInput
                                            onChangeText={(confirmPassword) => {
                                                this.setState({confirmPassword})
                                            }}
                                            style={Styles.formTextInput}
                                            secureTextEntry={true}
                                            value={this.state.confirmPassword}
                                            placeholder="Konfirmasi Password"
                                            placeholderTextColor="#aaa"
                                        />
                                    </View>
                                    <View>
                                        {this.state.valid === false ? this.renderWarning() : null}
                                    </View>
                                    <View
                                        style={{
                                            width: '100%',
                                            borderRadius: 20,
                                            overflow: 'hidden',
                                            position: 'relative',
                                            marginTop: 20
                                        }}
                                    >
                                        <ImageBackground
                                            style={{
                                                width: '100%',
                                                paddingVertical: 2,
                                                resizeMode: 'cover'
                                            }}
                                            source={require('../../../assets/background/background3.png')}
                                        >
                                            <Ripple
                                                onPress={() => this.onSubmitPassword()}
                                                rippleColor={'rgba(255,255,255,.5)'}
                                            >
                                                <View style={Styles.buttonLogin}>
                                                    <Text style={[Styles.buttonLoginText, {marginRight: 15}]}> Konfirmasi</Text>
                                                    <MaterialCommunityIcons name={'check'} size={20} color={'#fff'}/>
                                                    <View
                                                        style={{
                                                            position: 'absolute',
                                                            right: 10,
                                                            opacity: this.state.loader ? 1 : 0
                                                        }}
                                                    >
                                                        <ActivityIndicator size="small" color="#fff" />
                                                    </View>
                                                </View>
                                            </Ripple>
                                        </ImageBackground>
                                    </View>
                                </View>
                            </View>
                        </ImageBackground>
                    </View>
                </KeyboardAvoidingView>
            </SafeAreaView>
        )
    }
}


const Styles = new StyleSheet.create({
    container: {
        flex : 1,
    },
    containerWrapper:{
        width: '100%',
        height: '100%',
        justifyContent: 'center' 
    },
    header: {
        backgroundColor: '#333',
        height: screenHeightPercent(4)
    },
    imageBackground: {
        width: '100%',
        height: '100%'
    },
    contentWrapper: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,.3)'
    },
    content: {
        paddingHorizontal: '10%',
        width: '100%',
        alignItems: 'center'  
    },
    textWhite: {
        color: '#fff'
    },
    formInputWrapper: {
        position: 'relative',
        borderBottomWidth: 1,
        borderBottomColor: '#fff',
        height: 40,
        width: '100%',
    },
    buttonLogin: {
        width: '100%',
        paddingVertical: 12,
        flexDirection: 'row',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        alignItems: 'center'
    },
    buttonLoginText: {
        color: '#fff',
    },
    formTextInput: {
        paddingHorizontal: 20,
        borderRadius: 20,
        width: '100%',
        backgroundColor: 'rgba(0,0,0,.4)',
        height: '100%',
        color: '#fff'
    }
})