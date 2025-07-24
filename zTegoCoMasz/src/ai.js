import Anthropic from "@anthropic-ai/sdk"

const SYSTEM_PROMPT = `
Jesteś asystentem, który otrzymuje listę składników użytkownika i sugeruje przepis, który można przygotować z
niektórymi lub wszystkimi z nich. Nie musisz używać wszystkich składników wymienionych w przepisie. Przepis może zawierać
dodatkowe składniki, których użytkownik nie wymienił, ale staraj się nie dodawać ich zbyt wiele. Sformatuj swoją odpowiedź
w Markdownie, aby łatwiej było ją wyświetlić na stronie internetowej.
`

// 🚨👉 ALERT: Read message below! You've been warned! 👈🚨
// If you're following along on your local machine instead of
// here on Scrimba, make sure you don't commit your API keys
// to any repositories and don't deploy your project anywhere
// live online. Otherwise, anyone could inspect your source
// and find your API keys/tokens. If you want to deploy
// this project, you'll need to create a backend of some kind,
// either your own or using some serverless architecture where
// your API calls can be made. Doing so will keep your
// API keys private.

const anthropic = new Anthropic({
    // Make sure you set an environment variable in Scrimba 
    // for ANTHROPIC_API_KEY
    apiKey: import.meta.env.VITE_ANTHROPIC_API_KEY,

    dangerouslyAllowBrowser: true,
})

export async function getRecipeFromChefClaude(ingredientsArr) {
    const ingredientsString = ingredientsArr.join(", ")

    const msg = await anthropic.messages.create({
        model: "claude-3-haiku-20240307",
        max_tokens: 1024,
        system: SYSTEM_PROMPT,
        messages: [
            { role: "user", content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!` },
        ],
    });
    return msg.content[0].text
}


