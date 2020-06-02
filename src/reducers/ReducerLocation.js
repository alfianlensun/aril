let initialStateLocation =  {
    latitude: 1.456508,
    longitude: 124.809054
}


export function ReducerUserLocation(state = initialStateLocation, action){
    switch (action.type) {
        case "SET_USER_LOCATION":
            return action.payload;
            break;
    }
    return state
} 

export function ReducerLocationSetting(state = [], action){
    switch (action.type) {
        case "SET_LOCATION_SETTING":
            return action.payload;
            break;
    }
    return state
} 

export function ReducerInRangeStatus(state = false, action){
    switch (action.type) {
        case "SET_IN_RANGE_STATUS":
            return action.payload;
            break;
    }
    return state
}

export function ReducerFeatureEnabled(state = [], action){
    switch (action.type) {
        case "SET_FEATURE_ENABLED":
            return action.payload;
            break;
    }
    return state
}