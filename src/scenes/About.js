import React, { Component } from 'react'
import {
    Image,
    View,
    Text
} from 'react-native'
import Logo from '../../assets/icon/icon.png'
import { icon_color_primary } from '../themes/Default'
import { screenHeightPercent } from '../helpers/Layout'
import {getVersion} from 'react-native-device-info'
import Ripple from 'react-native-material-ripple'
import {Icon} from 'react-native-elements'
export default class About extends Component{
    render(){
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: '#fff',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <View
                    style={{
                        position: 'absolute',
                        width: '100%',
                        paddingHorizontal: 20,
                        top: screenHeightPercent(8)
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
                            color={'#444'}
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
                        color: icon_color_primary
                    }}
                >Version ${getVersion()}</Text>   
            </View>
        )
    }
}