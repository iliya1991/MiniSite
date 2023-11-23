'use strict';

class Movie {
  constructor(cinema, name, date, time, img, link, text, trailer) {
    this.cinema = cinema;
    this.name = name;
    this.date = date;
    this.time = time;
    this.img = img;
    this.link = link;
    this.text = text;
    this.trailer = trailer;
  }

  generateMarkup() {
    return `
    <div class="movie">
    <img
      src="${this.img}"
      class="movie-img"
      data-cinema="${this.cinema}"
      data-name="${this.name}"
      data-date="${this.date}"
      data-time="${this.time}"
      data-img="${this.img}"
      data-link="${this.link}"
      data-text="${this.text}"
      data-trailer="${this.trailer}"
    />
    <div class="movie-title-container">
        <p class="movie-title movie-text">${this.name}</p>
    </div>
    <div class="movie-details-container">
      <p class="movie-cinema movie-text">${
        cinemaNameMap.get(this.cinema) ? cinemaNameMap.get(this.cinema) : ''
      } HOT CINEMA</p>
      <p class="movie-date movie-text">${this.date}</p>
      <p class="movie-time movie-text">${this.time}</p> 
    </div>
    <a
      class="movie-link btn"
      href="${this.link}"
      >לרכישה</a
    >
  </div>
    `;
  }

  getCinemaName() {
    return cinemaNameMap.get(this.cinema);
  }
}

const moviesContainer = document.querySelector('.movies-container');
const modal = document.querySelector('.modal');
const modalHeader = document.querySelector('.modal-header');
const modalAdditional = document.querySelector('.modal-additional');
const btnModalClose = document.querySelector('.modal-btn-close');
const btnFilter = document.querySelectorAll('.filter');
let filter = 'ALL';
let shownMovies;
const btnMainFilter = document.querySelector('.filter-main-btn');
const dropdownContent = document.querySelector('.dropdown-content');
const allCinemaBtns = document.querySelectorAll('.filter-btn-cinema');
const cinemaNameMap = new Map([
  ['NHR', 'נהריה'],
  ['KL', 'כרמיאל'],
  ['KR', 'קריון'],
  ['GCH', 'חיפה'],
  ['KSO', 'כפר סבא'],
  ['PT', 'פתח תקווה'],
  ['MOD', 'מודיעין'],
  ['RT', 'רחובות'],
  ['ASD', 'אשדוד'],
  ['AN', 'אשקלון'],
  ['ALL', 'כל בתי הקולנוע'],
]);

const movie1 = new Movie(
  'KSO',
  'מפרץ ההרפתקאות: סרט העל עברית',
  '11/12/2023',
  '17:00',
  'https://hotcinema.co.il/images/PP2_MightyMovie_Poster.jpg?w=192&h=279&mode=crop',
  'https://hotcinema.co.il/movie/2393/paw-patrol:-the-mighty-movie',
  'Buy now',
  'https://www.youtube.com/embed/f95yj7d8A3c?si=Im4ILY8vXuofd0nt'
);

const movie2 = new Movie(
  'KL',
  'מפרץ ההרפתקאות: סרט העל עברית',
  '11/12/2023',
  '17:00',
  'https://hotcinema.co.il/images/PP2_MightyMovie_Poster.jpg?w=192&h=279&mode=crop',
  'https://hotcinema.co.il/movie/2393/paw-patrol:-the-mighty-movie',
  'Buy now',
  'https://www.youtube.com/embed/f95yj7d8A3c?si=Im4ILY8vXuofd0nthttps://youtu.be/f95yj7d8A3c'
);

const movie3 = new Movie(
  'KR',
  'מפרץ ההרפתקאות: סרט העל עברית',
  '11/12/2023',
  '17:00',
  'https://hotcinema.co.il/images/PP2_MightyMovie_Poster.jpg?w=192&h=279&mode=crop',
  'https://hotcinema.co.il/movie/2393/paw-patrol:-the-mighty-movie',
  'Buy now',
  'https://www.youtube.com/embed/f95yj7d8A3c?si=Im4ILY8vXuofd0nt'
);

const movie4 = new Movie(
  'PT',
  'הארי פוטר',
  '15/1/2024',
  '12:00',
  'https://cdn.europosters.eu/image/750/plastic-frame-harry-potter-deathly-hallows-part-2-wand-i104204.jpg',
  'https://hotcinema.co.il/movie/2434/taylor-swift-the-eras-tour#order-panel',
  'Text',
  'https://www.youtube.com/embed/f95yj7d8A3c?si=Im4ILY8vXuofd0nt'
);

const movie5 = new Movie(
  'MOD',
  'מפרץ ההרפתקאות: סרט העל עברית',
  '11/12/2023',
  '17:00',
  'https://hotcinema.co.il/images/PP2_MightyMovie_Poster.jpg?w=192&h=279&mode=crop',
  'https://hotcinema.co.il/movie/2393/paw-patrol:-the-mighty-movie',
  'Buy now',
  'https://www.youtube.com/embed/f95yj7d8A3c?si=Im4ILY8vXuofd0nt'
);

const movie6 = new Movie(
  'AN',
  'מפרץ ההרפתקאות: סרט העל עברית',
  '11/12/2023',
  '17:00',
  'https://hotcinema.co.il/images/PP2_MightyMovie_Poster.jpg?w=192&h=279&mode=crop',
  'https://hotcinema.co.il/movie/2393/paw-patrol:-the-mighty-movie',
  'Buy now',
  'https://www.youtube.com/embed/f95yj7d8A3c?si=Im4ILY8vXuofd0nt'
);

const movie7 = new Movie(
  'MOD',
  'מפרץ ההרפתקאות: סרט העל עברית',
  '11/12/2023',
  '17:00',
  'https://hotcinema.co.il/images/PP2_MightyMovie_Poster.jpg?w=192&h=279&mode=crop',
  'https://hotcinema.co.il/movie/2393/paw-patrol:-the-mighty-movie',
  'Buy now',
  'https://www.youtube.com/embed/f95yj7d8A3c?si=Im4ILY8vXuofd0nt'
);

const allMovies = [movie1, movie2, movie3, movie4, movie5, movie6, movie7];

moviesContainer.addEventListener('click', (e) => {
  if (e.target.classList.contains('movie-img')) {
    const currentMovie = new Movie(
      e.target.getAttribute('data-cinema'),
      e.target.getAttribute('data-name'),
      e.target.getAttribute('data-date'),
      e.target.getAttribute('data-time'),
      e.target.getAttribute('data-img'),
      e.target.getAttribute('data-link'),
      e.target.getAttribute('data-text'),
      e.target.getAttribute('data-trailer')
    );
    loadModalWithInfo(currentMovie);
  }
});

btnFilter.forEach((btn) =>
  btn.addEventListener('click', () => updateFilter(btn))
);

function updateFilter(btn) {
  filter = btn.getAttribute('data-filter');
  reloadMovies();
}

modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    removeModal();
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) removeModal();
});

window.addEventListener('load', function () {
  reloadMovies();
});

btnModalClose.addEventListener('click', (e) => {
  removeModal();
});

function openYoutubePlayer(currentMovie) {
  const youtubePlayerContainer = document.getElementById(
    'youtube-player-container'
  ); // Make sure this exists in your HTML
  youtubePlayerContainer.innerHTML = `
    <div class modal-container>
      <iframe class="youtube-player" width="560" height="315" src="${currentMovie?.trailer}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
    </div>
  `;
}

function loadModalWithInfo(movie) {
  showModal();
  openYoutubePlayer(movie);
  loadModalAdditionInfo(movie);
}

function loadModalAdditionInfo(movie) {
  // if (modalHeader) modalHeader.innerHTML = `${movie?.name}`;
  if (modalAdditional) {
    modalAdditional.innerHTML = `
    <div class="movie-title-container movie-title-container-modal">
    <p class="movie-title movie-text">${movie.name}</p>
</div>
<div class="movie-details-container">
  <p class="movie-cinema movie-text">${
    cinemaNameMap.get(movie.cinema) ? cinemaNameMap.get(movie.cinema) : ''
  } HOT CINEMA</p>
  <p class="movie-date movie-text">${movie.date}</p>
  <p class="movie-time movie-text">${movie.time}</p> 
</div>
<a
  class="movie-link btn movie-link-modal"
  href="${movie.link}"
  >לרכישה</a
>
</div>
    `;
  }
}

function generateMultipleMarkup(movies) {
  moviesContainer.innerHTML = movies.reduce((html, movie) => {
    // console.log(movie);
    // console.log(html);
    return html + movie.generateMarkup();
  }, '');
}

function showModal() {
  if (modal) modal.classList.remove('hidden');
}

function removeModal() {
  if (modal) modal.classList.add('hidden');
}

function generateMarkupFiltered(filter) {
  if (!filter || filter === 'ALL') {
    shownMovies = allMovies;
  } else {
    shownMovies = allMovies.filter((movie) => movie.cinema === filter);
  }
  // console.log(shownMovies);
  generateMultipleMarkup(shownMovies);
}

function reloadMovies() {
  if (btnMainFilter)
    btnMainFilter.innerHTML = cinemaNameMap.get(filter.toString());
  generateMarkupFiltered(filter);
}
// generateMultipleMarkup(allMovies);

function unhideDroplistItems() {
  const cinemaList = allMovies.map((movie) => movie.cinema);
  console.log(cinemaList);
  allCinemaBtns.forEach((btn) => {
    if (cinemaList.includes(btn.getAttribute('data-filter')))
      btn.classList.remove('hidden');
    else btn.classList.add('hidden');
  });
}

unhideDroplistItems();
