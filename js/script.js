const loadCocktail = async(search, dataLimit) =>{
    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`;
    const res = await fetch(url);
    const data = await res.json();
    displayCocktail(data.drinks, dataLimit);
};
const displayCocktail = (cocktail, dataLimit) =>{
    // console.log(cocktail);
    const cocktailContainer = document.getElementById("cocktail-container");
    cocktailContainer.textContent = '';
    const showAll = document.getElementById("show-all");
    if(dataLimit && cocktail.length >= 10){
        cocktail = cocktail.slice(0, 10);
        console.log(cocktail)
        showAll.classList.remove('d-none');
    }
    else{
        showAll.classList.add('d-none');
    }
    const noCocktail = document.getElementById("no-cocktail-found");
    if(cocktail  === null){
        noCocktail.classList.remove('d-none');
        spinner(false);
    }
    else{
        noCocktail.classList.add('d-none');
    };
    cocktail.forEach(element => {
        console.log(element)
        const cocktailDiv = document.createElement('div');
        cocktailDiv.classList.add('col');
        cocktailDiv.innerHTML = `
            <div class="card">
                <img src="${element.strDrinkThumb}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${element.strDrink}</h5>
                    <p class="card-text">${element.strInstructions ? element.strInstructions.slice(0, 50) : 'No Description Found'}</p>
                          <!-- Button trigger modal -->
          <button onclick="loadCocktailDetails('${element.idDrink}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#cocktailModal">
            Show Detalis
          </button>
                </div>
            </div>
        `;
        cocktailContainer.appendChild(cocktailDiv);
    });
    //Stop Spinner
    spinner(false);
};
//Spinner function
const spinner = isLoading =>{
    const spinnerContainer = document.getElementById('spinner');
    if(isLoading){
        spinnerContainer.classList.remove('d-none');
    }
    else{
        spinnerContainer.classList.add('d-none');
    };
};
const searchProcess = (dataLimit) =>{
//Start Spinner
    spinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadCocktail(searchText, dataLimit);
}
//Search btn 
document.getElementById("btn-search").addEventListener('click', function() {
    searchProcess(10);
});
//search enter key
document.getElementById('search-field').addEventListener('keypress', function(e){
    // console.log(e.key)
    if(e.key === 'Enter'){
        searchProcess(10);
    }
});
//Show All button
document.getElementById("btn-show-all").addEventListener('click', function(){
    searchProcess();
});
//Modal show
const loadCocktailDetails = async(id) =>{
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayCocktailDetails(data.drinks[0]);
};
const displayCocktailDetails = (data) =>{
    console.log(data);
    const modalTitle = document.getElementById("cocktailModalLabel");
    modalTitle.innerText = data.strDrink;
    const modalContainer = document.getElementById('modal-container');
    modalContainer.innerHTML = `
    <img class="img-fluid" src="${data.strDrinkThumb}">
    <h3>${data.strIngredient2}</h3>
    <p>Date: ${data.dateModified}</p>
    <p>Description: ${data.strInstructionsIT? data.strInstructionsIT : 'No description Found'}</p>

    `;
};
loadCocktail('a');
//defult set korle value 10tar beshi dekace ..need to solve it