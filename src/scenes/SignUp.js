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
import {screenHeightPercent, screenWidthPercent} from '../helpers/Layout'
import Ripple from 'react-native-material-ripple';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { cekUserRegister, userRegister } from '../services/ServiceAuth'
import {storeData} from '../services/LocalStorage'
import {Icon} from 'react-native-elements'
import Logo from '../../assets/icon/icon.png'
import { getPushNotificationToken} from "../services/PushNotification";
import config from '../Config'

export default class SignUp extends Component{
    constructor(props){
        super(props)
        this.state = {
            IDTelegram: '',
            IDTelegramExist: false,
            IDTelegramValid: null,
            notValidMessage: '',
            loader: false,
            password: '',
            confirmPassword: '',
            passwordValid: ''
        }
    }

    componentDidMount(){
        
    }

    onSubmitIDtelegram = () => {
        if (this.state.IDTelegram.length > 0){
            cekUserRegister(this.state.IDTelegram).then(resp => {
                if (resp.reqStat.code == 200){
                    this.setState({
                        IDTelegramExist: false,
                        IDTelegramValid: true
                    })
                } else {
                    this.setState({
                        IDTelegramExist: true,
                        IDTelegramValid: false,
                        notValidMessage: resp.reqStat.message
                    })
                }
            }).catch(err => {
                this.setState({
                    IDTelegramExist: true,
                    IDTelegramValid: false,
                    notValidMessage: 'Something Went Wrong'
                })
            })
        } else {
            this.setState({
                IDTelegramExist: true,
                IDTelegramValid: false,
                notValidMessage: 'ID Telegram tidak boleh kosong'
            })
        }
    }

    onSubmitSignUp = () => {
        const {
            IDTelegram,
            password,
            confirmPassword
        } = this.state
        this.setState({
            passwordValid: ''
        })
        if (IDTelegram.length > 0){
            if (password.length > 0 && confirmPassword.length > 0){
                if (password !== confirmPassword){
                    this.setState({
                        passwordValid: 'Password tidak cocok',
                        loader: false
                    })
                } else {
                    // IF VALIDATE SUKSES
                    this.setState({
                        passwordValid: '',
                        loader: true
                    })
                    getPushNotificationToken().then(token => {
                        userRegister(this.state.IDTelegram,this.state.password, token).then(resp => {
                            if (resp.reqStat.code === 200){
                                resp.response.jwtToken = resp.reqStat.token
                                storeData('AuthUser', resp.response).then(data => {
                                    this.props.navigation.replace('MainMenu')
                                }).catch(err => {
                                    console.log(err)
                                })
                            } else {
                                this.setState({
                                    loader: false,
                                    IDTelegramExist: true,
                                    IDTelegramValid: false,
                                    notValidMessage: resp.reqStat.message
                                })
                            }
                        }).catch(err => {
                            // redirect to error page
                            console.log(err)
                        })
                    }).catch(err => {
                        
                        this.setState({
                            loader: false
                        })
                    })
                    
                }
            } else {
                this.setState({
                    IDTelegramValid: null,
                    passwordValid: 'Password tidak boleh kosong',
                    loader: false
                })
                
            }
        } else {
            this.setState({
                IDTelegramExist: true,
                IDTelegramValid: false,
                notValidMessage: 'ID Telegram tidak boleh kosong'
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
                    marginTop: 5
                }}
            >
                <Text
                    style={{
                        paddingRight: 5,
                        fontSize: 12,
                        color: '#ff776e'
                    }}
                >
                    {this.state.notValidMessage}
                </Text> 
                <Icon 
                    type={'font-awesome'}
                    name={'exclamation-circle'}
                    color={'#ff776e'}
                    size={13} 
                />   
            </View>
        )
    }

    renderWarningPassword(){
        return(
            <View
                style={{
                    width: '70%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 5
                }}
            >
                <Text
                    style={{
                        height: 20,
                        paddingRight: 5,
                        fontSize: 12,
                        color: '#ff776e'
                    }}
                >
                    {this.state.passwordValid}
                </Text> 
                <Icon 
                    type={'font-awesome'}
                    name={'exclamation-circle'}
                    color={'#ff776e'}
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
                        <ImageBackground source={require('../../assets/background/background.png')} style={Styles.imageBackground}>
                            <View
                                style={Styles.contentWrapper}
                            >
                                <View 
                                    style={Styles.content}
                                >
                                    <View>
                                        <Image 
                                            style={{
                                                height: 100,
                                                width: 100
                                            }}
                                            source={Logo}    
                                        />
                                    </View>
                                    
                                    <View
                                        style={{
                                            marginTop: screenHeightPercent(5)
                                        }}
                                    >
                                        <Text style={{color: '#bbb'}}>Silahkan login untuk melanjutkan</Text>
                                    </View>
                                    <View
                                        style={{
                                            marginTop: 25,
                                            width: '70%',
                                            position: 'relative',
                                            height: 50,
                                        }}
                                    >
                                        <TextInput
                                            onSubmitEditing={() => {
                                                this.onSubmitIDtelegram()
                                            }}
                                            onChangeText={(IDTelegram) => {
                                                this.setState({IDTelegram, IDTelegramValid: null})
                                            }}
                                            keyboardType={'numeric'}
                                            style={Styles.formTextInput}
                                            value={this.state.IDTelegram}
                                            placeholder="ID Telegram"
                                            placeholderTextColor="#aaa"
                                        /> 
                                        {this.state.IDTelegramValid ? this.renderValidate() : null}                            
                                    </View>
                                    {this.state.IDTelegramExist ? this.renderWarning() : null}
                                    <View
                                        style={{
                                            marginTop: 10,
                                            width: '70%',
                                            position: 'relative',
                                            height: 50,
                                        }}
                                    >
                                        <TextInput
                                            onSubmitEditing={() => console.log('ok')}
                                            onChangeText={(password) => {
                                                this.setState({password})
                                            }}
                                            ref={(input) => { this.password = input }}
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
                                            width: '70%',
                                            position: 'relative',
                                            height: 50,
                                        }}
                                    >
                                        <TextInput
                                            onSubmitEditing={() => console.log('ok')}
                                            onChangeText={(confirmPassword) => {
                                                this.setState({confirmPassword})
                                                
                                            }}
                                            secureTextEntry={true}
                                            style={Styles.formTextInput}
                                            value={this.state.confirmPassword}
                                            placeholder="Konfirmasi Password"
                                            placeholderTextColor="#aaa"
                                        />                                  
                                    </View>
                                    {this.state.passwordValid.length > 0 ? this.renderWarningPassword() : null}
                                    <View
                                        style={{
                                            width: '70%',
                                            borderRadius: 50,
                                            overflow: 'hidden',
                                            marginTop: 30
                                        }}
                                    >
                                        <Ripple
                                            onPress={() => this.onSubmitSignUp()}
                                            rippleColor={'rgba(255,255,255,.5)'}
                                        >
                                            <View style={Styles.buttonLogin}>
                                                <Text style={[Styles.buttonLoginText, {marginRight: 15}]}> Mendaftar</Text>
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
                                    </View>
                                    <View
                                        style={{
                                            alignItems: 'center',
                                            width: '100%',
                                            marginTop: 25,
                                        }}
                                    >
                                        <TouchableOpacity 
                                            onPress={() => this.props.navigation.navigate('Login')}
                                        >
                                            <View style={{}}>
                                                <Text style={{color: '#ddd'}}>Sudah punya akun ?</Text>
                                            </View>
                                        </TouchableOpacity>
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
        borderColor: '#fff',
        paddingVertical: 12,
        borderRadius: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        position: 'relative',
        borderWidth: 1,
        alignItems: 'center'
    },
    buttonLoginText: {
        color: '#fff'
    },
    formTextInput: {
        borderBottomWidth: 1,
        borderBottomColor: '#fff',
        height: '100%',
        color: '#fff'
    }
})