import AsyncStorage from '@react-native-community/async-storage';

export async function storeData(key, objectData){
    try {
        let getData = await AsyncStorage.getItem(key);
        await AsyncStorage.setItem(key, JSON.stringify(objectData))
        return getData
    } catch (err){
        throw new Error(err)
    }
}

export async function getData(key){
    try {
        let getData = await AsyncStorage.getItem(key);
        return getData !== null ? JSON.parse(getData) : null
    } catch (err){
        throw new Error(err)
    }
}


export async function removeData(key){
    try {
        await AsyncStorage.removeItem(key)
        return []
    
    } catch (err){
        throw new Error(err)
    }
}

export async function clearData(){
    try {
        await AsyncStorage.clear()
        return []
    } catch (err){
        throw new Error(err)
    }
}