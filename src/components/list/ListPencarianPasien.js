import React, {Component} from 'react'
import {
    Text,
    View
} from 'react-native'
import Ripple from 'react-native-material-ripple'
import {Icon} from 'react-native-elements'
import {capitalize} from '../../helpers/General'

export default class ListPencarianPasien extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return (
            <Ripple
                onPress={() => {
                    if (this.props.goBack === true){
                        this.props.route.params.returnData({dataPasien: this.props.data});
                        this.props.navigation.goBack(null);
                    } else {
                        this.props.navigation.navigate(this.props.nextTo, {
                            params: this.props.params,
                            dataPasien: this.props.data
                        })
                    }
                }}
                rippleColor={'rgba(0,0,0,.4)'}
                style={{
                    marginTop: 20,
                    height: 80,
                    position: 'relative',
                    borderBottomWidth: 1,
                    borderBottomColor: '#ccc',
                }}
            >
                <View
                    style={{
                        paddingHorizontal: 10,
                        flexDirection: 'row',
                    }}
                >
                    <Text
                        style={{
                            width: '100%',
                            color: '#222',
                            fontSize: 14,
                            fontWeight: 'bold',
                        }}
                        >{capitalize(this.props.data.Properties.nama_pasien)}</Text>
                </View>
                <View
                    style={{
                        marginTop: 2,
                        paddingHorizontal: 10,
                        width: '100%',
                        height: '100%',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        paddingBottom: 10,
                    }}
                >
                    <View
                        style={{
                            width: '80%'
                        }}
                    >
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginTop: 5
                            }}
                        >
                            <View
                                style={{
                                    width: '20%'
                                }}
                            >
                                <Text
                                    style={{
                                        alignSelf: 'flex-start',
                                        height: 16,
                                        backgroundColor: '#6ab1f7',
                                        color: '#fff',
                                        paddingHorizontal: 5,
                                        borderRadius: 30,
                                        fontSize: 10
                                    }}
                                >NORM</Text>
                            </View>
                            <Text
                                style={{
                                    width: '60%',
                                    color: '#222',
                                    fontSize: 12,
                                }}
                            >
                                {this.props.data.Properties.norm}
                            </Text>
                        </View>
                        
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginTop: 5,
                            }}
                        >
                            <View
                                style={{
                                    width: '20%'
                                }}
                            >
                                <Text
                                    style={{
                                        alignSelf: 'flex-start',
                                        height: 16,
                                        backgroundColor: '#6ab1f7',
                                        color: '#fff',
                                        paddingHorizontal: 5,
                                        borderRadius: 30,
                                        fontSize: 11
                                    }}
                                >TTL</Text>
                                </View>
                            <Text
                                style={{
                                    width: '60%',
                                    color: '#222',
                                    fontSize: 12,
                                }}
                                >{capitalize(this.props.data.Properties.tempat_lahir)} / {this.props.data.Properties.tanggal_lahir}</Text>
                        </View>
                    </View>
                    <View
                        style={{
                            width: '20%'
                        }}
                    >
                        <Icon 
                            type={'font-awesome'}
                            name={this.props.data.Properties.jenis_kelamin == 1 ? 'male' : 'female'}
                            color={'#444'}
                        />
                    </View>
                </View>
            </Ripple>
        )
    }
}