const songs = [
  { name: 'Jhol Acoustic', src: 'songs/jhol.mp3', img: 'images/jhol.jpeg' },
  { name: 'Dwapara - Krishna Pranayasakhi', src: 'songs/dwapara.mp3', img: 'images/dwapara.jpg' },
  { name: 'The Monster Song - KGF 2', src: 'songs/monster.mp3', img: 'images/monster.jpg' },
  { name: 'Hukum (Kannada) - Jailer', src: 'songs/hukum.mp3', img: 'images/hukum.jpg' },
  { name: 'Bye Bye Bye - Deadpool', src: 'songs/bye.mp3', img: 'images/bye.jpeg' },
  { name: 'Six Days Remix - Tokyo Drift', src: 'songs/sixdays.mp3', img: 'images/sixdays.jpeg' },
  { name: 'Finding Her x Hua Main - Vipin Soni', src: 'songs/findingher.mp3', img: 'images/findingher.jpeg' },
  { name: 'Blood (Kannada) - Marco', src: 'songs/blood.mp3', img: 'images/blood.jpg' },
  { name: 'Done For Me - Charlie Puth ft. Kehlani', src: 'songs/doneforme.mp3', img: 'images/doneforme.jpg' },
  { name: 'We Don\'t Talk Anymore - Charlie Puth ft. Selena Gomez', src: 'songs/wedonttalk.mp3', img: 'images/wedonttalk.jpg' }
];

const audio = document.getElementById('audio');
const playBtn = document.getElementById('playBtn');
const progress = document.getElementById('progress');
const songImage = document.getElementById('song-image');
const songList = document.getElementById('songList');

let currentSong = 0;
let isReady = false;

function loadSong(index) {
  const song = songs[index];
  audio.src = song.src;
  songImage.style.backgroundImage = `url('${song.img}')`;
  document.body.style.backgroundImage = `url('${song.img}')`;
  audio.load();
  isReady = false;
}

audio.addEventListener('loadedmetadata', () => {
  isReady = true;
});

function togglePlay() {
  if (!isReady) return;
  if (audio.paused) {
    audio.play();
    playBtn.textContent = '⏸️';
  } else {
    audio.pause();
    playBtn.textContent = '▶️';
  }
}

function updateProgress() {
  if (!isFinite(audio.duration)) return;
  const percent = (audio.currentTime / audio.duration) * 100;
  progress.value = percent;
}

function seekTo() {
  if (!isFinite(audio.duration)) return;
  audio.currentTime = (progress.value / 100) * audio.duration;
}

function skipForward() {
  if (!isFinite(audio.duration)) return;
  audio.currentTime = Math.min(audio.currentTime + 5, audio.duration);
}

function skipBackward() {
  if (!isFinite(audio.duration)) return;
  audio.currentTime = Math.max(audio.currentTime - 5, 0);
}

function nextSong() {
  currentSong = (currentSong + 1) % songs.length;
  loadSong(currentSong);
  audio.play();
  playBtn.textContent = '⏸️';
}

function prevSong() {
  currentSong = (currentSong - 1 + songs.length) % songs.length;
  loadSong(currentSong);
  audio.play();
  playBtn.textContent = '⏸️';
}

songs.forEach((song, index) => {
  const div = document.createElement('div');
  div.className = 'song-item';
  div.textContent = song.name;
  div.onclick = () => {
    currentSong = index;
    loadSong(currentSong);
    audio.play();
    playBtn.textContent = '⏸️';
  };
  songList.appendChild(div);
});

loadSong(currentSong);
