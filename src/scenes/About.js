import React, { Component } from 'react'
import {
    Image,
    View,
    Text
} from 'react-native'
import Logo from '../../assets/icon/icon.png'
import { icon_color_primary } from '../themes/Default'

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
                <View>
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
                        fontSize: 12,
                        color: icon_color_primary
                    }}
                >Version 1.0.0</Text>   
            </View>
        )
    }
}