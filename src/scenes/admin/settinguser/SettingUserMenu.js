import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    Image,
    ToastAndroid,
} from 'react-native'
import {screenHeightPercent, screenWidthPercent} from '../../../helpers/Layout'
import { getData, clearData } from '../../../services/LocalStorage'
import {Icon} from 'react-native-elements'
import { search } from '../../../helpers/General'
import {getListUser, updateUser, getUserMenu} from '../../../services/ServiceAuth'
import Ripple from 'react-native-material-ripple'
import ToggleSwitch from 'toggle-switch-react-native'
import SlidingUpPanel from 'rn-sliding-up-panel'

export default class SettingUserMenu extends Component{
    constructor(props){
        super(props)
        const params = this.props.route.params
        this.state = {
            params,
            listmenu: [],
            listallmenu: []
        }
    }

    async componentDidMount(){
        try {
            await this.getListUserMenu(this.state.params.userdata)
            await this.getAllMenu
        } catch(err){
            alert(err.message)
        }
    }

    getListUserMenu = async(data) => {
        try{
            this.setState({
                loaderMenu: true,
            })
            const {response} = await getUserMenu(data.username)
            this.setState({
                listmenu: response.listmenu
            })
        } catch(err){
            alert(err.message)
        }
    }

    getListMenu = () => {
        console.log()
    }

    render(){
        const {userdetail} = this.state
        return(
            <View 
                style={{
                    flex: 1,
                    overflow: 'hidden',
                    position: 'relative',
                    backgroundColor: '#e1f7fa',
                }}
            >
                <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
                <View style={Styles.header}></View>
                <View
                    style={{
                        height: screenHeightPercent(10),
                        paddingHorizontal: 10,
                        paddingVertical : 10,
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}
                >
                    <Ripple
                        onPress={() => this.props.navigation.goBack()}
                        style={{
                            height: 40,
                            width: 40,
                            borderRadius: 50,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                        rippleColor={'rgba(0,0,0,.5)'}
                    >
                        <Icon 
                            type={'ionicons'}
                            name={'arrow-back'}
                            color={'#444'}
                            size={24}
                        />
                    </Ripple>
                    <Text
                        style={{
                            marginLeft: 10,
                            fontSize: 16
                        }}
                    > {this.state.params.userdata.user_detail.nama_pegawai}</Text>
                </View>
                <View 
                    style={{
                        width: '100%',
                        height: '100%',
                        marginTop: 20,
                        paddingVertical: 10,
                        paddingHorizontal: 10,
                        position: 'relative',
                        borderTopLeftRadius: 30,
                        borderTopRightRadius: 30,
                        backgroundColor: '#fff'
                    }}
                >

                </View>
            </View>
        )
    }
}


const Styles = new StyleSheet.create({
    container: {
        flex : 1,
    },
    containerWrapper:{
        width: '100%',
        justifyContent: 'center' 
    },
    header: {
        backgroundColor: '#e1f7fa',
        height: screenHeightPercent(5)
    },
    headerBackground: {
        overflow: 'hidden',
        backgroundColor: '#555',
        top: 0,
        left: 0,
        width: '100%',
        height: screenHeightPercent(30),
        borderBottomLeftRadius: 50
    },
    containerSlider:{
        zIndex: 2,
        width: '100%',
        // alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        overflow: 'hidden',
        position: 'relative',
        paddingHorizontal: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        height: '100%',
        backgroundColor: '#fff'
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 2.84,
        elevation: 2,
    },
    formTextInput: {
        height: '100%',
        color: '#444'
    }
})