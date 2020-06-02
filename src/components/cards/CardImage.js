import React from 'react'
import {
    View,
    Image,
    Text
} from 'react-native'

export default function CardImage(props){
    return (
        <View
            style={{
                borderRadius: 10,
                width: props.width ? props.width : '100%',
                height: props.height ? props.height : '100%',
                overflow: 'hidden',
                marginHorizontal: 5
            }}
        >
            {props.uri &&
                <Image source={{uri: props.uri}}
                    style={{
                        width: '100%',
                        height: '100%'
                    }}
                />
            }
        </View>
    )
}