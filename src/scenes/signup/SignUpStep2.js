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
import { validateRegister, cekUserRegister } from '../../services/ServiceAuth'
import {storeData} from '../../services/LocalStorage'
import {Icon} from 'react-native-elements'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Logo from '../../../assets/icon/icon.png'
import { getPushNotificationToken} from "../../services/PushNotification";
import config from '../../Config'

export default class SignUpStep2 extends Component{
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


    onSubmitKode = async () => {
        try {
            this.setState({
                loader: true
            })
            const {
                kode1,
                kode2,
                kode3,
                kode4,
                params
            } = this.state
            let kode = `${kode1}${kode2}${kode3}${kode4}`
    
            if (kode.length >= 3){
                const validate = await validateRegister(kode, params.datapegawai.id_telegram)
                if (validate.reqStat.code === 200){
                    this.setState({
                        valid: true,
                    })
                    this.props.navigation.replace('SignUpStep3', {
                        datapegawai: this.state.params.datapegawai
                    })
                } else {
                    this.setState({
                        valid: false,
                        notValidMessage: 'Kode verifikasi tidak cocok'
                    })
                }
            } else {
                this.setState({
                    valid: false,
                    notValidMessage: 'Kode verifikasi mengandung 4 digit angka'
                })
            }
        } catch(err){
            console.log(err)
        } 
    }

    sendValidate = async () => {
        try {
            this.setTimer()
            const userregister = await cekUserRegister(this.state.params.datapegawai.no_telp)
        } catch (error) {
            console.log(error)
        }
    }

    setTimer(){
        let timeout = 30
        setInterval(() => {
            if (timeout > 0){
                timeout = timeout-1
                this.setState({
                    timeout: timeout
                })
            }
        }, 1000)
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
                                <Ripple
                                    onPress={() => this.props.navigation.replace('Login')}
                                    rippleColor={'rgba(255,255,255,.4)'}
                                    style={{
                                        position: 'absolute',
                                        left: 10,
                                        overflow: 'hidden',
                                        top: screenWidthPercent(10),
                                        borderRadius: 50,
                                        height: 50,
                                        width: 50,
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}
                                >
                                    <Icon type={'ionicons'} name={'arrow-back'} size={25} color={'#fff'}/>
                                </Ripple>
                                <View 
                                    style={Styles.content}
                                >   
                                    <View
                                        style={{
                                            marginTop: screenHeightPercent(5)
                                        }}
                                    >
                                        <Text style={{color: '#fff', fontSize: 25, fontWeight: 'bold'}}>Verify</Text>
                                        <Text style={{color: '#fff', fontSize: 12,lineHeight: 22,marginTop: 10}}>Masukan kode yang telah di kirimkan ke Telegram anda melalui NABILA</Text>
                                    </View>
                                    <View
                                        style={{
                                            marginTop: 25,
                                            width: '100%',
                                            justifyContent: 'space-between',
                                            position: 'relative',
                                            flexDirection: 'row',
                                            height: 50,
                                        }}
                                    >
                                        <TextInput
                                            ref={(ref) => { this.kode1 = ref; }} 
                                            onChangeText={(kode1) => {
                                                this.setState({kode1, NoHandphoneValid: null})
                                                if (kode1.length >= 1){
                                                    this.kode2.focus()
                                                }
                                            }}
                                            maxLength={1}
                                            keyboardType={'numeric'}
                                            style={Styles.formTextInput}
                                            value={this.state.NoHandphone}
                                            placeholder="-"
                                            placeholderTextColor="#aaa"
                                        /> 
                                        <TextInput
                                            ref={(ref) => { this.kode2 = ref; }} 
                                            onChangeText={(kode2) => {
                                                this.setState({kode2, NoHandphoneValid: null})
                                                if (kode2.length >= 1){
                                                    this.kode3.focus()
                                                }
                                            }}
                                            onKeyPress={({nativeEvent}) => {
                                                if (nativeEvent.key === 'Backspace'){
                                                    this.kode1.focus()
                                                }
                                            }}
                                            maxLength={1}
                                            keyboardType={'numeric'}
                                            style={Styles.formTextInput}
                                            value={this.state.NoHandphone}
                                            placeholder="-"
                                            placeholderTextColor="#aaa"
                                        /> 
                                        <TextInput
                                            ref={(ref) => { this.kode3 = ref; }} 
                                            onChangeText={(kode3) => {
                                                this.setState({kode3})
                                                if (kode3.length >= 1){
                                                    this.kode4.focus()
                                                } 
                                            }}
                                            onKeyPress={({nativeEvent}) => {
                                                if (nativeEvent.key === 'Backspace'){
                                                    this.setState({kode2: ''})
                                                    this.kode2.focus()
                                                }
                                            }}
                                            maxLength={1}
                                            keyboardType={'numeric'}
                                            style={Styles.formTextInput}
                                            value={this.state.NoHandphone}
                                            placeholder="-"
                                            placeholderTextColor="#aaa"
                                        /> 
                                        <TextInput
                                            ref={(ref) => { this.kode4 = ref; }} 
                                            onChangeText={(kode4) => {
                                                this.setState({kode4})
                                            }}
                                            onKeyPress={({nativeEvent}) => {
                                                if (nativeEvent.key === 'Backspace'){
                                                    this.kode3.focus()
                                                }
                                            }}
                                            maxLength={1}
                                            keyboardType={'numeric'}
                                            style={Styles.formTextInput}
                                            value={this.state.kode4}
                                            placeholder="-"
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
                                                onPress={() => this.onSubmitKode()}
                                                rippleColor={'rgba(255,255,255,.5)'}
                                            >
                                                <View style={Styles.buttonLogin}>
                                                    <Text style={[Styles.buttonLoginText, {marginRight: 15}]}> Verify</Text>
                                                    <MaterialCommunityIcons name={'key-variant'} size={20} color={'#fff'}/>
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
                                    <View
                                        style={{
                                            alignItems: 'center',
                                            width: '100%',
                                            marginTop: 15,
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <Text
                                            style={{
                                                color: '#fff',
                                                fontSize: 12
                                            }}
                                        >Belum menerima kode konfirmasi</Text>
                                        {this.state.timeout > 0 ? 
                                            <Text
                                                style={{
                                                    color: '#fff',
                                                    fontSize: 12,
                                                    marginTop:10
                                                }}
                                            >Mengirim ulang...{this.state.timeout}</Text> : 
                                            <TouchableOpacity
                                                onPress={() => this.sendValidate()}
                                            >
                                                <Text
                                                    style={{
                                                        color: '#fff',
                                                        fontSize: 12,
                                                        marginTop:10
                                                    }}
                                                >Kirim ulang ?</Text>
                                            </TouchableOpacity>
                                        }
                                        
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
        textAlign: 'center',
        backgroundColor: 'rgba(0,0,0,.4)',
        height: '100%',
        color: '#fff'
    }
})