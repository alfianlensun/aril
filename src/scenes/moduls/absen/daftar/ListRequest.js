import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    Image,
    FlatList,
    RefreshControl,
    TextInput,
    ToastAndroid
} from 'react-native'
import {screenHeightPercent, screenWidthPercent} from '../../../../helpers/Layout'
import { getData, clearData } from '../../../../services/LocalStorage'
import {Icon} from 'react-native-elements'
import { search } from '../../../../helpers/General'
import {getAllRequestAbsensi} from '../../../../services/ServiceSdm'
import Ripple from 'react-native-material-ripple'
import { background_color_gradient, icon_color_primary } from '../../../../themes/Default'
import LinearGradient from 'react-native-linear-gradient'
import moment from 'moment'
import { ScrollView } from 'react-native-gesture-handler'
export default class ListRequest extends Component{
    constructor(props){
        super(props)
        this.state = {
            userdetail: null,
            loader: false,
            listRequest: [],
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

            this.getAllRequest()
            
        } catch (err){
            console.log(err)
        }
    }

    getAllRequest = async () => {
        try {
            const {response} = await getAllRequestAbsensi(this.state.userdetail._id)
            
            if (response !== undefined){
                let finaldata = {}
                for (const item of response){
                    if (finaldata[moment(item.date_created).format('YYYY-MM-DD')] === undefined){
                        finaldata[moment(item.date_created).format('YYYY-MM-DD')] = [item]
                    } else {
                        finaldata[moment(item.date_created).format('YYYY-MM-DD')].push(item)
                    }
                }
                let filtered = []
                for (const tanggal of Object.keys(finaldata)){
                    filtered.push({
                        title: tanggal
                    })
                    for (const item of finaldata[tanggal]){
                        filtered.push(item)
                    }
                }

                this.setState({
                    listRequest: filtered
                })
            }
        } catch(err){
            ToastAndroid.show('Something went wrong '+err.message, 1000)
        }
    }

    render(){
        const {userdetail} = this.state
        return(
            <LinearGradient
                start={{x: 0, y: 0}} 
                end={{x: 2, y: 0}} 
                colors={background_color_gradient} 
                style={{
                    flex: 1,
                }}>
                <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
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
                            color={'#fff'}
                            size={24}
                        />
                    </Ripple>
                    <Text
                        style={{
                            marginLeft: 10,
                            fontSize: 16,
                            color: '#fff'
                        }}
                    >Permintaan Absensi Mobile </Text>
                </View>
                <View 
                    style={{
                        flex: 1,
                        marginTop: 20,
                        paddingVertical: 10,
                        position: 'relative',
                        overflow: 'hidden',
                        borderTopLeftRadius: 30,
                        borderTopRightRadius: 30,
                        backgroundColor: '#fff'
                    }}
                >
                    <View
                        style={{
                            borderRadius: 10,
                            flex: 1,
                            flexDirection: 'column'
                        }}
                    >
                        {this.state.listRequest.length > 0 ?
                            <View
                                style={{
                                    flex: 1,
                                    paddingHorizontal: 10,
                                    overflow: 'hidden',
                                    position : 'relative'
                                }}
                            >
                            <FlatList
                                style={{
                                    flex: 1
                                }}
                                refreshControl={
                                    <RefreshControl
                                        refreshing={this.state.loader}
                                        onRefresh={() => {
                                            this.getAllRequest()
                                        }}
                                    />
                                }
                                showsVerticalScrollIndicator={false}
                                data={this.state.listRequest}
                                renderItem={({ item }) => {
                                    if (item.title !== undefined){
                                        return (
                                            <Text
                                                style={{
                                                    marginTop: 30,
                                                    backgroundColor: icon_color_primary,
                                                    alignSelf: 'flex-start',
                                                    color: '#fff',
                                                    paddingHorizontal: 10,
                                                    paddingVertical: 5,
                                                    borderRadius: 20,
                                                    fontSize: 13
                                                }}
                                            >{item.title === moment(new Date).format('YYYY-MM-DD') ? 'Hari ini' : item.title}</Text>
                                        )
                                    } else {
                                        return <Ripple
                                            onPress={() => this.props.navigation.navigate('VerifikasiRequest', {id: item._id, user_id: item.user_id})}
                                            rippleColor={'rgba(0,0,0,.4)'}
                                            style={{
                                                width: '100%',
                                                marginTop: 10,
                                                position: 'relative'
                                            }}
                                        >
                                            <View
                                                style={{
                                                    flex: 1,
                                                    paddingVertical: 10,
                                                    flexDirection: 'row',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    borderBottomWidth: 1,
                                                    borderBottomColor: icon_color_primary,
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
                                                            marginTop: 5
                                                        }}
                                                    >NIP / NRPK: {item.userdetail.nip_baru}</Text>
                                                    <Text
                                                        style={{
                                                            color: '#444',
                                                            fontSize: 12,
                                                            marginTop: 5
                                                        }}
                                                    >No Telp : {item.userdetail.no_telp}</Text>
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
                                    }
                                }}
                                keyExtractor={item => item._id}
                                />
                            </View> : 
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
            </LinearGradient>
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