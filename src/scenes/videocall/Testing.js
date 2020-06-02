import React, {Component, createRef} from 'react'
import {
    View,
    Text
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
import { TouchableOpacity, TextInput } from 'react-native-gesture-handler';

export default class TestingVideo extends Component{
    constructor(props){
        super(props)
        this.state = {
            stream: null,
            sdpAnswer: '',
            remoteStream: null,
            remoteDesc: null,
            candidates: []
        }
        // this.ws = new WebSocket('ws://172.31.64.112:4000/realtime')   
    }

    async componentDidMount(){
        const configuration = {"iceServers": [{"url": "stun:stun.l.google.com:19302"}]};
        this.pc = new RTCPeerConnection(configuration);

        await this.openMediaDevices()

        
        // this.ws.onopen = () => {
        //     // this.sendToPeer('onopen', 'hallo world')
        // };
        
        // this.ws.onmessage = (e) => {
        //     const socket =  JSON.parse(e.data)

        //     // if (sdp.type === 'offerOrAnswer'){
        //     //     // if ()
        //     // }
        //     console.log(socket)
        //     // const message = JSON.parse(e)
        // };
        
        // this.ws.onerror = (e) => {
        //     console.log('!error', e.message);
        // }
        
        // this.ws.onclose = (e) => {
        // // connection closed
        //     console.log(e.code, e.reason);
        // };

        this.pc.onicecandidate = (e) => {
            if (e.candidate) {
                console.log(JSON.stringify(e.candidate))
                // this.sendToPeer('candidate', e.candidate)
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
                audio: true,
                video: {
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

    sendToPeer(type, payload){
        this.ws.send(JSON.stringify({
            type,
            payload
        }))
    }

    createOffer = async () => {
        try {
            const sdp = await this.pc.createOffer({offerToReceiveVideo: 1})
            this.pc.setLocalDescription(sdp)
            console.log('offer',JSON.stringify(sdp))
            // this.sendToPeer('offerOrAnswer', {
			// 	sdp,
			// 	id: 'mobile'
			// })
        } catch (err) {
            console.log('createOfferError', err.message)
        }
    }

    createAnswer = async () => {
        try {
            const sdp = await this.pc.createAnswer({offerToReceiveVideo: 1})
            this.pc.setLocalDescription(sdp)
            console.log(JSON.stringify(sdp))

            // this.sendToPeer('offerOrAnswer', {
			// 	sdp,
			// 	id: 'mobile'
			// })
        } catch (err) {
            console.log('createOfferError', err.message)
        }
    }

    createRemoteDesc = () => {
        const desc = JSON.parse(this.state.sdpAnswer)
        this.pc.setRemoteDescription(new RTCSessionDescription(desc)).catch(err => console.log('err create remote', err))
    }

    addCandidate = () => {
        const candidate = JSON.parse(this.state.sdpAnswer)
        // this.state.candidates.forEach(candidate => {
            this.pc.addIceCandidate(new RTCIceCandidate(candidate)).catch(err => console.log('err candidate', err))
        // })
    }

    render(){
        return (
            <View
                style={{
                    flex: 1
                }}
            >
                <TouchableOpacity
                    style={{
                        marginTop: 30
                    }}
                    onPress={() => {
                        this.createOffer()
                    }}
                >
                    <Text>Call</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        marginTop: 30
                    }}
                    onPress={() => {
                        this.createAnswer()
                    }}
                >
                    <Text>answer</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        marginTop: 30
                    }}
                    onPress={() => {
                        this.createRemoteDesc()
                    }}
                >
                    <Text>set remote desc</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        marginTop: 30
                    }}
                    onPress={() => {
                        this.addCandidate()
                    }}
                >
                    <Text>add candidate</Text>
                </TouchableOpacity>
                <TextInput
                    onChangeText={(sdpAnswer) => {
                        this.setState({sdpAnswer})
                    }}
                    value={this.state.sdpAnswer}
                    placeholder="answer"
                /> 
                <RTCView 
                    mirror={true}
                    streamURL={this.state.stream && this.state.stream.toURL()}
                    style={{
                        flex: 1,
                        rotation: 180
                    }}
                />
                <RTCView 
                    mirror={true}
                    streamURL={this.state.remoteStream && this.state.remoteStream.toURL()}
                    style={{
                        flex: 1,
                        rotation: 180
                    }}
                />
            </View>
        )
    }
}