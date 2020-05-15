navigator.getUserMedia = navigator.getUserMedia ||
    navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
window.RTCPeerConnection = window.RTCPeerConnection || window.webkitRTCPeerConnection;

var yourConnection, theirConnection;

navigator.getUserMedia({
    video: true,
    audio: false
}, function (stream) {
    yourVideo.src = window.URL.createObjectURL(stream);

    var config = {
        "iceServers": [{
            "urls": "stun:stun.1.google.com:19302"
        }]
    };
    yourConnection = new RTCPeerConnection(config);
    theirConnection = new RTCPeerConnection(config);

    yourConnection.addStream(stream);

    theirConnection.onaddstream = function (event) {
        theirVideo.src = window.URL.createObjectURL(event.stream);
    };

    yourConnection.onicecandidate = function (event) {
        if (event.candidate) {
            theirConnection.addIceCandidate(new RTCIceCandidate(event.candidate), success, failure);
        }
    };
    theirConnection.onicecandidate = function (event) {
        if (event.candidate) {
            yourConnection.addIceCandidate(new RTCIceCandidate(event.candidate), success, failure);
        }
    };

    yourConnection.createOffer(function (offer) {}).catch(e => console.log("JIB:" + e));

    yourConnection.createOffer(function (offer) {
        yourConnection.setLocalDescription(offer, success, failure);
        theirConnection.setRemoteDescription(offer, success, failure);
        theirConnection.createAnswer(function (offer) {
            theirConnection.setLocalDescription(offer, success, failure);
            yourConnection.setRemoteDescription(offer, success, failure);
        }, failure);
    }, failure);
}, failure);

var console = {
    log: function (msg) {
        div.innerHTML += msg + "<br>";
    }
};

function success() {}

function failure(e) {
    console.log(e);
}