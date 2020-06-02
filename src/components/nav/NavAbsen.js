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
                        <FontAwesome name="sign-in" size={25} color={icon_color_primary}/>
                        <Text
                            style={{
                                marginTop: 10,
                                fontSize: 12,
                                color: text_color_default
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
                        <FontAwesome name="sign-out" size={25} color={icon_color_primary}/>
                        <Text
                            style={{
                                marginTop: 10,
                                fontSize: 12,
                                color: text_color_default
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
                        <Feather name="calendar" size={25} color={icon_color_primary}/>
                        <Text
                            style={{
                                marginTop: 10,
                                fontSize: 12,
                                color: text_color_default
                            }}
                        >Riwayat Absen</Text>
                    </Ripple>
                </View>
            </View>
        )
    }
}