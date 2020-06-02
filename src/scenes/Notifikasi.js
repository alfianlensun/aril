import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    FlatList,
    AppState,
    RefreshControl
} from 'react-native'
import {screenHeightPercent, screenWidthPercent} from '../helpers/Layout'
import {getData} from '../services/LocalStorage'
import {getNotifikasi} from '../services/ServiceNotifikasi'
import ListNotification from '../components/list/ListNotification'

export default class Notifikasi extends Component {
    constructor(props){
        super(props)
        this.state = {
            userdetail: null,
            loader: false,
            listNotifikasi: []
        }
    }

    componentDidMount(){
        this.mounted = true
        getData('AuthUser').then(data => {
            if (this.mounted){
                this.setState({
                    userdetail: data
                })
                getData('cacheNotifikasi').then(cacheNotifikasi => {
                    if (cacheNotifikasi === null){
                        this.getListNotifikasi(data._id)
                    } else {
                        this.setState({
                            listNotifikasi: cacheNotifikasi
                        })
                    }
                })
                
            }
            
        }) 
    }

    componentWillUnmount(){
        this.mounted = false
    }

    setDiBaca(){
        console.log(dibaca)
    }

    getListNotifikasi(iduser){
        if (this.mounted){
            this.setState({loader: true})
        }
        getNotifikasi(iduser).then(resp => {
            let belumDibaca = 0
            const listNotifikasi = resp.response.map(item => {
                if (item.status.read === false){
                    belumDibaca = belumDibaca+1
                }
                item.local_dibaca = item.status.read
                return item
            })
            if (this.mounted){
                this.setState({loader: false})
                this.setState({
                    listNotifikasi
                })
            }
        }).catch(err => {
            if (this.mounted){
                this.setState({loader: false})
            }
        })
    }

    render(){
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
                        paddingHorizontal: 20,
                        paddingVertical: 20
                    }}
                >
                    <Text
                        style={{
                            fontSize: 20
                        }}
                    >Notifikasi </Text>
                    <View
                        style={{
                            marginTop: 10,
                            alignItems: 'center',
                            flexDirection: 'row'
                        }}
                    >
                        {this.state.listNotifikasi.length > 0 ?
                            <View
                                style={{
                                    flexDirection: 'row'
                                }}
                            >
                                <Text
                                    style={{
                                        backgroundColor: '#6ab1f7',
                                        color: '#fff',
                                        paddingHorizontal: 5,
                                        borderRadius: 30,
                                        marginRight: 5,
                                        fontSize: 12
                                    }}
                                > {this.state.listNotifikasi.length} </Text>
                                <Text
                                    style={{
                                        fontSize: 12
                                    }}
                                > Notifikasi belum di baca </Text>
                            </View> : null
                        }
                    </View>
                </View>
                <View 
                    style={{
                        width: '100%',
                        height: '100%',
                        marginTop: 20,
                        paddingTop: 20,
                        borderTopLeftRadius: 30,
                        borderTopRightRadius: 30,
                        paddingHorizontal: 10,
                        backgroundColor: '#fff'
                    }}
                >
                    <View
                        style={{
                            borderTopLeftRadius: 20,
                            borderTopRightRadius: 20,
                            overflow: 'hidden'
                        }}
                    >
                        {this.state.listNotifikasi.length > 0 ? 
                            <FlatList
                                refreshControl={
                                    <RefreshControl
                                        refreshing={this.state.loader}
                                        onRefresh={() => this.getListNotifikasi(this.state.userdetail._id)}
                                    />
                                }
                                showsVerticalScrollIndicator={false}
                                contentContainerStyle={{
                                    paddingVertical: 10
                                }}
                                data={this.state.listNotifikasi}
                                renderItem={({ item }) => {
                                    return <ListNotification key={item._id} data={item} {...this.props} setDibaca={() => this.setDiBaca(item._id)}/>
                                }}
                                keyExtractor={item => item._id}
                            />
                            : <Text style={{
                                textAlign: 'center',
                                color: "#333",
                                fontSize: 14
                            }}>Belum ada notifikasi</Text>
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
        height: screenHeightPercent(6)
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
})