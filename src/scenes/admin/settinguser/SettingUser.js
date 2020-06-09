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
import {getListUser} from '../../../services/ServiceAuth'
import Ripple from 'react-native-material-ripple'
export default class SettingUser extends Component{
    constructor(props){
        super(props)
        this.state = {
            userdetail: null,
            listAllUser: [],
            renderListAllUser: [],
            loader: false
        }
    }

    componentDidMount(){
        getData('AuthUser').then(data => {
            if (data === null){
                this.props.navigation.replace('login')
            }
            this.getListAllUser()
            this.setState({
                userdetail: data
            })
        })        
    }

    getListAllUser = () => {
        this.setState({
            loader: true
        })
        getListUser().then(resp => {
            const listuser = resp.response.map(item => {
                item.value = item.user_detail.nama_pegawai
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
                    flexDirection: 'column',
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
                        onPress={() => this.props.navigation.goBack(null)}
                        style={{
                            height: 30,
                            width: 30,
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
                    >Pengaturan pengguna </Text>
                </View>
                <View 
                    style={{
                        flex: 1,
                        marginTop: 20,
                        paddingVertical: 10,
                        paddingHorizontal: 20,
                        position: 'relative',
                        borderTopLeftRadius: 30,
                        borderTopRightRadius: 30,
                        backgroundColor: '#fff'
                    }}
                >
                    <View
                        style={[{
                            width: '100%',
                            height: 50,
                            borderRadius: 20,
                            overflow: 'hidden',
                            paddingHorizontal: 10,
                            backgroundColor: '#fff'
                        }]}
                    >
                            <TextInput
                            onSubmitEditing={() => console.log('ok')}
                            onChangeText={(searchUser) => {
                                if (searchUser.length > 0){
                                    const cari = search(this.state.listAllUser , searchUser)
                                    this.setState({renderListAllUser: cari})
                                } else {
                                    this.setState({renderListAllUser: this.state.listAllUser})
                                }
                            }}
                            ref={(input) => { this.searchUser = input }}
                            style={[Styles.formTextInput]}
                            value={this.state.searchUser}
                            placeholder="Cari Pengguna"
                        />   
                    </View>
                    <View
                        style={{
                            flex: 1,
                            paddingHorizontal: 10,
                        }}
                    >
                        <FlatList
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.state.loader}
                                    onRefresh={() => this.getListAllUser()}
                                />
                            }
                            showsVerticalScrollIndicator={false}
                            data={this.state.renderListAllUser}
                            renderItem={({ item }) => {
                                return <Ripple
                                    onPress={() => this.props.navigation.navigate('SettingUserDetail', {userdata: item})}
                                    rippleColor={'rgba(0,0,0,.4)'}
                                    style={{
                                        width: '100%',
                                        height: 60,
                                        marginTop: 10,
                                        position: 'relative'
                                    }}
                                >
                                    <View
                                        style={{
                                            flex: 1,
                                            flexDirection: 'row',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            borderBottomWidth: 1,
                                            borderBottomColor: '#ccc',
                                        }}
                                    >
                                        <View
                                            style={{
                                                flex: 1
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    color: '#444',
                                                    fontWeight: 'bold'
                                                }}
                                                >{item.user_detail.nama_pegawai}</Text>
                                            <Text
                                                style={{
                                                    color: '#444',
                                                    fontSize: 12,
                                                    marginTop: 2
                                                }}
                                            >Username: {item.username}</Text>
                                        </View>
                                        <View
                                            style={{
                                                width: '20%'
                                            }}
                                        >
                                            <Icon 
                                                type={'font-awesome'}
                                                name={'user'}
                                                color={'#444'}
                                                size={18} 
                                            />
                                        </View>
                                    </View>
                                </Ripple>
                            }}
                            keyExtractor={item => item._id}
                        />
                    </View>
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