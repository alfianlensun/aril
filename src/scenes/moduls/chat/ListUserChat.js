import React, {Component} from 'react'
import {
    View,
    Text,
    StatusBar,
    ImageBackground
} from 'react-native'
import Ripple from 'react-native-material-ripple'
import { background_color, icon_color_primary } from '../../../themes/Default'
import {Icon} from 'react-native-elements'
import { screenHeightPercent } from '../../../helpers/Layout'
import { TextInput } from 'react-native-gesture-handler'
import Feather from 'react-native-vector-icons/Feather'
import Entypo from 'react-native-vector-icons/Entypo'
import ListChat from '../../../components/list/ListChat'
export default class ListUserChat extends Component{
    constructor(props){
        super(props)
        this.state = {
            userdetail: null
        }
    }

    componentDidMount(){

    }

    getListUser(){
        
    }

    render(){
        return(
            <View
                style={{
                    flex: 1,
                    position: 'relative',
                    backgroundColor: background_color
                }}
            >
                <StatusBar translucent backgroundColor="transparent" barStyle="dark-content"/>
                <View
                    style={{
                        width: '100%',
                        height: screenHeightPercent(14),
                        flexDirection: 'row',
                        alignItems: 'flex-end',
                        backgroundColor: '#fff',
                        position: 'relative',
                        paddingBottom: 5,
                        paddingHorizontal: 20
                    }}
                >
                    <View
                        style={{
                            height: 70,
                            width: '100%',
                            flexDirection: 'row',
                            justifyContent: 'center'
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
                                onPress={() => this.props.navigation.goBack()}
                                style={{
                                    height: 40,
                                    width: 40,
                                    overflow:'hidden',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius: 30
                                }}
                            >
                                <Icon 
                                    type={'ionicons'}
                                    name={'arrow-back'}
                                    color={'#444'}
                                    size={24}
                                />
                            </Ripple>
                            <Text
                                style={{
                                    fontWeight: 'bold',
                                    color: '#333',
                                    paddingLeft: 10,
                                    fontSize: 20
                                }}
                            >Chats</Text>
                        </View>
                        <View
                            style={{
                                width: '50%',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'flex-end'
                            }}
                        >   
                            <Ripple
                                style={{
                                    height: 40,
                                    width: 40,
                                    overflow:'hidden',
                                    borderRadius: 20
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
                        </View>
                    </View>
                </View>
                <View
                    style={{
                        backgroundColor: '#fff',
                        flex: 1,
                        position: 'relative',
                    }}
                >
                    <View
                        style={{
                            width: '100%',
                            height: 50,
                            paddingHorizontal: 20
                        }}
                    >
                        <View
                            style={{
                                width: '100%',
                                backgroundColor: background_color,
                                borderRadius: 30,
                                flexDirection: 'row',
                                height: 50
                            }}
                        >
                            <View
                                style={{
                                    width: 50,
                                    height:'100%',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                            >
                                <Feather name={'search'} size={20} color={'#333'}/>
                            </View>
                            <TextInput
                                onSubmitEditing={() => {
                                    
                                }}
                                onChangeText={(text) => {
                                    
                                }}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    fontSize: 16,
                                    paddingHorizontal: 10
                                }}
                                value={this.state.IDTelegram}
                                placeholder="Cari"
                                placeholderTextColor="#aaa"
                            />
                        </View>
                    </View>
                    <View
                        style={{
                            marginTop: 20,
                            height: 50,
                            width: '100%',
                            paddingHorizontal: 20,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <Ripple
                            rippleColor={'rgba(0,0,0,.3)'}
                            style={{
                                width: '50%',
                                height: 40,
                                overflow: 'hidden',
                                alignItems: 'center',
                                paddingHorizontal: 20,
                                borderRadius: 30,
                                justifyContent: 'center',
                                backgroundColor: background_color
                            }}
                        >
                            <Text
                                style={{
                                    fontWeight: 'bold',
                                    color: '#333'
                                }}
                            >Aktif (25)</Text>
                        </Ripple>
                        <Ripple
                            rippleColor={'rgba(0,0,0,.3)'}
                            style={{
                                overflow: 'hidden',
                                width: '50%',
                                height: 40,
                                alignItems: 'center',
                                paddingHorizontal: 20,
                                borderRadius: 30,
                                justifyContent: 'center',
                                backgroundColor: '#fff'
                            }}
                        >
                            <Text
                                style={{
                                    fontWeight: 'bold',
                                    color: '#333'
                                }}
                            >Semua</Text>
                        </Ripple>
                    </View>
                    <View
                        style={{
                            flex: 1,
                            paddingTop: 10,
                        }}
                    >
                        <ListChat navigate_to={'ChatDetail'} {...this.props}/>
                    </View>
                </View>
            </View>
        )
    }
}