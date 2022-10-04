import React, { useEffect, useState } from 'react';
import Recipe from './Recipe';
import './App.css';

function App() {
  const APP_ID = "e67ae94d";
  const APP_KEY = "a51323e563d97be454099eb933987445";

  const [recipes,setRecipes]=useState([]);
  const [search,setSearch]=useState("");
  const [query,setQuery]=useState('chicken');

  useEffect(() => {
    getRecipes();
  },[query]);
  const getRecipes = async()=>{
    const response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&beta=true&q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  }

  const updateSearch = e => {
    setSearch(e.target.value);
  }
  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }
  return (
    <div className="App">
      <form onSubmit={getSearch} className='search-form'>
        <input onChange={updateSearch} className='search-bar' type="text" value={search}/>
        <button className='search-button' type="submit">Search</button>
      </form>
      <div className='recipes'>
      {recipes.map(recipe=>(
        <Recipe 
        key={recipe.recipe.label}
        title={recipe.recipe.label}
        calories={recipe.recipe.calories}
        image={recipe.recipe.image}
        />
      ))}
      </div>
    </div>
  );
}

export default App;
