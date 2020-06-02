import {getDetailTindakanNotifikasi} from '../services/ServiceTindakan'
export async function manageAutoNavigate(auto_load_menu, props){
    const {navigate_to, reference_id} = auto_load_menu
    if (navigate_to !== undefined){
        if (navigate_to === 'TindakanDetail'){
            getDetailTindakanNotifikasi(reference_id).then(resp => {
                if (resp.reqStat.code === 200){
                    props.navigation.navigate(navigate_to, resp.response)
                } else {
                    props.navigation.navigate('Tindakan')
                }
            })
        }
        else {
            props.navigation.navigate(navigate_to)
        }
    }
}