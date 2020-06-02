import React, {Component} from 'react'
import {
    View,
    Text,
    StatusBar,
    StyleSheet
} from 'react-native'
import {screenHeightPercent} from '../../../helpers/Layout'
import Ripple from 'react-native-material-ripple'
import {Icon} from 'react-native-elements'
export default class SettingAplikasi extends Component{
    constructor(props){
        super(props)
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
                        height: screenHeightPercent(8),
                        paddingHorizontal: 10,
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
                            fontSize: 17
                        }}
                    >Pengaturan aplikasi </Text>
                </View>
                <View 
                    style={{
                        width: '100%',
                        height: '100%',
                        marginTop: 20,
                        paddingTop: 20,
                        borderTopLeftRadius: 30,
                        borderTopRightRadius: 30,
                        paddingHorizontal: 10,
                        backgroundColor: '#fff'
                    }}
                >
                    <View
                        style={{
                            borderTopLeftRadius: 20,
                            borderTopRightRadius: 20,
                            overflow: 'hidden',
                            flex: 1
                        }}
                    >
                        <View
                            style={{
                                height: '80%'
                            }}
                        >
                            <Ripple
                                onPress={() => this.props.navigation.navigate('SettingAplikasiGeofence')}
                                rippleColor={'rgba(0,0,0,.4)'}
                                style={{
                                    justifyContent: 'center',
                                    paddingHorizontal: 10,
                                    width: '100%',
                                    borderRadius: 10,
                                    overflow: 'hidden',
                                    height: 50
                                }}
                            >
                                <View
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        borderBottomWidth: 1,
                                        borderBottomColor: '#ddd',
                                    }}
                                >
                                    <View
                                        style={{
                                            width: '20%',
                                            paddingLeft: 20
                                        }}
                                    >
                                        <Icon 
                                            type={'ionicons'}
                                            name={'map'}
                                            color={'#444'}
                                            size={18} 
                                        />
                                    </View>
                                    <View
                                        style={{
                                            width: '80%'
                                        }}
                                    >
                                       <Text>Atur Jarak geofence</Text>
                                    </View>
                                    <View
                                        style={{
                                            width: '20%',
                                            paddingRight: 20
                                        }}
                                    >
                                        <Icon 
                                            type={'ionicons'}
                                            name={'chevron-right'}
                                            color={'#444'}
                                            size={25} 
                                        />
                                    </View>
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
        height: screenHeightPercent(4)
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