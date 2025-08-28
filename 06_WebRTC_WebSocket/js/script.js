const SIGNALING_URL = 'http://10.10.10.10:8050/ws';
const clientId = 'Web-' + Math.floor(Math.random() * 10000);
document.getElementById('clientID').textContent = "Client Id: - " + clientId;

const signaling = new WebSocketConnection(SIGNALING_URL, 'web', clientId);
const webRTC = new WebRTCConnection(signaling, clientId);

// Connect WebSocket on load
signaling.connectSignaling();

// Start local camera
document.getElementById('startCallBtn').addEventListener('click', () => {
    webRTC.startLocalStream();
});

// Send offer
document.getElementById('targetBtn').addEventListener('click', () => {
    const targetId = document.getElementById('targetInput').value;
    if (!targetId) return alert("Please enter target ID.");
    webRTC.createOffer(targetId);
});

// Hang up
document.getElementById('hangUpCallBtn').addEventListener('click', () => {
    webRTC.hangUp();
});

// Connect/disconnect WebSocket
document.getElementById('connectionBtn').addEventListener('click', () => {
    if (signaling.connected) {
        signaling.disconnectSignaling();
    } else {
        signaling.connectSignaling();
    }
});
