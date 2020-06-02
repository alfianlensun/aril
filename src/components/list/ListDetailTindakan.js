import React, {Component} from 'react'
import {
    View,
    Text,
} from 'react-native'
import {Icon} from 'react-native-elements'

export default class ListDetailTindakan extends Component{
    render(){
        return(
            <View
                style={{
                    width: '100%',
                    height: 60,
                    position: 'relative',
                    alignItems: 'center',
                    flexDirection: 'row'
                }}
            >
                <View
                    style={{
                        paddingRight: 20,
                        paddingLeft: 5,
                        height: '100%',
                        justifyContent: 'center'
                    }}
                >
                    
                    <Icon 
                        type={'font-awesome'}
                        name={'calendar'}
                        color={'#444'}
                        size={16} 
                    />
                </View>
                <View
                    style={{
                        height: '100%',
                        justifyContent: 'center',
                        width: 'auto'
                    }}
                >
                    <View
                        style={{
                            paddingTop: 5,
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 14,
                                fontWeight: 'bold',
                                color: '#444'
                            }}
                        >{this.props.label}</Text>
                        <Text
                            style={{
                                paddingTop: 5,
                                color: '#444',
                                fontSize: 12
                            }}
                        >{this.props.value}</Text>
                    </View>
                </View>
            </View>
        )
    }
}