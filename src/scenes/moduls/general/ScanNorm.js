import React, {Component} from 'react'
import {
    Text,
    View,
    StyleSheet,
    StatusBar,
    ActivityIndicator
} from 'react-native'
import BarCodeScannerContainer from '../../../components/background/BarcodeScannerContainer'
import { screenWidthPercent, screenHeightPercent } from '../../../helpers/Layout';
import {getDetailPasien} from '../../../services/ServicePasien'
import { RNCamera } from 'react-native-camera';

export default class ScanNorm extends Component{
    constructor(props){
        super(props)
        const params = this.props.route.params
        
        this.state = {
            loader : false,
            hasCameraPermission: null,
            scanned: false,
            refreshing : false,
            flash: false,
            params,
            dataPasien: null,
            goBack: params.goBack,
            nextTo: params.nextTo
        }     
    }
    async componentDidMount(){
        this.mounted = true
    }

    componentWillUnmount(){
        this.mounted = false
    }

    handleBarCodeScanned = ({ type, data }) => {        
        this.setState({ 
            loader: true,
            scanned: true 
        })

        getDetailPasien(data).then(resp => {
            const {response} = resp
            if (this.mounted){
                this.setState({ 
                    loader: false,
                })
            }
            // this.props.navigation.goBack()

            if (this.state.goBack === true){
                this.props.route.params.returnData({dataPasien: response})
                this.props.navigation.goBack()
            } else {
                this.props.navigation.navigate(this.state.nextTo, {
                    params: this.state.params,
                    dataPasien: response
                }) 
            }
        })   
    };
    renderLoader(){
        return (<View
            style={{
                position: 'absolute',
                alignSelf: 'center',
                borderRadius: 10,
                top: screenHeightPercent(40),
                height: screenHeightPercent(20),
                width: screenHeightPercent(20),
                justifyContent: 'center',
                alignItems: 'center',

                backgroundColor: 'transparent',
                zIndex: 21
            }}
        >
            <Text
                style={{
                    color: '#fff',
                    fontWeight: 'bold',
                    marginBottom: 10
                }}
            >Mencari data pasien...</Text>
            <ActivityIndicator size="small" color="#00ff00" />
        </View>)
    }

    render(){
        const {scanned, scannerVisible} = this.state  
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: '#000'
                }}
            >
                <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
                <RNCamera
                    autoFocus={RNCamera.Constants.AutoFocus.on}
                    flashMode={this.state.flash ? RNCamera.Constants.FlashMode.torch : RNCamera.Constants.FlashMode.off}
                    onBarCodeRead={scanned ? undefined : this.handleBarCodeScanned}
                    style={{
                        flex: 1
                    }}  
                    captureAudio={false}
                    androidCameraPermissionOptions={{
                        title: 'Hallo',
                        message: 'Untuk melakukan scan barcode, aplikasi memerlukan izin penggunaan camera',
                        buttonPositive: 'Izinkan',
                        buttonNegative: 'Kembali',
                    }}                  
                >
                    <BarCodeScannerContainer 
                        {...this.props}
                        handleFlash={() => {
                            this.setState({
                                flash: !this.state.flash
                            })
                        }}
                        inputButton={this.state.goBack === true ? false : true}
                        onPressInput={() => this.props.navigation.navigate('CariPasien', {
                            goBack: false
                        })}
                        handleCancelPress={() => {
                            this.setState({
                                scannerVisible : false
                            })
                        }}
                    />
                </RNCamera>
                {this.state.loader ? this.renderLoader() : null}
            </View>
        )
    }
}

const Style = new StyleSheet.create({
    container: {
        flex : 1
    }
})