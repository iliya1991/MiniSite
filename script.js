'use strict';

const moviesContainer = document.querySelector('.movies-container');
const modal = document.querySelector('.modal');

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
      data-trailer="${this.trailer}"
    />
    <div class="movie-title-container">
        <p class="movie-title movie-text">${this.name}</p>
    </div>
    <div class="movie-details-container">
      <p class="movie-cinema movie-text">${this.cinema} HOT CINEMA</p>
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
}

moviesContainer.addEventListener('click', (e) => {
  if (e.target.classList.contains('movie-img')) {
    console.log('Trailer playing ...');
    const youtubeUrl = e.target.getAttribute('data-trailer');
    youtubeUrl
      ? openYoutubePlayer(youtubeUrl)
      : console.log('Trailer link not found');
  }
});

modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    removeModal();
  }
});

document.addEventListener('keydown', (e) => {
  console.log(e.key);
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) removeModal();
});

function openYoutubePlayer(youtubeUrl) {
  const youtubePlayerContainer = document.getElementById(
    'youtube-player-container'
  ); // Make sure this exists in your HTML
  showModal();
  youtubePlayerContainer.innerHTML = `<iframe width="560" height="315" src="${youtubeUrl}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;
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

const movie1 = new Movie(
  'כפר סבא',
  'מפרץ ההרפתקאות: סרט העל עברית',
  '11/12/2023',
  '17:00',
  'https://hotcinema.co.il/images/PP2_MightyMovie_Poster.jpg?w=192&h=279&mode=crop',
  'https://hotcinema.co.il/movie/2393/paw-patrol:-the-mighty-movie',
  'Buy now',
  'https://www.youtube.com/embed/f95yj7d8A3c?si=Im4ILY8vXuofd0nt'
);

const movie2 = new Movie(
  'כרמיאל',
  'מפרץ ההרפתקאות: סרט העל עברית',
  '11/12/2023',
  '17:00',
  'https://hotcinema.co.il/images/PP2_MightyMovie_Poster.jpg?w=192&h=279&mode=crop',
  'https://hotcinema.co.il/movie/2393/paw-patrol:-the-mighty-movie',
  'Buy now',
  'https://www.youtube.com/embed/f95yj7d8A3c?si=Im4ILY8vXuofd0nthttps://youtu.be/f95yj7d8A3c'
);

const movie3 = new Movie(
  'קריון',
  'מפרץ ההרפתקאות: סרט העל עברית',
  '11/12/2023',
  '17:00',
  'https://hotcinema.co.il/images/PP2_MightyMovie_Poster.jpg?w=192&h=279&mode=crop',
  'https://hotcinema.co.il/movie/2393/paw-patrol:-the-mighty-movie',
  'Buy now',
  'https://www.youtube.com/embed/f95yj7d8A3c?si=Im4ILY8vXuofd0nt'
);

const movie4 = new Movie(
  'כרמיאל',
  'הארי פוטר',
  '15/1/2024',
  '12:00',
  'https://cdn.europosters.eu/image/750/plastic-frame-harry-potter-deathly-hallows-part-2-wand-i104204.jpg',
  'https://hotcinema.co.il/movie/2434/taylor-swift-the-eras-tour#order-panel',
  'Text',
  'https://www.youtube.com/embed/f95yj7d8A3c?si=Im4ILY8vXuofd0nt'
);

const movie5 = new Movie(
  'קריון',
  'מפרץ ההרפתקאות: סרט העל עברית',
  '11/12/2023',
  '17:00',
  'https://hotcinema.co.il/images/PP2_MightyMovie_Poster.jpg?w=192&h=279&mode=crop',
  'https://hotcinema.co.il/movie/2393/paw-patrol:-the-mighty-movie',
  'Buy now',
  'https://www.youtube.com/embed/f95yj7d8A3c?si=Im4ILY8vXuofd0nt'
);

const movie6 = new Movie(
  'אשקלון',
  'מפרץ ההרפתקאות: סרט העל עברית',
  '11/12/2023',
  '17:00',
  'https://hotcinema.co.il/images/PP2_MightyMovie_Poster.jpg?w=192&h=279&mode=crop',
  'https://hotcinema.co.il/movie/2393/paw-patrol:-the-mighty-movie',
  'Buy now',
  'https://www.youtube.com/embed/f95yj7d8A3c?si=Im4ILY8vXuofd0nt'
);

const movies = [movie1, movie2, movie3, movie4, movie5, movie6];

generateMultipleMarkup(movies);
