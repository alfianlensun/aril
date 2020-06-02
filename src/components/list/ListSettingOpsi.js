import React from 'react'
import {
    View,
    Text
} from 'react-native'
import ToggleSwitch from 'toggle-switch-react-native'
import Ripple from 'react-native-material-ripple'
export default function ListSettingOpsi(props){
    return (
        <Ripple
            onPress={props.onPress && props.onPress}
            rippleColor={'rgba(0,0,0,.4)'}
            style={{
                paddingHorizontal: 20,
                marginTop: 10,
                height: 60,
                position: 'relative'
            }}
        >
            <View
                style={{
                    width: '100%',
                    height: '100%',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderBottomWidth: 1,
                    borderBottomColor: '#ccc',
                }}
            >
                <View
                    style={{
                        width: '80%'
                    }}
                >
                    <Text
                        style={{
                            color: '#444',
                            fontWeight: 'bold'
                        }}
                    >{props.title && props.title}</Text>
                    {props.detail &&
                        <Text
                            style={{
                                color: '#444',
                                fontSize: 12,
                                marginTop: 2
                            }}
                        >{props.detail && props.detail}</Text>
                    }
                    
                </View>
                <View
                
                    style={{
                        width: '20%'
                    }}
                >
                    <ToggleSwitch
                        isOn={props.isOn ? props.isOn : false}
                        onColor="#6ab1f7"
                        offColor="#eee"
                        labelStyle={{ color: "black", fontWeight: "900" }}
                        size="medium"
                        onToggle={props.onToggle && props.onToggle}
                    />
                </View>
            </View>
        </Ripple>
    )
}