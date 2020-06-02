import {deviceDetail} from './middlewares/VerifiedDevice'
const baseurlnode = 'https://bukanwebservice.rsupkandou.com:2020'

export default {
    ws: {
        url: 'https://bukanwebservice.rsupkandou.com:2020/api-v1',
        // nodeURL: 'http://172.31.64.112:4000/api-v1',
        nodeURL: `${baseurlnode}/api-v1`,
        // nodeURL: 'https://bukanwebservice.rsupkandou.com:2020/api-v1',
        resources: {
            req_absen: `${baseurlnode}/image/request-absen`
        },
        // nodeURL: 'http://192.168.43.240:4000/api-v1',
        redis: 'https://nginx3.rsupkandou.com:4346'
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
