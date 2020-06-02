import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet
} from 'react-native'
import {
    Placeholder,
    PlaceholderMedia,
    PlaceholderLine,
    ShineOverlay
} from "rn-placeholder";
import {screenHeightPercent, screenWidthPercent} from '../../helpers/Layout'

export default class LoaderSliderTindakan extends Component {
    render(){
        return (
            <View
                style={{
                    width: '100%',
                    height: 100,
                    backgroundColor: '#fff',
                    position: 'relative',
                    overflow: 'hidden',
                    borderRadius: 10,
                    alignItems: 'center',
                }}
            >
                <View style={[Styles.backgroundStyles, {
                    bottom: -20,
                    left: -10
                }]}></View>
                <View style={[Styles.backgroundStyles, {
                    top: -20,
                    right: -10
                }]}></View>
                <View
                    style={{
                        width: '100%',
                        overflow: 'hidden'
                    }}
                >
                    <Placeholder
                        Animation={ShineOverlay}
                    >
                        <PlaceholderLine style={{backgroundColor: '#eee', width: '100%', height: '95%'}}/>
                    </Placeholder>
                </View>
            </View>
        )
    }
}

const Styles = new StyleSheet.create({
    backgroundStyles: {
        height: 80,
        width: 80,
        zIndex: 10,
        backgroundColor: 'rgba(255,255,255,.2)',
        borderRadius: 50,
        position: 'absolute'
    },
})
