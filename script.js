let isPlaying = false;

// const audioElement = document.getElementById("karaoke");
const panControl = document.getElementById("panControl");
const karaoke = document.getElementById("karaoke");

const audioContext = new AudioContext();
const source = audioContext.createMediaElementSource(karaoke);
const splitter = audioContext.createChannelSplitter(2);
const gainNodeL = audioContext.createGain();
const gainNodeR = audioContext.createGain();
const merger = audioContext.createChannelMerger(2);
const imageElement = document.getElementById("progressImage");

function togglePlayPause() {
  console.log("togglePlayPause");
  if (isPlaying) {
    pauseMusic();
    imageElement.classList.remove("shaking");
  } else {
    playMusic();
    imageElement.classList.add("shaking");
  }

  isPlaying = !isPlaying;
}

function playMusic() {
  karaoke.play();
  updateProgressBar();
}

function pauseMusic() {
  karaoke.pause();
}

source.connect(splitter);
splitter.connect(gainNodeL, 0); // Left channel (vocal)
splitter.connect(gainNodeR, 1); // Right channel (instrumental)
gainNodeL.connect(merger, 0, 0);
gainNodeR.connect(merger, 0, 1);
merger.connect(audioContext.destination);

panControl.addEventListener("input", () => {
  gainNodeL.gain.value = panControl.value; // Adjust left channel (vocal) according to slider
  gainNodeR.gain.value = 1; // Keep right channel (instrumental) constant

  // Calculate opacity based on the slider value
  const opacity = 0.9 * panControl.value + 0.1;

  imageElement.style.opacity = opacity;
});

function seekMusic() {
  const progressBar = document.getElementById("progressBar");

  const seekTime = (progressBar.value / progressBar.max) * karaoke.duration;

  karaoke.currentTime = seekTime;
}

const timingMap = [
  { lineId: "line1", startTime: 16.2, endTime: 19 },
  { lineId: "line2", startTime: 19, endTime: 21.6 },
  { lineId: "line3", startTime: 21.6, endTime: 24 },
  { lineId: "line4", startTime: 24, endTime: 26.2 },
  { lineId: "line5", startTime: 26.2, endTime: 29 },
  { lineId: "line6", startTime: 29, endTime: 31.3 },
  { lineId: "line7", startTime: 31.3, endTime: 34.1 },
  { lineId: "line8", startTime: 34.1, endTime: 36 },

  { lineId: "line9", startTime: 37, endTime: 41.9 },
  { lineId: "line10", startTime: 41.9, endTime: 43.5 },
  { lineId: "line11", startTime: 43.5, endTime: 44.6 },
  { lineId: "line12", startTime: 44.6, endTime: 47.0 },
  { lineId: "line13", startTime: 47.0, endTime: 49.8 },
  { lineId: "line14", startTime: 49.8, endTime: 52.0 },
  { lineId: "line15", startTime: 52.0, endTime: 56.7 },

  { lineId: "line16", startTime: 61.7, endTime: 63.1 },
  { lineId: "line17", startTime: 63.1, endTime: 65.3 },
  { lineId: "line18", startTime: 65.3, endTime: 68.5 },
  { lineId: "line19", startTime: 68.5, endTime: 70.4 },
  { lineId: "line20", startTime: 70.4, endTime: 73.0 },
  { lineId: "line21", startTime: 73.0, endTime: 75.4 },
  { lineId: "line22", startTime: 75.4, endTime: 78.15 },
  { lineId: "line23", startTime: 78.15, endTime: 81.2 },

  { lineId: "line24", startTime: 81.2, endTime: 85.8 },
  { lineId: "line25", startTime: 85.8, endTime: 90.5 },
  { lineId: "line26", startTime: 90.5, endTime: 93.4 },
  { lineId: "line27", startTime: 93.4, endTime: 95.8 },
  { lineId: "line28", startTime: 95.8, endTime: 97.3 },
  { lineId: "line29", startTime: 97.3, endTime: 104.3 },
  { lineId: "line30", startTime: 104.3, endTime: 105.0 },
  { lineId: "line31", startTime: 105.0, endTime: 108.6 },
  { lineId: "line32", startTime: 108.6, endTime: 111.0 },
  { lineId: "line33", startTime: 111.0, endTime: 113.4 },
  { lineId: "line34", startTime: 113.4, endTime: 114.8 },
  { lineId: "line35", startTime: 114.8, endTime: 118.1 },

  { lineId: "line36", startTime: 121.3, endTime: 125.5 },
  { lineId: "line37", startTime: 125.5, endTime: 128.3 },
  { lineId: "line38", startTime: 128.3, endTime: 132.7 },
  { lineId: "line385", startTime: 132.7, endTime: 136.8 },
  { lineId: "line39", startTime: 136.8, endTime: 139.8 },
  { lineId: "line40", startTime: 139.8, endTime: 142.8 },

  { lineId: "line41", startTime: 144.3, endTime: 146.7 },
  { lineId: "line42", startTime: 146.7, endTime: 149.7 },
  { lineId: "line43", startTime: 149.7, endTime: 152.6 },
  { lineId: "line44", startTime: 152.6, endTime: 155.5 },

  { lineId: "line45", startTime: 158.6, endTime: 163.2 },
  { lineId: "line46", startTime: 163.2, endTime: 169.4 },
  { lineId: "line47", startTime: 169.4, endTime: 174.8 },
  { lineId: "line48", startTime: 174.8, endTime: 179.6 },
  { lineId: "line49", startTime: 179.6, endTime: 181.2 },

  { lineId: "line50", startTime: 181.2, endTime: 186.1 },
  { lineId: "line51", startTime: 186.1, endTime: 192.3 },
  { lineId: "line52", startTime: 192.3, endTime: 197.7 },
  { lineId: "line53", startTime: 197.7, endTime: 204.9 },

  // ... rest of the timing map
];

function updateProgressBar() {
  const progressBar = document.getElementById("progressBar");
  const progressImage = document.getElementById("progressImage");
  const underTheSeaElement = document.getElementById("under-the-sea");
  const moanaElement = document.getElementById("how-far-go");

  progressBar.max = 100;

  let lastProgressValue = -1; // Keep track of the last progress value

  const update = () => {
    const progressPercentage = (karaoke.currentTime / karaoke.duration) * 100;

    // Only update if playing or the progress bar value has changed
    if (isPlaying || progressBar.value !== lastProgressValue) {
      progressBar.value = progressPercentage;
      lastProgressValue = progressBar.value;

      if (progressPercentage < 56.5) {
        progressImage.src = "img/seba.png";
        underTheSeaElement.style.display = "block";
        moanaElement.style.display = "none";
      } else {
        progressImage.src = "img/moana.png";
        underTheSeaElement.style.display = "none";
        moanaElement.style.display = "block";
      }

      const currentTime = karaoke.currentTime;

      timingMap.forEach((item) => {
        const lineElement = document.getElementById(item.lineId);
        if (lineElement) {
          if (currentTime >= item.startTime && currentTime < item.endTime) {
            lineElement.style.color = "#d73524";
            lineElement.style.fontSize = "large";
            lineElement.classList.add("bouncing");
          } else {
            lineElement.style.color = "black";
            lineElement.style.fontSize = "medium";
            lineElement.classList.remove("bouncing");
          }
        }
      });
    }

    requestAnimationFrame(update);
  };

  requestAnimationFrame(update);
}
