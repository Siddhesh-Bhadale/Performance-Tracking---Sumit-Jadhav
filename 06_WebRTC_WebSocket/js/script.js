// Configuration constants
const SIGNAL_WS_URL = "http://10.10.10.10:8050/ws"; // Ensure ws:// is used, not http://
const clientId = "Web-" + Math.floor(Math.random() * 10000);

// DOM elements
const localVideo = document.getElementById("local-client-video");
const remoteVideo = document.getElementById("remote-client-video");
const startCallBtn = document.getElementById("startCall");
const submitTargetBtn = document.getElementById("submitTargetBtn");
const targetIdInput = document.getElementById("targetIdInput");
const logs = document.getElementById("debugConsole")
const targetID = document.getElementById("targetID");
const clientUniqueId = document.getElementById('clientID');
const isConnected = document.getElementById('isConnectedBtn');

let connected = false;

// WebRTC variables
let pc;
let localStream;
let ws;
let iceCandidatesQueue = []

// Step 1: Connect to WebSocket signaling server
function connectSignaling() {
    ws = new WebSocket(SIGNAL_WS_URL);

    ws.onopen = () => {
        console.log("step:1--> Connected to signaling server");
        // Register this client
        ws.send(JSON.stringify({
            type: "register",
            clientType: "web",
            id: clientId,
        }));
    };

    clientUniqueId.textContent = "Client ID: - " + clientId

    ws.onmessage = async (msg) => {
        console.log(msg)
        const payload = JSON.parse(msg.data);
        console.log("step 2---> Received from signaling server:", payload);

        switch (payload.type) {
            case "system-message":
                console.log("System message run")
                break;
            case "offer":
                console.log("offer run")
                await handleOffer(payload);
                break;
            case "answer":
                console.log("answer run")
                await handleAnswer(payload);
                break;
            case "ice-candidate":
                console.log("ice-candidate run")
                if (payload.data) {
                    console.log("Received ICE candidate:", payload.data);
                    pc.addIceCandidate(new RTCIceCandidate(payload.data));
                }
                break;
            case "error-message":
                if (payload.details) {
                    console.error("Received an error message:", payload.details);
                } else {
                    console.error("Received an error message with no details:", payload);
                }
                break;
            default:
                console.warn("Unknown message type:", payload.type);
                break;
        }
    };

    ws.onerror = (error) => {
        console.error("WebSocket Error:", error);
    };

    // ws.onclose = () => {
    //     console.log("WebSocket connection closed");
    // };
}

// Step 2: Setup PeerConnection
async function createPeerConnection(targetId) {
    console.log("Creating new RTCPeerConnection...");
    pc = new RTCPeerConnection();

    // Get local media stream
    try {
        localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        localStream.getTracks().forEach(track => pc.addTrack(track, localStream));
        localVideo.srcObject = localStream;
    } catch (error) {
        console.error("Error accessing media devices:", error);
        return;
    }

    // Handle remote stream when it arrives
    pc.ontrack = (event) => {
        console.log("Received remote stream:", event);
        remoteVideo.srcObject = event.streams[0];
    };

    // Handle ICE candidate events
    pc.onicecandidate = (event) => {
        if (event.candidate) {
            // Check if the WebSocket is open before sending
            if (ws.readyState === WebSocket.OPEN) {
                ws.send(JSON.stringify({
                    type: "ice-candidate",
                    toType: "web",
                    toId: targetId,
                    data: event.candidate,
                }));
                // Send any queued candidates
                while (iceCandidatesQueue.length > 0) {
                    ws.send(JSON.stringify({
                        type: "ice-candidate",
                        toType: "web",
                        toId: targetId,
                        data: iceCandidatesQueue.shift(),
                    }));
                }
            } else {
                console.warn("WebSocket is not open. Buffering ICE candidate.");
                iceCandidatesQueue.push(event.candidate);
            }
        }
    };

    // When the WebSocket opens, send any buffered candidates
    ws.onopen = () => {
        console.log("WebSocket connection established.");
        while (iceCandidatesQueue.length > 0) {
            ws.send(JSON.stringify({
                type: "ice-candidate",
                toType: "web",
                toId: targetId,
                data: iceCandidatesQueue.shift(),
            }));
        }
    };

    // Handle WebSocket closure to potentially attempt reconnection
    // ws.onclose = () => {
    //     console.warn("WebSocket connection closed.");
    //     // Implement reconnection logic here if needed
    // };

    return pc;
}

// Step 3: Start the Call (Make an Offer)

async function startCall(targetId) {
    console.log("Target ID--->", targetId)
    if (!targetId) {
        alert("Target ID is required!");
        return;
    }
    console.log("WebSocket readyState:", ws.readyState);
    console.log("Starting call to target ID:", targetId);
    pc = await createPeerConnection(targetId);

    try {


        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);
        console.log("Sending offer:", offer);

        // Check if the WebSocket is open before sending
        if (ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify({
                type: "offer",
                toType: "web",
                toId: targetId,
                data: offer,
            }));
        } else {
            console.error("WebSocket is not open. Cannot send message.");
            // Handle the case where the WebSocket is not open (e.g., attempt to reconnect)
        }

    } catch (err) {
        console.error("Error creating offer:", err);
    }
}

// Step 4: Handle Offer and Respond with Answer
async function handleOffer(payload) {
    console.log("step 3 ---> Handling incoming offer from", payload.id);
    pc = await createPeerConnection(payload.toId);
    // console.log("hadle offer --->", pc)

    await pc.setRemoteDescription(new RTCSessionDescription(payload.data));

    try {
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);
        console.log("Sending answer:", { sdp: answer.sdp });

        ws.send(JSON.stringify({
            type: "answer",
            toType: payload.toType,
            toId: payload.id, // reply to the offer sender
            data: { sdp: answer.sdp },
        }));
    } catch (err) {
        console.error("Error creating answer:", err);
    }
}

// Step 5: Handle Answer from Remote Peer
async function handleAnswer(payload) {
    console.log("Handling remote answer from", payload.id);
    await pc.setRemoteDescription(new RTCSessionDescription(payload.data));
}

// Initialize WebSocket connection
connectSignaling();

// Bind submit target ID button
submitTargetBtn.onclick = () => {
    const targetId = targetIdInput.value
    if (targetId) {
        startCall(targetId);
        targetID.textContent = "Target ID:- " + targetId
    } else {
        console.warn("Target ID is required!");
    }
};

// Start the call when the "Start Call" button is clicked
// startCallBtn.onclick = () => {
//     const targetId = targetIdInput.value
//     if (targetId) {
//         startCall(targetId);
//     } else {
//         alert("Please enter a Target ID first.");
//     }
// };

isConnected.onclick = () => {
    connected = !connected
    if (connected === true) {
        isConnected.textContent = "Connected"
        isConnected.style.color = "green";
    } else {
        isConnected.textContent = "disconnected"
        isConnected.style.color = "red";
    }

    console.log(connected)
}