import React, {Component} from 'react'
import {
    View,
    Text,
    Image,
    StatusBar
} from 'react-native'
import Ripple from 'react-native-material-ripple'
// import {} from 'react-native-vector-icons/'

export default class SignUpVerifikasi extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return (
            <View
                style={{
                    backgroundColor: '#e1f7fa',
                    flex: 1
                }}
            >
                <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
                <View
                    style={{
                        flex: 1
                    }}
                >
                    <View
                        style={{
                            
                        }}
                    >
                        <Ripple
                            style={{
                                width: '100%',
                                height: 50
                            }}
                        >
                            <
                        </Ripple>
                    </View>
                    <View
                        style={{
                            width: 50,
                            height: 50
                        }}
                    >
                        <Image source={require('../../assets/icon/telegram.png')} 
                            style={{
                                height: '100%',
                                width: '100%'
                            }}
                        />
                    </View>
                </View>
            </View>   
        )
    }
}