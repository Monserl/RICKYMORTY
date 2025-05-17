// Elementos del DOM
const fetchBtn = document.getElementById('fetch-btn');
const axiosBtn = document.getElementById('axios-btn');
const dataContainer = document.getElementById('data-container');
const loadingElement = document.getElementById('loading');

// URL API
const API_URL = 'https://rickandmortyapi.com/api/character';

// Estado de carga
function showLoading(show) {
  loadingElement.style.display = show ? 'block' : 'none';
}

// Personajes
function renderCharacters(characters) {
  dataContainer.innerHTML = '';
  
  characters.forEach(character => {
    const characterElement = document.createElement('div');
    characterElement.className = 'col-md-4 mb-4';
    characterElement.innerHTML = `
      <div class="card character-card">
        <img src="${character.image}" class="card-img-top character-img" alt="${character.name}">
        <div class="card-body">
          <h5 class="card-title">${character.name}</h5>
          <p class="card-text">
            <span class="badge bg-${character.status === 'Alive' ? 'success' : character.status === 'Dead' ? 'danger' : 'secondary'}">
              ${character.status}
            </span>
            - ${character.species}
          </p>
          <p class="card-text"><small class="text-muted">${character.location.name}</small></p>
        </div>
      </div>
    `;
    dataContainer.appendChild(characterElement);
  });
}

// Fetch
fetchBtn.addEventListener('click', () => {
  showLoading(true);
  dataContainer.innerHTML = '';
  
  fetch(API_URL)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      renderCharacters(data.results);
    })
    .catch(error => {
      console.error('Error con Fetch:', error);
      dataContainer.innerHTML = `
        <div class="alert alert-danger col-12">
          Hubo un error al obtener los datos: ${error.message}
        </div>
      `;
    })
    .finally(() => {
      showLoading(false);
    });
});

// Axios
axiosBtn.addEventListener('click', () => {
  showLoading(true);
  dataContainer.innerHTML = '';
  
  axios.get(API_URL)
    .then(response => {
      renderCharacters(response.data.results);
    })
    .catch(error => {
      console.error('Error con Axios:', error);
      dataContainer.innerHTML = `
        <div class="alert alert-danger col-12">
          Hubo un error al obtener los datos: ${error.message}
        </div>
      `;
    })
    .finally(() => {
      showLoading(false);
    });
});
