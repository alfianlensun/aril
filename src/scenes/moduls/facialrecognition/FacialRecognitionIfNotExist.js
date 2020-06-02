import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    Image,
    FlatList,
    RefreshControl,
    TextInput,
    ImageBackground
} from 'react-native'
import {screenHeightPercent, screenWidthPercent} from '../../../helpers/Layout'
import { getData, clearData } from '../../../services/LocalStorage'
import {Icon} from 'react-native-elements'
import Ripple from 'react-native-material-ripple'

export default class FacialRecognitionIfNotExist extends Component{
    constructor(props){
        super(props)
        this.state = {
            loginFaceData: false,
            faceDataExist: false
        }
    }

    render(){
        return (
            <View 
                style={{
                    flex: 1,
                    overflow: 'hidden',
                    position: 'relative',
                    backgroundColor: '#e1f7fa',
                }}
            >
                <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
                <View style={Styles.header}></View>
                <View
                    style={{
                        height: screenHeightPercent(10),
                        paddingHorizontal: 10,
                        paddingVertical : 10,
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}
                >

                    <Ripple
                        onPress={() => this.props.navigation.goBack(null)}
                        style={{
                            height: 30,
                            width: 30,
                            borderRadius: 50,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                        rippleColor={'rgba(0,0,0,.5)'}
                    >
                        <Icon 
                            type={'ionicons'}
                            name={'arrow-back'}
                            color={'#444'}
                            size={24}
                        />
                    </Ripple>
                </View>
                <View 
                    style={{
                        width: '100%',
                        height: '100%',
                        marginTop: 20,
                        alignItems: 'center',
                        paddingVertical: 10,
                        position: 'relative',
                    }}
                >   
                    <Text
                        style={{
                            fontSize: 16,
                            fontWeight: 'bold',
                            color: '#333'
                        }}
                    >
                        Add 2D Face Data
                    </Text>
                    <View
                        style={{
                            marginTop: 30,
                            width: screenWidthPercent(50),
                            height: screenWidthPercent(50),
                            borderRadius: 50,
                        }}
                    >
                        <ImageBackground
                            source={require('../../../../assets/background/facerecognition_information.png')} style={{width: '100%', height: '100%'}}>
                        </ImageBackground>
                    </View>   
                    <View
                        style={{
                            paddingTop: 40,
                            width: screenWidthPercent(80)
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 14,
                                color: '#444',
                                textAlign: 'left',
                                lineHeight: 20
                            }}
                        >
                            Make sure all part of your face aren`t covered by object and clearly visible. Your face should be well-lit as well
                        </Text>
                        <Ripple
                            style={{
                                marginTop: 20,
                                width: '100%',
                            }}
                            onPress={() => {this.props.navigation.replace('FacialRecognitionDaftar')}}
                            rippleColor={'rgba(255,255,255,.5)'}
                        >
                            <View style={{
                                backgroundColor: '#6ab1f7',
                                width: '100%',
                                paddingVertical: 15,
                                borderRadius: 50,
                                position: 'relative',
                                justifyContent: 'center',
                                alignItems: 'center'

                            }}>
                                <Text style={{color: '#fff'}}>Next</Text>
                            </View>
                        </Ripple> 
                    </View>
                </View>
            </View>
        )
    }
}

const Styles = new StyleSheet.create({
    container: {
        flex : 1,
    },
    containerWrapper:{
        width: '100%',
        justifyContent: 'center' 
    },
    header: {
        backgroundColor: '#e1f7fa',
        height: screenHeightPercent(5)
    },
    headerBackground: {
        overflow: 'hidden',
        backgroundColor: '#555',
        top: 0,
        left: 0,
        width: '100%',
        height: screenHeightPercent(30),
        borderBottomLeftRadius: 50
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 2.84,
        elevation: 2,
    },
    formTextInput: {
        height: '100%',
        color: '#444'
    }
})