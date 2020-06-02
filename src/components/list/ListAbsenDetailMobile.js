import React, {Component} from 'react'
import {
    Text,
    View
} from 'react-native'
import {Icon} from 'react-native-elements'
import Ripple from 'react-native-material-ripple'
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

export default class ListAbsenDetailMobile extends Component{
    constructor(props){
        super(props)
    }


    render(){
        return (
            <Ripple
                onPress={() => console.log('ok')}
                rippleColor={'rgba(255,255,255,.3)'}
                style={{
                    width: '100%',
                    marginVertical: 4,
                    backgroundColor: '#77baf7',
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
                            <Feather name={'user'} size={20} color={'#fff'}/>
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
                                color: '#fff',
                                fontWeight: 'bold'
                            }}
                        >{this.props.masuk ? 'Masuk' : 'Pulang'}</Text>
                        <Text
                            style={{
                                marginTop: 5,
                                fontSize: 12,
                                color: '#fff',
                            }}
                        >Telah melakukan absen masuk dari mobile app </Text>
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