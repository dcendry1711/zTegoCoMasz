export function IngredientsList(props){

    const ingredientsList = props.ingredients.map( item => {
        return <li key={item}>{item}</li>
    })


    return(
        <div>
            <div className="ingredientsList">
                <h3>Lista składników: </h3>
                <ul>
                    {ingredientsList}
                </ul>
            </div>
            { props.ingredients.length > 2 &&
              <div className="get-recipe-container">
                <div>
                  <h3>Gotowy na przepis?</h3>
                  <p>Wygeneruj przepis na podstawie listy składników.</p>
                </div>
                <div>
                  <button onClick={props.generateRecipe} className="recipe-btn">Generuj przepis</button>
                </div>
              </div>}
        </div>
    )
}