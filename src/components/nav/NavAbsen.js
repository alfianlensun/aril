import React, { Component } from 'react'
import {
    View,
    Text
} from 'react-native'
import Ripple from 'react-native-material-ripple'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'
import { screenWidthPercent } from '../../helpers/Layout'
import { shadow, icon_color_primary, text_color_default } from '../../themes/Default'
import LinearGradient from 'react-native-linear-gradient';
export default class NavAbsen extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return (
            <View
                style={[{
                    overflow: 'hidden',
                    flexDirection: 'column',
                    height: screenWidthPercent(20),
                    width: '100%',
                    backgroundColor: '#fff',
                    borderRadius: 15
                }, shadow]}
            >
                <LinearGradient 
                    start={{x: 0, y: 0}} 
                    end={{x: 2, y: 0}} 
                    colors={['#667eea', '#63b3ed', '#434190']} 
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                    }}>
                        <View
                            style={{
                                flex: 1,
                                flexDirection: 'row'  
                            }}
                        >
                            <Ripple
                                onPress={this.props.onPressAbsenMasuk}
                                style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                            >
                                <FontAwesome name="sign-in" size={25} color={'#fff'}/>
                                <Text
                                    style={{
                                        marginTop: 10,
                                        fontSize: 12,
                                        color: '#fff'
                                    }}
                                >Absen Masuk</Text>
                            </Ripple>
                            <Ripple
                                onPress={this.props.onPressAbsenPulang}
                                style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                            >
                                <FontAwesome name="sign-out" size={25} color={'#fff'}/>
                                <Text
                                    style={{
                                        marginTop: 10,
                                        fontSize: 12,
                                        color: '#fff'
                                    }}
                                >Absen Pulang</Text>
                            </Ripple>
                            <Ripple
                                onPress={() => this.props.navigation.navigate('Absen')}
                                style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                            >
                                <Feather name="calendar" size={25} color={'#fff'}/>
                                <Text
                                    style={{
                                        marginTop: 10,
                                        fontSize: 12,
                                        color: '#fff'
                                    }}
                                >Riwayat Absen</Text>
                            </Ripple>
                        </View>
                </LinearGradient>
            </View>
        )
    }
}