const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

// Music
const songs = [
  {
    name: 'jacinto-1',
    displayName: 'Tere Mast Mast',
    artist: 'Rahat Fateh Ali Khan',
  },
  {
    name: 'jacinto-2',
    displayName: 'Chahun Main Ya Na',
    artist: 'Arijit Singh',
  },
  {
    name: 'jacinto-3',
    displayName: 'Haal-e-Dil mera',
    artist: 'Mohit Chauhan',
  },
  {
    name: 'metric-1',
    displayName: 'Katiya karun',
    artist: 'Mohit Chauhan',
  },
	{
    name: 'metric-2',
    displayName: 'Rabba Hu',
    artist: 'Chanda Choice',
  },
	{
    name: 'metric-3',
    displayName: 'Ramzaan Naseed',
    artist: 'Rukhshi',
  },
	{
    name: 'faheem-1',
    displayName: 'Dil Janiye',
    artist: 'Jubin Natuyal',
  },
	{
    name: 'faheem-2',
    displayName: 'Tera Naam Dhokha',
    artist: 'Arijit Singh',
  },
	{
    name: 'faheem-3',
    displayName: 'Mitra Re',
    artist: 'Arijit Singh',
  },
	
	//hahahah
	{
    name: 'azhar-1',
    displayName: 'Dil Ka Dariya',
    artist: 'Jubin Natuyal',
  },
	{
    name: 'azhar-2',
    displayName: 'Zindagi Chal Tera',
    artist: 'Jubin Natuyal',
  },
	{
    name: 'azhar-3',
    displayName: 'Dil Galti Kar',
    artist: 'Jubin Natuyal',
  },
	{
    name: 'mona-1',
    displayName: 'Ye Soch Ke Dil Mera',
    artist: 'Jubin Natuyal',
  },
	{
    name: 'mona-2',
    displayName: 'Oo Aasmaan Wale',
    artist: 'Jubin Natuyal',
  },
	{
    name: 'mona-3',
    displayName: 'Tumse Pyaar Kar K',
    artist: 'Jubin Natuyal',
  },
	{
    name: 'rukhsi-1',
    displayName: 'Hasta Hua Ye Chahra',
    artist: 'Jubin Natuyal',
  },
	{
    name: 'rukhsi-2',
    displayName: 'Mana Hum Yahan Hai',
    artist: 'Jubin Natuyal',
  },
];

// Check if Playing
let isPlaying = false;

// Play
function playSong() {
  isPlaying = true;
  playBtn.classList.replace('fa-play', 'fa-pause');
  playBtn.setAttribute('title', 'Pause');
  music.play();
}

// Pause
function pauseSong() {
  isPlaying = false;
  playBtn.classList.replace('fa-pause', 'fa-play');
  playBtn.setAttribute('title', 'Play');
  music.pause();
}

// Play or Pause Event Listener
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

// Update DOM
function loadSong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.mp3`;
  image.src = `img/${song.name}.jpg`;
}

// Current Song
let songIndex = 0;

// Previous Song
function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// Next Song
function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// On Load - Select First Song
loadSong(songs[songIndex]);

// Update Progress Bar & Time
function updateProgressBar(e) {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement;
    // Update progress bar width
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    // Calculate display for duration
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`;
    }
    // Delay switching duration Element to avoid NaN
    if (durationSeconds) {
      durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
    }
    // Calculate display for currentTime
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`;
    }
    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
  }
}

// Set Progress Bar
function setProgressBar(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const { duration } = music;
  music.currentTime = (clickX / width) * duration;
}

// Event Listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);
