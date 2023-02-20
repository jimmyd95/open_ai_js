// implemented all the npm install, cors, dotenv, express, and openai
import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import { Configuration, OpenAIApi } from 'openai'

dotenv.config() // so you can use the dotenv variables

console.log(process.env.OPENAI_API_KEY)

// configuration implemented with the openAI key
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration) // introduce the openAI instance

const app = express()
app.use(cors()) // middleware
app.use(express.json()) // pass json to backend

app.get('/', async(req, res) => {
     res.status(200).send({
        message:'hello there',
     })
})

// payload from frontend
app.post('/', async (req, res) => {
    try{
        const prompt = req.body.prompt

        // function that takes object
        const response = await openai.createCompletion({
            // essential settings for openAI
            model: 'text-davinci-003',
            prompt: `${prompt}`, // passing the frontend prompt
            temperature: 0, // higher means more risks 0 - 1
            max_tokens: 3000, // max 64 - 3000, short to long answers
            top_p: 1, // alternative to sampling with temperature, nucleus sampling
            frequency_penalty: 0.5, // how often does it repeat itself 0 - 1
            /* Number between -2.0 and 2.0. 
            Positive values penalize new tokens based on 
            whether they appear in the text so far, 
            increasing the model's likelihood to talk about new topics. */
            presence_penalty: 0, 
            // stop: ["\"\"\""]
        })

        res.status(200).send({
            bot: response.data.choices[0].text
        })
    } catch(error){
        console.log(error)
        res.status(500).send(error || 'Mr. Ding, I don\'t feel so good');
    }
})

app.listen(5000, () => console.log('Server run http://localhost:5000'))