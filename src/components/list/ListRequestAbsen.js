import React from 'react'
import {
    View,
    Text
} from 'react-native'
import moment from "moment";
import Ripple from 'react-native-material-ripple'
import {Icon} from 'react-native-elements'


export default function ListRequestAbsen(props){
    return (
        <Ripple
            onPress={props.onPress}
            rippleColor={'rgba(0,0,0,.4)'}
            style={{
                paddingVertical: 10,
                paddingHorizontal: 20,
                marginTop: 10,
                height: 120,
                borderRadius: 10,
                position: 'relative'
            }}
        >
            <View
                style={{
                    width: '100%',
                    height: '100%',
                    borderBottomWidth: 1,
                    borderBottomColor: '#ccc',
                }}
            >
                <View
                    style={{
                        width: '80%'
                    }}
                >
                    <Text
                        style={{
                            color: '#444',
                            fontWeight: 'bold'
                        }}
                    >{props.title && props.title}</Text>
                    {props.detail &&
                        <Text
                            style={{
                                color: '#444',
                                fontSize: 12,
                                marginTop: 2
                            }}
                        >{props.detail && props.detail}</Text>
                    }
                    
                </View>
                <View
                    style={{
                        marginTop: 5,
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}
                >
                    <Text
                        style={{
                            color: '#444',
                            width: '20%',
                            fontSize: 13
                        }}
                    >Diajukan </Text>
                    <Text
                        style={{
                            borderRadius: 10,
                            paddingVertical: 2,
                            paddingHorizontal: 10,
                            color: '#fff',
                            backgroundColor: '#6ab1f7',
                            marginTop: 5,
                            fontSize: 13
                        }}
                    >{props.waktupengajuan && props.waktupengajuan }</Text>
                </View>
                <View
                    style={{
                        marginTop: 5,
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}
                >
                    <Text
                        style={{
                            color: '#444',
                            width: '20%',
                            fontSize: 13
                        }}
                    >Status </Text>
                    <Text
                        style={{
                            borderRadius: 10,
                            paddingVertical: 2,
                            paddingHorizontal: 10,
                            color: '#fff',
                            backgroundColor: props.status === 0 ? '#e6b907' : (props.status === 1 ? '#6ab1f7' : '#f75c70'),
                            marginTop: 5,
                            fontSize: 13
                        }}
                    >{props.status === 0 ? 'Dalam proses validasi' : (props.status === 1 ? 'Berhasil' : 'Di tolak')}</Text>
                </View>
            </View>
        </Ripple>
    )
}