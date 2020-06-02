import React, { Component } from 'react'
import {
    View,
    Text,
    StatusBar,
    ImageBackground
} from 'react-native'
import { background_color, icon_color_primary, shadow } from '../../../themes/Default'
import Ripple from 'react-native-material-ripple'
import { screenHeightPercent } from '../../../helpers/Layout'
import { Icon } from 'react-native-elements'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { TextInput } from 'react-native-gesture-handler'
import io from 'socket.io-client'
import {getData} from '../../../services/LocalStorage'

export default class ChatDetail extends Component{
    constructor(props){
        super(props)
        this.state = {
            userdetail: null,
            message: ''
        }
    }

    async componentDidMount(){
        try {
            this.setState({
                userdetail: await getData('AuthUser')
            })
            this.socket = io("http://172.31.64.112:4001/webrtcPeer",{
                query: {}
            });
        }catch(err){
            alert(err.message)
        }
    }

    render(){
        return(
            <View
                style={{
                    flex: 1,
                    position: 'relative',
                    backgroundColor: '#fff'
                }}
            >
                <StatusBar translucent backgroundColor="transparent" barStyle="dark-content"/>
                <View
                    style={[{
                        width: '100%',
                        height: screenHeightPercent(14),
                        flexDirection: 'row',
                        alignItems: 'flex-end',
                        backgroundColor: '#fff',
                        position: 'relative',
                        paddingBottom: 5,
                        paddingHorizontal: 10
                    }, shadow]}
                >
                    <View
                        style={{
                            height: 70,
                            width: '100%',
                            flexDirection: 'row',
                            justifyContent: 'center',
                        }}
                    >
                        <View
                            style={{
                                width: '50%',
                                height: '100%',
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}
                        >
                            <Ripple
                                rippleColor={'rgba(0,0,0,.3)'}
                                onPress={() => this.props.navigation.goBack()}
                                style={{
                                    height: 50,
                                    width: 50,
                                    overflow:'hidden',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius: 30
                                }}
                            >
                                <Icon
                                    type={'ionicons'}
                                    name={'arrow-back'}
                                    color={icon_color_primary}
                                    size={30}
                                />
                            </Ripple>
                            <Ripple
                                style={{
                                    height: 40,
                                    width: 40,
                                    marginLeft: 10,
                                    overflow:'hidden',
                                    borderRadius: 30
                                }}
                            >
                                {/* {uri: props.uri} */}
                                <ImageBackground
                                    source={require('../../../../assets/background/profiltes.jpg')}
                                    style={{
                                        height: '100%',
                                        width:'100%',
                                        backgroundColor: '#eee'
                                    }}
                                >

                                </ImageBackground>
                            </Ripple>
                            <View
                                style={{
                                    paddingLeft: 10
                                }}
                            >
                                <Text
                                    style={{
                                        fontWeight: 'bold'
                                    }}
                                >Alfian Ric...</Text>
                                <Text
                                    style={{
                                        fontSize:12,
                                        color: '#333'
                                    }}
                                >Active Now</Text>
                            </View>
                        </View>
                        <View
                            style={{
                                width: '50%',
                                paddingRight: 10,
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'flex-end'
                            }}
                        >   
                            <Ripple
                                onPress={() => {
                                    this.socket.emit('call', {
                                        senderSocketID: this.socket.id,
                                        sender: this.state.userdetail._id,
                                        receiver: '5eafa3a31f69736ca1997767'
                                    })
                                    this.props.navigation.navigate('VideoCall')
                                }}
                                style={{
                                    height: 40,
                                    width: 40,
                                    marginLeft: 10,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    overflow:'hidden',
                                    borderRadius: 30
                                }}
                            >
                                {/* {uri: props.uri} */}
                                <Ionicons name={'ios-videocam'} size={25} color={icon_color_primary}/>
                            </Ripple>
                        </View>
                    </View>
                </View>
                <View
                    style={{
                        flex: 1
                    }}
                >
                    {/* chat place */}
                    <View
                        style={{
                            width: '100%',
                            alignItems: 'flex-end',
                            padding: 10
                        }}
                    >
                        <View
                            style={{
                                backgroundColor: icon_color_primary,
                                borderRadius: 30,
                                padding: 10,
                            }}
                        >
                            <Text
                                style={{
                                    color: '#fff'
                                }}
                            >Hallo</Text>
                        </View>
                    </View>
                    <View
                        style={{
                            width: '100%',
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            padding: 10
                        }}
                    >
                        
                        <View
                            style={{
                                backgroundColor: icon_color_primary,
                                borderRadius: 30,
                                padding: 10,
                            }}
                        >
                            <Text
                                style={{
                                    color: '#fff'
                                }}
                            >wkwkwkwk...:'v</Text>
                        </View>
                    </View>
                </View>
                <View
                    style={{
                        height: 70,
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingHorizontal: 10,
                        width: '100%',
                    }}
                >
                    <View
                        style={{
                            flex: 1,
                            backgroundColor: background_color,
                            borderRadius: 30,
                        }}
                    >
                        <TextInput
                            onSubmitEditing={() => {
                                
                            }}
                            onChangeText={(message) => {
                                
                            }}
                            style={{
                                width: '100%',
                                height: 50,
                                fontSize: 16,
                                paddingHorizontal: 20,
                            }}
                            value={this.state.message}
                            placeholder="Aa"
                            placeholderTextColor="#aaa"
                        />
                    </View>
                    <View
                        style={{
                            width: 50
                        }}
                    >
                        <Ripple
                            style={{
                                width: 50,
                                height: 50,
                                borderRadius: 30,
                                overflow: 'hidden',
                                justifyContent: 'center',
                                alignItems: "center",
                                backgroundColor: '#fff'
                            }}
                        >
                            <Ionicons name={'md-send'} size={30} color={icon_color_primary}/>
                        </Ripple>
                    </View>
                </View>
            </View>
        )
    }
}