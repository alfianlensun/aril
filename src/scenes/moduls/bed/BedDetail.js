import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    FlatList,
    RefreshControl
} from 'react-native'
import {screenHeightPercent, screenWidthPercent} from '../../../helpers/Layout'
import {Icon} from 'react-native-elements'
import Ripple from 'react-native-material-ripple'
import {getKamar} from '../../../services/ServiceMonitoring'
import Carousel from 'react-native-snap-carousel'
import LoaderListBed from '../../../components/loader/LoaderListBed'

export default class BedDetail extends Component{
    constructor(props){
        super(props)
        const params = this.props.route.params
        this.state = {
            idMstUnitRuangan: params.ID,
            terisi: params.terisi,
            kosong: params.kosong,
            paramsRuangan: params,
            nama_ruangan: params.namaRuangan,
            listKamar: [],
            loader: false
        }
    }

    componentDidMount(){
        this.getListKamar()
    }

    getListKamar(){
        this.setState({
            loader: true
        })
        getKamar(this.state.idMstUnitRuangan).then(resp => {
            this.setState({
                loader: false,
                listKamar: resp.response
            })
        }).catch(err => {
            this.setState({
                loader: false
            })
        })
    }

    renderKamar(){
        if (this.state.loader){
            return <LoaderListBed />
        } else {
            return this.state.listKamar.length > 0 ? 
            <FlatList
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.loader}
                        onRefresh={() => this.getListKamar()}
                    />
                }
                showsVerticalScrollIndicator={false}
                data={this.state.listKamar}
                renderItem={({ item }) => {
                    return <Ripple
                        onPress={() => this.props.navigation.navigate('BedList', {
                            ID: item.id_mst_kamar, 
                            Kelas: 'Kelas '+item.kelas.nm_mst_kelas,
                            ParamsKamar: item,
                            ParamsRuangan: this.state.paramsRuangan,
                            NamaKamar: item.nama_kamar 
                        })}
                        rippleColor={'rgba(0,0,0,.4)'}
                        style={{
                            marginTop: 10,
                            paddingHorizontal: 10,
                            height: 70,
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
                                paddingBottom: 10,
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
                                    >{item.nama_kamar}</Text>
                                <Text
                                    style={{
                                        color: '#444',
                                        fontSize: 12,
                                        marginTop: 5
                                    }}
                                    >Terisi : {item.terisi} / Kosong : {item.kosong}</Text>
                                <Text
                                    style={{
                                        color: '#444',
                                        fontSize: 12,
                                        marginTop: 5
                                    }}
                                    >Kelas {item.kelas.nm_mst_kelas}</Text>
                            </View>
                            <View
                                style={{
                                    width: '20%'
                                }}
                            >
                                <Icon 
                                    type={'font-awesome'}
                                    name={'bed'}
                                    color={'#444'}
                                    size={18} 
                                />
                            </View>
                        </View>
                    </Ripple>
                }}
                keyExtractor={item => item.id.toString()}
            /> : <View>
                <Text
                    style={{
                        color: '#444',
                        width: '100%',
                        textAlign: 'center'
                    }}
                >
                    Data tidak tersedia
                </Text>
            </View>
        }
    }

    render(){
        return(
            <View 
                style={{
                    flex: 1,
                    backgroundColor: '#e1f7fa'
                }}
            >
                <View 
                    style={{
                        flex: 1
                    }}
                >
                    <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
                    <View style={Styles.header}></View>
                    <View 
                        style={{
                            flexDirection: 'row',
                            paddingHorizontal: 10,
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
                                fontSize: 18,
                                marginLeft: 10,
                                color: '#444'
                            }}
                        >{this.state.nama_ruangan}</Text>
                    </View>
                    
                    <View
                        style={{
                            paddingHorizontal: 20,
                            flexDirection: 'row'
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 14,
                                width: '30%'
                            }}
                        >Terisi</Text>
                        <Text
                            style={{
                                fontSize: 12,
                                paddingHorizontal: 20,
                                paddingVertical: 2,
                                borderRadius: 10,
                                color: '#fff',
                                backgroundColor: '#6ab1f7',
                                alignSelf: 'flex-start'
                            }}
                        >
                            {this.state.terisi}
                        </Text>
                    </View>
                    <View
                        style={{
                            marginTop: 5,
                            paddingHorizontal: 20,
                            flexDirection: 'row'
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 14,
                                width: '30%'
                            }}
                        >Kosong</Text>
                        <Text
                            style={{
                                fontSize: 12,
                                paddingHorizontal: 20,
                                paddingVertical: 2,
                                borderRadius: 10,
                                color: '#fff',
                                backgroundColor: '#6ab1f7',
                                alignSelf: 'flex-start'
                            }}
                        >
                            {this.state.kosong}
                        </Text>
                    </View>
                    <View
                        style={{
                            borderTopLeftRadius: 30,
                            borderTopRightRadius: 30,
                            backgroundColor: '#fff',
                            paddingTop: 20,
                            paddingBottom: 20,
                            paddingHorizontal: 20,
                            height: '80%',
                            position: 'relative',
                            width: '100%',
                            marginTop: 40
                        }}
                    >
                        {this.renderKamar()}
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
    sliderWrapper: {
        position: 'relative',
        marginTop: screenHeightPercent(5),
        height: screenHeightPercent(20)
    },
    sliderTitle:{
        paddingLeft: 20,
        height: '20%',
    },
    sliderTitleText: {
        color: '#fff'
    },
    sliderContent:{
        height: '80%',
    },
    backgroundStyles: {
        height: 80,
        width: 80,
        backgroundColor: 'rgba(255,255,255,.3)',
        borderRadius: 50,
        position: 'absolute'
    },  
    cardSliderWrapper:{
        overflow: "hidden",
        padding: 10,
        position: 'relative',
        backgroundColor: '#0b73db',
        borderRadius: 10,
        width: '100%',
        height: '100%',
    },
    cardSliderStatus: {
        flexDirection: 'row',
        paddingVertical: 2,
        paddingHorizontal: 10,
        borderRadius: 5,
        backgroundColor: '#00C617',
        alignSelf: 'flex-start'
    },
    cardSliderStatusText: {
        fontSize: 14,
        color: '#fff',
        fontWeight: "bold"
    },
    cardSliderTitle: {
        marginTop: 5
    },
    cardSliderTitleTexttitle:{
        color: '#fff',
        fontSize: 16
    },
    cardSliderTitleTextJml:{
        alignSelf: "flex-end",
        color: '#fff',
        fontSize: 28,
        fontWeight: 'bold',
        paddingRight: 20,
        paddingTop: 20
    },
})