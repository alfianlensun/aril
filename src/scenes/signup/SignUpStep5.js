import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    ImageBackground,
    StatusBar,
    SafeAreaView,
    TouchableOpacity,
    KeyboardAvoidingView
} from 'react-native'
import {screenHeightPercent, screenWidthPercent} from '../../helpers/Layouts'
import {signUpCreate} from '../../services/SignUp'
import moment from 'moment'
import Ripple from 'react-native-material-ripple'
import {
    storeData,
    getData
} from '../../services/LocalStorage'
import {DoubleBounce} from 'react-native-loader';
import {Icon} from 'react-native-elements'

export default class SignUpStep5 extends Component{
    constructor(props){
        super(props)
        this.state = {
            password: '',
            konfirmasiPassword:'',
            loader: false,
            validator: false
        }
    }

    renderValidatePassword(){
        return (
            <View style={{
                paddingBottom: 20,
                flexDirection: 'row',
                alignItems: 'center'
            }}>
                <Text style={{color: '#F76161', marginRight: 5}}>Kata sandi anda tidak cocok</Text>
                <Icon 
                    type={'font-awesome'}
                    name={'exclamation-circle'}
                    color={'#F76161'}
                    size={20}
                />
            </View>
        )
    }

    renderButtonBerikutnya(){
        return (
            <Ripple 
                rippleColor={'#000'}
                onPress={() => {
                    this.simpanTanggalLahir()
                }}
                style={{
                    padding: 10,
                    marginLeft: 10,
                    borderRadius: 5,
                    backgroundColor: '#86F49B'
                }}
            >
                <View style={Styles.btnNext}>
                    <Text style={Styles.buttonLoginText}>Berikutnya</Text>
                </View>
            </Ripple>
        )
    }

    signUp(){
        if (this.state.password == this.state.konfirmasiPassword){
            this.setState({
                loader: true
            })
            getData('signUp_datapasien').then((data) => {
                let detail = data
                detail.password = this.state.password
                this.setState({
                    loader: false
                })
                console.log(detail)
                
            })
        } else {
            this.setState({
                validator: true,
                loader: false
            })
        }
    }

    renderLoader(){
        return (
            <View style={{marginLeft: 10}}>
                <DoubleBounce size={10} color="#fff" />
            </View>
        )
    }

    render(){
        return (
            <SafeAreaView style={Styles.container}>
                <View style={Styles.header}>

                </View>
                <View style={[Styles.container]} >
                    <View style={{
                        position: 'relative',
                        flexDirection: 'row',
                        height: '8%'
                    }}>
                        <View
                            style={{width: '30%'}}
                        >
                            <Ripple
                                onPress={() => this.props.navigation.goBack(null)}
                                style={{
                                    overflow: 'hidden',
                                    borderRadius: 50,
                                    height: 50,
                                    width: 50,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                            >
                                <Icon 
                                    type={'octicons'}
                                    name={'chevron-left'}
                                    color={'#aaa'}
                                    size={30}
                                />
                            </Ripple>
                        </View>
                        <View style={{
                            width: '40%',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Text style={{fontWeight: '500', fontSize: 16}}>Kata Sandi</Text>
                        </View>
                    </View>
                    <StatusBar backgroundColor="blue" barStyle="light-content" />
                    <KeyboardAvoidingView style={Styles.container} behavior="padding" enabled>
                        <View
                            style={{
                                marginTop: 20,
                                alignItems: 'center'
                            }}
                        >
                            <Text>Masukan password anda</Text>
                        </View>
                        <View style={Styles.containerWrapper}>
                            <View
                                    style={Styles.containerFormInput}
                                >
                                <Text>Kata sandi</Text>
                                <View style={Styles.formInputWrapper}>
                                    <TextInput
                                        onChangeText={(password) => this.setState({password})}
                                        secureTextEntry={true}
                                        style={Styles.formTextInput}
                                        value={this.state.password}
                                        placeholder="Masukan kata sandi anda"
                                    />
                                </View>
                                <View
                                    style={{
                                        width: '100%',
                                        flexDirection: 'row',
                                    }}
                                >
                                    <Text style={{width: '80%', color: '#555', fontSize: 12}}>Kata sandi minimal 8 karakter</Text>
                                    <View 
                                        style={{
                                            width: '20%',
                                            alignContent: 'flex-end',
                                            justifyContent: 'flex-end'
                                        }}
                                    >
                                        <Text style={{textAlign: 'right',  color: '#555', fontSize: 12}}>{this.state.password.length}</Text>
                                    </View>
                                </View>
                            </View>
                            <View
                                style={Styles.containerFormInput}
                            >
                                <Text>Konfirmasi kata sandi</Text>
                                <View style={Styles.formInputWrapper}>
                                    <TextInput
                                        onChangeText={(konfirmasiPassword) => this.setState({konfirmasiPassword})}
                                        secureTextEntry={true}
                                        style={Styles.formTextInput}
                                        value={this.state.konfirmasiPassword}
                                        placeholder="Masukan kata sandi anda"
                                    />
                                </View>
                            </View>
                            {this.state.validator ? this.renderValidatePassword() : null}
                            <View>
                                <Ripple
                                    onPress={() => {this.signUp()}}
                                    style={Styles.buttonDaftar}
                                >
                                    <Text
                                        style={{
                                            color: '#fff',
                                            fontSize: 16,
                                            
                                        }}
                                    >Daftar</Text>
                                    {this.state.loader ? this.renderLoader() : null}
                                </Ripple>       
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                </View>
                
            </SafeAreaView>
        )
    }
}

const Styles = new StyleSheet.create({
    container: {
        flex : 1,
    },
    containerFormInput: {
        marginVertical: 15
    },
    containerWrapper:{
        position: 'relative',
        padding: '5%',
        width: '100%',
        height: '100%',
    },
    header: {
        backgroundColor: '#333',
        height: screenHeightPercent(4)
    },
    content:{
        paddingTop: '10%',
        width: '100%',
        borderRadius: 10,
        height: '50%'
    },
    
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2, 
    },
    formInputWrapper:{
        borderBottomWidth: 1,
        borderBottomColor: '#bbb',
        width: '100%',
        height: 45,
        overflow: 'hidden',
        justifyContent: 'center',
    },
    formInputIdentitasWrapper: {
        borderWidth: 1,
        borderColor: '#bbb',
        width: '100%',
        borderRadius: 5,
        marginTop: 10,
        paddingHorizontal: 10,
        overflow: 'hidden',
        justifyContent: 'center',
    },
    formInputIdentitasList: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
        paddingVertical: 10,
        alignItems: 'center'
    },
    formInputIdentitasListPhotoWrapper: {
        height: 60,
        width: '25%',
        borderRadius: 5,
        backgroundColor: '#ddd',
        justifyContent: 'center',
        alignItems: 'center'
    },
    formInputWrapperTandaTangan: {
        marginTop: 10,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 5,
        width: '100%',
        height: 100
    },
    formTextInput: {
        height: '100%',
        width: '100%',
        fontSize: 16
    },
    buttonDaftar: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 15,
        backgroundColor: '#40CB5A',
        borderRadius: 5,
        overflow: 'hidden'
    },
    buttonLoginText: {
        color: '#555'
    }
    
})