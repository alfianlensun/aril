import React, {Component} from 'react'

import {
    View,
    Text,
    StatusBar,
    StyleSheet,
    RefreshControl,
    FlatList
} from 'react-native'
import { screenHeightPercent } from '../../../../helpers/Layout'
import Ripple from 'react-native-material-ripple'
import {Icon} from 'react-native-elements'
import ListCardUnitKerja from '../../../../components/list/ListCardUnitKerja'
import { getListUnitKerjaSdm } from '../../../../services/ServiceMaster'
import { icon_color_primary, shadow } from '../../../../themes/Default'
import { TextInput } from 'react-native-gesture-handler'
import AntDesign from 'react-native-vector-icons/AntDesign'

export default class MonitoringAbsen extends Component{
    constructor(props){
        super(props)
        const params = props.route.params
        this.state = {
            listunitkerja: [],
            loader: false,
            params,
            searchUser: ''
        }
    }

    async componentDidMount(){
        await this.getListPegawai()
    }

    getListPegawai = async () => {
        console.log(params)
    }

    render(){
        return (
            <View
                style={{
                    flex: 1
                }}
            >
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
                                    color={'#444'}
                                    size={24}
                                />
                            </Ripple>
                        </View>
                        <Text
                            style={{
                                fontSize: 16,
                                marginLeft: 10,
                                color: '#444'
                            }}
                        >{this.state.params.unitKerja.nama_unit_kerja}</Text>
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
                                    height: 60,
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
                                        // if (searchUser.length > 0){
                                        //     const cari = search(this.state.listunitkerja , searchUser)
                                        //     this.setState({renderlistunitkerja: cari})
                                        // } else {
                                        //     this.setState({renderlistunitkerja: this.state.listunitkerja})
                                        // }
                                    }}
                                    ref={(input) => { this.searchUser = input }}
                                    style={{flex: 1, color: '#fff'}}
                                    placeholderTextColor={'#fff'}
                                    value={this.state.searchUser}
                                    placeholder="Cari Pegawai..."
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
                                {/* <FlatList
                                    refreshControl={
                                        <RefreshControl
                                            refreshing={this.state.loader}
                                            onRefresh={() => this.getUnitKerja()}
                                        />
                                    }
                                    showsVerticalScrollIndicator={false}
                                    data={this.state.renderlistunitkerja}
                                    renderItem={({ item }) => {
                                        return <ListCardUnitKerja 
                                            {...this.props}
                                            items={item}
                                        />
                                    }}
                                    keyExtractor={item => item.id_unit_kerja.toString()}
                                /> */}
                            </View>
                        </View>
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
        height: screenHeightPercent(4)
    },
})