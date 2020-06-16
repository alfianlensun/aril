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
import {getSubInstalasi, getRuangan, getKamar, getAllBed} from '../../../services/ServiceMonitoring'
import LoaderListBed from '../../../components/loader/LoaderListBed'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import LinearGradient from 'react-native-linear-gradient'
import { background_color_gradient } from '../../../themes/Default'

export default class Bed extends Component{
    constructor(props){
        super(props)
        this.state = {
            loader: false,
            listRuangan : []
        }
    }

    componentDidMount(){
        this.mounted = true
        this.getListRuangan()
        
    }

    getListRuangan = () =>{
        this.setState({
            loader: true
        })
        getRuangan().then(resp => {
            if (this.mounted){
                this.setState({
                    loader: false,
                    listRuangan: resp.response
                })
            }

        }).catch(err => {
            this.setState({
                loader: false
            })
        })
        
    }

    componentWillUnmount(){
        this.mounted = false
    }



    renderRuangan(){
        if (this.state.loader){
            return <LoaderListBed />
        } else {
            return this.state.listRuangan.length > 0 ? 
            <FlatList
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.loader}
                        onRefresh={() => this.getListRuangan()}
                    />
                }
                showsVerticalScrollIndicator={false}
                data={this.state.listRuangan}
                renderItem={({ item }) => {
                    return <Ripple
                        onPress={() => this.props.navigation.navigate('BedDetail', {
                            ID: item.id_mst_unit_ruangan,
                            namaRuangan: item.nm_unit_ruangan,
                            terisi: item.terisi,
                            kosong: item.kosong
                        })}
                        rippleColor={'rgba(0,0,0,.4)'}
                        style={{
                            paddingHorizontal: 20,
                            height: 60,
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
                                    >{item.nm_unit_ruangan}</Text>
                                <Text
                                    style={{
                                        color: '#444',
                                        fontSize: 12,
                                        marginTop: 2
                                    }}
                                >Terisi : {item.terisi} / Kosong : {item.kosong}</Text>
                            </View>
                            <View
                                style={{
                                    width: '20%',
                                    alignItems: 'flex-end'
                                }}
                            >
                                <MaterialIcons name="chevron-right" size={30} color={'#333'}/>
                            </View>
                        </View>
                    </Ripple>
                }}
                keyExtractor={item => item.id_mst_unit_ruangan.toString()}
            /> : <View>
                <Text
                    style={{
                        color: '#444'
                    }}
                >
                    Data tidak tersedia
                </Text>
            </View>
        }
    }

    render(){
        return(
            <LinearGradient
                start={{x: 0, y: 0}} 
                end={{x: 2, y: 0}} 
                colors={background_color_gradient} 
                style={{
                    flex: 1,
                    position: 'relative',
                }}>
                <View 
                    style={{
                        flex: 1,
                        flexDirection: 'column'
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
                                fontSize: 18,
                                marginLeft: 10,
                                color: '#fff'
                            }}
                        >Bed Monitoring</Text>
                    </View>
                    <View
                        style={{
                            borderTopLeftRadius: 30,
                            borderTopRightRadius: 30,
                            backgroundColor: '#fff',
                            paddingVertical: 30,
                            paddingHorizontal: 10,
                            height: '90%',
                            width: '100%',
                            marginTop: 20
                        }}
                    >
                        {this.renderRuangan()}
                        
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