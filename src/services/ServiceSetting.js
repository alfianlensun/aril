import config from '../Config'
import {getToken} from '../middlewares/Middleware'

export async function getSettingAllSetting(idMstPegawai, tanggal = null)
{
    let headers = {...config.headers}
    try {
        return new Promise( async (resolve, reject) => {
            setTimeout(() => {
                reject()
            }, config.wsOption.timeout);
            const fetchData =  await fetch(config.ws.nodeURL+'/app/setting', {
                method : 'GET',
                headers
            }).catch(err => reject(err))
            
            let responseStatus = await fetchData.status
            if (responseStatus === 200){
                resolve(fetchData.json())
            } else {
                reject(responseStatus)
            }
        }) 
    } catch (err){
        throw new Error(err);
    }
}

export async function getVersionApp(version){
    let headers = {...config.headers}
    try {
        let response = new Promise( async (resolve, reject) => {
            setTimeout(() => {
                reject()
            }, config.wsOption.timeout);
            const fetchData =  await fetch(config.ws.nodeURL+'/version', {
                method : 'POST',
                headers,
                body: JSON.stringify({
                    version
                })
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

export async function createSettingRangeAccess(coordinates)
{
    let headers = {...config.headers}
    const token = await getToken()
    headers.Authorization = 'Bearer '+token
    try {
        let response = new Promise( async (resolve, reject) => {
            setTimeout(() => {
                reject()
            }, config.wsOption.timeout);
            const fetchData =  await fetch(config.ws.nodeURL+'/app/setting', {
                method : 'POST',
                headers,
                body: JSON.stringify({
                    coordinates
                })
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
