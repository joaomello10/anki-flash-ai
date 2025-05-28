import ollama from 'ollama'

async function generatePhrase(word) {
  const phrase = await ollama.chat({
    model: 'gemma3:latest',
    messages: [{
      role: 'user', content: `
      Crie uma frase em inglês com a palavra ${word}, usada em um contexto comum. Responda somente com a frase. Não use aspas, não explique, não adicione nada além da frase.
      `
    }],
  })

  // const js = JSON.parse(response.message.content.replace(/^```json\s*/, '').replace(/```$/, ''))
  // res.json(js)

  const result = {
    content: phrase.message.content,
  }

  return result
}

async function generateDefinitions(word) {
  const definitions = await ollama.chat({
    model: 'gemma3:latest',
    messages: [{
      role: 'user', content: `Dê quatro definições em português para a palavra ${word}, considerando significados comuns. Responda apenas com as definições separadas por vírgulas, sem explicações extras.`
    }],
  })

  // const js = JSON.parse(response.message.content.replace(/^```json\s*/, '').replace(/```$/, ''))
  // res.json(js)

  const result = {
    content: definitions.message.content,
  }

  return result
}

async function generateTranslation(phrase) {


  const translation = await ollama.chat({
    model: 'gemma3:latest',
    messages: [{
      role: 'user', content: `
      Traduza a seguinte frase em inglês para o português e me retorne apenas a tradução: ${phrase}`
    }],
  })

  // const js = JSON.parse(response.message.content.replace(/^```json\s*/, '').replace(/```$/, ''))
  // res.json(js)

  const result = {
    content: translation.message.content,
  }

  return result
}

export default {
  async GenerateCard(req, res) {
    const word = req.params.word;

    const phrase = await generatePhrase(word);
    const translation = await generateTranslation(phrase.content);
    const definitions = await generateDefinitions(word);

    const result = {
      word: word,
      phrase: phrase.content,
      translation: translation.content,
      definitions: definitions.content
    }

    res.json(result)
  }
}
