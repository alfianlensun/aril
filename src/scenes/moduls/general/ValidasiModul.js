import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    TextInput
} from 'react-native'
import {screenHeightPercent, screenWidthPercent} from '../../../helpers/Layout'
import { getData, clearData } from '../../../services/LocalStorage'
import {Icon} from 'react-native-elements'
import Ripple from 'react-native-material-ripple'
import moment from 'moment'
import { validasiPassword } from '../../../services/ServiceAuth'

export default class ValidasiModul extends Component{
    constructor(props){
        super(props)
        const params = this.props.route.params
        this.state = {
            userdetail: null,
            error: false,
            params
        }
    }

    componentDidMount(){
        getData('AuthUser').then(data => {
            this.setState({
                userdetail: data
            })
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
                            onPress={() => this.props.navigation.canGoBack() ? this.props.navigation.goBack(null) : this.props.navigation.replace('MainMenu')}
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
                                color={'#111'}
                                size={22}
                            />
                        </Ripple>
                        
                    </View>
                </View>
                <View 
                    style={{
                        width: '100%',
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
                            width: '100%',
                            height: '100%'
                        }}
                    >
                        <View
                            style={{
                                width: '100%',
                                alignItems: 'center'
                            }}
                        >
                            <Text
                                style={{
                                    color: '#333',
                                    fontSize: 16,
                                    fontWeight: 'bold'
                                }}
                            >{'Masukan password anda'}</Text>   
                            <View
                                style={{
                                    marginTop: 10,
                                    flexDirection: 'row'
                                }}
                            >
                                <Text
                                    style={{
                                        color: '#333',
                                        fontSize: 13
                                    }}
                                > Password digunakan untuk masuk ke akun anda </Text>
                            </View>
                        </View>
                        <View
                            style={{
                                width: '100%',
                                alignItems: 'center',
                                marginTop: 30,
                            }}
                        >
                           <TextInput
                                autoFocus
                                onSubmitEditing={() => console.log('ok')}
                                onChangeText={(Password) => {
                                    this.setState({Password})
                                }}
                                ref={(input) => { this.Password = input }}
                                secureTextEntry={true}
                                style={{
                                    borderRadius: 30,
                                    paddingHorizontal: 20,
                                    width: '70%',
                                    fontSize: 14,
                                    textAlign: 'center',
                                    backgroundColor: '#e1f7fa'
                                }}
                                value={this.state.Password}
                                placeholder="Password"
                                placeholderTextColor="#aaa"
                                
                            />  
                            {this.state.error &&
                            <Text
                                style={{
                                    marginTop: 10,
                                    fontSize: 12,
                                    color: "#333"
                                }}
                            >Password Salah..!</Text> 
                            }  
                            <Ripple
                                style={{
                                    marginTop: 20,
                                    width: '70%',
                                }}
                                onPress={async () => {
                                    try {
                                        const validasi = await validasiPassword(userdetail._id, this.state.Password);
                                        if (validasi.reqStat.code === 200){
                                            this.setState({
                                                error: false
                                            })   
                                            if (this.state.params.navigateTo !== undefined) this.props.navigation.replace(this.state.params.navigateTo)
                                        } else {
                                            this.setState({
                                                error: true
                                            })   
                                        }
                                    }catch(err){
                                        console.log(err)
                                    }
                                    
                                }}
                                rippleColor={'rgba(255,255,255,.5)'}
                            >
                                <View style={{
                                    backgroundColor: '#6ab1f7',
                                    width: '100%',
                                    paddingVertical: 15,
                                    borderRadius: 50,
                                    position: 'relative',
                                    justifyContent: 'center',
                                    alignItems: 'center'

                                }}>
                                    <Text style={{
                                        color: '#fff'
                                    }}>Lanjutkan</Text>
                                </View>
                            </Ripple> 
                        </View>
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