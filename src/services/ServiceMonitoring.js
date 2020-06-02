import config from '../Config'
import {getToken} from '../middlewares/Middleware'
export async function getSubInstalasi()
{
    let headers = {...config.headers}
    const token = await getToken()
    headers.Authorization = 'Bearer '+token
    try {
        let response = new Promise( async (resolve, reject) => {
            setTimeout(() => {
                reject()
            }, config.wsOption.timeout);
            const fetchData =  await fetch(config.ws.nodeURL+'/monitoring/sub-instalasi', {
                method : 'GET',
                headers:headers
            }) 
            let responseStatus = await fetchData.status
            if (responseStatus === 200){
                resolve(fetchData.json())
            } else {
                reject(fetchData.status)
            }
        }) 
        
        return response
    } catch (err){
        throw new Error(err);
    }
}

export async function getRuangan()
{
    let headers = {...config.headers}
    const token = await getToken()
    headers.Authorization = 'Bearer '+token
    try {
        let response = new Promise( async (resolve, reject) => {
            setTimeout(() => {
                reject()
            }, config.wsOption.timeout);
            const fetchData =  await fetch(config.ws.nodeURL+'/monitoring/ruangan', {
                method : 'GET',
                headers:headers
            }) 
            let responseStatus = await fetchData.status
            if (responseStatus === 200){
                resolve(fetchData.json())
            } else {
                reject(fetchData.status)
            }
        }) 
        
        return response
    } catch (err){
        throw new Error(err);
    }
}

export async function getKamar(IdMstRuangan)
{
    let headers = {...config.headers}
    const token = await getToken()
    headers.Authorization = 'Bearer '+token
    try {
        let response = new Promise( async (resolve, reject) => {
            setTimeout(() => {
                reject()
            }, config.wsOption.timeout);
            const fetchData =  await fetch(config.ws.nodeURL+'/monitoring/kamar/'+IdMstRuangan, {
                method : 'GET',
                headers: headers
            }) 
            let responseStatus = await fetchData.status
            if (responseStatus === 200){
                resolve(fetchData.json())
            } else {
                reject(fetchData.status)
            }
        }) 
        
        return response
    } catch (err){
        throw new Error(err);
    }
}

export async function getBed(IdMstKamar)
{
    let headers = {...config.headers}
    const token = await getToken()
    headers.Authorization = 'Bearer '+token
    try {
        let response = new Promise( async (resolve, reject) => {
            setTimeout(() => {
                reject()
            }, config.wsOption.timeout);
            const fetchData =  await fetch(config.ws.nodeURL+'/monitoring/bed/'+IdMstKamar, {
                method : 'GET',
                headers: headers
            }) 
            let responseStatus = await fetchData.status
            if (responseStatus === 200){
                resolve(fetchData.json())
            } else {
                reject(fetchData.status)
            }
        }) 
        
        return response
    } catch (err){
        throw new Error(err);
    }
}

export async function updateBedTerisi(IdBed, IdTrxPendaftaran, TanggalMasuk , Norm)
{
    console.log('update terisi')
    let headers = {...config.headers}
    const token = await getToken()
    headers.Authorization = 'Bearer '+token
    try {
        let response = new Promise( async (resolve, reject) => {
            setTimeout(() => {
                reject()
            }, config.wsOption.timeout);
            const fetchData =  await fetch(config.ws.nodeURL+'/monitoring/bed/status-terisi', {
                method : 'PUT',
                headers: headers,
                body: JSON.stringify({
                    IdBed,
                    IdTrxPendaftaran,
                    TanggalMasuk,
                    Norm
                })
            }) 
            let responseStatus = await fetchData.status
            if (responseStatus === 200){
                resolve(fetchData.json())
            } else {
                reject(fetchData.status)
            }
        }) 
        
        return response
    } catch (err){
        throw new Error(err);
    }
}

export async function updateBedKosong(IdBed, IdTrxPendaftaran, TanggalKeluar, Norm)
{
    let headers = {...config.headers}
    const token = await getToken()
    headers.Authorization = 'Bearer '+token
    try {
        let response = new Promise( async (resolve, reject) => {
            setTimeout(() => {
                reject()
            }, config.wsOption.timeout);
            const fetchData =  await fetch(config.ws.nodeURL+'/monitoring/bed/status-terisi', {
                method : 'POST',
                headers: headers,
                body: JSON.stringify({
                    IdBed,
                    IdTrxPendaftaran,
                    TanggalKeluar,
                    Norm
                })
            }) 
            let responseStatus = await fetchData.status
            if (responseStatus === 200){
                resolve(fetchData.json())
            } else {
                reject(fetchData.status)
            }
        }) 
        
        return response
    } catch (err){
        throw new Error(err);
    }
}



export async function updateRegisKeluar(IdBed, Norm ,TanggalKeluar, CaraKeluar, KeadaanKeluar, Keterangan)
{
    let headers = {...config.headers}
    const token = await getToken()
    headers.Authorization = 'Bearer '+token
    try {
        let response = new Promise( async (resolve, reject) => {
            setTimeout(() => {
                reject()
            }, config.wsOption.timeout);
            const fetchData =  await fetch(config.ws.nodeURL+'/monitoring/bed/regis-keluar', {
                method : 'PUT',
                headers: headers,
                body: JSON.stringify({
                    IdBed,
                    Norm,
                    TanggalKeluar,
                    CaraKeluar,
                    KeadaanKeluar,
                    Keterangan
                })
            }) 
            let responseStatus = await fetchData.status
            if (responseStatus === 200){
                resolve(fetchData.json())
            } else {
                reject(fetchData.status)
            }
        }) 
        
        return response
    } catch (err){
        throw new Error(err);
    }
}

export async function insertHistoryBed(IdBed, IdTrxPendaftaran, TanggalMasuk, Norm)
{
    console.log('insert bed')
    let headers = {...config.headers}
    const token = await getToken()
    headers.Authorization = 'Bearer '+token
    try {
        let response = new Promise( async (resolve, reject) => {
            setTimeout(() => {
                reject()
            }, config.wsOption.timeout);
            const fetchData =  await fetch(config.ws.nodeURL+'/monitoring/bed/history', {
                method : 'PUT',
                headers: headers,
                body: JSON.stringify({
                    IdBed,
                    IdTrxPendaftaran,
                    TanggalMasuk,
                    Norm
                })
            }) 
            let responseStatus = await fetchData.status
            if (responseStatus === 200){
                resolve(fetchData.json())
            } else {
                reject(fetchData.status)
            }
        }) 
        
        return response
    } catch (err){
        throw new Error(err);
    }
}