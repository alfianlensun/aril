import config from '../Config'
import {getToken} from '../middlewares/Middleware'

export async function getCaraKeluar()
{
    let headers = {...config.headers}
    const token = await getToken()
    headers.Authorization = 'Bearer '+token
    try {
        let response = new Promise(async (resolve, reject) => {
            setTimeout(() => {
                reject()
            }, config.wsOption.timeout);
            const fetchData =  await fetch(config.ws.nodeURL+'/master/cara-keluar', {
                method : 'GET',
                headers: headers
            })
            let responseStatus = await fetchData.status
            if (responseStatus === 200){
                resolve(fetchData.json())
            } else {
                reject(responseStatus)
            }
        }) 
        return response
    } catch (err){
        throw new Error(err);
    }
    
}

export async function getKeadaanKeluar()
{
    let headers = {...config.headers}
    const token = await getToken()
    headers.Authorization = 'Bearer '+token
    try {
        let response = new Promise(async (resolve, reject) => {
            setTimeout(() => {
                reject()
            }, config.wsOption.timeout);
            const fetchData =  await fetch(config.ws.nodeURL+'/master/keadaan-keluar', {
                method : 'GET',
                headers: headers
            })
            let responseStatus = await fetchData.status
            if (responseStatus === 200){
                resolve(fetchData.json())
            } else {
                reject(responseStatus)
            }
        }) 
        return response
    } catch (err){
        throw new Error(err);
    }
    
}