import React from 'react'
import {
    View,
    Text
} from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ripple from 'react-native-material-ripple'
import { ripple_color_primary } from '../../themes/Default'

export default function ListCardUnitKerja(props){
    return(
        <Ripple
            onPress={() => props.navigation.navigate('MonitoringAbsen', {unitKerja: props.items})}
            rippleColor={ripple_color_primary}
            style={{
                backgroundColor: '#fff',
                width: '100%',
                overflow: 'hidden',
                borderRadius: 10,
                marginVertical: 5,
                paddingVertical: 10,
                paddingHorizontal: 10,
                flexDirection: 'row'
            }}
        >
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center'
                }}
            >
                <Text
                    style={{
                        color: "#222"
                    }}
                >
                    {props.items.nama_unit_kerja}
                </Text>
            </View>
            <View
                style={{
                    width: '20%',
                    alignItems: 'flex-end'
                }}
            >
                <MaterialIcons name="chevron-right" size={30} color={'#333'}/>
            </View>
        </Ripple>
    )
}