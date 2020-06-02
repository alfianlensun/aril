import React from 'react'
import {
    View,
    Text,
    StatusBar,
    Image,
    BackHandler,
    PermissionsAndroid
} from 'react-native'
import Logo from '../../assets/icon/icon.png'
import Ripple from 'react-native-material-ripple'
import { Icon } from 'react-native-elements'


export default function PermissionRequest(props){
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
                <Icon 
                    name={'map-pin'}
                    type={'font-awesome'}
                    color={'#fff'}
                    size={50}
                />
                <Text
                    style={{
                        marginTop: 30,
                        color: '#fff',
                        fontSize: 20,
                        fontWeight: 'bold'
                    }}
                >Izin Mengakses Lokasi</Text>
                <Text
                   style={{
                        marginTop: 10,
                        color: '#fff',
                        textAlign: 'center',
                        lineHeight: 20
                   }}
                >Akses lokasi diperlukan untuk mengakses aplikasi ini.</Text>
                <Text
                   style={{
                        color: '#fff',
                        textAlign: 'center',
                        lineHeight: 20
                   }}
                >Tidak adanya akses lokasi akan menyebabkan beberapa fitur tidak dapat di gunakan (Absensi mobile)</Text>
                <Ripple
                    onPress={ async () => {
                        try {
                            const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
                            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                                props.navigation.replace(props.route.params.navigateTo)
                            } else {
                                throw new Error('Location permission denied')
                            }
                        } catch (err) {
                            throw new Error(err)
                        }
                    }}
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
                    >Izinkan aplikasi</Text>
                </Ripple>
                <Ripple
                    onPress={async () => {
                        try {
                            props.navigation.replace(props.route.params.navigateTo)
                        } catch (err) {
                            throw new Error(err)
                        }
                    }}
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
                    >Tidak, lanjutkan tanpa akses lokasi</Text>
                </Ripple>
            </View>
            
        </View>
    )
}