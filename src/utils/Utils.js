import React from 'react'
import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";

export async function checkIfLocationEnabled(){
    let check = await LocationServicesDialogBox.checkLocationServicesIsEnabled({
        message: "Use Location ?",
        ok: "YES",
        cancel: "NO",
        enableHighAccuracy: true, // true => GPS AND NETWORK PROVIDER, false => GPS OR NETWORK PROVIDER
        showDialog: true, // false => Opens the Location access page directly
        openLocationServices: true, // false => Directly catch method is called if location services are turned off
        preventOutSideTouch: false, //true => To prevent the location services window from closing when it is clicked outside
        preventBackClick: false, //true => To prevent the location services popup from closing when it is clicked back button
        providerListener: true // true ==> Trigger "locationProviderStatusChange" listener when the location state changes
    }).catch(error => error);

    return Object.is(check.status, "enabled");   
}