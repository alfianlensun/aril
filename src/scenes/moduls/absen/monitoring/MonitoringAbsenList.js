import React, {Component} from 'react'

import {
    View,
    Text,
    StatusBar,
    StyleSheet,
    RefreshControl,
    TextInput,
    FlatList
} from 'react-native'
import { screenHeightPercent } from '../../../../helpers/Layout'
import Ripple from 'react-native-material-ripple'
import {Icon} from 'react-native-elements'
import AntDesign from 'react-native-vector-icons/AntDesign'
import ListCardUnitKerja from '../../../../components/list/ListCardUnitKerja'
import { getListUnitKerjaSdm } from '../../../../services/ServiceMaster'
import { shadow, icon_color_primary, background_color_gradient } from '../../../../themes/Default'
import { search } from '../../../../helpers/General'
import LoaderListBed from '../../../../components/loader/LoaderListBed'
import LinearGradient from 'react-native-linear-gradient'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { searchPegawai } from '../../../../services/ServiceSdm'
import ListPegawai from '../../../../components/list/ListPegawai'

export default class MonitoringAbsenList extends Component{
    constructor(props){
        super(props)
        this.state = {
            listunitkerja: [],
            listpegawai: [],
            loader: true,
            searchType: 0
        }
    }

    async componentDidMount(){
        try {
            
        } catch(err){
            alert(err.message)
        }
    }

    render(){
        return (
            <LinearGradient
                start={{x: 0, y: 0}} 
                end={{x: 2, y: 0}} 
                colors={background_color_gradient} 
                style={{
                    flex: 1,
                }}>
                <View 
                    style={{
                        flex: 1,
                        position: 'relative',
                    }}
                >
                    <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
                    <View style={Styles.header}></View>
                    <View 
                        style={{
                            flexDirection: 'row',
                            paddingHorizontal: 10,
                            paddingTop: 10,
                            alignItems: 'center'
                        }}
                    >
                        <View 
                            style={{
                                height: 50,
                                width: 50,
                                borderRadius: 50,
                                overflow: 'hidden'
                            }}
                        >
                            <Ripple
                                onPress={() => this.props.navigation.goBack(null)}
                                style={{
                                    height: '100%',
                                    width: '100%',
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
                        </View>
                        <Text
                            style={{
                                fontSize: 16,
                                marginLeft: 10,
                                color: '#fff',
                                
                            }}
                        >Pilih {this.state.searchType === 0 ? 'unit kerja' : 'pegawai'}</Text>
                    </View>
                    <View
                        style={{
                            width: '100%',
                            paddingHorizontal: 10,
                            alignItems: 'flex-end'
                        }}
                    >
                        <Ripple
                            onPress={() => {
                                this.setState({
                                    listpegawai: [],
                                    renderlistunitkerja: this.state.listunitkerja,
                                    searchUser: ''
                                })
                                this.setState({searchType: this.state.searchType === 0 ? 1 : 0})
                            }}
                            style={[{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                overflow: 'hidden',
                                paddingVertical: 10,
                                paddingHorizontal: 20,
                                borderRadius: 20,
                                backgroundColor: '#fff'
                            }, shadow]}
                        >
                            <Text
                                style={{
                                    fontSize: 13,
                                    color: icon_color_primary,
                                    paddingRight: 10,
                                }}
                            >{'Cari Pegawai'}</Text>
                            <Ionicons name="md-search" size={14} color={icon_color_primary}/>
                        </Ripple>
                    </View>
                    <View 
                        style={{
                            flex: 1,
                            marginTop: 20,
                            borderTopLeftRadius: 30,
                            borderTopRightRadius: 30,
                            backgroundColor: '#fff'
                        }}
                    >
                        <View
                            style={{
                                borderTopLeftRadius: 30,
                                borderTopRightRadius: 30,
                                paddingHorizontal: 5,
                                paddingVertical: 6,
                                flex: 1,
                                position: 'relative',
                                overflow: 'hidden'
                            }}
                        >
                             <View
                                style={[{
                                    width: '100%',
                                    height: 50,
                                    borderTopLeftRadius: 25,
                                    borderTopRightRadius: 25,
                                    borderBottomLeftRadius: 25,
                                    borderBottomRightRadius: 25,
                                    overflow: 'hidden',
                                    flexDirection: 'row',
                                    paddingHorizontal: 20,
                                    backgroundColor: icon_color_primary
                                }, shadow]}
                            >
                                <TextInput
                                    onSubmitEditing={() => console.log('ok')}
                                    onChangeText={(searchUser) => {
                                        this.setState({
                                            searchUser
                                        })
                                        if (this.state.searchType === 0){
                                            if (searchUser.length > 0){
                                                const cari = search(this.state.listunitkerja , searchUser)
                                                this.setState({renderlistunitkerja: cari})
                                            } else {
                                                this.setState({renderlistunitkerja: this.state.listunitkerja})
                                            }
                                        } else {
                                            this.searchPegawai(searchUser)
                                        }
                                    }}s
                                    ref={(input) => { this.searchUser = input }}
                                    style={{flex: 1, color: '#fff'}}
                                    placeholderTextColor={'#fff'}
                                    value={this.state.searchUser}
                                    placeholder={this.state.searchType === 0 ? 'Cari unit kerja...' : 'Cari pegawai'}
                                />   
                                <Ripple
                                    style={{
                                        width: '20%',
                                        justifyContent: 'center',
                                        alignItems: 'flex-end',
                                        paddingRight: 10
                                    }}
                                >
                                    <AntDesign name="search1" size={20} color={'#fff'}/>
                                </Ripple>
                            </View>
                            <View
                                style={{
                                    flex: 1,
                                    paddingHorizontal: 10,
                                    paddingTop: 20,
                                }}
                            >
                                
                                
                            </View>
                        </View>
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
        height: screenHeightPercent(4)
    },
})