import React, {Component} from 'react'
import {
    View,
    Text
} from 'react-native'
import {Icon} from 'react-native-elements'
import {getData} from '../../services/LocalStorage'
import {bottom_navigation_background, shadowxl, icon_color_primary, icon_color_secondary,icon_color_white,ripple_color_primary, shadow} from '../../themes/Default'
import Ripple from 'react-native-material-ripple'
import Feather from 'react-native-vector-icons/Feather'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

export default class NavigationBottom extends Component{
    constructor(props){
        super(props)
        this.state = {
            activeTab: 0,
            detailuser: null,
        }
    }

    onChange = (index) => {
        this.props.changeActiveTab(index)
    }

    render(){
        const {activeTab} = this.props
        return (
                <View
                    style={[{
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        overflow: 'hidden',
                        backgroundColor: bottom_navigation_background,
                        height:60,
                        flexDirection: 'row'
                    }, shadowxl]}
                >
                    <Ripple
                        onPress={() => this.onChange(1)}
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                        rippleColor={ripple_color_primary}
                    >
                        <View
                            style={{
                                height: 50,
                                width: 50,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 50,
                                backgroundColor: activeTab === 1 ? icon_color_secondary : 'transparent'
                            }}
                        >
                            <AntDesign name="home" color={activeTab === 1 ? icon_color_white : icon_color_primary} size={25}/>
                        </View>
                    </Ripple>
                    <Ripple
                        onPress={() => this.onChange(2)}
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                        rippleColor={ripple_color_primary}
                    >
                        <View
                            style={{
                                height: 50,
                                width: 50,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 50,
                                backgroundColor: activeTab === 2 ? icon_color_secondary : 'transparent'
                            }}
                        >
                            <Feather name="bell" color={activeTab === 2 ? icon_color_white : icon_color_primary} size={25}/>
                        </View>
                    </Ripple>
                    <Ripple
                        onPress={() => this.onChange(3)}
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                        rippleColor={ripple_color_primary}
                    >
                        <View
                            style={{
                                height: 50,
                                width: 50,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 50,
                                backgroundColor: activeTab === 3 ? icon_color_secondary : 'transparent'
                            }}
                        >
                            <Feather name="user" color={activeTab === 3 ? icon_color_white : icon_color_primary} size={25}/>
                        </View>
                    </Ripple>
                </View>
        )
    }
}