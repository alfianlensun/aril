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
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import {getVersion} from 'react-native-device-info'

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
                >Waktunya Perbarui aplikasi</Text>
                <Text
                    style={{
                        marginTop: 5,
                        color: '#fff',
                        fontSize: 14,
                        fontWeight: 'bold'
                    }}
                >Versi 1.1.1 telah tersedia</Text>
                <View
                    style={{
                        marginTop: 20,
                        width: '100%',
                        alignItems: 'center'
                    }}
                >
                    <View
                        style={{
                            width: '90%'
                        }}
                    >
                        <Text
                            style={{
                                    color: '#fff',
                                    fontSize:12 ,
                                    lineHeight: 20,
                                    width: '100%',
                                    textAlign: 'justify'
                            }}
                        >
                            Versi aplikasi anda sekarang {getVersion()}, Versi terbaru aplikasi mengandung beberapa perbaikan keamanan aplikasi dan penambahan beberapa fitur
                        </Text>
                    </View>
                </View>
                <Ripple
                    onPress={() => {Linking.openURL("market://details?id=com.simrskandou.kandouone");}}
                    rippleColor={'rgba(106, 177, 247,.5)'}
                    style={{
                        marginTop: 20,
                        width: '40%',
                        paddingHorizontal : 20,
                        paddingVertical: 10,
                        backgroundColor: '#fff',
                        borderRadius: 30,
                        justifyContent: 'center',
                        height: 40,
                        flexDirection: 'row'
                    }}
                >
                    <Text
                        style={{
                            fontWeight: 'bold',
                            color: '#6ab1f7',
                            paddingRight: 5
                        }}
                    >Perbarui</Text>
                    <View
                        style={{
                            paddingTop: 4,
                            height: '100%',
                        }}
                    >
                        <MaterialIcons
                            name="system-update-alt"
                            color="#6ab1f7"
                        />
                    </View>
                </Ripple>
                <Ripple
                    onPress={() => BackHandler.exitApp()}
                    rippleColor={'rgba(255, 255, 255,.5)'}
                    style={{
                        marginTop: 20,
                        width: '40%',
                        paddingHorizontal : 20,
                        paddingVertical: 10,
                        backgroundColor: '#fff',
                        borderRadius: 30,
                        height: 40,
                        alignItems: 'center',
                        position: 'relative',
                        justifyContent: "center",
                        flexDirection: 'row'
                    }}
                >
                    <Text
                        style={{
                            fontWeight: 'bold',
                            color: '#6ab1f7',
                            paddingRight: 5
                        }}
                    >Perbarui nanti </Text>
                    <View
                        style={{
                            paddingTop: 4,
                            height: '100%',
                        }}
                    >
                        <AntDesign
                            name="logout"
                            color="#6ab1f7"
                        />
                    </View>
                </Ripple>
            </View>
            <View
                style={{
                    width: '100%',
                    flexDirection: 'row',
                    paddingHorizontal: 20,
                    paddingBottom: 20,
                }}
            >
                    {/* <AntDesign
                    name="infocirlceo"
                    color="#fff"
                /> */}
                <Text
                    style={{
                            color: '#fff',
                            fontSize:12 ,
                            lineHeight: 20,
                            width: '100%',
                    }}
                >
                    Apabila pilihan update tidak di temukan di PlayStore, silahkan hapus dan install kembali aplikasi
                </Text>
            </View>
        </View>
    )
}