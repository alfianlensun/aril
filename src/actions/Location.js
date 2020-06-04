import React from 'react'
import Geolocation from 'react-native-geolocation-service';
import GeoFencing from 'react-native-geo-fencing';

export async function checkUserGeofencing(props){
    try {
        const userlocation = await new Promise((rs, rj) => {
            Geolocation.getCurrentPosition((location) => rs(location), (err) => rj(err), {
                enableHighAccuracy: true
            })
        })

        let point = {
            lat: userlocation.coords.latitude,
            lng: userlocation.coords.longitude
        }

        let range = props.locationSetting.map(item => {
            return {
                lat: item.latitude,
                lng: item.longitude
            }
        })

        GeoFencing.containsLocation(point, range)
                    .then((result) => {
                        props.setInRangeStatus(true)
                    })
                    .catch((err) => {
                        console.log('out')
                        // props.setInRangeStatus(false)
                        props.setInRangeStatus(false)
                    })
    } catch(err){
        throw new Error(err.message)
    }
}