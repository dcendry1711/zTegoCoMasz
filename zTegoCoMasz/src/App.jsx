import { Header } from "./Header.jsx"
import { IngredientsList } from "./IngredientsList.jsx"
import { Recipe } from "./Recipe.jsx"
import {getRecipeFromChefClaude} from "./ai.js"
import React from "react"

console.log('API Key:', import.meta.env.VITE_ANTHROPIC_API_KEY);

export function App() {

  const [ingredients, setIngredients] = React.useState([])

  const [recipe, setRecipe] = React.useState("")

  function handleSubmit(formData){
    //Object.fromEntries(formData) -> wyświetlenie obiektu zawierającego wszystkie dane z formularza 
    const newIngredient = formData.get('newIngredient')
    newIngredient ? setIngredients( prevIngredients => [...prevIngredients,newIngredient]) : null
  }

  async function generateRecipe(){
    const generatedRecipe = await getRecipeFromChefClaude(ingredients)
    setRecipe(generatedRecipe)
  }
  
  function removeIngredients(){
    setIngredients(prevIngredients => [])
    setRecipe("")
  }

  function removeRecipe(){
    setRecipe("")
  }
 
  return (
    <>
    <Header />
     <main> 
        <h2 className="title">W poniższym polu podaj przynajmniej 3 składniki do wygenerowania przepisu</h2>
        <form action={handleSubmit}>
            <input name="newIngredient" type="text" placeholder="wpisz składnik..."/>
            <button type="submit">Dodaj składnik</button>
            <button type="button" onClick={removeIngredients}>Usuń wszystkie składniki</button>
        </form>
        <div>
          <IngredientsList ingredients={ingredients} generateRecipe={generateRecipe} />  
        </div>
        { recipe && <Recipe recipe={recipe}/> }
        { recipe ? <button className="remove-recipe-btn" type="button" onClick={removeRecipe}>Usuń wygenerowany przepis</button> : null }
      </main>
    </>
  )
}
  
