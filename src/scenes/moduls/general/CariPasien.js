import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    FlatList,
    TextInput
} from 'react-native'
import {screenHeightPercent, screenWidthPercent} from '../../../helpers/Layout'
import {getData} from '../../../services/LocalStorage'
import {Icon} from 'react-native-elements'
import Ripple from 'react-native-material-ripple'
import {cariPasien, abortRequest} from '../../../services/ServicePencarian'
import ListPencarianPasien from '../../../components/list/ListPencarianPasien'
import LoaderListTindakan from '../../../components/loader/LoaderListTindakan'
import LinearGradient from 'react-native-linear-gradient'
import { background_color_gradient } from '../../../themes/Default'

export default class CariPasien extends Component {
    constructor(props){
        super(props)
        const params = this.props.route.params
        this.state = {
            userdetail: null,
            search: '',
            loader: false,
            paramsBed: params,
            listpencarian: [],
            goBack: params.goBack,
            nextTo: params.nextTo
        }
        
    }

    componentDidMount(){
        this.mounted = true
    }

    handleSearchKeyUp(search){
        if (search.length == 0){
            this.setState({
                loader: false,
                listpencarian: []
            })
        }
        this.timeOut = setTimeout(() => {
            abortRequest()
            this.setState({
                loader: true
            })
            cariPasien(search).then(resp => {
                this.setState({
                    loader: false,
                    listpencarian: resp
                })
            }).catch(err => {
                this.setState({
                    loader: false
                })
                console.log(err)
            })
        }, 500);
        
    }


    renderListPasien(){
        if (this.state.loader){
            return <View
                style={{
                    width: '100%',
                    paddingTop: '10%'
                }}
            >
                <LoaderListTindakan />
            </View>
        } else {
            return <View
                style={{
                    width: '100%',
                    paddingHorizontal: 20
                }}
            >
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={this.state.listpencarian}
                    renderItem={({ item }) => <ListPencarianPasien data={item} nextTo={this.state.nextTo} goBack={this.state.goBack} params={this.state.paramsBed} {...this.props}/>}
                    keyExtractor={item => item.Id} />
            </View>
        }
        
    }

    componentWillUnmount(){
        this.mounted = false
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
                <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
                <View style={Styles.header}></View>
                <View
                    style={{
                        paddingHorizontal: 20,
                        paddingVertical: 20,
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
                            onPress={() => this.props.navigation.canGoBack() ? this.props.navigation.goBack(null) : {}}
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
                                color={'#fff'}
                                size={24}
                            />
                        </Ripple>
                        <Text
                            style={{
                                fontSize: 18,
                                marginLeft: 10,
                                color:"#fff",
                            }}
                        >Cari Pasien </Text>
                    </View>
                    <Text
                        style={{
                            marginTop: 20,
                            fontSize: 13,
                            color: "#fff",
                            lineHeight: 20
                        }}
                    >Untuk mencari data pasien, silahkan gunakan form pencarian di bawah</Text>
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
                            paddingVertical: 10,
                            overflow: 'hidden'
                        }}
                    >
                        <View
                            style={{
                                width: '100%',
                                paddingHorizontal: 20
                            }}
                        >
                            <View
                                style={{
                                    width: '100%',
                                    height: 40,
                                    backgroundColor: '#fff',
                                    flexDirection: 'row',
                                    borderBottomWidth: 1,
                                    borderBottomColor: '#eee',
                                }}
                            >
                                <View
                                    style={{
                                        width: '15%',
                                        alignItems: 'flex-start',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <Icon 
                                        type={'ionicons'}
                                        name={'search'}
                                    />
                                </View>
                                <View 
                                    style={{
                                        width: '65%'
                                    }}
                                >
                                    <TextInput
                                        onSubmitEditing={() => {
                                            
                                        }}
                                        onChangeText={(search) => {
                                            this.setState({search})
                                            clearTimeout(this.timeOut)
                                            this.handleSearchKeyUp(search)
                                        }}
                                        style={[Styles.formTextInput]}
                                        value={this.state.search}
                                        placeholder="Norm / Nama Pasien"
                                    />
                                </View>
                                {this.state.search.length > 0 ? 
                                <Ripple
                                    onPress={() => this.setState({search: '', listpencarian: []})}
                                    rippleColor={'rgba(0,0,0,.4)'}
                                    style={{
                                        width: '20%',
                                        height: '100%',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <Icon 
                                        type={'ionicons'}
                                        name={'close'}
                                    />
                                </Ripple> : null}
                            </View>
                        </View>
                        <View
                            style={{
                                width: '100%',
                                height: '85%',
                            }}
                        >
                            {this.renderListPasien()}
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
    }
})