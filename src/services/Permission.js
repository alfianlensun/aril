import {PermissionsAndroid} from 'react-native';
export async function requestPermissionLocation(){
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                title: 'Untuk menjamin anda menggunakan aplikasi di luar RS',
                message: 'Aplikasi ini memerlukan akses location',
                buttonNegative: 'Nanti',
                buttonPositive: 'Terima',
            },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            return true
        } else {
            throw new Error('Location permission denied')
        }
    } catch (err) {
        throw new Error(err)
    }
}