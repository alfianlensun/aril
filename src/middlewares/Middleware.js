import {getData} from '../services/LocalStorage'
export async function getToken(){
    try {
        const {jwtToken} = await getData('AuthUser')
        return jwtToken
    } catch(err){
        return ''
    }
}