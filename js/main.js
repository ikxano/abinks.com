// Array of video sources to play in sequence
const videoSources = [
    'videos/dwello_intro.mp4',
    'videos/promotion_video.mp4',
    'videos/dwello_reservation.mp4'
];

let currentVideoIndex = 0;
const mainVideoPlayer = document.getElementById('main-video-player');

// Function to play the next video in sequence
function playNextVideo() {
    if (currentVideoIndex < videoSources.length - 1) {
        currentVideoIndex++;
    } else {
        currentVideoIndex = 0; // Loop back to first video
    }
    
    mainVideoPlayer.src = videoSources[currentVideoIndex];
    mainVideoPlayer.play();
}

// Event listener for when a video ends
if (mainVideoPlayer) {
    mainVideoPlayer.addEventListener('ended', playNextVideo);
} 