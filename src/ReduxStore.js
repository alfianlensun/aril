import React from 'react'
import RootReducer from './reducers/reducer'
import AsyncStorage from '@react-native-community/async-storage'

const persistConfig= {
    key: 'root',
    storage: AsyncStorage
}