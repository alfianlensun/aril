import { Dimensions } from "react-native";
export function screenWidthPercent(percent){
    const screenWidth = Math.round(Dimensions.get('window').width);
    sc = screenWidth * percent / 100
    return sc;
}

export function screenHeightPercent(percent){
    const screenHeight = Math.round(Dimensions.get('window').height);
    sc = screenHeight * percent / 100
    return sc;
}