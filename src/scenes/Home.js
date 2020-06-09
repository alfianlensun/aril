import React, {Component, createRef} from 'react'
import {
    Text,
    View,
    StyleSheet,
    ImageBackground,
    StatusBar,
    FlatList,
    PermissionsAndroid,
    ScrollView,
    RefreshControl
} from 'react-native'
import {
    getData
} from '../services/LocalStorage'
import {getUserMenu} from '../services/ServiceAuth'
import {screenHeightPercent, screenWidthPercent} from '../helpers/Layout'
import CardMenu from '../components/cards/CardMenu'
import {getPushNotificationToken, registerForPushNotifications} from '../services/PushNotification'
import {Icon} from 'react-native-elements'
import Ripple from 'react-native-material-ripple'
import ListMenu from '../components/list/ListMenu'
import SlidingUpPanel from 'rn-sliding-up-panel'
import AmbilAbsen from './moduls/absen/AmbilAbsen'
import { shadow, container_background, background_color, icon_color_primary, text_size, text_color_default, text_color_gray_800 } from '../themes/Default'
import NavAbsen from '../components/nav/NavAbsen'
import Fontisto from 'react-native-vector-icons/Fontisto'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import LoaderMenuUtama from '../components/loader/LoaderMenuUtama'
import LinearGradient from 'react-native-linear-gradient';
import { getKredensialDokterById } from '../services/ServiceSdm'
import CardKredensial from '../components/cards/CardKredensial'
import { checkUserGeofencing } from '../actions/Location'


export default class Home extends Component{
    constructor(props){
        super(props)
        this.state = {
            userdetail: null,
            loaderMenu: true,
            userListMenu: [],
            absenType: [],
            faceRecognitionStatus: 0,
            scanFaceMessage: 'Hadapkan wajah anda ke camera',
            sliderUpContentHeight: 400,
            kredensial: []
        }
        this.sliderUp = createRef()
    }

    componentDidMount(){
        this.mounted = true
        this.setState({
            loaderMenu: true,
        })
        getData('AuthUser').then(data => {
            this.getKredensialDokter(data.user_detail.id_sdm_trx_kepegawaian)
            if (this.mounted){
                this.setState({
                    loaderMenu: false,
                    userdetail: data
                })
            }
            if (data == null){
                this.props.navigation.replace('login')
            } else {
                this.getListUserMenu(data)
            }
        })   
    }

    getKredensialDokter = async (IDPegawai) => {
        try {
            const {response} = await getKredensialDokterById(IDPegawai)
        
            this.setState({
                kredensial: response !== undefined ? response : []
            })
        } catch(err){
            alert(err.message)
        }
    }

    async getListUserMenu(data){
        try{
            if (data.id_telegram !== undefined){
                this.setState({
                    loaderMenu: true,
                })
                const {response} = await getUserMenu(data.id_telegram)
                let listmenu = []

                switch (response.account_type) {
                    case "0":
                        listmenu = response.listmenu.map(item => {
                            let icon = <Ionicons name={'ios-apps'} size={30} color={'#fff'} />
                            switch (item.icon_type) {
                                case "fontawesome":
                                    icon = <FontAwesome name={item.icon} size={30} color={'#fff'} />
                                    break;
                                case "fontisto":
                                    icon = <Fontisto name={item.icon} size={25} color={'#fff'} />
                                    break;
                                case "feather":
                                    icon = <Feather name={item.icon} size={25} color={'#fff'} />
                                    break;
                                case "ionicons":
                                    icon = <Ionicons name={item.icon} size={25} color={'#fff'} />
                                    break;
                                case "materialcommunityicons":
                                    icon = <MaterialCommunityIcons name={item.icon} size={25} color={'#fff'} />
                                    break;
                                
                                default:
                                    break;
                            }
                            return {
                                icon: icon,
                                hasAccess: {
                                    read: true,
                                    write: true
                                }, 
                                title: item.title_menu,
                                navigateTo: item.route_name
                            }
                        })
                        break;
                
                    default:
                        listmenu = response.listmenu.map(item => {
                            return {
                                icon: <Icon name={item.icon} type={item.icon_type} size={25} color={'#fff'}/>,
                                hasAccess: {
                                    read: item.read,
                                    write: item.write
                                }, 
                                title: item.title_menu,
                                navigateTo: item.navigate_to
                            }
                        })
                        break;
                }
              
                if (this.mounted){
                    this.setState({
                        loaderMenu: false,
                        userListMenu: listmenu
                    })
                }
            } else {
                throw new Error('ID Telegram not exist')
            }
        }catch(err){
            alert(err.message)
        }
    }

    componentWillUnmount(){
        this.mounted = false
    }

    onPressAbsenMasuk = async () => {
        try {
            const checkPermissionLocation = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
            const checkPermissionCamera = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA)
            await checkUserGeofencing(this.props)

            this.props.setUserPermission(this.props.userPermission, {
                camera: checkPermissionCamera, 
                location: checkPermissionLocation
            })
            this.sliderUp.current.show({
                type: 1,
                userdata:this.state.userdetail,
            })
        } catch(err){
            alert(err) 
        }
    }
    
    onPressAbsenPulang = async () => {
        try {
            const checkPermissionLocation = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
            const checkPermissionCamera = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA)
            await checkUserGeofencing(this.props)
            this.props.setUserPermission(this.props.userPermission, {
                camera: checkPermissionCamera, 
                location: checkPermissionLocation
            })
            this.sliderUp.current.show({
                type: 2,
                userdata:this.state.userdetail
            })
        } catch(err){
            console.log(err)
            alert(err) 
        }
    }


    renderListMenu(){
        const {userListMenu,userdetail} = this.state
        return userListMenu.map((item, id) => {
            return item.hasAccess && (
                <Ripple
                    key={id.toString()}
                    onPress={() => this.props.navigation.navigate(item.navigateTo)}
                    rippleColor={'rgba(0,0,0,.4)'}
                    style={{
                        marginTop: 10,
                        width: '25%',
                        borderRadius: 10,
                        overflow: 'hidden',
                        paddingVertical: 5,
                        paddingHorizontal: 10
                    }}
                >
                    <CardMenu 
                        title={item.title}
                        icon={item.icon}
                    />
                </Ripple>
            )
        })
    }

    render(){
        const {userdetail ,user_access_menu} = this.state
        return (
            <View 
                style={{
                    flex: 1,
                    flexDirection: 'column',
                    backgroundColor: '#fff'
                }}
            >
                <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
                <ScrollView
                    style={{
                        flex: 1
                    }}
                >
                    <View
                        style={{
                            width: '100%'
                        }}
                    >
                        <View
                            style={{
                                position: 'relative',
                                height: screenWidthPercent(88),
                                paddingHorizontal: screenWidthPercent(5),
                                paddingVertical: 20,
                                flexDirection: 'column',
                                justifyContent: 'flex-end',
                                backgroundColor: container_background
                            }}
                        >
                            <View style={[Styles.headerBackground]}>
                                <ImageBackground
                                    blurRadius={1}
                                    source={require('../../assets/background/background2.jpg')} 
                                    style={{
                                    width: '80%',
                                    height: '80%',
                                    left: screenWidthPercent(30),
                                    top: screenWidthPercent(100),
                                    position: 'absolute',
                                    resizeMode: 'stretch'
                                }}>
                                    <View
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            backgroundColor: 'rgba(0,0,0,.3)'
                                        }}
                                    >
                                        
                                    </View>
                                </ImageBackground>
                            </View>
                            <View
                                style={{
                                    paddingTop: screenHeightPercent(15),
                                    height: '100%',
                                    flexDirection: 'row',
                                    width: '100%',
                                }}
                            >
                                <View
                                    style={{
                                        width: '70%'
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: '#fff'
                                        }}
                                    >Selamat Datang</Text>
                                    <Text
                                        style={{
                                            marginTop: 10,
                                            fontSize: 14,
                                            fontWeight: 'bold',
                                            color: '#fff'
                                        }}
                                    >{this.state.userdetail !== null ? this.state.userdetail.user_detail.nama_pegawai : ''}</Text>
                                </View>
                                <View
                                    style={{
                                        width: '30%',
                                        alignItems: 'flex-end'
                                    }}
                                >
                                    <Ripple 
                                        onPress={() => this.props.navigation.navigate('ListUserChat')}
                                        style={{
                                            display: 'none',
                                            height: 50,
                                            width: 50,
                                            borderRadius: 50,
                                            overflow: 'hidden',
                                            backgroundColor: container_background,
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <Ionicons name="ios-chatbubbles" size={25} color={icon_color_primary}/>
                                    </Ripple>
                                </View>
                            </View>
                            <NavAbsen 
                                onPressAbsenMasuk={() => this.onPressAbsenMasuk()}
                                onPressAbsenPulang={() => this.onPressAbsenPulang()}
                                {...this.props} />
                        </View>
                        <View
                            style={{
                                position: 'relative',
                                paddingBottom: 20,
                                backgroundColor: '#fff'
                            }}
                        >
                            {this.state.kredensial.length > 0 && <CardKredensial data={this.state.kredensial[0]}/>}
                            <View
                                style={{
                                    marginTop: 10,
                                    width: '100%',
                                    flexDirection: 'row',
                                    flexWrap: 'wrap',
                                    alignItems: 'stretch',
                                    flexBasis: '25%',
                                    position: 'relative',
                                    paddingHorizontal: 20
                                }}
                            >
                                {this.state.loaderMenu ? 
                                    <View
                                        style={{
                                            marginTop:10,
                                            width: '100%',
                                            paddingLeft: '5%',
                                            flexDirection: 'column',
                                        }}
                                    >
                                        <View
                                            style={{
                                                flexDirection: 'row'
                                            }}
                                        >
                                            <LoaderMenuUtama />
                                        </View>
                                        <View
                                            style={{
                                                marginTop: 20,
                                                flexDirection: 'row'
                                            }}
                                        >
                                            <LoaderMenuUtama />
                                        </View>
                                    </View>
                                    :
                                    this.renderListMenu()
                                }
                                
                            </View>
                        </View>
                    </View>
                </ScrollView>
                {this.state.userdetail !== null && 
                    <AmbilAbsen 
                        ref={this.sliderUp}
                        {...this.props}
                    />
                }
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
    imageBackground: {
        width: '100%',
        height: '100%',
    },
    header: {
        height: screenHeightPercent(6),
        backgroundColor: background_color
    },
    headerBackground: {
        position: 'absolute',
        overflow: 'hidden',
        overflow: 'hidden',
        top: -screenWidthPercent(100),
        borderRadius: screenWidthPercent(180),
        left: -screenWidthPercent(40),
        height: screenWidthPercent(180),
        width: screenWidthPercent(180),
    }
})
