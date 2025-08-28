class WebRTCConnection {
    constructor(socketConn, clientId) {
        this.socketConn = socketConn;
        this.clientId = clientId;
        this.peerConnection = null;
        this.localStream = null;

        this.localVideo = document.getElementById('localVideo');
        this.remoteVideo = document.getElementById('remoteVideo');
        this.targetTxt = document.getElementById('targetID');

        this.registerSocketEvents();
    }

    async startLocalStream() {
        try {
            this.localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            this.localVideo.srcObject = this.localStream;
        } catch (error) {
            console.error('Error starting local stream', error);
        }
    }

    createPeerConnection(remoteId) {
        const config = {
            iceServers: [{
                urls: "stun:stun.l.google.com:19302"
            }]
        };
        this.peerConnection = new RTCPeerConnection(config);

        this.peerConnection.onicecandidate = (event) => {
            if (event.candidate) {
                this.sendIceCandidate(remoteId, event.candidate);
            }
        };

        this.peerConnection.ontrack = (event) => {
            this.remoteVideo.srcObject = event.streams[0];
        };

        if (this.localStream) {
            this.localStream.getTracks().forEach(track => {
                this.peerConnection.addTrack(track, this.localStream);
            });
        }

        return this.peerConnection;
    }

    async createOffer(remoteId) {
        if (!this.localStream) {
            alert("Start camera first!");
            return;
        }
        this.createPeerConnection(remoteId);
        const offer = await this.peerConnection.createOffer();
        await this.peerConnection.setLocalDescription(offer);
        this.sendSignal('offer', remoteId, offer);
    }

    async handleOffer(data, fromId) {
        this.createPeerConnection(fromId);
        await this.peerConnection.setRemoteDescription(new RTCSessionDescription(data));
        const answer = await this.peerConnection.createAnswer();
        await this.peerConnection.setLocalDescription(answer);
        this.sendSignal('answer', fromId, answer);
    }

    async handleAnswer(answer) {
        await this.peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
        console.log(answer)
    }

    async handleIceCandidate(candidate) {
        await this.peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
    }



    registerSocketEvents() {
        this.socketConn.on('offer', msg => {
            const senderId = msg?.from?.id;
            this.handleOffer(msg.data, senderId);
        });

        this.socketConn.on('answer', msg => {
            this.handleAnswer(msg?.data);
        });

        this.socketConn.on('ice-candidate', msg => {
            console.log('ice-candidate-user', msg)
            this.targetTxt.textContent = 'Target ID: - ' + msg?.from?.id;
            this.handleIceCandidate(msg.data);
        });
    }

    sendSignal(type, toId, data) {
        this.socketConn.send({
            type,
            toType: 'web',
            toId,
            data
        });
    }

    sendIceCandidate(toId, candidate) {
        this.sendSignal("ice-candidate", toId, candidate);
    }

    hangUp() {
        if (this.peerConnection) {
            this.peerConnection.close();
            this.peerConnection = null;
        }
        if (this.localStream) {
            this.localStream.getTracks().forEach(track => track.stop());
            this.localStream = null;
            this.localVideo.srcObject = null;
        }
        this.remoteVideo.srcObject = null;
    }
}
