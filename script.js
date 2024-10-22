console.log("Welcome To Melodify");

// Initialize the variables
let songIndex = 0;
let audioElement = new Audio('raam.mp3'); // Create audio element without initial source
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songitem'));

let songs = [
    { songsName: "Channa Mereya", filepath: "raam.mp3", coverpath: "cover.jpg" },
    { songsName: "Ezhutha Kadhaiyo", filepath: "raam1 - Copy.mp3", coverpath: "cover1.jpg" },
    { songsName: "Thaensudare", filepath: "raam2.mp3", coverpath: "cover2.jpg" },
    { songsName: "Thanni Can poda vanthan bro", filepath: "raam3 - Copy.mp3", coverpath: "cover3.jpg" },
    { songsName: "Thenkizhakku", filepath: "raam4.mp3", coverpath: "cover4.jpg" },
    { songsName: "Usura Uruvi", filepath: "raam5.mp3", coverpath: "cover5.jpg" },
    { songsName: "Apple Crumble", filepath: "raam6.mp3", coverpath: "cover6.jpg" },
    { songsName: "His Name Is Jhon", filepath: "raam7.mp3", coverpath: "cover7.jpg" },
    { songsName: "Railin Oligal", filepath: "raam8.mp3", coverpath: "cover8.jpg" },
    { songsName: "Oru Manam", filepath: "raam9.mp3", coverpath: "cover9.jpg" }
];

songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverpath;
    element.getElementsByClassName("songsName")[0].innerText = songs[i].songsName;
});

// Handle play/pause click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
});

// Listen to Events
audioElement.addEventListener('timeupdate', () => {
    // Update Seekbar
    const progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
});

// Seekbar change event
myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
});

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    });
};

// Play selected song
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = songs[songIndex].filepath; // Set the source to filepath
        audioElement.currentTime = 0;
        audioElement.play();
        masterSongName.innerText = songs[songIndex].songsName;  // Update song name
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;  // Make gif visible
    });
});

// Next song event listener
document.getElementById('next').addEventListener('click', () => {
    songIndex = (songIndex + 1  + songs.length) % songs.length; // Loop back to start if at end
    audioElement.src = songs[songIndex+1].filepath; // Set the source to filepath
    masterSongName.innerText = songs[songIndex].songsName; // Update song name
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
});

// Previous song event listener
document.getElementById('previous').addEventListener('click', () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length; // Loop to end if at start
    audioElement.src = songs[songIndex-1].filepath; // Set the source to filepath
    masterSongName.innerText = songs[songIndex].songsName; // Update song name
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
});
