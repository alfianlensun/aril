import React, {Component} from 'react'
import {
    Text,
    View
} from 'react-native'
import {Icon} from 'react-native-elements'
import Ripple from 'react-native-material-ripple'

export default class ListAbsenDetail extends Component{
    constructor(props){
        super(props)
    }


    render(){
        return (
            <Ripple
                rippleColor={'rgba(255,255,255,.3)'}
                style={{
                    width: '100%',
                    marginVertical: 4,
                    backgroundColor: '#77baf7',
                    paddingVertical: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderRadius: 10,
                    position:'relative',
                    height: 55
                }}
            >
                <View
                    style={{
                        paddingHorizontal: 20,
                        height: '100%',
                        width: '20%',
                        justifyContent: 'center'
                    }}
                >
                    <Icon 
                        type={'font-awesome'}
                        name={this.props.masuk ? 'sign-in' : 'sign-out'}
                        color={'#fff'}
                        size={14} 
                    />
                </View>
                <View
                    style={{
                        width: '60%',
                        height: '100%',
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}
                >
                    <Text
                        style={{
                            fontWeight: 'bold',
                            color: '#fff'
                        }}
                    >{this.props.masuk ? 'Masuk' : 'Pulang'}</Text>
                       
                </View> 
                <View
                    style={{
                        width: '20%',
                        height: '100%',
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}
                >
                    <Text
                        style={{
                            fontWeight: 'bold',
                            color: '#fff'
                        }}
                    >{this.props.jam}</Text>
                       
                </View> 
            </Ripple>
        )
    }
}