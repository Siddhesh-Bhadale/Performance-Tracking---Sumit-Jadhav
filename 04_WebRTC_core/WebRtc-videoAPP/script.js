
//access Elements first 

const localVideo = document.getElementById('local-client-video');
const remoteVideo = document.getElementById('remote-client-video');

const startBtn = document.getElementById('startBtn');
const hangupBtn = document.getElementById('hangupBtn');
const muteBtn = document.getElementById('muteBtn');
const toggleCamBtn = document.getElementById('toggleCamBtn');

//peer -A
const btnCreateOffer = document.getElementById('btnCreateOffer');
const btnCopyOffer = document.getElementById('btnCopyOffer');
const offerOut = document.getElementById('offerOut');

//peer - B
const btnSetRemoteOffer = document.getElementById('btnSetRemoteOffer');
const btnClearOffer = document.getElementById('btnClearOffer');
const offerIn = document.getElementById('offerIn');

// answer peer A
const btnCreateAnswer = document.getElementById('btnCreateAnswer');
const btnCopyAnswer = document.getElementById('btnCopyAnswer');
const answerOut = document.getElementById('AnswerOut');

//answer peer A
const btnSetRemoteAnswer = document.getElementById('btnSetRemoteAnswer');
const btnClearAnswer = document.getElementById('btnClearAnswer');
const answerIn = document.getElementById('AnswerIn');


//peer-A offerOut
const createOfferTextArea = document.getElementById('offerOut')
const setOfferTextArea = document.getElementById('offerIn')
const createAnswerTextArea = document.getElementById('offerOut')
const setAnswerTextArea = document.getElementById('offerIn')

const logs = document.getElementById('debugConsole')

const successmsg = document.getElementById('success')

// Make sure input textareas are editable (in case HTML had readonly)
if (offerIn) offerIn.readOnly = false;
if (answerIn) answerIn.readOnly = false;


// ---------- state ----------
let pc = null;               // RTCPeerConnection
let localStream = null;      // getUserMedia stream

// ---------- utils ----------
function log(msg) {
    console.log(msg);
    if (!logs) return;
    const p = document.createElement("p");
    p.textContent = msg;
    logs.appendChild(p);
    logs.scrollTop = logs.scrollHeight;
}

function decode(text) {
    return JSON.stringify(text)
}

function encode(desc) {
    return JSON.parse(desc)
}
// ---------- copy fn ----------
async function copy(textarea) {
    try {
        await navigator.clipboard.writeText(textarea.value);
        log("[clipboard] copied to clipboard.");
    } catch (e) {
        // Fallback: select & attempt execCommand (older browsers)
        textarea.select();
        document.execCommand("copy");
        log("[clipboard] copied via execCommand.");
    }
}



function setVideoDefaults() {
    [localVideo, remoteVideo].forEach((v) => {
        if (!v) return;
        v.autoplay = true;       // play without user click
        v.playsInline = true;    // iOS inline playback
    });
    // Mute local video to avoid audio feedback (echo)
    if (localVideo) localVideo.muted = true;
}



// Wait until ICE candidates are fully gathered so the SDP we copy
// already contains all candidates (no separate ICE exchange needed).
function waitForIceComplete(pc) {
    return new Promise((resolve) => {
        if (pc.iceGatheringState === "complete") {
            resolve();
            return;
        }
        function check() {
            if (pc.iceGatheringState === "complete") {
                pc.removeEventListener("icegatheringstatechange", check);
                resolve();
            }
        }
        pc.addEventListener("icegatheringstatechange", check);
        // Also resolve when the last candidate (null) fires:
        pc.addEventListener("icecandidate", (e) => {
            if (!e.candidate) resolve();
        });
    });
}


function ensurePC() {
    if (pc) return pc;
    pc = new RTCPeerConnection({
        iceServers: [
            { urls: "stun:stun.l.google.com:19302" },
        ],
    });

    // console.log("ensurePC()", remoteVideo && !remoteVideo.srcObject)

    // When remote tracks arrive, show them in the Remote video element.
    pc.ontrack = (event) => {
        log("[ontrack] remote stream added");
        // Use the first stream (standard pattern)
        if (remoteVideo && !remoteVideo.srcObject) {
            remoteVideo.srcObject = event.streams[0];
        }
    };


    // Helpful status logs:
    pc.onconnectionstatechange = () => {
        log(`[connectionstate] ${pc.connectionState}`);
        if (pc.connectionState === 'connected') {
            successmsg.textContent = 'connected successfully'
        }
    };
    pc.oniceconnectionstatechange = () => {
        log(`[iceconnectionstate] ${pc.iceConnectionState}`);
    };
    pc.onicegatheringstatechange = () => {
        log(`[icegatheringstate] ${pc.iceGatheringState}`);
    };

    console.log("ensure PC", pc)
    return pc;
}



// ---------- up buttons ----------
//---------- start Camera ----------------//
startBtn?.addEventListener("click", startCamera);
async function startCamera() {
    try {
        setVideoDefaults();
        // Ask for camera+mic. You can refine constraints if needed.
        localStream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true,
        });
        if (localVideo) localVideo.srcObject = localStream;
        // Create (or reuse) the peer connection and add our local tracks to it.
        const conn = ensurePC();
        localStream.getTracks().forEach((track) => {
            conn.addTrack(track, localStream);
        });
        log("[media] Camera & mic started, tracks added to RTCPeerConnection.");
    } catch (err) {
        log(`[error] getUserMedia failed: ${err.message}`);
        alert("Could not access camera/mic. Check permissions & secure origin.");
    }
}

//--------------- mute the Stream -----------------//
muteBtn?.addEventListener("click", toggleMute);
function toggleMute() {
    if (!localStream) return;
    const audioTracks = localStream.getAudioTracks();
    if (audioTracks.length === 0) return;
    const track = audioTracks[0];
    track.enabled = !track.enabled;
    muteBtn.textContent = track.enabled ? "Toggle Mute" : "Unmute";
    log(`[audio] ${track.enabled ? "unmuted" : "muted"}`);
}

//------------------- toggle Camera On/Off -----------------//
toggleCamBtn?.addEventListener("click", toggleCamera);

function toggleCamera() {
    if (!localStream) return;
    const videoTracks = localStream.getVideoTracks();
    if (videoTracks.length === 0) return;
    const track = videoTracks[0];
    track.enabled = !track.enabled;
    toggleCamBtn.textContent = track.enabled ? "Toggle Camera" : "Turn Camera On";
    log(`[video] ${track.enabled ? "on" : "off"}`);
}

//------------------ hangup call-----------------//
hangupBtn?.addEventListener("click", hangUp);
function hangUp() {
    log("[call] hanging up…");
    try {
        if (pc) {
            pc.getSenders().forEach((s) => {
                try { s.track && s.track.stop(); } catch { }
            });
            pc.close();
        }
    } catch { }
    pc = null;
    try {
        if (localStream) {
            localStream.getTracks().forEach((t) => t.stop());
        }
    } catch { }
    localStream = null;
    if (localVideo) localVideo.srcObject = null;
    if (remoteVideo) remoteVideo.srcObject = null;

    log("[call] reset complete.");
}


//-------- offers and Answers ---------------------------//

//------------------- create Offer ------------------------------//
btnCreateOffer?.addEventListener("click", createOffer);

async function createOffer() {
    try {
        const conn = ensurePC();
        // Create a local SDP (offer) that describes our codecs, media, etc.
        const offer = await conn.createOffer();
        await conn.setLocalDescription(offer);
        log("[offer] Local description set; waiting for ICE candidates...");
        await waitForIceComplete(conn);

        // console.log('created offer', conn.localDescription)
        // After ICE completes, conn.localDescription contains SDP WITH candidates.
        offerOut.value = decode(conn.localDescription);
        log("[offer] Offer ready. Copy it to Peer B.");
    } catch (err) {
        log(`[error] createOffer failed: ${err.message}`);
    }
}

// --------------------- set Offer -----------------------------//
btnSetRemoteOffer?.addEventListener("click", setRemoteOffer);

async function setRemoteOffer() {
    try {
        const conn = ensurePC();
        const text = offerIn.value.trim();
        console.log("set Remote Offer", text)
        if (!text) return alert("Paste Peer A's offer JSON first.");
        const desc = encode(text);
        await conn.setRemoteDescription(new RTCSessionDescription(desc));
        log("[offer] Remote offer set. Now create your Answer.");
    } catch (err) {
        log(`[error] setRemoteOffer failed: ${err.message}`);
        alert("Invalid Offer JSON.");
    }
}

//--------------------- create a Answer-------------------------//
btnCreateAnswer?.addEventListener("click", createAnswer);
async function createAnswer() {
    try {
        const conn = ensurePC();
        // Ensure we have local media + tracks added
        if (!localStream) await startCamera();
        const answer = await conn.createAnswer();
        await conn.setLocalDescription(answer);
        log("[answer] Local description set; waiting for ICE candidates...");
        await waitForIceComplete(conn);
        console.log("created Answer", conn.localDescription)
        answerOut.value = decode(conn.localDescription);
        log("[answer] Answer ready. Copy it back to Peer A.");
    } catch (err) {
        log(`[error] createAnswer failed: ${err.message}`);
    }
}

//--------------------- set a Answer ---------------------------- //
btnSetRemoteAnswer?.addEventListener("click", setRemoteAnswer);


async function setRemoteAnswer() {
    try {
        const conn = ensurePC();
        const text = answerIn.value.trim();
        if (!text) return alert("Paste Peer B's answer JSON first.");
        const desc = encode(text);
        await conn.setRemoteDescription(new RTCSessionDescription(desc));
        log("[answer] Remote answer set. Connection should establish now.");
    } catch (err) {
        log(`[error] setRemoteAnswer failed: ${err.message}`);
        alert("Invalid Answer JSON.");
    }
}


// --------------------- Copy Events -----------------------------//

btnCopyOffer?.addEventListener("click", () => copy(offerOut));
btnCopyAnswer?.addEventListener("click", () => copy(answerOut));

//-------------------- clear Events --------------------------------//
btnClearOffer?.addEventListener("click", () => (offerIn.value = ""));
btnClearAnswer?.addEventListener("click", () => (answerIn.value = ""));

