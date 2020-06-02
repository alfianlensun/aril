import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    Image
} from 'react-native'
import {screenHeightPercent, screenWidthPercent} from '../helpers/Layout'
import { getData, clearData } from '../services/LocalStorage'

import {Icon} from 'react-native-elements'
import Ripple from 'react-native-material-ripple'
import { FlatList } from 'react-native-gesture-handler'
export default class Admin extends Component{
    constructor(props){
        super(props)
        this.state = {
            userdetail: null
        }
    }

    componentDidMount(){
        getData('AuthUser').then(data => {
            if (data === null){
                this.props.navigation.replace('login')
            }
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
                        height: screenHeightPercent(10),
                        paddingHorizontal: 20,
                        paddingVertical:20,
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}
                >
                    <Icon 
                        type={'font-awesome'}
                        name={'gear'}
                        color={'#444'}
                        size={18}
                    />
                    <Text
                        style={{
                            marginLeft: 10,
                            fontSize: 18
                        }}
                    >Admin </Text>
                    
                </View>
                <View 
                    style={{
                        width: '100%',
                        height: '100%',
                        marginTop: 20,
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
                            paddingVertical: 10
                        }}
                    >
                        <View
                            style={{
                                width: '100%',
                            }}
                        >
                            <Ripple
                                onPress={() => this.props.navigation.navigate('SettingUser')}
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
                                        type={'font-awesome'}
                                        name={'bell'}
                                        size={16}
                                        color={'#444'}
                                    />
                                </View>
                                <View>
                                    <Text
                                        style={{
                                            fontSize: 14,
                                            color:'#444',
                                            fontWeight: 'bold'
                                        }}
                                    >Pengaturan pengguna</Text>
                                    <Text
                                        style={{
                                            color:'#444',
                                            marginTop: 2,
                                            fontSize: 12
                                        }}
                                    >Atur penerima notifikasi dan status aktif user</Text>
                                    {/* <FlatList 

                                    /> */}
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
})