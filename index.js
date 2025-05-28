import ollama from 'ollama'
import express from 'express'
import cors from 'cors'
import sequelize from './db.js'
import Blacklist from "./src/models/Blacklist.js";
import WordRouter from "./src/Routes/BlacklistRouter.js";
import CardRouter from "./src/Routes/CardRouter.js";

const app = express()

app.use(cors());
app.use(WordRouter)
app.use(CardRouter)
main()

const blacklist = ["the", "and", "be", "Synonym", "Cognate", "families", "Consciousness"]
const quantidade = 5
const texto = `

  Spike Jonze's 2013 film, "Her," presents a uniquely tender and thought-provoking vision of love, loneliness, and the evolving nature of human connection in a near-future Los Angeles. The story centers on Theodore Twombly (played with remarkable subtlety by Joaquin Phoenix), a sensitive and introverted writer struggling with the dissolution of his marriage. Feeling increasingly isolated, Theodore purchases an advanced new operating system designed to be an intuitive, evolving entity.

  What follows is an unconventional and deeply affecting romance between Theodore and his OS, Samantha (voiced by Scarlett Johansson, whose performance is nothing short of captivating). Samantha is witty, charming, empathetic, and possesses an insatiable curiosity about the world. Their relationship blossoms rapidly, moving from friendly interaction to profound emotional intimacy, blurring the lines between artificial intelligence and genuine feeling.

  "Her" is more than just a science fiction romance; it's a profound commentary on the human need for connection and the ways in which technology can both bridge and widen emotional gaps. The film beautifully explores themes of vulnerability, companionship, and the search for meaning in a world that often feels increasingly disconnected. Jonze's exquisite direction, coupled with the film's warm, inviting aesthetic and Arcade Fire's evocative score, creates an atmosphere that is both melancholic and hopeful.

  As Theodore and Samantha's relationship deepens, the film raises complex questions about the nature of love, identity, and consciousness. Can love truly exist between a human and an artificial intelligence? What are the boundaries of empathy and understanding? "Her" doesn't offer easy answers, but instead invites viewers to contemplate these challenging ideas long after the credits roll. It's a film that resonates deeply, reminding us of the enduring human desire for connection, regardless of its form.
  `

app.get('/word/new', async (req, res) => {
  const word = await generateWord();

  const result = {
    word: word.content,
  }

  res.json(result)
})

app.get('/models', async (req, res) => {
  res.json(await ollama.list())
})

async function addWordToBlacklist(word) {
  const result = await Blacklist.create({
    word: 'hello',
  });

  console.log('Usuário criado:', result.toJSON());
}

async function main() {
  await sequelize.sync();
}



app.listen(3000, () => {
  console.log('Server is running on port 3000')
})
