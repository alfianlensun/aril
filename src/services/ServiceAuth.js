
import config from '../Config'
import {getToken} from '../middlewares/Middleware'
let abort = null

export async function validateRegister(Kode, IDTelegram)
{
    try {
        let response = new Promise( async (resolve, reject) => {
            setTimeout(() => {
                reject()
            }, config.wsOption.timeout);
            const fetchData =  await fetch(config.ws.nodeURL+'/auth/sign-up/validate', {
                method : 'POST',
                headers: config.headers,
                body: JSON.stringify({
                    Kode,
                    IDTelegram
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

export async function cekUserRegister(NoHandphone)
{
    try {
        let response = new Promise( async (resolve, reject) => {
            setTimeout(() => {
                reject()
            }, config.wsOption.timeout);
            const fetchData =  await fetch(config.ws.nodeURL+'/auth/sign-up/check', {
                method : 'POST',
                headers: config.headers,
                body: JSON.stringify({
                    NoHandphone
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

export async function asyncUserData(IdUser){
    // /user/sync/:IdUser
    try {
        let response = new Promise(async (resolve, reject) => {
            setTimeout(() => {
                reject()
            }, config.wsOption.timeout);
            const fetchData =  await fetch(`${config.ws.nodeURL}/user/sync/${IdUser}`, {
                method : 'GET',
                headers: config.headers
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

export async function login(IDTelegram,Password, token)
{
    try {
        let response = new Promise(async (resolve, reject) => {
            setTimeout(() => {
                reject()
            }, config.wsOption.timeout);
            const fetchData =  await fetch(config.ws.nodeURL+'/auth/login', {
                method : 'POST',
                headers: config.headers, 
                body: JSON.stringify({
                    IDTelegram,
                    Password,
                    PushNotifToken: token
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

export async function faceRecognitionLogin(photo, token)
{
    try {
        let response = new Promise(async (resolve, reject) => {
            setTimeout(() => {
                reject()
            }, config.wsOption.timeout);
            // console.log(Data)
            abort = new AbortController()
            const signal = abort.signal;
            const fetchData =  await fetch(config.ws.nodeURL+'/auth/face-recognition', {
                method : 'POST',
                headers: config.headers, 
                body: JSON.stringify({
                    face: photo.base64,
                    signal,
                    token
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

export async function faceRecognitionDelete(id)
{
    try {
        let response = new Promise(async (resolve, reject) => {
            setTimeout(() => {
                reject()
            }, config.wsOption.timeout);
            // console.log(Data)

            const fetchData =  await fetch(config.ws.nodeURL+'/auth/face-recognition', {
                method : 'DELETE',
                headers: config.headers, 
                body: JSON.stringify({
                    id
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

export async function faceRecognitionUpdateOpsi(id, status)
{
    try {
        let response = new Promise(async (resolve, reject) => {
            setTimeout(() => {
                reject()
            }, config.wsOption.timeout);
            // console.log(Data)

            const fetchData =  await fetch(config.ws.nodeURL+'/auth/face-recognition/opsi', {
                method : 'POST',
                headers: config.headers, 
                body: JSON.stringify({
                    id,
                    status
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

export async function faceRecognitionRegister(photo, id)
{
    try {
        let response = new Promise(async (resolve, reject) => {
            setTimeout(() => {
                reject()
            }, config.wsOption.timeout);
            // console.log(Data)

            const fetchData =  await fetch(config.ws.nodeURL+'/auth/face-recognition', {
                method : 'PUT',
                headers: config.headers, 
                body: JSON.stringify({
                    face: photo.base64,
                    id
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

export async function validasiPassword(IDuser, Password){
    let headers = {...config.headers}
    const token = await getToken()
    headers.Authorization = 'Bearer '+token
    try {
        let response = new Promise( async (resolve, reject) => {
            setTimeout(() => {
                reject()
            }, config.wsOption.timeout);
            const fetchData =  await fetch(config.ws.nodeURL+'/auth/validasi-password', {
                method : 'POST',
                headers: headers, 
                body: JSON.stringify({
                    IDuser,
                    Password
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

export async function changePassword(IDTelegram,Password,PasswordLama)
{
    let headers = {...config.headers}
    const token = await getToken()
    headers.Authorization = 'Bearer '+token
    try {
        let response = new Promise( async (resolve, reject) => {
            setTimeout(() => {
                reject()
            }, config.wsOption.timeout);
            const fetchData =  await fetch(config.ws.nodeURL+'/auth/change-password', {
                method : 'POST',
                headers: headers, 
                body: JSON.stringify({
                    IDTelegram,
                    Password,
                    PasswordLama
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

export async function getUserMenu(IDTelegram)
{
    console.log(config.ws.nodeURL+'/auth/user-menu')
    let headers = {...config.headers}
    const token = await getToken()
    headers.Authorization = 'Bearer '+token
    try {
        let response = new Promise( async (resolve, reject) => {
            setTimeout(() => {
                reject()
            }, config.wsOption.timeout);
            const fetchData =  await fetch(config.ws.nodeURL+'/auth/user-menu', {
                method : 'POST',
                headers, 
                body: JSON.stringify({
                    IDTelegram
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

export async function getListUser()
{
    let headers = {...config.headers}
    const token = await getToken()
    headers.Authorization = 'Bearer '+token
    try {
        let response = new Promise( async (resolve, reject) => {
            setTimeout(() => {
                reject()
            }, config.wsOption.timeout);
            const fetchData =  await fetch(config.ws.nodeURL+'/auth/user', {
                method : 'GET',
                headers: headers,
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

export async function updateUser(data)
{
    let headers = {...config.headers}
    const token = await getToken()
    headers.Authorization = 'Bearer '+token
    try {
        let response = new Promise( async (resolve, reject) => {
            setTimeout(() => {
                reject()
            }, config.wsOption.timeout);
            const fetchData =  await fetch(config.ws.nodeURL+'/auth/user', {
                method : 'POST',
                headers: headers,
                body: JSON.stringify(data)
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

export async function userRegister(IDTelegram,Password, PushNotificationToken)
{
    try {
        let response = new Promise( async (resolve, reject) => {
            setTimeout(() => {
                reject()
            }, config.wsOption.timeout);
            const fetchData =  await fetch(config.ws.nodeURL+'/auth/sign-up/user', {
                method : 'PUT',
                headers: config.headers, 
                body: JSON.stringify({
                    IDTelegram,
                    Password,
                    PushNotificationToken
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


export async function userMenu(IDTelegram)
{
    let headers = {...config.headers}
    const token = await getToken()
    headers.Authorization = 'Bearer '+token
    try {
        let response = new Promise( async (resolve, reject) => {
            setTimeout(() => {
                reject()
            }, config.wsOption.timeout);
            const fetchData =  await fetch(config.ws.nodeURL+'/auth/menu', {
                method : 'PUT',
                headers: headers, 
                body: JSON.stringify({
                    IDTelegram,
                    Password,
                    PushNotificationToken
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


export async function getProfilUser(IdSdmTrxKepegawaian)
{
    let headers = {...config.headers}
    const token = await getToken()
    headers.Authorization = 'Bearer '+token
    try {
        let response = new Promise( async (resolve, reject) => {
            setTimeout(() => {
                reject()
            }, config.wsOption.timeout);
            const fetchData =  await fetch(config.ws.nodeURL+'/auth/profil/'+IdSdmTrxKepegawaian, {
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