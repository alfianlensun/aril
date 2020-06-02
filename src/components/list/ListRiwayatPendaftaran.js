import React, {Component} from 'react'
import {
    Text,
    View,
} from 'react-native'
import {Icon} from 'react-native-elements'
import Ripple from 'react-native-material-ripple'

export default class ListDataDiriPasien extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <Ripple
                rippleColor={'rgba(0,0,0,.2)'}
                style={{
                    borderBottomWidth: 1,
                    borderBottomColor: '#eee',
                    backgroundColor: '#fff',
                    alignItems: 'center',
                    marginTop: 10,
                    padding: 10,
                    position: 'relative'
                }}
            >
                <View
                    style={{
                        width: '100%',
                        flexDirection: 'row'
                    }}
                >
                    <View
                        style={{
                            width: '35%'
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 12,
                                color: '#555'
                            }}
                        >No Pendaftaran</Text>
                    </View>
                    <View
                        style={{
                            width: '65%'
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 12,
                                color: '#444'
                            }}
                        >: {this.props.noPendaftaran}</Text>
                    </View>
                </View>
                <View
                    style={{
                        marginTop: 5,
                        width: '100%',
                        flexDirection: 'row'
                    }}
                >
                    <View
                        style={{
                            width: '35%'
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 12,
                                color: '#555'
                            }}
                        >Tgl pendaftaran</Text>
                    </View>
                    <View
                        style={{
                            width: '65%'
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 12,
                                color: '#444'
                            }}
                        >: {this.props.tanggalPendaftaran}</Text>
                    </View>
                </View>
                <View
                    style={{
                        marginTop: 5,
                        width: '100%',
                        flexDirection: 'row'
                    }}
                >
                    <View
                        style={{
                            width: '35%'
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 12,
                                color: '#555'
                            }}
                        >Cara Bayar</Text>
                    </View>
                    <View
                        style={{
                            width: '65%'
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 12,
                                color: '#444'
                            }}
                        >: {this.props.caraBayar}</Text>
                    </View>
                </View>
                <View
                    style={{
                        marginTop: 5,
                        width: '100%',
                        flexDirection: 'row'
                    }}
                >
                    <View
                        style={{
                            width: '35%'
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 12,
                                color: '#555'
                            }}
                        >Instalasi</Text>
                    </View>
                    <View
                        style={{
                            width: '65%'
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 12,
                                color: '#444'
                            }}
                        >: {this.props.instalasi}</Text>
                    </View>
                </View>
                <View
                    style={{
                        marginTop: 5,
                        width: '100%',
                        flexDirection: 'row'
                    }}
                >
                    <View
                        style={{
                            width: '35%'
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 12,
                                color: '#555'
                            }}
                        >Sub Instalasi</Text>
                    </View>
                    <View
                        style={{
                            width: '65%'
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 12,
                                color: '#444'
                            }}
                        >: {this.props.subInstalasi}</Text>
                    </View>
                </View>
            </Ripple>
        )
    }
}