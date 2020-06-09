import React, {Component} from 'react'
import {
    View,
    Text,
    StatusBar,
    ImageBackground
} from 'react-native'
import {
    RTCPeerConnection,
    RTCIceCandidate,
    RTCSessionDescription,
    RTCView,
    MediaStream,
    MediaStreamTrack,
    mediaDevices,
    registerGlobals
} from 'react-native-webrtc';
import Ripple from 'react-native-material-ripple'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { screenHeightPercent, screenWidthPercent } from '../../helpers/Layout';
import io from 'socket.io-client'
import Feather from 'react-native-vector-icons/Feather'
import { shadow, shadowxl } from '../../themes/Default';
import { getData } from '../../services/LocalStorage';


export default class VideoCall extends Component{
    constructor(props){
        super(props)
        this.state = {
            calling: true,
            streamFront: true,
            callStatus: 1,
            calledUser: null,
            connectionStatus: null,
            remoteSdp: '',
            remoteDesc: null,
            candidates: [],
            remoteStream: null,
            stream: null,
            isCameraFront: false,
            mute: false,
            userdetail: null
        }

        this.socket = null
    }

    async componentDidMount(){
        try {
            const userdetail = await getData('AuthUser')
            this.setState({
                userdetail
            })
            const configuration = {"iceServers": [{"url": "stun:43.245.184.160:3478"}]};
            // initial peer connection
            this.pc = new RTCPeerConnection(configuration);

            // initial socket 
            this.socket = io("http://172.31.64.112:4001/webrtcPeer",{
                query: {}
            })

            await this.openMediaDevices()

            this.socket.on('connection-success', success => {
                
            })

            this.socket.on('link-video-call', data => {
                this.addCandidate()
            })

            this.socket.on('call-rejected', (data) => {
                if (userdetail._id === data.sender){
                    this.setState({
                        callStatus: 3
                    })
                }
            })

            this.socket.on('call-accepted', (data) => {
                if (userdetail._id === data.sender){
                    this.createOffer()
                    this.setState({
                        callStatus: 2
                    })
                }
            })

            this.socket.on('offerOrAnswer', async (sdp) => {
                this.setState({
                    remoteSdp: sdp
                })
                if (sdp.type === 'answer'){
                    await this.createRemoteDesc()
                    this.setState({
                        calling: false,

                    })
                    this.setState({
                        streamFront: false
                    })
                    this.socket.emit('link-video-call', {
                        senderSocketID: this.socket.id,
                        sender: userdetail._id,
                        receiver: '5eafa3a31f69736ca1997767'
                    })
                }
                if (sdp.type === 'offer'){
                    await this.createRemoteDesc()
                    await this.createAnswer()
                }
            })

            this.socket.on('candidate', (candidate) => {
                this.setState({
                    candidates: [...this.state.candidates, candidate]
                })
            })

            this.pc.onicecandidate = (e) => {
                if (e.candidate) {
                    this.sendToPeer('candidate', e.candidate)
                }
            }

            this.pc.oniceconnectionstatechange = (e) => {
                console.log(e)
            }

            this.pc.onaddstream = (e) => {
                this.setState({
                    remoteStream: e.stream
                })
            }
        }catch(err){
            alert(err.message)
        }
    }

    sendToPeer = (messageType, payload) => {
        this.socket.emit(messageType, {
            socketID: this.socket.id,
            payload
        })
    } 

    createOffer = async () => {
        try {
            console.log('create offer')
            const sdp = await this.pc.createOffer({offerToReceiveVideo: 1})
            this.pc.setLocalDescription(sdp)
            this.sendToPeer('offerOrAnswer', sdp)
        } catch (err) {
            console.log('createOfferError', err.message)
        }
    }

    createAnswer = async () => {
        try {
            const sdp = await this.pc.createAnswer({offerToReceiveVideo: 1})
            this.pc.setLocalDescription(sdp)
            this.sendToPeer('offerOrAnswer', sdp)
        } catch (err) {
            console.log('createOfferError', err.message)
        }
    }

    createRemoteDesc = () => {
        const desc = this.state.remoteSdp
        this.pc.setRemoteDescription(new RTCSessionDescription(desc)).catch(err => console.log('err create remote', err))
    }

    addCandidate = () => {
        this.state.candidates.forEach(candidate => {
            JSON.stringify(candidate)
            this.pc.addIceCandidate(new RTCIceCandidate(candidate)).catch(err => console.log('err candidate', err))
        })
    }

    openMediaDevices = async () => {
        let isFront = true;
        mediaDevices.enumerateDevices().then(sourceInfos => {
            let videoSourceId;
            for (let i = 0; i < sourceInfos.length; i++) {
                const sourceInfo = sourceInfos[i];
                if(sourceInfo.kind == "videoinput" && sourceInfo.facing == (isFront ? "front" : "environment")) {
                    videoSourceId = sourceInfo.deviceId;
                }
            }
            mediaDevices.getUserMedia({
                audio: false,
                video: {
                    width: { min: 640, ideal: 1280, max: 1920 },
                    height: { min: 480, ideal: 720, max: 1080 },
                    mandatory: {
                        minWidth: 500, 
                        minHeight: 300,
                        minFrameRate: 30
                    },
                    facingMode: (isFront ? "user" : "environment"),
                    optional: (videoSourceId ? [{sourceId: videoSourceId}] : [])
                }
            })
            .then(stream => {
                this.pc.addStream(stream)
                this.setState({
                    stream
                })
            })
            .catch(error => {
                console.log(error)
            })
        });
    }
    
    render(){
        return(
            <View
                style={{
                    flex: 1,
                    backgroundColor: '#fff'
                }}
            >
                <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
                <ImageBackground source={require('../../../assets/background/backgroundSignUp.jpg')} style={{flex: 1, position: 'relative',justifyContent: 'center' , alignItems: 'center'}} blurRadius={2}>
                    <RTCView 
                        mirror={this.state.streamFront ? !this.state.isCameraFront : false}
                        objectFit={'cover'}
                        streamURL={this.state.streamFront ? this.state.stream && this.state.stream.toURL() : this.state.remoteStream && this.state.remoteStream.toURL()}
                        style={{
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            zIndex: 1,
                        }}
                    />
                    <View
                        style={{
                            width: '100%',
                            height: '100%',
                            position: 'relative',
                            alignItems: 'center',
                            zIndex: 20,
                        }}
                    >
                        <View
                            style={{
                                width: '100%',
                                height:  screenHeightPercent(13),
                                position: 'absolute',
                                top: 0,
                                paddingHorizontal: 20,
                                flexDirection: "row",
                                justifyContent: 'center',
                                alignItems: 'flex-end'
                            }}
                        >
                            <View
                                style={{
                                    flex: 1
                                }}
                            >
                                {/* <Ripple
                                    style={{
                                        height: 50,
                                        width: 50,
                                        borderRadius: 50,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        backgroundColor: 'rgba(255,255,255,.3)',
                                        flexDirection: 'row'
                                    }}
                                >

                                </Ripple> */}
                            </View>
                            <View
                                style={{
                                    flex: 1,
                                    flexDirection: 'row',
                                    justifyContent: 'flex-end'
                                }}
                            >
                                 <Ripple
                                    onPress={() => {
                                        this.setState({
                                            isCameraFront: !this.state.isCameraFront
                                        })
                                        this.state.stream.getVideoTracks().forEach((track) => {
                                            track._switchCamera()
                                        })
                                    }}
                                    style={[{
                                        height: 50,
                                        width: 50,
                                        marginRight: 20,
                                        borderRadius: 50,
                                        overflow: 'hidden',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        backgroundColor: 'rgba(255,255,255,.5)',
                                        flexDirection: 'row'
                                    }]}
                                >
                                    <Ionicons name={'ios-reverse-camera'} size={30} color={'#fff'}/>
                                </Ripple>
                                 <Ripple
                                    style={[{
                                        height: 50,
                                        width: 50,
                                        borderRadius: 25,
                                        overflow: 'hidden',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        backgroundColor: 'rgba(255,255,255,.5)',
                                        flexDirection: 'row'
                                    }]}
                                >
                                    <Ionicons name={'ios-videocam'} size={30} color={'#fff'}/>   
                                </Ripple>
                            </View>
                        </View>
                        {this.state.calling && 
                            <View
                                style={{
                                    width: '100%',
                                    paddingTop: screenHeightPercent(25),
                                    alignItems: 'center'
                                }}
                            >
                                <View
                                    style={{
                                        width: screenWidthPercent(30),
                                        height: screenWidthPercent(30),
                                        borderRadius: screenWidthPercent(20),
                                        backgroundColor: 'rgba(255,255,255,.3)',
                                        overflow: 'hidden',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}
                                >
                                    <Feather name={'user'} size={50} color={'#fff'}/>
                                </View>
                                <Text
                                    style={{
                                        fontWeight: 'bold',
                                        fontSize: 20,
                                        marginTop: 30,
                                        color: '#fff'
                                    }}
                                >Dr. testing programmer</Text>
                                <Text
                                    style={{
                                        marginTop: 10,
                                        fontSize: 16,
                                        color: '#eee'
                                    }}
                                >Contacting...</Text>
                            </View>
                        }
                        {this.state.remoteStream && this.state.remoteStream.toURL() &&
                            <View
                                style={{
                                    position:'absolute',
                                    top: screenHeightPercent(15),
                                    right: 20,
                                    alignItems: 'flex-end',
                                    width: '100%'
                                }}
                            >
                                <View
                                    style={{
                                        height: 200,
                                        width:150,
                                        backgroundColor: '#000',
                                        alignItems: 'flex-end'
                                    }}
                                >
                                    <RTCView 
                                        mirror={this.state.streamFront ? false : !this.state.isCameraFront}
                                        objectFit={'cover'}
                                        streamURL={this.state.streamFront ? this.state.remoteStream && this.state.remoteStream.toURL() : this.state.stream && this.state.stream.toURL()}
                                        style={{
                                            position: 'absolute',
                                            width: '100%',
                                            height: '100%', 
                                            zIndex: 1,
                                        }}
                                    />
                                </View>
                            </View>
                        }
                        
                        <View
                            style={{
                                width: '100%',
                                height:  150,
                                position: 'absolute',
                                bottom: 0,
                                flexDirection: "row",
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            <Ripple
                                onPress={() => {
                                    this.state.stream.getTracks()[0].enabled = this.state.mute
                                    this.setState({
                                        mute: !this.state.mute
                                    })
                                }}
                                rippleColor={'rgba(255,255,255,.3)'}
                                style={{
                                    height: 60,
                                    width: 60,
                                    marginHorizontal: 20,
                                    backgroundColor: this.state.mute ? '#fff' : "rgba(255,255,255,.3)",
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius: 50
                                }}
                            >
                                {!this.state.mute ? 
                                    <MaterialIcons name={'mic-none'} size={30} color={'#fff'}/>:
                                    <MaterialIcons name={'mic-off'} size={30} color={'#333'}/>
                                }
                            </Ripple>
                            <Ripple
                                onPress={() => {
                                    this.props.navigation.goBack(null)
                                    if (this.state.callStatus === 1){
                                        this.socket.emit('cancel-call', {
                                            senderSocketID: this.socket.id,
                                            sender: this.state.userdetail !== null ? this.state.userdetail._id : null,
                                            receiver: '5eafa3a31f69736ca1997767'
                                        })
                                    }
                                }}
                                rippleColor={'rgba(255,255,255,.3)'}
                                style={{
                                    height: 60,
                                    width: 60,
                                    overflow: 'hidden',
                                    marginHorizontal: 20,
                                    backgroundColor: "#f56565",
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius: 50
                                }}
                            >
                                <MaterialIcons name={'call-end'} size={30} color={'#fff'}/>
                            </Ripple>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        )
    }
}