class WebSocketConnection {
    constructor(SIGNAL_HTTP_URL, clientType, clientId) {
        this.SIGNAL_HTTP_URL = SIGNAL_HTTP_URL;
        this.clientType = clientType;
        this.clientId = clientId;
        this.socket = null;
        this.connected = false;
        this.listeners = new Map();
        this.connectedBtn = document.getElementById('connectionBtn');
    }

    // connecting to the signaling server
    connectSignaling() {
        if (this.socket) return;
        this.socket = new WebSocket(this.SIGNAL_HTTP_URL);

        this.socket.onopen = () => {
            this.connected = true;
            this.updateConnectionUI(this.connected);
            console.log('WebSocket connected');
            this.send({
                type: 'register',
                clientType: this.clientType,
                id: this.clientId
            })
        };

        this.socket.onmessage = (event) => {
            try {
                const msg = JSON.parse(event?.data);
                const listener = this.listeners.get(msg?.type);
                if (listener) {
                    listener.forEach(cb => cb(msg));
                }
            } catch (error) {
                console.error('Error parsing WebSocket message:', error);
            }
        };

        this.socket.onclose = (event) => {
            this.connected = false;
            this.updateConnectionUI(this.connected)
            console.warn('WebSocket closed ', event);
        };

        this.socket.onerror = (err) => {
            console.error('WebSocket error:', err);
        };
    }

    disconnectSignaling() {
        if (this.socket) {
            this.socket.close();
            this.socket = null;
            this.connected = false;
            this.updateConnectionUI(this.connected)
            this.removeAllListeners();
        }
    }

    send(data) {
        if (this.socket && this.connected && this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(JSON.stringify(data));
        } else {
            console.warn('Socket not connected');
        }
    }

    on(key, cb) {
        if (!this.listeners.has(key)) {
            this.listeners.set(key, []);
        }
        this.listeners.get(key).push(cb);
    }
    removeAllListeners() {
        console.log('clear all listners present in the map')
        this.listeners.clear();
    }
    updateConnectionUI(connected) {
        if (connected === true) {
            this.connectedBtn.textContent = 'connected';
            this.connectedBtn.style.color = 'green';
        } else {
            this.connectedBtn.textContent = 'disconnected';
            this.connectedBtn.style.color = 'red';
        }
    }

}
