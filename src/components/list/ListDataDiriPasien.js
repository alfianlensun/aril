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
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 10,
                    height: 70,
                    position: 'relative'
                }}
            >
                <View
                    style={{
                        alignItems: 'flex-start',
                        width: '15%',
                        paddingHorizontal: 10
                    }}
                >
                    <Icon 
                        type={this.props.iconType ? this.props.iconType : 'font-awesome'}
                        name={this.props.icon ? this.props.icon : 'chevron-circle-right'}
                        size={18}
                        color={'#444'}
                    /> 
                </View>
                <View>
                    <Text
                        style={{
                            color: '#333',
                            fontSize: 14,
                            fontWeight: 'bold'
                        }}
                    >{this.props.title}</Text>
                    <View
                        style={{
                            marginTop: 5,
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}
                    >
                        {this.props.badge ? 
                            <Text
                                style={{
                                    fontSize: 11,
                                    backgroundColor: '#6ab1f7',
                                    color: '#fff',
                                    marginRight: 5,
                                    paddingHorizontal: 5,
                                    paddingVertical: 2,
                                    borderRadius: 5
                                }}
                            >
                                {this.props.badge}
                            </Text> : 
                            null
                        }
                        <Text
                            style={{
                                marginTop: 2,
                                fontSize: 12
                            }}
                        >{this.props.value}</Text>
                    </View>
                </View>
            </Ripple>
        )
    }
}