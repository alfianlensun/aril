export const setUserLocation = (location) => {
    return {
        type: 'SET_USER_LOCATION',
        payload: location
    }
}


export const setLocationSetting = (locationSetting) => {
    return {
        type: 'SET_LOCATION_SETTING',
        payload: locationSetting
    }
}

export const setInRangeStatus = (status) => {
    return {
        type: 'SET_IN_RANGE_STATUS',
        payload: status
    }
}

export const setFeatureEnabled = (features) => {
    return {
        type: 'SET_FEATURE_ENABLED',
        payload: features
    }
}