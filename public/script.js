const userVideo = document.getElementById('user-video');
const startButton = document.getElementById('start-btn');   
const state ={media:null} 
const socket = io();
startButton.addEventListener('click',  function(e) {
    const mediaRecorder = new MediaRecorder(state.media,{
        audioBitsPerSecond: 128000,
        videoBitsPerSecond: 2500000,
        fraamerate: 25,
    });
    mediaRecorder.ondataavailable = function(e) {
        console.log('Binary Stream Available', e.data);
        socket.emit('stream', e.data);
    };
    mediaRecorder.start(25);
});
window.addEventListener('load',async  function(e) {
    const media = await navigator.mediaDevices.getUserMedia({video: true, audio: true});
    userVideo.srcObject = media;
    state.media = media;
}); 