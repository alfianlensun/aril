import config from '../Config'
import {getToken} from '../middlewares/Middleware'
let abort = null
export async function GET(url,...params){
    try {
        let url_parameter = params.length > 0 ? '/'+params.join('/') : ''
        let headers = {...config.headers}
        const token = await getToken()
        headers.Authorization = 'Bearer '+token
        return new Promise( async (resolve, reject) => {
            setTimeout(() => {
                reject()
            }, config.wsOption.timeout)
            const fetchData =  await fetch(`${url}${url_parameter}`, {
                method : 'GET',
                headers
            }).catch(err => reject(err))
            
            let responseStatus = await fetchData.status
            if (responseStatus === 200){
                resolve(fetchData.json())
            } else {
                reject({
                    response: responseStatus
                })
            }
        }) 
    } catch(err){
        throw new Error(err)
    }
}

export async function GET_TOKEN_OFF(url, ...params){
    try {
        let url_parameter = params.length > 0 ? '/'+params.join('/') : ''
        let headers = {...config.headers}
        
        return new Promise( async (resolve, reject) => {
            setTimeout(() => {
                reject()
            }, config.wsOption.timeout);
            const fetchData =  await fetch(`${url}${url_parameter}`, {
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
        throw new Error(err)
    }
}


export async function POST(url, data){
    try {
        let headers = {...config.headers}
        const token = await getToken()
        headers.Authorization = 'Bearer '+token
        let response = new Promise( async (resolve, reject) => {
            setTimeout(() => {
                reject()
            }, config.wsOption.timeout);

            abort = new AbortController()
            const signal = abort.signal;
            const fetchData =  await fetch(url, {
                method : 'POST',
                signal: signal,
                headers: headers,
                body: JSON.stringify(data)
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
        throw new Error(err);
    }
}

export async function POST_TOKEN_OFF(url, data){
    try {
        let headers = {...config.headers}
        let response = new Promise( async (resolve, reject) => {
            setTimeout(() => {
                reject()
            }, config.wsOption.timeout);

            abort = new AbortController()
            const signal = abort.signal;
            const fetchData =  await fetch(url, {
                method : 'POST',
                signal: signal,
                headers: headers,
                body: JSON.stringify(data)
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
        throw new Error(err);
    }
}

export async function DELETE(url, data){
    try {
        let headers = {...config.headers}
        const token = await getToken()
        headers.Authorization = 'Bearer '+token
        let response = new Promise( async (resolve, reject) => {
            setTimeout(() => {
                reject()
            }, config.wsOption.timeout);

            abort = new AbortController()
            const signal = abort.signal;
            const fetchData =  await fetch(url, {
                method : 'DELETE',
                signal: signal,
                headers: headers,
                body: JSON.stringify(data)
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
        throw new Error(err);
    }
}