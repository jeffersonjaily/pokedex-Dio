const pokedex = document.getElementById('pokedex');
const modal = document.getElementById('pokemon-modal');
const modalBody = document.getElementById('modal-body');
const closeBtn = document.querySelector('.close-btn');

const fetchPokemon = async () => {
  for (let i = 1; i <= 20; i++) {
    await getPokemon(i);
  }
};

const getPokemon = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const res = await fetch(url);
  const pokemon = await res.json();
  createPokemonCard(pokemon);
};

const createPokemonCard = (pokemon) => {
  const card = document.createElement('div');
  const type = pokemon.types[0].type.name;

  card.classList.add('pokemon-card', `type-${type}`);

  card.innerHTML = `
    <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" />
    <h3>${pokemon.name}</h3>
  `;

  card.addEventListener('click', () => showPokemonDetails(pokemon));

  pokedex.appendChild(card);
};


const showPokemonDetails = (pokemon) => {
  const types = pokemon.types.map(t => t.type.name).join(', ');
  const abilities = pokemon.abilities.map(a => a.ability.name).join(', ');

  modalBody.innerHTML = `
    <h2>${pokemon.name}</h2>
    <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" />
    <p><strong>ID:</strong> #${pokemon.id.toString().padStart(3, '0')}</p>
    <p><strong>Altura:</strong> ${(pokemon.height / 10).toFixed(1)} m</p>
    <p><strong>Peso:</strong> ${(pokemon.weight / 10).toFixed(1)} kg</p>
    <p><strong>Tipos:</strong> ${types}</p>
    <p><strong>Habilidades:</strong> ${abilities}</p>
  `;

  modal.classList.remove('hidden');
};

// Fechar modal ao clicar no "x"
closeBtn.addEventListener('click', () => {
  modal.classList.add('hidden');
});

// Fechar modal ao clicar fora do conteúdo
window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.add('hidden');
  }
});

// Iniciar app
fetchPokemon();
