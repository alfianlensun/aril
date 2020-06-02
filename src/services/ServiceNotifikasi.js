import config from '../Config'
import {getToken} from '../middlewares/Middleware'
export async function getNotifikasi(idUser)
{
    let headers = {...config.headers}
    const token = await getToken()
    headers.Authorization = 'Bearer '+token
    try {
        let response = new Promise( async (resolve, reject) => {
            setTimeout(() => {
                reject()
            }, config.wsOption.timeout);
            const fetchData =  await fetch(config.ws.nodeURL + '/notifikasi/user', {
                method : 'POST',
                headers, 
                body: JSON.stringify({
                    idUser
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

export async function changeStatusBaca(IdNotifikasi)
{
    let headers = {...config.headers}
    const token = await getToken()
    headers.Authorization = 'Bearer '+token
    try {
        let response = new Promise( async (resolve, reject) => {
            setTimeout(() => {
                reject()
            }, config.wsOption.timeout);
            const fetchData =  await fetch(config.ws.nodeURL + '/notifikasi/status-baca', {
                method : 'POST',
                headers: headers, 
                body: JSON.stringify({
                    IdNotifikasi
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