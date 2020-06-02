import {combineReducers} from 'redux'
import {ReducerUserLocation, ReducerLocationSetting, ReducerInRangeStatus, ReducerFeatureEnabled} from './ReducerLocation'
import ReducerPermission from './ReducerPermission'

const AllReducer = combineReducers({
    featureEnabled: ReducerFeatureEnabled,
    userLocation: ReducerUserLocation,
    userPermission: ReducerPermission,
    inRangeStatus: ReducerInRangeStatus,
    locationSetting: ReducerLocationSetting
}) 

export default AllReducer