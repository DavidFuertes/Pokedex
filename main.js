document.addEventListener("DOMContentLoaded", () => {
  const listaPokemon = document.querySelector("#listaPokemon");
  const botonesHeader = document.querySelectorAll(".btn-header");
  const URL = "https://pokeapi.co/api/v2/pokemon/";

  // Cargar los primeros 151 Pokémon
  for (let i = 1; i <= 151; i++) {
    fetch(URL + i)
      .then((response) => response.json())
      .then((data) => mostrarPokemon(data))
      .catch((error) => console.error("Error fetching Pokémon:", error));
  }

  // Función para mostrar Pokémon
  function mostrarPokemon(poke) {
    const div = document.createElement("div");
    div.classList.add("pokemon");

    const pokeTypes = poke.types
      .map(
        (type) => `
          <img src="./img/type/Tipo_${type.type.name}.webp" alt="${type.type.name}" class="tipo">
        `
      )
      .join("");

    div.innerHTML = `
          <div class="pokemon">
            <p class="pokemon-id-back">#${poke.id
              .toString()
              .padStart(3, "0")}</p>
            <div class="pokemon-image">
              <img
                src="${poke.sprites.other["official-artwork"].front_default}"
                alt="${poke.name}"
              />
            </div>
            <div class="pokemon-info">
              <div class="nombre-contenedor">
                <p class="pokemon-id">#${poke.id
                  .toString()
                  .padStart(3, "0")}</p>
                <h2 class="pokemon-nombre">${poke.name}</h2>
              </div>
              <div class="pokemon-tipos">
                ${pokeTypes}
              </div>
              <div class="pokemon-stats">
                <p class="stat">Altura: ${(poke.height / 10).toFixed(1)} m</p>
                <p class="stat">Peso: ${(poke.weight / 10).toFixed(1)} kg</p>
              </div>
            </div>
          </div>
        `;

    listaPokemon.appendChild(div);
  }

  botonesHeader.forEach((boton) => {
    boton.addEventListener("click", (event) => {
      const botonId = event.currentTarget.id;
      listaPokemon.innerHTML = "";
      for (let i = 1; i <= 151; i++) {
        fetch(URL + i)
          .then((response) => response.json())
          .then((data) => {
            if (botonId === "ver-todos") {
              mostrarPokemon(data);
            }
            if (botonId === "dark") {
              alert(
                "No existen pokemon de tipo siniestro en la primera generación"
              );
            }
            const tipos = data.types.map((type) => type.type.name);
            if (tipos.some((tipo) => tipo === botonId)) {
              mostrarPokemon(data);
            }
          })
          .catch((error) => {
            console.error("Error fetching Pokémon:", error);
          });
      }
    });
  });
});
