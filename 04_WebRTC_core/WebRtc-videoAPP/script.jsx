//access Elements first 
const startBtn = document.getElementById('startBtn');
const hangupBtn = document.getElementById('hangupBtn');
const muteBtn = document.getElementById('muteBtn');
const toogleCamBtn= document.getElementById('toggleCamBtn');
//peer -A
const createOfferBtn=document.getElementById('btnCreateOffer');
const copyOfferBtn=document.getElementById('btnCreateOffer');
const outterOut=document.getElementById('outterOut');

//peer - B
const setRemoteOfferBtn=document.getElementById('btnCreateOffer');
const clearOfferBtn=document.getElementById('btnCreateOffer');
const outterIn=document.getElementById('outterIn');


// answer peer A
const createAnswerBtn=document.getElementById('btnCreateOffer');
const copyAnswerBtn=document.getElementById('btnCreateOffer');
const answerOut=document.getElementById('AnswerOut');

//answer peer A
const setRemoteAnswerBtn=document.getElementById('btnCreateOffer');
const clearRemoteAnswerBtn=document.getElementById('btnCreateOffer');
const answerIn=document.getElementById('AnswerIn');




const localClientVideo=document.getElementById('local-client-video');
const RemoteClientVideo=document.getElementById('remote-client-video');

// Local client 
const localClient=new RTCPeerConnection();
const dataChannel=localClient.createDataChannel();

startBtn.onclick = start;
toogleCamBtn.onclick = toggleCam;
hangupBtn.onclick = hangup;
muteBtn.onclick = toggleMute;

createOfferBtn.onclick = createOfferforLocal;
copyOfferBtn.onclick = copyOfferLocal;

// setRemoteOfferBtn.onclick=

// Remote Client 
