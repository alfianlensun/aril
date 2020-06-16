import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    ImageBackground
} from 'react-native'
import { text_color_default, icon_color_primary, background_color_gradient } from '../../themes/Default';
import LinearGradient from 'react-native-linear-gradient';

export default class CardMenu extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return (
            <View 
                style={[{
                    width: 65,
                    justifyContent: 'center',
                    alignItems: 'center'
                }]}
            >
                <LinearGradient 
                    start={{x: 0, y: 0}} 
                    end={{x: 2, y: 0}} 
                    colors={background_color_gradient}
                    style={{
                        width: 50, 
                        height: 50,
                        overflow: 'hidden',
                        borderRadius: 50,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                    {this.props.icon}
                </LinearGradient>
                <Text 
                    style={{
                        marginTop: 10,
                        fontSize: 12,
                        textAlign: 'center',
                        color: text_color_default
                    }}
                >{this.props.title}</Text>      
            </View>
        )
    }
}

const Style = new StyleSheet.create({
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 2.84,
        elevation: 1,
    }
})