// step 1 wrap everything in class
class webRTC {
    // gather all essential states and functions in constructor
    constructor(configuration) {
        //Dom elements for config
        this.elements = this.getElements(configuration)

        // webRTC state
        this.pc = null;
        this.localStream = null;

        //setup Defaults +Btns
        this.setVideoDefaults();
        //--- call  All Btn Events ---//
        this.wireEvents();
    }

    getElements(configuration) {
        const get = (id) => document.getElementById(id);
        return {
            //------ video tags-------//
            localVideo: get(configuration.localVideoId),
            remoteVideo: get(configuration.remoteVideoId),

            //------ buttons ---------//
            startBtn: get(configuration.startBtnId),
            hangupBtn: get(configuration.hangupBtnId),
            muteBtn: get(configuration.muteBtnId),
            toggleCamBtn: get(configuration.toggleCamBtnId),

            //------ offer create and copy and clear ------------//
            btnCreateOffer: get(configuration.btnCreateOfferId),
            btnCopyOffer: get(configuration.btnCopyOfferId),
            offerOut: get(configuration.offerOutId),

            //------- setOffer,  and clear---------------//
            btnSetRemoteOffer: get(configuration.btnSetRemoteOfferId),
            btnClearOffer: get(configuration.btnClearOfferId),
            offerIn: get(configuration.offerInId),

            //----------- create Answer and answerOut ---------//
            btnCreateAnswer: get(configuration.btnCreateAnswerId),
            btnCopyAnswer: get(configuration.btnCopyAnswerId),
            answerOut: get(configuration.answerOutId),

            //--------- set answer clear answer ------//
            btnSetRemoteAnswer: get(configuration.btnSetRemoteAnswerId),
            btnClearAnswer: get(configuration.btnClearAnswerId),
            answerIn: get(configuration.answerInId),

            logs: get(configuration.logId),
            successmessage: get(configuration.successmessageId)
        }
    }

    //Logger 
    log(msg) {
        // console.log(msg);
        if (!this.elements.logs) return;
        const p = document.createElement("p");
        p.textContent = msg;
        this.elements.logs.appendChild(p);
        this.elements.logs.scrollTop = this.elements.logs.scrollHeight;
    }

    //set video defaults
    setVideoDefaults() {
        [this.elements.localVideo, this.elements.remoteVideo].forEach((v) => {
            if (!v) return;
            v.autoplay = true;       // play without user click
            v.playsInline = true;    // iOS inline playback
        });
        // Mute local video to avoid audio feedback (echo)
        if (this.elements.localVideo) this.elements.localVideo.muted = true;
    }


    //--------- --- ICE Gathering -------------------------------//
    async waitForIceComplete(pc) {
        return new Promise((resolve) => {
            if (pc.iceGatheringState === 'complete') {
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
            pc.addEventListener("icecandidate", (e) => {
                if (!e.candidate) resolve();
            });
        })
    }


    //-------------- Helping function for setuping nessecary functionality -------------------//
    ensurePC() {
        if (this.pc) return this.pc;
        this.pc = new RTCPeerConnection({
            iceServers: [
                { urls: 'stun:stun.l.google.com:19302' }
            ]
        });

        this.pc.ontrack = (event) => {
            this.log(`[ontrack] remote stream added`)

            if (this.elements.remoteVideo && !this.elements.remoteVideo.srcObject) {
                this.elements.remoteVideo.srcObject = event.streams[0];
            }
        }
        //Help ful status Logs
        this.pc.onconnectionstatechange = () => {
            this.log(`[connectionstate] ${this.pc.connectionState}`);

            if (this.pc.connectionState === 'connecting') {
                this.elements.successmessage.textContent = 'Connecting...';
            } else if (this.pc.connectionState === 'connected') {
                this.elements.successmessage.textContent = 'Online';
                this.elements.successmessage.style.color = "green";

            } else if (this.pc.connectionState === 'disconnected') {
                this.elements.successmessage.textContent = 'Disconnecting';
            } else if (this.pc.connectionState === 'closed') {
                this.elements.successmessage.textContent = 'Offline';
                this.elements.successmessage.style.color = "grey";
            } else if (this.pc.connectionState === 'failed') {
                this.elements.successmessage.textContent = 'Error';
                this.elements.successmessage.style.color = "red";
            } else {
                this.elements.successmessage.textContent = 'Unknown';
            }

        };
        //--------
        this.pc.oniceconnectionstatechange = () => {
            this.log(`[iceconnectionstate] ${this.pc.iceConnectionState}`)
        };
        //--------- 
        this.pc.onicegatheringstatechange = () => {
            this.log(`[icegatheringstate] ${this.pc.iceGatheringState}`)
        }
        return this.pc;
    }




    //--------- utils ---------------//
    decode(text) {
        return JSON.stringify(text)
    }

    encode(desc) {
        return JSON.parse(desc)
    }
    async copy(textarea) {
        try {
            await navigator.clipboard.writeText(textarea.value);
            this.log("[clipboard] copied to clipboard.");
        } catch {
            textarea.select();
            document.execCommand("copy");
            this.log("[clipboard] fallback copy.");
        }
    }

    //wire Events 
    wireEvents() {
        // ------- Btn events --------------------//
        this.elements.startBtn?.addEventListener('click', () => this.startCamera())
        this.elements.hangupBtn?.addEventListener('click', () => this.hangUP()),
            this.elements.muteBtn?.addEventListener('click', () => this.toggleMute()),
            this.elements.toggleCamBtn?.addEventListener('click', () => this.toggleCamera())

        //------------- offer Events ---------------//
        this.elements.btnCreateOffer?.addEventListener('click', () => this.createOffer()),
            this.elements.btnCopyOffer?.addEventListener('click', () => this.copy(this.elements.offerOut)),
            // this.elements.offerOut?.addEventListener('click', () =>),

            //------------- set offer Events -------------//
            this.elements.btnSetRemoteOffer?.addEventListener('click', () => this.setRemoteOffer()),
            this.elements.btnClearOffer?.addEventListener('click', () => (this.elements.offerIn.value = "")),
            // this.elements.offerIn?.addEventListener('click', () =>),

            //------------- Answer Events ----------------//
            this.elements.btnCreateAnswer?.addEventListener('click', () => this.createAnswer()),
            this.elements.btnCopyAnswer?.addEventListener('click', () => this.copy(this.elements.answerOut))
        // this.elements.answerOut?.addEventListener('click', () =>),

        //-------------- sett Remote Answer Events ---------//
        this.elements.btnSetRemoteAnswer?.addEventListener('click', () => this.setRemoteAnswer()),
            this.elements.btnClearAnswer?.addEventListener('click', () => (this.elements.offerIn.value = ""))
        // this.elements.answerIn?.addEventListener('click', () =>),

    }

    // other methods or function 
    async startCamera() {
        console.log('start BTN clicked');
        try {
            // this.setVideoDefaults();
            this.localStream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true,
            })
            if (this.elements.localVideo) this.elements.localVideo.srcObject = this.localStream
            const conn = this.ensurePC();
            this.localStream.getTracks().forEach((track) => {
                conn.addTrack(track, this.localStream)
            })
            this.log(`[media] camera & mic started, tracks added to RTCPeerConnection`)
        } catch (error) {
            this.log(`[error] getUserMedia failed: ${error.message}`)
            alert("Could not access camera/mic. Check permissions & secure origin.");
        }
    }

    // ------ Create an Offer ------//
    async createOffer() {
        console.log('create Offer Clicked');
        try {
            const conn = this.ensurePC();
            const offer = await conn.createOffer()
            await conn.setLocalDescription(offer);
            await this.waitForIceComplete(conn);
            this.elements.offerOut.value = this.decode(conn.localDescription);
            this.log("[offer] Ready. Copy to Peer B.");
        } catch (error) {
            this.log(`[error]createOffer failed: ${err.message}`)
        }
    }

    async setRemoteOffer() {
        console.log('setRemote offer clicked');
        try {
            const conn = this.ensurePC();
            const text = this.elements.offerIn.value;
            if (!text) return alert("Paste Peer A's offer  first.")
            const desc = this.encode(text);
            await conn.setRemoteDescription(new RTCSessionDescription(desc))
            this.log("[offer] Remote offer set. Now create your Answer.");
        } catch (error) {
            this.log(`[error] setRemoteOffer failed: ${error.message}`)
            alert("Invalid Offer JSON.");
        }
    }
    async createAnswer() {
        console.log('create answer Btn Clicked');
        try {
            const conn = this.ensurePC();
            //Ensure we have local media + track added start cmaera after clciking create ans btn
            if (!this.localStream) await this.startCamera();
            const answer = await conn.createAnswer();
            await conn.setLocalDescription(answer);
            this.log("[answer] Local description set; waiting for ICE candidates...");
            await this.waitForIceComplete(conn);
            this.elements.answerOut.value = this.decode(conn.localDescription)
            this.log("[answer] Answer ready. Copy it back to Peer A.");
        } catch (error) {
            this.log(`[error] createAnswer failed: ${error.message}`)
        }
    }

    async setRemoteAnswer() {
        console.log('setRemoteAnswer clicked');
        try {
            // this.log(`[setRemoteAnswer] is running `)
            const conn = this.ensurePC();
            const text = this.elements.answerIn.value;
            if (!text) return alert("Paste Peer B's answer JSON first.");
            const desc = this.encode(text);
            console.log("desc of set remote ans--->", desc)
            await conn.setRemoteDescription(new RTCSessionDescription(desc));
            console.log()
            this.log("[answer] Remote answer set. Connection should establish now.");
        } catch (error) {
            this.log(`[error] setRemoteAnswer failed: ${err.message}`);
            alert("Invalid Answer JSON.");
        }
    }

    hangUP() {
        this.log("[call] hanging up…");
        try {
            if (this.pc) {
                this.pc.getSenders().forEach((s) => s.track?.stop());
                this.pc.close();
            }
        } catch { }
        this.pc = null;

        try {
            if (this.localStream) {
                this.localStream.getTracks().forEach((t) => t.stop());
            }
        } catch { }
        this.localStream = null;

        if (this.elements.localVideo) this.elements.localVideo.srcObject = null;
        if (this.elements.remoteVideo) this.elements.remoteVideo.srcObject = null;
        this.log("[call] reset complete.");
    }

    //------------ Toggle audio  ON OR OFF BUTTON ---------------------------------//

    toggleMute() {
        console.log('Mute BTN clicked')

        if (!this.localStream) return;
        const audioTracks = this.localStream.getAudioTracks();
        if (audioTracks.length === 0) return;
        const track = audioTracks[0];
        track.enabled = !track.enabled;
        this.elements.muteBtn.textContent = track.enabled ? "Toggle Mute" : "Unmute";
    }

    //-------------------- Toggle Camera on or OFF BTN --------------------//
    toggleCamera() {
        console.log('cam On OFF BTN clicked');
        if (!this.localStream) return;
        const track = this.localStream.getVideoTracks()[0];
        if (!track) return;
        track.enabled = !track.enabled;
        this.elements.toggleCamBtn.textContent = track.enabled ? "Camera Off" : "Camera On";
        this.log(`[video] ${track.enabled ? "on" : "off"}`);
    }

}

