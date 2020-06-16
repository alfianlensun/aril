import React, { Component } from 'react'
import {
    Image,
    View,
    Text,
    StatusBar
} from 'react-native'
import Logo from '../../assets/icon/icon.png'
import { icon_color_primary, background_color_gradient } from '../themes/Default'
import { screenHeightPercent } from '../helpers/Layout'
import {getVersion} from 'react-native-device-info'
import Ripple from 'react-native-material-ripple'
import {Icon} from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient'
export default class About extends Component{
    render(){
        return (
            <LinearGradient
                start={{x: 0, y: 0}} 
                end={{x: 2, y: 0}} 
                colors={background_color_gradient} 
                style={{
                    flex: 1,
                    position: 'relative',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
                <View
                    style={{
                        position: 'absolute',
                        width: '100%',
                        paddingHorizontal: 20,
                        top: screenHeightPercent(6)
                    }}
                >
                    <Ripple
                        onPress={() => this.props.navigation.goBack(null)}
                        style={{
                            height: 40,
                            width: 40,
                            overflow: 'hidden',
                            justifyContent: 'center',
                            borderRadius: 20,
                        }}
                    >
                        <Icon 
                            type={'ionicons'}
                            name={'arrow-back'}
                            color={'#fff'}
                            size={24}
                        />
                    </Ripple>
                </View>
                <View
                    style={{

                    }}
                >
                    <Image 
                        style={{
                            height: 100,
                            width: 100
                        }}
                        source={Logo}    
                    />
                </View>
                <Text
                    style={{
                        marginTop: 20,
                        fontSize: 12,
                        color: '#fff'
                    }}
                >Version {getVersion()}.02</Text>   
            </LinearGradient>
        )
    }
}