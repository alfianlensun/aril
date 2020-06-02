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
import {screenHeightPercent, screenWidthPercent} from '../../../../helpers/Layout'
import { getData, clearData } from '../../../../services/LocalStorage'
import {Icon} from 'react-native-elements'
import { search } from '../../../../helpers/General'
import {getAllRequestAbsensi} from '../../../../services/ServiceSdm'
import Ripple from 'react-native-material-ripple'
export default class ListRequest extends Component{
    constructor(props){
        super(props)
        this.state = {
            userdetail: null,
            loader: false,
            listRequest: []
        }
    }

    async componentDidMount(){
        try {
            const data = await getData('AuthUser')
            if (data === null){
                this.props.navigation.replace('login')
            }
            this.setState({
                userdetail: data
            })

            const {response} = await getAllRequestAbsensi(data._id)
            console.log(response)
            this.setState({
                listRequest: response
            })
        } catch (err){
            console.log(err)
        }
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
                    >Permintaan Absensi Mobile </Text>
                </View>
                <View 
                    style={{
                        width: '100%',
                        height: '100%',
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
                        style={{
                            width: '100%',
                            height: '100%',
                            paddingHorizontal: 10,
                        }}
                    >
                        {this.state.listRequest.length > 0 ?
                        <FlatList
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.state.loader}
                                    onRefresh={async () => {
                                        try {
                                            const {response} = await getAllRequestAbsensi(data._id)
                                            this.setState({
                                                listRequest: response
                                            })
                                        }catch(err){
                                            console.log(err)
                                        }
                                    }}
                                />
                            }
                            showsVerticalScrollIndicator={false}
                            data={this.state.listRequest}
                            renderItem={({ item }) => {
                                return <Ripple
                                    onPress={() => this.props.navigation.navigate('VerifikasiRequest', {id: item._id, user_id: item.user_id})}
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
                                                >{item.userdetail.nama_pegawai}</Text>
                                            <Text
                                                style={{
                                                    color: '#444',
                                                    fontSize: 12,
                                                    marginTop: 2
                                                }}
                                            >NIP / NRPK: {item.userdetail.nip_baru}</Text>
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
                        /> : 
                        <Text
                            style={{
                                fontSize: 13,
                                paddingVertical: 10,
                                textAlign: 'center',
                            }}
                        >
                            Tidak ada data
                        </Text>
                    }
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