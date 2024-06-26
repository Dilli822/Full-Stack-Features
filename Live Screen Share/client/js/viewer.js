const config = {
    iceServers: [
      { 
        "urls": "stun:stun.l.google.com:19302",
      },
      // You should add your TURN server here
    ]
  };
  
  const socket = io.connect(window.location.origin);
  let peerConnection;
  
  socket.on("presenter", () => {
    socket.emit("viewer");
  });
  
  socket.on("offer", (id, description) => {
    peerConnection = new RTCPeerConnection(config);
    peerConnection
      .setRemoteDescription(description)
      .then(() => peerConnection.createAnswer())
      .then(sdp => peerConnection.setLocalDescription(sdp))
      .then(() => {
        socket.emit("answer", id, peerConnection.localDescription);
      });
    peerConnection.ontrack = event => {
      document.querySelector("video").srcObject = event.streams[0];
    };
    peerConnection.onicecandidate = event => {
      if (event.candidate) {
        socket.emit("candidate", id, event.candidate);
      }
    };
  });
  
  socket.on("candidate", (id, candidate) => {
    peerConnection
      .addIceCandidate(new RTCIceCandidate(candidate))
      .catch(e => console.error(e));
  });
  
  socket.on("connect", () => {
    socket.emit("viewer");
  });
  
  socket.on("presenter", () => {
    socket.emit("viewer");
  });
  
  window.onunload = window.onbeforeunload = () => {
    socket.close();
    peerConnection.close();
  };