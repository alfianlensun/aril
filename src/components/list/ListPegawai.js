import React , {Component} from 'react'
import {
    View,
    Text
} from 'react-native'
import Ripple from 'react-native-material-ripple'
import { icon_color_primary } from '../../themes/Default'
import {Icon} from 'react-native-elements'
import moment from 'moment'
export default function ListPegawai(props){
    return (
        <Ripple
            onPress={() => props.navigation.navigate('MonitoringAbsenMap', {
                dataunitkerja: {
                    tanggaldipilih: moment(new Date()).format('YYYY-MM-DD'),
                    id_user_mobile: props.data.iduser,
                    unitKerja: {
                        id_unit_kerja: props.data.id_unit_kerja,
                        nama_unit_kerja: props.data.nama_unit_kerja,
                        value: props.data.nama_unit_kerja
                    }
                }
            })}
            rippleColor={'rgba(0,0,0,.4)'}
            style={{
                width: '100%',
                marginTop: 10,
                position: 'relative'
            }}
        >
            <View
                style={{
                    flex: 1,
                    paddingVertical: 10,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderBottomWidth: 1,
                    borderBottomColor: icon_color_primary,
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
                    >{props.data.nama_pegawai}</Text>
                    <Text
                        style={{
                            color: '#444',
                            fontSize: 12,
                            marginTop: 5
                        }}
                    >NIP / NRPK: {props.data.nip}</Text>
                </View>
                <View
                    style={{
                        width: '20%'
                    }}
                >
                    <Icon 
                        type={'font-awesome'}
                        name={'user'}
                        color={'#444'}
                        size={18} 
                    />
                </View>
            </View>
        </Ripple>
    )
}