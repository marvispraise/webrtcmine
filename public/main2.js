var pc1 = new RTCPeerConnection(), pc2 = new RTCPeerConnection();

navigator.mediaDevices.getUserMedia({video: true, audio: true})
  .then(stream => pc1.addStream(video1.srcObject = stream))
  .catch(log);

var add = (pc, can) => pc.addIceCandidate(can).catch(log);
pc1.onicecandidate = e => add(pc2, e.candidate);
pc2.onicecandidate = e => add(pc1, e.candidate);

pc2.ontrack = e => video2.srcObject = e.streams[0];
pc1.oniceconnectionstatechange = e => log(pc1.iceConnectionState);
pc1.onnegotiationneeded = e =>
  pc1.createOffer().then(d => pc1.setLocalDescription(d))
  .then(() => pc2.setRemoteDescription(pc1.localDescription))
  .then(() => pc2.createAnswer()).then(d => pc2.setLocalDescription(d))
  .then(() => pc1.setRemoteDescription(pc2.localDescription))
  .catch(log);

var log = msg => console.log(msg);