import ReactMarkdown from 'react-markdown'

export function Recipe(props){
    return(
        <section className="suggested-recipe-container">
            <ReactMarkdown>{props.recipe}</ReactMarkdown>
          </section>
    )
}