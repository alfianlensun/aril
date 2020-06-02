import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    Picker,
    TextInput,
    ScrollView,
    KeyboardAvoidingView,
    ActivityIndicator
} from 'react-native'
import {screenHeightPercent, screenWidthPercent} from '../../../helpers/Layout'
import {getData} from '../../../services/LocalStorage'
import {Icon} from 'react-native-elements'
import Ripple from 'react-native-material-ripple'
import {getCaraKeluar, getKeadaanKeluar} from '../../../services/ServiceMaster'
import {updateRegisKeluar} from '../../../services/ServiceMonitoring'
import DatePickerIos from 'react-native-datepicker'
import SlidingUpPanel from 'rn-sliding-up-panel'
import { FlatList } from 'react-native-gesture-handler'
import {search} from '../../../helpers/General'


export default class FormKeluarBed extends Component {
    constructor(props){
        super(props)
        const params = this.props.route.params
        this.state = {
            userdetail: null,
            search: '',
            success: false,
            loader: false,
            validInput: true,
            tanggalKeluar: new Date(),
            paramsBed: params,
            sliderUpContentHeight: 400,
            allowDragging: false,
            listpencarian: [],
            listCaraKeluar: [],
            listKeadaanKeluar: [],
            chosenKeadaanKeluar: null,
            chosenCaraKeluar: null,
            listRenderSelect: [],
            selectType: {
                type: 1,
                name: 'cara keluar'
            }
        }
        
    }

    componentDidMount(){
        
        getCaraKeluar().then(caraKeluar => {
            let Id = 0
            const listCaraKeluar = caraKeluar.response.map(item => {
                return {
                    Id: Id++,
                    value: item.cara_keluar,
                    label: item.cara_keluar
                }
            })
            getKeadaanKeluar().then(keadaanKeluar => {
                const listKeadaanKeluar = keadaanKeluar.response.map(item => {
                    return {
                        Id: Id++,
                        value: item.keadaan_umum,
                        label: item.keadaan_umum
                    }
                })
                this.setState({
                    Id: Id++,
                    listCaraKeluar:listCaraKeluar, 
                    listKeadaanKeluar: listKeadaanKeluar
                })
            }).catch(err => {
                console.log(err)
            })
        }).catch(err => {
            console.log(err)
        })
        
        this.sliderUp.hide()
        this.mounted = true
    }


    componentWillUnmount(){
        this.mounted = false   
    }

    onSubmitKeluarBed = () => {
        
        this.setState({
            validInput: true
        })
        const {paramsBed, tanggalKeluar, chosenKeadaanKeluar, chosenCaraKeluar} = this.state

        if (chosenCaraKeluar === null) this.setState({validInput: false})
        if (chosenKeadaanKeluar === null) this.setState({validInput: false})
        
        if (this.state.validInput === true){
            this.setState({
                loader: true
            })
            updateRegisKeluar(paramsBed.DataBed._id, paramsBed.DataBed.norm ,tanggalKeluar, chosenCaraKeluar.value, chosenKeadaanKeluar.value, '').then(resp => {
                this.setState({
                    success: true
                })
                this.sliderUp.show(200, {
                    y: .2
                })
            }).catch(err => {
                this.setState({
                    loader: false
                })
            })
        }
    }

    renderBerhasilSlider(){
        return (
            <View style={Styles.containerSlider}>
                <View
                    style={{
                        paddingTop: 20,
                        width: '100%',
                        alignItems: 'center'
                    }}
                >
                    <View>
                        <Text
                            style={{
                                color: '#333'
                            }}
                        >Berhasil memperbarui kamar</Text>
                    </View>
                    <Ripple
                        onPress={() => this.props.navigation.replace('MainMenu')}
                        rippleColor={'rgba(0,0,0,.4)'}
                        style={{
                            backgroundColor: '#63b3ed',
                            paddingVertical: 10,
                            paddingHorizontal: 30,
                            borderRadius: 10,
                            marginTop: '10%',
                        }}
                    >
                        <Text
                            style={{
                                color: "#fff"
                            }}
                        >OK</Text>
                    </Ripple>
                </View>
            </View>
        )
    }

    renderSelectSlider(){
        return (
            <View style={Styles.containerSlider}>
                <View
                    style={{
                        width: '100%',
                        height: 40
                    }}
                >
                    <TextInput
                        onSubmitEditing={() => {
                            
                        }}
                        onChangeText={(value) => {
                            if (this.state.selectType.type === 1){
                                this.setState({
                                    listRenderSelect: search(this.state.listCaraKeluar,value)
                                })
                            } else {
                                this.setState({
                                    listRenderSelect: search(this.state.listKeadaanKeluar,value)
                                })
                            }
                        }}
                        style={[Styles.formTextInput]}
                        value={this.state.searchSelect}
                        placeholder={"Cari "+this.state.selectType.name}
                    />
                </View>
                <View
                    style={{
                        height: 300
                    }}
                >
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={this.state.listRenderSelect}
                        renderItem={({ item }) => {
                            return <Ripple
                                key={item.id}
                                onPress={() => {
                                    this.setState({
                                        validInput: true
                                    })
                                    if (this.state.selectType.type === 1){
                                        this.setState({
                                            chosenCaraKeluar: item 
                                        })
                                    } else {
                                        this.setState({
                                            chosenKeadaanKeluar: item 
                                        })
                                    }
                                    this.sliderUp.hide()
                                }}
                                rippleColor={'rgba(0,0,0,.4)'}
                                style={{
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
                                            width: '80%',
                                            justifyContent: 'center'
                                        }}
                                    >
                                        <Text
                                            style={{
                                                color: '#444',
                                                fontSize: 12,
                                                marginTop: 2
                                            }}
                                        >{item.value}</Text>
                                    </View>
                                    <View
                                        style={{
                                            width: '20%'
                                        }}
                                    >
                                        <Icon 
                                            type={'font-awesome'}
                                            name={'pencil'}
                                            color={'#444'}
                                            size={18} 
                                        />
                                    </View>
                                </View>
                            </Ripple>
                        }}
                        keyExtractor={item => item.id}
                    />
                </View>
            </View>
        )
    }

    render(){
        return(
            <KeyboardAvoidingView style={{flex: 1}} behavior="height" enabled>
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
                            paddingVertical: 10,
                        }}
                    >
                        <View
                            style={{
                                position: 'relative',
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
                                    fontSize: 16,
                                    marginLeft: 10,
                                    color: '#333',
                                    fontWeight: 'bold'
                                }}
                            >Form Keluar Pasien</Text>
                        </View>
                        <Text
                            style={{
                                color: '#333',
                                marginTop: 20,
                                fontSize: 13,
                                lineHeight: 25
                            }}
                        >Masukan data - data berikut untuk untuk mengosongkan kamar ini</Text>
                    </View>
                    <View 
                        style={{
                            width: '100%',
                            height: screenHeightPercent(92),
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
                            <View
                                style={{
                                    width: '100%',
                                    alignItems: 'center'
                                }}
                            >
                                <Text
                                    style={{
                                        color: '#333',
                                        fontSize: 16,
                                        fontWeight: 'bold'
                                    }}
                                >{this.state.paramsBed.DataBed.nama_pasien}</Text>   
                                <View
                                    style={{
                                        marginTop: 5,
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
                                            fontSize: 10
                                        }}
                                    > Norm </Text>
                                    <Text
                                        style={{
                                            fontSize: 12
                                        }}
                                    > {this.state.paramsBed.DataBed.norm} </Text>
                                </View>
                            </View>
                            <View
                                style={{
                                    width: '100%',
                                    height: '85%',
                                    paddingTop: 10,
                                    paddingHorizontal: 10
                                }}
                            >
                                {/* <View
                                    style={{
                                        marginTop: 10,
                                        flexDirection: 'row',
                                        
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: '#333',
                                            width: '30%',
                                            fontSize: 13
                                        }}
                                    >No Pendaftaran</Text> 
                                    <Text
                                        style={{
                                            color: '#333',
                                            width: '70%',
                                            fontSize: 13
                                        }}
                                    >: 9992310320102931023</Text>   
                                </View>
                                <View
                                    style={{
                                        marginTop: 10,
                                        flexDirection: 'row',
                                        
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: '#333',
                                            width: '30%',
                                            fontSize: 13
                                        }}
                                    >Ruang Rawat</Text> 
                                    <Text
                                        style={{
                                            color: '#333',
                                            width: '70%',
                                            fontSize: 13
                                        }}
                                    >: awdawd</Text>   
                                </View>
                                <View
                                    style={{
                                        marginTop: 10,
                                        flexDirection: 'row',
                                        
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: '#333',
                                            width: '30%',
                                            fontSize: 13
                                        }}
                                    >Kamar</Text> 
                                    <Text
                                        style={{
                                            color: '#333',
                                            width: '70%',
                                            fontSize: 13
                                        }}
                                    >: awdawd</Text>   
                                </View>
                                <View
                                    style={{
                                        marginTop: 10,
                                        flexDirection: 'row',
                                        
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: '#333',
                                            width: '30%',
                                            fontSize: 13
                                        }}
                                    >Bed </Text> 
                                    <Text
                                        style={{
                                            color: '#333',
                                            width: '70%',
                                            fontSize: 13
                                        }}
                                    >: awdawd</Text>   
                                </View>
                                <View
                                    style={{
                                        marginTop: 10,
                                        flexDirection: 'row',
                                        
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: '#333',
                                            width: '30%',
                                            fontSize: 13
                                        }}
                                    >Kelas</Text> 
                                    <Text
                                        style={{
                                            color: '#333',
                                            width: '70%',
                                            fontSize: 13
                                        }}
                                    >: awdawd</Text>   
                                </View> */}
                                
                                <View
                                    style={{
                                        marginTop: 30,
                                        width: '100%',
                                        height: '70%',
                                        position: 'relative',
                                    }}
                                >
                                    <ScrollView
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                        }}
                                    >
                                        <View
                                            style={{
                                                width: '100%',
                                                height: 50,
                                                alignItems: 'center',
                                                flexDirection: 'row'
                                            }}
                                        >
                                            <View
                                                style={{
                                                    width: '40%'
                                                }}
                                            >
                                                <Text 
                                                    style={{
                                                        fontSize: 13,
                                                        color: '#333'
                                                    }}
                                                >Tanggal Keluar</Text>
                                            </View>
                                            <View
                                                style={{
                                                    width: '60%',
                                                    paddingRight: 10,
                                                    backgroundColor: '#fff',
                                                    alignItems: 'flex-end'
                                                }}
                                            >
                                                <View 
                                                    style={[{
                                                        width: '90%',
                                                        position: 'relative',
                                                        justifyContent:"center",
                                                        height: 40,
                                                        borderRadius: 10,
                                                        paddingLeft: 20,
                                                        overflow: 'hidden',
                                                        backgroundColor: '#fff'
                                                    }, Styles.shadow]}
                                                >
                                                    <DatePickerIos
                                                        style={{width: '100%', height: '100%'}}
                                                        date={this.state.tanggalKeluar}
                                                        mode="datetime"
                                                        showIcon={true}
                                                        iconComponent={
                                                            <View
                                                                style={{
                                                                    position: 'absolute',
                                                                    left: 0
                                                                }}
                                                            >
                                                                <Icon 
                                                                    type={'font-awesome'}
                                                                    name={'calendar'}
                                                                    color={'#000'}
                                                                    size={14} 
                                                                />
                                                            </View>
                                                        }
                                                        customStyles={{
                                                            dateInput:{
                                                                borderWidth: 0,
                                                                borderColor: '#86F49B'
                                                            },
                                                            placeholderText: {
                                                                fontSize: 12,
                                                            },
                                                            dateText: {
                                                                marginLeft: 5,
                                                                fontSize: 12,
                                                                color: "#222",
                                                            }
                                                        }}
                                                        format="YYYY-MM-DD HH:mm:ss"
                                                        confirmBtnText="Confirm"
                                                        cancelBtnText="Cancel"
                                                        onDateChange={(date) => {
                                                            this.setState({
                                                                tanggalKeluar: date
                                                            })
                                                        }}
                                                    />
                                                </View>
                                            </View>
                                        </View>
                                        
                                        <View
                                            style={{
                                                marginTop: 10,
                                                width: '100%',
                                                height: 50,
                                                alignItems: 'center',
                                                flexDirection: 'row'
                                            }}
                                        >
                                            <Text 
                                                style={{
                                                    width: '40%',
                                                    fontSize: 13,
                                                    color: '#333'
                                                }}
                                            >Cara Keluar</Text>   
                                            <View
                                                style={{
                                                    width: '60%',
                                                    paddingRight: 10,
                                                    alignItems: 'flex-end'
                                                }}
                                            >
                                                <Ripple
                                                    onPress={() => {
                                                        this.setState({
                                                            selectType: {
                                                                type: 1,
                                                                name: 'cara keluar'
                                                            },
                                                            listRenderSelect: this.state.listCaraKeluar
                                                        })
                                                        this.sliderUp.show(400, {
                                                            y: .2
                                                        })
                                                    }}
                                                    rippleColor={'rgba(0,0,0,.4)'}
                                                    style={[{
                                                        width: '90%',
                                                        borderRadius: 10,
                                                        overflow: 'hidden',
                                                        height: 40,
                                                        position: 'relative',
                                                        flexDirection: 'row',
                                                        justifyContent: 'center', 
                                                        backgroundColor: '#fff',
                                                        alignItems: 'center'
                                                    },Styles.shadow]}
                                                >
                                                    <Text
                                                        style={{
                                                            width: '80%',
                                                            paddingHorizontal: 10,
                                                            fontSize: 13
                                                        }}
                                                    >
                                                        {this.state.chosenCaraKeluar !== null ? (this.state.chosenCaraKeluar.value.length > 16 ? this.state.chosenCaraKeluar.value.substring(0, 16)+'...' : this.state.chosenCaraKeluar.value) : 'Pilih Cara Keluar'}
                                                    </Text>
                                                    <View
                                                        style={{
                                                            justifyContent: 'center',
                                                            paddingBottom: 5,
                                                            height: '100%',
                                                            width: '20%'
                                                        }}
                                                    >
                                                        <Icon 
                                                            type={'font-awesome'}
                                                            name={'sort-down'}
                                                            color={'#333'}
                                                            size={18}
                                                        />
                                                    </View>
                                                </Ripple>
                                                
                                            </View>
                                        </View>
                                        <View
                                            style={{
                                                marginTop: 10,
                                                width: '100%',
                                                height: 50,
                                                alignItems: 'center',
                                                flexDirection: 'row'
                                            }}
                                        >
                                            <Text 
                                                style={{
                                                    width: '40%',
                                                    fontSize: 13,
                                                    color: '#333'
                                                }}
                                            >Keadaan Keluar</Text>   
                                            <View
                                                style={{
                                                    width: '60%',
                                                    paddingRight: 10,
                                                    alignItems: 'flex-end'
                                                }}
                                            >
                                                <Ripple
                                                    onPress={() => {
                                                        this.setState({
                                                            selectType: {
                                                                type: 2,
                                                                name: 'Keadaan Keluar'
                                                            },
                                                            listRenderSelect: this.state.listKeadaanKeluar
                                                        })
                                                        this.sliderUp.show(400, {
                                                            y: .2
                                                        })
                                                    }}
                                                    rippleColor={'rgba(0,0,0,.4)'}
                                                    style={[{
                                                        width: '90%',
                                                        borderRadius: 10,
                                                        overflow: 'hidden',
                                                        height: 40,
                                                        position: 'relative',
                                                        flexDirection: 'row',
                                                        justifyContent: 'center', 
                                                        backgroundColor: '#fff',
                                                        alignItems: 'center'
                                                    },Styles.shadow]}
                                                >
                                                    <Text
                                                        style={{
                                                            width: '80%',
                                                            paddingHorizontal: 10,
                                                            fontSize: 13
                                                        }}
                                                    >
                                                        {this.state.chosenKeadaanKeluar !== null ? (this.state.chosenKeadaanKeluar.value.length > 16 ? this.state.chosenKeadaanKeluar.value.substring(0, 16)+'...' : this.state.chosenKeadaanKeluar.value) : 'Pilih Keadaan Keluar'}
                                                    </Text>
                                                    <View
                                                        style={{
                                                            justifyContent: 'center',
                                                            paddingBottom: 5,
                                                            height: '100%',
                                                            width: '20%'
                                                        }}
                                                    >
                                                        <Icon 
                                                            type={'font-awesome'}
                                                            name={'sort-down'}
                                                            color={'#333'}
                                                            size={18}
                                                        />
                                                    </View>
                                                </Ripple>
                                                
                                            </View>
                                        </View>
                                        <View
                                            style={{
                                                marginTop: 20,
                                                width: '100%',
                                                alignItems: 'center'
                                            }}
                                        >
                                            {this.state.validInput === false ? 
                                                <View
                                                    style={{
                                                        width: '100%',
                                                        flexDirection: 'row',
                                                        alignItems: 'center',
                                                        justifyContent: 'center'
                                                    }}
                                                >
                                                    <Text 
                                                        style={{
                                                            color: '#ff776e',
                                                            fontSize: 12,
                                                            marginRight: 10,
                                                            paddingVertical: 20
                                                        }}
                                                    >Cara Keluar / Keadaaan keluar tidak boleh kosong</Text>
                                                    <Icon 
                                                        type={'font-awesome'}
                                                        name={'exclamation-circle'}
                                                        size={12}
                                                        color={'#ff776e'}
                                                    />
                                                </View> : null
                                            }
                                            <Ripple
                                                onPress={() => this.state.loader === true ? {} : this.onSubmitKeluarBed()}
                                                rippleColor={'rgba(255,255,255,.6)'}
                                                style={{
                                                    width: '100%',
                                                    backgroundColor: this.state.loader === true ? '#90cdf4' : '#63b3ed',
                                                    flexDirection: 'row',
                                                    justifyContent: 'center',
                                                    borderRadius: 10,
                                                    paddingHorizontal: 20,
                                                    paddingVertical: 15
                                                }}
                                            >
                                                <Text
                                                    style={{
                                                        marginRight: 10,
                                                        color: '#fff'
                                                    }}
                                                >{this.state.loader === true ? 'Menyimpan...' : 'Simpan'} </Text>
                                                {this.state.loader === true ? <ActivityIndicator size="small" color="#00ff00" /> : null}
                                            </Ripple>
                                        </View>
                                    </ScrollView>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <SlidingUpPanel 
                    onBottomReached={() => {this.state.success ? this.props.navigation.replace('MainMenu') : {}}}
                    containerStyle={{
                        zIndex: 50
                    }}
                    friction={.4}
                    draggableRange={{ top: this.state.sliderUpContentHeight, bottom: 0 }}
                    onBackButtonPress={() => {
                        this.sliderUp.hide(); 
                        return true
                    }}
                    allowDragging={this.state.allowDragging}
                    ref={c => this.sliderUp = c}>
                    {this.state.success ? this.renderBerhasilSlider() : this.renderSelectSlider()}
                </SlidingUpPanel>
            </KeyboardAvoidingView>
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
    formTextInput: {
        height: '100%',
        color: '#000'
    },
    containerSlider:{
        width: '100%',
        // alignItems: 'center',
        overflow: 'hidden',
        position: 'relative',
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        height: '100%',
        backgroundColor: '#fff'
    }
})