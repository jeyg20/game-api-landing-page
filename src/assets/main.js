const url = 'https://api.rawg.io/api/games';
const pageNumberElement = document.querySelectorAll('.page-number');

async function fetchData(urlApi) {
  try {
    const response = await fetch(urlApi);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

(async () => {
  try {
    const gamesContainer = document.getElementById('content');
    const apiKey = 'b3edb66a95c44607a32ed882a2eef73d';
    let pageNumber = 1;

    const games = await fetchData(`${url}?key=${apiKey}&page=${pageNumber}&page_size=24`)
    displayGames(games);
    
    pageNumberElement.forEach(elem => elem.addEventListener('click', async (event) => {
      event.preventDefault();
      pageNumber = parseInt(elem.innerHTML);
      gamesContainer.innerHTML = '';
      const games = await fetchData(`${url}?key=${apiKey}&page=${pageNumber}&page_size=24`);
      displayGames(games);
    }))

    function displayGames(games) {
      games.results.forEach(game => {
        const genresList = game.genres.map(genre => genre.name).join(', ');
        const figureHTML = `
            <div class="bg-white rounded-xl shadow dark:bg-gray-700 dark:border-gray-700">
                <img class="w-full rounded-t-xl aspect-video object-cover" src="${game.background_image}" alt="${game.name}" />
              <div class="p-5">
                <a href="#">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${game.name}</h5>
                </a>
                <p class="mb-3 font-normal text-gray-700 dark:text-gray-200"><span class="font-bold">Rating:</span> ${game.rating}</p>
                <hr class="h-px my-1 bg-gray-200 border-0 dark:bg-gray-500">
                <p class="mb-3 font-normal text-gray-700 dark:text-gray-200"><span class="font-bold">Release date:</span> ${game.released}</p>
                <hr class="h-px my-1 bg-gray-200 border-0 dark:bg-gray-500">
                <p class="mb-3 font-normal text-gray-700 dark:text-gray-200"><span class="font-bold">Genres:</span> ${genresList}</p>
              </div>
            </div>
        `;
    
        gamesContainer.innerHTML += figureHTML;
      });
    }
  } catch (error) {
    console.error(error);
  }
})();
