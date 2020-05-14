navigator.getUserMedia = navigator.getUserMedia ||
                        navigator.webkitGetUserMedia ||
                        navigator.mozGetUserMedia;
window.RTCPeerConnection = window.RTCPeerConnection ||
                        window.webkitRTCPeerConnection;

var yourConnection, theirConnection;

navigator.getUserMedia({ video: true, audio: true }, function(stream) {
    yourVideo.src = window.URL.createObjectURL(stream);

    var config = { "iceServers": [{ "urls": "stun:stun.1.google.com:19302"}] };
    yourConnection = new RTCPeerConnection(config);
    theirConnection = new RTCPeerConnection(config);

    yourConnection.addStream(stream);

    theirConnection.onaddstream = function (event) {
        theirVideo.src = window.URL.createObjectURL(event.stream);
    };

    yourConnection.onicecandidate = function (e) {
        if (e.candidate) {
            theirConnection.addIceCandidate(new RTCIceCandidate(e.candidate),
                                            success, failure);
        }
    };
    theirConnection.onicecandidate = function (e) {
        if (e.candidate) {
            yourConnection.addIceCandidate(new RTCIceCandidate(e.candidate),
                                            success, failure);
        }
    };

    yourConnection.createOffer(function (offer) {
        yourConnection.setLocalDescription(offer, success, failure);
        theirConnection.setRemoteDescription(offer, success, failure);
        theirConnection.createAnswer(function (offer) {
        theirConnection.setLocalDescription(offer, success, failure);
        yourConnection.setRemoteDescription(offer, success, failure);
        }, failure);
    }, failure);
}, failure);

function success() {}
function failure(e) { console.log(e); }