import React, {Component} from 'react'
import Ripple from 'react-native-material-ripple'
import {
    Text,
    View,
} from 'react-native'
import {Icon} from 'react-native-elements'

export default class ListMenu extends Component{
    constructor(props){
        super(props)
    }

    render(){
        if (this.props.show){
            return(
                <Ripple
                    onPress={this.props.onPress}
                    rippleColor={'rgba(0,0,0,.4)'}
                    style={{
                        borderBottomWidth: 1,
                        borderBottomColor: '#eee',
                        paddingHorizontal: 20,
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
                            width: '10%'
                        }}
                    >
                        <Icon 
                            type={this.props.iconType}
                            name={this.props.icon}
                            size={18}
                            color={'#333'}
                        />
                    </View>
                    <View>
                        <Text
                            style={{
                                color:'#333',
                                fontSize: 14,
                                fontWeight: 'bold'
                            }}
                        >{this.props.title}</Text>
                        <Text
                            style={{
                                color:'#333',
                                marginTop: 2,
                                fontSize: 12
                            }}
                        >{this.props.detail}</Text>
                    </View>
                </Ripple>
            )
        } else {
            return null
        }
    }
}