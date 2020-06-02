import React, {Component} from 'react'
import {
    Text,
    View
} from 'react-native'


export default class CardDetailPasien extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <View
                style={[{
                    borderRadius: 10,
                    width: '100%',
                    backgroundColor: '#e1f7fa',
                    paddingHorizontal: 10,
                    paddingVertical: 10
                }]}
            >
                <View>
                    <Text
                        style={{
                            backgroundColor: '#6ab1f7',
                            alignSelf: 'flex-start',
                            paddingHorizontal: 10,
                            paddingVertical: 5,
                            borderRadius: 5,
                            fontSize: 12,
                            color: '#fff'
                        }}
                    >Pasien yang menempati kamar ini</Text>
                </View>
                <View
                    style={{
                        marginTop: 10,
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
                        >Poli / Ruang Rawat</Text>
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
                        >: {this.props.ruangan}</Text>
                    </View>
                </View>
                {this.props.kamar ? 
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
                            >Nama Kamar</Text>
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
                            >: {this.props.kamar}</Text>
                        </View>
                    </View> : null
                }
                {this.props.bed ? 
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
                            >Nama Bed</Text>
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
                            >: Bed {this.props.bed}</Text>
                        </View>
                    </View> : null
                }
            </View>
        )
    }
}