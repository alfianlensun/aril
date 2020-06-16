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
import {getBed} from '../../../services/ServiceMonitoring'
import LoaderListBed from '../../../components/loader/LoaderListBed'
import SlidingUpPanel from 'rn-sliding-up-panel'
import LinearGradient from 'react-native-linear-gradient'
import { background_color_gradient } from '../../../themes/Default'
export default class BedList extends Component{
    constructor(props){
        super(props)
        const params = this.props.route.params
        this.state = {
            slideType: 0,
            idMstKamar: params.ID,
            namaKamar: params.NamaKamar,
            namaKelas: params.Kelas,
            paramsKamar: params,
            allowDragging: false,
            sliderUpContentHeight: 100,
            listBed: [],
            selectedBedKosong: null,
            loader: false
        }
    }

    componentDidMount(){
        this.sliderUp.hide()
        this.getListBed()
    }

    resetSlider = () => {
        this.setState({
            allowDragging: false,
            sliderUpContentHeight: 100
        })
    }

    getListBed(){
        this.setState({
            loader: true
        })
        getBed(this.state.idMstKamar).then(resp => {
            this.setState({
                loader: false,
                listBed: resp.response
            })
        }).catch(err => {
            this.setState({
                loader: false
            })
        })
    }

    renderOpsiSliderBedTerisi(){
        return (
            <View style={Styles.containerSlider}>
                <Ripple
                    onPress={() => {
                        this.sliderUp.hide()
                        this.props.navigation.navigate('FormKeluarBed', {
                            DataKamar: this.state.paramsKamar,
                            DataBed: this.state.selectedBedKosong
                        })
                    }}
                    rippleColor={'rgba(0,0,0, .4)'}
                    style={{
                        width: '33%',
                        height: 100,
                        borderRadius: 45,
                        justifyContent: 'center',
                        overflow: 'hidden',
                        alignItems: 'center'
                    }}
                >
                    <View
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 50,
                            width: 70,
                            height: 50
                        }}
                    >
                        <Icon 
                            type={'font-awesome'}
                            name={'bed'}
                            size={20}
                        />
                    </View>
                    <Text
                        style={{
                            fontSize: 12
                        }}
                    >Kosongkan</Text>
                </Ripple>
            </View>
        )
    }

    renderOpsiSliderBedKosong(){
        return (
            <View style={Styles.containerSlider}>
                <Ripple
                    onPress={() => {
                        this.sliderUp.hide()
                        this.props.navigation.navigate('ScanNorm', {
                            DataKamar: this.state.paramsKamar,
                            DataBed: this.state.selectedBedKosong,
                            nextTo: 'DetailPasien',
                            goBack: false
                        })
                    }}
                    rippleColor={'rgba(0,0,0, .4)'}
                    style={{
                        width: '33%',
                        height: 100,
                        borderRadius: 45,
                        justifyContent: 'center',
                        overflow: 'hidden',
                        alignItems: 'center'
                    }}
                >
                    <View
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 50,
                            width: 70,
                            height: 50
                        }}
                    >
                        <Icon 
                            type={'font-awesome'}
                            name={'qrcode'}
                            size={34}
                        />
                    </View>
                    <Text
                        style={{
                            fontSize: 12
                        }}
                    >Scan Gelang</Text>
                </Ripple>
                <Ripple
                    onPress={() => {
                        this.sliderUp.hide()
                        this.props.navigation.navigate('CariPasien', {
                            DataKamar: this.state.paramsKamar,
                            DataBed: this.state.selectedBedKosong,
                            nextTo: 'DetailPasien'
                        })
                    }}
                    rippleColor={'rgba(0,0,0, .4)'}
                    style={{
                        width: '33%',
                        height: 100,
                        borderRadius: 45,
                        justifyContent: 'center',
                        overflow: 'hidden',
                        alignItems: 'center'
                    }}
                >
                    <View
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 50,
                            width: 80,
                            height: 50
                        }}
                    >
                        <Icon 
                            type={'ionicons'}
                            name={'search'}
                            size={30}
                        />
                    </View>
                    <Text
                        style={{
                            
                            fontSize: 12
                        }}
                    >Cari Pasien</Text>
                </Ripple>
                <Ripple
                    onPress={() => this.sliderUp.hide()}
                    rippleColor={'rgba(0,0,0, .4)'}
                    style={{
                        width: '33%',
                        height: 100,
                        borderRadius: 45,
                        overflow: 'hidden',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <View
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 50,
                            width: 80,
                            height: 50
                        }}
                    >
                        <Icon 
                            type={'ionicons'}
                            name={'close'}
                            size={30}
                        />
                    </View>
                    <Text
                        style={{
                            
                            fontSize: 12
                        }}
                    >Batal</Text>
                </Ripple>
                
            </View>
        )
    }

    renderBed(){
        if (this.state.loader){
            return <LoaderListBed />
        } else {
            return this.state.listBed.length > 0 ? 
            <FlatList
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.loader}
                        onRefresh={() => this.getListBed()}
                    />
                }
                showsVerticalScrollIndicator={false}
                data={this.state.listBed}
                renderItem={({ item }) => {
                    if (item.status_terisi === 1){
                        return <Ripple
                            onPress={() => {
                                this.setState({
                                    slideType: 1,
                                    selectedBedKosong: item
                                })
                                this.resetSlider()
                                this.sliderUp.show(100, {
                                    y: .2
                                })
                            }}
                            rippleColor={'rgba(0,0,0,.4)'}
                            style={{
                                marginTop: 20,
                                paddingHorizontal: 20,
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
                                    >Bed {item.nama_bed}</Text>
                                    <View
                                        style={{
                                            flexDirection: 'row'
                                        }}
                                    >
                                        <Text
                                            style={{
                                                width: '40%',
                                                color: '#222',
                                                fontSize: 12,
                                                marginTop: 5
                                            }}
                                        >No Rekam Medik</Text>
                                        <Text
                                            style={{
                                                width: '40%',
                                                color: '#222',
                                                fontSize: 12,
                                                marginTop: 5
                                            }}
                                        >
                                            : {item.norm}
                                        </Text>
                                    </View>
                                    <View
                                        style={{
                                            flexDirection: 'row'
                                        }}
                                    >
                                        <Text
                                            style={{
                                                width: '40%',
                                                color: '#222',
                                                fontSize: 12,
                                                marginTop: 5
                                            }}
                                        >Nama Pasien</Text>
                                        <Text
                                            style={{
                                                width: '60%',
                                                color: '#222',
                                                fontSize: 12,
                                                marginTop: 5
                                            }}
                                            >: {item.nama_pasien}</Text>
                                    </View>
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
                    } else {
                        return <Ripple
                            onPress={() =>{ 
                                this.setState({
                                    slideType: 0,
                                    selectedBedKosong: item
                                })
                                this.resetSlider()
                                this.sliderUp.show(100, {
                                    y: .2
                                })
                                
                            }}
                            rippleColor={'rgba(0,0,0,.4)'}
                            style={{
                                marginTop: 20,
                                paddingHorizontal: 20,
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
                                    >Bed {item.nama_bed}</Text>
                                    
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            paddingTop: 5
                                        }}
                                    >
                                        <Text
                                            style={{
                                                alignSelf: 'flex-start',
                                                paddingHorizontal: 20,
                                                paddingVertical: 5,
                                                color: '#fff',
                                                borderRadius: 30,
                                                backgroundColor: '#95c5f5',
                                                fontSize: 12,
                                                marginTop: 5
                                            }}
                                        >Kosong</Text>
                                    </View>
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
                    }
                }}
                keyExtractor={item => item.id_trx_kamar_detail.toString()}
            /> : <View>
                <Text
                    style={{
                        color: '#444',
                        width: '100%',
                        alignItems: 'center'
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
                        flex: 1
                    }}
                >
                    <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
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
                        >{this.state.namaKamar}</Text>
                        <Text
                            style={{
                                marginLeft: 10,
                                backgroundColor: '#6ab1f7',
                                paddingVertical: 5,
                                paddingHorizontal: 10,
                                fontSize: 12,
                                color: '#fff',
                                borderRadius: 30
                            }}
                        >{this.state.namaKelas}</Text>
                    </View>
                    <View
                        style={{
                            paddingHorizontal: 20
                        }}
                    >
                        
                    </View>
                    <View
                        style={{
                            borderTopLeftRadius: 30,
                            borderTopRightRadius: 30,
                            backgroundColor: '#fff',
                            paddingBottom: 30,
                            paddingTop: 20,
                            paddingHorizontal: 10,
                            height: '90%',
                            position: 'relative',
                            width: '100%',
                            marginTop: 20
                        }}
                    >
                        {this.renderBed()}
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
                    {this.state.slideType == 0 ? this.renderOpsiSliderBedKosong() : this.renderOpsiSliderBedTerisi()}
                </SlidingUpPanel>
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
    header: {
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