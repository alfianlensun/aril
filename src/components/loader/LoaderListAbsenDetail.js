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

export default class LoaderListAbsenDetail extends Component {
    render(){
        return (
            <View>
                <View
                    style={{
                        width: '90%',
                        height: 50,
                        alignSelf: 'center',
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
                <View
                    style={{
                        width: '90%',
                        height: 50,
                        alignSelf: 'center',
                        backgroundColor: '#fff',
                        position: 'relative',
                        marginTop: 10,
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
