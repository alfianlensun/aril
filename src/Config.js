import {deviceDetail} from './middlewares/VerifiedDevice'
const baseurlnode = 'https://bukanwebservice.rsupkandou.com:2020'
// const baseurlnode = 'http://192.168.43.240:4000'
// const baseurlnode = 'http://172.31.64.112:4000'
// sour
export default {
    ws: {
        url: 'https://bukanwebservice.rsupkandou.com:2020/api-v1',
        nodeURL: `${baseurlnode}/api-v1`,
        resources: {
            req_absen: `${baseurlnode}/image/request-absen`
        }
    },
    wsOption: {
        timeout: 20000
    },
    headers: {
        Accept: 'application/json',
        "Content-Type": 'application/json',
        Device: JSON.stringify(deviceDetail())
    },
    notification: {
        vibration: {
            pattern: [0, 200, 100, 200]
        }
    }
}
