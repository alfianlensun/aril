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
import { cekUserRegister, userRegister, cekLupaPassword } from '../../services/ServiceAuth'
import {storeData} from '../../services/LocalStorage'
import {Icon} from 'react-native-elements'
import Logo from '../../../assets/icon/icon.png'
import { getPushNotificationToken} from "../../services/PushNotification";
import config from '../../Config'

export default class LupaPassword extends Component{
    constructor(props){
        super(props)
        this.state = {
            NoHandphone: '',
            NoHandphoneExist: false,
            NoHandphoneValid: null,
            notValidMessage: '',
            loader: false,
            password: '',
            confirmPassword: '',
            passwordValid: ''
        }
    }

    componentDidMount(){
        
    }

    onSubmitNoHandphone = async () => {
        try {
            if (this.state.NoHandphone.length > 0){
                this.setState({
                    notValidMessage: '',
                    NoHandphoneExist: false,
                    loader: true
                })
    
                const {reqStat, response} = await cekLupaPassword(this.state.NoHandphone)

                if (reqStat.code == 200){
                    this.setState({
                        NoHandphoneExist: false,
                        NoHandphoneValid: true,
                        loader: false
                    })
                    this.props.navigation.navigate('ValidateKodeLupaPassword', {
                        datapegawai: response
                    })
                } else {
                    this.setState({
                        NoHandphoneExist: true,
                        NoHandphoneValid: false,
                        loader: false,
                        notValidMessage: reqStat.message
                    })
                }
            } else {
                this.setState({
                    NoHandphoneExist: true,
                    NoHandphoneValid: false,
                    notValidMessage: 'No Handphone tidak boleh kosong'
                })
            }
        } catch(err){
            console.log(err)
            this.setState({
                loader: false,
                NoHandphoneExist: true,
                NoHandphoneValid: false,
                notValidMessage: err.message
            })
        }
    }

    renderWarning(){
        return (
            <View
                style={{
                    width: '90%',
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
                                        <Text style={{color: '#fff', fontSize: 25, fontWeight: 'bold'}}>Lupa Password ?</Text>
                                        <Text style={{color: '#fff', fontSize: 12,lineHeight: 22,marginTop: 5}}>Masukan no telp anda yang terdaftar di KandouOne</Text>
                                    </View>
                                    <View
                                        style={{
                                            marginTop: 25,
                                            width: '100%',
                                            position: 'relative',
                                            height: 50,
                                        }}
                                    >
                                        <TextInput
                                            onSubmitEditing={() => {
                                                this.onSubmitNoHandphone()
                                            }}
                                            onChangeText={(NoHandphone) => {
                                                this.setState({NoHandphone, NoHandphoneExist: false,NoHandphoneValid: null})
                                            }}
                                            keyboardType={'numeric'}
                                            style={Styles.formTextInput}
                                            value={this.state.NoHandphone}
                                            placeholder="No Handphone"
                                            placeholderTextColor="#aaa"
                                        />                         
                                    </View>
                                    <View>
                                        {this.state.NoHandphoneExist ? this.renderWarning() : null}
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
                                                onPress={() => this.onSubmitNoHandphone()}
                                                rippleColor={'rgba(255,255,255,.5)'}
                                            >
                                                <View style={Styles.buttonLogin}>
                                                    <Text style={[Styles.buttonLoginText, {marginRight: 15}]}> Lanjutkan</Text>
                                                    {!this.state.loader && 
                                                        <Icon type={'ionicons'} name={'arrow-forward'} size={20} color={'#fff'}/>
                                                    }
                                                    <View
                                                        style={{
                                                            position: 'absolute',
                                                            right: 20,
                                                            opacity: this.state.loader ? 1 : 0
                                                        }}
                                                    >
                                                        <ActivityIndicator size="small" color="#fff" />
                                                    </View>
                                                </View>
                                            </Ripple>
                                        </ImageBackground>
                                    </View>
                                    <View
                                        style={{
                                            alignItems: 'center',
                                            width: '100%',
                                            marginTop: 20,
                                        }}
                                    >
                                        <TouchableOpacity 
                                            onPress={() => this.props.navigation.navigate('Login')}
                                        >
                                            <View style={{}}>
                                                <Text style={{color: '#ddd'}}>Kembali ke login</Text>
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
        paddingVertical: 12,
        flexDirection: 'row',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        alignItems: 'center'
    },
    buttonLoginText: {
        color: '#fff'
    },
    formTextInput: {
        paddingHorizontal: 20,
        borderRadius: 20,
        backgroundColor: 'rgba(0,0,0,.4)',
        height: '100%',
        color: '#fff'
    }
})