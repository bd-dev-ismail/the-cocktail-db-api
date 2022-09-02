const loadCocktail = async(search) =>{
    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`;
    const res = await fetch(url);
    const data = await res.json();
    displayCocktail(data.drinks);
};
const displayCocktail = (cocktail) =>{
    console.log(cocktail);
    const cocktailContainer = document.getElementById("cocktail-container");
    cocktailContainer.textContent = '';
    // cocktail = cocktail.slice(0, 20);
    const noCocktail = document.getElementById("no-cocktail-found");
    if(cocktail  === null){
        noCocktail.classList.remove('d-none');
        spinner(false);
    }
    else{
        noCocktail.classList.add('d-none');
    };
    cocktail.forEach(element => {
        const cocktailDiv = document.createElement('div');
        cocktailDiv.classList.add('col');
        cocktailDiv.innerHTML = `
            <div class="card">
                <img src="${element.strDrinkThumb}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${element.strDrink}</h5>
                    <p class="card-text">${element.strInstructions ? element.strInstructions.slice(0, 100) : 'No Description Found'}</p>
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
const searchProcess = () =>{
//Start Spinner
    spinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadCocktail(searchText);
}
//Search btn 
document.getElementById("btn-search").addEventListener('click', function() {
    searchProcess();
});
//search enter key
document.getElementById('search-field').addEventListener('keypress', function(e){
    // console.log(e.key)
    if(e.key === 'Enter'){
        searchProcess();
    }
});

loadCocktail('a');