import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    Image,
    FlatList,
    RefreshControl,
    TextInput
} from 'react-native'
import {screenHeightPercent, screenWidthPercent} from '../../../helpers/Layout'
import { getData, clearData } from '../../../services/LocalStorage'
import {Icon} from 'react-native-elements'
import { search } from '../../../helpers/General'
import {getListUser, updateUser} from '../../../services/ServiceAuth'
import Ripple from 'react-native-material-ripple'
import ToggleSwitch from 'toggle-switch-react-native'
import SlidingUpPanel from 'rn-sliding-up-panel'

export default class SettingUserDetail extends Component{
    constructor(props){
        super(props)
        const params = this.props.route.params
        this.state = {
            userdetail: null,
            allowDragging: false,
            listAllUser: [],
            renderListAllUser: [],
            params,
            loader: false,
            sliderUpContentHeight: 200,
            notifikasiBed: params.userdata.notification.bed,
            notifikasiTindakan: params.userdata.notification.tindakan,
            statusUser: params.userdata.flag_active === 1 ? true : false
        }
    }

    componentDidMount(){
        this.sliderUp.hide()
    }

    renderOpsiSliderUser(){
        return (
            <View style={Styles.containerSlider}>
                <Ripple
                    onPress={() => {
                        updateUser({
                            IDUser : this.state.params.userdata._id,
                            NotifikasiBed: this.state.notifikasiBed,
                            NotifikasiTindakan: this.state.notifikasiTindakan,
                            StatusUser: this.state.statusUser
                        }).then(resp => {
                            this.sliderUp.hide()
                            this.props.navigation.navigate('SettingUser')
                        }).catch(err => {
                            this.sliderUp.hide()
                            this.props.navigation.goBack('SettingUser')
                        })
                    }}
                    rippleColor={'rgba(0,0,0, .4)'}
                    style={{
                        width: '50%',
                        height: 100,
                        justifyContent: 'center',
                        overflow: 'hidden',
                        alignItems: 'center'
                    }}
                >
                    <View
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: 70,
                            height: 50
                        }}
                    >
                        <Icon 
                            type={'font-awesome'}
                            name={'save'}
                            size={20}
                            color={'#444'}
                        />
                    </View>
                    <Text
                        style={{
                            fontSize: 12,
                            color:'#444'
                        }}
                    >Simpan Perubahan</Text>
                </Ripple>
                <Ripple
                    onPress={() => this.props.navigation.goBack(null)}
                    rippleColor={'rgba(0,0,0, .4)'}
                    style={{
                        width: '50%',
                        height: 100,
                        justifyContent: 'center',
                        overflow: 'hidden',
                        alignItems: 'center'
                    }}
                >
                    <View
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: 70,
                            height: 50
                        }}
                    >
                        <Icon 
                            type={'font-awesome'}
                            name={'times'}
                            size={22}
                            color={'#444'}
                        />
                    </View>
                    <Text
                        style={{
                            color:'#444',
                            fontSize: 12
                        }}
                    >Batal Simpan</Text>
                </Ripple>
            </View>
        )
    }

    onBackPress = () => {
        const {notifikasiBed, notifikasiTindakan, statusUser, params} = this.state
        if (notifikasiBed !== params.userdata.notification.bed || notifikasiTindakan !== params.userdata.notification.tindakan || statusUser !== (params.userdata.flag_active == 1 ? true : false)){
            this.sliderUp.show(100, {
                y: .2
            })
        } else {
            this.props.navigation.goBack(null)
        }
       
    }

    // 74
    getListAllUser = () => {
        this.setState({
            loader: true
        })
        getListUser().then(resp => {
            const listuser = resp.response.map(item => {
                item.value = item.user_detail.nama_lengkap
                return item
            })
            this.setState({
                loader: false
            })
            
            this.setState({
                listAllUser: listuser,
                renderListAllUser: listuser
            })
        }).catch(err => {
            this.setState({
                loader: false
            })
            setTimeout(() => {
                this.getListAllUser()
            }, 10000);
        })
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
                        onPress={() => this.onBackPress()}
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
                    > {this.state.params.userdata.user_detail.nama_lengkap}</Text>
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
                    <View
                        style={{
                            width: '100%',
                            height: '100%',
                            paddingHorizontal: 10,
                        }}
                    >
                        <View
                            style={{
                                width: '100%',
                                height: 60,
                                marginTop: 10,
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
                                        >Notifikasi Bed</Text>
                                    <Text
                                        style={{
                                            color: '#444',
                                            fontSize: 12,
                                            marginTop: 2
                                        }}
                                    >Pengguna akan menerima notifikasi bed</Text>
                                </View>
                                <View
                                    style={{
                                        width: '20%'
                                    }}
                                >
                                    <ToggleSwitch
                                        isOn={this.state.notifikasiBed}
                                        onColor="#6ab1f7"
                                        offColor="#eee"
                                        labelStyle={{ color: "black", fontWeight: "900" }}
                                        size="medium"
                                        onToggle={isOn => this.setState({notifikasiBed: isOn})}
                                    />
                                </View>
                            </View>
                        </View>
                        <View
                            style={{
                                width: '100%',
                                height: 60,
                                marginTop: 10,
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
                                        >Notifikasi Tindakan</Text>
                                    <Text
                                        style={{
                                            color: '#444',
                                            fontSize: 12,
                                            marginTop: 2
                                        }}
                                    >Pengguna akan menerima notifikasi tindakan</Text>
                                </View>
                                <View
                                    style={{
                                        width: '20%'
                                    }}
                                >
                                    <ToggleSwitch
                                        isOn={this.state.notifikasiTindakan}
                                        onColor="#6ab1f7"
                                        offColor="#eee"
                                        labelStyle={{ color: "black", fontWeight: "900" }}
                                        size="medium"
                                        onToggle={isOn => this.setState({notifikasiTindakan: isOn})}
                                    />
                                </View>
                            </View>
                        </View>
                        <View
                            style={{
                                width: '100%',
                                height: 60,
                                marginTop: 10,
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
                                        >Status Aktif Pengguna</Text>
                                    <Text
                                        style={{
                                            color: '#444',
                                            fontSize: 12,
                                            marginTop: 2
                                        }}
                                    >Pengguna akan menerima notifikasi tindakan</Text>
                                </View>
                                <View
                                    style={{
                                        width: '20%'
                                    }}
                                >
                                    <ToggleSwitch
                                        isOn={this.state.statusUser}
                                        onColor="#6ab1f7"
                                        offColor="#eee"
                                        labelStyle={{ color: "black", fontWeight: "900" }}
                                        size="medium"
                                        onToggle={isOn => this.setState({statusUser: isOn})}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <SlidingUpPanel 
                    friction={.4}
                    draggableRange={{ top: this.state.sliderUpContentHeight, bottom: 0 }}
                    onBackButtonPress={() => {
                        this.sliderUp.hide(); 
                        return true
                    }}
                    allowDragging={this.state.allowDragging}
                    ref={c => this.sliderUp = c}>
                    {this.renderOpsiSliderUser()}
                </SlidingUpPanel>
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