import React from 'react'
import {
    View,
    Text,
    StatusBar,
    Image,
    BackHandler,
    Linking
} from 'react-native'
import Logo from '../../assets/icon/icon.png'
import Ripple from 'react-native-material-ripple'


export default function UpdateApp(props){
    return(
        <View 
            style={{
                flex: 1,
                overflow: 'hidden',
                position: 'relative',
                backgroundColor: '#6ab1f7',
            }}
        >
            <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Image 
                    style={{
                        height: 100,
                        width: 100
                    }}
                    source={Logo}  
                />
                <Text
                    style={{
                        marginTop: 30,
                        color: '#fff',
                        fontSize: 20,
                        fontWeight: 'bold'
                    }}
                >Time to update</Text>
                <Text
                   style={{
                        marginTop: 10,
                        color: '#fff',
                        textAlign: 'center',
                        lineHeight: 20
                   }}
                >We added lots of new features and fix some bugs to make your experience as smooth as posible</Text>
                <Ripple
                    onPress={() => {Linking.openURL("market://details?id=com.whatsapp");}}
                    rippleColor={'rgba(106, 177, 247,.5)'}
                    style={{
                        marginTop: 20,
                        paddingHorizontal : 20,
                        paddingVertical: 10,
                        backgroundColor: '#fff',
                        borderRadius: 30,
                        
                    }}
                >
                    <Text
                        style={{
                            fontWeight: 'bold',
                            color: '#6ab1f7'
                        }}
                    >Update Now</Text>
                </Ripple>
                <Ripple
                    onPress={() => BackHandler.exitApp()}
                    rippleColor={'rgba(255, 255, 255,.5)'}
                    style={{
                        marginTop: 20,
                        paddingHorizontal : 20,
                        paddingVertical: 5,
                        
                    }}
                >
                    <Text
                        style={{
                            color: '#fff',
                            fontWeight: '500'
                        }}
                    >No Thanks, Close the app</Text>
                </Ripple>
            </View>
            
        </View>
    )
}