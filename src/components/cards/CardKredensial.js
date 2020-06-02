import React, {Component} from 'react'
import {
    View,
    Text
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Fontisto from 'react-native-vector-icons/Fontisto'
import moment from 'moment'

export default class CardKredensial extends Component{
    constructor(props){
        super(props)
    }
    
    render(){
        return (
            <View
                style={{
                    width: '100%',
                    paddingHorizontal: 20
                }}
            >
                <View
                    style={{
                        width: '100%',
                        borderRadius: 10,
                        overflow: 'hidden'
                    }}
                >
                        <LinearGradient
                        start={{x: 0, y: 0}} 
                        end={{x: 1, y: 0}} 
                        colors={['#7f9cf5', '#667eea', '#5a67d8']} 
                        style={{
                            display: 'flex',
                            paddingHorizontal: 20,
                            paddingVertical: 10,
                            alignItems: 'center',
                            flexDirection: 'row'
                        }}>
                            <View
                                style={{
                                    width: '80%'
                                }}
                            >
                                <Text
                                    style={{
                                        color: '#fff'
                                    }}
                                >Kredential</Text>
                                <Text
                                    style={{
                                        marginTop: 5,
                                        fontSize: 14,
                                        fontWeight: 'bold',
                                        color: '#fff'
                                    }}
                                >{moment(this.props.data.tanggal_kredensial).format('DD MMMM YYYY')}</Text>
                            </View>
                            <View
                                style={{
                                    width: '20%',
                                    alignItems: 'flex-end'
                                }}
                            >
                                <Fontisto name={'key'} color={'#fff'} size={20}/>
                            </View>
                    </LinearGradient>
                </View>
            </View>
        )
    }
}