import React , {Component} from "react";
import { 
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from "react-native";
import {screenWidthPercent, screenHeightPercent} from '../../helpers/Layout'
import {Icon} from 'react-native-elements'
import Ripple from 'react-native-material-ripple'



class BarcodeScannerContainer extends Component {
    constructor(props){
        super(props)
    }

    render(){
        return (
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',                                                                                    
                }}
            >
                
                <View
                    style={{
                        zIndex: 21,
                        width: '100%',
                        position: 'absolute',
                        top: screenHeightPercent(8),
                        paddingLeft: 10
                    }}
                >
                    <Ripple
                        onPress={() => this.props.navigation.goBack(null)}
                        style={{
                            height: 50,
                            width: 50,
                            borderRadius: 50,
                            overflow: 'hidden',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                        rippleColor={'rgba(255,255,255,.5)'}
                    >
                        <Icon 
                            type={'ionicons'}
                            name={'arrow-back'}
                            color={'#fff'}
                            size={24}
                        />
                    </Ripple>
                    <View
                        style={{
                            alignItems: 'center',
                            paddingTop: screenHeightPercent(5)
                        }}
                    >
                        <Text style={{color : '#fff', fontSize : 14}}>Silahkan Scan Barcode / QR Code</Text>
                    </View>
                </View>       
                
                <View 
                    style={{                                              
                        width : screenWidthPercent(100),
                        height : '100%',
                        position: 'absolute',
                        backgroundColor : 'transparent',
                        borderLeftColor: 'rgba(0, 0, 0, .6)',
                        borderRightColor: 'rgba(0, 0, 0, .6)',
                        borderTopColor: 'rgba(0, 0, 0, .6)',
                        borderBottomColor: 'rgba(0, 0, 0, .6)',
                        borderLeftWidth: screenWidthPercent(10),
                        borderRightWidth: screenWidthPercent(10),
                        borderTopWidth: screenWidthPercent(60),
                        borderBottomWidth: screenWidthPercent(60),                        
                        zIndex : 1
                    }}
                >
                    <View style={styles.leftTop}></View>
                    <View style={styles.leftBottom}></View>
                    <View style={styles.rightTop}></View>
                    <View style={styles.rightBottom}></View>                    
                </View>       
                <View
                    style={{
                        bottom: 0,
                        zIndex: 10,
                        width: '100%',
                        height: screenHeightPercent(20),
                        position: 'absolute',
                        justifyContent: 'center',
                        flexDirection: 'row',
                    }}
                >
                    <Ripple
                        onPress={this.props.handleFlash}
                        rippleColor={'rgba(255,255,255,.4)'}
                        style={{
                            height: 100,
                            width: 100,
                            justifyContent: 'center',
                            alignItems: 'center',
                            overflow: 'hidden',
                            marginHorizontal: 20
                        }}
                    >
                        <View>
                            <Icon 
                                type={'ionicons'}
                                name={'flash-on'}
                                color={'#fff'}
                                size={30}
                            />
                        </View>
                        <View
                            style={{
                                width: '100%'
                            }}
                        >
                            <Text
                                style={{
                                    textAlign: 'center',
                                    color: '#fff',
                                    fontSize: 12
                                }}
                            >Flash</Text>
                        </View>
                    </Ripple>
                    {this.props.inputButton !==false && <Ripple
                        onPress={this.props.onPressInput && this.props.onPressInput}
                        rippleColor={'rgba(255,255,255,.4)'}
                        style={{
                            height: 100,
                            width: 100,
                            justifyContent: 'center',
                            alignItems: 'center',
                            overflow: 'hidden',
                            marginHorizontal: 20
                        }}
                    >
                        <View>
                            <Icon 
                                type={'ionicons'}
                                name={'keyboard'}
                                color={'#fff'}
                                size={30}
                            />
                        </View>
                        <View
                            style={{
                                width: '100%'
                            }}
                        >
                            <Text
                                style={{
                                    textAlign: 'center',
                                    color: '#fff',
                                    fontSize: 12
                                }}
                            >Input</Text>
                        </View>
                    </Ripple> }
                </View>                                         
            </View>                    
        )
    }
}

// handleCancelPress

export default  BarcodeScannerContainer

const styles  = StyleSheet.create({
    leftTop : {
        position : 'absolute',
        top : 0,
        height : 20,
        width : 20,
        borderTopWidth : 2,
        borderLeftWidth : 2,
        borderLeftColor : '#fff',        
        borderTopColor : '#fff',
        borderTopLeftRadius : 10,
    },
    leftBottom : {
        position : 'absolute',
        bottom : 0,
        height : 20,
        width : 20,
        borderBottomWidth : 2,
        borderLeftWidth : 2,        
        borderLeftColor : '#fff',        
        borderBottomColor : '#fff',
        borderBottomLeftRadius : 10,
    },
    rightTop : {
        position : 'absolute',
        top : 0,
        right : 0,
        height : 20,
        width : 20,
        borderTopWidth : 2,
        borderRightWidth : 2,
        borderRightColor : '#fff',        
        borderTopColor : '#fff',
        borderTopRightRadius : 10,
    },
    rightBottom : {
        position : 'absolute',
        bottom : 0,
        right : 0,
        height : 20,
        width : 20,
        borderBottomWidth : 2,
        borderRightWidth : 2,
        borderRightColor : '#fff',        
        borderBottomColor : '#fff',
        borderBottomRightRadius : 10,
    }
})