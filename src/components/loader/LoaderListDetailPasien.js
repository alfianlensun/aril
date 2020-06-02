import React, {Component} from 'react'
import {
    Text,
    View
} from 'react-native'
import {
    Placeholder,
    PlaceholderMedia,
    PlaceholderLine,
    ShineOverlay
} from "rn-placeholder";

export default class LoaderListDetailPasien extends Component{
    render(){
        return (
            <View>
                <Placeholder
                    style={{
                        height: 20,
                    }}
                    Animation={ShineOverlay}
                >
                    <PlaceholderLine height={20} style={{borderRadius: 10}}/>
                </Placeholder>
            </View>
        )
    }
}