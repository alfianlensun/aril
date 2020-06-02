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

export default class LoaderTindakanDetail extends Component{
    render(){
        return (
            <View
                style={{
                    width: '100%',
                    height: '100%'
                }}
            >
                <View
                    style={{
                        width: '60%'
                    }}
                >
                    <Placeholder
                        Animation={ShineOverlay}
                    >
                        <PlaceholderLine height={20} style={{borderRadius: 10}}/>
                    </Placeholder>
                </View>
                <View
                    style={{
                        marginTop: 20,
                        flexDirection: 'row',
                        position: 'relative'
                    }}
                >
                    <View
                        style={{
                            width: '30%',
                            justifyContent: 'center'
                        }}
                    >
                        <Placeholder
                            Animation={ShineOverlay}
                        >
                            <PlaceholderLine height={50} width={50} style={{borderRadius: 10}}/>
                        </Placeholder>
                    </View>
                    <View
                        style={{
                            width: '70%',
                            height: 50,
                            position: 'relative',
                            justifyContent: 'center',
                        }}
                    >
                        <View
                            style={{
                                width: '60%',
                            }}
                        >
                            <Placeholder
                                style={{
                                    height: 20,
                                }}
                                Animation={ShineOverlay}
                            >
                                <PlaceholderLine height={20} style={{borderRadius: 10}}/>
                            </Placeholder>
                        </View>
                        <View
                            style={{
                                width: '60%',
                                marginTop: 10
                            }}
                        >
                            <Placeholder
                                style={{
                                    height: 20,
                                }}
                                Animation={ShineOverlay}
                            >
                                <PlaceholderLine height={20} style={{borderRadius: 10}}/>
                            </Placeholder>
                        </View>
                    </View>
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        position: 'relative'
                    }}
                >
                    <View
                        style={{
                            width: '30%',
                            justifyContent: 'center'
                        }}
                    >
                        <Placeholder
                            Animation={ShineOverlay}
                        >
                            <PlaceholderLine height={50} width={50} style={{borderRadius: 10}}/>
                        </Placeholder>
                    </View>
                    <View
                        style={{
                            width: '70%',
                            height: 50,
                            position: 'relative',
                            justifyContent: 'center',
                        }}
                    >
                        <View
                            style={{
                                width: '60%',
                            }}
                        >
                            <Placeholder
                                style={{
                                    height: 20,
                                }}
                                Animation={ShineOverlay}
                            >
                                <PlaceholderLine height={20} style={{borderRadius: 10}}/>
                            </Placeholder>
                        </View>
                        <View
                            style={{
                                width: '60%',
                                marginTop: 10
                            }}
                        >
                            <Placeholder
                                style={{
                                    height: 20,
                                }}
                                Animation={ShineOverlay}
                            >
                                <PlaceholderLine height={20} style={{borderRadius: 10}}/>
                            </Placeholder>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}