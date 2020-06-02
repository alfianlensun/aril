import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    ImageBackground,
    StatusBar,
    SafeAreaView,
    TouchableOpacity,
    KeyboardAvoidingView,
    ScrollView,
    Picker
} from 'react-native'
import {screenHeightPercent, screenWidthPercent} from '../../helpers/Layouts'
import moment from 'moment'
import Ripple from 'react-native-material-ripple'
import {
    storeData,
    getData
} from '../../services/LocalStorage'
import {
    getMstPekerjaan,
    getMstPendidikan
} from '../../services/GetData'
import {DoubleBounce} from 'react-native-loader';
import {Icon} from 'react-native-elements'
import StepIndicator from 'react-native-step-indicator'
import SignaturePad from 'react-native-signature-pad';

const customStyles = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize: 30,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: '#fe7013',
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: '#fe7013',
    stepStrokeUnFinishedColor: '#aaaaaa',
    separatorFinishedColor: '#fe7013',
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: '#fe7013',
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: '#fe7013',
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: '#aaaaaa',
    labelColor: '#999999',
    labelSize: 13,
    currentStepLabelColor: '#fe7013'
  }

export default class SignUpStep4 extends Component{
    constructor(props){
        super(props)
        this.state = {
            email: '',
            alamat: '',
            listPekerjaan: [],
            listPendidikan: [],
            selectedPekerjaan: '',
            selectedPendidikan: '',
            loader: false,
            scrollable: true,
            savedTandaTangan: false,
            showWrapperTandaTangan: false,
            dataTandaTangan: null
        }
    }

    componentDidMount(){
        getMstPekerjaan().then((pekerjaan) => {
            if (pekerjaan.status == 200){
                if (pekerjaan.result.metaData.code == 200){
                    storeData('cache@mst_pekerjaan').then(() => {
                        
                    })
                    this.setState({
                        listPekerjaan: pekerjaan.result.response
                    })
                } else {

                }
            } else {

            }
        })

        getMstPendidikan().then((pendidikan) => {
            if (pendidikan.status == 200){
                if (pendidikan.result.metaData.code == 200){
                    storeData('cache@mst_pendidikan').then(() => {
                        
                    })
                    this.setState({
                        listPendidikan: pendidikan.result.response
                    })
                } else {

                }
            } else { 

            }
        })
    }

    simpanDataSignUp(){
        this.setState({
            loader: true
        })
        getData('signUp_datapasien').then((data) => {
            let dataSignUp = data
            dataSignUp.alamat_email = this.state.email
            dataSignUp.pendidikan = this.state.selectedPendidikan 
            dataSignUp.pekerjaan = this.state.selectedPekerjaan
            dataSignUp.alamat = this.state.alamat

            storeData('signUp_datapasien', dataSignUp)
            this.setState({
                loader: false
            })
            this.props.navigation.navigate('SignUpStep5')
        })
    }
    
    renderButtonBerikutnya(){
        return (
            <Ripple 
                rippleColor={'#000'}
                onPress={() => {
                    this.simpanDataSignUp()
                }}
                style={{
                    padding: 10,
                    marginLeft: 10,
                    borderRadius: 5,
                    backgroundColor: '#86F49B'
                }}
            >
                <View style={Styles.btnNext}>
                    <Text style={Styles.buttonLoginText}>Berikutnya</Text>
                </View>
            </Ripple>
        )
    }

    renderListPendidikan(){
        return this.state.listPendidikan.map((item) => {
            return <Picker.Item 
                    key={item.id_mst_pendidikan}
                    label={item.nama_pendidikan} value={item.id_mst_pendidikan} />
        })
    }

    renderListPekerjaan(){
        return this.state.listPekerjaan.map((item) => {
            return <Picker.Item 
                    key={item.id_mst_pekerjaan}
                    label={item.nama_pekerjaan} value={item.id_mst_pekerjaan} />
        })
    }

    renderLoader(){
        return (
            <DoubleBounce size={14} color="#40CB5A" />
        )
    }

    renderTandaTangan(){
        return (
            <View 
                style={{
                    width: '100%',
                    height: '100%'
                }}
            >
                <SignaturePad 
                    onError={(err)=> console.log(err)}
                    onChange={({base64DataUrl}) => {
                        this.setState({
                            dataTandaTangan: base64DataUrl
                        })
                    }}
                    style={{height: '100%' , width: '100%', backgroundColor: 'white'}}/>
                <Ripple
                    onPress={() => {
                        if (this.state.savedTandaTangan == false){
                            this.setState({scrollable: true, savedTandaTangan: true})
                        } else {
                            this.setState({showWrapperTandaTangan: false})
                            this.setState({showWrapperTandaTangan: true ,scrollable: false, savedTandaTangan: false})
                        }
                    }}
                    style={{
                        width: 40,
                        height: 40,
                        position: 'absolute',
                        right: 0,
                        borderRadius: 50,
                        bottom: 0,
                        justifyContent: 'center',
                        overflow: 'hidden',
                        backgroundColor: '#86F49B'
                    }}
                >
                    <Icon 
                        type={'octicon'}
                        name={this.state.savedTandaTangan == true ? 'pencil' : 'check'}
                        color={'#555'}
                        size={24} />
                </Ripple>
            </View>
        )
    }

    renderButtonTandaTangan(){
        return (
            <Ripple
                onPress={() => this.setState({showWrapperTandaTangan: true, scrollable: false})}
                style={{
                    width: '100%',
                    height: '100%',
                    justifyContent: 'center'
                }}
            >
                
                    <Icon 
                    type={'octicon'}
                    name={'pencil'}
                    color={'#00a146'}
                    size={28}
                />
            </Ripple>
        )
    }

    render(){
        return (
            <SafeAreaView style={Styles.container}>
                <View style={Styles.header}>

                </View>
                <View style={[Styles.container]} >
                    <View style={{
                        position: 'relative',
                        flexDirection: 'row',
                        height: '8%'
                    }}>
                        <View
                            style={{
                                width: '30%'
                            }}
                        >
                            <Ripple
                                onPress={() => this.props.navigation.goBack(null)}
                                style={{
                                    overflow: 'hidden',
                                    borderRadius: 50,
                                    height: 50,
                                    width: 50,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                            >
                                <Icon 
                                    type={'octicon'}
                                    name={'chevron-left'}
                                    color={'#aaa'}
                                    size={20}
                                />
                            </Ripple>
                        </View>
                        <View
                            style={{
                                width: '70%',
                                paddingRight: '5%',
                                justifyContent: 'center',
                                alignItems: 'flex-end'
                            }}
                        >
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate('SignUpStep5')}
                                style={{
                                    overflow: 'hidden',
                                    borderRadius: 50,
                                    paddingVertical: 10,
                                    justifySelf: 'flex-end',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                            >
                                <Text style={{color: '#40CB5A'}}>Lewati</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <StatusBar backgroundColor="blue" barStyle="light-content" />
                    <KeyboardAvoidingView style={Styles.container} behavior="padding" enabled>
                        <View
                            style={{
                                height: '90%'
                            }}
                        >
                            <ScrollView
                                scrollEnabled={this.state.scrollable}
                            >
                                <View style={Styles.containerWrapper}>
                                    <View
                                        style={Styles.containerFormInput}
                                    >
                                        <Text>Alamat Email</Text>
                                        <View style={Styles.formInputWrapper}>
                                            <TextInput
                                                onChangeText={(email) => this.setState({email})}
                                                keyboardType={'email-address'}
                                                style={Styles.formTextInput}
                                                value={this.state.email}
                                                placeholder="contoh: emailsaya@skmail.com"
                                            />
                                        </View>
                                    </View>
                                    <View
                                        style={Styles.containerFormInput}
                                    >
                                        <Text>Pendidikan</Text>
                                        <View style={Styles.formInputWrapper}>
                                            <Picker
                                                selectedValue={this.state.selectedPendidikan}
                                                style={{height: '100%', width: '100%'}}
                                                onValueChange={(itemValue, itemIndex) =>
                                                    this.setState({selectedPendidikan: itemValue})
                                                }>
                                                {this.renderListPendidikan()}
                                            </Picker>
                                        </View>
                                    </View>
                                    <View
                                        style={Styles.containerFormInput}
                                    >
                                        <Text>Pekerjaan</Text>
                                        <View style={Styles.formInputWrapper}>
                                            <Picker
                                                selectedValue={this.state.selectedPekerjaan}
                                                style={{height: '100%', width: '100%'}}
                                                onValueChange={(itemValue, itemIndex) =>
                                                    this.setState({selectedPekerjaan: itemValue})
                                                }>
                                                {this.renderListPekerjaan()}
                                            </Picker>
                                        </View>
                                    </View>
                                    <View
                                        style={Styles.containerFormInput}
                                    >
                                        <Text>Alamat tempat tinggal</Text>
                                        <View style={Styles.formInputWrapper}>
                                            <TextInput
                                                onChangeText={(alamat) => this.setState({alamat})}
                                                keyboardType={'default'}
                                                style={Styles.formTextInput}
                                                value={this.state.alamat}
                                                placeholder="Masukan alamat tempat anda tinggal sekarang"
                                            />
                                        </View>
                                    </View>
                                    <View style={Styles.containerFormInput}>
                                        <Text>Upload Foto Identitas</Text>
                                        <View style={Styles.formInputIdentitasWrapper}>
                                            <Ripple
                                                onPress={() => this.props.navigation.navigate('FotoKTP')}
                                                style={[Styles.formInputIdentitasList, {
                                                    borderBottomColor: '#aaa',
                                                    borderBottomWidth: 1,
                                                }]}
                                            >
                                                <View
                                                    style={Styles.formInputIdentitasListPhotoWrapper}
                                                >
                                                    <Icon 
                                                        type={'font-awesome'}
                                                        name={'user-circle'}
                                                        color={'#fff'}
                                                        size={24}
                                                    />
                                                </View>
                                                <View 
                                                    style={{
                                                        width: '50%',
                                                        paddingLeft: 20
                                                    }}>
                                                    <Text>Foto KTP</Text>
                                                </View>
                                                <View 
                                                    style={{
                                                        width: '25%',
                                                        alignItems: 'flex-end',
                                                        paddingRight: '5%'
                                                    }}>
                                                    <Icon 
                                                        type={'octicon'}
                                                        name={'chevron-right'}
                                                        color={'#aaa'}
                                                        size={24}
                                                    />
                                                </View>
                                            </Ripple>
                                            <Ripple
                                                style={Styles.formInputIdentitasList}
                                            >
                                                <View
                                                    style={Styles.formInputIdentitasListPhotoWrapper}
                                                >
                                                    <Icon 
                                                        type={'font-awesome'}
                                                        name={'user-circle'}
                                                        color={'#fff'}
                                                        size={24}
                                                    />
                                                </View>
                                                <View 
                                                    style={{
                                                        width: '50%',
                                                        paddingLeft: 20
                                                    }}>
                                                    <Text>Foto Selfie dengan KTP</Text>
                                                </View>
                                                <View 
                                                    style={{
                                                        width: '25%',
                                                        alignItems: 'flex-end',
                                                        paddingRight: '5%'
                                                    }}>
                                                    <Icon 
                                                        type={'octicon'}
                                                        name={'chevron-right'}
                                                        color={'#aaa'}
                                                        size={24}
                                                    />
                                                </View>
                                            </Ripple>
                                        </View>
                                    </View>
                                    
                                    <View style={{
                                        marginBottom: 10
                                    }}>
                                        <Text>Tanda Tangan</Text>
                                    </View>
                                    <View 
                                        style={{
                                            backgroundColor: '#fff', 
                                            height: 120,
                                            borderColor: '#ddd',
                                            borderWidth: 1,
                                            padding: 10,
                                            borderRadius: 5,
                                            overflow: "hidden"
                                        }}>
                                            {this.state.showWrapperTandaTangan == true ? this.renderTandaTangan() : this.renderButtonTandaTangan()}
                                    </View>
                                </View>
                            </ScrollView>
                        </View>
                    </KeyboardAvoidingView>
                </View>
                <View
                    style={[{
                        width: '100%',
                        position: 'absolute',
                        backgroundColor: '#fff',
                        paddingVertical: 10,
                        paddingHorizontal: 10,
                        bottom: 0,
                        justifyContent: 'flex-end',
                        flexDirection: 'row'
                    },Styles.shadow]}
                >
                    <View 
                        style={{
                            width: '70%'
                        }}
                    >
                        <Text style={{color: '#555'}}>Proses ke 4 dari 5</Text>
                    </View>
                    <View 
                        style={{
                            width: '30%',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'flex-end'
                        }}
                        >
                        {this.state.loader ? this.renderLoader() : this.renderButtonBerikutnya()}
                        
                    </View>
                </View>
            </SafeAreaView>
        )
    }
}

const Styles = new StyleSheet.create({
    container: {
        flex : 1,
    },
    containerFormInput: {
        marginVertical: 15
    },
    containerWrapper:{
        position: 'relative',
        padding: '5%',
        width: '100%',
        height: '100%',
    },
    header: {
        backgroundColor: '#333',
        height: screenHeightPercent(4)
    },
    content:{
        paddingTop: '10%',
        width: '100%',
        borderRadius: 10,
        height: '50%'
    },
    
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2, 
    },
    formInputWrapper:{
        borderBottomWidth: 1,
        borderBottomColor: '#bbb',
        width: '100%',
        height: 45,
        overflow: 'hidden',
        justifyContent: 'center',
    },
    formInputIdentitasWrapper: {
        borderWidth: 1,
        borderColor: '#bbb',
        width: '100%',
        borderRadius: 5,
        marginTop: 10,
        paddingHorizontal: 10,
        overflow: 'hidden',
        justifyContent: 'center',
    },
    formInputIdentitasList: {
        flexDirection: 'row',
        position: 'relative',
        paddingVertical: 10,
        alignItems: 'center'
    },
    formInputIdentitasListPhotoWrapper: {
        height: 60,
        width: '25%',
        borderRadius: 5,
        backgroundColor: '#ddd',
        justifyContent: 'center',
        alignItems: 'center'
    },
    formInputWrapperTandaTangan: {
        marginTop: 10,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 5,
        width: '100%',
        height: 100
    },
    formTextInput: {
        height: '100%',
        width: '100%',
        fontSize: 16
    },
    buttonDaftar: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: '#40CB5A',
        borderRadius: 5,
        overflow: 'hidden'
    },
    buttonLoginText: {
        color: '#555'
    }
    
})