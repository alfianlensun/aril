import React, {Component} from 'react'
import {
    Text,
    View,
    Image
} from 'react-native'
import {Icon} from 'react-native-elements'
import Ripple from 'react-native-material-ripple'
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { screenWidthPercent } from '../../helpers/Layout'

export default class ListAbsenMonitoringMobile extends Component{
    constructor(props){
        super(props)
    }


    render(){
        return (
            <Ripple
                onPress={this.props.onPress}
                rippleColor={'rgba(255,255,255,.3)'}
                style={{
                    width: '100%',
                    marginVertical: 4,
                    backgroundColor: this.props.masuk ? '#38a169': '#77baf7',
                    flexDirection: 'column',
                    flexWrap: 'wrap',
                    borderRadius: 10,
                    position:'relative',
                }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        flexWrap: 'wrap',
                    }}
                >
                    <View
                        style={{
                            height: screenWidthPercent(10),
                            width: screenWidthPercent(10),
                            marginHorizontal: 10,
                            flexBasis: screenWidthPercent(10),
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 50,
                            backgroundColor: '#eee'
                        }}
                    >
                        <Image
                            onLoadEnd={() => this.setState({loadImage: false})}
                            source={{uri: this.props.uriImage}} 
                            style={{
                                width: '90%',
                                height: '90%',
                                borderRadius: 50
                            }} 
                        />
                    </View>
                    <View
                        style={{
                            paddingVertical: 10,
                            minWidth: 100,
                            flexBasis: 100,
                            flex: 3,
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 13,
                                color: '#fff',
                                fontWeight: 'bold'
                            }}
                        >{this.props.masuk ? 'Masuk' : 'Pulang'} - {this.props.tanggal}</Text>
                        <Text
                            style={{
                                marginTop: 5,
                                fontSize: 12,
                                color: '#fff',
                            }}
                        >Telah melakukan absen {this.props.masuk ? 'Masuk' : 'Pulang'} dari mobile app </Text>
                    </View>
                    <View
                        style={{
                            minWidth: 100,
                            flexBasis: 100,
                            paddingVertical: 10,
                            justifyContent:'center',
                            alignItems: 'center'
                        }}
                    >
                        <FontAwesome name={this.props.masuk ? 'sign-in' : 'sign-out'} size={20} color={'#fff'}/>
                        <Text
                            style={{
                                marginTop: 5,
                                fontSize: 13,
                                fontWeight: 'bold',
                                color: "#fff"
                            }}
                        >
                            {this.props.jam}
                        </Text>
                    </View>
                </View>
            </Ripple>
        )
    }
}