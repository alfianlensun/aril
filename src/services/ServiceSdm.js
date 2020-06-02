import config from '../Config'
import {getToken} from '../middlewares/Middleware'
import moment from 'moment'
let abort = null
export async function getAbsensi(idMstPegawai, tanggalAwal, tanggalAkhir)
{
    let headers = {...config.headers}
    const token = await getToken()
    headers.Authorization = 'Bearer '+token
    try {
        let response = new Promise( async (resolve, reject) => {
            setTimeout(() => {
                reject()
            }, config.wsOption.timeout);

            abort = new AbortController()
            const signal = abort.signal;
            const fetchData =  await fetch(config.ws.nodeURL+'/sdm/absensi/'+idMstPegawai+'/'+tanggalAwal+'/'+tanggalAkhir, {
                method : 'GET',
                signal: signal,
                headers: headers
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

export async function getAbsensiMobile(idUser, tanggalAwal, tanggalAkhir)
{
    let headers = {...config.headers}
    const token = await getToken()
    headers.Authorization = 'Bearer '+token
    try {
        let response = new Promise( async (resolve, reject) => {
            setTimeout(() => {
                reject()
            }, config.wsOption.timeout);

            abort = new AbortController()
            const signal = abort.signal;
            const fetchData =  await fetch(config.ws.nodeURL+'/sdm/absensi/mobile/'+idUser+'/'+tanggalAwal+'/'+tanggalAkhir, {
                method : 'GET',
                signal: signal,
                headers: headers
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

export async function getAllRequestAbsensi(iduser)
{
    let headers = {...config.headers}
    const token = await getToken()
    headers.Authorization = 'Bearer '+token
    try {
        let response = new Promise( async (resolve, reject) => {
            setTimeout(() => {
                reject()
            }, config.wsOption.timeout);

            abort = new AbortController()
            const signal = abort.signal;
            const fetchData =  await fetch(config.ws.nodeURL+'/sdm/absensi/register-all', {
                method : 'GET',
                signal: signal,
                headers: headers,
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

export async function getFaceRecognitionAbsenRegisterById(id)
{
    let headers = {...config.headers}
    const token = await getToken()
    headers.Authorization = 'Bearer '+token
    try {
        let response = new Promise( async (resolve, reject) => {
            setTimeout(() => {
                reject()
            }, config.wsOption.timeout);

            abort = new AbortController()
            const signal = abort.signal;
            const fetchData =  await fetch(config.ws.nodeURL+'/sdm/absensi/register/'+id, {
                method : 'GET',
                signal: signal,
                headers: headers,
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

export async function getFaceRecognitionAbsenRegister(iduser)
{
    let headers = {...config.headers}
    const token = await getToken()
    headers.Authorization = 'Bearer '+token
    try {
        let response = new Promise( async (resolve, reject) => {
            setTimeout(() => {
                reject()
            }, config.wsOption.timeout);

            abort = new AbortController()
            const signal = abort.signal;
            const fetchData =  await fetch(config.ws.nodeURL+'/sdm/absensi/register-user/'+iduser, {
                method : 'GET',
                signal: signal,
                headers: headers,
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

export async function faceRecognitionAbsenRegister(photo, iduser)
{
    let headers = {...config.headers}
    const token = await getToken()
    headers.Authorization = 'Bearer '+token
    try {
        let response = new Promise( async (resolve, reject) => {
            setTimeout(() => {
                reject()
            }, config.wsOption.timeout);

            abort = new AbortController()
            const signal = abort.signal;
            const fetchData =  await fetch(config.ws.nodeURL+'/sdm/absensi/register', {
                method : 'PUT',
                signal: signal,
                headers: headers,
                body: JSON.stringify({
                    face: photo.base64,
                    iduser
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



export async function validasiRequestAbsensi(id, iduser, validType)
{
    let headers = {...config.headers}
    const token = await getToken()
    headers.Authorization = 'Bearer '+token
    try {
        let response = new Promise( async (resolve, reject) => {
            setTimeout(() => {
                reject()
            }, config.wsOption.timeout);

            abort = new AbortController()
            const signal = abort.signal;
            const fetchData =  await fetch(config.ws.nodeURL+'/sdm/absensi/validasi', {
                method : 'POST',
                signal: signal,
                headers: headers,
                body: JSON.stringify({
                    id,
                    iduser,
                    validType
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


export async function createAbsensi(photo, iduser, absenType)
{
    let headers = {...config.headers}
    const token = await getToken()
    headers.Authorization = 'Bearer '+token
    try {
        let response = new Promise( async (resolve, reject) => {
            setTimeout(() => {
                reject()
            }, config.wsOption.timeout);

            abort = new AbortController()
            const signal = abort.signal;
            const fetchData =  await fetch(config.ws.nodeURL+'/sdm/absensi', {
                method : 'PUT',
                signal: signal,
                headers: headers,
                body: JSON.stringify({
                    face: photo.base64,
                    iduser,
                    absenType,
                    datetime: moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
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


export async function getAktivitasByDate(date, id_user)
{
    let headers = {...config.headers}
    const token = await getToken()
    headers.Authorization = 'Bearer '+token
    try {
        let response = new Promise( async (resolve, reject) => {
            setTimeout(() => {
                reject()
            }, config.wsOption.timeout);

            abort = new AbortController()
            const signal = abort.signal;
            const fetchData =  await fetch(config.ws.nodeURL+'/sdm/bcp/aktivitas/'+date+'/'+id_user, {
                method : 'GET',
                signal: signal,
                headers: headers
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


export async function getListSubIndikator()
{
    let headers = {...config.headers}
    const token = await getToken()
    headers.Authorization = 'Bearer '+token
    try {
        let response = new Promise( async (resolve, reject) => {
            setTimeout(() => {
                reject()
            }, config.wsOption.timeout);

            abort = new AbortController()
            const signal = abort.signal;
            const fetchData =  await fetch(config.ws.nodeURL+'/sdm/sub-indikator/all', {
                method : 'GET',
                signal: signal,
                headers: headers
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

export async function createAktivitasPegawai(data)
{
    let headers = {...config.headers}
    const token = await getToken()
    headers.Authorization = 'Bearer '+token
    try {
        let response = new Promise( async (resolve, reject) => {
            setTimeout(() => {
                reject()
            }, config.wsOption.timeout);

            abort = new AbortController()
            const signal = abort.signal;
            const fetchData =  await fetch(config.ws.nodeURL+'/sdm/bcp/aktivitas', {
                method : 'PUT',
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

export async function getKredensialDokterById(IDPegawai)
{
    let headers = {...config.headers}
    const token = await getToken()
    headers.Authorization = 'Bearer '+token
    try {
        let response = new Promise( async (resolve, reject) => {
            setTimeout(() => {
                reject()
            }, config.wsOption.timeout);

            abort = new AbortController()
            const signal = abort.signal;
            const fetchData =  await fetch(config.ws.nodeURL+'/sdm/kredensial/'+IDPegawai, {
                method : 'GET',
                signal: signal,
                headers: headers
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
