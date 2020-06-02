import React, { Component } from 'react'

import {
    View,
    Text,
    StatusBar,
    StyleSheet,
    ImageBackground
} from 'react-native'
import { screenHeightPercent } from '../../../helpers/Layout'
import Ripple from 'react-native-material-ripple'
import {Icon} from 'react-native-elements'


export default class RiwayatKredensial extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <View 
                style={{
                    flex: 1,
                    backgroundColor: '#e1f7fa'
                }}
            >
                <View 
                    style={{
                        flex: 1,
                        flexDirection: 'column'
                    }}
                >
                    <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
                    <View style={Styles.header}></View>
                    <View 
                        style={{
                            flexDirection: 'row',
                            paddingHorizontal: 10,
                            paddingTop: 10,
                            alignItems: 'center'
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
                                    color={'#444'}
                                    size={24}
                                />
                            </Ripple>
                        </View>
                        <Text
                            style={{
                                fontSize: 16,
                                marginLeft: 10,
                                color: '#333'
                            }}
                        >Riwayat Kredensial</Text>
                    </View>
                    <View
                        style={{
                            borderTopLeftRadius: 30,
                            borderTopRightRadius: 30,
                            backgroundColor: '#fff',
                            paddingVertical: 30,
                            paddingHorizontal: 10,
                            height: '90%',
                            width: '100%',
                            marginTop: 20
                        }}
                    >
                        
                        
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
        height: screenHeightPercent(4)
    }
})