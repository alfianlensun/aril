import config from '../Config'
import {getToken} from '../middlewares/Middleware'
let abort = null
export async function cariPasien(search)
{
    try {
        console.log(config.ws.nodeURL+'/pasien/cari')
        let headers = {...config.headers}
        const token = await getToken()
        headers.Authorization = 'Bearer '+token
        let response = new Promise( async (resolve, reject) => {
            setTimeout(() => {
                reject()
            }, config.wsOption.timeout);

            abort = new AbortController()
            const signal = abort.signal;
            const fetchData =  await fetch(config.ws.nodeURL+'/pasien/cari', {
                method : 'POST',
                signal: signal,
                headers: headers,
                body: JSON.stringify({
                    search
                })
            }) 
            let responseStatus = await fetchData.status
            if (responseStatus === 200){
                abort = null
                resolve(fetchData.json())
            } else {
                abort = null
                reject(responseStatus)
            }
        }) 
        return response
    } catch (err){
        console.log(err)
        throw new Error(err);
    }
}

export async function abortRequest()
{
    try{
        if (abort !== null){
            await abort.abort()
        }
    }catch(err){
        throw new Error(err);
    }
}
