import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    TextInput,
    KeyboardAvoidingView
} from 'react-native'
import {screenHeightPercent, screenWidthPercent} from '../../../helpers/Layout'
import {Icon} from 'react-native-elements'
import Ripple from 'react-native-material-ripple'
import {changePassword} from '../../../services/ServiceAuth'
import {getData} from '../../../services/LocalStorage'
import { background_color_gradient, icon_color_primary } from '../../../themes/Default'
import LinearGradient from 'react-native-linear-gradient'

export default class GantiPassword extends Component{
    constructor(props){
        super(props)
        this.state = {
            passwordSebelum: '',
            passwordBaru: '',
            confirmPassword: '',
            datadetail: null,
            errPassword: '',
            errPasswordIdx: null
        }
    }

    componentDidMount(){
        getData('AuthUser').then(data => {
            this.setState({datadetail: data})
        })
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
                        height: 20,
                        paddingRight: 5,
                        fontSize: 12,
                        color: '#ff776e'
                    }}
                >
                    {this.state.errPassword}
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

    submitGantiPassword = () => {
        const {passwordSebelum, passwordBaru, confirmPassword} = this.state
        this.setState({
            errPassword: '',
            errPasswordIdx: null
        })
        if (passwordBaru.length > 0 && passwordSebelum.length > 0 && confirmPassword.length > 0){
            if (confirmPassword !== passwordBaru){
                this.setState({
                    errPasswordIdx: 2,
                    errPassword: 'Password tidak cocok'
                })      
            } else {
                changePassword(this.state.datadetail.id_telegram,this.state.passwordBaru,this.state.passwordSebelum).then(resp => {
                    if (resp.reqStat.code === 200){
                        this.props.navigation.replace('MainMenu')
                    } else {
                        this.setState({
                            errPasswordIdx: 0,
                            errPassword: resp.reqStat.message
                        })
                    }
                }).catch(err => {
                    console.log(err)
                })
            }
        } else {
            
            if (passwordSebelum.length === 0){
                this.setState({
                    errPasswordIdx: 0,
                    errPassword: 'Password sebelum tidak boleh kosong'
                })   
            }
            else 
            if (passwordBaru.length === 0){
                this.setState({
                    errPasswordIdx: 1,
                    errPassword: 'Password baru tidak boleh kosong'
                })   
            }
            else 
            if (confirmPassword.length === 0){
                this.setState({
                    errPasswordIdx: 2,
                    errPassword: 'Konfirmasi password anda'
                })   
            }
        }
            
       
    }

    render(){
        return(
            <LinearGradient
                start={{x: 0, y: 0}} 
                end={{x: 2, y: 0}} 
                colors={background_color_gradient} 
                style={{
                    flex: 1,
                }}>
                <View 
                    style={{
                        flex: 1
                    }}
                >
                    <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
                    <KeyboardAvoidingView style={Styles.container} behavior="margin" enabled>
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
                                        size={24}
                                    />
                                </Ripple>
                            </View>
                            <Text
                                style={{
                                    fontSize: 16,
                                    marginLeft: 10,
                                    color: '#fff'
                                }}
                            >Ganti Password</Text>
                        </View>
                        <View
                            style={{
                                borderTopLeftRadius: 30,
                                borderTopRightRadius: 30,
                                backgroundColor: '#fff',
                                paddingVertical: 30,
                                paddingHorizontal: 20,
                                height: '100%',
                                width: '100%',
                                marginTop: 20
                            }}
                        >
                            <View 
                                style={{
                                    width: '100%',
                                }}
                            >
                                <Text>Masukan Password Sebelum</Text>
                                <TextInput
                                    style={{
                                        color: '#000',
                                        height: 60,
                                        fontSize: 14,
                                        borderBottomColor: '#eee',
                                        borderBottomWidth: 1
                                    }}
                                    secureTextEntry={true}
                                    onSubmitEditing={() => {}}
                                    onChangeText={(passwordSebelum) => {
                                        this.setState({passwordSebelum})
                                    }}
                                    value={this.state.passwordSebelum}
                                    placeholder="Password Sebelum"
                                /> 
                            </View>
                            {this.state.errPassword.length > 0 && this.state.errPasswordIdx === 0 ? this.renderWarning() : null}
                            <View 
                                style={{
                                    marginTop: 20,
                                    width: '100%',
                                }}
                            >
                                <Text>Masukan Password Baru</Text>
                                <TextInput
                                    style={{
                                        color: '#000',
                                        height: 60,
                                        fontSize: 14,
                                        borderBottomColor: '#eee',
                                        borderBottomWidth: 1
                                    }}
                                    secureTextEntry={true}
                                    onSubmitEditing={() => {}}
                                    onChangeText={(passwordBaru) => {
                                        this.setState({passwordBaru})
                                    }}
                                    value={this.state.passwordBaru}
                                    placeholder="Password baru"
                                /> 
                            </View>
                            {this.state.errPassword.length > 0 && this.state.errPasswordIdx === 1 ? this.renderWarning() : null}
                            <View 
                                style={{
                                    marginTop: 20,
                                    width: '100%',
                                }}
                            >
                                <Text>Konfirmasi Password Baru</Text>
                                <TextInput
                                    style={{
                                        color: '#000',
                                        height: 60,
                                        fontSize: 14,
                                        borderBottomColor: '#eee',
                                        borderBottomWidth: 1
                                    }}
                                    secureTextEntry={true}
                                    onSubmitEditing={() => {}}
                                    onChangeText={(confirmPassword) => {
                                        this.setState({confirmPassword})
                                    }}
                                    value={this.state.confirmPassword}
                                    placeholder="Konfirmasi Password"
                                /> 
                            </View>
                            {this.state.errPassword.length > 0 && this.state.errPasswordIdx === 2 ? this.renderWarning() : null}
                            <View 
                                style={{
                                    marginTop: 20,
                                    width: '100%',
                                }}
                            >
                                <Ripple
                                    onPress={() => this.submitGantiPassword()}
                                    rippleColor={'rgba(0,0,0,.3)'}
                                    style={{
                                        borderRadius: 30,
                                        paddingVertical: 15,
                                        width: '100%',
                                        backgroundColor: icon_color_primary,
                                        alignItems: 'center'
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: '#fff',
                                            fontSize: 16,
                                        }}
                                    >Simpan</Text>
                                </Ripple> 
                            </View>
                        </View>
                    </KeyboardAvoidingView>
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
    }
})