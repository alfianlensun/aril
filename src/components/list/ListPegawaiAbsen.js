import React, {Component} from 'react'
import {
    Text,
    View
} from 'react-native'
import {Icon} from 'react-native-elements'
import Ripple from 'react-native-material-ripple'
import Feather from 'react-native-vector-icons/Feather'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { ripple_color_primary, icon_color_secondary } from '../../themes/Default'
import MaterialCIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import moment from 'moment'
export default class ListPegawaiAbsen extends Component{
    constructor(props){
        super(props)
    }


    render(){
        return (
            <Ripple
                onPress={() => console.log('ok')}
                rippleColor={ripple_color_primary}
                style={{
                    width: '100%',
                    marginVertical: 4,
                    backgroundColor: '#fff',
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
                            minWidth: 50,
                            flexBasis: 50,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <View
                            style={{
                                height: 40,
                                width: 40,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderTopRightRadius: 10,
                                borderBottomLeftRadius: 10,
                            }}
                        >
                            <Feather name={'user'} size={20} color={'#000'}/>
                        </View>
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
                                color: '#000',
                                fontWeight: 'bold'
                            }}
                        >{this.props.items.nama_pegawai}</Text>
                        {this.props.items.mobile === false &&
                            <Text
                                style={{
                                    marginTop: 10,
                                    fontSize: 13,
                                    color: '#fff',
                                    paddingHorizontal: 5,
                                    paddingVertical: 5,
                                    borderRadius: 30,
                                    alignSelf: "flex-start",
                                    backgroundColor: '#f56565'
                                }}
                            >Belum Terdaftar Di KandouOne</Text>
                        }
                        <View
                            style={{
                                marginTop: 10,
                                width: '100%'
                            }}
                        >
                            {this.props.items.absen_masuk !== null &&
                                <View
                                    style={{
                                        flex: 1,
                                        flexDirection: 'row'
                                    }}
                                >
                                    <View
                                        style={{
                                            flex: 1,
                                            flexDirection: 'row',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <Text
                                            style={{
                                                height: '100%',
                                                paddingRight: 5,
                                                marginTop: 5,
                                                fontSize: 12,
                                                color: '#000',
                                            }}> 
                                            Absen Masuk
                                        </Text>
                                        <View
                                            style={{
                                                height: '100%',
                                                justifyContent: 'center'
                                            }}
                                        >
                                            <Ionicons name={'md-finger-print'} size={13} color={'#000'}/>
                                        </View>
                                    </View>
                                    
                                    <Text
                                        style={{
                                            flex: 1,
                                            marginTop: 5,
                                            fontSize: 12,
                                            color: '#000',
                                        }}> 
                                        {moment(this.props.items.absen_masuk).format('HH:mm:ss')}
                                    </Text>
                                </View>
                            }
                            {this.props.items.absen_masuk_mobile !== null &&
                                <View
                                    style={{
                                        flex: 1,
                                        flexDirection: 'row'
                                    }}
                                >
                                    <View
                                        style={{
                                            flex: 1,
                                            flexDirection: 'row',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <Text
                                            style={{
                                                height: '100%',
                                                paddingRight: 5,
                                                marginTop: 5,
                                                fontSize: 12,
                                                color: '#000',
                                            }}> 
                                            Absen Masuk
                                        </Text>
                                        <View
                                            style={{
                                                height: '100%',
                                                justifyContent: 'center'
                                            }}
                                        >
                                            <MaterialCIcons
                                                name={'face-recognition'}
                                                size={13}
                                                color={'#000'}
                                            />  
                                        </View>
                                    </View>
                                    <Text
                                        style={{
                                            flex: 1,
                                            marginTop: 5,
                                            fontSize: 12,
                                            color: '#000',
                                        }}> 
                                        {moment(this.props.items.absen_masuk_mobile).format('HH:mm:ss')}
                                    </Text>
                                </View>
                            }
                            {this.props.items.absen_pulang !== null && 
                                <View
                                    style={{
                                        flex: 1,
                                        flexDirection: 'row'
                                    }}
                                >
                                    <View
                                        style={{
                                            flex: 1,
                                            flexDirection: 'row',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <Text
                                            style={{
                                                height: '100%',
                                                paddingRight: 5,
                                                marginTop: 5,
                                                fontSize: 12,
                                                color: '#000',
                                            }}> 
                                            Absen Pulang
                                        </Text>
                                        <View
                                            style={{
                                                height: '100%',
                                                justifyContent: 'center'
                                            }}
                                        >
                                            <Ionicons name={'md-finger-print'} size={13} color={'#000'}/>
                                        </View>
                                    </View>
                                    <Text
                                        style={{
                                            flex: 1,
                                            marginTop: 5,
                                            fontSize: 12,
                                            color: '#000',
                                        }}> 
                                        {moment(this.props.items.absen_pulang).format('HH:mm:ss')}
                                    </Text>
                                </View>
                            }
                            {this.props.items.absen_pulang_mobile !== null && 
                                <View
                                    style={{
                                        flex: 1,
                                        flexDirection: 'row'
                                    }}
                                >
                                    <View
                                        style={{
                                            flex: 1,
                                            flexDirection: 'row',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <Text
                                            style={{
                                                height: '100%',
                                                paddingRight: 5,
                                                marginTop: 5,
                                                fontSize: 12,
                                                color: '#000',
                                            }}> 
                                            Absen Pulang
                                        </Text>
                                        <View
                                            style={{
                                                height: '100%',
                                                justifyContent: 'center'
                                            }}
                                        >
                                            <MaterialCIcons
                                                name={'face-recognition'}
                                                size={13}
                                                color={'#000'}
                                            />  
                                        </View>
                                    </View>
                                    <Text
                                        style={{
                                            flex: 1,
                                            marginTop: 5,
                                            fontSize: 12,
                                            color: '#000',
                                        }}> 
                                        {moment(this.props.items.absen_pulang_mobile).format('HH:mm:ss')}
                                    </Text>
                                </View>
                            }
                        </View>
                    </View>
                    <View
                        style={{
                            minWidth: 80,
                            flexBasis: 80,
                            paddingVertical: 10,
                            justifyContent:'center',
                            alignItems: 'center'
                        }}
                    >
                        <MaterialIcons name="chevron-right" size={30} color={'#333'}/>
                    </View>
                </View>
            </Ripple>
        )
    }
}