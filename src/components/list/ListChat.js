import React, { Component } from 'react'
import {
    View,
    Text,
    ImageBackground
} from 'react-native'
import Ripple from 'react-native-material-ripple'

export default class ListChat extends Component{
    constructor(props){
        super(props)
        console.log(props.navigate_to)
    }

    render(){
        return (
            <Ripple
                onPress={() => this.props.navigation.navigate(this.props.navigate_to)}
                rippleColor={'rgba(0,0,0,.3)'}
                style={{
                    width: '100%',
                    height: 60,
                    flexDirection: 'row',
                    paddingHorizontal: 20,
                    alignItems: 'center'
                }}
            >
                <View
                    style={{

                    }}
                >
                    <View
                        style={{
                            height: 40,
                            width: 40,
                            overflow:'visible',
                            borderRadius: 30,
                        }}
                    >
                        {/* {uri: props.uri} */}
                        <View
                            style={{
                                height: 40,
                                width: 40,
                                overflow: 'hidden',
                                borderRadius: 30,
                            }}
                        >
                            <ImageBackground
                                source={require('../../../assets/background/profiltes.jpg')}
                                style={{
                                    height: '100%',
                                    width:'100%',
                                    backgroundColor: '#eee'
                                }}
                            >
                            
                            </ImageBackground>
                        </View>
                        <View
                            style={{
                                height: 12,
                                width: 12,
                                borderWidth: 2,
                                borderColor: "#fff",
                                backgroundColor: '#43eb34',
                                position: 'absolute',
                                borderRadius: 10,
                                bottom: 0,
                                right: 0
                            }}
                        >

                        </View>
                    </View>   
                </View>
                <View
                    style={{
                        width: '100%',
                        paddingHorizontal: 15
                    }}
                >
                    <Text
                        style={{
                            fontWeight: 'bold',
                            color: '#000',
                            fontSize: 16
                        }}
                    >Dr. Testing </Text>
                </View>
            </Ripple>
        )
    }
}