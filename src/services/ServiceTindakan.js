import config from '../Config'
import {getToken} from '../middlewares/Middleware'
export async function getListTindakanDokter(idMstPegawai, tanggal = null)
{
    let headers = {...config.headers}
    const token = await getToken()
    headers.Authorization = 'Bearer '+token
    try {
        let response = new Promise( async (resolve, reject) => {
            setTimeout(() => {
                reject()
            }, config.wsOption.timeout);
            const fetchData =  await fetch(config.ws.nodeURL+'/tindakan/list-tindakan/dokter/'+idMstPegawai+'/'+tanggal, {
                method : 'GET',
                headers
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


export async function getSliderJmlTindakanDokter(idMstPegawai)
{
    let headers = {...config.headers}
    const token = await getToken()
    headers.Authorization = 'Bearer '+token
    try {
        let response = new Promise( async (resolve, reject) => {
            setTimeout(() => {
                reject()
            }, config.wsOption.timeout);
            const fetchData =  await fetch(config.ws.nodeURL+'/tindakan/slider-tindakan/dokter/'+idMstPegawai, {
                method : 'GET',
                headers
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

export async function getDetailTindakanDokter(idTrxTindakan)
{
    let headers = {...config.headers}
    const token = await getToken()
    headers.Authorization = 'Bearer '+token
    try {
        let response = new Promise( async (resolve, reject) => {
            setTimeout(() => {
                reject()
            }, config.wsOption.timeout);
            const fetchData =  await fetch(config.ws.nodeURL+'/tindakan/tindakan-detail/dokter', {
                method : 'POST',
                headers, 
                body: JSON.stringify({
                    idTrxTindakan
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

export async function getDetailTindakanNotifikasi(idTrxTindakan)
{
    let headers = {...config.headers}
    const token = await getToken()
    headers.Authorization = 'Bearer '+token
    try {
        let response = new Promise( async (resolve, reject) => {
            setTimeout(() => {
                reject()
            }, config.wsOption.timeout);
            const fetchData =  await fetch(config.ws.nodeURL+'/tindakan/notifikasi', {
                method : 'POST',
                headers: headers, 
                body: JSON.stringify({
                    idTrxTindakan
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




