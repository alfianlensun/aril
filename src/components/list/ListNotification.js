import React, {Component} from 'react'
import {
    Text,
    View
} from 'react-native'
import {Icon} from 'react-native-elements'
import Ripple from 'react-native-material-ripple'
import {manageAutoNavigate} from '../../actions/PushNotification'
import {changeStatusBaca} from '../../services/ServiceNotifikasi'

export default class ListNotification extends Component{
    constructor(props){
        super(props)
    }

    
    statusBaca(ID){
        this.props.setDibaca()
        changeStatusBaca(ID)
    }

    manageNavigate = () => {
        manageAutoNavigate(this.props.data.auto_load_menu, this.props)
    }

    render(){
        return (
            <Ripple
                key={this.props.data._id}
                onPress={() => {
                    this.manageNavigate()
                    this.statusBaca(this.props.data._id)
                }}
                rippleColor={this.props.data.status.read ? 'rgba(0,0,0,.3)' : 'rgba(255,255,255,.3)'}
                style={{
                    width: '100%',
                    marginVertical: 4,
                    backgroundColor: this.props.data.status.read ? '#fff' : 'rgba(73, 166, 252,1)',
                    paddingVertical: 15,
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderRadius: 10,
                    position:'relative',
                    height: 100
                }}
            >
                <View
                    style={{
                        paddingHorizontal: 20,
                        height: '100%',
                        justifyContent: 'center'
                    }}
                >
                    <Icon 
                        type={'font-awesome'}
                        name={'bell'}
                        color={this.props.data.status.read ? '#6ab1f7' : '#fff'}
                        size={14} 
                    />
                </View>
                <View
                    style={{
                        width: '80%',
                        height: '100%',
                        borderBottomWidth: 1,
                        borderBottomColor: this.props.data.status.read ? '#ccc' : '#fff',
                    }}
                >
                    <Text
                        style={{
                            fontWeight: 'bold',
                            color: this.props.data.status.read ? '#444' : '#fff'
                        }}
                        >{this.props.data.title_notifikasi}</Text>
                    <View
                        style={{
                            marginTop: 5,
                        }}
                    >
                        <Text
                            style={{
                                color: this.props.data.status.read ? '#444' : '#fff',
                                fontSize: 12,
                                lineHeight: 20
                            }}
                        >{this.props.data.body_notifikasi}</Text>
                    </View>   
                </View> 
            </Ripple>
        )
    }
}