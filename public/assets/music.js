document.addEventListener('DOMContentLoaded', () => {
  const audio = document.getElementById('audio');
  const playerCover = document.getElementById('playerCover');
  const playerTitle = document.getElementById('playerTitle');
  const playerMeta = document.getElementById('playerMeta');
  const playerBadge = document.getElementById('playerBadge');
  const btnPlay = document.getElementById('btnPlay');
  const btnPrev = document.getElementById('btnPrev');
  const btnNext = document.getElementById('btnNext');
  const seek = document.getElementById('seek');
  const timeCurrent = document.getElementById('timeCurrent');
  const timeTotal = document.getElementById('timeTotal');

  const tabs = document.querySelectorAll('.tab');
  const trackCards = document.querySelectorAll('.track-card');
  const playButtons = document.querySelectorAll('.js-card-play');

  if (!audio || !trackCards.length) {
    return;
  }

  let currentIndex = 0;
  let visibleTracks = Array.from(trackCards);

  function formatTime(seconds) {
    if (!Number.isFinite(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  function updateActiveCard() {
    trackCards.forEach((card, index) => {
      if (index === currentIndex) {
        card.classList.add('is-playing');
      } else {
        card.classList.remove('is-playing');
      }
    });
  }

  function loadTrackByCard(card, shouldPlay = false) {
    if (!card) return;

    const title = card.dataset.title || 'Без назви';
    const meta = card.dataset.meta || 'Трек';
    const cover = card.dataset.cover || '/images/cover-1.jpg';
    const src = card.dataset.src || '';

    if (!src) return;

    audio.src = src;
    playerTitle.textContent = title;
    playerMeta.textContent = meta;
    playerCover.style.backgroundImage = `url('${cover}')`;

    currentIndex = Array.from(trackCards).indexOf(card);
    updateActiveCard();

    playerBadge.textContent = 'Paused';
    btnPlay.textContent = '▶ Play';

    seek.value = 0;
    timeCurrent.textContent = '0:00';
    timeTotal.textContent = '0:00';

    if (shouldPlay) {
      audio.play()
        .then(() => {
          playerBadge.textContent = 'Playing';
          btnPlay.textContent = '⏸ Pause';
        })
        .catch((error) => {
          console.error('Audio play error:', error);
        });
    }
  }

  function playCurrent() {
    audio.play()
      .then(() => {
        playerBadge.textContent = 'Playing';
        btnPlay.textContent = '⏸ Pause';
      })
      .catch((error) => {
        console.error('Audio play error:', error);
      });
  }

  function pauseCurrent() {
    audio.pause();
    playerBadge.textContent = 'Paused';
    btnPlay.textContent = '▶ Play';
  }

  function getVisibleTracks() {
    return Array.from(trackCards).filter(card => card.style.display !== 'none');
  }

  function playNextTrack() {
    const currentCard = trackCards[currentIndex];
    visibleTracks = getVisibleTracks();

    if (!visibleTracks.length) return;

    let visibleIndex = visibleTracks.indexOf(currentCard);

    if (visibleIndex === -1) {
      visibleIndex = 0;
    } else {
      visibleIndex = (visibleIndex + 1) % visibleTracks.length;
    }

    loadTrackByCard(visibleTracks[visibleIndex], true);
  }

  function playPrevTrack() {
    const currentCard = trackCards[currentIndex];
    visibleTracks = getVisibleTracks();

    if (!visibleTracks.length) return;

    let visibleIndex = visibleTracks.indexOf(currentCard);

    if (visibleIndex === -1) {
      visibleIndex = 0;
    } else {
      visibleIndex = (visibleIndex - 1 + visibleTracks.length) % visibleTracks.length;
    }

    loadTrackByCard(visibleTracks[visibleIndex], true);
  }

  playButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const card = button.closest('.track-card');
      loadTrackByCard(card, true);
    });
  });

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('is-active'));
      tab.classList.add('is-active');

      const genre = tab.dataset.genre;

      trackCards.forEach((card) => {
        const cardGenre = card.dataset.genre || 'all';

        if (genre === 'all' || cardGenre === genre) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });

      visibleTracks = getVisibleTracks();
    });
  });

  btnPlay.addEventListener('click', () => {
    if (audio.paused) {
      playCurrent();
    } else {
      pauseCurrent();
    }
  });

  btnNext.addEventListener('click', () => {
    playNextTrack();
  });

  btnPrev.addEventListener('click', () => {
    playPrevTrack();
  });

  audio.addEventListener('loadedmetadata', () => {
    timeTotal.textContent = formatTime(audio.duration);
  });

  audio.addEventListener('timeupdate', () => {
    if (!Number.isFinite(audio.duration) || audio.duration <= 0) return;

    const progress = (audio.currentTime / audio.duration) * 100;
    seek.value = progress;
    timeCurrent.textContent = formatTime(audio.currentTime);
    timeTotal.textContent = formatTime(audio.duration);
  });

  seek.addEventListener('input', () => {
    if (!Number.isFinite(audio.duration) || audio.duration <= 0) return;

    const newTime = (seek.value / 100) * audio.duration;
    audio.currentTime = newTime;
  });

  audio.addEventListener('play', () => {
    playerBadge.textContent = 'Playing';
    btnPlay.textContent = '⏸ Pause';
  });

  audio.addEventListener('pause', () => {
    playerBadge.textContent = 'Paused';
    btnPlay.textContent = '▶ Play';
  });

  audio.addEventListener('ended', () => {
    playNextTrack();
  });

  visibleTracks = getVisibleTracks();

  const firstCard = trackCards[currentIndex];
  if (firstCard && !audio.src) {
    loadTrackByCard(firstCard, false);
  }
});