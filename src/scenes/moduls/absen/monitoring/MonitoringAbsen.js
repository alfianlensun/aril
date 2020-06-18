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
import DateTimePicker from '@react-native-community/datetimepicker';
import ListCardUnitKerja from '../../../../components/list/ListCardUnitKerja'
import { getListUnitKerjaSdm } from '../../../../services/ServiceMaster'
import { icon_color_primary, shadow, icon_color_secondary, background_color_gradient } from '../../../../themes/Default'
import { TextInput } from 'react-native-gesture-handler'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { getListAbsensiPegawai } from '../../../../services/ServiceSdm'
import Ionicons from 'react-native-vector-icons/Ionicons'
import moment from 'moment'
import ListPegawaiAbsen from '../../../../components/list/ListPegawaiAbsen'
import { search } from '../../../../helpers/General'
import LoaderListBed from '../../../../components/loader/LoaderListBed'
import LinearGradient from 'react-native-linear-gradient'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
export default class MonitoringAbsen extends Component{
    constructor(props){
        super(props)
        const params = props.route.params
        this.state = {
            listpegawai: [],
            renderlistpegawai: [],
            loader: false,
            params,
            searchUser: '',
            tanggaldipilih: new Date(),
            showDatePicker: false
        }
    }

    async componentDidMount(){
        try {
            await this.getListPegawai()
        } catch(err){
            alert(err.message)
        }
    }

    getListPegawai = async () => {
        try {
            this.setState({
                loader: true
            })
            const {response} = await getListAbsensiPegawai(this.state.params.unitKerja.id_unit_kerja, moment(this.state.tanggaldipilih).format('YYYY-MM-DD'), moment(this.state.tanggaldipilih).format('YYYY-MM-DD') )
            const list = response.map(item => {
                item.value = item.nama_pegawai
                return item
            })
            this.setState({
                loader: false,
                listpegawai: list,
                renderlistpegawai: list
            })
        }catch(err){
            throw new Error(err.message)
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
                                color: '#fff'
                            }}
                        >{this.state.params.unitKerja.nama_unit_kerja}</Text>
                    </View>
                    <View
                        style={{
                            width: '100%',
                            paddingHorizontal: 20,
                            paddingTop: 20,
                            flexDirection: 'row',
                            justifyContent: 'flex-end'
                        }}
                    >
                        <Ripple
                            onPress={() => this.props.navigation.navigate('MonitoringAbsenMap', {
                                dataunitkerja: {
                                    tanggaldipilih: this.state.tanggaldipilih,
                                    ...this.state.params
                                }
                            })}
                            style={[{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                overflow: 'hidden',
                                paddingVertical: 10,
                                paddingHorizontal: 15,
                                borderRadius: 20,
                                marginRight: 5,
                                backgroundColor: '#fff'
                            }, shadow]} 
                        >
                            <MaterialIcons name="person-pin-circle" size={18} color={icon_color_primary}/>
                        </Ripple>
                        <Ripple
                            onPress={() => this.setState({showDatePicker: true})}
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
                            >{moment(this.state.tanggaldipilih).format('DDMMYYYY') === moment(new Date()).format('DDMMYYYY') ? 'Hari Ini': moment(this.state.tanggaldipilih).format('DD MMMM YYYY')}</Text>
                            <Ionicons name="md-calendar" size={14} color={icon_color_primary}/>
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
                                        if (searchUser.length > 0){
                                            console.log('1')
                                            const cari = search(this.state.listpegawai , searchUser)
                                            this.setState({renderlistpegawai: cari})
                                        } else {
                                            console.log(0)
                                            this.setState({renderlistpegawai: this.state.listpegawai})
                                        }
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
                                    paddingTop: 10,
                                }}
                            >
                                {this.state.loader ? 
                                    <View
                                        style={{
                                            flex: 1,
                                            paddingTop: 20
                                        }}
                                    >
                                        <LoaderListBed />
                                    </View>:
                                    <FlatList
                                        refreshControl={
                                            <RefreshControl
                                                refreshing={this.state.loader}
                                                onRefresh={() => this.getListPegawai()}
                                            />
                                        }
                                        
                                        showsVerticalScrollIndicator={false}
                                        data={this.state.renderlistpegawai}
                                        renderItem={({ item }) => {
                                            return <ListPegawaiAbsen 
                                                {...this.props}
                                                items={item}
                                                tanggaldipilih={this.state.tanggaldipilih}
                                                params={this.state.params}
                                            />
                                        }}
                                        keyExtractor={item => item.id_sdm_trx_kepegawaian.toString()}
                                    />
                                }
                                
                            </View>
                        </View>
                    </View>
                </View> 
                {this.state.showDatePicker &&
                    <DateTimePicker
                        value={this.state.tanggaldipilih}
                        mode="datetime"
                        mode={'date'}
                        is24Hour={true}
                        display="default"
                        onChange={(event, value) => {
                            if (value !== undefined){
                                this.setState({
                                    showDatePicker: false,
                                    tanggaldipilih: value
                                })
                            } else {
                                this.setState({
                                    showDatePicker: false
                                })
                            }
                            this.getListPegawai()
                        }}
                    />
                }  
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