const request = new XMLHttpRequest();
const btn = document.querySelector("button");
const img = document.querySelector(".poke-img");
const info = document.querySelector(".information");
const pokeName = document.querySelector(".poke-name");
const type = document.querySelector(".type");
const height = document.querySelector(".height");
const weight = document.querySelector(".weight");
const newImg = new Image();

btn.addEventListener("click", () => {
    getNewPokemon();
})

request.addEventListener('readystatechange', () => {
    if (request.readyState === 4 && request.status === 200) {
        const pokemon = JSON.parse(request.response);
        const imgSrc = pokemon.sprites.front_default;
        const pokeTypes = pokemon.types;

        
        const newImg = new Image();

        newImg.src = imgSrc;

        newImg.onload = function() {
            
            img.setAttribute("src", imgSrc);
            img.classList.add("visible");
            info.classList.add("visible");
            pokeName.innerHTML = pokemon.name.toUpperCase();
            pokeName.classList.add("visible");
            height.innerHTML = "Height: " + (pokemon.height * 3.937).toFixed(2) + " inches";
            weight.innerHTML = "Weight: " + (pokemon.weight / 4.536).toFixed(2) + " lbs";
            if(pokeTypes.length > 1) {
                type.innerHTML = "";
                pokeTypes.forEach((oneType) => {
                    type.innerHTML += oneType.type.name + ". " ;
                    type.innerHTML = type.innerHTML.toUpperCase();                    
                });
            } else {
                type.innerHTML = pokemon.types[0].type.name.toUpperCase() + ".";
            }
                       
        };

        newImg.onerror = function() {
            console.error("Failed to load image:", imgSrc);
        };
    }
});





function getNewPokemon() {

    const randomNumber = Math.floor(Math.random() * 1010);
    request.open('GET', 'https://pokeapi.co/api/v2/pokemon/' + randomNumber + '/');
    request.send();
    const img = document.querySelector('.poke-img');
    const name = document.querySelector('.poke-name');
    img.classList.remove('visible');
    name.classList.remove('visible');
    info.classList.remove('visible');

}