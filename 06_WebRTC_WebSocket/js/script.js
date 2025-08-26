//url
const SIGNAL_WS_URL = "http://10.10.10.10:8050/ws";
const clientId = "Web-" + Math.floor(Math.random() * 10000);

// essential variables
let socket;
let connected = false;
let peerConnection;
let localStream;
let eventListner = new Map(); // all event are going into this 
let pc;

// get all Dom element 

const get = (id) => document.getElementById(id);

const localVideo = get('localVideo');
const remoteVideo = get('remoteVideo');
const submitTargetBtn = get('targetBtn');
const targetInput = get('targetInput');
const isConnectedBtn = get('connectionBtn');
const targetText = get('targetID');
const clientIdTxt = get('clientID');
const startCam = get('startCallBtn');
const hangupCam = get('hangUpCallBtn');

clientIdTxt.textContent = "Client ID: - " + clientId;

// step 1:- connect to the webSocket signaling server
// console.log("script is running")
function connectSignaling() {
    if (socket) return
    socket = new WebSocket(SIGNAL_WS_URL);

    //---register user first
    socket.onopen = () => {
        console.log('webSocket is running');
        connected = true;
        isConnectedBtn.innerText = 'Connected';

        socket.send(JSON.stringify(
            {
                type: 'register',
                clientType: 'web',
                id: clientId
            }
        ));
    }

    //---message event
    socket.onmessage = (event) => {
        try {
            const msg = JSON.parse(event.data);
            console.log('Message Recived', msg);

            const listener = eventListner.get(msg?.type);
            if (listener) {
                listener.forEach(cb => {
                    cb(msg)
                });
            }
        } catch (error) {
            console.log('Error parsing message: - ', error.message)
        }
    }

    //--- close socket
    socket.onclose = () => {
        connected = false;
        isConnectedBtn.innerText = 'Disconnected';
    }

    //----- error 
    socket.onerror = () => {
        console.error('websocket Error')
    }
}

//---------- close the connection ----------------//
function disconnect() {
    if (socket) {
        socket.close();
        socket = null;
        connected = false;
        eventListner.clear();
    }
}



//------ step 2: - Capture local video stream 

async function startLocalStream() {
    try {
        localStream = await navigator.mediaDevices.getUserMedia({
            video: true, audio: true
        })
        localVideo.srcObject = localStream;
        console.log("localStream", localStream)
    } catch (error) {
        console.log('Error acessing webcam', error.message)
    }

}

//----- start localstream on startCam  button
startCam.addEventListener('click', startLocalStream)
//------- hangup all events
hangupCam.addEventListener('click', hangUP)

//--------- step3 create peer connection

function createPeerConnection(remoteId) {
    const config = {
        iceServers: [{ urls: "stun:stun.l.google.com:19302" }]
    }
    pc = new RTCPeerConnection(config);

    pc.onicecandidate = (event) => {
        if (event.candidate) {
            sendIceCandidate("ice-candidate", "web", remoteId, event.candidate);
        }
    }

    pc.ontrack = (event) => {
        remoteVideo.srcObject = event.streams[0];
    }

    localStream.getTracks().forEach(track => {
        pc.addTrack(track, localStream);
    })
    return pc
}

function hangUP() {
    pc.close();
    localStream.getTracks().forEach((t) => t.stop());
}

//--- step 4:- handle offer/Answer Signaling
async function createOffer(remoteId) {
    peerConnection = createPeerConnection(remoteId)
    try {
        const offer = await peerConnection.createOffer();
        await peerConnection.setLocalDescription(offer);
        sendOffer("offer", "web", remoteId, offer);
    } catch (error) {
        console.log('Error while creating offer: ', error.message)
    }
}

async function handleOffer(offer, remoteId) {
    peerConnection = createPeerConnection(remoteId);
    try {
        await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
        const answer = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answer);
        sendAnswer("answer", "web", remoteId, answer);
    } catch (error) {
        console.log('Error handling offer: ', error)
    }
}

async function handleAnswer(answer) {
    try {
        if (peerConnection.signalingState !== 'stable') {
            await peerConnection.setRemoteDescription(new RTCSessionDescription(answer))

        } else {
            console.warn("Attempted to set remote description (answer) in stable state.")
        }
    } catch (error) {
        console.log("Error handling answer: ", error)
    }

}

async function handleIceCandidate(candidate) {
    try {
        await peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
    } catch (error) {
        console.error("Error adding ICE candidate: ", error);
    }
}

// Send message to the signaling server
function send(data) {
    if (socket && connected) {
        socket.send(JSON.stringify(data));
    } else {
        console.log("Cannot send, socket not connected");
    }
}

// Send offer, answer, ICE candidate, etc.
function sendOffer(type, toType, toId, data) {
    send({ type, toType, toId, data });
}

function sendAnswer(type, toType, toId, data) {
    send({ type, toType, toId, data });
}

function sendIceCandidate(type, toType, toId, data) {
    send({ type, toType, toId, data });
}

// Button Event Listeners
submitTargetBtn.addEventListener("click", () => {
    const targetId = targetInput.value;
    targetText.textContent = "Target ID: - " + targetId
    if (targetId && connected) {
        createOffer(targetId);
    } else {
        console.log("Please connect first or enter a valid target ID.");
    }
});

isConnectedBtn.addEventListener("click", () => {
    if (connected) {
        isConnectedBtn.innerText = "Disconnected";
        isConnectedBtn.style.color = 'red';
        disconnect();
    } else {
        isConnectedBtn.innerText = "Connected";
        isConnectedBtn.style.color = 'green';
        connectSignaling();
    }
});



// // Register Event Listeners
on("offer", (msg) => {
    handleOffer(msg?.data, msg?.from?.id);
});

on("answer", (msg) => {
    console.log("answer-Event--->", msg.data)
    handleAnswer(msg.data);
});

on("ice-candidate", (msg) => {
    console.log('ice-candidate--->', msg.data);
    handleIceCandidate(msg.data);
});
// Helper function to add event listeners for different message types
function on(event, callback) {
    if (!eventListner.has(event)) {
        eventListner.set(event, []);
    }
    eventListner.get(event)?.push(callback);
}